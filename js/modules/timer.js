import { pomodoro } from './pomodoro.js';
import { $startBtn, changeActiveBtn } from './control.js';

const $countNum = document.querySelector('.count_num');

const $minutes = document.querySelector('.time__minutes');
const $seconds = document.querySelector('.time__seconds');

const audio = {
    work:  new Audio('audio/eralash.mp3'),
    break: new Audio('audio/eralash.mp3'),
    relax: new Audio('audio/eralash.mp3'),
};

const alarm = () => {
    audio[pomodoro.status].play();
};

const leadingZero = num => num < 10 ? `0${num}` : num;
const min = seconds => leadingZero(Math.floor(seconds / 60));
const sec = seconds => leadingZero(seconds % 60);

export const showTime = () => {
    const seconds = pomodoro.timeLeft;
    $minutes.textContent = min(seconds);
    $seconds.textContent = sec(seconds);
};

export const timerStop = () => {
    clearTimeout(pomodoro.timerId);
    pomodoro.isActive = false;
    pomodoro.timerReset();
    $startBtn.textContent = 'Старт';
    showTime();
};

export const timerStart = () => {
    if (pomodoro.isActive && pomodoro.timeLeft > 0) {
        pomodoro.timerDecrease();
        showTime();
        pomodoro.timerId = setTimeout(timerStart, 1000);
    } else {
        alarm();
        pomodoro.changeStatus();
        changeActiveBtn(pomodoro.status);
        $countNum.textContent = pomodoro.activeTodo.pomodoro;
        timerStart();
    }
};
