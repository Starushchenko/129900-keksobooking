'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var checkInTimeSelect = noticeForm.querySelector('#time');
  var checkOutTimeSelect = noticeForm.querySelector('#timeout');
  var lodgeTypeSelect = noticeForm.querySelector('#type');
  var lodgePriceInput = noticeForm.querySelector('#price');
  var roomNumberSelect = noticeForm.querySelector('#room_number');
  var lodgeCapacitySelect = noticeForm.querySelector('#capacity');
  var pinHandle = document.querySelector('.pin__main');
  var addressField = document.querySelector('#address');

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.setAttribute('min', value);
  };

  var removeErrorInputMessage = function (evt) {
    var noticeErrorInputs = document.querySelectorAll('.error');
    [].forEach.call(noticeErrorInputs, function (element) {
      element.addEventListener('input', function () {
        evt.target.classList.remove('error');
      });
    });
  };

  checkInTimeSelect.addEventListener('change', function () {
    window.synchronizeFields(checkInTimeSelect, checkOutTimeSelect, ['После 12', 'После 13', 'После 14'], ['Выезд до 12', 'Выезд до 13', 'Выезд до 14'], syncValues);
  });

  checkOutTimeSelect.addEventListener('change', function () {
    window.synchronizeFields(checkOutTimeSelect, checkInTimeSelect, ['Выезд до 12', 'Выезд до 13', 'Выезд до 14'], ['После 12', 'После 13', 'После 14'], syncValues);
  });

  lodgeTypeSelect.addEventListener('change', function () {
    window.synchronizeFields(lodgeTypeSelect, lodgePriceInput, ['Квартира', 'Лачуга', 'Дворец'], ['1000', '0', '1000000'], syncValueWithMin);
  });

  roomNumberSelect.addEventListener('change', function () {
    window.synchronizeFields(roomNumberSelect, lodgeCapacitySelect, ['1 комната', '2 комнаты', '100 комнат'], ['не для гостей', 'для 3 гостей', 'для 3 гостей'], syncValues);
  });

  lodgeCapacitySelect.addEventListener('change', function () {
    window.synchronizeFields(lodgeCapacitySelect, roomNumberSelect, ['не для гостей', 'для 3 гостей', 'для 3 гостей'], ['1 комната', '2 комнаты', '100 комнат'], syncValues);
  });

  noticeForm.addEventListener('invalid', function (evt) {
    evt.target.classList.add('error');
    removeErrorInputMessage(evt);
  }, true);

  noticeForm.addEventListener('submit', function () {
    noticeForm.reset();
  });

  window.setDraggable(pinHandle, pinHandle.offsetParent, function (x, y) {
    addressField.value = 'x: ' + Math.floor(x + pinHandle.clientWidth / 2) +
      ', y: ' + Math.floor(y + pinHandle.clientHeight);
  });
})();
