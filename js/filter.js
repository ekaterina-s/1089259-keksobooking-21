'use strict';

(() => {
  const MAX_PINS_ON_MAP_AMOUNT = 5;
  const FIRST_PRICE = 10000;
  const SECOND_PRICE = 50000;
  const THIRD_PRICE = 50000;

  const change = (features, option) => {
    if (features[option] === true) {
      features[option] = false;
    } else {
      features[option] = true;
    }
  };

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
              case p < FIRST_PRICE : hotelOptions[key] = `low`;
                break;
              case p >= FIRST_PRICE && p <= SECOND_PRICE : hotelOptions[key] = `middle`;
                break;
              case p > THIRD_PRICE : hotelOptions[key] = `high`;
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

    for (let i = 0; i < window.filteredHotels.length; i++) {
      if (i < MAX_PINS_ON_MAP_AMOUNT) {
        fragmentPin.appendChild(window.pin.render(window.filteredHotels[i], i));
      }
    }

    const renderedPins = document.querySelector(`.map__pins`).appendChild(fragmentPin);

    return renderedPins;
  };

  window.filter = {
    filterHotels,
    change
  };
})();
