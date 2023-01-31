import { state } from './state.js';
import { showTime } from './control.js';
import { timerStop } from './timerStop.js';

export const timerStart = () => {
    if (state.isActive && state.timeLeft > 0) {
        showTime(--state.timeLeft);
        state.timerId = setTimeout(timerStart, 1000);
    } else {
        timerStop();
    }
};
