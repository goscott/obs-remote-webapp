import ButtonControl from "./ButtonControl";

function VirtualCameraControl() {
  return (
    <ButtonControl
      label="Virtual Camera"
      obsCalls={{
        checkStatus: "GetVirtualCamStatus",
        turnOn: "StartVirtualCam",
        turnOff: "StopVirtualCam",
      }}
      responseParser={(response) => response.outputActive}
    />
  );
}

export default VirtualCameraControl;
