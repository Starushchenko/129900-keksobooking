'use strict';

var pinMap = document.querySelector('.tokyo__pin-map');

window.pins.renderPins(pinMap, window.data.createAdsCollection(), function (pindata, pin) {
  window.pins.setPinActive(pin);
  window.card.renderSideAd(pindata);
  window.card.activateMapElement(pin, function () {
    window.pins.setPinInactive();
  });
});

var pinHandle = document.querySelector('.pin__main');
var addressField = document.querySelector('#address');

pinHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

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

    pinHandle.style.top = (pinHandle.offsetTop - shift.y) + 'px';
    pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + 'px';
    addressField.value = 'x: ' + ((pinHandle.offsetTop - shift.y) - pinHandle.clientHeight) + 'px, y: ' + Math.floor((pinHandle.offsetLeft - shift.x) - pinHandle.clientWidth / 2) + ' px';
  };
  var mouseUpHandler = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
});
