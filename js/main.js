'use strict';

(function () {

  const successHandler = function (array) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < array.length; i++) {
      fragment.appendChild(window.pin.renderDomElements(array[i]));
    }
    return document.querySelector('.map__pins').appendChild(fragment);
  };

  window.load(successHandler, window.errorHandler);

})();
