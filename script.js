let workTime = 25 * 60;
let breakTime = 5 * 60;
let time = workTime;
let timerInterval;
let isWorkTime = true;
let sessions = 0;

const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const sessionsEl = document.getElementById('sessions');
const alarm = document.getElementById('alarm');
const progressBar = document.getElementById('progress-bar');

const workInput = document.getElementById('work-time');
const breakInput = document.getElementById('break-time');

function updateDisplay() {
    let mins = Math.floor(time / 60);
    let secs = time % 60;
    minutesEl.textContent = mins < 10 ? '0' + mins : mins;
    secondsEl.textContent = secs < 10 ? '0' + secs : secs;

    let totalTime = isWorkTime ? workTime : breakTime;
    let progress = ((totalTime - time) / totalTime) * 100;
    progressBar.style.width = progress + '%';
}

function startTimer() {
    workTime = parseInt(workInput.value) * 60;
    breakTime = parseInt(breakInput.value) * 60;
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            time--;
            updateDisplay();

            if (time < 0) {
                alarm.play();
                clearInterval(timerInterval);
                timerInterval = null;

                if (isWorkTime) {
                    sessions++;
                    sessionsEl.textContent = sessions;
                    alert("Work session over! Time for a break.");
                    time = breakTime;
                } else {
                    alert("Break over! Time to work.");
                    time = workTime;
                }

                isWorkTime = !isWorkTime;
                updateDisplay();
                startTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    time = isWorkTime ? workTime : breakTime;
    progressBar.style.width = '0%';
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();
