export function slider() {
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
}