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
    const deadline = '2021-02-14T02:00';

    function calculateTime(endtime) { 
        const t = new Date(endtime) - new Date();

        const seconds = Math.floor( (t / 1000) % 60);
        const minutes = Math.floor( (t / 1000 /60) % 60);
        const hours =   Math.floor( (t / 1000 / 60 / 60) % 24);
        const days =    Math.floor( (t / 1000 / 60 / 60 / 24));

        return {total: t, seconds, minutes, hours, days};
        
    }

    console.log(calculateTime(deadline));




});

