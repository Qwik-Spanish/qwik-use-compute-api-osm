import { server$ } from '@builder.io/qwik-city';

// API Consume to take POIs from OSM with OverpassQL
export const serverOSMPOIs = server$(async (item, poisSelected) => {
  console.log(item, poisSelected);
  const resp = await fetch(`https://osm-api.vercel.app/osm-api`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bbox: item.boundaryBox,
      filters: poisSelected,
    }),
  });
  const json = await resp.json();
  const dataTake = json ? json['elements'] : Promise.reject(json);
  return { osmServices: dataTake };
});
