'use strict';

const accessToken = 'pk.eyJ1IjoiYzRyMG50MyIsImEiOiJja2p4MnI3aGkwNGYyMm9vZmJiczRjYmZlIn0.uCBGQFsqBN_NUmh0g4vnNA';

const btnBuscar = document.getElementById('buscar');
const street = document.getElementById('street');

const getAddressAndPaintMap = async (address, zipcode, country) => {
  if (address) {
    L.mapbox.accessToken = 'pk.eyJ1IjoiYzRyMG50MyIsImEiOiJja2p4MnI3aGkwNGYyMm9vZmJiczRjYmZlIn0.uCBGQFsqBN_NUmh0g4vnNA';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}%20${zipcode}%20${country}.json?types=address&access_token=${accessToken}`;
    const data = await (await fetch(url)).json();
    const latlng = L.latLng(data['features'][0].center[1], data['features'][0].center[0], 0);

    var map = L.mapbox
      .map('map')
      .setView(latlng, 15)
      .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
    L.circle(latlng, 150).addTo(map);
    //const marker = L.marker(latlng).addTo(map);
  }
};

btnBuscar.onclick = async () => {
  const address = document.getElementById('address');
  const postal_code = document.getElementById('postal-code');
  const country = document.getElementById('country');
  const address_value = address.value;
  const zipcode_value = postal_code.value;
  const country_value = country.value;
  const regex = / /gi;
  const pattern = '%20';
  const address_r = address_value.replace(regex, pattern);
  const zipcode_r = zipcode_value.replace(regex, pattern);
  const country_r = country_value.replace(regex, pattern);

  await getAddressAndPaintMap(address_r, zipcode_r, country_r);
};

const getStreetsResults = async (street) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${street}.json?types=address&access_token=${accessToken}`;
  const output = document.getElementById('output');
  const data = await (await fetch(url)).json();
  output.innerHTML = '';
  for (const feature of data.features) {
    const text = document.createTextNode(feature.place_name);
    const p = document.createElement('p');
    p.appendChild(text);
    output.appendChild(p);
    console.log(`
    ${feature.place_name}
      `);
  }
};

street.onkeyup = () => {
  getStreetsResults(street.value);
};
