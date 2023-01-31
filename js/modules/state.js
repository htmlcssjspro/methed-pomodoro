const WORK_TIME = 0.25 * 60;

export const state = {
    timeLeft: WORK_TIME,
    isActive: false,
    timerId:  0,

    timerReset(){
        this.timeLeft = WORK_TIME;
    },
};
