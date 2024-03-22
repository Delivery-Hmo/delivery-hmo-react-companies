import { message } from 'antd';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { UserAdmin } from '../../../interfaces/user';
import { post } from '../../../services';
import DynamicForm from '../../dynamicForm';
import useAbortController from "../../../hooks/useAbortController";
import { rulePassword } from "../../../constants";
import { useAuth } from "../../../context/authContext";
import { FirebaseError } from 'firebase/app';

const SingUp = () => {
  const abortController = useAbortController();
  const { creatingUser, setCreatingUser } = useAuth();

  const onFinish = async (userAdmin: UserAdmin) => {
    if (creatingUser) return;

    if (userAdmin.password !== userAdmin.confirmPassword) {
      message.error('Las contraseñas no coinciden.', 4);
      return;
    }

    setCreatingUser(true);

    try {
      const result = await createUserWithEmailAndPassword(getAuth(), userAdmin.email!, userAdmin.password as string);

      delete userAdmin.confirmPassword;

      await updateProfile(result.user, { displayName: "Administrador" });
      await post('userAdmin/create', userAdmin, abortController.current!);
    } catch (error) {
      console.log(error);
      if (error instanceof FirebaseError && error.code === 'auth/email-already-in-use') {
        message.error('Otro usuario ya está utilizando el correo proporcionado.', 4);
      }
      getAuth().signOut();
    } finally {
      setCreatingUser(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <div className="app-login-title" style={{ display: "flex", justifyContent: "center" }}>
        <span>Registra tu restaurante, compañia, local o negocio</span>
      </div>
      <br />
      <DynamicForm
        layout="vertical"
        onFinish={onFinish}
        loading={creatingUser}
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