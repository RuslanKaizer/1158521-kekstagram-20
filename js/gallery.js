'use strict';
window.gallery = (function () {
  var Effect = {
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat',
    NONE: 'none',
    UNDEFINED: 'undefined'
  };

  var pictures = document.querySelector('.pictures');
  var prevRenderingPhotoCount = 0;

  var fillPicturesBlock = function (photos, renderingPhotoCount) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < renderingPhotoCount; i++) {
      fragment.appendChild(window.picture.createPicture(photos[i]));
    }

    pictures.appendChild(fragment);
    prevRenderingPhotoCount = renderingPhotoCount;
  };

  var clearPicturesBlock = function () {
    for (var i = prevRenderingPhotoCount; i > 0; i--) {
      pictures.lastChild.remove();
    }
  };

  var previewModal = document.querySelector('.big-picture');
  window.util.initPopup(previewModal, window.preview.onEscPress);
  var commentsLoaderBtn = previewModal.querySelector('.comments-loader');

  pictures.addEventListener('click', function (evt) {
    if ((/^picture[^s].*$/).test(evt.target.classList[0])) {
      window.util.openPopup(previewModal, window.preview.onEscPress);
    }
    var target = null;
    switch (evt.target.classList[0]) {
      case 'picture':
        target = evt.target;
        break;
      case 'picture__img':
      case 'picture__info':
        target = evt.target.parentNode;
        break;
      case 'picture__comments':
      case 'picture__likes':
        target = evt.target.parentNode.parentNode;
        break;
    }
    var photoIndex = null;
    if (target !== null) {
      commentsLoaderBtn.classList.add('hidden');
      photoIndex = Array.from(pictures.querySelectorAll('.picture')).indexOf(target);
      window.preview.fillPreview(pictures, target, photoIndex);
    }
    if (photoIndex !== null) {
      if (window.filters.filteredPhotos[photoIndex].comments.length > 5) {
        commentsLoaderBtn.classList.remove('hidden');
      }
    }
  });

  var imgFilterBtns = document.querySelectorAll('.img-filters__button');

  window.util.setTabIndexAll(imgFilterBtns, '-1');

  commentsLoaderBtn.addEventListener('click', function () {
    window.preview.onCommentsLoaderClick(commentsLoaderBtn);
  });

  var editingModal = document.querySelector('.img-upload__overlay');
  window.util.initPopup(editingModal, window.validation.onEscPress);
  var validation = document.querySelector('.img-upload__form');
  var fileField = validation.querySelector('#upload-file');
  var previewImg = validation.querySelector('.img-upload__preview img');
  var previewMiniatures = validation.querySelectorAll('.effects__preview');

  fileField.addEventListener('change', function () {
    window.util.loadGraficFile(fileField.files[0], previewImg, previewMiniatures, window.util.openPopup.bind(null, editingModal, window.validation.onEscPress));
  });

  var scaleSpin = document.querySelector('.img-upload__scale');

  var addStyleAttrToImg = function (style) {
    var previewImgStyle = previewImg.getAttribute('style');
    if (previewImgStyle !== null) {
      previewImgStyle = Array.from(previewImgStyle);
      var styleAsArray = Array.from(style);
      var propertyName = styleAsArray.slice(0, styleAsArray.indexOf(':')).join('');
      switch (propertyName) {
        case 'transform':
          previewImg.setAttribute('style', style + previewImgStyle.slice(previewImgStyle.indexOf(';') + 1, previewImgStyle.length).join(''));
          break;
        case 'filter':
          previewImg.setAttribute('style', previewImgStyle.slice(0, previewImgStyle.indexOf(';')).join('') + '; ' + style);
          break;
      }
    } else {
      previewImg.setAttribute('style', style);
    }
  };

  scaleSpin.addEventListener('modify', function () {
    var scaleAbsStrValue = (window.scaleSpin.getValue() / 100).toString();
    scaleAbsStrValue += ', ' + scaleAbsStrValue;
    addStyleAttrToImg('transform: scale(' + scaleAbsStrValue + ');');
  });

  var effectsFieldset = validation.querySelector('.img-upload__effects');
  var effectRange = validation.querySelector('.img-upload__effect-level');
  var currentEffectName = '';

  effectRange.classList.add('hidden');

  var removeEffectClass = function () {
    if (currentEffectName !== Effect.NONE) {
      previewImg.classList.remove('effects__preview--' + currentEffectName);
    }
  };

  effectsFieldset.addEventListener('change', function () {
    removeEffectClass();

    var newEffectName = validation.querySelector('input[name=effect]:checked').value.toString();

    if (newEffectName !== Effect.NONE) {
      if (effectRange.classList.contains('hidden')) {
        effectRange.classList.remove('hidden');
      }
    } else {
      effectRange.classList.add('hidden');
    }
    previewImg.classList.add('effects__preview--' + newEffectName);
    window.effectRange.setValue(window.effectRange.getMaxValue());
    currentEffectName = newEffectName;
  });

  effectRange.addEventListener('modify', function () {
    var propertyValue;
    var effectValue = window.effectRange.getValue();
    switch (validation.querySelector('input[name=effect]:checked').value) {
      case Effect.CHROME:
        propertyValue = 'grayscale(' + (effectValue / window.effectRange.getMaxValue()).toString() + ')';
        break;
      case Effect.SEPIA:
        propertyValue = 'sepia(' + (effectValue / window.effectRange.getMaxValue()).toString() + ')';
        break;
      case Effect.MARVIN:
        propertyValue = 'invert(' + effectValue.toString() + '%)';
        break;
      case Effect.PHOBOS:
        propertyValue = 'blur(' + (effectValue / window.effectRange.getMaxValue() * 3).toString() + 'px)';
        break;
      case Effect.HEAT:
        propertyValue = 'brightness(' + (1 + effectValue / window.effectRange.getMaxValue() * 2).toString() + ')';
        break;
      case Effect.NONE:
      case Effect.UNDEFINED:
        propertyValue = 'none';
        break;
    }
    addStyleAttrToImg('filter: ' + propertyValue + ';');
  });

  window.validation.resetCustomControls();

  editingModal.addEventListener('close', function () {
    validation.reset();
    window.validation.resetCustomControls();
    removeEffectClass();
    currentEffectName = Effect.NONE;
    if (!effectRange.classList.contains('hidden')) {
      effectRange.classList.add('hidden');
    }
  });

  var successDialog = window.util.defineDialog('success');

  var onUploadSuccess = function () {
    window.util.closePopup(editingModal, window.preview.onEscPress);
    window.util.openDialog(successDialog.overlay, successDialog.onEscPress);
  };

  var errorDialog = window.util.defineDialog('error');

  var onUploadError = function () {
    window.util.openDialog(errorDialog.overlay, errorDialog.onEscPress);
  };

  validation.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(validation), onUploadSuccess, onUploadError);
  });

  return {
    fillPicturesBlock: fillPicturesBlock,
    clearPicturesBlock: clearPicturesBlock
  };
})();
