import { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { getHardwareStats } from "../obs";
import LoadingIcon from "./LoadingIcon";
import Section from "./Section";

function HardwareSection() {
  const [stats, setStats] = useState<Record<string, number>>();

  useEffect(() => {}, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      console.log("Reloading hardware stats");
      const response = await getHardwareStats();
      setStats(response);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section title="Hardware">
      <ButtonGroup vertical style={{ width: "100%" }}>
        {!stats ? (
          <LoadingIcon />
        ) : (
          Object.keys(stats)
            .sort()
            .map((key, index) => (
              <p key={index}>
                {key.toUpperCase()}: {stats[key]}
              </p>
            ))
        )}
      </ButtonGroup>
    </Section>
  );
}

export default HardwareSection;
