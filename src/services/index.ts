import { getCurrentToken } from '../utils';

// const baseUrl = "https://www.deliapihmo.xyz/";
const baseUrl = 'http://localhost:3001/';

const getHeaders = (token: string) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: "Bearer " + token
});

export const get = async (url: string, controller?: AbortController) => {
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
    throw new Error('Error request!');
  }

  return response.json();
}

export const post = async (url: string, body: Record<string, any>) => {
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
    throw new Error('Error request!')
  }

  return response.json()
}

export const put = async (url: string, body: Record<string, any>) => {
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

  return response.json()
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