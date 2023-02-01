import { pomodoro } from './modules/pomodoro.js';
import { controlInit } from './modules/control.js';
import { showTime } from './modules/timer.js';

const init = () => {
    pomodoro.init({
        work:  25,
        break: 5,
        relax: 20,
        count: 4,
    });
    controlInit();
    showTime();
};

init();
