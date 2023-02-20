import { useEffect, useMemo, useState } from 'react'
import DynamicContentForm from '../../../components/dynamicContentForm'
import { Col, Form, FormRule, message, Row } from 'antd'
import SaveButton from '../../../components/saveButton';
import { get, post, put } from '../../../services';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import { initUserBranchOfficeDeliveryMan, rulesPhoneInput } from '../../../constants';
import { UserBranchOfficeDeliveryMan } from '../../../interfaces/user';

type TypeRute = "create" | "update";

interface State {
  data: UserBranchOfficeDeliveryMan;
}

const title: Record<TypeRute, string> = {
  "create": "Registrar",
  "update": "Editar"
};

const CreateUserBranchOfficeDeliveryMan = () => {
  const { userAdmin } = useAuth();
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [type, setType] = useState<TypeRute>("create");
  const [saveLoading, setSaveLoading] = useState(false);
  const [deliveryMan, setDeliveryMan] = useState<UserBranchOfficeDeliveryMan>(initUserBranchOfficeDeliveryMan)

  const rulesPassword: FormRule[] = useMemo(() => [
    { required: !deliveryMan.id || deliveryMan.password !== "", min: 6, message: 'La contraseña tiene que ser de 6 dígitos o màs.' },
  ], [deliveryMan.password])

  const onFinish = async () => {
    try {
      setSaveLoading(true);

      const { password, confirmPassword, email } = deliveryMan;

      if (password && confirmPassword !== password) {
        message.error('Las contraseñas no coinciden.');
        return;
      }

      const userAdminRegistered = await get<boolean>("userAdmin/verifyEmail?email=" + email);

      if (userAdminRegistered) {
        message.error('El usuario ya esta registrado.', 4);
        return;
      }

      let _deliveryMan = {...deliveryMan};

      delete _deliveryMan.confirmPassword;

      if (type === "update") {
        await put(`userBranchOfficeDeliveryMan/${type}`, _deliveryMan);
      } else {
        await post(`userBranchOfficeDeliveryMan/${type}`, _deliveryMan);
      }
      
    } catch (error) {
      console.log(error)
      message.error('Ocurrió un problema al guardar la información.', 4);
    } finally {
      setSaveLoading(false)
    }
  }

  useEffect(() => {
    if (!state) {
      navigate("/repartidores")
      return;
    }

    const { data } = state as State;

    setType(data.id ? "update" : "create");
    setDeliveryMan(data);
    form.setFieldsValue(data);
  }, [state, form, userAdmin, navigate])

  return (
    <>
      <Row>
        <Col md={24}>
          <h1>{title[type]} Repartidor</h1>
        </Col>
        <Col md={24}>
          <Form form={form}
            layout='vertical'
            onFinish={onFinish}
          >
            <DynamicContentForm inputs={[
              {
                type: 'input',
                typeInput: 'text',
                label: 'Nombre',
                name: 'name',
                rules: [{ required: true, message: 'Favor de escribir el nombre del repartidor.' }],
                value: deliveryMan.name,
                onChange: (value: string) => setDeliveryMan({ ...deliveryMan, name: value }),
                md: 8
              },
              {
                type: 'input',
                typeInput: 'email',
                label: 'Correo',
                name: 'email',
                rules: [{ required: true, message: 'Favor de escribir el correo del repartidor.' }],
                value: deliveryMan.email,
                onChange: (value: string) => setDeliveryMan({ ...deliveryMan, email: value }),
                md: 8
              },
              {
                type: 'input',
                typeInput: 'password',
                label: 'Contraseña',
                name: 'password',
                rules: rulesPassword,
                value: deliveryMan.password,
                onChange: (value: string) => setDeliveryMan({ ...deliveryMan, password: value }),
                md: 8
              },
              {
                type: 'input',
                typeInput: 'password',
                label: 'Confirmar Contraseña',
                name: 'confirmPassword',
                rules: rulesPassword,
                value: deliveryMan.confirmPassword,
                onChange: (value: string) => setDeliveryMan({ ...deliveryMan, confirmPassword: value }),
                md: 8
              },
              {
                type: 'input',
                typeInput: 'number',
                label: 'Teléfono',
                name: 'phone',
                rules: rulesPhoneInput,
                value: deliveryMan.phone,
                onChange: (value: string) => setDeliveryMan({ ...deliveryMan, phone: value }),
                md: 8
              },
              {
                type: 'input',
                typeInput: 'text',
                label: 'Sucursal',
                name: 'branchOffice',
                rules: [{ required: true, message: 'Favor de escribir la sucursal a la que pertenece el repartidor' }],
                value: deliveryMan.branchOffice,
                onChange: (value: string) => setDeliveryMan({ ...deliveryMan, branchOffice: value }),
                md: 8
              }
            ]} />
            <SaveButton htmlType='submit'loading={saveLoading}>
              Guardar repartidor
            </SaveButton>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default CreateUserBranchOfficeDeliveryMan