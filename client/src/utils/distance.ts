import { Coordinates } from "./types";

export const calculateDistance = (pointA: Coordinates, pointB: Coordinates) =>
  Math.sqrt(
    Math.pow(pointB[0] - pointA[0], 2) + Math.pow(pointB[1] - pointA[1], 2)
  );
