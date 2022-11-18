import { getCurrentToken } from '../utils';

// const baseUrl = "https://www.deliapihmo.xyz/";
const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_LOCAL: process.env.REACT_APP_SERVER;

export const get = async (url: string, controller?: AbortController) => {
  const token = await getCurrentToken()

  const response = await fetch(
    baseUrl + url,
    {
      method: 'GET',
      headers: token
        ? { Authorization: 'Bearer ' + token,  }
        : undefined,
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
      headers: token
        ? { 
            Authorization: 'Bearer ' + token, 
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        : undefined
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
      headers: token
        ? { Authorization: 'Bearer ' + token}
        : undefined
    }
  )

  if (!response.ok) {
    throw new Error('Error request!')
  }

  return response.json()
}
