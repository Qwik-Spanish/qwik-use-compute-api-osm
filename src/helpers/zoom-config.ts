import { type Map } from "leaflet";
import { getBoundaryBox } from "./boundary-box";
import type { ILocation } from "~/models/location";

export const mapZoomConfigs = (map: Map, location: ILocation) => {
    map.setMinZoom(9);
    map.setMaxZoom(18);

    map.on("zoom", () => {
      const bounds = getBoundaryBox(map);
      location.boundaryBox = bounds;
    });
}