import { getCurrentToken } from '../utils'

<<<<<<< HEAD
//const baseUrl = "https://www.deliapihmo.xyz/";
const baseUrl = "http://localhost:3001/"
=======
const baseUrl = 'https://www.deliapihmo.xyz/'
>>>>>>> dev

export const get = async (url: string) => {
  const token = await getCurrentToken()

  const response = await fetch(
    baseUrl + url,
    {
<<<<<<< HEAD
      method: "GET",
      headers: token 
        ? { Authorization: "Bearer " + token }
        : undefined
=======
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
>>>>>>> dev
    }
  )

<<<<<<< HEAD
  if(!response.ok) {
    throw new Error("Error request!");
  }

  return response.json();
=======
  return response.json()
>>>>>>> dev
}

export const post = async (url: string, body: Record<string, any>) => {
  const token = await getCurrentToken()

  const response = await fetch(
    baseUrl + url,
    {
      method: 'POST',
      body: JSON.stringify(body),
<<<<<<< HEAD
      headers: token 
        ? { Authorization: "Bearer " + token }
        : undefined
=======
      headers: {
        Authorization: 'Bearer ' + token
      }
>>>>>>> dev
    }
  )

<<<<<<< HEAD
  if(!response.ok) {
    throw new Error("Error request!");
  }

  return response.json();
}
=======
  return response.json()
}
>>>>>>> dev
