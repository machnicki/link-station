import { LinkStation } from "./linkStation";

describe("#LinkStation", () => {
  test.each`
    linkStation    | deviceCoordinates | expectedPower
    ${[0, 0, 1]}   | ${[2, 2]}         | ${0}
    ${[0, 1, 12]}  | ${[-3, 2]}        | ${78.1053}
    ${[1, 1, 10]}  | ${[1, 1]}         | ${100}
    ${[-3, -3, 1]} | ${[-4, -4]}       | ${0}
  `(
    "calculatePowerForCoordinates(...$deviceCoordinates) should return $expectedPower",
    ({ linkStation, deviceCoordinates, expectedPower }) => {
      const _linkStation = new LinkStation(
        linkStation[0],
        linkStation[1],
        linkStation[2]
      );
      const power = _linkStation.calculatePowerForCoordinates(
        deviceCoordinates[0],
        deviceCoordinates[1]
      );
      expect(power).toEqual(expectedPower);
    }
  );
});
