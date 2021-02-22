export function calc() {
    let sex = 'female';
    let height;
    let weight;
    let age;
    let ratio = 1.375;

    function calcTotal(resultSelector) {
        const calculatorResult = document.querySelector(resultSelector);

        if (!sex || !height || !weight || !age || !ratio) {
            calculatorResult.textContent = '____';
            return;
        }

        let res;

        if (sex === 'female') {
            res = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio;
        } else {
            res = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio;
        }

        res = Math.round(res);
        calculatorResult.textContent = res;
        return res;
    }

    function initCalculator() {
        if (localStorage.getItem('sex')) {
            sex = localStorage.getItem('sex');
        } else {
            localStorage.setItem('sex', sex);
        }

        if (localStorage.getItem('ratio')) {
            ratio = +localStorage.getItem('ratio');
        } else {
            localStorage.setItem('ratio', ratio);
        }        
        
        handleSex('[data-sex]', 'calculating__choose-item_active');
        handleHeight('#height');
        handleWeight('#weight');
        handleAge('#age');
        handleRatio('[data-ratio]', 'calculating__choose-item_active');
        calcTotal('.calculating__result span');
    }

    function clearActivityClass(items, activeClass) {
        items.forEach( item => {
            item.classList.remove(activeClass);
        } );
    }

    function handleSex(sexItemsSelector, activeClass) {
        const sexItems = document.querySelectorAll(sexItemsSelector); 
        
        clearActivityClass(sexItems, activeClass);
        
        for (const item of sexItems) {
            if (item.dataset.sex === sex) {
                item.classList.add(activeClass);
            }
            item.addEventListener('click', () => {
                clearActivityClass(sexItems, activeClass);                
                item.classList.add(activeClass);
                sex = item.dataset.sex;
                localStorage.setItem('sex', sex);
                calcTotal('.calculating__result span');                
            });
        }
    }

    function handleHeight(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (/\D/.test(input.value)) {
                input.style.outline = '2px solid red';
            } else {
                input.style.outline = '';
            }
            height = +input.value;    
            calcTotal('.calculating__result span');        
        });
    }

    function handleWeight(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (/\D/.test(input.value)) {
                input.style.outline = '2px solid red';
            } else {
                input.style.outline = '';
            }
            weight = +input.value;    
            calcTotal('.calculating__result span');        
        });
    }

    function handleAge(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (/\D/.test(input.value)) {
                input.style.outline = '2px solid red';
            } else {
                input.style.outline = '';
            }
            age = +input.value;    
            calcTotal('.calculating__result span');        
        });
    }

    function handleRatio(ratioItemsSelector, activeClass) {
        const ratioItems = document.querySelectorAll(ratioItemsSelector);

        clearActivityClass(ratioItems, activeClass); 
        
        for (const item of ratioItems) {
            if (+item.dataset.ratio === ratio) {
                item.classList.add(activeClass);
            }
            item.addEventListener('click', () => {
                clearActivityClass(ratioItems, activeClass);    
                item.classList.add(activeClass);
                ratio = +item.dataset.ratio;  
                localStorage.setItem('ratio', ratio);              
                calcTotal('.calculating__result span');                            
            });
        }
    }

    initCalculator();  
}