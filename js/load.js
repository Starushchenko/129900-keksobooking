'use strict';

window.load = (function () {
  var ERROR_MAP = {
    '400': 'Неверный запрос',
    '404': 'Ничего не найдено',
    '500': 'Ошибка сервера',
    '503': 'Техническая ошибка на сервере'
  };
  var HTTP_REQUEST_TIMEOUT = 10000;

  return function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(ERROR_MAP[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения :(');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = HTTP_REQUEST_TIMEOUT;

    xhr.open('GET', url);

    xhr.send();
  };
})();
