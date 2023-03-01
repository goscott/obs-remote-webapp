import { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { callObs } from "../obs";
import SceneControl from "./SceneControl";
import LoadingIcon from "./LoadingIcon";
import Section from "./Section";

function ScenesSection() {
  const [loading, setLoading] = useState(true);
  const [currentScene, setCurrentScene] = useState<string>();
  const [scenes, setScenes] = useState<string[]>();

  useEffect(() => {
    console.log(`ScenesSection useEffect. Loading=${loading}`);
    const loadScenes = async () => {
      console.log("Reloading scene list");
      const response = await callObs("GetSceneList");
      console.log(response);
      setCurrentScene(response.currentProgramSceneName);
      setScenes(response.scenes.map((_: any) => _.sceneName).sort());
    };
    if (loading) {
      loadScenes()
        .catch(console.error)
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);

  return (
    <Section title="Scenes">
      <ButtonGroup vertical style={{ width: "100%" }}>
        {!scenes ? (
          <LoadingIcon />
        ) : (
          scenes.map((_, index) => (
            <SceneControl
              key={index}
              sceneName={_}
              current={_ === currentScene}
              reload={() => setLoading(true)}
            />
          ))
        )}
      </ButtonGroup>
    </Section>
  );
}

export default ScenesSection;
