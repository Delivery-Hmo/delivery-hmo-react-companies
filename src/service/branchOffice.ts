import { getCurrentToken } from "../utils";

//const baseUrl = "https://www.deliapihmo.xyz/";
const baseUrl = "http://localhost:3001/"

export const get = async (url: string) => {
  const token = await getCurrentToken();

  const response = await fetch(
    baseUrl + url,
    {
      method: "GET",
      headers: token 
        ? { Authorization: "Bearer " + token }
        : undefined
    }
  );

  if(!response.ok) {
    throw new Error("Error request!");
  }

  return response.json();
}

export const post = async (url: string, body: Record<string, any>) => {
  const token = await getCurrentToken();

  const response = await fetch(
    baseUrl + url,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: token 
        ? { Authorization: "Bearer " + token }
        : undefined
    }
  );

  if(!response.ok) {
    throw new Error("Error request!");
  }

  return response.json();
}