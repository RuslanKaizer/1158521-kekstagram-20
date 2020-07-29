'use strict';
window.picture = (function () {
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var createPicture = function (photo) {
    var picture = pictureTemplate.cloneNode(true);

    picture.querySelector('.picture__img').setAttribute('src', photo.url);
    picture.querySelector('.picture__likes').textContent = photo.likes.toString();
    picture.querySelector('.picture__comments').textContent = photo.comments.length.toString();

    return picture;
  };

  return {
    createPicture: createPicture
  };
})();
