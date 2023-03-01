import "bootstrap/dist/css/bootstrap.min.css";
import ScenesSection from "./components/ScenesSection";
import ButtonsSection from "./components/ButtonsSection";
import IpAddressSection from "./components/IpAddressSection";

function App() {
  return (
    <div>
      <ButtonsSection />
      <ScenesSection />
      <IpAddressSection />
    </div>
  );
}

export default App;
