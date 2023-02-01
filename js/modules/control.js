import { state } from './state.js';
import { showTime, timerStart, timerStop } from './timer.js';

export const $startBtn = document.querySelector('.control__btn_start');
export const $stopBtn = document.querySelector('.control__btn_stop');
const $btnList = document.querySelectorAll('.navigation__btn');
// const $navigation = document.querySelector('.navigation');

export const changeActiveBtn = dataUse => {
    $btnList.forEach(($btn, i, list) => {
        if (list[i].dataset.use === dataUse) {
            $btn?.classList.add('navigation__btn_active');
        } else {
            $btn?.classList.remove('navigation__btn_active');
        }
    });

    // $navigation.querySelector('.navigation__btn_active')?.classList.remove('navigation__btn_active');
    // $navigation.querySelector(`.navigation__btn[data-use=${dataUse}]`)?.classList.add('navigation__btn_active');
};

export const controlInit = () => {
    $startBtn.addEventListener('click', () => {
        if (state.isActive) {
            clearTimeout(state.timerId);
            state.isActive = false;
            $startBtn.textContent = 'Продолжить';
        } else {
            state.isActive = true;
            $startBtn.textContent = 'Пауза';
            timerStart();
        }
    }, false);

    $stopBtn.addEventListener('click', timerStop, false);

    $btnList.forEach($btn => {
        $btn.addEventListener('click', event => {
            const status = event.currentTarget?.dataset.use;
            changeActiveBtn(status);
            state.status = status;
            if (status === 'relax') {
                //
            }
            state.timeLeft = state[state.status] * 60;
            showTime();
        }, false);
    });
};
