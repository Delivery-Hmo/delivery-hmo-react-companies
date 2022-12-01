import { useEffect, useState } from 'react'
import DynamicContentForm from '../../../components/DynamicContentForm'
import { Col, Form, message, Row } from 'antd'
import SaveButton from '../../../components/SaveButton';
import { post, put } from '../../../service';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { initUserBranchOfficeSeller } from '../../../constants'

interface User {
  uid?: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  active: boolean;
  role: 'Vendedor';
  password: string;
  confirmPassword: string;
}

export interface UserBranchOfficeSeller extends User {
  branchOffice?: string
}

const CreateUserBranchOfficeSeller = () => {
  const { userAdmin } = useAuth();
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { data, type } = state;
  const editing = !!data?.id;
  const title = editing ? 'Editar' : 'Registrar';

  const [saveLoading, setSaveLoading] = useState(false);
  const [seller, setSeller] = useState<UserBranchOfficeSeller>(initUserBranchOfficeSeller)

  const onFinish = async () => {
    try {
      setSaveLoading(true);
      const { id, uid, name, email, phone, description, password, confirmPassword, active } = seller
      if (editing) {
        if(password?.length > 0 && confirmPassword !== password) {
          message.error('Las contraseñas no coinciden.')
          return false;
        }
        await put(`userBranchOfficeSeller/${type}`, {
          id, uid, name, email, phone, description, password, active
        });
      }else{
        if (confirmPassword !== password) {
          message.error('Las contraseñas no coinciden.')
          return false;
        }
        await post(`userBranchOfficeSeller/${type}`, {
          id, uid, name, email, phone, description, password, active
        })
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
    if(!userAdmin) return;

    if(editing) {
        const _seller = data as UserBranchOfficeSeller
        setSeller(_seller);
        form.setFieldsValue({..._seller})
      }
  }, [data, editing, form, userAdmin])

  return (
    <>
      <Row>
        <Col md={24}>
          <h1>{ title } Vendedor</h1>
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
                rules: [{ required: !editing, message: 'Favor de escribir la contraseña del vendedor.' }],
                value: seller.password,
                onChange: (value: string) => setSeller({ ...seller, password: value }),
                md: 8
              },
              {
                type: 'input',
                typeInput: 'password',
                label: 'Confirmar Contraseña',
                name: 'confirmPassword',
                rules: [{ required: !editing, message: 'Favor de confirmar la contraseña del vendedor.' }],
                value: seller.confirmPassword,
                onChange: (value: string) => setSeller({ ...seller, confirmPassword: value }),
                md: 8
              },
              {
                type: 'input',
                typeInput: 'number',
                label: 'Teléfono',
                name: 'phone',
                rules: [
                  { required: true, message: 'Favor de escribir el teléfono del vendedor.' },
                  { min: 10, message: 'El número telefónico tiene que ser de 10 dígitos.' },
                  { max: 10, message: 'El número telefónico tiene que ser de 10 dígitos.' },
                ],
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