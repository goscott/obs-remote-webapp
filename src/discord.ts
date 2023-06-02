import { ApiConfig } from "./obs";

let apiConfig: ApiConfig = { host: "", port: "5002" };

export const setDiscordApiConfig = (newApiCongig: ApiConfig) => {
  apiConfig = newApiCongig;
};

export const isMuted = async () => {
  return callDiscordApi("mute", "GET");
};

export const mute = async () => {
  await callDiscordApi("mute", "POST");
};

export const unMute = async () => {
  await callDiscordApi("mute", "DELETE");
};

const callDiscordApi = async (
  path: string,
  method: "GET" | "POST" | "DELETE"
) => {
  const url = `http://${apiConfig.host}:${apiConfig.port}/${path}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
  });
  return await response.json();
};
