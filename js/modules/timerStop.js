import { state } from './state.js';
import { $startBtn, showTime } from './control.js';

const audio = new Audio('audio/eralash.mp3');

export const timerStop = () => {
    audio.play();
    $startBtn.textContent = 'Старт';
    state.timerReset();
    state.isActive = false;
    showTime(0);
};
