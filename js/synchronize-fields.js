'use strict';

window.synchronizeFields = (function () {
  var synchronizeFields = function (firstField, secondField, firstFieldOptions, secondFieldOptions, callback) {
    var firstFieldValue = firstField.value;
    var indexOfValue = firstFieldOptions.indexOf(firstFieldValue);
    callback(secondField, secondFieldOptions[indexOfValue]);
  };

  return synchronizeFields;
})();
