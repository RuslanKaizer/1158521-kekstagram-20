'use strict';
window.filters = (function () {
  var PLUS_PROBABILITY = 0.5;

  var Filter = {
    DEFAULT: 'default',
    RANDOM: 'random',
    DISCUSSED: 'discussed'
  };

  var renderingPhotoCountMap = {
    'default': 0,
    'random': 10,
    'discussed': 0
  };

  var imgFilterSwitch = document.querySelector('.img-filters');
  var activeBtn = imgFilterSwitch.querySelector('.img-filters__button--active');

  var sort = function (photos, criterion) {
    return photos.slice().sort(criterion);
  };

  var renderingPhotoCount;

  var onFilterChange = window.debounce.debounce(function (target) {
    if (target.classList[0] === 'img-filters__button') {
      var filterType = target.id.substring(7);

      if (target !== activeBtn || filterType === Filter.RANDOM) {
        activeBtn.classList.remove('img-filters__button--active');
        target.classList.add('img-filters__button--active');
        activeBtn = target;
        renderingPhotoCount = renderingPhotoCountMap[filterType];
        switch (filterType) {
          case Filter.DEFAULT:
            window.filters.filteredPhotos = window.main.photos.slice();
            break;
          case Filter.RANDOM:
            window.filters.filteredPhotos = sort(window.main.photos, function () {
              return PLUS_PROBABILITY - Math.random();
            });
            break;
          case Filter.DISCUSSED:
            window.filters.filteredPhotos = sort(window.main.photos, function (left, right) {
              var commentCountDiff = right.comments.length - left.comments.length;
              if (commentCountDiff === 0) {
                return window.main.photos.indexOf(left) - window.main.photos.indexOf(right);
              }
              return commentCountDiff;
            });
            break;
        }
        window.gallery.clearPicturesBlock();
        window.gallery.fillPicturesBlock(window.filters.filteredPhotos, renderingPhotoCount);
      }
    }
  });

  imgFilterSwitch.addEventListener('click', function (evt) {
    onFilterChange(evt.target);
  });

  return {
    filteredPhotos: [],
    renderingPhotoCountMap: renderingPhotoCountMap
  };
})();
