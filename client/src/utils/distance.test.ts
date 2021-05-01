import { calculateDistance } from "./distance";

describe("Distance", () => {
  test.each`
    pointA      | pointB      | expectedDistanceRounded
    ${[0, 0]}   | ${[2, 2]}   | ${2.83}
    ${[0, 1]}   | ${[-3, 2]}  | ${3.16}
    ${[1, 1]}   | ${[1, 1]}   | ${0}
    ${[-3, -3]} | ${[-4, -4]} | ${1.41}
  `(
    "calculateDistance($pointA, $pointB) should return $expectedDistanceRounded",
    ({ pointA, pointB, expectedDistanceRounded }) => {
      const distance = calculateDistance(pointA, pointB);
      expect(Math.round(distance * 100) / 100).toEqual(expectedDistanceRounded);
    }
  );
});
