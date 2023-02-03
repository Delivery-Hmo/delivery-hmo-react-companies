import { useEffect, useState } from 'react'
import DynamicContentForm from '../../../components/dynamicContentForm'
import { Card, Col, Form, message, Row } from 'antd'
import SaveButton from '../../../components/saveButton';
import { post, put } from '../../../services';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import { initUserBranchOfficeSeller } from '../../../constants';
import { UserBranchOfficeSeller } from '../../../interfaces/user';

type TypeRute = "create" | "update";

const title: Record<TypeRute, string> = {
  create: "Registrar",
  update: "Editar"
};

const CreateUserBranchOfficeSeller = () => {
  const { userAdmin } = useAuth();
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [type, setType] = useState<TypeRute>("create");
  const [saving, setSaving] = useState(false);
  const [seller, setSeller] = useState<UserBranchOfficeSeller>(initUserBranchOfficeSeller)

  const onFinish = async () => {
    if(saving) return;
    
    try {
      setSaving(true);

      const { password, confirmPassword } = seller;

      if (confirmPassword !== password) {
        message.error('Las contraseñas no coinciden.');
        return;
      }

      let _seller = {...seller};

      delete _seller.confirmPassword;

      if (type === "update") {
        await put(`userBranchOfficeSeller/${type}`, _seller);
      } else{
        await post(`userBranchOfficeSeller/${type}`, _seller);
      }

      message.success('Vendedor guardado con éxito.', 4);
      navigate('/vendedores')
    } catch (error) {
      console.log(error)
      message.error('Error al guardar el vendedor.', 4);
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    if(!state) {
      navigate("/vendedores")
      return;
    }

    const _seller = state as UserBranchOfficeSeller;

    setType(_seller.id  ? "update" : "create");
    setSeller(_seller);
    form.setFieldsValue(_seller);
  }, [state, form, userAdmin, navigate])

  return (
    <>
      <Row>
        <Col md={24}>
          <h1>{ title[type] } Vendedor</h1>
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
                type: 'input',
                typeInput: 'text',
                label: 'Nombre',
                name: 'name',
                rules: [{ required: true, message: 'Favor de escribir el nombre del vendedor.' }],
                value: seller.name,
                onChange: (value: string) => setSeller({ ...seller, name: value }),
                md: 8
              },
              {
                type: 'input',
                typeInput: 'email',
                label: 'Correo',
                name: 'email',
                rules: [{ required: true, message: 'Favor de escribir el correo del vendedor.' }],
                value: seller.email,
                onChange: (value: string) => setSeller({ ...seller, email: value }),
                md: 8
              },
              {
                type: 'input',
                typeInput: 'password',
                label: 'Contraseña',
                name: 'password',
                rules: [{ required: type === "create", message: 'Favor de escribir la contraseña del vendedor.' }],
                value: seller.password,
                onChange: (value: string) => setSeller({ ...seller, password: value }),
                md: 8
              },
              {
                type: 'input',
                typeInput: 'password',
                label: 'Confirmar Contraseña',
                name: 'confirmPassword',
                rules: [{ required: type === "create", message: 'Favor de confirmar la contraseña del vendedor.' }],
                value: seller.confirmPassword,
                onChange: (value: string) => setSeller({ ...seller, confirmPassword: value }),
                md: 8
              },
              {
                type: 'phone',
                label: 'Teléfono',
                name: 'phone',
                value: seller.phone,
                onChange: (value: string) => setSeller({ ...seller, phone: value }),
                md: 8
              },
              {
                type: 'textarea',
                typeInput: 'text',
                label: 'Descripción',
                name: 'description',
                rules: [{ required: true, message: 'Favor de escribir el teléfono del vendedor.' }],
                value: seller.description,
                onChange: (value: string) => setSeller({ ...seller, description: value }),
                md: 8
              }
            ]}/>
            <Form.Item>
              <SaveButton
                htmlType='submit'
                loading={saving}
              >
                Guardar vendedor
              </SaveButton>
            </Form.Item>
            </Card>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default CreateUserBranchOfficeSeller