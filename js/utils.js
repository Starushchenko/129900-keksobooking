'use strict';

window.utils = (function () {
  var randomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var randomArrValue = function (array) {
    return Math.floor(Math.random() * array.length);
  };

  var randomArrLength = function (array) {
    array.length = Math.round(randomNumber(1, array.length));
    return array;
  };

  return {
    randomNumber: randomNumber,
    randomArrValue: randomArrValue,
    randomArrLength: randomArrLength
  };
})();
