import Control from './Control.js';
import DOM from './DOM.js';
import Timer from './Timer.js';
import Todo from './Todo.js';

export default class Pomodoro {
    static #NAME = 'New Pomodoro';

    constructor(options = {}){
        this.name = options.name ?? Pomodoro.#NAME;

        // this.state = {
        //     status: 'work'
        // };

        // this.storage = new Storage(options.storageName);
        // this.todoActive = this.storage.list[0] ?? Todo.default;

        this.todo = new Todo({
            storageName: options.storageName,
        });

        this.dom = new DOM();

        this.control = new Control({
            $navigation: this.dom.$navigation,
        });

        this.timer = new Timer({
            work:    options.work,
            break:   options.break,
            relax:   options.relax,
            count:   options.count,
            todo:    this.todo,
            dom:     this.dom,
            control: this.control,
        });

        this.renderInit();

        document.addEventListener('work', this.testEventsHandler.bind(this), false);
        document.addEventListener('break', this.testEventsHandler.bind(this), false);
        document.addEventListener('relax', this.testEventsHandler.bind(this), false);
    }

    testEventsHandler(event) {
        console.log('event: ', event);
    }

    renderInit() {
        this.dom.renderHeaderTitle(this.name);
        this.dom.renderTodoList(this.todo.list);
        this.dom.renderTimer(this.timer.left);
        this.dom.renderCount(this.todo.active?.pomodoro);
        this.dom.renderFooterTitle(this.todo.active?.title);
    }

    onTodoActivate() {}
    onTodoEdit() {}
    onTodoDelete() {}
}
