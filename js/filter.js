'use strict';

(() => {

  const change = (features, option) => {
    if (features[option] === true) {
      features[option] = false;
    } else {
      features[option] = true;
    }
  };

  const MAX_PINS_ON_MAP_AMOUNT = 5;

  const filterHotels = (type, hotels) => {
    const mapPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    const fragmentPin = document.createDocumentFragment();

    mapPins.forEach((pin) => {
      return window.pin.remove(pin);
    });

    window.filteredHotels = hotels.filter((hotel) => {
      let hotelOptions = {};
      let featuresCheck = true;

      for (let key in type) {
        if (type.hasOwnProperty(key)) {
          if (type[key] === `any`) {
            hotelOptions[key] = `any`;
          } else if (key === `price` && type[key] !== `any`) {
            let p = hotel.offer.price;
            switch (true) {
              case p < 10000 : hotelOptions[key] = `low`;
                break;
              case p >= 10000 && p <= 50000 : hotelOptions[key] = `middle`;
                break;
              case p > 50000 : hotelOptions[key] = `high`;
                break;
            }
          } else {
            hotelOptions[key] = hotel.offer[key].toString();
          }
          if (type[key] !== hotelOptions[key]) {
            featuresCheck = false;
          }
        }
      }
      for (let key in window.housingFeaturesValues) {
        if (hotel.offer.features.indexOf(key) === -1 && window.housingFeaturesValues[key] === true) {
          featuresCheck = false;
        }
      }
      return featuresCheck;
    });

    for (let i = 0; i < MAX_PINS_ON_MAP_AMOUNT & i < window.filteredHotels.length; i++) {
      fragmentPin.appendChild(window.pin.renderPin(window.filteredHotels[i], i));
    }

    const renderedPins = document.querySelector(`.map__pins`).appendChild(fragmentPin);

    return renderedPins;
  };

  window.filter = {
    filterHotels,
    change
  };
})();
