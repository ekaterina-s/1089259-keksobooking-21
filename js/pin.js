'use strict';

(() => {
  const template = document.querySelector('#pin').content;

  const pinTemplateWidth = 50;
  const pinTemplateHeight = 70;

  const renderPins = (pin) => {
    const pinTemplate = template.cloneNode(true);
    const mapPin = pinTemplate.querySelector('.map__pin');
    const mapPinImg = pinTemplate.querySelector('.map__pin img');

    mapPin.style.left = `${pin.location.x - pinTemplateWidth / 2}px`;
    mapPin.style.top = `${pin.location.y - pinTemplateHeight}px`;
    mapPinImg.src = pin.author.avatar;
    mapPin.alt = pin.offer.title;

    return pinTemplate;
  };

  window.pin = {
    renderPins
  };
})();
