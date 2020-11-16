'use strict';

(() => {
  const main = document.querySelector(`main`);
  const errorButton = document.querySelector(`.error__button`);

  const closeTemplate = () => {
    let success = document.querySelector(`.success`);
    let error = document.querySelector(`.error`);

    document.removeEventListener(`keydown`, escape);
    document.removeEventListener(`click`, closeTemplate);

    if (success !== null) {
      main.removeChild(success);
    }
    if (error !== null) {
      errorButton.removeEventListener(`click`, closeTemplate);
      main.removeChild(error);
    }
  };

  const escape = (evt) => {
    if (evt.key === `Escape`) {
      closeTemplate();
    }
  };

  const showTemplate = (template) => {
    main.appendChild(template);
  };

  window.message = {
    showTemplate,
    escape,
    closeTemplate
  };
})();
