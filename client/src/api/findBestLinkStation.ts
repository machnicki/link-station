import { config } from "../config";

import { Coordinates } from "link-station-api/src/utils/types";

export const findBestLinkStation = async (coordinates: Coordinates) => {
  try {
    const data = await fetch(
      `${config.API_URL}/best-link-station?coordinates=${coordinates.join(
        ","
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return data.json();
  } catch (e) {
    console.error("Problem with fetching data", e);
  }
};
