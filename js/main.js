'use strict';

(() => {
  const housingType = document.querySelector('#housing-type');
  const resetButton = document.querySelector('.ad-form__reset');
  const mapPins = document.querySelector('.map__pins');

  const MIN_Y = 130;
  const MAX_Y = 630;

  const MIN_X = 0;
  const MAX_X = document.querySelector('.map__pins').offsetWidth;

  window.mode.turnOnInactiveMode();

  const onMainMapPinMouseDown = (evt) => {
    let isOnMainPin = true;

    if (evt.which === 1) {
      window.mode.turnOnActiveMode();
      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();
        const shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        const coordX = window.mode.mapPinMain.offsetLeft - shift.x;
        const coordY = window.mode.mapPinMain.offsetTop - shift.y;
        const addressX = Math.round(coordX + window.mode.mapPinMain.offsetWidth / 2);
        const addressY = Math.round(coordY + window.mode.mapPinMain.scrollHeight);

        if (isOnMainPin && addressY <= MAX_Y && addressY >= MIN_Y && addressX <= MAX_X && addressX >= MIN_X) {
          window.mode.mapPinMain.style.left = `${coordX}px`;
          window.mode.mapPinMain.style.top = `${coordY}px`;
          window.form.fillinAddressField(addressX, addressY);
        }
      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();

        mapPins.removeEventListener(`mousemove`, onMouseMove);
        mapPins.removeEventListener(`mouseup`, onMouseUp);
        mapPins.removeEventListener(`mouseup`, onMouseMove);
      };
      mapPins.addEventListener('mousemove', onMouseMove);
      mapPins.addEventListener('mouseup', onMouseMove);
      mapPins.addEventListener('mouseup', onMouseUp);
    }
  };

  window.mode.mapPinMain.addEventListener('mousedown', onMainMapPinMouseDown);

  window.mode.mapPinMain.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
      window.mode.turnOnActiveMode();
    }
  });

  housingType.addEventListener('change', () => {
    window.card.remove();
    window.handlers.successHandler(window.data.propertyTypes);
  });

  window.form.setDefaultChoice();

  resetButton.addEventListener('mousedown', (evt) => {
    if (evt.which === 1) {
      window.mode.turnOnInactiveMode();
    }

  });

})();
