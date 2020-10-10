'use strict';
(function () {
  const GENERATED_OBJECTS_AMOUNT = 8;
  const formElements = document.querySelectorAll('.map__filters, .ad-form-header, .ad-form__element');


  window.data.generateArrayOfHotels(GENERATED_OBJECTS_AMOUNT);

  window.form.enableOrDisableForm(formElements);

  window.form.fillinInputFieldInactive(window.form.addressField);

  const turnOnActiveMode = () => {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    window.form.enableOrDisableForm(formElements);

    //  вызываем функцию добавления отрисованных элементов во фрагмент кода
    window.pin.addRenderedPins(window.data.generatedHotels);
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

  window.form.setDefaultChoice();

})();
