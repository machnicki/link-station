import { Coordinates } from "../utils/types";
import { Device } from "../models/device";

type Request = {
  coordinates: string;
};

export type Response =
  | {
      station: [x: number, y: number, r: number];
      power: number;
    }
  | undefined;

const validateRequest = (coordinates: any[]): void => {
  if (!(coordinates && coordinates.length === 2)) {
    throw new Error("You must pass coordinates parameters in proper format");
  }

  if (!coordinates.every((cord) => Number.isInteger(cord))) {
    throw new Error("coordinates must be integer");
  }
};

export const bestLinkStationService = (params: Request): Response => {
  const coordinates = params?.coordinates
    ?.split(",")
    .map((cord) => parseInt(cord, 10));

  validateRequest(coordinates);

  const device = new Device(...(coordinates as Coordinates));
  const bestLinkStation = device.findBestLinkStation();

  if (bestLinkStation) {
    const { station, power } = bestLinkStation;

    return {
      station: [station.cordX, station.cordY, station.reach],
      power
    };
  }

  return undefined;
};
