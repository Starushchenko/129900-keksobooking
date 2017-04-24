'use strict';

var mapContainer = document.querySelector('.tokyo');
var pinMap = mapContainer.querySelector('.tokyo__pin-map');
var adsData = [];
var filters = document.querySelector('.tokyo__filters');
var housingTypeSelector = filters.querySelector('#housing_type');
var housingPriceSelector = filters.querySelector('#housing_price');
var housingRoomNumberSelector = filters.querySelector('#housing_room-number');
var housingGuestsNumberSelector = filters.querySelector('#housing_guests-number');
// Чекбоксы удобств (временно не сделал)
filters.addEventListener('change', function (evt) {
  updateData();
});

var updateData = function () {
  var housingTypeValue = housingTypeSelector.options[housingTypeSelector.selectedIndex].value;
  var housingPriceValue = housingPriceSelector.options[housingPriceSelector.selectedIndex].value;
  var housingRoomNumberValue = housingRoomNumberSelector.options[housingRoomNumberSelector.selectedIndex].value;
  var housingGuestsNumberValue = housingGuestsNumberSelector.options[housingGuestsNumberSelector.selectedIndex].value;
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
  });

//  var filteredData = filteredByTypeLodges.concat(filteredByPriceLodges).concat(filteredByRoomsLodges).concat(filteredByGuestsLodges);

/*  var uniqueAds =
    filteredData.filter(function (it, i) {
      return filteredData.indexOf(it) === i;
    });*/

  window.pins.renderPins(pinMap, filteredData, pinClickHandler);
};

var loadSuccessHandler = function (data) {
  adsData = data;
  updateData();
};

var loadErrorHandler = function (errorMessage) {
  var node = document.createElement('div');

  node.innerHTML = errorMessage + '<p><a href="' + document.location.href + '">Перезагрузите страницу<a></p>';
  node.classList.add('load-error');
  mapContainer.insertAdjacentElement('afterbegin', node);
};

var pinClickHandler = function (pindata, pin) {
  window.pins.setPinActive(pin);
  window.showCard(pindata, cardCloseHandler);
};

var cardCloseHandler = function () {
  window.pins.setPinInactive();
};

window.load('https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data', loadSuccessHandler, loadErrorHandler);
