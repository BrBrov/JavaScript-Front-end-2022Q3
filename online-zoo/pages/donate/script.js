class ActionElement {
    constructor() {
        this.input = document.querySelector('.input-money');
        this.inputImg = document.querySelector('.input-money-img');
        this.period = document.querySelectorAll('.period-donation');
        this.periodContainer = document.querySelector('.check-period');
        this.checkboxArray = document.querySelector('.checkbox-scale-container')
        this.scale = document.querySelectorAll('.check-scale');
        this.moneyCash = document.querySelectorAll('.value-money');
        this.email = document.querySelector('.footer-input');
        this.emailBtn = document.querySelector('.footer-form-btn');
        this.logo = document.querySelector('.logo');
        this.footerLogo = document.querySelector('.footer-logo');
    }

    inputListener() {
        this.input.addEventListener('input', (ev) => {
            ev.stopPropagation();
            console.log(ev.target.value.length);
            ev.target.value = ev.target.value.replaceAll(/['e',',','.']/gi, '');
            if (ev.target.value.length > 4) {
                ev.target.value = ev.target.value.slice(0, 4);
            }
            if (this.input.validity.valid == false) {
                if (ev.data === null) {
                    if (ev.target.value === 'e' || ev.target.value === ',' || ev.target.value === '.') {
                        ev.target.value = ev.target.value.slice(0, (ev.target.value.length));
                    }
                    this.inputImg.src = '../../assets/icons/dollar-gray.svg';
                    this.input.className = 'input-money';
                } else {
                    this.inputImg.src = '../../assets/icons/dollar-red.svg';
                    this.input.className = ' input-money invalid';
                }
            } else {
                this.inputImg.src = '../../assets/icons/dollar-green.svg';
                this.input.className = 'input-money';
            }
            let ctrlIndex = undefined;
            this.scale.forEach((e, i) => {
                if (e.value == ev.target.value) {
                    e.checked = true;
                    ctrlIndex = i;
                } else {
                    e.checked = false;
                }
            })
            this.moneyCash.forEach((e,i)=>{
                if(i === ctrlIndex){
                    e.children[0].className +=' checked-dollar';
                    e.children[1].className +=' checked-money';
                    this._animation(e.children[1]);
                }else{
                    e.children[0].className ='dollar-money';
                    e.children[1].className ='dollar-value';
                }
            })
        })
    }
    _animation(elem){
        let blink = new KeyframeEffect(elem,[{color: '#ff0000'},{color: '#FE9013'},{color: '#ff0000'},{color: '#FE9013'}, {color: '#ff0000'}, {color: '#FE9013'}],{duration: 500, fill: 'auto', delay: 50});
        let elemAnimation = new Animation(blink);
        elemAnimation.play();
    }

    scaleListener() {
        this.checkboxArray.addEventListener('click', (ev) => {
            ev.stopPropagation();
            let ctrl = undefined;
            this.scale.forEach((e, i) => {
                if (e.value !== ev.target.value) {
                    e.checked = false;
                }else{
                    ctrl = i;
                }
            })
            this.input.value = ev.target.value;
            this.inputImg.src = '../../assets/icons/dollar-green.svg';
            this.moneyCash.forEach((e,i)=>{
                if(i === ctrl){
                    e.children[0].className +=' checked-dollar';
                    e.children[1].className +=' checked-money';
                    this._animation(e.children[1]);
                }else{
                    e.children[0].className ='dollar-money';
                    e.children[1].className ='dollar-value';
                }
            })
        })
    }

    periodListener() {
        this.periodContainer.addEventListener('click', (ev) => {
            ev.stopPropagation();
            console.log(ev.target.value);
            this.period.forEach(e => {
                console.log(e.value);
                if (e.value !== ev.target.value) {
                    e.checked = false;
                } else {
                    e.checked = true;
                }
            })
        })
    }

    emailListener() {
        this.email.addEventListener('blur', (ev) => {
            ev.stopImmediatePropagation();
            if (!this.email.checkValidity() || this.email.value === '') {
                this.email.value = 'Invalid email';
                this.emailBtn.className = 'footer-form-btn mistake';
                setTimeout(() => {
                    this.email.value = 'Enter email';
                }, 2000)
            } else {
                this.emailBtn.className = 'footer-form-btn valid';
                this.emailBtn.addEventListener('click', (evClk) => {
                    evClk.stopPropagation();
                    evClk.target.className = 'footer-form-btn btn-push';
                    setTimeout(() => {
                        evClk.target.className = 'footer-form-btn valid';
                    }, 250);
                    this.emailBtn.removeEventListener('click', () => {
                    });
                })
            }
        })
        this.email.addEventListener('focus', (ev) => {
            ev.stopImmediatePropagation();
            this.email.value = '';
        })
    }

    logoListener() {
        this.logo.addEventListener('click', (ev) => {
            ev.stopPropagation();
            document.location.href = '../main/index.html';
        })
    }

    footerLogoListener() {
        this.footerLogo.addEventListener('click', (ev) => {
            ev.stopPropagation();
            document.location.href = '../main/index.html';
        })
    }
}

