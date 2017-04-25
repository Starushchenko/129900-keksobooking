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
