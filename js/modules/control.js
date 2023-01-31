import { state } from './state.js';
import { timerStart } from './timerStart.js';
import { timerStop } from './timerStop.js';

export const $startBtn = document.querySelector('.control__btn_start');
export const $stopBtn = document.querySelector('.control__btn_stop');

const $minutes = document.querySelector('.time__minutes');
const $seconds = document.querySelector('.time__seconds');

const leadingZero = num =>
    num < 10 ? `0${num}` : num;

const min = seconds =>
    leadingZero(Math.floor(seconds / 60));

const sec = seconds =>
    leadingZero(seconds % 60);

export const showTime = (seconds) => {
    $minutes.textContent = min(seconds);
    $seconds.textContent = sec(seconds);
};

export const controlInit = () => {
    $startBtn.addEventListener('click', () => {
        if (state.isActive) {
            clearTimeout(state.timerId);
            state.isActive = false;
            $startBtn.textContent = 'Продолжить';
        } else {
            state.isActive = true;
            $startBtn.textContent = 'Пауза';
            timerStart();
        }
    }, false);

    $stopBtn.addEventListener('click', () => {
        timerStop();
    });
};
