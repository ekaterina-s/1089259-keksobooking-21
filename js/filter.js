'use strict';

(() => {
  const MAX_PINS_ON_MAP_AMOUNT = 5;

  // пока так, потому что иначе при переключении фильтра пины не исчезают!!!!!!!!!!!!!!!
  // const mapPin = document.getElementsByClassName('map__pin');

  const filterHotels = (type, hotels) => {
    const mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    const fragmentPin = document.createDocumentFragment();

    // mapPins.forEach((pin) => window.pin.remove(pin));
    mapPins.forEach((pin) => {
      return window.pin.removeEvents(pin);
    });

    // пока так, потому что иначе при переключении фильтра пины не исчезают!!!!!!!!!!!!!!!!!!!
    // while (mapPin[0]) {
    //   mapPin[0].parentNode.removeChild(mapPin[0]);
    // }

    window.filteredHotels = hotels.filter((hotel) => {
      if (type === 'any') {
        return hotel;
      }
      return hotel.offer.type === type;
    });

    for (let i = 0; i < MAX_PINS_ON_MAP_AMOUNT & i < window.filteredHotels.length; i++) {
      fragmentPin.appendChild(window.pin.renderPin(window.filteredHotels[i], i));
    }

    const renderedPins = document.querySelector('.map__pins').appendChild(fragmentPin);
    return renderedPins;
  };

  window.filter = {
    filterHotels
  };
})();
