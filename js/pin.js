'use strict';

(() => {
  const template = document.querySelector(`#pin`).content;

  const PIN_TEMPLATE_WIDTH = 50;
  const PIN_TEMPLATE_HEIGHT = 70;

  const showPopup = (pinNumber) => {
    return (evt) => {
      if (evt.type === `click` || window.util.isEnterKey(evt)) {

        const openedPopup = document.querySelector(`.map__card`);
        if (openedPopup) {
          window.card.remove();
        }
        window.card.add(window.filteredHotels[pinNumber]);
        evt.currentTarget.classList.add(`map__pin--active`);
      }
    };
  };

  const remove = (pin) => {
    pin.removeEventListener(`click`, showPopup);
    pin.remove();
  };

  const render = (pin, pinNumber) => {
    const pinTemplate = template.cloneNode(true);
    const mapPin = pinTemplate.querySelector(`.map__pin`);
    const mapPinImg = pinTemplate.querySelector(`.map__pin img`);

    mapPin.style.left = `${pin.location.x - PIN_TEMPLATE_WIDTH / 2}px`;
    mapPin.style.top = `${pin.location.y - PIN_TEMPLATE_HEIGHT}px`;
    mapPinImg.src = pin.author.avatar;
    mapPin.alt = pin.offer.title;

    mapPin.addEventListener(`click`, showPopup(pinNumber));

    return pinTemplate;
  };

  window.pin = {
    render,
    remove
  };
})();
