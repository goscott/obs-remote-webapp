import { OBSRequestTypes } from "obs-websocket-js";

export interface ApiConfig {
  host: string;
  port: string;
}

let apiConfig: ApiConfig = { host: "", port: "5001" };

export const setApiConfig = (newApiCongig: ApiConfig) => {
  apiConfig = newApiCongig;
};

export const getApiConfig = () => apiConfig;

export const callObs = async (path: keyof OBSRequestTypes, body?: any) => {
  const url = `http://${apiConfig.host}:${apiConfig.port}/${path}`;
  const method = path.startsWith("Get") ? "GET" : "POST";
  console.log(`Sending ${method} call to ${url}`);
  const response = await fetch(url, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    method,
  });
  return await response.json();
};
