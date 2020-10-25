'use strict';

(() => {
  const MAX_PINS_ON_MAP_AMOUNT = 5;
  const housingType = document.querySelector('#housing-type');
  const mapPin = document.getElementsByClassName('map__pin');

  console.log(window.handlers.propertyTypes);

  const filterHotels = (type, hotels) => {
    const fragment = document.createDocumentFragment();
    while (mapPin[0]) {
      mapPin[0].parentNode.removeChild(mapPin[0]);
    }

    const filteredHotels = hotels.filter((hotel) => {
      if (type === 'any') {
        return hotel;
      } else {
        return hotel.offer.type === type;
      }
    });

    for (let i = 0; i < MAX_PINS_ON_MAP_AMOUNT & i < filteredHotels.length; i++) {
      fragment.appendChild(window.pin.renderDomElements(filteredHotels[i]));
    }
    return document.querySelector('.map__pins').appendChild(fragment);
  };
  window.filter = {
    filterHotels: filterHotels,
    housingType: housingType
  };
})();
