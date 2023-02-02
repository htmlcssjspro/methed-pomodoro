import { controlInit } from './modules/control.js';
import { todoInit } from './modules/todo.js';
import { showTime } from './modules/timer.js';

const init = () => {
    controlInit();
    todoInit();
    showTime();
};

init();
