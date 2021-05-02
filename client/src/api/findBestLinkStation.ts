import { config } from "../config";

import { Coordinates } from "link-station-api/src/utils/types";

export const findBestLinkStation = async (coordinates: Coordinates) => {
  try {
    const data = await fetch(`${config.API_URL}/best-link-station`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        coordinates
      })
    });

    return data.json();
  } catch (e) {
    console.error("Problem with fetching data", e);
  }
};
