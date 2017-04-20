'use strict';

window.getAdsCollection = (function () {

  var ADS_COLLECTION_SIZE = 8;
  var adsCollection = [];
  var comfortLevels = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var lodgeTypes = ['flat', 'house', 'bungalo'];
  var checkTimes = ['12:00', '13:00', '14:00'];

  var getAdsCollection = function () {
    for (var i = 0; i < ADS_COLLECTION_SIZE; i++) {
      var lodgeFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
      var randomFeatureLength = window.utils.randomArrLength(lodgeFeatures);
      var pinPositionX = window.utils.randomNumber(300, 900);
      var pinPositionY = window.utils.randomNumber(100, 500);

      adsCollection[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },

        'offer': {
          'title': comfortLevels[i],
          'address': pinPositionX + ', ' + pinPositionY,
          'price': window.utils.randomNumber(1000, 1000000),
          'type': lodgeTypes[window.utils.randomArrValue(lodgeTypes)],
          'rooms': window.utils.randomNumber(1, 5),
          'guests': window.utils.randomNumber(1, 15),
          'checkin': checkTimes[window.utils.randomArrValue(checkTimes)],
          'checkout': checkTimes[window.utils.randomArrValue(checkTimes)],
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
    return adsCollection;
  };

  return getAdsCollection;
})();
