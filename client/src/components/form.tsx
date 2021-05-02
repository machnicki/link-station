import ListGroup from "react-bootstrap/ListGroup";

import { Coordinates } from "link-station-api/src/utils/types";

export const Form = ({
  devices,
  onSubmit = () => null
}: {
  devices: Coordinates[];
  onSubmit?: (arg: Coordinates) => any;
}) => {
  return (
    <div>
      <ListGroup defaultActiveKey="#link1">
        {devices.map((device) => (
          <ListGroup.Item
            key={device.join()}
            action
            onClick={() => onSubmit(device)}
          >
            {`Device with coordinates X: ${device[0]}, Y: ${device[1]}`}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};
