export default class Control {
    constructor(options) {
        // this.state = options.state;
        this.$navigation = options.$navigation;

        document.addEventListener('work', this.handler.bind(this), false);
        document.addEventListener('break', this.handler.bind(this), false);
        document.addEventListener('relax', this.handler.bind(this), false);
    }

    handler(event){
        this.$navigation.querySelector('.navigation__btn_active')?.classList.remove('navigation__btn_active');
        event.target?.classList.add('navigation__btn_active');
        // this.state.status = event.type;

        // document.dispatchEvent(new CustomEvent('navigationstatusset', { detail: { status: event.type } }));
    }

    changeActiveBtn(status) {
        this.$navigation.querySelector('.navigation__btn_active')?.classList.remove('navigation__btn_active');
        this.$navigation.querySelector(`.navigation__btn[data-status=${status}]`)?.classList.add('navigation__btn_active');
    }

    // handleNavigation($navigation){
    //     this.$navigation = $navigation;
    //     $navigation.addEventListener('click', this.onNavigationClick.bind(this), false);
    // }

    // onNavigationClick(event) {
    //     const $btn = event.target.closest('.navigation__btn');
    //     if (!$btn) return;

    //     const status = $btn?.dataset.status;
    //     this.changeActiveBtn(status);
    //     document.dispatchEvent(new CustomEvent('navigationstatusset', { detail: { status } }));
    // }
}
