import { useMemo, useState } from 'react';
import { Card, Form, FormRule, message } from 'antd';
import SaveButton from '../../../components/saveButton';
import DynamicContentForm from '../../../components/dynamicContentForm';
import { initBranch, rulesPhoneInput } from '../../../constants';
import { BranchOffice } from '../../../interfaces/branchOffice';
import { CustomInput } from '../../../interfaces';
import Map from './map';
import { post } from '../../../services';

const CreateBranch = () => {
  const [branch, setBranch] = useState<BranchOffice>(initBranch);
  const [saving, setSaving] = useState(false);

  const { name, email, facebook, salesGoalByMonth, phones, latLng, radius, center, password, confirmPassword, id } = branch;

  const rulesPassword: FormRule[] = useMemo(() => [
    { required: !id || password !== "", min: 6, message: 'La contraseña tiene que ser de 6 dígitos o màs.' },
  ], [password])

  const onFinish = async () => {
    if (saving) return;

    if (!latLng.lat || !latLng.lng) {
      message.error("La ubicación de la sucursal es obligatoria.", 4);
      return;
    }

    if (!radius || (!center.lat || !center.lng)) {
      message.error("El radio de entrega es obligatorio.", 4);
      return;
    }

    setSaving(true);

    delete branch.confirmPassword;

    try {
      await post("branchOffice/create", branch);

      message.success("Sucursal guardada con exito.", 4);
    } catch (error) {
      console.log(error);
      message.error("Error al guardar la sucursal.", 4);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1>Registrar sucursal</h1>
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
                  type: "input",
                  typeInput: "text",
                  label: "Nombre",
                  name: "name",
                  rules: [{ required: true, message: 'Favor de escribir el Nombre.' }],
                  value: name,
                  onChange: (value: string) => setBranch({ ...branch, name: value })
                },
                {
                  md: 12,
                  type: "input",
                  typeInput: "email",
                  label: "Correo electrónico",
                  name: "email",
                  rules: [{ required: true, message: 'Favor de escribir el Correo electrónico.' }],
                  value: email,
                  onChange: (value: string) => setBranch({ ...branch, email: value })
                },
                {
                  md: 12,
                  type: "input",
                  typeInput: "password",
                  label: "Contraseña",
                  name: "password",
                  rules: rulesPassword,
                  value: password,
                  onChange: (value) => setBranch({ ...branch, password: value })
                }, {
                  md: 12,
                  type: "input",
                  typeInput: "password",
                  label: "Confirmar contraseña",
                  name: "confirmPassword",
                  rules: rulesPassword,
                  value: confirmPassword,
                  onChange: (value) => setBranch({ ...branch, confirmPassword: value })
                }, 
                {
                  md: 12,
                  type: "input",
                  typeInput: "number",
                  label: "Meta ventas / mes",
                  name: "salesGoalByMonth",
                  value: salesGoalByMonth,
                  onChange: (value: string) => setBranch({ ...branch, salesGoalByMonth: +value })
                },
                {
                  md: 12,
                  type: "input",
                  label: "Facebook",
                  name: "faceebok",
                  value: facebook,
                  onChange: (value: string) => setBranch({ ...branch, facebook: value })
                }
              ] as CustomInput[],
              ...phones.map((phone, index) => ({
                rules: (index === 0 || phone) ? rulesPhoneInput : null,
                md: 8,
                type: "phone",
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