'use strict';
// доработать форму
// удалить своевременно обработчики
// рефакторинг
// вынести в отдельный модуль util или common переменные или повтор переменные или функции
// возможно вынести в отдельный модуль houdingTypes

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

  window.util = {
    debounce
  };
})();

