'use strict';

var adsCollection = [];
var comfortLevels = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var lodgeTypes = ['flat', 'house', 'bungalo'];
var checkTimes = ['12:00', '13:00', '14:00'];
var lodgeFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var randomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var randomArrValue = function (array) {
  return Math.floor(Math.random() * array.length);
};

var randomArrLength = function (array) {
  array.length = Math.round(randomNumber(1, array.length));
  return array.length;
};

for (var i = 0; i < 8; i++) {

  lodgeFeatures.length = randomArrLength(lodgeFeatures);

  adsCollection[i] = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },

    'offer': {
      'title': comfortLevels[i],
      'address': ''/* this.location.x + ',' + this.location.y */,
      'price': randomNumber(1000, 1000000),
      'type': lodgeTypes[randomArrValue(lodgeTypes)],
      'rooms': randomNumber(1, 5),
      'guests': randomNumber(1, 15),
      'checkin': checkTimes[randomArrValue(checkTimes)],
      'checkout': checkTimes[randomArrValue(checkTimes)],
      'features': lodgeFeatures,
      'description': '',
      'photos': []
    },

    'location': {
      'x': randomNumber(300, 900),
      'y': randomNumber(100, 500)
    }
  };
}

var pinMap = document.querySelector('.tokyo__pin-map');
var lodgePins = document.createDocumentFragment();

for (i = 0; i < adsCollection.length; i++) {
  var lodgePin = document.createElement('div');
  lodgePin.className = 'pin';
  lodgePin.style = 'left:' + adsCollection[i].location.x + 'px; top:' + adsCollection[i].location.y + 'px';
  lodgePin.innerHTML = '<img src="' + adsCollection[i].author.avatar + '">';

  lodgePins.appendChild(lodgePin);
}

pinMap.appendChild(lodgePins);

var lodgeTemplate = document.querySelector('#lodge-template').content;

lodgeTemplate.querySelector('.lodge__title').innerHTML = adsCollection[0].offer.title;
lodgeTemplate.querySelector('.lodge__price').innerHTML = adsCollection[0].offer.price + ' &#x20bd;/ночь';

var lodgeType = function () {
  if (adsCollection[0].offer.type === 'flat') {
    return 'Квартира';
  } else if (adsCollection[0].offer.type === 'bungalo') {
    return 'Бунгало';
  } else if (adsCollection[0].offer.type === 'house') {
    return 'Дом';
  } else {
    return 'Жилище';
  }
};
lodgeTemplate.querySelector('.lodge__type').innerHTML = lodgeType();
lodgeTemplate.querySelector('.lodge__rooms-and-guests').innerHTML = 'Для ' + adsCollection[0].offer.guests + ' гостей в ' + adsCollection[0].offer.rooms + ' комнатах';
lodgeTemplate.querySelector('.lodge__checkin-time').innerHTML = 'Заезд после ' + adsCollection[0].offer.checkin + ', выезд до ' + adsCollection[0].offer.checkout;

for (i = 0; i < adsCollection[0].offer.features.length; i++) {
  var featureItem = document.createElement('span');
  featureItem.className = 'feature__image feature__image--' + adsCollection[0].offer.features[i];
  lodgeTemplate.querySelector('.lodge__features').appendChild(featureItem);
}
lodgeTemplate.querySelector('.lodge__description').innerHTML = adsCollection[0].offer.description;

var offerDialog = document.querySelector('#offer-dialog');
offerDialog.appendChild(lodgeTemplate);
