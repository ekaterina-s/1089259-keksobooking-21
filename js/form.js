'use strict';
(() => {
//  ищем в разметке элементы для активного/неактивного режима
  const mapPinMain = document.querySelector('.map__pin--main');
  const imgMapPinMain = mapPinMain.querySelector('img');

  const MAP_PIN_MAIN_FROM_LEFT = 570;
  const MAP_PIN_MAIN_FROM_TOP = 375;

  const imgMapPinMainWidth = imgMapPinMain.width;
  const imgMapPinMainHeight = imgMapPinMain.height;

  // координаты гл метки для неактива
  const mapPinMainXPositionInactive = MAP_PIN_MAIN_FROM_LEFT + imgMapPinMainWidth / 2;
  const mapPinMainYPositionInactive = MAP_PIN_MAIN_FROM_TOP + imgMapPinMainHeight / 2;

  // координаты гл метки для актива
  const mapPinMainXPositionActive = MAP_PIN_MAIN_FROM_LEFT + imgMapPinMainWidth / 2;
  const mapPinMainYPositionActive = MAP_PIN_MAIN_FROM_TOP + imgMapPinMainHeight;


  const roomNumber = document.querySelector('#room_number');
  const capacity = document.querySelector('#capacity');
  const capacityOptions = document.querySelectorAll('#capacity option');
  const roomsAvailability = {
    "1": ["1"],
    "2": ["1", "2"],
    "3": ["1", "2", "3"],
    "100": ["0"]
  };

  const MIN_NAME_LENGTH = 30;
  const MAX_NAME_LENGTH = 100;
  const title = document.querySelector('#title');

  const MAX_PRICE_PER_NIGHT = 1000000;
  const housingTypesPrice = {
    'flat': '1000',
    'bungalow': '0',
    'house': '5000',
    'palace': '10000'
  };

  const type = document.querySelector('#type');
  const price = document.querySelector('#price');

  const timein = document.querySelector('#timein');
  const timeout = document.querySelector('#timeout');

  const checkIncheckOut = {
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00'
  };


  const enableOrDisableForm = (element) => {
    if (element.length > 1) {
      for (let i = 0; i < element.length; i++) {
        if (element[i].hasAttribute('disabled')) {
          element[i].removeAttribute("disabled");
        } else {
          element[i].setAttribute("disabled", "true");
        }
      }
    } else {
      if (element.hasAttribute('disabled')) {
        element.removeAttribute("disabled");
      } else {
        element.setAttribute("disabled", "true");
      }
    }

    return (element);
  };

  //  объявляем фу-ю добавления координат метки в неактивном сост в поле ввода
  const fillinInputFieldInactive = (input) => {
    input.value = `${mapPinMainXPositionInactive}px, ${mapPinMainYPositionInactive}px`;

    return input;
  };

  //  объявляем фу-ю добавления координат метки в активном сост в поле ввода
  const fillinInputFieldActive = (input) => {
    input.value = `${mapPinMainXPositionActive}px, ${mapPinMainYPositionActive}px`;

    return input;
  };


  const setDefaultChoice = () => {
    for (let i = 0; i < capacityOptions.length; i++) {
      capacity[i].setAttribute("disabled", "true");
    }
    capacity[2].removeAttribute("disabled", "true");
  };

  roomNumber.addEventListener('change', () => {
    for (let i = 0; i < capacityOptions.length; i++) {
      if (roomsAvailability[roomNumber.value].indexOf(capacityOptions[i].value) > -1) {
        capacityOptions[i].removeAttribute("disabled");
      } else {
        capacityOptions[i].setAttribute("disabled", "true");
      }
    }
  });

  title.addEventListener('input', () => {
    const valueLength = title.value.length;
    if (valueLength < MIN_NAME_LENGTH) {
      title.setCustomValidity(`Ещё ${(MIN_NAME_LENGTH - valueLength)} симв.`);
    } else if (valueLength > MAX_NAME_LENGTH) {
      title.setCustomValidity(`Удалите лишние ' ${(valueLength - MAX_NAME_LENGTH)} симв.`);
    } else {
      title.setCustomValidity('');
    }
    title.reportValidity();
  });

  type.addEventListener('change', () => {
    price.placeholder = housingTypesPrice[type.value];
  });

  price.addEventListener('input', () => {
    if (price.value < housingTypesPrice[type.value]) {
      price.setCustomValidity(`Минимальная цена за ночь ${housingTypesPrice[type.value]}`);
    } else if (price.value > MAX_PRICE_PER_NIGHT) {
      price.setCustomValidity(`Максимальная цена за ночь ${MAX_PRICE_PER_NIGHT}`);
    } else {
      price.setCustomValidity('');
    }
    price.reportValidity();
  });

  timein.addEventListener('change', () => {
    timeout.value = checkIncheckOut[timein.value];
  });

  window.form = {
    mapPinMain,
    mapPinMainXPositionActive,
    mapPinMainYPositionActive,
    enableOrDisableForm,
    fillinInputFieldInactive,
    fillinInputFieldActive,


    setDefaultChoice
  };
})();
