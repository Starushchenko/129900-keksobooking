'use strict';

window.utils = (function () {
  return {
    randomArrSequence: function (array) {
      return Math.random() - 0.5;
    },

    debounce: function (action, debounceInterval) {
      var lastTimeout;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(action, debounceInterval);

      /* var ACTIVE = 1;

      var currentDelay = null;

      return function () {
        if (currentDelay) {
          return;
        }

        action();

        currentDelay = ACTIVE;

        setTimeout(function () {
          currentDelay = null;
        }, debounceInterval);

      };*/
    }
  };
})();
