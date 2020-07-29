'use strict';
(function () {
  var MAX_COUNT_COMMENTS = 5;
  var isEscEvent = window.util.keyboard.isEscEvent;
  var renderComments = window.pictures.renderComments;
  var buttonLoader = document.querySelector('.comments-loader');
  var commentsCopy = [];
  var bigPictureBlock = document.querySelector('.big-picture');
  var commentsList = bigPictureBlock.querySelector('.social__comments');
  var count = 0;

  var showBigPicture = function (photo) {
    count = photo.comments.length;
    bigPictureBlock.classList.remove('hidden');
    if (photo.comments.length > MAX_COUNT_COMMENTS) {
      resetCommentsCount(MAX_COUNT_COMMENTS);
    } else {
      resetCommentsCount(photo.comments.length);
    }

    bigPictureBlock.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPictureBlock.querySelector('.social__caption').textContent = photo.description;
    bigPictureBlock.querySelector('.likes-count').textContent = photo.likes;
    document.querySelector('body').classList.add('modal-open');
    bigPictureBlock.querySelector('.comments-count').textContent = photo.comments.length;

    document.addEventListener('keydown', onImageKeydown);

    clearCommentsList();
    renderCommentsList(photo.comments);
  };

  var clearCommentsList = function () {
    while (commentsList.firstChild) {
      commentsList.firstChild.remove();
    }
  };

  var renderCommentsList = function (commentsArray) {
    commentsCopy = commentsArray.slice();
    if (commentsCopy.length > MAX_COUNT_COMMENTS) {
      buttonLoader.classList.remove('hidden');
      bigPictureBlock.querySelector('.social__comments').appendChild(renderComments(commentsCopy.splice(0, MAX_COUNT_COMMENTS)));
    } else {
      buttonLoader.classList.add('hidden');
      bigPictureBlock.querySelector('.social__comments').appendChild(renderComments(commentsCopy));
    }
  };

  var renderCommentsCount = function (comments) {
    bigPictureBlock.querySelector('.social__comment-count').textContent = '';
    var commentsCountContent = comments.length + ' из <span class="comments-count">' + count + '</span> комментариев';

    bigPictureBlock.querySelector('.social__comment-count').insertAdjacentHTML('afterbegin', commentsCountContent);
  };

  var resetCommentsCount = function (counter) {
    bigPictureBlock.querySelector('.social__comment-count').innerHTML = counter + ' из <span class="comments-count">125</span> комментариев';
  };

  var onButtonLoaderClick = function () {
    var comment = bigPictureBlock.querySelector('.social__comment');
    if (comment) {
      renderCommentsList(commentsCopy);
    } else {
      buttonLoader.classList.add('hidden');
    }
    var showedComments = bigPictureBlock.querySelectorAll('.social__comment');
    renderCommentsCount(showedComments);
  };

  var getPictureData = function (pictureId, data) {
    return data.find(function (item) {
      return +item.id === +pictureId;
    });
  };

  var onImagePreviewClick = function (evt) {
    var clickedPicture = evt.target.closest('.picture');

    if (clickedPicture === null) {
      return;
    }

    var pictureData = getPictureData(clickedPicture.id, window.photosData);
    showBigPicture(pictureData);

    buttonLoader.addEventListener('click', onButtonLoaderClick);
    document.addEventListener('keydown', onImageKeydown);
  };

  var onClickCloseImageButton = function () {
    document.querySelector('.big-picture').classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    document.removeEventListener('keydown', onImageKeydown);
    buttonLoader.removeEventListener('click', onButtonLoaderClick);
  };

  var closeImageByEsc = function () {
    onClickCloseImageButton();
  };

  var onImageKeydown = function (evt) {
    isEscEvent(evt, closeImageByEsc);
  };

  var bigImageSettings = function () {
    var closeButton = document.querySelector('#picture-cancel');
    var picturesContainer = document.querySelector('.pictures');

    closeButton.addEventListener('click', onClickCloseImageButton);

    picturesContainer.addEventListener('click', onImagePreviewClick);
  };

  bigImageSettings();
})();
