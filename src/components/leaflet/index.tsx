import {
  component$,
  useVisibleTask$,
  useStyles$,
  useSignal,
  noSerialize,
} from "@builder.io/qwik";
import * as L from "leaflet";


import { defaultIcon, drinkWaterIcon, otherIcon } from "~/utils/icons/default";
import { mapZoomConfigs, getBoundaryBox, addMapControls } from "~/helpers";

import leafletStyles from "./../../../node_modules/leaflet/dist/leaflet.css?inline";
import leafletCustom from "./leaflet.css?inline";
import leafletMarkerCluster from "./marker-cluster.css?inline";

export const LeafletMap = component$(({ location }: any) => {
  useStyles$(leafletStyles);
  useStyles$(leafletCustom);
  useStyles$(leafletMarkerCluster);
  const mapContainer$ = useSignal<L.Map>();

  useVisibleTask$(async ({ track }) => {
    track(location);
    const pointCenter = location.data.location;

    console.log(location)
    
    if (location && window) {
      if (mapContainer$.value) {
        mapContainer$.value.remove();
      }
      await import("leaflet.markercluster");

      const markersToCluster = new L.MarkerClusterGroup();

      const centerPosition: L.LatLngExpression = [pointCenter[0], pointCenter[1]];
      const map = new L.Map("map").setView(
        centerPosition,
        location.data.zoom || 13
      );

      // Take bounds

      const bounds = getBoundaryBox(map);
      location.data.boundaryBox = bounds;

      mapZoomConfigs(map, location.data);

      const centralPoint = L.marker(centerPosition, {
        icon: defaultIcon,
      })
        .addTo(map)
        .bindPopup(`<h1>${location.data.name}</h1>`);

      map &&
        location.pois.length &&
        location.pois.map((element: any) => {
          const markerItem = L.marker([element.lat, element.lon], {
            icon:
              element.tags.amenity === "drinking_water"
                ? drinkWaterIcon
                : otherIcon,
          });
          markerItem.bindPopup(
            `
            <h2>${element.tags.name || "Sin definir"}</h2>
            <p>Tag: ${element.tags.amenity || "Sin definir tipo"}</p>
          `
          );
          markerItem.addTo(markersToCluster);
        });

        map.addLayer(markersToCluster);

      location.pois.length &&
        map.fitBounds([
          [centralPoint.getLatLng().lat, centralPoint.getLatLng().lng],
          ...location.pois.map(
            (point: any) => [point.lat, point.lon] as [number, number]
          ),
        ]);

      // Controls

      addMapControls(map);

      mapContainer$.value = noSerialize(map);
    }
  });
  return <div id="map"></div>;
});
