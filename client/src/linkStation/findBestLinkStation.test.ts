import { findBestLinkStation } from "./findBestLinkStation";

// not supported by codesandbox - normally I would mock this
// jest.mock("./linkStation", () => ({
//   getLinkStations: () => [
//     [0, 0, 10],
//     [20, 20, 5],
//     [10, 0, 12]
//   ]
// }));

describe("findBestLinkStation", () => {
  it("should return link station with highest power", () => {
    expect(findBestLinkStation([0, 0])).toEqual({
      power: 100,
      station: [0, 0, 10]
    });
    // expect(linkStation).toBeCalledTimes(1);

    expect(findBestLinkStation([100, 100])).toEqual(undefined);
    expect(findBestLinkStation([15, 10])).toEqual({
      power: 0.6718,
      station: [10, 0, 12]
    });
    expect(findBestLinkStation([18, 18])).toEqual({
      power: 4.7157,
      station: [20, 20, 5]
    });
  });
});
