'use strict';

const accessToken = 'pk.eyJ1IjoiYzRyMG50MyIsImEiOiJja2p4MnI3aGkwNGYyMm9vZmJiczRjYmZlIn0.uCBGQFsqBN_NUmh0g4vnNA';
const btnBuscar = document.getElementById('buscar');

async function test(address) {
  if (address) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${accessToken}`;
    const data = await (await fetch(url)).json();

    mapboxgl.accessToken = 'pk.eyJ1IjoiYzRyMG50MyIsImEiOiJja2p4MnI3aGkwNGYyMm9vZmJiczRjYmZlIn0.uCBGQFsqBN_NUmh0g4vnNA';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [data['features'][0].center[0], data['features'][0].center[1]], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });
    // Set options
    const marker = new mapboxgl.Marker({})
      .setLngLat([data['features'][0].geometry.coordinates[0], data['features'][0].geometry.coordinates[1]])
      .addTo(map);
  }
}

btnBuscar.onclick = () => {
  const address = document.getElementById('address');
  const postal_code = document.getElementById('postal-code');
  const country = document.getElementById('country');
  const value = address.value;
  const regex = / /gi;
  const pattern = '%20';
  const replaced = value.replace(regex, pattern);

  test(replaced);
};
