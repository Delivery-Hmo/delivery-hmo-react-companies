import { RcFile } from "antd/es/upload";
import { ref, uploadBytes, getDownloadURL, getStorage, deleteObject } from "firebase/storage";

const storage = getStorage();

export const uploadFile = async (path: string, file: RcFile) => {
  try {
    const url = path + "/" + new Date().toString() + " - " + file.name;
    const storageRef = ref(storage, url);

    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    throw new Error("Error al subir el archivo.");
  }
}

export const deleteFile = (url: string) => deleteObject(ref(storage, url));