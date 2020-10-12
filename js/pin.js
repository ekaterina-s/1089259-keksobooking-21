'use strict';

(function () {
  const addRenderedPins = (array) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < array.length; i++) {
      fragment.appendChild(window.data.renderDomElements(array[i]));
    }
    return document.querySelector('.map__pins').appendChild(fragment);
  };

  window.pin = {
    addRenderedPins: addRenderedPins
  };

})();
