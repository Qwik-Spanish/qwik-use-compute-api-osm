import { Icon } from 'leaflet';
import type { BaseIconOptions } from 'leaflet';
import { MarkerColor } from './constants';

/**
 * Implement all config to use in marker. In this moment ony exist icon custom
 * configurtion to change marker color.
 * @param iconColor Define select marker color from MarkerColor enum
 * @returns
 */
export function defaultOptionsIconConfig(iconColor: string = MarkerColor.Red) {
  return {
    icon: new Icon({
      iconUrl: `https://raw.githubusercontent.com/leaflet-maps-course/leaflet-color-markers/master/img/marker-icon-2x-${iconColor}.png`,
      shadowUrl:
        'https://raw.githubusercontent.com/leaflet-maps-course/leaflet-color-markers/master/img/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
  };
}

export const iconProperties = {
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  iconSize: [25, 41], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  // half of width + height respect "iconSize"
  shadowAnchor: [4, 20], // the same for the shadow
  popupAnchor: [0, -40], // point from which the popup should open relative to the iconAnchor
};
export const defaultIcon = new Icon(iconProperties as BaseIconOptions);
export const otherIcon = new Icon({
  ...iconProperties,
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
} as BaseIconOptions);

export const drinkWaterIcon = new Icon({
  ...iconProperties,
  popupAnchor: [10, -40],
  iconSize: [46, 48], // size of the icon
  iconUrl:
    "https://raw.githubusercontent.com/leaflet-maps-course/resources/main/markers/icons/custom/drink_water.png",
} as BaseIconOptions);