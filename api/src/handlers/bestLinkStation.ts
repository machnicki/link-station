import { bestLinkStationService } from "../services/bestLinkStationService";

export const handler = async (event) => {
  const response = await bestLinkStationService(JSON.parse(event.body));

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(response || {}, null, 2)
  };
};
