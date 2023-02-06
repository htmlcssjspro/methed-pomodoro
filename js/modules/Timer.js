export default class Timer {
    static #WORK = 25;
    static #BREAK = 5;
    static #RELAX = 20;
    static #COUNT = 4;

    static #AUDIO = {
        work:  new Audio('audio/eralash.mp3'),
        break: new Audio('audio/eralash.mp3'),
        relax: new Audio('audio/eralash.mp3'),
    };

    #left;

    audio = {};

    constructor(options) {
        this.status = 'work';

        this.work = options.work ?? Timer.#WORK;
        this.break = options.break ?? Timer.#BREAK;
        this.relax = options.relax ?? Timer.#RELAX;
        this.count = options.count ?? Timer.#COUNT;
        this.left = this.work;

        this.todo = options.todo;
        this.dom = options.dom;
        this.control = options.control;

        this.audio.work = options.audio?.work ? new Audio(options.audio.work) : Timer.#AUDIO.work;
        this.audio.break = options.audio?.break ? new Audio(options.audio.break) : Timer.#AUDIO.break;
        this.audio.relax = options.audio?.relax ? new Audio(options.audio.relax) : Timer.#AUDIO.relax;

        document.addEventListener('start', this.start.bind(this), false);
        document.addEventListener('stop', this.stop.bind(this), false);

        document.addEventListener('work', this.statusHandler.bind(this), false);
        document.addEventListener('break', this.statusHandler.bind(this), false);
        document.addEventListener('relax', this.statusHandler.bind(this), false);
    }

    get left(){
        return this.#left;
    }

    set left(time) {
        this.#left = time * 60;
    }

    #timeSync(countdown) {
        if (this.left % 5) return;
        const now = new Date().getTime();
        this.#left = Math.floor((countdown - now) / 1000);
    }

    #decrease(){
        this.#left--;
    }

    #reset(){
        this.left = this[this.status];
        this.dom.renderTimer(this.left);
        this.dom.renderTitle(this.status, this.left);
    }

    setStatus(status) {
        this.status = status;
        clearInterval(this.intervalId);
        this.#reset();
        if (this.isActive) {
            this.#alarm(status);
            this.#start();
        }
    }

    statusHandler({ type }) {
        this.setStatus(type);
    }

    changeStatus() {
        if (this.status === 'work') {
            this.todo.active.pomodoro++;
            this.dom.renderCount(this.todo.active.pomodoro);
            if (this.todo.active.pomodoro % this.count) {
                this.setStatus('break');
            } else {
                this.setStatus('relax');
            }
        } else {
            this.setStatus('work');
        }
    }

    #start(){
        this.isActive = true;
        const countdown = new Date().getTime() + this.left * 1000;
        this.intervalId = setInterval(() => {
            this.#decrease();
            this.#timeSync(countdown);
            this.dom.renderTimer(this.left);
            this.dom.renderTitle(this.status, this.left);

            if (this.left > 0) return;

            this.changeStatus();
            this.control.changeActiveBtn(this.status);
            // document.dispatchEvent(new CustomEvent('timerstatusset', { detail: { status: this.status } }));
        }, 1000);
    }

    #stop(){
        this.isActive = false;
        clearInterval(this.intervalId);
        this.dom.renderStart('Старт');
    }

    start() {
        if (this.isActive) {
            this.#stop();
            this.dom.renderStart('Продолжить');
        } else {
            this.#start();
            this.dom.renderStart('Пауза');
        }
    }

    stop() {
        this.#stop();
        this.#reset();
    }

    #alarm() {
        this.audio[this.status].play();
    }
}
