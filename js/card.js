'use strict';

window.card = (function () {
  var checkLodgeType = function (ad) {
    switch (ad.offer.type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      default:
        return 'Жильё';
    }
  };

  var createAdLayout = function (adElement) {
    var lodgeTemplate = document.querySelector('#lodge-template').content;
    var lodgeLayout = lodgeTemplate.cloneNode(true);
    lodgeLayout.querySelector('.lodge__title').innerHTML = adElement.offer.title;
    lodgeLayout.querySelector('.lodge__price').innerHTML = adElement.offer.price + ' &#x20bd;/ночь';

    lodgeLayout.querySelector('.lodge__type').innerHTML = checkLodgeType(adElement);
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

    var offerDialog = document.querySelector('#offer-dialog');
    var dialogPanel = offerDialog.querySelector('.dialog__panel');
    offerDialog.replaceChild(template, dialogPanel);

    var ownerAvatar = offerDialog.querySelector('.dialog__title img');
    ownerAvatar.setAttribute('src', objectElement.author.avatar);
  };

  return {
    renderSideAd: renderSideAd/* ,
    adLayout: createAdLayout*/
  };
})();
