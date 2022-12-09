import { User, onIdTokenChanged, getAuth } from 'firebase/auth';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { message, Modal } from "antd";

export const getCurrentToken = () => new Promise<string>((resolve) => {
  const uns = onIdTokenChanged(getAuth(), async (user: User | null) => {
    uns();

    if (user) {
      const token = await user.getIdToken();
      resolve(token);
      return;
    }

    resolve("");
  });
});
 
export const dialogDelete = (fun: () => Promise<any>, messageError: string) =>
  new Promise((resolve) => Modal.confirm({
    title: 'Eliminar',
    icon: <ExclamationCircleOutlined />,
    content: '¿Seguro que deseas eliminar este registro?',
    okText: 'Aceptar',
    cancelText: 'Cancelar',
    onOk: async () => {
      try {
        await fun();
        message.success(messageError);
        resolve(true);
      } catch (error) {
        console.log(error);
        message.error("Error al eliminar el registro.", 4)
        resolve(false)
      }
    },
  }));
