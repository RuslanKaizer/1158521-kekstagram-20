'use strict';
(function () {
  var TIMEOUT_IN_MS = 10000;
  var URL_GET = 'https://javascript.pages.academy/kekstagram/data';
  var URL_POST = 'https://javascript.pages.academy/kekstagram';
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.timeout = TIMEOUT_IN_MS;
  var StatusCode = {
    OK: 200,
    NOT_FOUND: 404
  };
  var ServerMessages = {
    error: 'Ошибка соединения',
    timeout: 'Запрос не успел обработаться за ' + xhr.timeout + 'мс'
  };
  var dataApi = {};


  var xhrEvents = function (onSuccess, onError) {
    xhr.addEventListener('load', function () {
      var answer = '';
      switch (xhr.status) {
        case StatusCode.OK:
          answer = onSuccess(xhr.response);
          break;
        case StatusCode.NOT_FOUND:
          answer = onError(xhr.response);
          break;
      }
      return answer;
    });
    xhr.addEventListener('error', function () {
      onError(ServerMessages.error);
    });
    xhr.addEventListener('timeout', function () {
      onError(ServerMessages.timeout);
    });
  };

  var uploadData = function (data, onSuccess, onError) {
    xhrEvents(onSuccess, onError);
    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  var loadData = function (onSuccess, onError) {
    xhrEvents(onSuccess, onError);
    xhr.open('GET', URL_GET);
    xhr.send();
  };

  dataApi.load = loadData;
  dataApi.upload = uploadData;
  window.dataApi = dataApi;
})();
