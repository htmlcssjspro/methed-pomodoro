export default class Storage {
    static #NAME = 'pomodoro';

    constructor(name) {
        this.name = name ?? Storage.#NAME;
        this.list = this.#getList();
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

    getTodo(id) {
        return this.list.find(item => item.id === id);
    }

    addTodo(todo) {
        this.list.push(todo);
        this.setList(this.list);
        return todo;
    }

    updateTodo(todo) {
        const target = this.getTodo(todo.id);
        const updatedTodo = Object.assign(target, todo);
        this.setList(this.list);
        return updatedTodo;
    }

    removeTodo(id) {
        this.list = this.list.filter(item => item.id !== id);
        this.setList(this.list);
    }
}
