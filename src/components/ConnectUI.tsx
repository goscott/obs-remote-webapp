import { useEffect, useState } from "react";
import { callObs, setApiConfig } from "../obs";
import { useCookies } from "react-cookie";
import { Card, TextField, Typography, Button } from "@mui/material";

export interface ConnectUIProps {
  connectionSuccess: () => void;
}

function ConnectUI(props: ConnectUIProps) {
  const [cookies, setCookie] = useCookies(["host", "port"]);
  const [host, setHost] = useState<string>(cookies.host);
  const [port, setPort] = useState<string>(cookies.port);
  const [showError, setShowError] = useState(false);

  const setConnectionSuccess = props.connectionSuccess;

  useEffect(() => {
    const checkSavedConfig = async () => {
      try {
        if (
          cookies.host &&
          cookies.host.length &&
          cookies.port &&
          cookies.port.length
        ) {
          await setApiConfig({ host: cookies.host, port: cookies.port });
          console.log(await callObs("GetSceneList"));
          setConnectionSuccess();
        }
      } catch (error) {
        setShowError(true);
      }
    };

    checkSavedConfig().catch(console.error);
  }, [cookies, setConnectionSuccess]);

  return (
    <Card
      sx={{ maxWidth: 600, minWidth: 350, marginTop: "20px" }}
      raised={true}
    >
      <div style={{ margin: "20px" }}>
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Enter OBS remote configuration
        </Typography>
        {showError && (
          <Typography variant="body2" sx={{ marginBottom: "25px" }}>
            Unable to connect!
          </Typography>
        )}
        <TextField
          style={{ marginTop: "10px", marginRight: "10px" }}
          value={host}
          onChange={(event) => {
            setHost(event.target.value.trim());
            setShowError(false);
          }}
          label="IP Address"
        />
        <TextField
          style={{ marginTop: "10px", marginRight: "10px" }}
          value={port}
          onChange={(event) => {
            setPort(event.target.value.trim());
            setShowError(false);
          }}
          label="Port"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={async () => {
            setCookie("host", host);
            setCookie("port", port);
          }}
        >
          Connect
        </Button>
      </div>
    </Card>
  );
}

export default ConnectUI;
