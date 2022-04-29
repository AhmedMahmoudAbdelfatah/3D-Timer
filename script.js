const digitCardsSeconds = document.querySelectorAll("[seconds-segment] .digit-card"); 
const digitCardsMinutes = document.querySelectorAll("[minutes-segement] .digit-card"); 
const digitCardsHours = document.querySelectorAll("[hours-segment] .digit-card"); 

const isclock = true;

if (isclock) {
    const currTime = new Date();
    inintializeTimer(digitCardsSeconds, digitCardsMinutes, digitCardsHours, currTime.getSeconds(), currTime.getMinutes(), currTime.getHours());
    runClock(digitCardsSeconds, digitCardsMinutes, digitCardsHours, currTime.getSeconds(), currTime.getMinutes(), currTime.getHours());
}

else {
    inintializeTimer(digitCardsSeconds, digitCardsMinutes, digitCardsHours, 05, 00, 00);
    runTimer(digitCardsSeconds, digitCardsMinutes, digitCardsHours, 05, 00, 00);
}

function runTimer(digitCardsSeconds, digitCardsMinutes, digitCardsHours, initailSeconds, inintialMinutes, initialHours) {
    var secondsOnes = initailSeconds % 10;
    var secondsTens = parseInt(initailSeconds / 10);
    var miutesOnes = inintialMinutes % 10;
    var minutesTens = parseInt(inintialMinutes / 10);
    var hoursOnes = initialHours % 10;
    var hoursTens = parseInt(initialHours / 10);
    window.setInterval(function (digitCardsSeconds) {
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
    window.setInterval(function (digitCardsSeconds) {
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









