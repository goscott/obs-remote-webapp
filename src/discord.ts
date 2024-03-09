import { ApiConfig } from "./obs";

let apiConfig: ApiConfig = { host: "", port: "" };

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

export const getMembers = async (): Promise<{ members: string[] }> => {
  return callDiscordApi("members", "GET");
};

export const hangUp = async (): Promise<{ disconnect: boolean }> => {
  return callDiscordApi("disconnect", "POST");
};

const callDiscordApi = async (
  path: string,
  method: "GET" | "POST" | "DELETE"
) => {
  const url = `http://${apiConfig.host}:${apiConfig.port}/${path}`;
  console.log(`Sending ${method} call to ${url}`);
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
  });
  return await response.json();
};
