const WORK_TIME = .25; // 25
const BREAK_TIME = .05; // 5
const RELAX_TIME = .20; // 20

export const state = {
    work:     WORK_TIME,
    break:    BREAK_TIME,
    relax:    RELAX_TIME,
    timeLeft: WORK_TIME * 60,
    status:   'work',
    isActive: false,
    timerId:  0,
    count:    4,

    todoActive: {
        id:       'default',
        pomodoro: 0,
        title:    'Все задачи выполнены!',
    },

    timerReset(){
        this.timeLeft = WORK_TIME * 60;
    },

    timerDecrease(){
        this.timeLeft--;
    },
};
