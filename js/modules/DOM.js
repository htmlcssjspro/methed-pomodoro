export default class DOM {
    #$app;

    #$todoList;
    #$todoItemAdd;
    #$todoAddBtn;

    #$headerTitle;
    #$footerTitle;

    #$minutes;
    #$seconds;
    #$count;

    #$navigation;

    #$start;
    #$stop;

    constructor(options) {
        if (options?.app instanceof HTMLElement) {
            this.#$app = options.app;
        } else {
            if (typeof options?.app === 'string') {
                this.#$app = document.querySelector(options.app);
            } else {
                this.#$app = document.querySelector('.app');
            }
            if (this.#$app instanceof HTMLElement === false) {
                this.#$app = this.#createElement('section', {
                    className: 'app'
                });
                document.body.prepend(this.#$app);
            }
        }

        this.#$todoItemAdd = this.#createTodoItemAdd();

        this.#$app.append(
            this.#renderHeader(),
            this.#renderTodo(),
            this.#renderTimer(),
            this.#renderCount(),
            this.#renderFooter()
        );
    }

    get $navigation() {
        return this.#$navigation;
    }
    get $todoAddBtn() {
        return this.#$todoAddBtn;
    }

    #start(event) {
        event.currentTarget.dispatchEvent(new Event('start', { bubbles: true }));
    }
    #stop(event) {
        event.currentTarget.dispatchEvent(new Event('stop', { bubbles: true }));
    }

    #work(event) {
        event.currentTarget.dispatchEvent(new Event('work', { bubbles: true }));
    }
    #break(event) {
        event.currentTarget.dispatchEvent(new Event('break', { bubbles: true }));
    }
    #relax(event) {
        event.currentTarget.dispatchEvent(new Event('relax', { bubbles: true }));
    }

    #todoAdd() {
        document.dispatchEvent(new Event('todoadd', { bubbles: true }));
    }
    #todoActivate(item) {
        document.dispatchEvent(new CustomEvent(
            'todoactivate',
            {
                bubbles: true,
                detail:  item,
            }));
    }
    #todoEdit(item) {
        document.dispatchEvent(new CustomEvent(
            'todoedit',
            {
                bubbles: true,
                detail:  item,
            }));
    }
    #todoDelete(item) {
        document.dispatchEvent(new CustomEvent(
            'tododelete',
            {
                bubbles: true,
                detail:  item,
            }));
    }


    #renderHeader() {
        const $header = this.#createElement('header', {
            className: 'header',
        });

        const $headLine = this.#createElement('div', {
            className: 'header__headline',
        }, {
            parent: $header
        });
        this.#$headerTitle = this.#createElement('h1', {
            className: 'header__title',
        }, {
            parent: $headLine
        });
        this.#createElement('img', {
            className: 'header__logo',
            src:       'img/logo.svg',
            alt:       'Логотип',
        }, {
            parent: $headLine
        });

        this.#$navigation = this.#createElement('div', {
            className: 'navigation',
        }, {
            parent: $header,
            // onclick: this.#navigationHandler,
        });
        this.#createElement('button', {
            className:   'navigation__btn navigation__btn_active',
            textContent: 'Работа',
        }, {
            parent:  this.#$navigation,
            cb:      $btn => $btn.dataset.status = 'work',
            onclick: this.#work,
        });
        this.#createElement('button', {
            className:   'navigation__btn',
            textContent: 'Перерыв',
        }, {
            parent:  this.#$navigation,
            cb:      $btn => $btn.dataset.status = 'break',
            onclick: this.#break,
        });
        this.#createElement('button', {
            className:   'navigation__btn',
            textContent: 'Отдых',
        }, {
            parent:  this.#$navigation,
            cb:      $btn => $btn.dataset.status = 'relax',
            onclick: this.#relax,
        });

        return $header;
    }
    renderHeaderTitle(title) {
        this.#$headerTitle.textContent = title;
    }

    #renderTodo(){
        const $todo = this.#createElement('div', {
            className: 'todo'
        }, {
            append: this.#createElement('h2', {
                className:   'todo__title',
                textContent: 'Задачи',
            })
        });

        this.#$todoList = this.#createElement('ol', {
            className: 'todo__list'
        }, {
            parent: $todo
        });

        return $todo;
    }
    #createTodoItemAdd(){
        const $todoItemAdd = this.#createElement('li', {
            className: 'todo__item'
        });
        this.#$todoAddBtn = this.#createElement('button', {
            className:   'todo__add',
            textContent: 'Добавить новую задачу',
        }, {
            parent:  $todoItemAdd,
            onclick: this.#todoAdd,
        });

        return $todoItemAdd;
    }
    #createTodoItem(item){
        const $todoItem = this.#createElement('li', {
            className: 'todo__item',
        });

        const $wrapper = this.#createElement('div', {
            className: 'todo__item-wrapper',
        });

        const $activateBtn = this.#createElement('button', {
            className:   'todo__activate',
            textContent: item.title,
            ariaLabel:   'Активировать',
        }, {
            onclick: () => this.#todoActivate(item)
        });
        const $editBtn = this.#createElement('button', {
            className: 'todo__edit',
            ariaLabel: 'Редактировать',
        }, {
            onclick: () => this.#todoEdit(item)
        });
        const $delBtn = this.#createElement('button', {
            className: 'todo__del',
            ariaLabel: 'Удалить',
        }, {
            onclick: () => this.#todoDelete(item)
        });

        $wrapper.append($activateBtn, $editBtn, $delBtn);
        $todoItem.append($wrapper);

        return $todoItem;
    }
    renderTodoList(list){
        this.#$todoList.textContent = '';
        this.#$todoList.append(...list.map(this.#createTodoItem.bind(this)));
        this.#$todoList.append(this.#$todoItemAdd);
    }

    #renderTimer(){
        const $timer = this.#createElement('div', {
            className: 'timer',
        });

        const $time = this.#createElement('div', {
            className: 'time',
            innerHTML: '<span>:</span>',
        }, {
            parent: $timer
        });
        this.#$minutes = this.#createElement('p', {
            className: 'time__minutes',
        });
        this.#$seconds = this.#createElement('p', {
            className: 'time__seconds',
        });
        $time.prepend(this.#$minutes);
        $time.append(this.#$seconds);

        return $timer;
    }
    renderTimer(time){
        const { min, sec } = this.#formatTime(time);
        this.#$minutes.textContent = min;
        this.#$seconds.textContent = sec;
    }

    #renderCount(){
        const $count = this.#createElement('div', {
            className: 'count',
        });
        this.#$count = this.#createElement('p', {
            className: 'count__num',
        }, {
            parent: $count,
        });
        this.#createElement('p', {
            className:   'count__text',
            textContent: 'Количество помодорок',
        }, {
            parent: $count,
        });

        return $count;
    }
    renderCount(count){
        this.#$count.textContent = count ?? 0;
    }

    #renderFooter(){
        const $footer = this.#createElement('footer', {
            className: 'footer',
        });

        this.#$footerTitle = this.#createElement('h2', {
            className: 'footer__title',
        }, {
            parent: $footer,
        });

        const $control = this.#createElement('div', {
            className: 'control',
        }, {
            parent: $footer,
        });
        this.#$start = this.#createElement('button', {
            className:   'control__btn control__btn_start',
            textContent: 'Старт'
        }, {
            parent:  $control,
            onclick: this.#start,
        });
        this.#$stop = this.#createElement('button', {
            className:   'control__btn control__btn_stop',
            textContent: 'Cтоп'
        }, {
            parent:  $control,
            onclick: this.#stop,
        });

        return $footer;
    }
    renderFooterTitle(title) {
        this.#$footerTitle.textContent = title ?? 'Все задачи выполнены!';
    }
    renderStart(title) {
        this.#$start.textContent = title;
    }

    renderTodo(todo) {
        this.renderFooterTitle(todo.title);
        this.renderCount(todo.pomodoro);
    }

    renderTitle(status, time) {
        const { min, sec } = this.#formatTime(time);
        document.title = `${status} ${min}:${sec}`;
    }


    #leadingZero = num => num < 10 ? `0${num}` : num;

    #formatTime(time) {
        const min = this.#leadingZero(Math.floor(time / 60));
        const sec = this.#leadingZero(time % 60);
        return { min, sec };
    }

    /**
    *
    * @param {string} tagName
    * @param {Object.<string, (string | boolean)>} attr - Attributes
    * @param {Object} [options={}]
    * @param {HTMLElement} options.parent
    * @param {(HTMLElement | HTMLElement[] | NodeList | HTMLCollection)} options.append
    * @param {Function} options.cb
    */
    #createElement(tagName, attr, { parent, append, onclick, cb } = {}) {
        const element = document.createElement(tagName);
        if (attr) {
            Object.assign(element, attr);
        }

        if (append) {
            if (append instanceof HTMLElement) {
                element.append(append);
            } else if (Array.from(append)?.every(item => item instanceof HTMLElement)) {
                element.append(...append);
            }
        }

        if (parent && parent instanceof HTMLElement) {
            parent.append(element);
        }

        if (onclick && typeof onclick === 'function') {
            element.addEventListener('click', onclick, false);
        }

        if (cb && typeof cb === 'function') {
            cb(element);
        }

        return element;
    }
}
