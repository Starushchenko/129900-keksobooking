'use strict';

var pinMap = document.querySelector('.tokyo__pin-map');

window.pins.renderPins(pinMap, window.data.createAdsCollection(), function (pindata, pin) {
  window.pins.setPinActive(pin);
  window.card.renderSideAd(pindata);
  window.card.activateMapElement(pin, function () {
    window.pins.setPinInactive();
  });
});
