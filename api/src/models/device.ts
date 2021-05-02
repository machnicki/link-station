import { getLinkStations, LinkStation } from "./linkStation";
import { calculateDistance } from "../utils/distance";

type StationWithPower = {
  station: LinkStation;
  power: number;
};

export class Device {
  cordX: number;
  cordY: number;

  constructor(x: number, y: number) {
    this.cordX = x;
    this.cordY = y;
  }

  calculatePowerForStation(station: LinkStation): number {
    const distance = calculateDistance(
      [this.cordX, this.cordY],
      [station.cordX, station.cordX]
    );
    const power =
      distance > station.reach ? 0 : Math.pow(station.reach - distance, 2);

    return Math.round(power * 10000) / 10000;
  }

  findBestLinkStation(): StationWithPower | undefined {
    const linkStations = getLinkStations();

    return linkStations.reduce(
      (bestStation: StationWithPower | undefined, station: LinkStation) => {
        const maxPower = bestStation?.power;
        const power = station.calculatePowerForCoordinates(
          this.cordX,
          this.cordY
        );

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
  }
}
