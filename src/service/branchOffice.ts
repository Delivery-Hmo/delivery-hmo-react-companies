import { getCurrentToken } from "../utils";

const baseUrl = "https://www.deliapihmo.xyz/";

export const get = async (url: string) => {
  const token = await getCurrentToken();

  const response = await fetch(
    baseUrl + url,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    }
  );

  return response.json();
}

export const post = async (url: string, body: Record<string, any>) => {
  const token = await getCurrentToken();

  const response = await fetch(
    baseUrl + url,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: "Bearer " + token
      }
    }
  );

  return response.json();
}