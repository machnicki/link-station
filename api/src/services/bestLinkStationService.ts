import { Coordinates } from "../utils/types";
import { StationWithPower } from "../linkStation/types";
import { findBestLinkStation } from "../linkStation/findBestLinkStation";

type Request = {
  coordinates: Coordinates;
};

type Response = StationWithPower | undefined;

const validateRequest = (params: Request): void => {
  console.log("===> params", params);

  if (
    !(Array.isArray(params?.coordinates) && params?.coordinates.length === 2)
  ) {
    throw new Error("You must pass coordinates parameters in proper format");
  }

  if (!params.coordinates.every((coord) => Number.isInteger(coord))) {
    throw new Error("coordinates must be integer");
  }
};

export const bestLinkStationService = (params: Request): Response => {
  validateRequest(params);

  return findBestLinkStation(params.coordinates);
};
