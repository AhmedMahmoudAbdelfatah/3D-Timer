//timer and clock component
const digitCardsSeconds = document.querySelectorAll("[seconds-segment] .digit-card"); 
const digitCardsMinutes = document.querySelectorAll("[minutes-segement] .digit-card"); 
const digitCardsHours = document.querySelectorAll("[hours-segment] .digit-card"); 
//control section
const start = document.querySelector(".btn-container .start");
const stop = document.querySelector(".btn-container .stop");
const timer = document.querySelector(".radio-container [value = 'timer']");
const clock = document.querySelector(".radio-container [value = 'clock']");
const entertime = document.querySelector(".control-contianer .enter-time");
const mainColor = document.querySelector(".container .color #color");

let clockHandler;
let timerHandler;
let time;
//controling main color with local storage 
if (localStorage.getItem("mainColor") !== null) {
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("mainColor"));
    mainColor.value = localStorage.getItem("mainColor");
}

mainColor.addEventListener("input", function (e) {
    localStorage.setItem("mainColor", e.target.value);
    document.documentElement.style.setProperty("--main-color", e.target.value);
});

//show and hide input section for timer
timer.addEventListener("click", () => entertime.style.display = 'flex');

clock.addEventListener("click", () => entertime.style.display = 'none')

//actions for the start btn
start.addEventListener("click", function (e) {
    clearInterval(timerHandler);
    clearInterval(clockHandler);
    if (timer.checked) {
        if (time === undefined || time === null) entertime.firstElementChild.value = "Place Enter The Correct Time First";
        else runTimer(digitCardsSeconds, digitCardsMinutes, digitCardsHours, time[2], time[1], time[0]);
    }
    else if (clock.checked) {
        const currTime = new Date();
        inintializeTimer(digitCardsSeconds, digitCardsMinutes, digitCardsHours, currTime.getSeconds(), currTime.getMinutes(), currTime.getHours());
        runClock(digitCardsSeconds, digitCardsMinutes, digitCardsHours, currTime.getSeconds(), currTime.getMinutes(), currTime.getHours());
    }
});

//actions for the stop btn
stop.addEventListener("click", function (e) {
    if (clock.checked)  clearInterval(clockHandler);
    else if (timer.checked) clearInterval(timerHandler);
})

//deal with the input incase of timer
entertime.addEventListener("click", function (e) {
    if (e.target.classList[0] === "btn") {
        clearInterval(clockHandler);
        clearInterval(timerHandler);
        time = checkInput(e.currentTarget.firstElementChild.value);
        if (time === null) {
            e.currentTarget.firstElementChild.value = "Place Enter Correct Format ex. 22-10-12";
        }
        else {
            time = time[0].match(/\d{1,2}/g);
            inintializeTimer(digitCardsSeconds, digitCardsMinutes, digitCardsHours, time[2], time[1], time[0]);
        }
    } 
})

//little function to validate the input 
function checkInput(text) {
    const reg = /^\s*(\d|1\d|2[0-3])\s*(:|-)\s*[0-5]?\d\s*\2\s*[0-5]?\d\s*$/;
    return text.match(reg);
}


function runTimer(digitCardsSeconds, digitCardsMinutes, digitCardsHours, initailSeconds, inintialMinutes, initialHours) {
    var secondsOnes = initailSeconds % 10;
    var secondsTens = parseInt(initailSeconds / 10);
    var miutesOnes = inintialMinutes % 10;
    var minutesTens = parseInt(inintialMinutes / 10);
    var hoursOnes = initialHours % 10;
    var hoursTens = parseInt(initialHours / 10);
    timerHandler = window.setInterval(function (digitCardsSeconds) {
        // run seconds
        flip(digitCardsSeconds[1], 9, secondsOnes, false);
        if (secondsOnes === 0) {
            flip(digitCardsSeconds[0], 5, secondsTens);
            secondsTens = secondsTens === 0 ? 5 : secondsTens - 1;
            secondsOnes = 9;
        }
        else secondsOnes--;
        // run minutes
        if (secondsOnes === 9 && secondsTens === 5) {
            flip(digitCardsMinutes[1], 9, miutesOnes, false);
            if (miutesOnes === 0) {
                flip(digitCardsMinutes[0], 5, minutesTens, false);
                minutesTens = minutesTens === 0 ? 5 : minutesTens - 1;
                miutesOnes = 9;
            }
            else miutesOnes--;  
        }
        // run hours
        if (miutesOnes === 9 && minutesTens === 5 && secondsOnes === 9 && secondsTens === 5) {
            flip(digitCardsHours[1], hoursOnes === 0? 3 : 9, hoursOnes, false);
            if (hoursOnes === 0) {
                flip(digitCardsHours[0], 2, hoursTens, false);
                hoursTens = hoursTens === 0 ? 2 : hoursTens - 1;
                hoursOnes = hoursTens === 2? 3 : 9;
            }
            else hoursOnes--;  
        }
    }, 1000, digitCardsSeconds);
}


