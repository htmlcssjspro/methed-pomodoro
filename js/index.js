import { controlInit } from './modules/control.js';
import { showTime } from './modules/timer.js';

const init = () => {
    controlInit();
    showTime();
};

init();
