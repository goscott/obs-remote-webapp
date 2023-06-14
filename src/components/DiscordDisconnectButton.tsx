import { Button } from "react-bootstrap";
import { FaDiscord } from "react-icons/fa";
import { hangUp } from "../discord";

function DiscordDisconnectButton() {
  return (
    <Button
      style={{ marginTop: "10px" }}
      variant={"danger"}
      onDoubleClick={hangUp}
    >
      Hang Up <FaDiscord />
    </Button>
  );
}

export default DiscordDisconnectButton;
