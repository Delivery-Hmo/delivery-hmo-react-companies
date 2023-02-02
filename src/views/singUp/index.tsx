import { useState } from 'react';
import { Form, Row, Col, message } from 'antd';
import { getAdditionalUserInfo, getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { UserAdmin } from '../../interfaces/user';
import { get, post } from '../../services';
import DynamicContentForm from '../../components/dynamicContentForm';
import SaveButton from '../../components/saveButton';

const initUserAdmin: UserAdmin = {
  active: true,
  company: '',
  description: '',
  email: '',
  name: '',
  phone: '',
  password: '',
  repeatPassword: '',
  role: ''
}

const SingUp = () => {
  const [userAdmin, setUserAdmin] = useState<UserAdmin>(initUserAdmin);
  const [loading, setLoading] = useState(false);
  const sizes = {
    xs: 24, md: 8
  }
  const onFinish = async () => {
    if (userAdmin.password !== userAdmin.repeatPassword) {
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

      const result = await createUserWithEmailAndPassword(getAuth(), userAdmin.email, userAdmin.password as string)
      const user = result.user
      const additional = getAdditionalUserInfo(result)

      if (!additional?.isNewUser) return

      const userInfo: UserAdmin = {
        ...userAdmin,
        uid: user.uid,
        active: true,
        role: ''
      }

      await post('userAdmin/create', userInfo);
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
            ...sizes,
            type: "input",
            typeInput: "text",
            label: "Nombre Vendedor",
            name: "name",
            rules: [{ required: true, message: 'Favor de escribir el nombre del vendedor.' }],
            value: userAdmin.name,
            onChange: (value) => setUserAdmin({ ...userAdmin, name: value })
          }, {
            ...sizes,
            type: "input",
            typeInput: "text",
            label: "Compañia",
            name: "company",
            rules: [{ required: true, message: 'Favor de escribir la company.' }],
            value: userAdmin.company,
            onChange: (value) => setUserAdmin({ ...userAdmin, company: value })
          }, {
            ...sizes,
            type: "input",
            typeInput: "text",
            label: "Descripcion",
            name: "description",
            rules: [{ required: true, message: 'Favor de seleccionar su description.' }],
            value: userAdmin.description,
            onChange: (value) => setUserAdmin({ ...userAdmin, description: value })
          }, {
            md: 6,
            type: "input",
            typeInput: "email",
            label: "Email",
            name: "email",
            rules: [{ required: true, message: 'Favor de ingresar un email.' }],
            value: userAdmin.email,
            onChange: (value) => setUserAdmin({ ...userAdmin, email: value })
          }, {
            md: 2,
            type: "input",
            typeInput: "number",
            label: "Telefono",
            name: "phone",
            rules: [{ required: true, message: 'Favor de ingresar un telefono.' }],
            value: userAdmin.phone,
            onChange: (value) => setUserAdmin({ ...userAdmin, phone: value })
          }, {
            md: 8,
            type: "input",
            typeInput: "password",
            label: "Contraseña",
            name: "password",
            rules: [{ required: true, message: 'Favor de ingresar una contraseña.' }],
            value: userAdmin.password,
            onChange: (value) => setUserAdmin({ ...userAdmin, password: value })
          }, {
            md: 8,
            type: "input",
            typeInput: "password",
            label: "Repetir Contraseña",
            name: "repeatPassword",
            rules: [{ required: true, message: 'Favor de ingresar una contraseña.' }],
            value: userAdmin.repeatPassword,
            onChange: (value) => setUserAdmin({ ...userAdmin, repeatPassword: value })
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