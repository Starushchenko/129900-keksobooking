'use strict';

window.filterMapData = (function () {
  return function (adsData, elementClickHandler, callback) {
    var filters = document.querySelector('.tokyo__filters');
    var filtersMap = document.querySelector('.tokyo__pin-map');
    var housingTypeSelector = filters.querySelector('#housing_type');
    var housingPriceSelector = filters.querySelector('#housing_price');
    var housingRoomNumberSelector = filters.querySelector('#housing_room-number');
    var housingGuestsNumberSelector = filters.querySelector('#housing_guests-number');
    var housingTypeValue = housingTypeSelector.options[housingTypeSelector.selectedIndex].value;
    var housingPriceValue = housingPriceSelector.options[housingPriceSelector.selectedIndex].value;
    var housingRoomNumberValue = housingRoomNumberSelector.options[housingRoomNumberSelector.selectedIndex].value;
    var housingGuestsNumberValue = housingGuestsNumberSelector.options[housingGuestsNumberSelector.selectedIndex].value;
    var featuresSelected = filters.querySelectorAll('.feature input[type="checkbox"]:checked');

    var featuresSelectedArray = [].map.call(featuresSelected, function (it) {
      return it.value;
    });

    var adsDataCopy = adsData.slice();

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

    var filterByRoomNumber = function (dataElement) {
      return (housingRoomNumberValue === 'any') ? true : dataElement.offer.rooms === +housingRoomNumberValue;
    };

    var filterByGuestNumber = function (dataElement) {
      return (housingGuestsNumberValue === 'any') ? true : dataElement.offer.guests === +housingGuestsNumberValue;
    };

    var filterByFeatures = function (dataElement) {
      return featuresSelectedArray.every(function (elem) {
        return dataElement.offer.features.indexOf(elem) > -1;
      });
    };

    var filteredData = adsDataCopy
      .filter(filterByType)
      .filter(filterByPrice)
      .filter(filterByRoomNumber)
      .filter(filterByGuestNumber)
      .filter(filterByFeatures);

    callback(filtersMap, filteredData, elementClickHandler);
  };
})();
