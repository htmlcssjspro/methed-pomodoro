import { state } from './state.js';
import { $startBtn, changeActiveBtn } from './control.js';
import { $countNum } from './todo.js';


const $minutes = document.querySelector('.time__minutes');
const $seconds = document.querySelector('.time__seconds');

const audio = {
    work:  new Audio('audio/eralash.mp3'),
    break: new Audio('audio/eralash.mp3'),
    relax: new Audio('audio/eralash.mp3'),
};

const alarm = () => {
    audio[state.status].play();
};

const leadingZero = num => num < 10 ? `0${num}` : num;
const min = seconds => leadingZero(Math.floor(seconds / 60));
const sec = seconds => leadingZero(seconds % 60);

export const showTime = () => {
    const seconds = state.timeLeft;
    $minutes.textContent = min(seconds);
    $seconds.textContent = sec(seconds);
};

export const timerStop = () => {
    clearTimeout(state.timerId);
    state.isActive = false;
    state.timerReset();
    // state.timeLeft = state[state.status] * 60;
    $startBtn.textContent = 'Старт';
    showTime();
};

export const timerStart = () => {
    //* Interval
    const countdown = new Date().getTime() + state.timeLeft * 1000;
    state.intervalId = setInterval(() => {
        state.timerDecrease();
        showTime();

        document.title = state.timeLeft;

        if (!(state.timeLeft % 5)) {
            const now = new Date().getTime();
            state.timeLeft = Math.floor((countdown - now) / 100);
            console.log('Синхронизация времени');
        }

        if (state.isActive && state.timeLeft > 0) return;

        alarm();

        if (state.status === 'work') {
            state.todoActive.pomodoro++;
            $countNum.textContent = state.todoActive.pomodoro;
            if (state.todoActive.pomodoro % state.count) {
                state.status = 'break';
            } else {
                state.status = 'relax';
            }
        } else {
            state.status = 'work';
        }

        state.timeLeft = state[state.status] * 60;
        changeActiveBtn(state.status);
        timerStart();
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
