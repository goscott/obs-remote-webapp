import { callObs } from "../obs";
import Button from "react-bootstrap/Button";

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
      onClick={setScene}
      variant={props.current ? "primary" : "secondary"}
    >
      {props.sceneName}
    </Button>
  );
}

export default SceneControl;
