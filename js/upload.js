'use strict';

(() => {
  const templateSuccess = document.querySelector(`#success`).content;
  const templateError = document.querySelector(`#error`).content;
  const errorButton = document.querySelector(`.error__button`);

  const URL = `https://21.javascript.pages.academy/keksobooking`;

  const upload = (data) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === 200) {
        window.message.showTemplate(templateSuccess);
      } else {
        window.message.showTemplate(templateError);
        errorButton.addEventListener(`click`, window.message.closeTemplate);
      }
      document.addEventListener(`keydown`, window.message.escape);
      document.addEventListener(`click`, window.message.closeTemplate);
    });
    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  window.upload = {
    upload
  };

})();
