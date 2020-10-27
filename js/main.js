'use strict';

(() => {

  const formElements = document.querySelectorAll('.map__filters, .ad-form-header, .ad-form__element');
  const addressField = document.querySelector('.ad-form__element #address');

  const housingType = document.querySelector('#housing-type');

  window.form.enableOrDisableForm(formElements);
  window.form.fillinInputFieldInactive(addressField);

  const turnOnActiveMode = () => {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    window.form.enableOrDisableForm(formElements);
    window.data.getData(window.handlers.successHandler, window.handlers.errorHandler);
  };

  window.form.mapPinMain.addEventListener('mousedown', (evt) => {
    if (evt.which === 1) {
      turnOnActiveMode();
      //  вызываем фу-ю заполнения адреса в активе
      window.form.fillinInputFieldActive(addressField);
    }
  });

  window.form.mapPinMain.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
      turnOnActiveMode();
    }
  });

  housingType.addEventListener('change', () => {
    window.handlers.successHandler(window.data.propertyTypes);
  });

  window.form.setDefaultChoice();
})();
