export default class Todo {
    static #STORAGE_NAME = 'pomodoro';
    static #TODO = {
        id:       'default',
        title:    'Все Задачи Выполнены!',
        pomodoro: 0,
    };

    #active;
    #list;

    constructor(options) {
        this.name = options.storageName ?? Todo.#STORAGE_NAME;
        this.list = this.#getList();
        this.active = this.list[0] ?? Todo.#TODO;
    }

    static get default(){
        return this.#TODO;
    }

    get active(){
        return this.#active;
    }
    set active(todo){
        this.#active = todo;
    }

    get list(){
        return this.#list;
    }
    set list(todo){
        this.#list = todo;
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

    get(id) {
        return this.list.find(item => item.id === id);
    }

    add(todo) {
        this.list.push(todo);
        this.#setList(this.list);
        return todo;
    }

    update(todo) {
        const target = this.get(todo.id);
        const updatedTodo = Object.assign(target, todo);
        this.#setList(this.list);
        return updatedTodo;
    }

    delete(id) {
        this.list = this.list.filter(item => item.id !== id);
        this.#setList(this.list);
    }

    create() {
        const todo = {};
        todo.id = Math.random().toString(16).substring(2, 12);
        const title = prompt('Введите имя задачи', 'Новая задача'); // eslint-disable-line no-alert
        todo.title = this.#htmlEntities(title);
        todo.pomodoro = 0;
        this.active = todo;
        this.add(todo);
        return todo;
    }

    #htmlEntities = str => String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
