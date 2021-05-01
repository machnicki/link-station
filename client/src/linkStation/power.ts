import { calculateDistance } from "../utils/distance";

import { LinkStation } from "./types";
import { Coordinates } from "../utils/types";

export const calculatePower = (
  linkStation: LinkStation,
  deviceCoordinates: Coordinates
) => {
  const [stationX, stationY, reach] = linkStation;
  const distance = calculateDistance(deviceCoordinates, [stationX, stationY]);
  const power = distance > reach ? 0 : Math.pow(reach - distance, 2);

  return Math.round(power * 10000) / 10000;
};
