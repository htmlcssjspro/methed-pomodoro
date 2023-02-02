import { state } from './state.js';


const $todoList = document.querySelector('.todo__list');
const $title = document.querySelector('.title');
export const $countNum = document.querySelector('.count__num');

const $todoItemAdd = document.createElement('li');
$todoItemAdd.className = 'todo__item';
const $todoAddBtn = document.createElement('button');
$todoAddBtn.className = 'todo__add';
$todoAddBtn.textContent = 'Добавить новую задачу';
$todoItemAdd.append($todoAddBtn);

const htmlEntities = str => String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const getTodoList = () => {
    let todoList = localStorage.getItem('pomodoro');
    return todoList ? JSON.parse(todoList) : [];
};

const showTodoActive = () => {
    $title.textContent = state.todoActive.title;
    $countNum.textContent = state.todoActive.pomodoro;
};

const activateTodo = todo => {
    state.todoActive = todo;
    showTodoActive();
};

const createTodo = todo => {
    const $todoItem = document.createElement('li');
    $todoItem.className = 'todo__item';

    const $todoItemWrapper = document.createElement('div');
    $todoItemWrapper.className = 'todo__item-wrapper';

    const $todoBtn = document.createElement('button');
    $todoBtn.className = 'todo__btn';
    $todoBtn.textContent = todo.title;

    const $editBtn = document.createElement('button');
    $editBtn.className = 'todo__edit';
    $editBtn.ariaLabel = 'Редактировать';

    const $delBtn = document.createElement('button');
    $delBtn.className = 'todo__del';
    $delBtn.ariaLabel = 'Удалить';

    $todoItemWrapper.append($todoBtn, $editBtn, $delBtn);
    $todoItem.append($todoItemWrapper);

    $todoBtn.addEventListener('click', () => {
        activateTodo(todo);
    }, false);

    $editBtn.addEventListener('click', () => {
        let title = prompt('Введите новое имя задачи', todo.title); // eslint-disable-line no-alert
        title = htmlEntities(title);

        // const todo = {
        //     title,
        //     pomodoro: 0,
        //     id:       Math.random().toString(16).substring(2, 8)
        // };


        let todoList = getTodoList();
        todoList = todoList.map(item => {
            if (item.id === todo.id) {
                item.title = title;
                activateTodo(item);
            }
            return item;
        });
        localStorage.setItem('pomodoro', JSON.stringify(todoList));
        renderTodoList();
    }, false);

    $delBtn.addEventListener('click', () => {
        let todoList = getTodoList();
        // todoList.splice(todoList.indexOf(todo), 1); // Slower
        todoList = todoList.filter(item => item.id !== todo.id); // Faster
        localStorage.setItem('pomodoro', JSON.stringify(todoList));
        renderTodoList();
        // OR
        // $todoItem.remove();
    }, false);

    return $todoItem;
};

const renderTodoList = () => {
    const todoList = getTodoList();
    $todoList.textContent = '';
    $todoList.append(...todoList.map(createTodo));
    $todoList.append($todoItemAdd);
};


const addTodo = () => {
    let title = prompt('Введите имя задачи', 'Новая задача'); // eslint-disable-line no-alert
    title = htmlEntities(title);

    const todo = {
        title,
        pomodoro: 0,
        id:       Math.random().toString(16).substring(2, 8)
    };

    activateTodo(todo);

    const todoList = getTodoList();
    todoList.push(todo);
    localStorage.setItem('pomodoro', JSON.stringify(todoList));
    renderTodoList();
};


export const todoInit = () => {
    const todoList = getTodoList();
    if (todoList.length) {
        activateTodo(todoList[0]);
    } else {
        showTodoActive();
    }
    renderTodoList();

    $todoAddBtn.addEventListener('click', addTodo, false);
};
