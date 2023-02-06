const WORK_TIME = 25;
const BREAK_TIME = 5;
const RELAX_TIME = 20;
const COUNT = 4;

export const pomodoro = {
    work:   WORK_TIME,
    break:  BREAK_TIME,
    relax:  RELAX_TIME,
    status: 'work',
    count:  COUNT,

    _timeLeft: WORK_TIME * 60,

    isActive: false,
    timerId:  0,

    activeTodo: {
        id:       'default',
        pomodoro: 0,
        title:    'Помодоро',
    },

    init(options = {}) {
        this.work = options.work ?? WORK_TIME;
        this.break = options.break ?? BREAK_TIME;
        this.relax = options.relax ?? RELAX_TIME;
        this.count = options.count ?? COUNT;
    },

    get timeLeft() {
        return this._timeLeft;
    },

    set timeLeft(value) {
        this._timeLeft = value * 60;
    },

    setStatus(status) {
        this.status = status;
        this.timerReset();
    },

    changeStatus() {
        if (this.status === 'work') {
            this.activeTodo.pomodoro++;
            if (this.activeTodo.pomodoro % this.count) {
                this.status = 'break';
            } else {
                this.status = 'relax';
            }
        } else {
            this.status = 'work';
        }
        this.timerReset();
    },

    timerReset(){
        this.timeLeft = this[this.status];
    },

    timerDecrease(){
        this._timeLeft--;
    },
};
