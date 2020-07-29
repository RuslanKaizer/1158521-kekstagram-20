'use strict';
window.effectRange = (function () {
  var range = document.querySelector('.img-upload__effect-level');
  var valueField = range.querySelector('.effect-level__value');
  var scale = range.querySelector('.effect-level__line');
  var arm = scale.querySelector('.effect-level__pin');
  var depth = scale.querySelector('.effect-level__depth');
  var maxValue;
  var defaultValue = Number.parseFloat(valueField.value);

  var getMaxValue = function () {
    return window.util.createLocalCopy(maxValue);
  };

  var getDefaultValue = function () {
    return window.util.createLocalCopy(defaultValue);
  };

  var getValue = function () {
    return Number.parseFloat(valueField.value);
  };

  var modifyEvt = window.util.createEvent('modify');

  var setValue = function (effectValue) {
    var validEffectValue = window.util.pushIntoRange(effectValue, 0, maxValue);
    valueField.setAttribute('value', validEffectValue.toString());
    window.util.makeEvent(range, modifyEvt);
    depth.setAttribute('style', 'width: ' + (validEffectValue / maxValue * scale.offsetWidth).toString() + 'px;');
    arm.setAttribute('style', 'left: ' + (validEffectValue / maxValue * scale.offsetWidth).toString() + 'px;');
  };

  var setArm = function (armPosition) {
    var validArmPosition = window.util.pushIntoRange(armPosition, 0, scale.offsetWidth);
    valueField.setAttribute('value', (validArmPosition / scale.offsetWidth * maxValue).toString());
    window.util.makeEvent(range, modifyEvt);
    depth.setAttribute('style', 'width: ' + validArmPosition.toString() + 'px;');
    arm.setAttribute('style', 'left: ' + validArmPosition.toString() + 'px;');
  };

  arm.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var halfOfArmWidth = arm.offsetWidth / 2;
      var validClientX = window.util.pushIntoRange(
          moveEvt.clientX,
          scale.getBoundingClientRect().left - halfOfArmWidth,
          scale.getBoundingClientRect().left + scale.offsetWidth + halfOfArmWidth
      );
      var xShift = validClientX - startX;
      setArm(arm.offsetLeft + xShift);
      startX = validClientX;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  range.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (evt.target !== arm) {
      setArm(evt.clientX - scale.getBoundingClientRect().left);
    }
  });

  var init = function (initMaxValue, initValue) {
    maxValue = initMaxValue;
    setValue(initValue);
  };

  init(100, defaultValue);

  return {
    getMaxValue: getMaxValue,
    getDefaultValue: getDefaultValue,
    getValue: getValue,
    setValue: setValue
  };
})();
