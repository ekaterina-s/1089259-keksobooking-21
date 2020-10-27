'use strict';

(() => {
  const URL = 'https://21.javascript.pages.academy/keksobooking/data';
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const getData = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
        window.data.propertyTypes = xhr.response;
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });
    xhr.addEventListener('error', () => {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.data = {
    getData
  };
})();
