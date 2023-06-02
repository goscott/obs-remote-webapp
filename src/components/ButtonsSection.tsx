import VirtualCameraControl from "./VirtualCameraControl";
import Section from "./Section";
import DiscordMuteButton from "./DiscordMuteControl";

function ButtonsSection() {
  return (
    <Section title="Controls">
      <VirtualCameraControl />
      <DiscordMuteButton />
    </Section>
  );
}

export default ButtonsSection;
