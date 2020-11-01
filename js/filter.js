'use strict';

(() => {
  const MAX_PINS_ON_MAP_AMOUNT = 5;
  const mapPins = document.querySelectorAll('.map__pin');

  const filterHotels = (type, hotels) => {
    const fragmentPin = document.createDocumentFragment();

    mapPins.forEach((mapPin) => {
      return mapPin.remove();
    });

    const filteredHotels = hotels.filter((hotel) => {
      if (type === 'any') {
        return hotel;
      }
      return hotel.offer.type === type;
    });

    for (let i = 0; i < MAX_PINS_ON_MAP_AMOUNT & i < filteredHotels.length; i++) {
      fragmentPin.appendChild(window.pin.renderPins(filteredHotels[i]));
    }

    const renderedPins = document.querySelector('.map__pins').appendChild(fragmentPin);

    return renderedPins;
  };

  window.filter = {
    filterHotels
  };
})();
