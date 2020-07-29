'use strict';
(function () {
  var scale = {};
  var scaleParam = {
    MAX: 100,
    MIN: 25,
    STEP: 25,
    MEASURE: '%'
  };

  var scaleButtonsContainer = document.querySelector('.scale');
  var scaleValue = document.querySelector('.scale__control--value');
  var imageToChange = document.querySelector('.img-upload__preview').querySelector('img');

  var applyDefaultPhotoSize = function () {
    imageToChange.style.transform = 'scale(' + (scaleParam.MAX / 100) + ')';
    scaleValue.value = scaleParam.MAX + scaleParam.MEASURE;
  };

  var applyPhotoSize = function (num) {
    imageToChange.style.transform = 'scale(' + (num / 100) + ')';
    scaleValue.value = num + scaleParam.MEASURE;
  };

  var resetPhotoSize = function () {
    imageToChange.style.transform = '';
    applyDefaultPhotoSize();
  };

  var onScaleButtonsContainerClick = function (evt) {
    var currentValue = parseInt(scaleValue.value, 10);

    if (evt.target.classList.contains('scale__control--bigger') && currentValue < scaleParam.MAX) {
      currentValue += scaleParam.STEP;
    }

    if (evt.target.classList.contains('scale__control--smaller') && currentValue > scaleParam.MIN) {
      currentValue -= scaleParam.STEP;
    }

    applyPhotoSize(currentValue);
  };

  scaleButtonsContainer.addEventListener('click', onScaleButtonsContainerClick);

  scale.resetPhotoSize = resetPhotoSize;
  scale.applyDefaultPhotoSize = applyDefaultPhotoSize;
  window.scale = scale;
})();
