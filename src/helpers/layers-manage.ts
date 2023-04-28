import type { Map } from "leaflet";
import { tileLayer } from "leaflet";
import type { IBaseLayer, IOverLayer } from "~/models/control";

export function groupBaseLayers(layers: Array<IBaseLayer>, map: Map) {
    const findDefaultLayerConfig = layers.find((layer) => layer.default);
    const defaultLayer = tileLayer(findDefaultLayerConfig!.map, {
      attribution: findDefaultLayerConfig!.atribution,
    }).addTo(map);
  
    return layers.reduce(
      (a, layer) => {
        return !layer.default
          ? {
              // Add NO default layers
              ...a,
              [layer.label || '']: tileLayer(layer.map, {
                attribution: layer.atribution,
              }),
            }
          : {
              ...a,
              ...{ [layer.label || '']: defaultLayer }, // Map Default select layer
            };
      },
      {} // Start value
    );
  }
  
  export function groupOverLayers(layers: Array<IOverLayer>, map: Map) {
    return layers.reduce(
      (a, layer) => ({
        ...a,
        [layer.label]: layer.select
          ? tileLayer(layer.map).addTo(map)
          : tileLayer(layer.map),
      }),
      {}
    );
  }