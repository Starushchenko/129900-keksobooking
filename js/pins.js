'use strict';

window.pins = (function () {

  var pinClickHandler = null;

  /*
   * Создание одного пина из элемента массива с данными. Внутри описания элемента задаем обработчик события на клик. В момент объявления он равен null(pinData)
   * Затем - функция отрисовки пинов по циклу элементов массива.
   * Callback перезаписывает pinClickHandler, который опеределен в createLodgePin как функция, исполняемая по клику на пин
   * При вызове renderPins в map.js используя pinData параметром функции callback, pinData будет равна параметру передаваемому в createLodgePin. Цикл вызовов createLodgePin() происходит с элементами массива adsList[i]. Следовательно, pinClickHandler использует параметром текущий adsList[i].
   */

  var createLodgePin = function (pinData) {
    var lodgePin = document.createElement('div');
    lodgePin.className = 'pin';
    lodgePin.style.left = pinData.location.x + 'px';
    lodgePin.style.top = pinData.location.y + 'px';
    lodgePin.setAttribute('tabindex', '0');
    lodgePin.innerHTML = '<img src="' + pinData.author.avatar + '" class="rounded" width="40" height="40">';
    lodgePin.addEventListener('click', function (evt) {
      pinClickHandler(pinData, lodgePin);
    });
    return lodgePin;
  };

  var renderPins = function (renderPlace, adsList, callback) {
    pinClickHandler = callback;
    var lodgePins = document.createDocumentFragment();
    for (var i = 0; i < adsList.length; i++) {
      lodgePins.appendChild(createLodgePin(adsList[i]));
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
