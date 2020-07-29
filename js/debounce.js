'use strict';
window.debounce = (function () {
  var DEBOUNCE_INTERVAL = 500;

  var debounce = function (callback) {
    var lastTimeout = null;

    return function (target) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.call(null, target);
      }, DEBOUNCE_INTERVAL);
    };
  };

  return {
    debounce: debounce
  };
})();
