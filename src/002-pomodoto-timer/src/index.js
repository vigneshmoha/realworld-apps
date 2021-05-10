import 'bootstrap';
require('./assets/scss/style.scss');

// Global variables
let countdown = 0; // variable to set/clear intervals
let isPaused = true;
let isBreak = true;
let workTime = 25;
let seconds = 1500; // Initialized with seconds left with clock
let breakTime = 5;

const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const statusContainer = document.getElementById('status');
const workminContainer = document.getElementById('work-min');
const breakminContainer = document.getElementById('break-min');
const timerContainer = document.getElementById('timer');

const alarm = document.createElement('audio'); // A bell sound will play when the timer reaches 0
alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");

startBtn.addEventListener('click', () => {
    clearInterval(countdown);
    isPaused = !isPaused;

    if (!isPaused) {
        countdown = setInterval(timer, 1000);
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(countdown);
    seconds = workTime * 60;
    countdown = 0;
    isPaused = true;
    isBreak = true;
});

function timer() {
    seconds--;
    if (seconds < 0) {
        clearInterval(countdown);
        alarm.currentTime = 0;
        alarm.play();

        seconds = (isBreak ? breakTime : workTime) * 60;
        isBreak = !isBreak;
    }
}

// Update work and break timings
const increment = 5;

let incrementFunctions = {
    "work-plus" : function() { workTime = Math.min(workTime + increment, 60) },
    "work-minus" : function() { workTime = Math.min(workTime - increment, 5)},
    "break-plus" : function() { breakTime = Math.min(breakTime + increment, 60) },
    "break-minus" : function() { breakTime = Math.min(breakTime - increment, 5)}
}

for (const key in incrementFunctions) {
    if (incrementFunctions.hasOwnProperty(key)) {
        document.getElementById(key).onclick = incrementFunctions[key];
    }
};

function updateCountdownDisplay() {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    timerContainer.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}

function updateButtonDisplay() {
    let buttonTxt = "Pause";
    if (isPaused && countdown === 0) {
        buttonTxt = "Start";
    } else if (isPaused && countdown !== 0) {
        buttonTxt = "Continue";
    }
    startBtn.textContent = buttonTxt;
}

function updateHtml() {
    // update countdown display
    updateCountdownDisplay();
    // update button display
    updateButtonDisplay();
    const statusContent = isBreak ? "Keep working" : "Take a break!";
    statusContainer.textContent = statusContent;
    workminContainer.textContent = workTime;
    breakminContainer.textContent = breakTime;
}

window.setInterval(updateHtml, 100);
document.onclick = updateHtml;