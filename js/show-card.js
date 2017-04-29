'use strict';

window.showCard = (function () {
  var LODGE_TYPES_MAP = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

  var lodgeTemplate = document.querySelector('#lodge-template').content;

  var offerDialog = document.querySelector('#offer-dialog');
  var ownerAvatar = offerDialog.querySelector('.dialog__title img');

  var dialog = document.querySelector('.dialog');
  var dialogClose = dialog.querySelector('.dialog__close');
  dialogClose.setAttribute('tabindex', '0');
  var closeHandler = null;

  var createAdLayout = function (adElement) {
    var lodgeLayout = lodgeTemplate.cloneNode(true);

    lodgeLayout.querySelector('.lodge__title').innerHTML = adElement.offer.title;
    lodgeLayout.querySelector('.lodge__price').innerHTML = adElement.offer.price + ' &#x20bd;/ночь';
    lodgeLayout.querySelector('.lodge__type').innerHTML = LODGE_TYPES_MAP[adElement.offer.type];
    lodgeLayout.querySelector('.lodge__rooms-and-guests').innerHTML = 'Для ' + adElement.offer.guests + ' гостей в ' + adElement.offer.rooms + ' комнатах';
    lodgeLayout.querySelector('.lodge__checkin-time').innerHTML = 'Заезд после ' + adElement.offer.checkin + ', выезд до ' + adElement.offer.checkout;

    for (var i = 0; i < adElement.offer.features.length; i++) {
      lodgeLayout.querySelector('.lodge__features').innerHTML += '<span class="feature__image feature__image--' + adElement.offer.features[i] + '"></span>';
    }

    lodgeLayout.querySelector('.lodge__description').innerHTML = adElement.offer.description;
    return lodgeLayout;
  };

  var renderSideAd = function (objectElement) {
    var template = createAdLayout(objectElement);

    var dialogPanel = offerDialog.querySelector('.dialog__panel');
    offerDialog.replaceChild(template, dialogPanel);

    ownerAvatar.setAttribute('src', objectElement.author.avatar);
  };

  var cardClickHandler = function (evt) {
    hideCard();
  };

  var cardEnterHandler = function (evt) {
    if (evt.keyCode === 13) {
      hideCard();
    }
  };

  var cardEscHandler = function (evt) {
    if (evt.keyCode === 27) {
      hideCard();
    }
  };

  var hideCard = function () {
    dialog.classList.add('hidden');
    if (typeof closeHandler === 'function') {
      closeHandler();
      closeHandler = null;
    }

    document.removeEventListener('keydown', cardEscHandler);

    dialogClose.removeEventListener('click', cardClickHandler);

    dialogClose.removeEventListener('keydown', cardEnterHandler);
  };

  return function (handler, cb) {
    closeHandler = cb;

    dialog.classList.remove('hidden');

    renderSideAd(handler);

    document.addEventListener('keydown', cardEscHandler);

    dialogClose.addEventListener('click', cardClickHandler);

    dialogClose.addEventListener('keydown', cardEnterHandler);
  };
})();
