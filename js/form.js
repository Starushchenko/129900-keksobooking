'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var checkInTimeSelect = document.querySelector('#time');
  var checkOutTimeSelect = document.querySelector('#timeout');
  var lodgeTypeSelect = document.querySelector('#type');
  var lodgePriceInput = document.querySelector('#price');
  var roomNumberSelect = document.querySelector('#room_number');
  var lodgeCapacitySelect = document.querySelector('#capacity');

  var synchronizeCheckTime = function () {
    switch (checkInTimeSelect.value) {
      case 'После 12':
        checkOutTimeSelect.value = 'Выезд до 12';
        break;
      case 'После 13':
        checkOutTimeSelect.value = 'Выезд до 13';
        break;
      case 'После 14':
        checkOutTimeSelect.value = 'Выезд до 14';
        break;
      default:
        checkOutTimeSelect.value = 'Выезд до 12';
        break;
    }
  };

  var synchronizeLodgePrices = function () {
    switch (lodgeTypeSelect.value) {
      case 'Квартира':
        lodgePriceInput.setAttribute('min', '1000');
        break;
      case 'Лачуга':
        lodgePriceInput.setAttribute('min', '0');
        break;
      case 'Дворец':
        lodgePriceInput.setAttribute('min', '1000000');
        lodgePriceInput.removeAttribute('max');
        break;
      default:
        lodgePriceInput.setAttribute('min', '1000');
        break;
    }
  };

  var synchronizeLodgeCapacity = function () {
    switch (roomNumberSelect.value) {
      case '1 комната':
        lodgeCapacitySelect.value = 'не для гостей';
        break;
      case '2 комнаты':
        lodgeCapacitySelect.value = 'для 3 гостей';
        break;
      case '100 комнат':
        lodgeCapacitySelect.value = 'для 3 гостей';
        break;
      default:
        lodgeCapacitySelect.value = 'не для гостей';
        break;
    }
  };

  var removeErrorInputMessage = function (evt) {
    var noticeErrorInputs = document.querySelectorAll('.error');
    for (var k = 0; k < noticeErrorInputs.length; k++) {
      noticeErrorInputs[k].addEventListener('input', function () {
        evt.target.classList.remove('error');
      });
    }
  };

  checkInTimeSelect.addEventListener('change', function () {
    synchronizeCheckTime();
  });

  lodgeTypeSelect.addEventListener('change', function () {
    synchronizeLodgePrices();
  });

  roomNumberSelect.addEventListener('change', function () {
    synchronizeLodgeCapacity();
  });

  noticeForm.addEventListener('invalid', function (evt) {
    evt.target.classList.add('error');
    removeErrorInputMessage(evt);
  }, true);

  noticeForm.addEventListener('submit', function () {
    noticeForm.reset();
  });

})();
