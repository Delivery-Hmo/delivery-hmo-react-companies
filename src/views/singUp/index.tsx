import { useState } from 'react';
import { Form, message } from 'antd';
import { getAdditionalUserInfo, getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { UserAdmin } from '../../interfaces/user';
import { get, post } from '../../services';
import DynamicForm from '../../components/dynamicForm';
import { initUserAdmin } from "../../constants";
import HeaderView from "../../components/headerView";

const SingUp = () => {
  const [userAdmin, setUserAdmin] = useState<UserAdmin>(initUserAdmin);
  const [loading, setLoading] = useState(false);

  const onFinish = async () => {
    if (userAdmin.password !== userAdmin.confirmPassword) {
      message.error('Las contraseñas no coinciden.', 4);
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      //este error hay que sacarlo del createUserWhitEmailAndPassword
      const userAdminRegistered = await get<boolean>("userAdmin/verifyEmail?email=" + userAdmin.email);

      if (userAdminRegistered) {
        message.error('El usuario ya esta registrado.', 4)
        return
      }

      const result = await createUserWithEmailAndPassword(getAuth(), userAdmin.email!, userAdmin.password as string);
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
      <HeaderView
        title="Registrar usuario"
      />
      <br />
      <Form >
        <DynamicForm
          layout="vertical"
          onFinish={onFinish}
          loading={loading}
          inputs={[
            {
              md: 12,
              typeControl: "input",
              typeInput: "text",
              label: "Nombre Vendedor",
              name: "name",
              rules: [{ required: true, message: 'Favor de escribir el nombre del vendedor.' }],
              value: userAdmin.name,
              onChange: (value) => setUserAdmin({ ...userAdmin, name: value })
            }, {
              md: 12,
              typeControl: "input",
              typeInput: "email",
              label: "Email",
              name: "email",
              value: userAdmin.email,
              onChange: (value) => setUserAdmin({ ...userAdmin, email: value })
            }, {
              md: 12,
              typeControl: "input",
              typeInput: "password",
              label: "Contraseña",
              name: "password",
              value: userAdmin.password,
              onChange: (value) => setUserAdmin({ ...userAdmin, password: value })
            }, {
              md: 12,
              typeControl: "input",
              typeInput: "password",
              label: "Confirmar contraseña",
              name: "confirmPassword",
              value: userAdmin.confirmPassword,
              onChange: (value) => setUserAdmin({ ...userAdmin, confirmPassword: value })
            }, {
              md: 12,
              typeControl: "phone",
              label: "Telefono",
              name: "phone",
              value: userAdmin.phone,
              onChange: (value) => setUserAdmin({ ...userAdmin, phone: value })
            }, {
              md: 24,
              typeControl: "textarea",
              typeInput: "text",
              label: "Descripcion",
              name: "description",
              value: userAdmin.description,
              onChange: (value: string) => setUserAdmin({ ...userAdmin, description: value })
            }
          ]}
        />
      </Form>
    </div>
  )
}

export default SingUp;