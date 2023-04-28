import type { ControlPosition } from 'leaflet';

export interface ILayers {
  position?: ControlPosition;
  baseLayers: Array<IBaseLayer>;
  overLayers?: Array<IOverLayer>;
}

export interface IBaseLayer {
  label?: string;
  map: string;
  atribution: string;
  default?: boolean;
}

export interface IOverLayer {
  label: string;
  map: string;
  select: boolean;
}