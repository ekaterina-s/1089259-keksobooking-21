'use strict';

(() => {
  const MAP_PIN_MAIN_FROM_LEFT = 570;
  const MAP_PIN_MAIN_FROM_TOP = 375;

  const formElements =
  document.querySelectorAll(`.map__filters, .map__filter, .map__features, .map__checkbox, .ad-form-header, .ad-form__element`);
  const adForm = document.querySelector(`.ad-form`);
  const mapFiltersForm = document.querySelector(`.map__filters`);

  const mapPinMain = document.querySelector(`.map__pin--main`);
  const imgMapPinMain = mapPinMain.querySelector(`img`);

  const imgMapPinMainWidth = imgMapPinMain.width;
  const imgMapPinMainHeight = imgMapPinMain.height;
  const mapPinMainXInactive = MAP_PIN_MAIN_FROM_LEFT + imgMapPinMainWidth / 2;
  const mapPinMainYInactive = MAP_PIN_MAIN_FROM_TOP + imgMapPinMainHeight / 2;

  const mapPinMainXActive = MAP_PIN_MAIN_FROM_LEFT + imgMapPinMainWidth / 2;
  const mapPinMainYActive = MAP_PIN_MAIN_FROM_TOP + imgMapPinMainHeight;

  const turnOnInactiveMode = () => {
    const mapPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    document.querySelector(`.map`).classList.add(`map--faded`);
    mapPinMain.style.left = `${mapPinMainXInactive}px`;
    mapPinMain.style.top = `${mapPinMainYInactive}px`;
    adForm.classList.add(`ad-form--disabled`);
    formElements.forEach((formElement) => {
      return formElement.setAttribute(`disabled`, `true`);
    });
    window.mode.isActiveMode = false;
    adForm.reset();
    mapFiltersForm.reset();
    window.form.fillInAddressField(mapPinMainXInactive, mapPinMainYInactive);
    adForm.querySelector(`#price`).placeholder = window.form.housingTypePrice[window.form.type.value];
    window.card.remove();
    mapPins.forEach((pin) => {
      return window.pin.remove(pin);
    });
  };

  const turnOnActiveMode = () => {
    document.querySelector(`.map`).classList.remove(`map--faded`);
    document.querySelector(`.ad-form`).classList.remove(`ad-form--disabled`);
    formElements.forEach((formElement) => {
      return formElement.removeAttribute(`disabled`);
    });
    window.form.fillInAddressField(mapPinMainXActive, mapPinMainYActive);
    window.mode.isActiveMode = true;
    window.data.getData(window.handlers.successHandler, window.handlers.errorHandler);
  };

  window.mode = {
    mapPinMain,
    turnOnInactiveMode,
    turnOnActiveMode,
    isActiveMode: false
  };
})();
