'use strict';

(() => {
  const template = document.querySelector('#pin').content;

  const pinTemplateWidth = 50;
  const pinTemplateHeight = 70;

  const renderPins = (pin) => {
    const pinTemplate = template.cloneNode(true);
    pinTemplate.querySelector('.map__pin').style.left = `${pin.location.x - pinTemplateWidth / 2}px`;
    pinTemplate.querySelector('.map__pin').style.top = `${pin.location.y - pinTemplateHeight}px`;
    pinTemplate.querySelector('.map__pin img').src = pin.author.avatar;
    pinTemplate.querySelector('.map__pin').alt = pin.offer.title;

    return pinTemplate;
  };

  window.pin = {
    renderPins
  };
})();
