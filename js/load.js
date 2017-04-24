'use strict';

(function () {
  window.load = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      var errorMessage;
      var errorMap = {
        '400': 'Неверный запрос',
        '404': 'Ничего не найдено',
        '500': 'Ошибка сервера',
        '503': 'Техническая ошибка на сервере'
      };

      errorMessage = errorMap[xhr.status];

      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else if (errorMessage) {
        onError(errorMessage);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения :(');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', url);
    xhr.send();
  };
})();
