'use strict';
window.backend = (function () {
  var GET_URL = 'https://javascript.pages.academy/kekstagram/data';
  var POST_URL = 'https://javascript.pages.academy/kekstagram/';
  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NO_LOGIN: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    UNAVAILABLE_SERVICE: 503
  };
  var TIMEOUT_IN_MS = 10000;

  var initXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
          break;
        case StatusCode.BAD_REQUEST:
          onError('Ошибка! Неверный запрос к серверу.');
          break;
        case StatusCode.NO_LOGIN:
          onError('Ошибка! Для получения запрашиваемых данных необходимо авторизоваться.');
          break;
        case StatusCode.NOT_FOUND:
          onError('Ошибка! Запрашиваемые данные не найдены.');
          break;
        case StatusCode.SERVER_ERROR:
          onError('Ошибка! Внутренняя ошибка сервера.');
          break;
        case StatusCode.UNAVAILABLE_SERVICE:
          onError('Ошибка! Сервер не готов обработать запрос, так как служба не доступна.');
          break;
        default:
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = initXhr(onSuccess, onError);
    xhr.open('GET', GET_URL);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = initXhr(onSuccess, onError);

    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  return {
    load: load,
    upload: upload
  };
})();
