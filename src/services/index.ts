import { UploadFile } from "antd";
import { fileToBase64, getCurrentToken } from '../utils/functions';
import { baseUrlStorage } from "../constants";

const baseUrl = "http://localhost:3001/";
//const baseUrl = process.env.REACT_APP_SERVER_lOCAL;

const getHeaders = (token: string) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: "Bearer " + token
});

export const get = async <T>(url: string, controller?: AbortController) => {
  const token = await getCurrentToken();

  if (!token) throw new Error("Error al obtener el token.");

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

    if (!token) throw new Error("Error al obtener el token.");

    body = await getBodyWithBase64Files(body);

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

    if (!token) throw new Error("Error al obtener el token.");

    body = await getBodyWithBase64Files(body);

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

  if (!token) throw new Error("Error al obtener el token.");

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

const getBodyWithBase64Files = async (body: Record<string, any>) => {
  try {
    if (body?.image?.length) {
      const imageUploadFile = body?.image[0] as UploadFile;

      if (imageUploadFile.url?.includes(baseUrlStorage)) {
        body.image = imageUploadFile.url;
      }
      
      const imageFile = imageUploadFile.originFileObj!;
  
      body.image = await fileToBase64(imageFile);
    };

    if (body?.images?.length) {
      const images = body.images as UploadFile[];

      body.images = await Promise.all(images.map((image) => {
        if (image.url?.includes(baseUrlStorage)) {
          body.image = image.url;
        }
        
        const imageFile = image.originFileObj!;
    
        return fileToBase64(imageFile);
      }));
    }

    return body;
  } catch (error) {
    console.log(error);
    throw new Error("Error al formatear los archivos.");
  }
}