'use strict';

(() => {

  let hotels = [];

  const successHandler = (data) => {
    hotels = data;
    let housingTypeValue = document.querySelector('#housing-type').value;

    return window.filter.filterHotels(housingTypeValue, hotels);
  };

  const errorHandler = (errorMessage) => {
    const node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.handlers = {
    successHandler: successHandler,
    errorHandler: errorHandler
  };

})();
