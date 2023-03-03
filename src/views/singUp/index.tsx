import { useState } from 'react';
import { Form, Row, Col, message } from 'antd';
import { getAdditionalUserInfo, getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { UserAdmin } from '../../interfaces/user';
import { get, post } from '../../services';
import DynamicContentForm from '../../components/dynamicContentForm';
import SaveButton from '../../components/saveButton';
import { rulesPhoneInput } from '../../constants';

const initUserAdmin: UserAdmin = {
  active: true,
  company: '',
  description: '',
  email: '',
  name: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: ''
};

const SingUp = () => {
  const [userAdmin, setUserAdmin] = useState<UserAdmin>(initUserAdmin);
  const [loading, setLoading] = useState(false);

  const onFinish = async () => {
    if (userAdmin.password !== userAdmin.confirmPassword) {
      message.error('Las contraseñas no coinciden.', 4)
      return
    }

    if (loading) return;

    setLoading(true);

    try {
      const userAdminRegistered = await get<boolean>("userAdmin/verifyEmail?email=" + userAdmin.email);

      if (userAdminRegistered) {
        message.error('El usuario ya esta registrado.', 4)
        return
      }

      const result = await createUserWithEmailAndPassword(getAuth(), userAdmin.email, userAdmin.password as string);
      const user = result.user
      const additional = getAdditionalUserInfo(result)

      if (!additional?.isNewUser) return;

      userAdmin.uid = user.uid;

      delete userAdmin.confirmPassword;

      await post('userAdmin/create', userAdmin);
    } catch (error) {
      console.log(error);
      message.error('Error al registrarse.', 4)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "10vh" }}>
      <Row>
        <Col>
          <h1>
            Registrar usuario
          </h1>
        </Col>
      </Row>
      <br />
      <Form layout="vertical" onFinish={onFinish}>
        <DynamicContentForm inputs={[
          {
            md: 12,
            type: "input",
            typeInput: "text",
            label: "Nombre Vendedor",
            name: "name",
            rules: [{ required: true, message: 'Favor de escribir el nombre del vendedor.' }],
            value: userAdmin.name,
            onChange: (value) => setUserAdmin({ ...userAdmin, name: value })
          }, {
            md: 12,
            type: "input",
            typeInput: "email",
            label: "Email",
            name: "email",
            rules: [{ required: true, message: 'Favor de ingresar un email.' }],
            value: userAdmin.email,
            onChange: (value) => setUserAdmin({ ...userAdmin, email: value })
          }, {
            md: 12,
            type: "input",
            typeInput: "password",
            label: "Contraseña",
            name: "password",
            rules: [{ required: true, min: 6, message: 'La contraseña tiene que ser de 6 dígitos o màs.' }],
            value: userAdmin.password,
            onChange: (value) => setUserAdmin({ ...userAdmin, password: value })
          }, {
            md: 12,
            type: "input",
            typeInput: "password",
            label: "Confirmar contraseña",
            name: "confirmPassword",
            rules: [{ required: true, min: 6, message: 'La contraseña tiene que ser de 6 dígitos o màs.' }],
            value: userAdmin.confirmPassword,
            onChange: (value) => setUserAdmin({ ...userAdmin, confirmPassword: value })
          }, {
            md: 12,
            type: "input",
            typeInput: "text",
            label: "Compañia",
            name: "company",
            rules: [{ required: true, message: 'Favor de escribir la company.' }],
            value: userAdmin.company,
            onChange: (value) => setUserAdmin({ ...userAdmin, company: value })
          }, {
            md: 12,
            type: "input",
            typeInput: "number",
            label: "Telefono",
            name: "phone",
            rules: rulesPhoneInput,
            value: userAdmin.phone,
            onChange: (value) => setUserAdmin({ ...userAdmin, phone: value })
          }, {
            md: 24,
            type: "textarea",
            typeInput: "text",
            label: "Descripcion",
            name: "description",
            rules: [{ required: true, message: 'Favor de seleccionar su description.' }],
            value: userAdmin.description,
            onChange: (value: string) => setUserAdmin({ ...userAdmin, description: value })
          }
        ]} />

        <Form.Item>
          <SaveButton
            htmlType="submit"
            loading={loading}
          >
            Guardar
          </SaveButton>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SingUp;