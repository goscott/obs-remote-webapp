import { mute, unMute } from "../discord";
import { callObs } from "../obs";
import Button from "react-bootstrap/Button";

const MUTE_SCENES = ["standby"];

export interface SceneControlProps {
  sceneName: string;
  current: boolean;
  reload: () => void;
}

function SceneControl(props: SceneControlProps) {
  const setScene = async () => {
    await callObs("SetCurrentProgramScene", { sceneName: props.sceneName });
    props.reload();
  };

  return (
    <Button
      onClick={async () => {
        await setScene();
        if (MUTE_SCENES.includes(props.sceneName.toLowerCase())) {
          await mute();
        } else {
          await unMute();
        }
      }}
      variant={props.current ? "primary" : "secondary"}
    >
      {props.sceneName}
    </Button>
  );
}

export default SceneControl;
