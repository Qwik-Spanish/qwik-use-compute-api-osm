import { control, type Map } from "leaflet";
import { fullScreenMap } from "~/plugins/maps/full-screen";
import { watermark } from "~/plugins/maps/watermark";
import { groupBaseLayers, groupOverLayers } from "./layers-manage";
import { WITHOUT_LIMITS_BASE_LAYERS, WITHOUT_LIMITS_OVER_LAYERS } from "~/constants/layers";


export const addMapControls = ((map: Map)=> {
    fullScreenMap({
        mapId: 'map',
      }).addTo(map);
  
      watermark({
        position: 'bottomleft',
      }).addTo(map);
  
      // Layers
      control
        .layers(
          groupBaseLayers(WITHOUT_LIMITS_BASE_LAYERS, map),
          groupOverLayers(WITHOUT_LIMITS_OVER_LAYERS, map),
          {
            position: 'topright',
          }
        )
        .addTo(map);
}) 