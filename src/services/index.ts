import { UploadFile } from "antd";
import { fileToBase64, getCurrentToken, handleError } from '../utils/functions';
import { baseUrlStorage, baseUrlStorageGCP } from "../constants";
import { ApiNames } from "../types/service";
import { Patch, Post, Put } from "../interfaces/service";

// const baseUrl = "http://localhost:3001/";
//const baseUrl = process.env.REACT_APP_SERVER_lOCAL;

const getHeaders = (token: string) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: "Bearer " + token
});

const apiUrls: Record<ApiNames, string> = {
  companies: 'http://localhost:3001/',
  products: 'http://localhost:3002/'
}

export const get = async <T>(apiName: ApiNames, url: string, abortController: AbortController) => {
  try {
    const token = await getCurrentToken();
    const response = await fetch(
      apiUrls[apiName] + url,
      {
        method: 'GET',
        headers: getHeaders(token),
        signal: abortController?.signal
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw handleError(error);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    throw handleError(error);
  }
}

export const post = async <T>({ apiName, url, body, abortController }: Post) => {
  try {
    const token = await getCurrentToken();
    body = await getBodyWithBase64Files({ ...body });
    const response = await fetch(
      apiUrls[apiName] + url,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: getHeaders(token),
        signal: abortController?.signal
      }
    )

    if (!response.ok) {
      const error = await response.json();
      throw handleError(error);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    throw handleError(error);
  }
}

export const put = async <T>({ apiName, url, body, abortController }: Put) => {
  try {
    const token = await getCurrentToken();
    body = await getBodyWithBase64Files({ ...body });
    const response = await fetch(
      apiUrls[apiName] + url,
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: getHeaders(token),
        signal: abortController?.signal
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw handleError(error);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    throw handleError(error);
  }
}

export const patch = async <T>({ apiName, url, body, abortController }: Patch) => {
  const token = await getCurrentToken();
  const response = await fetch(
    apiUrls[apiName] + url,
    {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: getHeaders(token),
      signal: abortController?.signal
    }
  )

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json() as Promise<T>;
}

const getBodyWithBase64Files = async (body: Record<string, any>) => {
  try {
    if (body?.image?.length && typeof body?.image[0] !== "string") {
      const imageUploadFile = body?.image[0] as UploadFile;

      if (imageUploadFile.url?.includes(baseUrlStorage) || imageUploadFile.url?.includes(baseUrlStorageGCP)) {
        body.image = "";
      } else {
        const imageFile = imageUploadFile.originFileObj!;

        body.image = await fileToBase64(imageFile);
      }
    };

    if (body?.images?.length) {
      const images = body.images as UploadFile[];

      body.images = await Promise.all(images.map((image) => {
        if (image.url?.includes(baseUrlStorage) || image.url?.includes(baseUrlStorageGCP)) {
          return "";
        }

        const imageFile = image.originFileObj!;

        return fileToBase64(imageFile);
      }));
    }

    return body;
  } catch (error) {
    throw handleError("Error al formatear los archivos.");
  }
}