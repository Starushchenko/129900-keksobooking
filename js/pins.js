'use strict';

window.pins = (function () {
  var createLodgePins = function (adsList) {
    var lodgePins = document.createDocumentFragment();
    for (var i = 0; i < adsList.length; i++) {
      var lodgePin = document.createElement('div');
      lodgePin.className = 'pin';
      lodgePin.style.left = adsList[i].location.x + 'px';
      lodgePin.style.top = adsList[i].location.y + 'px';
      lodgePin.setAttribute('tabindex', '0');
      lodgePin.innerHTML = '<img src="' + adsList[i].author.avatar + '" class="rounded" width="40" height="40">';

      lodgePins.appendChild(lodgePin);
    }
    return lodgePins;
  };

  var renderPins = function (renderPlace, adsList) {
    renderPlace.appendChild(createLodgePins(adsList));
  };

  var deactivatePin = function () {
    var activePin = document.querySelector('.pin--active');
    if (activePin) {
      activePin.classList.remove('pin--active');
    }
  };

  var pinEscHandler = function (evt) {
    if (evt.keyCode === 27) {
      deactivateMapElement();
    }
  };


  /* activateMapElement(1); */

  var enablePinEvents = function (pin, action) {
    pin.addEventListener('click', function (evt) {
      /* activateMapElement(pins, index);*/
      action();
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        /* activateMapElement(pins, index);*/
        action();
      }
    });
  };


  return {
    renderPins: renderPins,
    enablePinEvents: enablePinEvents,
    deactivatePin: deactivatePin
  };

})();
