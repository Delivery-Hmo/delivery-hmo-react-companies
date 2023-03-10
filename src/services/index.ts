import { getCurrentToken } from '../utils/functions';

const baseUrl = "http://localhost:3001/";
//const baseUrl = process.env.REACT_APP_SERVER_lOCAL;

const getHeaders = (token: string) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: "Bearer " + token
});

export const get = async <T>(url: string, controller?: AbortController) => {
  const token = await getCurrentToken()

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

  return response.json() as T;
}

export const post = async <T>(url: string, body: Record<string, any>) => {
  const token = await getCurrentToken()

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

  return response.json() as T
}

export const put = async <T>(url: string, body: Record<string, any>) => {
  const token = await getCurrentToken()

  const response = await fetch(
    baseUrl + url,
    {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: getHeaders(token)
    }
  )

  if (!response.ok) {
    throw new Error('Error request!')
  }

  return response.json() as T
}

export const patch = async (url: string, body: Record<string, any>) => {
  const token = await getCurrentToken()

  const response = await fetch(
    baseUrl + url,
    {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: getHeaders(token)
    }
  )

  if (!response.ok) {
    throw new Error('Error request!')
  }

  return response.json()
}