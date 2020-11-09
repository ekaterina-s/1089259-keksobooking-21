'use strict';

(() => {
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


  const formElements =
  document.querySelectorAll('.map__filters, .map__filter, .map__checkbox, .ad-form-header, .ad-form__element');

  const addressField = document.querySelector('.ad-form__element #address');

  enableOrDisableForm(formElements);
  fillinInputFieldInactive(addressField);

  const turnOnInactiveMode = () => {
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    enableOrDisableForm(formElements);
    fillinInputFieldInactive();
  };

  const turnOnActiveMode = () => {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    window.form.enableOrDisableForm(formElements);
    window.form.fillinInputFieldActive(addressField);
    window.data.getData(window.handlers.successHandler, window.handlers.errorHandler);
  };

  window.form.mapPinMain.addEventListener('mousedown', (evt) => {
    if (evt.which === 1) {
      turnOnActiveMode();
      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();
        const shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y = moveEvt.clientY
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        window.form.mapPinMain.style.top = `${window.form.mapPinMain.offsetTop - shift.y}px`;
        window.form.mapPinMain.style.left = `${window.form.mapPinMain.offsetLeft - shift.x}px`;
      };
      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });

})();
