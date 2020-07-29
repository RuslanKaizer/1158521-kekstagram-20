'use strict';
window.util = (function () {
  var ESCAPE_KEY = 'Escape';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var createLocalCopy = function (object) {
    var localCopy = object;
    return localCopy;
  };

  var makeNotLessThen = function (numValue, minValue) {
    return (numValue >= minValue) ? numValue : minValue;
  };

  var makeNotGreaterThen = function (numValue, maxValue) {
    return (numValue <= maxValue) ? numValue : maxValue;
  };

  var pushIntoRange = function (numValue, minValue, maxValue) {
    return makeNotGreaterThen(makeNotLessThen(numValue, minValue), maxValue);
  };

  var createEvent = function (eventName) {
    var evt;
    if (document.createEvent) {
      evt = document.createEvent('HTMLEvents');
      evt.initEvent(eventName, true, true);
      evt.eventName = eventName;
    } else {
      evt = document.createEventObject();
      evt.eventName = eventName;
      evt.eventType = eventName;
    }
    return evt;
  };

  var makeEvent = function (object, evt) {
    if (document.createEvent) {
      object.dispatchEvent(evt);
    } else {
      object.fireEvent('on' + evt.eventType, evt);
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.key === ESCAPE_KEY) {
      action();
    }
  };

  var setBackgroundImages = function (elems, url) {
    Array.from(elems).forEach(function (elem) {
      elem.style.backgroundImage = 'url(' + url + ')';
    });
  };

  var loadGraficFile = function (file, previewImg, previewMiniatures, callback) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewImg.src = reader.result;
        setBackgroundImages(previewMiniatures, reader.result);
        callback();
      });
      reader.readAsDataURL(file);
    } else {
      previewImg.src = 'img/upload-default-image.jpg';
      setBackgroundImages(previewMiniatures, 'img/upload-default-image.jpg');
      callback();
    }
  };

  var initPopup = function (overlay, onEscPress) {
    var cancelBtn = overlay.querySelector('.cancel');

    cancelBtn.addEventListener('click', function () {
      closePopup(overlay, onEscPress);
    });

    return onEscPress;
  };

  var body = document.querySelector('body');

  var openPopup = function (overlay, onEscPress) {
    body.classList.add('modal-open');
    overlay.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
  };

  var closeEvt = createEvent('close');

  var closePopup = function (overlay, onEscPress) {
    body.classList.remove('modal-open');
    overlay.classList.add('hidden');
    makeEvent(overlay, closeEvt);
    document.removeEventListener('keydown', onEscPress);
  };

  var main = document.querySelector('main');

  var makeDialogOverlay = function (templateId) {
    var origin = document.querySelector('#' + templateId)
      .content
      .querySelector(':first-child');
    var overlay = origin.cloneNode(true);
    main.appendChild(overlay);
    overlay.style.zIndex = 2;
    overlay.classList.add('hidden');

    return overlay;
  };

  var initDialog = function (overlay) {
    var onEscPress = function (evt) {
      isEscEvent(evt, closeDialog.bind(null, overlay, onEscPress));
    };

    var okBtn = overlay.querySelector('.' + overlay.classList[0] + '__button');

    okBtn.addEventListener('click', function () {
      closeDialog(overlay, onEscPress);
    });

    return onEscPress;
  };

  var defineDialog = function (templateId) {
    var overlay = makeDialogOverlay(templateId);

    return {
      overlay: overlay,
      onEscPress: initDialog(overlay)
    };
  };

  var onDialogOverlayClick = function (evt, onEscPress) {
    if (evt.target === evt.currentTarget) {
      closeDialog(evt.currentTarget, onEscPress);
    }
  };

  var openDialog = function (overlay, onEscPress) {
    openPopup(overlay, onEscPress);
    overlay.addEventListener('click', onDialogOverlayClick.bind(onEscPress));
    overlay.querySelector('.' + overlay.classList[0] + '__button').focus();
    if (overlay.classList.contains('error')) {
      document.removeEventListener('keydown', window.validation.onEscPress);
    }
  };

  var closeDialog = function (overlay, onEscPress) {
    closePopup(overlay, onEscPress);
    overlay.removeEventListener('click', onDialogOverlayClick);
    if (overlay.classList.contains('error')) {
      document.addEventListener('keydown', window.validation.onEscPress);
      body.classList.add('modal-open');
    }
  };

  var setTabIndexAll = function (elementList, tabindex) {
    for (var i = 0; i < elementList.length; i++) {
      elementList[i].setAttribute('tabindex', tabindex);
    }
  };

  return {
    createLocalCopy: createLocalCopy,
    pushIntoRange: pushIntoRange,
    createEvent: createEvent,
    makeEvent: makeEvent,
    isEscEvent: isEscEvent,
    loadGraficFile: loadGraficFile,
    initPopup: initPopup,
    openPopup: openPopup,
    closePopup: closePopup,
    defineDialog: defineDialog,
    openDialog: openDialog,
    closeDialog: closeDialog,
    setTabIndexAll: setTabIndexAll
  };
})();
