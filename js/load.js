'use strict';

(function () {
  window.load = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      var errorMessage;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          errorMessage = 'Неверный запрос';
          break;
        case 404:
          errorMessage = 'Ничего не найдено';
          break;
        case 500:
          errorMessage = 'Ошибка сервера';
          break;
        case 503:
          errorMessage = 'Техническая ошибка на сервере';
          break;

        default:
          errorMessage = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (errorMessage) {
        onError(errorMessage);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения :(');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 100000000000000000;

    xhr.open('GET', url);
    xhr.send();
  };
})();
