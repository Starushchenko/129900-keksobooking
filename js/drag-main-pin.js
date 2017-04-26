'use strict';

window.setDraggable = (function () {
  return function (handle, callback) {
    var dragMapConstraints = {
      minX: 0,
      minY: 0,
      maxX: handle.offsetParent.clientWidth - handle.clientWidth,
      maxY: handle.offsetParent.clientHeight - handle.clientHeight
    };
    var startCoords = null;

    handle.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newX = handle.offsetLeft - shift.x;
      var newY = handle.offsetTop - shift.y;
      if ((newX >= dragMapConstraints.minX && newX <= dragMapConstraints.maxX) &&
        (newY >= dragMapConstraints.minY && newY <= dragMapConstraints.maxY)) {
        handle.style.left = newX + 'px';
        handle.style.top = newY + 'px';
      }

      callback(newX, newY);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
  };
})();
