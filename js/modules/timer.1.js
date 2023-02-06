import { pomodoro } from './Pomodoro.js';
import { $startBtn, changeActiveBtn } from './Control.js';
import { $countNum } from './Todo.js';

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
    //* Interval
    const countdown = new Date().getTime() + state.timeLeft * 1000;
    state.intervalId = setInterval(() => {
        pomodoro.timerDecrease();
        showTime();

        document.title = state.timeLeft;

        if (!(pomodoro.timeLeft % 5)) {
            const now = new Date().getTime();
            pomodoro.timeLeft = Math.floor((countdown - now) / 100);
            console.log('Синхронизация времени');
        }

        if (pomodoro.isActive && pomodoro.timeLeft > 0) return;

        alarm();
        pomodoro.changeStatus();
        changeActiveBtn(pomodoro.status);
        $countNum.textContent = pomodoro.activeTodo.pomodoro;
    }, 1000);

    //* Timeout
    if (state.isActive && state.timeLeft > 0) {
        // state.timerDecrease();
        // showTime();
        // state.timerId = setTimeout(timerStart, 1000);
    } else {
        // timerStop();
        // alarm();

        // if (state.status === 'work') {
        //     state.todoActive.pomodoro++;
        //     $countNum.textContent = state.todoActive.pomodoro;
        //     if (state.todoActive.pomodoro % state.count) {
        //         state.status = 'break';
        //     } else {
        //         state.status = 'relax';
        //     }
        // } else {
        //     state.status = 'work';
        // }

        // state.timeLeft = state[state.status] * 60;
        // changeActiveBtn(state.status);
        // timerStart();
    }
};