function runClock(digitCardsSeconds, digitCardsMinutes, digitCardsHours, initailSeconds, inintialMinutes, initialHours) {
    var secondsOnes = initailSeconds % 10;
    var secondsTens = parseInt(initailSeconds / 10);
    var miutesOnes = inintialMinutes % 10;
    var minutesTens = parseInt(inintialMinutes / 10);
    var hoursOnes = initialHours % 10;
    var hoursTens = parseInt(initialHours / 10);
    clockHandler = window.setInterval(function (digitCardsSeconds) {
        //run seconds
        flip(digitCardsSeconds[1], 9, secondsOnes, true);
        if (secondsOnes === 9) {
            flip(digitCardsSeconds[0], 5, secondsTens, true);
            secondsTens = secondsTens === 5 ? 0 : secondsTens + 1;
            secondsOnes = 0;
        }
        else secondsOnes++;
        //run minutes
        if (secondsOnes === 0 && secondsTens === 0) {
            flip(digitCardsMinutes[1], 9, miutesOnes, true);
            if (miutesOnes === 9) {
                flip(digitCardsMinutes[0], 5, minutesTens, true);
                minutesTens = minutesTens === 5 ? 0 : minutesTens + 1;
                miutesOnes = 0;
            }
            else miutesOnes++;  
        }
        //run hours
        if (miutesOnes === 0 && minutesTens === 0 && secondsOnes === 0 && secondsTens === 0) {
            flip(digitCardsHours[1], hoursTens === 2? 3 : 9, hoursOnes, true);
            if (hoursOnes === 9 && hoursTens < 2) {
                flip(digitCardsHours[0], 2, hoursTens, true);
                hoursTens++;
                hoursOnes = 0;
            }
            else if (hoursOnes === 3 && hoursTens === 2) {
                flip(digitCardsHours[0], 2, hoursTens, true);
                secondsOnes = 0;
                secondsTens = 0;
                miutesOnes = 0;
                minutesTens = 0;
                hoursOnes = 0;
                hoursTens = 0;
            }
            else hoursOnes++;  
        }
    }, 1000, digitCardsSeconds);
}

//the main animation componant for clock and timer
function flip(digitCard, breakPoint, currentNumber, isclock) {
    const digitTop = digitCard.firstElementChild;
    const digitBottom = digitCard.lastElementChild;
    let currNum = currentNumber;
    let nextNum = isclock? currNum === breakPoint ? 0 : currNum + 1 : currNum === 0? breakPoint : currNum - 1; 
    digitTop.textContent = currNum;
    digitBottom.textContent = currNum;
    const topFlip = document.createElement("div");
    const bottomFlip = document.createElement("div");
    topFlip.textContent = currNum;
    bottomFlip.textContent = nextNum;
    topFlip.classList.add("top-flip");
    bottomFlip.classList.add("bottom-flip");
    digitCard.addEventListener("animationstart", function (e) {
    if (e.target === topFlip) digitTop.textContent = nextNum;
    });

    digitCard.addEventListener("animationend", function (e) {
        if (e.target === topFlip) e.target.remove();
        else if (e.target === bottomFlip) {
            digitBottom.textContent = nextNum;
            e.target.remove();
        }
    });
    digitCard.append(topFlip, bottomFlip);
}


function inintializeTimer(digitCardsSeconds, digitCardsMinutes, digitCardsHours, initailSeconds, inintialMinutes, initialHours) {
    var secondsOnes = initailSeconds % 10;
    var secondsTens = parseInt(initailSeconds / 10);
    var miutesOnes = inintialMinutes % 10;
    var minutesTens = parseInt(inintialMinutes / 10);
    var hoursOnes = initialHours % 10;
    var hoursTens = parseInt(initialHours / 10);

    digitCardsSeconds[1].firstElementChild.textContent = secondsOnes;  
    digitCardsSeconds[1].lastElementChild.textContent = secondsOnes;
    
    digitCardsSeconds[0].firstElementChild.textContent = secondsTens;
    digitCardsSeconds[0].lastElementChild.textContent = secondsTens;

    digitCardsMinutes[1].firstElementChild.textContent = miutesOnes;
    digitCardsMinutes[1].lastElementChild.textContent = miutesOnes;

    digitCardsMinutes[0].firstElementChild.textContent = minutesTens;
    digitCardsMinutes[0].lastElementChild.textContent = minutesTens;

    digitCardsHours[1].firstElementChild.textContent = hoursOnes;
    digitCardsHours[1].lastElementChild.textContent = hoursOnes;

    digitCardsHours[0].firstElementChild.textContent = hoursTens;
    digitCardsHours[0].lastElementChild.textContent = hoursTens;

}

