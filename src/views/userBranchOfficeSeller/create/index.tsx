import { useEffect, useMemo, useState } from 'react'
import DynamicContentForm from '../../../components/dynamicContentForm'
import { Card, Col, Form, FormRule, message, Row } from 'antd'
import SaveButton from '../../../components/saveButton';
import { post, put } from '../../../services';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import { initUserBranchOfficeSeller, title } from '../../../constants';
import { UserBranchOfficeSeller } from '../../../interfaces/user';
import { TypeRute } from '../../../types';

const CreateUserBranchOfficeSeller = () => {
  const { userAdmin } = useAuth();
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [type, setType] = useState<TypeRute>("create");
  const [saving, setSaving] = useState(false);
  const [seller, setSeller] = useState<UserBranchOfficeSeller>(initUserBranchOfficeSeller)

  const rulesPassword: FormRule[] = useMemo(() => [
    { required: !seller.id || seller.password !== "", min: 6, message: 'La contraseña tiene que ser de 6 dígitos o màs.' }
  ], [seller])

  const onFinish = async () => {
    if (saving) return;

    try {
      setSaving(true);

      const { password, confirmPassword } = seller;

      if (password && confirmPassword !== password) {
        message.error('Las contraseñas no coinciden.');
        return;
      }

      let _seller = { ...seller };

      delete _seller.confirmPassword;

      if (type === "update") {
        await put(`userBranchOfficeSeller/${type}`, _seller);
      } else {
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
    if (!state) {
      navigate("/vendedores");
      return;
    }

    const _seller = state as UserBranchOfficeSeller;

    setType(_seller.id ? "update" : "create");
    setSeller(_seller);
    form.setFieldsValue(_seller);
  }, [state, form, userAdmin, navigate])

  return (
    <>
      <Row>
        <Col md={24}>
          <h1>{title[type]} vendedor</h1>
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
                  rules: [{ required: true, message: 'Favor de escribir el nombre del vendedor.' }],
                  value: seller.name,
                  onChange: (value: string) => setSeller({ ...seller, name: value }),
                  md: 8
                },
                {
                  typeControl: 'input',
                  typeInput: 'email',
                  label: 'Correo',
                  name: 'email',
                  value: seller.email,
                  onChange: (value: string) => setSeller({ ...seller, email: value }),
                  md: 8
                },
                {
                  typeControl: 'input',
                  typeInput: 'password',
                  label: 'Contraseña',
                  name: 'password',
                  rules: rulesPassword,
                  value: seller.password,
                  onChange: (value: string) => setSeller({ ...seller, password: value }),
                  md: 8
                },
                {
                  typeControl: 'input',
                  typeInput: 'password',
                  label: 'Confirmar contraseña',
                  name: 'confirmPassword',
                  rules: rulesPassword,
                  value: seller.confirmPassword,
                  onChange: (value: string) => setSeller({ ...seller, confirmPassword: value }),
                  md: 8
                },
                {
                  typeControl: 'phone',
                  label: 'Teléfono',
                  name: 'phone',
                  value: seller.phone,
                  onChange: (value: string) => setSeller({ ...seller, phone: value }),
                  md: 8
                },
                {
                  typeControl: 'textarea',
                  typeInput: 'text',
                  label: 'Descripción',
                  name: 'description',
                  rules: [{ required: true, message: 'Favor de escribir la descripción del vendedor.' }],
                  value: seller.description,
                  onChange: (value: string) => setSeller({ ...seller, description: value }),
                  md: 8
                }
              ]} />
              <SaveButton
                htmlType='submit'
                loading={saving}
              >
                Guardar vendedor
              </SaveButton>
            </Card>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default CreateUserBranchOfficeSeller;