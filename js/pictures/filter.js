'use strict';
(function () {
  var TIMEOUT_IN_MS = 500;
  var renderPictures = window.pictures.renderPictures;
  var clearPhotosList = window.pictures.clearPhotosList;
  var getRandomNum = window.util.getRandomNum;
  var findUniqueElements = window.util.findUniqueElements;
  var debounce = window.util.debounce;
  var filter = document.querySelector('.img-filters');
  var filterForm = document.querySelector('.img-filters__form');
  var activeClass = 'img-filters__button--active';

  var showFilter = function () {
    filter.classList.remove('img-filters--inactive');
  };

  var disableActiveFilterButton = function () {
    var activeFilterButton = document.querySelector('.img-filters__button--active');
    activeFilterButton.classList.remove(activeClass);
  };

  var defaultFilter = function (data) {
    return data;
  };

  var popularFirstFilter = function (data) {
    var photosArray = data.slice();
    photosArray.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return photosArray;
  };

  var randomFilter = function (data) {
    var photos = data;
    var randomArray = [];
    for (var i = 0; i < photos.length; i++) {
      var element = photos[getRandomNum(0, photos.length)];
      randomArray.push(element);
    }
    var uniqueElements = randomArray.filter(findUniqueElements);
    return uniqueElements.slice(0, 10);
  };

  var filterType = {
    'filter-default': defaultFilter,
    'filter-discussed': popularFirstFilter,
    'filter-random': randomFilter
  };

  var onFilterFormMousedown = function (evt) {
    disableActiveFilterButton();
    var button = document.querySelector('#' + evt.target.id);
    button.classList.add(activeClass);
  };

  var onFilterFormClick = function (evt) {
    var filteredData = filterType[evt.target.id](window.photosData);

    clearPhotosList();
    renderPictures(filteredData);
  };

  setTimeout(showFilter, 1000);
  filterForm.addEventListener('click', debounce(onFilterFormClick, TIMEOUT_IN_MS));
  filterForm.addEventListener('mousedown', onFilterFormMousedown);
})();
