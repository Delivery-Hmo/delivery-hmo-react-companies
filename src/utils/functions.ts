import { UploadFile, message } from "antd";
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

export const sleep = (time: number) => new Promise((resolve) => setTimeout(() => resolve(null), time));

export const getSrcFromFile = (file: File) => new Promise<string>((resolve) => {
  const reader = new FileReader();
  
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = () => resolve("");
});

export const validFiles = (fileList: RcFile[], accept: string, showMessageError?: boolean) => {
  for (let index = 0; index < fileList.length; index++) {
    const file = fileList[index];
    const types = accept.split(",").map(type => type.trim()) || [];

    if (!types.includes(file.type!)) {
      if(showMessageError) {
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
  if (state.image) {
    const url = state.image as string;
    
    const imageUploadFile: UploadFile = {
      name: url,
      uid: url,
      thumbUrl: url,
      url,
      status: "done"
    };

    state.image = [imageUploadFile];
  }

  if (state.images?.length) {
    state.images = state.images.map(url => {
      url = state.image as string;

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

  return state;
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