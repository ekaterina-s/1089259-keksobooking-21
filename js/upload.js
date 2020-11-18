'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking`;

  const templateSuccess = document.querySelector(`#success`).content;
  const templateError = document.querySelector(`#error`).content;

  window.upload = (data) => {
    const xhr = new XMLHttpRequest();
    let message;
    xhr.responseType = `json`;
    const showMessage = () => {
      window.message.showTemplate(message);
      document.addEventListener(`keydown`, window.message.escape);
      document.addEventListener(`click`, window.message.closeTemplate);
    };

    xhr.addEventListener(`load`, () => {
      if (xhr.status === 200) {
        message = templateSuccess.cloneNode(true);
        window.message.showTemplate(message);
        window.success = true;
      } else {
        message = templateError.cloneNode(true);
        message.querySelector(`.error__button`).addEventListener(`click`, window.message.closeTemplate);
        window.success = false;
      }
      showMessage();
    });
    xhr.addEventListener(`error`, () => {
      message = templateError.cloneNode(true);
      message.querySelector(`.error__button`).addEventListener(`click`, window.message.closeTemplate);
      window.success = false;
      showMessage();
    });
    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
