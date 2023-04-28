import type { ControlPosition} from 'leaflet';
import { Control, DomUtil, Util } from 'leaflet';

const FullScreenMap = Control.extend({
  options: {
    mapId: 'map',
    position: 'topleft',
    exitText: 'Salir pantalla completa',
    entryText: 'Ver en pantalla completa',
  },

  initialize: function (options?: {
    position?: ControlPosition;
    exitText?: string;
    entryText?: string;
    mapId?: string;
  }) {
    Util.setOptions(this, options);
  },
  onAdd: function () {
    const container = DomUtil.create(
      'input',
      'leaflet-control-zoom leaflet-bar leaflet-control'
    );

    const options = this.options;
    container.type = 'button';
    container.title = options.entryText;
    container.style.backgroundImage =
      'url(https://cdn-icons-png.flaticon.com/512/2089/2089670.png)';
    container.style.backgroundSize = '15px 15px';
    container.style.backgroundRepeat = 'no-repeat';
    container.style.backgroundPosition = '50% 50%';
    container.style.width = '32px';
    container.style.height = '32px';
    container.style.padding = '12px';
    container.style.lineHeight = '30px';
    container.style.fontSize = '22px';
    container.style.fontWeight = 'bold';
    container.style.cursor = 'pointer';

    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('webkitfullscreenchange', exitHandler);
    document.addEventListener('mozfullscreenchange', exitHandler);
    document.addEventListener('MSFullscreenChange', exitHandler);

    function exitFullScreen() {
      if (document.fullscreenElement) {
        setTimeout(() => document.exitFullscreen(), 520);
      }
      container.style.backgroundImage =
        'url(https://cdn-icons-png.flaticon.com/512/2089/2089670.png)';
      container.title = options.entryText;
    }

    function exitHandler() {
      if (!document.fullscreenElement) {
        exitFullScreen();
      }
    }

    container.onclick = () => {
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
      if (!document.fullscreenElement) {
        // Si no estamos a pantalla completa
        document.getElementById(options.mapId)?.requestFullscreen();
        container.title = options.exitText;
        container.style.backgroundImage =
          'url(https://cdn-icons-png.flaticon.com/512/483/483332.png)';
      } else {
        exitFullScreen();
      }
    };
    return container;
  },
});

export const fullScreenMap = (options?: {
  position?: ControlPosition;
  entryText?: string;
  exitText?: string;
  mapId?: string;
}) => new FullScreenMap(options);
