'use strict';

var mapContainer = document.querySelector('.tokyo');
var pinMap = mapContainer.querySelector('.tokyo__pin-map');
var adsData = [];
var filters = document.querySelector('.tokyo__filters');
var housingType = filters.querySelector('#housing_type').value;
var housingPrice = filters.querySelector('#housing_price').value;
var housingRoomNumber = filters.querySelector('#housing_room-number').value;
var housingGuestsNumber = filters.querySelector('#housing_guests-number').value;
// Чекбоксы удобств (временно не сделал)

filters.addEventListener('change', function (evt) {
  updateData();
});

var updateData = function () {

  var filteredByTypeLodges = adsData.filter(function (it) {
    if (housingType === 'any') {
      return true;
    } else {
      return it.offer.type === housingType;
    }
  });

  var filteredByPriceLodges = adsData.filter(function (it) {
    if (housingPrice === 'middle') {
      return ((it.offer.price >= 10000) && (it.offer.price <= 50000));
    } else if (housingPrice === 'low') {
      return it.offer.price < 10000;
    } else if (housingPrice === 'high') {
      return it.offer.price >= 50000;
    } else {
      return true;
    }
  });

  var filteredByRoomsLodges = adsData.filter(function (it) {
    if (housingRoomNumber === 'any') {
      return true;
    } else {
      return it.offer.rooms === housingRoomNumber;
    }
  });

  var filteredByGuestsLodges = adsData.filter(function (it) {
    if (housingGuestsNumber === 'any') {
      return true;
    } else {
      return it.offer.guests === housingGuestsNumber;
    }
  });

  var filteredData = filteredByTypeLodges.concat(filteredByPriceLodges).concat(filteredByRoomsLodges).concat(filteredByGuestsLodges);

  var uniqueAds =
    filteredData.filter(function (it, i) {
      return filteredData.indexOf(it) === i;
    });

  window.pins.renderPins(pinMap, uniqueAds, pinClickHandler);
};

var loadSuccessHandler = function (data) {
  adsData = data;
  updateData();
};

var loadErrorHandler = function (errorMessage) {
  var node = document.createElement('div');

  node.textContent = errorMessage;
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






// Функция drag для pin__main

var pinHandle = document.querySelector('.pin__main');
var addressField = document.querySelector('#address');
var dragMapConstraints = {
  minX: 0,
  minY: 0,
  maxX: pinHandle.offsetParent.clientWidth - pinHandle.clientWidth,
  maxY: pinHandle.offsetParent.clientHeight - pinHandle.clientHeight
};
var startCoords = null;

pinHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
});

var mouseMoveHandler = function (moveEvt) {
  moveEvt.preventDefault();

  var shift = {
    x: startCoords.x - moveEvt.clientX,
    y: startCoords.y - moveEvt.clientY
  };

  startCoords = {
    x: moveEvt.clientX,
    y: moveEvt.clientY
  };

  var newX = pinHandle.offsetLeft - shift.x;
  var newY = pinHandle.offsetTop - shift.y;
  if ((newX >= dragMapConstraints.minX && newX <= dragMapConstraints.maxX) &&
    (newY >= dragMapConstraints.minY && newY <= dragMapConstraints.maxY)) {
    pinHandle.style.left = newX + 'px';
    pinHandle.style.top = newY + 'px';
  }

  addressField.value = 'x: ' + Math.floor(newX + pinHandle.clientWidth / 2) +
    'px, y: ' + Math.floor(newY + pinHandle.clientHeight) + ' px';
};

var mouseUpHandler = function (upEvt) {
  upEvt.preventDefault();

  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('mouseup', mouseUpHandler);
};
