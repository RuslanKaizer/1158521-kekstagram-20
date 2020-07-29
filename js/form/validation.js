'use strict';
(function () {
  var validateForm = function () {
    var Hashtag = {
      ERROR_SYMBOLS: 'Хештег может состоять из решётки, букв и цифр.',
      ERROR_HASH: 'Хештег не может состоять только из решётки',
      ERROR_LENGTH: 'Один хештег не может содержать более 20 символов.',
      ERROR_COUNTS: 'Можно использовать не более пяти хештегов для одной фотографии.',
      ERROR_UNIQUE: 'Хештеги не могут повторяться.'
    };
    var hashtagRegExp = /^#[a-zA-ZА-Яа-я0-9]*$/;
    var inputHashtags = document.querySelector('.text__hashtags');
    var maxHashtagLength = 20;
    var maxHashtagCounts = 5;
    var textDescription = document.querySelector('.text__description');
    var textDescriptionErrorMessage = 'Текст комментария не должен превышать 140 символов';

    inputHashtags.addEventListener('keyup', function () {
      var hashtags = inputHashtags.value.trim().toLowerCase().split(' ');
      var isHashtagCountsMore = hashtags.length > maxHashtagCounts;
      if (inputHashtags.value) {
        for (var i = 0; i < hashtags.length; i++) {
          var isHashtagValidity = hashtagRegExp.test(hashtags[i]);
          var isHashtagTooLong = hashtags[i].length > maxHashtagLength;
          var firstElement = hashtags[0];
          if (!isHashtagValidity) {
            inputHashtags.setCustomValidity(Hashtag.ERROR_SYMBOLS);
          } else if (hashtags[i] === '#') {
            inputHashtags.setCustomValidity(Hashtag.ERROR_HASH);
          } else if (isHashtagTooLong) {
            inputHashtags.setCustomValidity(Hashtag.ERROR_LENGTH);
          } else if (isHashtagCountsMore) {
            inputHashtags.setCustomValidity(Hashtag.ERROR_COUNTS);
          } else if (firstElement === hashtags[i] && hashtags.length > 1) {
            inputHashtags.setCustomValidity(Hashtag.ERROR_UNIQUE);
          } else {
            inputHashtags.setCustomValidity('');
          }
        }
      }
    });

    if (textDescription.value) {
      if (textDescription.length > 140) {
        textDescription.setCustomValidity(textDescriptionErrorMessage);
      } else {
        textDescription.setCustomValidity('');
      }
    }
  };

  validateForm();
})();
