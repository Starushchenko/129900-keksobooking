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
