import { useState, useEffect } from "react";

import { Coordinates } from "link-station-api/src/utils/types";
import { Response as BestLinkResponse } from "link-station-api/src/services/bestLinkStationService";

import { findBestLinkStation } from "../api/findBestLinkStation";

export const Results = ({ device: _device }: { device?: Coordinates }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [device, setDevice] = useState<Coordinates | undefined>();
  const [bestStation, setBestStation] = useState<
    BestLinkResponse | undefined
  >();

  useEffect(() => {
    setDevice(_device);
    if (_device) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await findBestLinkStation(_device);
          setBestStation(response);
        } catch (e) {
          console.error("Problem with fetching data");
        }
        setIsLoading(false);
      };

      fetchData();
    }
  }, [_device]);

  let message = "";

  if (isLoading) {
    message = "LOADING...";
  } else if (device) {
    const { station, power } = bestStation || {};

    if (power && station) {
      message = `Best link station for point ${device[0]},${device[1]} is ${station[0]},${station[1]} with power ${power}`;
    } else {
      message = `No link station within reach for point ${device[0]},${device[1]}`;
    }
  }

  return (
    <div className="Results">
      {message ? <strong>{message}</strong> : <h2>Choose device</h2>}
    </div>
  );
};
