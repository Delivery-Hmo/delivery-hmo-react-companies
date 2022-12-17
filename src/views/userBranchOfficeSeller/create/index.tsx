import { useEffect, useState } from 'react'
import DynamicContentForm from '../../../components/dynamicContentForm'
import { Col, Form, message, Row } from 'antd'
import SaveButton from '../../../components/saveButton';
import { post, put } from '../../../services';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import { initUserBranchOfficeSeller, rulesPhoneInput } from '../../../constants';
import { UserBranchOfficeSeller } from '../../../interfaces/user';

type TypeRute = "create" | "update";

interface State {
  data: UserBranchOfficeSeller;
}

const title: Record<TypeRute, string> = {
  "create": "Registrar",
  "update": "Editar"
};

const CreateUserBranchOfficeSeller = () => {
  const { userAdmin } = useAuth();
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [type, setType] = useState<TypeRute>("create");

  const [saveLoading, setSaveLoading] = useState(false);
  const [seller, setSeller] = useState<UserBranchOfficeSeller>(initUserBranchOfficeSeller)

  const onFinish = async () => {
    try {
      setSaveLoading(true);

      const { id, uid, name, email, phone, description, password, confirmPassword, active } = seller
      
      if (type === "update") {
        if((password || confirmPassword) && confirmPassword !== password) {
          message.error('Las contraseñas no coinciden.')
          return false;
        }
        await put(`userBranchOfficeSeller/${type}`, {
          id, uid, name, email, phone, description, password, active
        });
      } else{
        if (confirmPassword !== password) {
          message.error('Las contraseñas no coinciden.')
          return false;
        }
        await post(`userBranchOfficeSeller/${type}`, {
          id, uid, name, email, phone, description, password, active
        });
      }

      message.success('Información guardada con éxito.')
      navigate('/vendedores')
    } catch (error) {
      console.log(error)
      message.error('Ocurrió un problema al guardar la información.')
    } finally {
      setSaveLoading(false)
    }
  }

  useEffect(() => {
    if(!state) {
      navigate("/vendedores")
      return;
    }

    const { data } = state as State;

    setType(data.id  ? "update" : "create");
    setSeller(data);
    form.setFieldsValue(data);
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
                rules: [{ required: type === "update", message: 'Favor de escribir la contraseña del vendedor.' }],
                value: seller.password,
                onChange: (value: string) => setSeller({ ...seller, password: value }),
                md: 8
              },
              {
                type: 'input',
                typeInput: 'password',
                label: 'Confirmar Contraseña',
                name: 'confirmPassword',
                rules: [{ required: type === "update", message: 'Favor de confirmar la contraseña del vendedor.' }],
                value: seller.confirmPassword,
                onChange: (value: string) => setSeller({ ...seller, confirmPassword: value }),
                md: 8
              },
              {
                type: 'input',
                typeInput: 'number',
                label: 'Teléfono',
                name: 'phone',
                rules: rulesPhoneInput,
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
                loading={saveLoading}
              >
                Guardar vendedor
              </SaveButton>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default CreateUserBranchOfficeSeller