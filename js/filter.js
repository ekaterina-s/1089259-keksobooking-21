'use strict';

(() => {
  const MAX_PINS_ON_MAP_AMOUNT = 5;
  // const mapPins = document.querySelectorAll('.map__pin');

  // пока так, потому что иначе при переключении фильтра пины не исчезают!!!!!!!!!!!!!!!
  const mapPin = document.getElementsByClassName('map__pin');

  const filterHotels = (type, hotels) => {
    const fragmentPin = document.createDocumentFragment();

    // mapPins.forEach((mapPin) => {
    //   return mapPin.remove();
    // });

    // пока так, потому что иначе при переключении фильтра пины не исчезают!!!!!!!!!!!!!!!!!!!
    while (mapPin[0]) {
      mapPin[0].parentNode.removeChild(mapPin[0]);
    }

    const filteredHotels = hotels.filter((hotel) => {
      if (type === 'any') {
        return hotel;
      }
      return hotel.offer.type === type;
    });

    console.log(filteredHotels);

    for (let i = 0; i < MAX_PINS_ON_MAP_AMOUNT & i < filteredHotels.length; i++) {
      fragmentPin.appendChild(window.pin.renderPins(filteredHotels[i], i));
    }

    const renderedPins = document.querySelector('.map__pins').appendChild(fragmentPin);
    return renderedPins;
  };

  window.filter = {
    filterHotels
  };
})();
