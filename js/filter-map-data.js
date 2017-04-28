'use strict';

window.filterMapData = (function () {

  var filters = document.querySelector('.tokyo__filters');
  var filtersMap = document.querySelector('.tokyo__pin-map');
  var housingTypeSelector = filters.querySelector('#housing_type');
  var housingPriceSelector = filters.querySelector('#housing_price');
  var housingRoomNumberSelector = filters.querySelector('#housing_room-number');
  var housingGuestsNumberSelector = filters.querySelector('#housing_guests-number');

  var housingTypeValue = null;
  var housingPriceValue = null;
  var housingRoomNumberValue = null;
  var housingGuestsNumberValue = null;
  var featuresSelected = null;
  var featuresSelectedArray = null;

  var filterByType = function (dataElement) {
    return (housingTypeValue === 'any') ? true : dataElement.offer.type === housingTypeValue;
  };

  var filterByPrice = function (dataElement) {
    if (housingPriceValue === 'middle') {
      return ((dataElement.offer.price >= 10000) && (dataElement.offer.price < 50000));
    } else if (housingPriceValue === 'low') {
      return dataElement.offer.price < 10000;
    } else if (housingPriceValue === 'high') {
      return dataElement.offer.price >= 50000;
    } else {
      return true;
    }
  };

  var filterByNumberRoom = function (dataElement) {
    return (housingRoomNumberValue === 'any') ? true : dataElement.offer.rooms === +housingRoomNumberValue;
  };

  var filterByNumberGuests = function (dataElement) {
    return (housingGuestsNumberValue === 'any') ? true : dataElement.offer.guests === +housingGuestsNumberValue;
  };

  var filterByFeatures = function (dataElement) {
    return featuresSelectedArray.every(function (elem) {
      return dataElement.offer.features.indexOf(elem) > -1;
    });
  };

  return function (adsData, elementClickHandler, callback) {
    housingTypeValue = housingTypeSelector.options[housingTypeSelector.selectedIndex].value;
    housingPriceValue = housingPriceSelector.options[housingPriceSelector.selectedIndex].value;
    housingRoomNumberValue = housingRoomNumberSelector.options[housingRoomNumberSelector.selectedIndex].value;
    housingGuestsNumberValue = housingGuestsNumberSelector.options[housingGuestsNumberSelector.selectedIndex].value;
    featuresSelected = filters.querySelectorAll('.feature input[type="checkbox"]:checked');

    featuresSelectedArray = [].map.call(featuresSelected, function (it) {
      return it.value;
    });

    var adsDataCopy = adsData.slice();

    var filteredData = adsDataCopy
      .filter(filterByType)
      .filter(filterByPrice)
      .filter(filterByNumberRoom)
      .filter(filterByNumberGuests)
      .filter(filterByFeatures);

    callback(filtersMap, filteredData, elementClickHandler);
  };
})();
