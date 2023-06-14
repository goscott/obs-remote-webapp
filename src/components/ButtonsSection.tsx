import VirtualCameraControl from "./VirtualCameraControl";
import Section from "./Section";
import DiscordMuteButton from "./DiscordMuteControl";
import DiscordDisconnectButton from "./DiscordDisconnectButton";

function ButtonsSection() {
  return (
    <Section title="Controls">
      <VirtualCameraControl />
      <DiscordMuteButton />
      <DiscordDisconnectButton />
    </Section>
  );
}

export default ButtonsSection;
