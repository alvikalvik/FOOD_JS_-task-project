/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener('DOMContentLoaded', () => {
  //Tabs
  const tabsParent = document.querySelector('.tabheader__items');
  const tabs = tabsParent.querySelectorAll('.tabheader__item');
  const tabContents = document.querySelectorAll('.tabcontent');

  function hideTabs() {
    for (const item of tabs) {
      item.classList.remove('tabheader__item_active');
    }

    for (const item of tabContents) {
      item.classList.remove('show', 'fade');
      item.classList.add('hide');
    }
  }

  function showTab(i = 0) {
    tabs[i].classList.add('tabheader__item_active');
    tabContents[i].classList.add('show', 'fade');
    tabContents[i].classList.remove('hide');
  }

  hideTabs();
  showTab();
  tabsParent.addEventListener('click', evt => {
    const target = evt.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target === item) {
          hideTabs();
          showTab(i);
        }
      });
    }
  }); //Timer

  const deadline = '2021-02-17T12:13';

  function calculateTime(endtime) {
    const t = new Date(endtime) - new Date();
    const seconds = Math.floor(t / 1000 % 60);
    const minutes = Math.floor(t / 1000 / 60 % 60);
    const hours = Math.floor(t / 1000 / 60 / 60 % 24);
    const days = Math.floor(t / 1000 / 60 / 60 / 24);
    return {
      total: t,
      seconds,
      minutes,
      hours,
      days
    };
  }

  function fixZero(num) {
    if (num < 10 && num >= 0) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function runTimer(timerSelector, endtime) {
    function updateTimer(timerSelector, endtime) {
      const timer = document.querySelector(timerSelector);
      const days = timer.querySelector(`${timerSelector}__days`);
      const hours = timer.querySelector(`${timerSelector}__hours`);
      const minutes = timer.querySelector(`${timerSelector}__minutes`);
      const seconds = timer.querySelector(`${timerSelector}__seconds`);
      const currentTime = calculateTime(endtime);

      if (currentTime.total >= 0) {
        days.textContent = fixZero(currentTime.days);
        hours.textContent = fixZero(currentTime.hours);
        minutes.textContent = fixZero(currentTime.minutes);
        seconds.textContent = fixZero(currentTime.seconds);
      } else {
        days.textContent = '00';
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      }
    }

    updateTimer(timerSelector, endtime);
    const intervalId = setInterval(function ticktock() {
      updateTimer(timerSelector, endtime);

      if (calculateTime(endtime).total <= 0) {
        clearInterval(intervalId); // console.log('Interval cleared');
      }
    }, 1000);
  }

  runTimer('.timer', deadline); //Modal    

  function runModal(modalSelector, dataModal, dataModalClose) {
    const modal = document.querySelector(modalSelector);
    const modalTriggers = document.querySelectorAll(`[${dataModal}]`);
    let isModalViewed = false;

    function showModal() {
      modal.classList.add('show', 'fade');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', function escapeModal(evt) {
        if (evt.code === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', escapeModal);
        }
      });
      isModalViewed = true;
    }

    function closeModal() {
      modal.classList.remove('show', 'fade');
      modal.classList.add('hide');
      document.body.style.overflow = '';
    }

    for (const trigger of modalTriggers) {
      trigger.addEventListener('click', showModal);
    }

    modal.addEventListener('click', evt => {
      if (evt.target && (evt.target === modal || evt.target.matches(`[${dataModalClose}]`))) {
        closeModal();
      }
    }); //AutoShow modal after 50 sec

    setTimeout(() => {
      if (!isModalViewed) {
        showModal();
      }
    }, 50000);
    window.addEventListener('scroll', function endScrollModal() {
      const scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
      const scrollButtom = window.pageYOffset + document.documentElement.clientHeight;

      if (scrollButtom >= scrollHeight - 20) {
        if (!isModalViewed) {
          showModal();
        }

        window.removeEventListener('scroll', endScrollModal);
      }
    });
  }

  runModal('.modal', 'data-modal', 'data-modal-close'); //Menu cards with classes

  class MenuCard {
    constructor(parentSelector, src, alt, title, descr, price, ...classNames) {
      this.parentSelector = parentSelector;
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.defaultClassName = 'menu__item';
      this.classNames = classNames;
      this.exchangeRate = 28;
      this.priceUAH = 0;
      this.changeToUAH();
    }

    changeToUAH() {
      this.priceUAH = this.price * this.exchangeRate;
    }

    render() {
      const parent = document.querySelector(this.parentSelector);
      const elemnt = document.createElement('div');

      if (this.classNames.length > 0) {
        elemnt.classList.add(...this.classNames);
      } else {
        elemnt.classList.add(this.defaultClassName);
      }

      elemnt.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.priceUAH}</span> грн/день</div>
                </div>
            `;
      parent.append(elemnt);
    }

  }

  new MenuCard(`.menu .container`, `img/tabs/vegy.jpg`, `vegy`, `Меню "Фитнес"`, `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`, 9, `menu__item`).render();
  new MenuCard(`.menu .container`, `img/tabs/elite.jpg`, `elite`, `Меню “Премиум”`, `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`, 19, `menu__item`).render();
  new MenuCard(`.menu .container`, `img/tabs/post.jpg`, `post`, `Меню "Постное"`, `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`, 14, `menu__item`).render(); //Form

  const forms = document.querySelectorAll('form');
  const formMessages = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо. Скоро мы с Вами свяжемся.',
    error: 'Ошибка отправки запроса.'
  };

  for (const form of forms) {
    sendForm(form);
  }

  function sendForm(form) {
    form.addEventListener('submit', evt => {
      evt.preventDefault();
      const formData = new FormData(form);
      const xhr = new XMLHttpRequest();
      const messageBox = document.createElement('div');
      const spinner = document.createElement('img');
      const object = {};
      formData.forEach((value, key) => object[key] = value);
      const json = JSON.stringify(object);
      messageBox.classList.add('message');
      xhr.open('POST', 'server.php');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(json); // xhr.send(formData);  // if formData needed instead of JSON          

      spinner.src = formMessages.loading;
      spinner.classList.add('spinner');
      form.querySelector('.btn').append(spinner);

      xhr.onload = function () {
        if (xhr.status != 200) {
          messageBox.textContent = formMessages.error;
          console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
          messageBox.textContent = formMessages.success;
          console.log(xhr.response);
          form.reset();
        }

        spinner.remove();
        form.insertAdjacentElement('afterend', messageBox);
        setInterval(() => {
          messageBox.remove();
        }, 3000);
      };
    });
  }
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map