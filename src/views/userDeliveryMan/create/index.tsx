import { useEffect, useState } from 'react'
import { Card, Col, Form, Row, message } from 'antd'
import { post, put } from '../../../services';
import { useNavigate, useLocation } from 'react-router-dom';
import { initUserDeliveryMan } from '../../../constants';
import { BranchOffice, UserDeliveryMan } from '../../../interfaces/user';
import useGet from '../../../hooks/useGet';
import { Option } from '../../../interfaces';
import DynamicContentForm from "../../../components/dynamicContentForm";

type TypeRute = "create" | "update";

const title: Record<TypeRute, string> = {
  create: "Registrar",
  update: "Editar"
};

const CreateUserDeliveryMan = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, response: branchOffices } = useGet<BranchOffice[]>("branchOffice/listByUserAdmin");
  const { state, pathname } = location;
  const [type, setType] = useState<TypeRute>("create");
  const [saving, setSaving] = useState(false);
  const [deliveryMan, setDeliveryMan] = useState<UserDeliveryMan>(initUserDeliveryMan);

  useEffect(() => {
    if (pathname.includes("editar") && !state) {
      navigate("/repartidores")
      return;
    }

    const _deliveryMan: UserDeliveryMan | null = state;

    setType(_deliveryMan ? "update" : "create");

    if (!_deliveryMan) return;

    setDeliveryMan(_deliveryMan);
    form.setFieldsValue(_deliveryMan);
  }, [state, form, navigate, pathname])

  const onFinish = async () => {
    if(saving) return;
    
    setSaving(true);

    const { password, confirmPassword } = deliveryMan;

    if (confirmPassword !== password) {
      message.error('Las contraseñas no coinciden.');
      return;
    }

    delete deliveryMan.confirmPassword;

    try {
      if (type === "update") {
        await put(`userDeliveryMan/${type}`, deliveryMan);
      } else {
        await post(`userDeliveryMan/${type}`, deliveryMan);
      }

      message.success('Repartidor guardado con éxito.', 4);
      navigate('/repartidores')
    } catch (error) {
      console.log(error)
      message.error('Error al guardar el repartidor.', 4);
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Row>
        <Col md={24}>
          <h1>{title[type]} Repartidor</h1>
        </Col>
        <Col md={24}>
          <Form
            form={form}
            layout='vertical'
            onFinish={onFinish}
          >
            <Card>
              <DynamicContentForm inputs={[
                {
                  typeControl: 'input',
                  typeInput: 'text',
                  label: 'Nombre',
                  name: 'name',
                  rules: [{ required: true, message: 'Favor de escribir el nombre del repartidor.' }],
                  value: deliveryMan.name,
                  onChange: (value: string) => setDeliveryMan({ ...deliveryMan, name: value }),
                  md: 8
                },
                {
                  typeControl: 'input',
                  typeInput: 'email',
                  label: 'Correo',
                  name: 'email',
                  value: deliveryMan.email,
                  onChange: (value: string) => setDeliveryMan({ ...deliveryMan, email: value }),
                  md: 8
                },
                {
                  typeControl: 'input',
                  typeInput: 'password',
                  label: 'Contraseña',
                  name: 'password',
                  rules: [{ required: type === "create", message: 'Favor de escribir la contraseña del repartidor.' }],
                  value: deliveryMan.password,
                  onChange: (value: string) => setDeliveryMan({ ...deliveryMan, password: value }),
                  md: 8
                },
                {
                  typeControl: 'input',
                  typeInput: 'password',
                  label: 'Confirmar Contraseña',
                  name: 'confirmPassword',
                  rules: [{ required: type === "create", message: 'Favor de confirmar la contraseña del repartidor.' }],
                  value: deliveryMan.confirmPassword,
                  onChange: (value: string) => setDeliveryMan({ ...deliveryMan, confirmPassword: value }),
                  md: 8
                },
                {
                  typeControl: 'phone',
                  label: 'Teléfono',
                  name: 'phone',
                  value: deliveryMan.phone,
                  onChange: (value: string) => setDeliveryMan({ ...deliveryMan, phone: value }),
                  md: 8
                },
                {
                  typeControl: 'select',
                  loading,
                  options: branchOffices?.map(b => ({text: b.name, value: b.id})) as Option[],
                  label: 'Sucursal',
                  name: 'branchOffice',
                  rules: [{ required: true, message: 'Favor de escribir la sucursal que pertenece el repartidor.' }],
                  value: deliveryMan.branchOffice,
                  onChange: (value: string) => setDeliveryMan({ ...deliveryMan, branchOffice: value }),
                  md: 8
                },
                {
                  typeControl: 'input',
                  typeInput: 'text',
                  label: 'Descripción',
                  name: 'description',
                  rules: [{required: true, message: 'Favor de escribir una breve descripción del repartidor.'}],
                  value: deliveryMan.description,
                  onChange: (value: string) => setDeliveryMan({ ...deliveryMan, description: value}),
                  md: 24
                }
              ]} />
            </Card>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default CreateUserDeliveryMan;