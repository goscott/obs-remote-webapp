import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Card } from "react-bootstrap";
import VirtualCameraControl from "./VirtualCameraControl";

export interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section(props: SectionProps) {
  return (
    <Card className="Section" style={{ width: "20rem" }}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <ButtonGroup vertical style={{ width: "100%" }}>
          {props.children}
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}

export default Section;
