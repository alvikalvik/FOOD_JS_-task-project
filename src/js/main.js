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
    const deadline = '2021-02-23T12:13';

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
        });

        //AutoShow modal after 50 sec
        setTimeout(() => {
            if (!isModalViewed) {
                showModal();        
            }
        }, 50000);        

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

    async function getResource(url) {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();             
    }

    getResource('http://localhost:3000/menu')
        .then(data => {
            for (const {img, altimg, title, descr, price} of data) {
                new MenuCard(
                    `.menu .container`,
                    img,
                    altimg,
                    title,
                    descr,
                    price,
                    `menu__item`
                ).render();
            }
        })
        .catch(error => {            
            console.log(error);
        });

    //Form with XMLHttpRequest
    // const forms = document.querySelectorAll('form');

    // const formMessages = {
    //     loading: 'img/form/spinner.svg',
    //     success: 'Спасибо. Скоро мы с Вами свяжемся.',
    //     error: 'Ошибка отправки запроса.',
    // };

    // for (const form of forms) {
    //     sendForm(form);
    // }

    // function sendForm(form) {
    //     form.addEventListener('submit', evt => {
    //         evt.preventDefault();
            
    //         const formData = new FormData(form);
    //         const xhr = new XMLHttpRequest();
    //         const messageBox = document.createElement('div');
    //         const spinner = document.createElement('img');

    //         const object = {};
    //         formData.forEach((value, key) => object[key] = value);
    //         const json = JSON.stringify(object);

    //         messageBox.classList.add('message');            
            
    //         xhr.open('POST', 'server.php');
    //         xhr.setRequestHeader('Content-Type', 'application/json');
    //         xhr.send(json);
    //         // xhr.send(formData);  // if formData needed instead of JSON          
            
    //         spinner.src = formMessages.loading;
    //         spinner.classList.add('spinner');
    //         form.querySelector('.btn').append(spinner);

    //         xhr.onload = function() {                
    //             if (xhr.status != 200) {
    //                 messageBox.textContent = formMessages.error;                    
    //                 console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    //             } else {
    //                 messageBox.textContent = formMessages.success;                    
    //                 console.log(xhr.response);
    //                 form.reset();
    //             }
    //             spinner.remove();
    //             form.insertAdjacentElement('afterend', messageBox);
    //             setInterval(() => {
    //                 messageBox.remove();
    //             },3000);
    //           };
    //     });
    // }


    //Form with fetch
    const forms = document.querySelectorAll('form');

    const formMessages = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо. Скоро мы с Вами свяжемся.',
        error: 'Ошибка отправки запроса.',
    };

    for (const form of forms) {
        handleForm(form);
    }

    async function sendFormData(url, json) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();             
    }    

    function handleForm(form) {
        form.addEventListener('submit', evt => {
            evt.preventDefault();
            
            const formData = new FormData(form);            
            const messageBox = document.createElement('div');
            const spinner = document.createElement('img');

            const object = {};
            formData.forEach((value, key) => object[key] = value);
            const json = JSON.stringify(object);

            messageBox.classList.add('message');
            
            spinner.src = formMessages.loading;
            spinner.classList.add('spinner');
            form.querySelector('.btn').append(spinner);
            

            sendFormData('http://localhost:3000/requests', json)
            .then(data => {
                messageBox.textContent = formMessages.success;                          
                console.log(data);                
            })
            .catch(error => {
                messageBox.textContent = formMessages.error;                    
                console.log(error);
            })
            .finally(() => {
                form.reset();
                spinner.remove();
                form.insertAdjacentElement('afterend', messageBox);
                setInterval(() => {
                    messageBox.remove();
                },3000);
            });
        });
    }    

    //Slider (Simple with fade)

    // const slider = document.querySelector('.offer__slider');
    // const slides = slider.querySelectorAll('.offer__slide');
    // const nextArrow = slider.querySelector('.offer__slider-next');
    // const prevArrow = slider.querySelector('.offer__slider-prev');
    // const currentSlide = slider.querySelector('#current');
    // const totalSlides = slider.querySelector('#total');    

    // function correctZero(num) {
    //     if (num >= 0 && num < 10) {
    //         return `0${num}`;
    //     } else {
    //         return num;
    //     }
    // }

    // function showSlide(slideNumber) {
    //     currentSlide.textContent = correctZero(slideNumber);
    //     slides.forEach( (slide, i) => {
    //         if ( (i + 1) === slideNumber) {
    //             slide.classList.remove('hide');
    //             slide.classList.add('show', 'fade');
    //         } else {
    //             slide.classList.add('hide');
    //             slide.classList.remove('show', 'fade');
    //         }
    //     });
    // }

    // function initSlider() {
    //     showSlide(1);
    //     totalSlides.textContent = correctZero(slides.length);
    //     nextArrow.addEventListener('click', nextSlide);
    //     prevArrow.addEventListener('click', prevSlide);
    // }

    // function nextSlide() {
    //     if (currentSlide.textContent === totalSlides.textContent) {
    //         showSlide(1);
    //     } else {
    //         showSlide(+currentSlide.textContent + 1);
    //     }        
    // }

    // function prevSlide() {
    //     if (currentSlide.textContent === '01') {
    //         showSlide(slides.length - 1);
    //     } else {
    //         showSlide(+currentSlide.textContent - 1);
    //     }        
    // }

    // initSlider();

    //Slider (Variant 2 as carousell)

    const slider = document.querySelector('.offer__slider');
    const slides = slider.querySelectorAll('.offer__slide');
    const sliderInner = slider.querySelector('.offer__slider-inner');
    const sliderWrapper = slider.querySelector('.offer__slider-wrapper');
    const nextArrow = slider.querySelector('.offer__slider-next');
    const prevArrow = slider.querySelector('.offer__slider-prev');
    const currentSlide = slider.querySelector('#current');
    const totalSlides = slider.querySelector('#total');  
    const sliderDotsList = document.createElement('ul');
    const sliderDots = [];
    
    let currentSlideIndex = 0;
    let sliderWidth = 0;

    function correctZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function showSlideNumber(slideIndex) {
        currentSlide.textContent = correctZero(+slideIndex + 1);
    }

    function showTotalSlidesNumber() {
        totalSlides.textContent = correctZero(slides.length);            
    }

    function showSlide(slideNumber) {
        currentSlideIndex = +slideNumber;        
        showSlideNumber(currentSlideIndex);
        sliderInner.style.transform = `translateX(-${currentSlideIndex * sliderWidth}px)`;
        sliderDots.forEach(item => item.classList.remove('dot--active'));
        sliderDots[slideNumber].classList.add('dot--active');
    }

    function nextSlide() {
        if (currentSlide.textContent === totalSlides.textContent) {
            showSlide(0);
        } else {
            showSlide(+currentSlide.textContent);
        }        
    }

    function prevSlide() {
        if (currentSlide.textContent === '01') {
            showSlide(slides.length - 1);
        } else {
            showSlide(+currentSlide.textContent - 2);
        }        
    }

    function adjustSlidesAnsWrapperStyles() {
        sliderWrapper.style.overflow = 'hidden';
        sliderWrapper.style.position = 'relative';
        sliderWidth = parseInt(window.getComputedStyle(sliderWrapper).getPropertyValue('width'));

        slides.forEach( slide => {
            slide.style.width = sliderWidth + 'px';
        });
        
        sliderInner.style.cssText = `
            width: ${slides.length * sliderWidth}px;
            display: flex;
            transition: transform 0.3s;
        `;
    }

    function createSliderDots() {
        adjustSlidesAnsWrapperStyles();
        sliderDotsList.classList.add('carousel-indicators');        

        for (let i = 0; i < slides.length; i++) {
            sliderDots[i] = document.createElement('li');
            sliderDots[i].classList.add('dot'); 
            sliderDots[i].classList.remove('dot--active');
            if (i === currentSlideIndex) {
                sliderDots[i].classList.add('dot--active');
            }           
            sliderDots[i].dataset.dotindex = i;
            sliderDotsList.append(sliderDots[i]);             
        }

        sliderDots.forEach(item => {
            item.addEventListener('click', () => {
                showSlide(+item.dataset.dotindex);                
            });
        });

        sliderWrapper.append(sliderDotsList);
    }

    function initSlider() {  
        createSliderDots();
        showSlide(0);
        showTotalSlidesNumber();
        nextArrow.addEventListener('click', nextSlide);
        prevArrow.addEventListener('click', prevSlide);
    }

    initSlider();

    


    



});

