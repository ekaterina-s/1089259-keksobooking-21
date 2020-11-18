'use strict';

(() => {
  const main = document.querySelector(`main`);

  const closeTemplate = () => {

    document.removeEventListener(`keydown`, escape);
    document.removeEventListener(`click`, closeTemplate);

    if (window.success) {
      main.removeChild(document.querySelector(`.success`));
      window.mode.turnOnInactiveMode();
    } else {
      main.removeChild(document.querySelector(`.error`));
    }
  };

  const escape = (evt) => {
    if (window.util.isEscapeKey(evt)) {
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
