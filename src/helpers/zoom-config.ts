import { type Map } from "leaflet";
import { getBoundaryBox } from "./boundary-box";
import type { ILocation } from "~/models/location";

export const mapZoomConfigs = (map: Map, location: ILocation) => {
    map.setMinZoom(location.name === "Soraluze" ? 13 : 15);
    map.setMaxZoom(19);

    map.on("zoom", () => {
      const bounds = getBoundaryBox(map);
      location.boundaryBox = bounds;
    });
}