'use strict';

(function () {
  const template = document.querySelector('#pin').content;

  const domElementWidth = 50;
  const domElementHeight = 70;

  const renderDomElements = (object) => {
    const domElement = template.cloneNode(true);
    domElement.querySelector('.map__pin').style.left = `${object.location.x - domElementWidth / 2}px`;
    domElement.querySelector('.map__pin').style.top = `${object.location.y - domElementHeight}px`;
    domElement.querySelector('.map__pin img').src = object.author.avatar;
    domElement.querySelector('.map__pin').alt = object.offer.title;

    return domElement;
  };

  window.pin = {
    renderDomElements: renderDomElements
  };

})();
