'use strict';
(function () {
  var util = {};
  var ESCAPE = 'Escape';

  var keyboard = {
    isEscEvent: function (evt, callback) {
      if (evt.key === ESCAPE) {
        callback();
      }
    }
  };

  var getRandomNum = function (minValue, maxValue) {
    var randomNum = Math.floor(Math.random() * maxValue);
    return randomNum > minValue ? randomNum : minValue;
  };

  var findUniqueElements = function (value, index, self) {
    return self.indexOf(value) === index;
  };

  var debounce = function (callBack, intervalal) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callBack.apply(null, parameters);
      }, intervalal);
    };
  };

  util.getRandomNum = getRandomNum;
  util.keyboard = keyboard;
  util.findUniqueElements = findUniqueElements;
  util.debounce = debounce;
  window.util = util;
})();
