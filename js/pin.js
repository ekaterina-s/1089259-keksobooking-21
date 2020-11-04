'use strict';

(() => {
  const template = document.querySelector('#pin').content;

  const pinTemplateWidth = 50;
  const pinTemplateHeight = 70;

  const renderPins = (pin, pinNumber) => {
    const pinTemplate = template.cloneNode(true);
    const mapPin = pinTemplate.querySelector('.map__pin');
    const mapPinImg = pinTemplate.querySelector('.map__pin img');

    mapPin.style.left = `${pin.location.x - pinTemplateWidth / 2}px`;
    mapPin.style.top = `${pin.location.y - pinTemplateHeight}px`;
    mapPinImg.src = pin.author.avatar;
    mapPin.alt = pin.offer.title;

    const showCard = () => {
      mapPin.addEventListener('click', () => {
        window.card.addRenderedСard(window.data.propertyTypes[pinNumber]);
        mapPin.classlist.add('map__pin--active');
      });
      mapPin.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter') {
          window.card.addRenderedСard(window.data.propertyTypes[pinNumber]);
        }
      });
    };

    showCard();

    return pinTemplate;
  };

  window.pin = {
    renderPins
  };
})();
