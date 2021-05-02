import { getLinkStations } from "./linkStation";
import { calculatePower } from "./power";

import { LinkStation, StationWithPower } from "./types";
import { Coordinates } from "../utils/types";

export const findBestLinkStation = ([deviceX, deviceY]: Coordinates):
  | StationWithPower
  | undefined => {
  const linkStations = getLinkStations();

  return linkStations.reduce(
    (bestStation: StationWithPower | undefined, station: LinkStation) => {
      const maxPower = bestStation?.power;
      const power = calculatePower(station, [deviceX, deviceY]);

      if (power && (!maxPower || power >= maxPower)) {
        return {
          station,
          power
        };
      }

      return bestStation;
    },
    undefined
  );
};
