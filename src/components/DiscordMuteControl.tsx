import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { isMuted, mute, unMute } from "../discord";

function DiscordMuteButton() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await isMuted();
        setMuted(response.muted);
      } catch (error) {
        console.log(error);
      }
    }, 500);

    return () => clearInterval(interval);
  });

  return (
    <Button
      style={{ marginTop: "10px" }}
      variant={muted ? "secondary" : "danger"}
      onClick={async (_) => {
        if (muted) {
          setMuted(false);
          await unMute();
        } else {
          setMuted(true);
          await mute();
        }
      }}
    >
      Discord Mute {muted ? <FaMicrophoneSlash /> : <FaMicrophone />}
    </Button>
  );
}

export default DiscordMuteButton;
