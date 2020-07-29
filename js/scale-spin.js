'use strict';
window.scaleSpin = (function () {
  var MIN_VALUE = 25;
  var MAX_VALUE = 100;
  var INC = 25;
  var scale = document.querySelector('.img-upload__scale');
  var valueField = scale.querySelector('.scale__control--value');
  var downBtn = scale.querySelector('.scale__control--smaller');
  var upBtn = scale.querySelector('.scale__control--bigger');
  var minValue;
  var maxValue;
  var inc;
  var defaultValue = 100;

  var getDefaultValue = function () {
    return window.util.createLocalCopy(defaultValue);
  };

  var getValue = function () {
    return Number.parseFloat(valueField.value);
  };

  var modifyEvt = window.util.createEvent('modify');

  var setValue = function (scaleValue) {
    valueField.setAttribute('value', window.util.pushIntoRange(scaleValue, minValue, maxValue).toString() + '%');
    window.util.makeEvent(scale, modifyEvt);
  };

  downBtn.addEventListener('click', function () {
    setValue(Number.parseFloat(valueField.value) - inc);
  });

  upBtn.addEventListener('click', function () {
    setValue(Number.parseFloat(valueField.value) + inc);
  });

  var init = function (initMinValue, initMaxValue, initInc, initValue) {
    minValue = initMinValue;
    maxValue = initMaxValue;
    inc = initInc;
    setValue(initValue);
  };

  init(MIN_VALUE, MAX_VALUE, INC, defaultValue);

  return {
    getDefaultValue: getDefaultValue,
    getValue: getValue,
    setValue: setValue
  };
})();
