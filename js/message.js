'use strict';

(() => {
  const main = document.querySelector(`main`);

  const closeTemplate = () => {
    let success = document.querySelector(`.success`);
    let error = document.querySelector(`.error`);

    document.removeEventListener(`keydown`, escape);
    document.removeEventListener(`click`, closeTemplate);

    if (window.success) {
      main.removeChild(success);
      window.mode.turnOnInactiveMode();
    } else {
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
