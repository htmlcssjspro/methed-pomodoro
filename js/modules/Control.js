export default class Control {
    constructor(options) {
        this.$navigation = options.$navigation;

        document.addEventListener('work', this.statusHandler.bind(this), false);
        document.addEventListener('break', this.statusHandler.bind(this), false);
        document.addEventListener('relax', this.statusHandler.bind(this), false);
    }

    statusHandler({ target }){
        this.$navigation.querySelector('.navigation__btn_active')
            ?.classList.remove('navigation__btn_active');
        target?.classList.add('navigation__btn_active');
    }

    changeActiveBtn(status) {
        this.$navigation.querySelector('.navigation__btn_active')
            ?.classList.remove('navigation__btn_active');
        this.$navigation.querySelector(`.navigation__btn[data-status=${status}]`)
            ?.classList.add('navigation__btn_active');
    }
}
