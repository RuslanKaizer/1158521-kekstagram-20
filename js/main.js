'use strict';
window.main = (function () {
  var photos = [];
  var imgFilterSwitch = document.querySelector('.img-filters');
  var imgFilterBtns = imgFilterSwitch.querySelectorAll('.img-filters__button');

  var onLoadSuccess = function (photosParam) {
    window.main.photos = photosParam;
    window.filters.filteredPhotos = window.main.photos.slice();
    window.gallery.fillPicturesBlock(window.filters.filteredPhotos, window.filters.filteredPhotos.length);
    imgFilterSwitch.classList.remove('img-filters--inactive');
    window.util.setTabIndexAll(imgFilterBtns, '0');
    window.filters.renderingPhotoCountMap['discussed'] = window.filters.renderingPhotoCountMap['default'] = window.main.photos.length;
  };

  var onLoadError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; min-height: 42px; padding-top: 10px; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoadSuccess, onLoadError);

  return {
    photos: photos
  };
})();
