import { Modal, UploadFile, message } from "antd";
import { RcFile } from "antd/es/upload";
import { User, onIdTokenChanged, getAuth } from 'firebase/auth';
import { BranchOffice, UserAdmin, UserDeliveryMan, UserSeller } from "../interfaces/user";
import { Users } from "../types";

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

export const sleep = (time: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

export const validFiles = (fileList: RcFile[], accept: string, showMessageError?: boolean) => {
  for (let index = 0; index < fileList.length; index++) {
    const file = fileList[index];
    const types = accept.split(",").map(type => type.trim()) || [];

    if (!types.includes(file.type!)) {
      if (showMessageError) {
        message.error(`Formato incorrecto.`, 4);
      }

      return false;
    }
  }

  return true;
}

export const onPreviewImage = async (file: UploadFile) => {
  let src = file.url as string;

  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();

      reader.readAsDataURL(file.originFileObj!);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve("");
    });

    if (!src) {
      message.error(`No se pudo obtener la imagen.`, 4);
      return;
    }
  }

  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
}

export const setImagesToState = <T extends { image?: string | UploadFile[], images?: string[] | UploadFile[] }>(state: T) => {
  const _state = { ...state };

  if (_state.image) {
    const url = _state.image as string;

    const imageUploadFile: UploadFile = {
      name: url,
      uid: url,
      thumbUrl: url,
      url,
      status: "done"
    };

    _state.image = [imageUploadFile];
  }

  if (_state.images?.length) {
    _state.images = _state.images.map(url => {
      url = _state.image as string;

      const imageUploadFile: UploadFile = {
        name: url,
        uid: url,
        thumbUrl: url,
        url,
        status: "done"
      };

      return imageUploadFile;
    });
  }

  return _state;
}

export const isUserAdmin = (user: Users): user is UserAdmin => {
  return user.role === "Administrador";
}

export const isBranchOffice = (user: Users): user is BranchOffice => {
  return user.role === "Administrador sucursal";
}

export const isSeller = (user: Users): user is UserDeliveryMan => {
  return user.role === "Repartidor";
}

export const isUserDeliveryMan = (user: Users): user is UserSeller => {
  return user.role === "Vendedor";
}

export const fileToBase64 = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

export const handleError = (error: any) => {
  if (error instanceof Error) {
    throw new Error(error.message);
  }

  throw new Error(error as string);
}

export const confirmDialog = <T>(fun: () => Promise<T>) =>
  new Promise<T>((resolve, reject) => Modal.confirm({
    title: 'Eliminar',
    icon: '\u26A0',
    content: '¿Seguro que deseas eliminar este registro?',
    okText: 'Aceptar',
    cancelText: 'Cancelar',
    onOk: async () => {
      try {
        const res = await fun();
        message.success("Registro eliminado con éxito!");
        resolve(res);
      } catch (error) {
        console.log(error);
        message.error("Error al eliminar el registro.", 4)
        reject(error)
      }
    },
  }));