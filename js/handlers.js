'use strict';

(() => {
  window.housingFeaturesValues = {
    "wifi": false,
    "parking": false,
    "dishwasher": false,
    "washer": false,
    "conditioner": false,
    "elevator": false
  };
  const successHandler = window.util.debounce(() => {
    let housingTypeValue = {
      "type": document.querySelector(`#housing-type`).value,
      "rooms": document.querySelector(`#housing-rooms`).value,
      "price": document.querySelector(`#housing-price`).value,
      "guests": document.querySelector(`#housing-guests`).value,
    };
    return window.filter.filterHotels(housingTypeValue, window.data.propertyTypes);
  });

  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.handlers = {
    successHandler,
    errorHandler
  };
})();
