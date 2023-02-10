export default class Todo {
    static #STORAGE_NAME = 'pomodoro';
    static #TODO = {
        id:       'default',
        title:    'Все Задачи Выполнены!',
        pomodoro: 0,
    };

    #active;
    #list;
    #timer;

    constructor(options) {
        this.name = options.storageName ?? Todo.#STORAGE_NAME;
        this.#timer = options.timer;
        this.list = this.#getList();
        this.active = this.list[0] ?? Todo.#TODO;
    }

    static get default(){
        return this.#TODO;
    }

    get active(){
        const pomodoro = this.#active.pomodoro;

        let works = pomodoro;
        works *= this.#timer.work;

        let breaks = Math.floor(pomodoro - pomodoro / this.#timer.count);
        breaks *= this.#timer.break;

        let relaxes = Math.floor(pomodoro / this.#timer.count) - (!pomodoro || pomodoro % this.#timer.count ? 0 : 1);
        relaxes *= this.#timer.relax;

        this.#active.work = this.#formatTime(works);
        this.#active.relax = this.#formatTime(breaks + relaxes);
        this.#active.total = this.#formatTime(works + breaks + relaxes);

        return this.#active;
    }
    set active(todo){
        this.#active = Object.assign({}, todo);
    }

    get list(){
        return this.#list;
    }
    set list(list){
        this.#list = list;
    }


    #getList() {
        const list = localStorage.getItem(this.name);
        return list ? JSON.parse(list) : [];
    }

    #setList(list) {
        localStorage.setItem(this.name, JSON.stringify(list));
        return list;
    }

    #removeList() {
        localStorage.removeItem(this.name);
    }

    #get(id) {
        return this.list.find(item => item.id === id);
    }

    #add(todo) {
        this.list.push(todo);
        this.#setList(this.list);
        return todo;
    }

    #update(todo) {
        const target = this.#get(todo.id);
        const updatedTodo = Object.assign(target, todo);
        this.#setList(this.list);
        return updatedTodo;
    }

    #delete(id) {
        this.list = this.list.filter(item => item.id !== id);
        this.#setList(this.list);
    }

    create() {
        const todo = {};
        const title = prompt('Введите имя задачи', 'Новая задача'); // eslint-disable-line no-alert
        if (!title) return;
        todo.title = this.#htmlEntities(title);
        todo.id = Math.random().toString(16).substring(2, 12);
        todo.pomodoro = 0;
        this.active = todo;
        this.#add(todo);
        return todo;
    }

    edit(todo) {
        let title = prompt('Введите новое имя задачи', todo.title); // eslint-disable-line no-alert
        if (!title) return;
        todo.title = this.#htmlEntities(title);
        this.#update(todo);
        return todo;
    }

    delete(todo){
        this.#delete(todo.id);
        this.active = this.list[0] ?? Todo.#TODO;
    }

    increasePomodoro(){
        this.active.pomodoro++;
        this.#update({
            id:       this.active.id,
            pomodoro: this.active.pomodoro,
        });
        return this.active;
    }

    #htmlEntities = str => String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    #leadingZero = num => num < 10 ? `0${num}` : num;

    #formatTime = min => {
        const hour = Math.floor(min / 60);
        min = this.#leadingZero(Math.floor(min % 60));
        return hour ? `${hour} ч ${min} мин` : `${min} мин`;
    };
}
