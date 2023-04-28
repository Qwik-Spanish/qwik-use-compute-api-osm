import {
  $,
  component$,
  useComputed$,
  useStore,
  useStyles$,
  useTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { isServer } from "@builder.io/qwik/build";

import { serverOSMPOIs } from "~/api/osm";
import { LeafletMap } from "~/components/starter/leaflet";
import { poisTypes } from "~/data/poi-list";

export default component$(() => {
  useStyles$(`
  #map {
    margin-top: 1rem;
    height: 450px;
    border: 5px solid var(--custom-blue);
  }

  .leaflet-popup-content h1 {
    color: black;
  }

  .leaflet-control-layers-list {
    text-align: left;
  }

  .select {
    background-color: grey !important;
    color: whitesmoke !important;
  }
    button {
      width: 250px;
      margin: 5px;
    }
    .checked {
      background-color: green;
      color: whitesmoke;
    }

    .checked:hover {
      background-color:  #063a06
    }

    .no-checked {
      background-color: whitesmoke;
    }

    .no-checked:hover {
      background-color: #740b0b;
    }

    .no-checked {
      color: grey
    }

    details {
      margin-top: 1rem;
    }
    details:hover {
      cursor:pointer;
    }
  
  `);

  const location = useStore(
    {
      data: {
        name: "Soraluze",
        location: [43.17478, -2.41172],
        boundaryBox:
          "43.14658914559456,-2.4765586853027344,43.202923523094725,-2.3467826843261723",
        zoom: 13,
      },
      pois: [],
      select: {
        name: "Soraluze",
        location: [43.17478, -2.41172],
        boundaryBox:
          "43.14658914559456,-2.4765586853027344,43.202923523094725,-2.3467826843261723",
        zoom: 13,
      }.name,
    },
    { deep: true }
  );
  const pois = useStore(poisTypes, { deep: true });

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
    if (isServer && poisSelected.value.length) {
      location.pois = (
        await serverOSMPOIs(location.data, poisSelected.value)
      ).osmServices;
      console.log(location.pois);
    }
  });
  return (
    <>
      <div class="container container-center">
        <h3>
          Selecciona los <span class="highlight">Puntos de Interés (POIs)</span>
          <br /> deseados
        </h3>
        <br />
        {pois.map((option, index) => (
          <button
            key={option.label}
            class={option.checked ? "checked" : "no-checked"}
            onClick$={() => poiSelectChange(index)}
          >
            {option.label}
          </button>
        ))}
        <br />
        {poisSelected.value.length === 0 ? (
          <p>Debes de seleccionar un tipo de POI para hacer la búsqueda </p>
        ) : (
          <button
            onClick$={async () => {
              const boundaryBox: string =
                "43.14658914559456,-2.50265121459961,43.202923523094725,-2.3206901550292973";
              console.log("Lo que se va a mandar");
              console.log({ boundaryBox }, poisSelected.value);
              location.pois = (
                await serverOSMPOIs({ boundaryBox }, poisSelected.value)
              ).osmServices;
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
        <LeafletMap location={location} />        
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
