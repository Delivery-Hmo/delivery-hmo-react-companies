import { useEffect, useMemo, useState } from 'react';
import { Card, Form, FormRule, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import SaveButton from '../../../components/saveButton';
import DynamicContentForm from '../../../components/dynamicContentForm';
import { initBranch, title } from '../../../constants';
import { BranchOffice } from '../../../interfaces/branchOffice';
import { CustomInput } from '../../../interfaces';
import { get, post, put } from '../../../services';
import HeaderView from '../../../components/headerView';
import { TypeRute } from "../../../types";
import Map from '../map';
import { sleep } from "../../../utils/functions";

const CreateBranch = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [branch, setBranch] = useState<BranchOffice>(initBranch);
  const [saving, setSaving] = useState(false);
  const [type, setType] = useState<TypeRute>("create");
  const [staring, setStaring] = useState(true);

  const { name, email, facebook, salesGoalByMonth, phones, latLng, radius, center, password, confirmPassword, id } = branch;

  const rulesPassword: FormRule[] = useMemo(() => [
    { required: !id && password !== "", min: 6, message: 'La contraseña tiene que ser de 6 dígitos o más.' },
  ], [password, id])

  useEffect(() => {
    const inti = async () => {
      try {
        const _brancOffice = state as BranchOffice | null;

        setType(_brancOffice?.id ? "update" : "create");

        if (!_brancOffice) return;

        form.setFieldsValue({
          ..._brancOffice,
          phone0: _brancOffice?.phones[0],
          phone1: _brancOffice?.phones[1] || undefined,
          phone2: _brancOffice?.phones[2] || undefined
        });
        setBranch(_brancOffice);
      } catch (error) {
        console.log(error);
        message.error("Error al cargar la sucursal.", 4);
      } finally {
        await sleep(300);
        setStaring(false);
      }
    }

    inti();
  }, [state, form])

  const onFinish = async () => {
    if (saving) return;

    if (!latLng.lat || !latLng.lng) {
      message.error("La ubicación de la sucursal es obligatoria.", 4);
      return;
    }

    if (!radius || !center.lat || !center.lng) {
      message.error("El radio de entrega es obligatorio.", 4);
      return;
    }

    const branchOfficeRegistered = await get<boolean>("branchOffice/verifyEmail?email=" + email);

    if (branchOfficeRegistered) {
      message.error('El correo ya esta registrado.', 4)
      return
    }

    setSaving(true);

    delete branch.confirmPassword;

    try {
      if (type === "create") {
        await post("branchOffice/create", branch);
      } else {
        await put("branchOffice/update", branch);
      }

      message.success("Sucursal guardada con exito.", 4);

      navigate("/sucursales");
    } catch (error) {
      message.error(error as string, 4);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <HeaderView
        title={title[type]}
        path="/sucursales"
        goBack
      />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Card>
          <b>Información principal</b>
          <DynamicContentForm
            staring={staring}
            id={id}
            inputs={
              [
                {
                  md: 12,
                  typeControl: "input",
                  typeInput: "text",
                  label: "Nombre",
                  name: "name",
                  rules: [
                    {
                      required: true,
                      message: 'Favor de escribir el Nombre.',
                    }
                  ],
                  value: name,
                  onChange: (value: string) => setBranch({ ...branch, name: value })
                },
                {
                  md: 12,
                  typeControl: "input",
                  typeInput: "email",
                  label: "Correo electrónico",
                  name: "email",
                  value: email,
                  onChange: (value: string) => setBranch({ ...branch, email: value })
                },
                {
                  md: 12,
                  typeControl: "input",
                  typeInput: "password",
                  label: "Contraseña",
                  name: "password",
                  rules: rulesPassword,
                  value: password,
                  onChange: (value) => setBranch({ ...branch, password: value })
                },
                {
                  md: 12,
                  typeControl: "input",
                  typeInput: "password",
                  label: "Confirmar contraseña",
                  name: "confirmPassword",
                  rules: rulesPassword,
                  value: confirmPassword,
                  onChange: (value) => setBranch({ ...branch, confirmPassword: value })
                },
                {
                  md: 12,
                  typeControl: "input",
                  typeInput: "number",
                  label: "Meta ventas / mes",
                  name: "salesGoalByMonth",
                  value: salesGoalByMonth,
                  rules: [
                    {
                      message: 'La meta de ventas no puede ser mayor a 50,000.',
                      validator: (rule, value) => value > 50000 ? Promise.reject(rule.message) : Promise.resolve(),
                    }
                  ],
                  onChange: (value: string) => setBranch({ ...branch, salesGoalByMonth: +value })
                },
                {
                  md: 12,
                  typeControl: "input",
                  label: "Facebook",
                  name: "faceebok",
                  value: facebook,
                  onChange: (value: string) => setBranch({ ...branch, facebook: value })
                },
                ...phones.map((phone, index) => ({
                  required: (index === 0 || phone),
                  md: 8,
                  typeControl: "phone",
                  label: `Teléfono ${index + 1}`,
                  name: `phone${index}`,
                  value: phone,
                  onChange: (value: string) => setBranch({ ...branch, phones: phones.map((p, i) => i === index ? +value : p) }),
                }) as CustomInput)
              ] as CustomInput[]
            }
          />
        </Card>
        <br />
        <Map branch={branch} setBranch={setBranch} />
        <br />
        <SaveButton
          htmlType="submit"
          loading={saving}
        >
          Guardar
        </SaveButton>
      </Form>
    </div>
  )
}

export default CreateBranch;