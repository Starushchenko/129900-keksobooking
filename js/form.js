'use strict';

(function () {
  var CHECKIN_TIMES = ['После 12', 'После 13', 'После 14'];
  var CHECKOUT_TIMES = ['Выезд до 12', 'Выезд до 13', 'Выезд до 14'];
  var LODGE_TYPES = ['Квартира', 'Лачуга', 'Дворец'];
  var LODGE_PRICE_STEPS = ['1000', '0', '1000000'];
  var LODGE_NUMBER_ROOMS = ['1 комната', '2 комнаты', '100 комнат'];
  var LODGE_CAPACITIES = ['не для гостей', 'для 3 гостей', 'для 3 гостей'];

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

  var errorFieldInputHandler = function (evt) {
    evt.currentTarget.classList.remove('error');
    evt.currentTarget.removeEventListener('input', errorFieldInputHandler);
  };

  var removeErrorInputMessage = function () {
    var noticeErrorInputs = document.querySelectorAll('.error');
    [].forEach.call(noticeErrorInputs, function (element) {
      element.addEventListener('input', errorFieldInputHandler);
    });
  };

  checkInTimeSelect.addEventListener('change', function () {
    window.synchronizeFields(checkInTimeSelect, checkOutTimeSelect, CHECKIN_TIMES, CHECKOUT_TIMES, syncValues);
  });

  checkOutTimeSelect.addEventListener('change', function () {
    window.synchronizeFields(checkOutTimeSelect, checkInTimeSelect, CHECKOUT_TIMES, CHECKIN_TIMES, syncValues);
  });

  lodgeTypeSelect.addEventListener('change', function () {
    window.synchronizeFields(lodgeTypeSelect, lodgePriceInput, LODGE_TYPES, LODGE_PRICE_STEPS, syncValueWithMin);
  });

  roomNumberSelect.addEventListener('change', function () {
    window.synchronizeFields(roomNumberSelect, lodgeCapacitySelect, LODGE_NUMBER_ROOMS, LODGE_CAPACITIES, syncValues);
  });

  lodgeCapacitySelect.addEventListener('change', function () {
    window.synchronizeFields(lodgeCapacitySelect, roomNumberSelect, LODGE_CAPACITIES, LODGE_NUMBER_ROOMS, syncValues);
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
