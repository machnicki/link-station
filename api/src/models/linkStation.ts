import { calculateDistance } from "../utils/distance";

export class LinkStation {
  cordX: number;
  cordY: number;
  reach: number;

  constructor(x: number, y: number, r: number) {
    this.cordX = x;
    this.cordY = y;
    this.reach = r;
  }

  calculatePowerForCoordinates(cordX: number, cordY: number): number {
    const distance = calculateDistance(
      [cordX, cordY],
      [this.cordX, this.cordY]
    );
    const power =
      distance > this.reach ? 0 : Math.pow(this.reach - distance, 2);

    return Math.round(power * 10000) / 10000;
  }
}

export const getLinkStations = (): LinkStation[] => {
  return [
    [0, 0, 10],
    [20, 20, 5],
    [10, 0, 12]
  ].map(([x, y, r]) => new LinkStation(x, y, r));
};
