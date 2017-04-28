'use strict';

window.utils = (function () {
  return {
    randomArrSequence: function (array) {
      return Math.random() - 0.5;
    },

    debounce: function () {
      var DEFAULT_DEBOUNCE_INTERVAL = 300; // ms
      var lastTimeout = null;

      return function (action, debounceInterval) {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        var timeout = debounceInterval || DEFAULT_DEBOUNCE_INTERVAL;
        lastTimeout = window.setTimeout(action, timeout);
      };
    }()
  };
})();
