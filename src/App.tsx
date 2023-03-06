import "bootstrap/dist/css/bootstrap.min.css";
import ScenesSection from "./components/ScenesSection";
import ButtonsSection from "./components/ButtonsSection";
import IpAddressSection from "./components/IpAddressSection";
import { useState } from "react";
import ConnectUI from "./components/ConnectUI";

function App() {
  const [connected, setConnected] = useState(false);
  return !connected ? (
    <ConnectUI connectionSuccess={() => setConnected(true)} />
  ) : (
    <div>
      <ButtonsSection />
      <ScenesSection />
      <IpAddressSection />
    </div>
  );
}

export default App;
