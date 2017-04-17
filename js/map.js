'use strict';

var pinMap = document.querySelector('.tokyo__pin-map');
window.pins.renderPins(pinMap, window.data.adsCollection);


var renderedPins = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');
dialogClose.setAttribute('tabindex', '0');


var activateMapElement = function (pin) {
  window.pins.deactivatePin();
  pin.classList.add('pin--active');
  /* dialog.classList.remove('hidden'); */

  /* window.card.renderSideAd(window.data.adsCollection[index - 1]); */
  /*document.addEventListener('keydown', pinEscHandler);*/
};

var deactivateMapElement = function () {
  deactivatePin();
  /* dialog.classList.add('hidden'); */
  document.removeEventListener('keydown', pinEscHandler);
};
/* dialogClose.addEventListener('click', function (evt) {
  deactivateMapElement();
});

dialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    deactivateMapElement();
  }
});*/


for (var i = 0; i < renderedPins.length; i++) {
  window.pins.enablePinEvents(renderedPins[i], activateMapElement(renderedPins[i]));
}
