import { tabs } from "./modules/tabs";
import { timer } from "./modules/timer";
import { modal } from "./modules/modal";
import { MenuCard, menu } from "./modules/menu";
import { form } from "./modules/form";
import { slider } from "./modules/slider";
import { calc } from "./modules/calc";

window.addEventListener('DOMContentLoaded', () => {    
    tabs();
    timer();
    modal('.modal', 'data-modal', 'data-modal-close');
    menu('http://localhost:3000/menu');
    form(); 
    slider();
    calc();
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
