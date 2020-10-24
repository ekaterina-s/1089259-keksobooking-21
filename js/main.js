'use strict';

(() => {

  const formElements = document.querySelectorAll('.map__filters, .ad-form-header, .ad-form__element');
  window.form.enableOrDisableForm(formElements);
  window.form.fillinInputFieldInactive(window.form.addressField);

  const turnOnActiveMode = () => {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    window.form.enableOrDisableForm(formElements);
    window.load.load(window.handlers.successHandler, window.handlers.errorHandler);
  };

  window.form.mapPinMain.addEventListener('mousedown', (evt) => {
    if (evt.which === 1) {
      turnOnActiveMode();
      //  вызываем фу-ю заполнения адреса в активе
      window.form.fillinInputFieldActive(window.form.addressField);
    }
  });

  window.form.mapPinMain.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
      turnOnActiveMode();
    }
  });

  window.filter.housingType.addEventListener('change', () => {
    turnOnActiveMode();
  });

  window.form.setDefaultChoice();

})();
