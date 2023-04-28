import {
  $,
  component$,
  useComputed$,
  useStore,
  useStyles$,
  useTask$,
} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { isServer } from "@builder.io/qwik/build";

import { serverOSMPOIs } from '~/api/osm';
import { poisTypes } from '~/data/poi-list';

export default component$(() => {
  useStyles$(`
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
  
  `);

  const location = useStore({
    data: {
      name: 'Soraluze',
      location: [43.17478, -2.41172],
      boundaryBox:
        '43.14658914559456,-2.4765586853027344,43.202923523094725,-2.3467826843261723',
      zoom: 13,
    },
    pois: [],
    select: {
      name: 'Soraluze',
      location: [43.17478, -2.41172],
      boundaryBox:
        '43.14658914559456,-2.4765586853027344,43.202923523094725,-2.3467826843261723',
      zoom: 13,
    }.name,
  }, { deep: true });
  const pois = useStore(poisTypes, { deep: true });

  const poiSelectChange = $((index: number) => {
    pois[index].checked = !pois[index].checked;
  });

  const checkedPoiOptions = useComputed$(() =>
    pois.filter((option) => option.checked)
  );

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
      console.log(location.pois)
    }
  });
  return (
    <>
      <div class='container container-center'>
        <h3>
          Selecciona los <span class='highlight'>Puntos de Interés (POIs)</span>
          <br /> deseados
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
        <h4>Selección</h4>
        {checkedPoiOptions.value.map((option, index) => (
          <span key={option.label}>
            {option.label}{' '}
            {index < checkedPoiOptions.value.length - 1 ? ',' : ''}
          </span>
        ))}
        <h4>Filtros a aplicar</h4>
        {JSON.stringify(poisSelected.value)}
        <br />
        <button
          onClick$={async () => {
            const boundaryBox: string =
              '43.14658914559456,-2.50265121459961,43.202923523094725,-2.3206901550292973';
            console.log('Lo que se va a mandar');
            console.log({ boundaryBox }, poisSelected.value);
            location.pois = (await serverOSMPOIs({ boundaryBox }, poisSelected.value))
                .osmServices
            ;
          }}
        >
          Obtener info
        </button>
        <h4>Resultado</h4>
        <div><code>{JSON.stringify(location.pois)}</code></div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
