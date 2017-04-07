'use strict';

var ADS_COLLECTION_SIZE = 8;
var adsCollection = [];
var comfortLevels = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var lodgeTypes = ['flat', 'house', 'bungalo'];
var checkTimes = ['12:00', '13:00', '14:00'];
var pinMap = document.querySelector('.tokyo__pin-map');
var lodgeTemplate = document.querySelector('#lodge-template').content;

var randomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var randomArrValue = function (array) {
  return Math.floor(Math.random() * array.length);
};

var randomArrLength = function (array) {
  array.length = Math.round(randomNumber(1, array.length));
  return array;
};

var createAdsCollection = function () {
  for (var i = 0; i < ADS_COLLECTION_SIZE; i++) {
    var lodgeFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var randomFeatureLength = randomArrLength(lodgeFeatures);
    var pinPositionX = randomNumber(300, 900);
    var pinPositionY = randomNumber(100, 500);

    adsCollection[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': comfortLevels[i],
        'address': pinPositionX + ', ' + pinPositionY,
        'price': randomNumber(1000, 1000000),
        'type': lodgeTypes[randomArrValue(lodgeTypes)],
        'rooms': randomNumber(1, 5),
        'guests': randomNumber(1, 15),
        'checkin': checkTimes[randomArrValue(checkTimes)],
        'checkout': checkTimes[randomArrValue(checkTimes)],
        'features': randomFeatureLength,
        'description': '',
        'photos': []
      },

      'location': {
        'x': pinPositionX,
        'y': pinPositionY
      }
    };
  }
};

var createLodgePins = function () {
  var lodgePins = document.createDocumentFragment();
  for (var i = 0; i < adsCollection.length; i++) {
    var lodgePin = document.createElement('div');
    lodgePin.className = 'pin';
    lodgePin.style.left = adsCollection[i].location.x + 'px';
    lodgePin.style.top = adsCollection[i].location.y + 'px';
    lodgePin.innerHTML = '<img src="' + adsCollection[i].author.avatar + '" class="rounded" width="40" height="40">';

    lodgePins.appendChild(lodgePin);
  }
  return lodgePins;
};

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

createAdsCollection();
pinMap.appendChild(createLodgePins());
renderSideAd(adsCollection[0]);

