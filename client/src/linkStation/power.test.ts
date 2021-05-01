import { calculatePower } from "./power";

describe("Link station power", () => {
  test.each`
    linkStation    | deviceCoordinates | expectedPower
    ${[0, 0, 1]}   | ${[2, 2]}         | ${0}
    ${[0, 1, 12]}  | ${[-3, 2]}        | ${78.1053}
    ${[1, 1, 10]}  | ${[1, 1]}         | ${100}
    ${[-3, -3, 1]} | ${[-4, -4]}       | ${0}
  `(
    "calculatePower($linkStation, $pointB) should return $expectedDistanceRounded",
    ({ linkStation, deviceCoordinates, expectedPower }) => {
      const power = calculatePower(linkStation, deviceCoordinates);
      expect(power).toEqual(expectedPower);
    }
  );
});
