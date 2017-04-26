'use strict';

window.utils = (function () {
  var randomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var randomOfLimitedLength = function (objectLength) {
    return Math.floor(Math.random() * objectLength);
  };

  var randomArrLength = function (array) {
    array.length = Math.round(randomNumber(1, array.length));
    return array;
  };

  var randomArrSequence = function (array) {
    return Math.random() - 0.5;
  };

  var debounce = function (action, debounceInterval) {
    var lastTimeout;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(action, debounceInterval);
  };

  return {
    randomNumber: randomNumber,
    randomOfLimitedLength: randomOfLimitedLength,
    randomArrLength: randomArrLength,
    randomArrSequence: randomArrSequence,
    debounce: debounce
  };
})();
