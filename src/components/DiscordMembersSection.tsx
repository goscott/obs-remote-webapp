import { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import LoadingIcon from "./LoadingIcon";
import Section from "./Section";
import { getMembers } from "../discord";

function DiscordMembersSection() {
  const [members, setMembers] = useState<string[]>();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await getMembers();
        setMembers(response.members);
      } catch (error) {
        console.log(error);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section title="Discord Members">
      <ButtonGroup vertical style={{ width: "100%" }}>
        {!members ? (
          <LoadingIcon />
        ) : members.length ? (
          members.map((member, index) => <div key={index}>{member}</div>)
        ) : (
          <i>The voice call is currently empty</i>
        )}
      </ButtonGroup>
    </Section>
  );
}

export default DiscordMembersSection;
