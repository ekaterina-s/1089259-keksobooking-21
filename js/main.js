'use strict';

(() => {
  const housingType = document.querySelector('#housing-type');
  const resetButton = document.querySelector('.ad-form__reset');

  window.mode.turnOnInactiveMode();

  window.mode.mapPinMain.addEventListener('mousedown', (evt) => {
    if (evt.which === 1) {
      window.mode.turnOnActiveMode();
      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      console.log(startCoords.x, startCoords.y);
      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();
        const shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        console.log(shift.x, shift.y);
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        console.log(startCoords.x, startCoords.y);

        window.mode.mapPinMain.style.left = `${window.mode.mapPinMain.offsetLeft - shift.x}px`;
        window.mode.mapPinMain.style.top = `${window.mode.mapPinMain.offsetTop - shift.y}px`;

        window.form.fillinAddressField(window.mode.mapPinMain.style.left, window.mode.mapPinMain.style.top);
      };
      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });

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
