'use strict';
window.preview = (function () {
  var SHOW_COMMENT_INC = 5;

  var showCommentCount;

  var incShowCommentCount = function () {
    var commentsLength = window.filters.filteredPhotos[photoIndex].comments.length;

    showCommentCount += Math.min(SHOW_COMMENT_INC, commentsLength);

    var increased = showCommentCount <= commentsLength;

    if (showCommentCount > commentsLength) {
      showCommentCount = commentsLength;
      increased = true;
    }

    return increased;
  };

  var commentTemplate = document.querySelector('#comment')
    .content
    .querySelector('.social__comment');

  var createCommentElement = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);

    var avatar = commentElement.querySelector('.social__picture');
    avatar.setAttribute('src', comment.avatar);
    avatar.setAttribute('alt', comment.name);
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  var comments = document.querySelector('.social__comments');

  var fillCommentsBlock = function (photoIndex) {
    var fragment = document.createDocumentFragment();
    var lowerLim = (showCommentCount % SHOW_COMMENT_INC !== 0) ?
      showCommentCount - showCommentCount % SHOW_COMMENT_INC :
      showCommentCount - SHOW_COMMENT_INC;

    for (var i = lowerLim; i < showCommentCount; i++) {
      fragment.appendChild(createCommentElement(window.filters.filteredPhotos[photoIndex].comments[i]));
    }
    comments.appendChild(fragment);
  };

  var preview = document.querySelector('.big-picture');
  var commentCount = preview.querySelector('.social__comment-count');
  var photoIndex;

  var fillPreview = function (pictures, target, outerPhotoIndex) {
    var previewImg = preview.querySelector('.big-picture__img img');

    previewImg.setAttribute('src', target.querySelector('.picture__img').getAttribute('src'));
    preview.querySelector('.likes-count').textContent = target.querySelector('.picture__likes').textContent;
    preview.querySelector('.comments-count').textContent = target.querySelector('.picture__comments').textContent;

    photoIndex = outerPhotoIndex;

    preview.querySelector('.social__caption').textContent = window.filters.filteredPhotos[photoIndex].description.toString();
    comments.innerHTML = '';
    showCommentCount = 0;
    incShowCommentCount();
    commentCount.childNodes[0].textContent = showCommentCount.toString() + ' из ';
    fillCommentsBlock(photoIndex);
  };

  var onEscPress = function (evt) {
    window.util.isEscEvent(evt, window.util.closePopup.bind(null, preview, onEscPress));
  };

  var onCommentsLoaderClick = function (commentsLoaderBtn) {
    if (incShowCommentCount()) {
      commentCount.childNodes[0].textContent = showCommentCount.toString() + ' из ';
      fillCommentsBlock(photoIndex);
      if (showCommentCount === window.filters.filteredPhotos[photoIndex].comments.length) {
        commentsLoaderBtn.classList.add('hidden');
      }
    }
  };

  return {
    fillPreview: fillPreview,
    onEscPress: onEscPress,
    onCommentsLoaderClick: onCommentsLoaderClick
  };
})();
