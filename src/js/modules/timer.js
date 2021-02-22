export function timer() {
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

    function runTimer(timerSelector, endtime) {  
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
}