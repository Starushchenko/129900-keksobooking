'use strict';

(function () {
  var filters = document.querySelector('.tokyo__filters');
  var mapContainer = document.querySelector('.tokyo');
  var pinMap = mapContainer.querySelector('.tokyo__pin-map');

  var adsData = [];

  filters.addEventListener('change', function (evt) {
    window.utils.debounce(function () {
      window.filterMapData(adsData, pinClickHandler, window.pins.renderPins);
    }, 500);
  });

  var cardCloseHandler = function () {
    window.pins.setPinInactive();
  };

  var pinClickHandler = function (pindata, pin) {
    window.pins.setPinActive(pin);
    window.showCard(pindata, cardCloseHandler);
  };

  var loadErrorHandler = function (errorMessage) {
    var node = document.createElement('div');

    node.innerHTML = errorMessage + '<p><a href="' + document.location.href + '">Перезагрузите страницу<a></p>';
    node.classList.add('load-error');
    mapContainer.insertAdjacentElement('afterbegin', node);
  };

  var loadSuccessHandler = function (data) {
    adsData = data;
    var randomSortedData = adsData.sort(window.utils.randomArrSequence);
    var randomDataElements = randomSortedData.slice(0, 3);

    window.pins.renderPins(pinMap, randomDataElements, pinClickHandler);
  };

  window.load('https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data', loadSuccessHandler, loadErrorHandler);
})();
