'use strict';

window.filterMapData = (function () {
  return function (adsData, adsMap, elementClickHandler, callback) {
    var filters = document.querySelector('.tokyo__filters');
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

    var filteredData = adsDataCopy.filter(function (it) {
      if (housingTypeValue === 'any') {
        return true;
      } else {
        return it.offer.type === housingTypeValue;
      }
    }).filter(function (it) {
      if (housingPriceValue === 'middle') {
        return true;
      } else if (housingPriceValue === 'low') {
        return it.offer.price < 10000;
      } else if (housingPriceValue === 'high') {
        return it.offer.price >= 50000;
      } else {
        return true;
      }
    }).filter(function (it, index) {
      if (housingRoomNumberValue === 'any') {
        return true;
      } else {
        return it.offer.rooms === +housingRoomNumberValue;
      }
    }).filter(function (it) {
      if (housingGuestsNumberValue === 'any') {
        return true;
      } else {
        return it.offer.guests === +housingGuestsNumberValue;
      }
    }).filter(function (it) {
      return featuresSelectedArray.every(function (elem) {
        return it.offer.features.indexOf(elem) > -1;
      });
    });

    callback(adsMap, filteredData, elementClickHandler);
//    window.pins.renderPins(pinMap, filteredData, pinClickHandler);
  };
})();
