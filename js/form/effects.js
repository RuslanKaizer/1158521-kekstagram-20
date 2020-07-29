'use strict';
(function () {
  var effects = {};
  var resetPhotoSize = window.scale.resetPhotoSize;
  var getSliderHidden = window.slider.getSliderHidden;
  var getSliderActive = window.slider.getSliderActive;
  var resetSliderValues = window.slider.resetSliderValues;
  var initSlider = window.slider.initSlider;
  var currentFilter = null;
  var imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

  var FILTER = {
    none: {
      className: 'none'
    },
    chrome: {
      className: 'chrome',
      filterType: 'grayscale',
      min: '0',
      max: '1',
      measure: ''
    },
    sepia: {
      className: 'sepia',
      filterType: 'sepia',
      min: '0',
      max: '1',
      measure: ''
    },
    marvin: {
      className: 'marvin',
      filterType: 'invert',
      min: '0',
      max: '100',
      measure: '%'
    },
    phobos: {
      className: 'phobos',
      filterType: 'blur',
      min: '0',
      max: '3',
      measure: 'px'
    },
    heat: {
      className: 'heat',
      filterType: 'brightness',
      min: '1',
      max: '2',
      measure: ''
    }
  };

  var changeEffect = function (value) {
    if (currentFilter) {
      imgPreview.style.filter = currentFilter.filterType + '(' + (+currentFilter.max * +value + +currentFilter.min) + currentFilter.measure + ')';
    }
  };

  var resetEffect = function () {
    imgPreview.style.filter = '';
  };

  var resetFilter = function () {
    resetEffect();
    currentFilter = FILTER.none;
    imgPreview.className = 'effects__preview--' + currentFilter.className;
    document.querySelector('input[id="effect-none"]').checked = true;
  };

  var onEffectsListChange = function (evt) {
    currentFilter = FILTER[evt.target.value];
    imgPreview.className = 'effects__preview--' + currentFilter.className;

    if (currentFilter.className === 'none') {
      getSliderHidden();
    } else {
      getSliderActive();
    }

    resetPhotoSize();
    resetSliderValues();
    resetEffect();
  };

  var changePhotoEffects = function () {
    var effectsList = document.querySelector('.effects__list');
    effectsList.addEventListener('change', onEffectsListChange);
  };

  changePhotoEffects();
  initSlider(changeEffect);

  effects.changeEffect = changeEffect;
  effects.resetFilter = resetFilter;
  window.effects = effects;
})();
