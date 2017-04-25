'use strict';

window.pins = (function () {

  var pinEventHandler = null;

  var createLodgePin = function (pinData) {
    var lodgePin = document.createElement('div');
    lodgePin.className = 'pin';
    lodgePin.style.left = pinData.location.x + 'px';
    lodgePin.style.top = pinData.location.y + 'px';
    lodgePin.setAttribute('tabindex', '0');
    lodgePin.innerHTML = '<img src="' + pinData.author.avatar + '" class="rounded" width="40" height="40">';
    lodgePin.addEventListener('click', function (evt) {
      pinEventHandler(pinData, lodgePin);
    });
    lodgePin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        pinEventHandler(pinData, lodgePin);
      }
    });
    return lodgePin;
  };

  var renderPins = function (renderPlace, adsList, callback) {
    pinEventHandler = callback;
    var existingPins = document.querySelectorAll('.pin:not(.pin__main)');
    var lodgePins = document.createDocumentFragment();
    for (var i = 0; i < adsList.length; i++) {
      lodgePins.appendChild(createLodgePin(adsList[i]));
    }
    if (existingPins) {
      for (var n = 0; n < existingPins.length; n++) {
        renderPlace.removeChild(existingPins[n]);
      }
    }
    renderPlace.appendChild(lodgePins);
  };

  var setPinInactive = function () {
    var activePin = document.querySelector('.pin--active');
    if (activePin) {
      activePin.classList.remove('pin--active');
    }
  };

  var setPinActive = function (pin) {
    setPinInactive();
    pin.classList.add('pin--active');
  };

  return {
    renderPins: renderPins,
    setPinActive: setPinActive,
    setPinInactive: setPinInactive
  };
})();
