'use strict';
(() => {
  const roomNumber = document.querySelector(`#room_number`);
  const capacity = document.querySelector(`#capacity`);
  const capacityOptions = document.querySelectorAll(`#capacity option`);
  const roomsAvailability = {
    "1": [`1`],
    "2": [`1`, `2`],
    "3": [`1`, `2`, `3`],
    "100": [`0`]
  };

  const MIN_NAME_LENGTH = 30;
  const MAX_NAME_LENGTH = 100;
  const title = document.querySelector(`#title`);

  const MAX_PRICE_PER_NIGHT = 1000000;
  const housingTypesPrice = {
    'flat': `1000`,
    'bungalow': `0`,
    'house': `5000`,
    'palace': `10000`
  };

  const type = document.querySelector(`#type`);
  const price = document.querySelector(`#price`);

  const timein = document.querySelector(`#timein`);
  const timeout = document.querySelector(`#timeout`);

  const checkIncheckOut = {
    '12:00': `12:00`,
    '13:00': `13:00`,
    '14:00': `14:00`
  };

  let addressField = document.querySelector(`#address`);
  const fillinAddressField = (x, y) => {
    addressField.value = `${x}, ${y}`;
    return addressField.value;
  };

  const setDefaultChoice = () => {
    for (let i = 0; i < capacityOptions.length; i++) {
      capacity[i].setAttribute(`disabled`, `true`);
    }
    capacity[2].removeAttribute(`disabled`, `true`);
  };

  roomNumber.addEventListener(`change`, () => {
    for (let i = 0; i < capacityOptions.length; i++) {
      if (roomsAvailability[roomNumber.value].indexOf(capacityOptions[i].value) > -1) {
        capacityOptions[i].removeAttribute(`disabled`);
      } else {
        capacityOptions[i].setAttribute(`disabled`, `true`);
      }
    }
    capacity.value = roomsAvailability[roomNumber.value][0];

  });

  title.addEventListener(`input`, () => {
    const valueLength = title.value.length;
    if (valueLength < MIN_NAME_LENGTH) {
      title.setCustomValidity(`Ещё ${(MIN_NAME_LENGTH - valueLength)} симв.`);
    } else if (valueLength > MAX_NAME_LENGTH) {
      title.setCustomValidity(`Удалите лишние ' ${(valueLength - MAX_NAME_LENGTH)} симв.`);
    } else {
      title.setCustomValidity(``);
    }
    title.reportValidity();
  });

  type.addEventListener(`change`, () => {
    price.placeholder = housingTypesPrice[type.value];
    price.value = ``;
    price.setCustomValidity(``);
  });

  price.addEventListener(`input`, () => {
    if (+price.value < +housingTypesPrice[type.value]) {
      price.setCustomValidity(`Минимальная цена за ночь ${housingTypesPrice[type.value]}`);
    } else if (+price.value > MAX_PRICE_PER_NIGHT) {
      price.setCustomValidity(`Максимальная цена за ночь ${MAX_PRICE_PER_NIGHT}`);
    } else {
      price.setCustomValidity(``);
    }
    price.reportValidity();
  });

  timein.addEventListener(`change`, () => {
    timeout.value = checkIncheckOut[timein.value];
  });

  window.form = {
    fillinAddressField,
    setDefaultChoice
  };
})();
