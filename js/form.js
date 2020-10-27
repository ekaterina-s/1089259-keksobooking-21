'use strict';
(function () {
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

  //  ищем поле адрес
  const roomNumber = document.querySelector('#room_number');
  const capacity = document.querySelector('#capacity');
  const capacityOptions = document.querySelectorAll('#capacity option');

  const roomsAvailability = {
    "1": ["1"],
    "2": ["1", "2"],
    "3": ["1", "2", "3"],
    "100": ["0"]
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

  window.form = {
    mapPinMain,
    enableOrDisableForm,
    fillinInputFieldInactive,
    fillinInputFieldActive,
    setDefaultChoice
  };
})();
