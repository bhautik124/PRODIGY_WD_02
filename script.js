let startTime, elapsedTime = 0, timerInterval;
const timeDisplay = document.querySelector('.time-display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function print(txt) {
    timeDisplay.innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 1000);
    startStopBtn.innerHTML = "Pause";
}

function pause() {
    clearInterval(timerInterval);
    startStopBtn.innerHTML = "Start";
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    startStopBtn.innerHTML = "Start";
    lapsList.innerHTML = '';
}

function lap() {
    if (elapsedTime !== 0) {
        const lapTime = timeToString(elapsedTime);
        const li = document.createElement('li');
        li.innerText = lapTime;
        lapsList.appendChild(li);
    }
}

startStopBtn.addEventListener('click', function() {
    if (startStopBtn.innerHTML === "Start") {
        start();
    } else {
        pause();
    }
});

resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
