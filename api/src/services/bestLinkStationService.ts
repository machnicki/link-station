import { Coordinates } from "../utils/types";
import { StationWithPower } from "../linkStation/types";
import { findBestLinkStation } from "../linkStation/findBestLinkStation";

type Request = {
  coordinates: string;
};

type Response = StationWithPower | undefined;

const validateRequest = (coordinates: any[]): void => {
  if (!(coordinates && coordinates.length === 2)) {
    throw new Error("You must pass coordinates parameters in proper format");
  }

  if (!coordinates.every((coord) => Number.isInteger(coord))) {
    throw new Error("coordinates must be integer");
  }
};

export const bestLinkStationService = (params: Request): Response => {
  const coordinates = params?.coordinates
    ?.split(",")
    .map((coord) => parseInt(coord, 10));

  validateRequest(coordinates);

  return findBestLinkStation(coordinates as Coordinates);
};
