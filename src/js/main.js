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

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target === item) {
                    hideTabs();
                    showTab(i);
                }
            });
        }        
    });

    //Timer
    const deadline = '2021-02-17T12:13';

    function calculateTime(endtime) { 
        const t = new Date(endtime) - new Date();

        const seconds = Math.floor( (t / 1000) % 60);
        const minutes = Math.floor( (t / 1000 /60) % 60);
        const hours =   Math.floor( (t / 1000 / 60 / 60) % 24);
        const days =    Math.floor( (t / 1000 / 60 / 60 / 24));

        return {total: t, seconds, minutes, hours, days};        
    }

    function fixZero(num) {
        if(num < 10 && num >= 0) {
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
                clearInterval(intervalId);
                // console.log('Interval cleared');
            }
        }, 1000);
        
    }

    runTimer('.timer', deadline);

    //Modal    
    function runModal(modalSelector, dataModal, dataModalClose) {
        const modal = document.querySelector(modalSelector);        
        const modalTriggers = document.querySelectorAll(`[${dataModal}]`);
        const modalClose = modal.querySelector(`[${dataModalClose}]`);
        let isModalViewed = false;         

        function showModal() {
            isModalViewed = true;
            modal.classList.add('show', 'fade');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', function escapeModal(evt) {
                if (evt.code === 'Escape') {                    
                    closeModal();
                    document.removeEventListener('keydown', escapeModal);
                }
            });
        }
    
        function closeModal() {
            modal.classList.remove('show', 'fade');
            modal.classList.add('hide');
            document.body.style.overflow = '';
        }
        
        for (const trigger of modalTriggers) {
            trigger.addEventListener('click', showModal);            
        }

        modalClose.addEventListener('click', closeModal);  

        modal.addEventListener('click', evt => {
            if (evt.target === modal) {
                closeModal();
            }
        });

        //AutoShow modal after 10 sec
        // setTimeout(() => {
        //     if (!isModalViewed) {
        //         showModal();        
        //     }
        // }, 10000);        

        window.addEventListener('scroll', function endScrollModal() {
            const scrollHeight = Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
            );
            const scrollButtom = window.pageYOffset + document.documentElement.clientHeight;

            if(scrollButtom >= scrollHeight - 20) {
                if (!isModalViewed) {
                    showModal();
                }                
                window.removeEventListener('scroll', endScrollModal);
            }
        });     
    }
    
    runModal('.modal', 'data-modal', 'data-modal-close');

    //Menu cards with classes
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

    new MenuCard(
        `.menu .container`,
        `img/tabs/vegy.jpg`,
        `vegy`,
        `Меню "Фитнес"`,
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
        9,
        `menu__item`
    ).render();

    new MenuCard(
        `.menu .container`,
        `img/tabs/elite.jpg`,
        `elite`,
        `Меню “Премиум”`,
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
        19,
        `menu__item`
    ).render();

    new MenuCard(
        `.menu .container`,
        `img/tabs/post.jpg`,
        `post`,
        `Меню "Постное"`,
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
        14,
        `menu__item`
    ).render();



});

