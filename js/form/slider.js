'use strict';
(function () {
  var slider = {};
  var levelPin = document.querySelector('.effect-level__pin');
  var levelLine = document.querySelector('.effect-level__line');
  var inputLine = document.querySelector('.effect-level__value');
  var effectLine = document.querySelector('.effect-level__depth');
  var effectLevelSlider = document.querySelector('.effect-level');

  var resetSliderValues = function () {
    levelPin.style.left = 100 + '%';
    effectLine.style.width = 100 + '%';
    inputLine.value = 100;
  };

  var updateSliderValues = function (ratio) {
    levelPin.style.left = Math.round(ratio * 100) + '%';
    effectLine.style.width = Math.round(ratio * 100) + '%';
    inputLine.value = Math.round(ratio * 100);
  };

  var initSlider = function (callback) {
    levelPin.addEventListener('mousedown', function (evt) {
      if (typeof callback === 'function') {
        onLevelPinMouseDown(evt, callback);
      }
    });
  };

  var getSliderHidden = function () {
    effectLevelSlider.classList.add('hidden');
  };

  var getSliderActive = function () {
    effectLevelSlider.classList.remove('hidden');
  };

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();
    return {
      left: box.left + pageXOffset
    };
  };

  var onLevelPinMouseDown = function (evt, callback) {
    evt.preventDefault();

    var sliderCoords = getCoords(levelLine);
    var buttonCoords = getCoords(levelPin);
    var shiftX = evt.pageX - buttonCoords.left;
    var ratio = null;

    var onDocumentMouseMove = function (moveEvt) {
      var left = moveEvt.pageX - shiftX - sliderCoords.left;
      var right = levelLine.offsetWidth - levelPin.offsetWidth;

      if (left < 0) {
        left = 0;
      }

      if (left > right) {
        left = right;
      }

      ratio = left / right;

      updateSliderValues(ratio);
      callback(ratio);
    };

    var onDocumentMouseUp = function () {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);
    };

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  };


  slider.resetSliderValues = resetSliderValues;
  slider.initSlider = initSlider;
  slider.getSliderHidden = getSliderHidden;
  slider.getSliderActive = getSliderActive;
  window.slider = slider;
})();
