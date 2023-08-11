import { message } from 'antd';
import { getAdditionalUserInfo, getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { UserAdmin } from '../../../interfaces/user';
import { post } from '../../../services';
import DynamicForm from '../../dynamicForm';
import useAbortController from "../../../hooks/useAbortController";
import { rulePassword } from "../../../constants";
import { useAuth } from "../../../context/authContext";

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
      const additional = getAdditionalUserInfo(result);

      if (!additional?.isNewUser) {
        message.error('Error esta cuenta ya esta registrada.', 4);
        return;
      };

      delete userAdmin.confirmPassword;

      await updateProfile(result.user, { displayName: "Administrador" });
      await post('userAdmin/create', userAdmin, abortController.current!);
    } catch (error) {
      getAuth().signOut();
    } finally {
      setCreatingUser(false);
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