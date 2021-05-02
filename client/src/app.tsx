import "./styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Coordinates } from "link-station-api/src/utils/types";
import { Form } from "./components/form";
import { Results } from "./components/results";

const devices: Coordinates[] = [
  [0, 0],
  [100, 100],
  [15, 10],
  [18, 18]
];

export default function App() {
  const [chosenDevice, setChosenDevice] = useState<Coordinates | undefined>();
  const handleFormSubmit = (device: Coordinates) => {
    setChosenDevice(device);
  };

  return (
    <div className="App">
      <h1>Find the best link station</h1>
      <Container>
        <Row>
          <Col>
            <Form devices={devices} onSubmit={handleFormSubmit} />
          </Col>
          <Col>
            <Results device={chosenDevice} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
