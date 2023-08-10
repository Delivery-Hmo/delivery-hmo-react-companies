import { useState } from 'react';
import { message } from 'antd';
import { getAdditionalUserInfo, getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { UserAdmin } from '../../../interfaces/user';
import { post } from '../../../services';
import DynamicForm from '../../dynamicForm';
import useAbortController from "../../../hooks/useAbortController";
import { rulePassword } from "../../../constants";
import { FirebaseError } from "firebase/app";

const SingUp = () => {
  const abortController = useAbortController();
  const [loading, setLoading] = useState(false);

  const onFinish = async (userAdmin: UserAdmin) => {
    if (loading) return;

    if (userAdmin.password !== userAdmin.confirmPassword) {
      message.error('Las contraseñas no coinciden.', 4);
      return;
    }

    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(getAuth(), userAdmin.email!, userAdmin.password as string);
      const additional = getAdditionalUserInfo(result);

      if (!additional?.isNewUser) {
        message.error('Error al registrarse.', 4);
        return;
      };

      delete userAdmin.confirmPassword;

      await post('userAdmin/create', userAdmin, abortController.current!);
    } catch (error) {
      getAuth().signOut();

      let messageError = 'Error al registrar la empresa, intentelo mas tarde.';

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            messageError = "Otra empresa ya está utilizando el correo proporcionado."
            break
          case "auth/invalid-email":
            messageError = "El correo electrónico no es válido."
            break
        }
      }

      message.error(messageError, 5);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <div className="app-login-title" style={{ display: "flex", justifyContent: "center" }}>
        <span>Registara tu empresa</span>
      </div>
      <br />
      <DynamicForm
        layout="vertical"
        onFinish={onFinish}
        loading={loading}
        textSubmit="Registrar empresa"
        styleSubmit={{ width: '100%' }}
        inputs={[
          {
            md: 24,
            typeControl: "input",
            typeInput: "text",
            label: "Nombre",
            name: "name",
            rules: [{ required: true, message: 'Favor de escribir el nombre de la empresa.' }],
          },
          {
            md: 12,
            typeControl: "input",
            typeInput: "email",
            label: "Correo electrónico",
            name: "email",
          },
          {
            required: true,
            md: 12,
            typeControl: "phone",
            label: "Teléfono",
            name: "phone",
          },
          {
            md: 24,
            typeControl: "input",
            label: "RFC",
            name: "rfc",
            rules: [{ required: true, message: 'Favor de escribir el RFC de la empresa.' }],
          },
          {
            md: 12,
            typeControl: "input",
            typeInput: "password",
            label: "Contraseña",
            name: "password",
            rules: [rulePassword],
          },
          {
            md: 12,
            typeControl: "input",
            typeInput: "password",
            label: "Confirmar contraseña",
            name: "confirmPassword",
            rules: [rulePassword],
          },
          {
            md: 24,
            typeControl: "textarea",
            typeInput: "text",
            label: "Descripción",
            name: "description",
          }
        ]}
      />
    </div>
  )
}

export default SingUp;