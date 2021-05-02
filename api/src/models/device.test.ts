import { Device } from "./device";
import { getLinkStations, LinkStation } from "./linkStation";

jest.mock("./linkStation", () => ({
  ...jest.requireActual("./linkStation"),
  getLinkStations: jest.fn(() => [
    new LinkStation(0, 0, 10),
    new LinkStation(20, 20, 5),
    new LinkStation(10, 0, 12)
  ])
}));

describe("#Device", () => {
  it("should find best link station", () => {
    let device = new Device(0, 0);

    expect(device.findBestLinkStation()).toEqual({
      power: 100,
      station: new LinkStation(0, 0, 10)
    });

    expect(getLinkStations).toBeCalledTimes(1);

    device = new Device(100, 100);
    expect(device.findBestLinkStation()).toEqual(undefined);

    device = new Device(15, 10);
    expect(device.findBestLinkStation()).toEqual({
      power: 0.6718,
      station: new LinkStation(10, 0, 12)
    });

    device = new Device(18, 18);
    expect(device.findBestLinkStation()).toEqual({
      power: 4.7157,
      station: new LinkStation(20, 20, 5)
    });

    expect(getLinkStations).toBeCalledTimes(4);
  });
});
