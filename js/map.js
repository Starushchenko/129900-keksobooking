'use strict';

var pinMap = document.querySelector('.tokyo__pin-map');

var pinClickHandler = function (pindata, pin) {
  window.pins.setPinActive(pin);
  window.showCard(pindata, cardCloseHandler);
};

var cardCloseHandler = function () {
  window.pins.setPinInactive();
};

window.pins.renderPins(pinMap, window.getAdsCollection(), pinClickHandler);

var pinHandle = document.querySelector('.pin__main');
var addressField = document.querySelector('#address');
var defaultCoords = null;

pinHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  defaultCoords = startCoords;

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
});

var mouseMoveHandler = function (moveEvt) {
  moveEvt.preventDefault();

  var shift = {
    x: defaultCoords.x - moveEvt.clientX,
    y: defaultCoords.y - moveEvt.clientY
  };

  defaultCoords = {
    x: moveEvt.clientX,
    y: moveEvt.clientY
  };

  var dragConstraints = {
    minX: 0,
    minY: 0,
    maxX: pinHandle.offsetParent.clientWidth - pinHandle.clientWidth,
    maxY: pinHandle.offsetParent.clientHeight - pinHandle.clientHeight
  };

  var newX = pinHandle.offsetLeft - shift.x;
  var newY = pinHandle.offsetTop - shift.y;
  if ((newX >= dragConstraints.minX && newX <= dragConstraints.maxX) && (newY >= dragConstraints.minY && newY <= dragConstraints.maxY)) {
    pinHandle.style.left = newX + 'px';
    pinHandle.style.top = newY + 'px';
  }

  addressField.value = 'x: ' + Math.floor(newX + pinHandle.clientWidth / 2) + 'px, y: ' + Math.floor(newY + pinHandle.clientHeight) + ' px';
};

var mouseUpHandler = function (upEvt) {
  upEvt.preventDefault();

  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('mouseup', mouseUpHandler);
};
