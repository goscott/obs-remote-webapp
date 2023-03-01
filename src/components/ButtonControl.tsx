import { OBSRequestTypes } from "obs-websocket-js";
import { useEffect, useState } from "react";
import { callObs } from "../obs";
import { Button } from "react-bootstrap";

export interface ButtonControlProps {
  label: string;
  obsCalls: {
    checkStatus: keyof OBSRequestTypes;
    turnOn: keyof OBSRequestTypes;
    turnOff: keyof OBSRequestTypes;
  };
  responseParser: (output: any) => boolean;
}

function ButtonControl(props: ButtonControlProps) {
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState<boolean>();

  useEffect(() => {
    const loadStatus = async () => {
      const response = await callObs(props.obsCalls.checkStatus);
      console.log(response);
      setChecked(props.responseParser(response));
    };
    if (loading) {
      loadStatus()
        .catch(console.error)
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);

  const start = async () => {
    try {
      await callObs(props.obsCalls.turnOn);
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  const stop = async () => {
    try {
      await callObs(props.obsCalls.turnOff);
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      disabled={loading}
      variant={checked ? "danger" : "secondary"}
      onClick={checked ? stop : start}
    >
      {props.label}
    </Button>
  );
}

export default ButtonControl;
