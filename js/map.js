'use strict';

var mapContainer = document.querySelector('.tokyo');
var pinMap = mapContainer.querySelector('.tokyo__pin-map');

var pinClickHandler = function (pindata, pin) {
  window.pins.setPinActive(pin);
  window.showCard(pindata, cardCloseHandler);
};

var cardCloseHandler = function () {
  window.pins.setPinInactive();
};

var loadSuccessHandler = function (data) {
  window.pins.renderPins(pinMap, data, pinClickHandler);
};

var loadErrorHandler = function (errorMessage) {
  var node = document.createElement('div');

  node.textContent = errorMessage;
  node.classList.add('load-error');
  mapContainer.insertAdjacentElement('afterbegin', node);
};

window.load('https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data', loadSuccessHandler, loadErrorHandler);

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
