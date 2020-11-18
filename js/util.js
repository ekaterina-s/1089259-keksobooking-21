'use strict';

(() => {

  const DEBOUNCE_INTERVAL = 500;

  const debounce = (cb) => {
    let lastTimeout = null;

    return (parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb(parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  const isEscapeKey = (evt) => {
    return evt.key && (evt.key === `Escape` || evt.key === `Esc`);
  };

  const isEnterKey = (evt) => {
    return evt.key && (evt.key === `Enter`);
  };

  window.util = {
    debounce,
    isEscapeKey,
    isEnterKey
  };
})();

