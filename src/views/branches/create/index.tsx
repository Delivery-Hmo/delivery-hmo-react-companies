import { useMemo, useState } from 'react';
import { Card, Form, FormRule, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import SaveButton from '../../../components/saveButton';
import DynamicContentForm from '../../../components/dynamicContentForm';
import { initBranch } from '../../../constants';
import { BranchOffice } from '../../../interfaces/branchOffice';
import { CustomInput } from '../../../interfaces';
import { get, post } from '../../../services';
import Map from './map';
import HeaderView from '../../../components/headerView';

const CreateBranch = () => {
  const [branch, setBranch] = useState<BranchOffice>(initBranch);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const { name, email, facebook, salesGoalByMonth, phones, latLng, radius, center, password, confirmPassword, id } = branch;

  const rulesPassword: FormRule[] = useMemo(() => [
    { required: !id || password !== "", min: 6, message: 'La contraseña tiene que ser de 6 dígitos o màs.' },
  ], [password, id])

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
      await post("branchOffice/create", branch);

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
        title="Registrar sucursal" 
        path="/sucursales" 
        goBack
      />
      <Form
        layout="vertical"
        onFinish={onFinish}
      >
        <Card>
          <b>Información principal</b>
          <DynamicContentForm
            inputs={[
              ...[
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
                }
              ] as CustomInput[],
              ...phones.map((phone, index) => ({
                required: (index === 0 || phone),
                md: 8,
                typeControl: "phone",
                label: `Teléfono ${index + 1}`,
                name: `phone${index}`,
                value: phone,
                onChange: (value: string) => setBranch({ ...branch, phones: phones.map((p, i) => i === index ? +value : p) })
              }) as CustomInput)
            ]}
          />
        </Card>
        <br />
        <Map setBranch={setBranch} />
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