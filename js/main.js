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

  const successHandler = function (array) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < array.length; i++) {
      fragment.appendChild(renderDomElements(array[i]));
    }
    return document.querySelector('.map__pins').appendChild(fragment);
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);

})();
