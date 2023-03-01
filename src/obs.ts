import { OBSRequestTypes } from "obs-websocket-js";

// let websocket: OBSWebSocket | undefined;

// const checkConnection = async (): Promise<boolean> => {
//   if (!websocket) {
//     return false;
//   }
//   try {
//     await websocket.connect(undefined, "password");
//     return true;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };

// const getObsWebsocket = async (): Promise<OBSWebSocket> => {
//   if (!websocket || (await checkConnection())) {
//     console.log("Connecting to OBS");
//     const obs = new OBSWebSocket();
//     await obs.connect(undefined, "password");
//     websocket = obs;
//   }
//   return websocket;
// };

export const callObs = async (path: keyof OBSRequestTypes, body?: any) => {
  const url = `http://${process.env.REACT_APP_IP_ADDRESS}:5001/${path}`;
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
