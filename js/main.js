'use strict';

(() => {

  const formElements = document.querySelectorAll('.map__filters, .ad-form-header, .ad-form__element');
  const addressField = document.querySelector('.ad-form__element #address');

  const housingType = document.querySelector('#housing-type');

  window.enableOrDisableForm(formElements);
  window.fillinInputFieldInactive(addressField);

  const turnOnActiveMode = () => {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    window.enableOrDisableForm(formElements);
    window.data(window.successHandler, window.errorHandler);
  };

  window.mapPinMain.addEventListener('mousedown', (evt) => {
    if (evt.which === 1) {
      turnOnActiveMode();
      //  вызываем фу-ю заполнения адреса в активе
      window.fillinInputFieldActive(addressField);
    }
  });

  window.mapPinMain.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
      turnOnActiveMode();
    }
  });

  housingType.addEventListener('change', () => {
    window.successHandler(window.data.propertyTypes);
  });

  window.setDefaultChoice();
})();
