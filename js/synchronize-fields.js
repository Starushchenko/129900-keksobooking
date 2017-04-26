'use strict';

window.synchronizeFields = (function () {
  return function (firstField, secondField, firstFieldOptions, secondFieldOptions, callback) {
    var firstFieldValue = firstField.value;
    var indexOfValue = firstFieldOptions.indexOf(firstFieldValue);
    callback(secondField, secondFieldOptions[indexOfValue]);
  };
})();