class PopUp {
    constructor() {
        this.menu = document.querySelector('.description');
        this._createPopUp();
    }

    _createPopUp() {
        this.background = document.createElement('div');
        this.background.className = 'popup-background';
        this.block = document.createElement('div');
        this.block.className = 'popup-block';
        let elem = document.createElement('div');
        elem.className = 'logo-container-popup';
        this.block.appendChild(elem);
        elem = document.createElement('div');
        elem.className = 'logo-popup';
        this.block.children[0].appendChild(elem);
        elem = document.createElement('span');
        elem.className = 'logo-title-popup';
        elem.textContent = 'Pet Story online';
        this.block.children[0].children[0].appendChild(elem);
        elem = document.createElement('div');
        elem.className = 'popup-close';
        this.block.children[0].appendChild(elem);
        elem = document.createElement('div');
        elem.className = 'popup-container';
        this.block.appendChild(elem);
        let nav = document.createElement('ul');
        nav.className = 'navigation-popup';
        this.block.children[1].appendChild(nav);
        elem = document.createElement('li');
        elem.className = 'popup-list';
        for (let i = 0; i < 6; i++) {
            let saver = elem.cloneNode(true);
            nav.appendChild(saver);
        }
        elem = document.createElement('a');
        elem.className = 'popup-link';
        let names = ['About', 'Map', 'Zoos', 'Donate', 'Contact us', 'Designed by ©'];
        for (let i = 0; i < 6; i++) {
            let saver = elem.cloneNode(true);
            saver.textContent = names[i];
            saver.href = '#';
            nav.children[i].appendChild(saver);
        }
        nav.children[0].children[0].href = 'index.html';
        nav.children[3].children[0].href = '../donate/index.html';
        nav.children[5].children[0].href = 'https://www.figma.com/file/ypzT9idgAILaSRVRmDAJxn/online-zoo-3-weeks';
    }

    listener() {
        this.menu.addEventListener('touchstart', this._processing.bind(this));
    }

    _processing() {
        this.menu.addEventListener('touchend', this._showPopUp.bind(this));
        this.background.addEventListener('touchstart', (ev) => {
            ev.stopPropagation();
            switch (ev.target.className) {
                case 'popup-close':
                case 'popup-background':
                    this._closePopUp();
                    break;
                case 'logo-popup':
                case 'logo-title-popup':
                    window.location.href = 'index.html';
                    break;
            }
        })
    }

    _showPopUp(ev) {
        let page = document.querySelector('.page');
        page.children[0].before(this.background);
        this.background.appendChild(this.block);
        let open = new KeyframeEffect(this.block, [{top: '-15%'}, {top: '0'}], {duration: 1000, fill: 'forwards'});
        let anim = new Animation(open);
        anim.play();
    }

    _closePopUp(ev) {
        let close = new KeyframeEffect(this.block, [{top: '0'}, {top: "-15%"}], {duration: 1000, fill: 'forwards'});
        let anim = new Animation(close);
        anim.play();
        anim.onfinish = () => {
            this.block.remove();
            this.background.remove();
        }
    }
}

window.addEventListener('load', () => {
    let action = new ActionElement();
    action.inputListener();
    action.scaleListener();
    action.periodListener();
    action.emailListener();
    action.logoListener();
    action.footerLogoListener();
})

window.addEventListener('DOMContentLoaded', () => {
    let width = Math.max(window.innerWidth, document.body.clientWidth || 0);
    if (width > 1001) {

    } else if (width < 1001 && width > 640) {

    } else if (width < 641 && width > 320) {
        let popup = new PopUp();
        popup.listener();
    } else {
        let popup = new PopUp();
        popup.listener();
    }
})
window.addEventListener('resize', () => {
    window.location.reload();
})