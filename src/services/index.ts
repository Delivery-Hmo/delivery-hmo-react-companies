import { UploadFile } from "antd";
import { getCurrentToken } from '../utils/functions';
import { uploadFile } from "./firebaseStorage";

const baseUrl = "http://localhost:3001/";
//const baseUrl = process.env.REACT_APP_SERVER_lOCAL;

const getHeaders = (token: string) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: "Bearer " + token
});

export const get = async <T>(url: string, controller?: AbortController) => {
  const token = await getCurrentToken();

  if(!token) throw new Error("Error al obtener el token.");

  const response = await fetch(
    baseUrl + url,
    {
      method: 'GET',
      headers: getHeaders(token),
      signal: controller?.signal
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json() as Promise<T>;
}

export const post = async <T>(url: string, body: Record<string, any>) => {
  try {
    const token = await getCurrentToken();

    if(!token) throw new Error("Error al obtener el token.");

    body = await uploadFileStorage(url, body);

    const response = await fetch(
      baseUrl + url,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: getHeaders(token)
      }
    )
  
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    return response.json() as Promise<T>;
  } catch (error) {
    throw handleError(error);
  }
}

export const put = async <T>(url: string, body: Record<string, any>) => {
  try {
    const token = await getCurrentToken();

    if(!token) throw new Error("Error al obtener el token.");

    body = await uploadFileStorage(url, body);

    const response = await fetch(
      baseUrl + url,
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: getHeaders(token)
      }
    )
  
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
  
    return response.json() as Promise<T>;
  } catch (error) {
    throw handleError(error);
  }
}

export const patch = async <T>(url: string, body: Record<string, any>) => {
  const token = await getCurrentToken();

  if(!token) throw new Error("Error al obtener el token.");

  const response = await fetch(
    baseUrl + url,
    {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: getHeaders(token)
    }
  )

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json() as Promise<T>; 
}

const handleError = (error: any) => {
  if (error instanceof Error) {
    throw new Error(error.message);
  }

  throw new Error(error as string);
}

const uploadFileStorage = async (url: string, body: Record<string, any>) => {
  try {
    if (body?.image?.length) {
      const imageUploadFile = body?.image[0] as UploadFile;
  
      if(!imageUploadFile.url?.includes("https://firebasestorage.googleapis.com/")) {
        const imageFile = imageUploadFile.originFileObj!;
  
        const imageUrl = await uploadFile("images/" + url.split("/")[0], imageFile);
  
        body.image = imageUrl;
      }
    }

    return body;
  } catch (error) {
    console.log(error);
    throw new Error("Error al subir el archivo.");
  }
}