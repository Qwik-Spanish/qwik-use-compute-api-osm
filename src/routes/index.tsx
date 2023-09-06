import {
  $,
  component$,
  useComputed$,
  useStore,
  useStyles$,
  useTask$,
} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { isServer } from '@builder.io/qwik/build';

import { serverOSMPOIs } from '~/api/osm';
import { LeafletMap } from '~/components/leaflet';
import { poisTypes } from '~/data/poi-list';

// Styles
import indexStyles from './index.css?inline';
import poisButtosStyles from './pois-buttons.css?inline';
import Alert from '~/components/alert';
import { SHOW_CITIES } from '~/constants/europe-cities';
import { useGeoLocation } from '~/hooks/useGeoLocation';

export default component$(() => {
  useStyles$(indexStyles);
  useStyles$(poisButtosStyles);

  const { geoFindMe, location: currentLocation } = useGeoLocation();

  const location = useStore(
    {
      data: SHOW_CITIES[0],
      pois: [],
      select: SHOW_CITIES[0].name,
      loading: 1,
    },
    { deep: true }
  );

  const pois = useStore(poisTypes, { deep: true });

  const citySelectChange = $(
    async (item: {
      name: string;
      location: number[];
      boundaryBox: string;
      zoom: number;
    }) => {
      location.data = item;
      location.select = item.name;
      location.pois.length = 0;
    }
  );

  const poiSelectChange = $((index: number) => {
    pois[index].checked = !pois[index].checked;
  });

  const poisSelected = useComputed$(() => {
    return pois
      .filter((item) => item.checked)
      .map((option) => [...option.filterValues])
      .flat();
  });

  useTask$(async () => {
    if (isServer && location.loading) {
      location.pois = (
        await serverOSMPOIs(location.data, poisSelected.value)
      ).osmServices;
      location.loading = 0;
    }
  });

  useTask$(({ track }) => {
    track(currentLocation);
    if (currentLocation.value)
      console.log('Cambio de ubicación', currentLocation.value);
    const { latitude: lat, longitude: lng } = currentLocation.value;
    if (lat !== 0 && lng !== 0) {
      const item = {
        name: 'Nuestra ubicación',
        location: [lat || 0, lng || 0],
        zoom: 13,
        boundaryBox: '',
      };
      location.data = item;
      location.select = item.name;
      location.pois.length = 0;
    }
  });
  return (
    <div class='container container-center'>
      <h3>
        <span class='highlight'>Ciudad</span> seleccionada
      </h3>
      <br />
      {SHOW_CITIES.map((option) =>
        option.boundaryBox !== '' ? (
          <button
            key={option.name}
            class={location.select === option.name ? 'checked' : 'no-checked'}
            onClick$={() => citySelectChange(option)}
          >
            {option.name}
          </button>
        ) : (
          <button
            key={option.name}
            class={location.select === option.name ? 'checked' : 'no-checked'}
            onClick$={geoFindMe}
          >
            {option.name}
          </button>
        )
      )}
      <br />
      <br />
      <h3>
        <span class='highlight'>Puntos de Interés (POIs)</span> deseados
      </h3>
      <br />
      {pois.map((option, index) => (
        <button
          key={option.label}
          class={option.checked ? 'checked' : 'no-checked'}
          onClick$={() => poiSelectChange(index)}
        >
          {option.label}
        </button>
      ))}
      <br />
      {poisSelected.value.length === 0 ? (
        <Alert
          type={'warning'}
          text='Debes de seleccionar un tipo de POI para hacer la búsqueda'
        />
      ) : (
        <button
          onClick$={async () => {
            location.loading = 1;
            const boundaryBox: string = location.data.boundaryBox;
            // console.log("Lo que se va a mandar");
            // console.log({ boundaryBox }, poisSelected.value);
            location.pois = (
              await serverOSMPOIs({ boundaryBox }, poisSelected.value)
            ).osmServices;
            await delay(600);
            location.loading = 0;
          }}
        >
          Obtener info
        </button>
      )}
      <details>
        <summary>Pulsa para ver el resultado en formato JSON</summary>
        <div>
          <code>{JSON.stringify(location.pois)}</code>
        </div>
      </details>
      {location.loading ? (
        <Alert
          type={'info'}
          text='Buscando los Puntos de Interés (POIs) asociados a tu búsqueda'
        />
      ) : undefined}
      <div style={`visibility: ${location.loading ? 'hidden' : 'visible'}`}>
        <LeafletMap location={location} />
      </div>
    </div>
  );
});

const delay = (time: number) => new Promise((res) => setTimeout(res, time));

export const head: DocumentHead = {
  title: 'OSM POIS - Cities',
  meta: [
    {
      name: 'description',
      content:
        'Consumir la API de Open Street Map que toma puntos de referencia con filtros de aplicación que se obtienen de una API de NestJS mediante la consulta con OverpassQL',
    },
    {
      name: 'keywords',
      content: 'osm, openstreetmap, qwik, leaflet, leaflet marker cluster',
    },
    {
      name: 'author',
      content: 'Anartz Mugika Ledo',
    },
    {
      name: 'og:image',
      content:
        'https://jgengle.github.io/Leaflet/examples/quick-start/thumbnail.png',
    },
    {
      name: 'og:url',
      content: 'https://qwik-osm-poc.netlify.app/',
    },
    {
      name: 'twitter:image',
      content:
        'https://jgengle.github.io/Leaflet/examples/quick-start/thumbnail.png',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'OpenStreetMap API + Qwik',
    },
    {
      name: 'twitter:description',
      content:
        'Proyecto en Qwik para consumir una API de NestJS que nos da información de POIs de OpenStreetMap',
    },
  ],
};
