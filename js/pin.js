'use strict';

(() => {
  const template = document.querySelector('#pin').content;

  const domElementWidth = 50;
  const domElementHeight = 70;

  const renderDomElements = (element) => {
    const domElement = template.cloneNode(true);
    domElement.querySelector('.map__pin').style.left = `${element.location.x - domElementWidth / 2}px`;
    domElement.querySelector('.map__pin').style.top = `${element.location.y - domElementHeight}px`;
    domElement.querySelector('.map__pin img').src = element.author.avatar;
    domElement.querySelector('.map__pin').alt = element.offer.title;

    return domElement;
  };

  window.pin = {
    renderDomElements
  };
})();
