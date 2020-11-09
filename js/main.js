'use strict';

(() => {

  const formElements =
  document.querySelectorAll('.map__filters, .map__filter, .map__checkbox, .ad-form-header, .ad-form__element');

  const addressField = document.querySelector('.ad-form__element #address');
  const housingType = document.querySelector('#housing-type');
  const resetButton = document.querySelector('.ad-form__reset');

  window.form.enableOrDisableForm(formElements);
  window.form.fillinInputFieldInactive(addressField);

  const turnOnInactiveMode = () => {
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    window.form.enableOrDisableForm(formElements);
    window.form.fillinInputFieldInactive();
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

  window.form.mapPinMain.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
      turnOnActiveMode();
    }
  });



  housingType.addEventListener('change', () => {
    window.card.remove();
    window.handlers.successHandler(window.data.propertyTypes);
  });

  window.form.setDefaultChoice();

  resetButton.addEventListener('mousedown', (evt) => {
    if (evt.which === 1) {
      turnOnInactiveMode();
    }

  });

})();
