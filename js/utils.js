'use strict';

window.utils = (function () {
  var randomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var randomArrIndex = function (array) {
    return Math.floor(Math.random() * array.length);
  };

  var randomArrLength = function (array) {
    array.length = Math.round(randomNumber(1, array.length));
    return array;
  };

  var randomArrSequence = function (array) {
    return Math.random() - 0.5;
  };

  var disableDebounce = function (action) {
    var DEBOUNCE_INTERVAL = 500;
    var lastTimeout;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(action, DEBOUNCE_INTERVAL);
  };

  return {
    randomNumber: randomNumber,
    randomArrIndex: randomArrIndex,
    randomArrLength: randomArrLength,
    randomArrSequence: randomArrSequence,
    disableDebounce: disableDebounce
  };
})();
