'use strict';

window.synchronizeFields = (function () {
  var synchronizeFields = function (firstField, secondField, firstFieldOptions, secondFieldOptions, callback) {
    var firstFieldValue = firstField.value;
    var indexOfVal = firstFieldOptions.indexOf(firstFieldValue);
    callback(secondField, secondFieldOptions[indexOfVal]);
  };

  return synchronizeFields;
})();
