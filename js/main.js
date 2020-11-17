'use strict';

(() => {
  const MIN_Y = 130;
  const MAX_Y = 630;
  const MIN_X = 0;
  const MAX_X = mapPins.offsetWidth;

  const housingEvents = [`#housing-type`, `#housing-price`, `#housing-rooms`, `#housing-guests`];
  const housingFeatures =
  [`#filter-elevator`, `#filter-wifi`, `#filter-parking`, `#filter-dishwasher`, `#filter-washer`, `#filter-conditioner`];

  const resetButton = document.querySelector(`.ad-form__reset`);
  const mapPins = document.querySelector(`.map__pins`);
  const form = document.querySelector(`.ad-form`);

  window.mode.turnOnInactiveMode();

  const onMainMapPinMouseDown = (evt) => {
    let isOnMainPin = true;

    if (evt.which === 1) {
      if (!window.mode.isActiveMode) {
        window.mode.turnOnActiveMode();
      }
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

        const coordX = window.mode.mapPinMain.offsetLeft - shift.x;
        const coordY = window.mode.mapPinMain.offsetTop - shift.y;
        const addressX = Math.round(coordX + window.mode.mapPinMain.offsetWidth / 2);
        const addressY = Math.round(coordY + window.mode.mapPinMain.scrollHeight);

        if (isOnMainPin && addressY <= MAX_Y && addressY >= MIN_Y && addressX <= MAX_X && addressX >= MIN_X) {
          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };
          window.mode.mapPinMain.style.left = `${coordX}px`;
          window.mode.mapPinMain.style.top = `${coordY}px`;
          window.form.fillInAddressField(addressX, addressY);
        }
      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();

        mapPins.removeEventListener(`mousemove`, onMouseMove);
        mapPins.removeEventListener(`mouseup`, onMouseUp);
        mapPins.removeEventListener(`mouseup`, onMouseMove);
      };
      mapPins.addEventListener(`mousemove`, onMouseMove);
      mapPins.addEventListener(`mouseup`, onMouseMove);
      mapPins.addEventListener(`mouseup`, onMouseUp);
    }
  };

  window.mode.mapPinMain.addEventListener(`mousedown`, onMainMapPinMouseDown);

  window.mode.mapPinMain.addEventListener(`keydown`, (evt) => {
    if (window.util.isEnterKey(evt)) {
      window.mode.turnOnActiveMode();
    }
  });

  housingEvents.forEach((menuElement) => {
    document.querySelector(menuElement).addEventListener(`change`, () => {
      window.card.remove();
      window.handlers.successHandler(window.data.propertyTypes);
    });
  });

  housingFeatures.forEach((feature) => {
    document.querySelector(feature).addEventListener(`click`, () => {
      window.filter.change(window.housingFeaturesValues, document.querySelector(feature).value);
      window.card.remove();
      window.handlers.successHandler(window.data.propertyTypes);
    });
  });

  window.form.setDefaultChoice();

  resetButton.addEventListener(`mousedown`, (evt) => {
    if (evt.which === 1) {
      window.mode.turnOnInactiveMode();
    }

  });

  form.addEventListener(`submit`, (evt) => {
    window.upload(new FormData(form));
    evt.preventDefault();
  });

})();
