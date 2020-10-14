'use strict';

(function () {

  const template = document.querySelector('#pin').content;
  document.querySelector('.map').classList.remove('map--faded');

  const renderDomElements = (object) => {
    const domElement = template.cloneNode(true);
    domElement.querySelector('.map__pin').style.left = `${object.location.x}px`;
    domElement.querySelector('.map__pin').style.top = `${object.location.y}px`;
    domElement.querySelector('.map__pin img').src = object.author.avatar;
    domElement.querySelector('.map__pin').alt = object.offer.title;

    return domElement;
  };

  window.pin = {
    renderDomElements: renderDomElements
  };

})();
