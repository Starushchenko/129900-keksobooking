'use strict';

var renderSideAd = function (objectElement) {
  var template = window.data.adLayout(objectElement);

  var offerDialog = document.querySelector('#offer-dialog');
  var dialogPanel = offerDialog.querySelector('.dialog__panel');
  offerDialog.replaceChild(template, dialogPanel);

  var ownerAvatar = offerDialog.querySelector('.dialog__title img');
  ownerAvatar.setAttribute('src', objectElement.author.avatar);
};
//
var pinMap = document.querySelector('.tokyo__pin-map');

pinMap.appendChild(window.data.lodgePins);

var pins = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');
dialogClose.setAttribute('tabindex', '0');

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

var activateMapElement = function (index) {
  deactivatePin();
  pins[index].classList.add('pin--active');
  dialog.classList.remove('hidden');

  renderSideAd(window.data.adsCollection[index - 1]);
  document.addEventListener('keydown', pinEscHandler);
};

var deactivateMapElement = function () {
  deactivatePin();
  dialog.classList.add('hidden');
  document.removeEventListener('keydown', pinEscHandler);
};

activateMapElement(1);

var enablePinEvents = function (index) {
  pins[index].addEventListener('click', function (evt) {
    activateMapElement(index);
  });

  pins[index].addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      activateMapElement(index);
    }
  });
};

for (var i = 0; i < pins.length; i++) {
  enablePinEvents(i);
}

dialogClose.addEventListener('click', function (evt) {
  deactivateMapElement();
});

dialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    deactivateMapElement();
  }
});
