'use strict';

(() => {
  const MAX_PINS_ON_MAP_AMOUNT = 5;
  const housingType = document.querySelector('#housing-type');
  const fragment = document.createDocumentFragment();
  const mapPin = document.getElementsByClassName('map__pin');

  const filterHotels = (type, array) => {

    while (mapPin[0]) {
      mapPin[0].parentNode.removeChild(mapPin[0]);
    }

    const filteredHotels = array.filter((hotel) => {
      if (type === 'any') {
        return hotel;
      } else {
        return hotel.offer.type === type;
      }
    });

    if (filteredHotels.length > MAX_PINS_ON_MAP_AMOUNT) {
      for (let i = 0; i < MAX_PINS_ON_MAP_AMOUNT; i++) {
        fragment.appendChild(window.pin.renderDomElements(filteredHotels[i]));
      }
    } else {
      for (let i = 0; i < filteredHotels.length; i++) {
        fragment.appendChild(window.pin.renderDomElements(filteredHotels[i]));
      }
    }
    return document.querySelector('.map__pins').appendChild(fragment);
  };
  window.filter = {
    filterHotels: filterHotels,
    housingType: housingType
  };
})();
