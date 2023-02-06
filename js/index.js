import Pomodoro from './modules/Pomodoro.js';

// const pomodoroDefault = new Pomodoro();

const pomodoro = new Pomodoro({
    name:        'Cool Pomodoro',
    storageName: 'pomodoro',
    work:        .25,
    break:       .05,
    relax:       .20,
    count:       4,
});
