import { RcFile } from "antd/es/upload";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../firebaseConfig";

export const uploadFile = async (path: string, file: RcFile) => {
  try {
    const url = path + "/" + new Date().toString() + " - " + file.name;
    const storageRef = ref(storage, url);

    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.log(error);
    throw new Error("Error al subir el archivo.");
  }
}

export const deleteFile = (url: string) => deleteObject(ref(storage, url));
