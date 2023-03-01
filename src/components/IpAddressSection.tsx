import Section from "./Section";

function IpAddressSection() {
  return (
    <Section title="IP Address">{process.env.REACT_APP_IP_ADDRESS}</Section>
  );
}

export default IpAddressSection;
