import { useState, useEffect } from "react";

import { Coordinates } from "link-station-api/src/utils/types";
import { StationWithPower } from "link-station-api/src/linkStation/types";
import { findBestLinkStation } from "link-station-api/src/linkStation/findBestLinkStation";

export const Results = ({ device: _device }: { device?: Coordinates }) => {
  const [device, setDevice] = useState<Coordinates | undefined>();
  const [bestStation, setBestStation] = useState<
    StationWithPower | undefined
  >();

  useEffect(() => {
    setDevice(_device);
    if (_device) {
      setBestStation(findBestLinkStation(_device));
    }
  }, [_device]);

  let message = "";

  if (device) {
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
