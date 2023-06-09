import "bootstrap/dist/css/bootstrap.min.css";
import ScenesSection from "./components/ScenesSection";
import ButtonsSection from "./components/ButtonsSection";
import { useState } from "react";
import ConnectUI from "./components/ConnectUI";
import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import DiscordMembersSection from "./components/DiscordMembersSection";

function App() {
  const [connected, setConnected] = useState(false);
  // eslint-disable-next-line
  const [_cookies, setCookie] = useCookies(["host", "port"]);
  return (
    <div>
      {!connected ? (
        <ConnectUI connectionSuccess={() => setConnected(true)} />
      ) : (
        <div>
          <ButtonsSection />
          <ScenesSection />
          <DiscordMembersSection />
          <Button
            type="submit"
            variant="contained"
            sx={{ m: 3 }}
            color="error"
            onClick={async () => {
              setCookie("host", "");
              setCookie("port", "");
              setConnected(false);
            }}
          >
            Reconnect
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
