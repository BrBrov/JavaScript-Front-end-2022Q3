class ActiveElem {
    constructor() {
        this.logo = document.querySelector('.logo');
        this.about = document.querySelector('.link-nav');
        this.email = document.querySelector('.footer-input');
        this.emailBtn = document.querySelector('.footer-form-btn');
        this.btnVolunteers = document.querySelector('.footer-btn');
        this.btnFeed = document.querySelector('.friend-btn');
        this.logoFooter = document.querySelector('.footer-logo');
        this.addListener();
    }

    addListener() {
        this.logo.addEventListener('click', ev => this.reloader(ev));
        this.logoFooter.addEventListener('click', ev => this.reloader(ev));
        this.about.addEventListener('click', ev => this.reloader(ev));
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
        });
        this.email.addEventListener('focus', (ev) => {
            ev.stopImmediatePropagation();
            this.email.value = '';
        });
        this.btnVolunteers.addEventListener('click', ev => this.linkForMain(ev));
        this.btnFeed.addEventListener('click', ev => this.linkForMain(ev));
    }

    linkForMain(ev) {
        ev.stopPropagation();
        document.location.href = '../donate/index.html';
    }

    reloader(ev) {
        window.location.reload();
        ev.stopImmediatePropagation();
    }
}

class ElemsCarouselList {
    constructor(upElems, downElems) {
        this.elems = [];
        [...upElems].forEach(e => this.clone(e));
        [...downElems].forEach(e => this.clone(e));
        return this.elems;
    }

    clone(htmlElem) {
        let clone = htmlElem.cloneNode(true);
        this.elems.push(clone);
    }
}

class Carousel {
    constructor() {
        this.upCarousel = document.getElementsByClassName('upper-carousel')[0].children;
        this.downCarousel = document.getElementsByClassName('down-carousel')[0].children;
        this.elems = new ElemsCarouselList(this.upCarousel, this.downCarousel);
        this._clickCtrl = false;
    }

    adaptiveDesktop() {
        let imgCard = document.querySelectorAll('.card-img');
        let textCard = document.querySelectorAll('.title-animal-card');
        let from = document.querySelectorAll('.animal-from');
        let eat = document.querySelectorAll('.card-eat');
        imgCard[2].src = '../../assets/images/cheetag.jpg';
        textCard[2].textContent = "cheetahs";
        from[2].textContent = 'Native to Africa';
        eat[2].src = '../../assets/icons/meet-fish.svg';
        imgCard[4].src = '../../assets/images/gorilla.jpg';
        textCard[4].textContent = "gorillas";
        from[4].textContent = 'Native to Congo';
        eat[4].src = '../../assets/icons/banana-bamboo.svg';
        imgCard[5].src = '../../assets/images/alligator.jpg';
        textCard[5].textContent = "Alligators";
        from[5].textContent = 'Native to Southeastern U. S.';
        eat[5].src = '../../assets/icons/meet-fish.svg';
    }

    addListenersDesktop() {
        let arrow = this.getArrowElem();
        let value = 3;
        // left click
        arrow[0].addEventListener('click', async (ev) => {
            ev.stopImmediatePropagation();
            if (!this._clickCtrl) {
                this._clickCtrl = true;
                this._leftDelete(value);
                setTimeout(() => {
                    this._createCarouselSixElemLeft();
                    this._clickCtrl = false;
                }, 1500);
            }
        })
        //right click
        arrow[1].addEventListener('click', async (ev) => {
            ev.stopImmediatePropagation();
            if (!this._clickCtrl) {
                this._clickCtrl = true;
                this._rightDelete(value);
                this._createCarouselSixElemRight();
                setTimeout(() => {
                    this._clickCtrl = false;
                }, 1550);
            }
        })
    }

    addListenerTablet() {
        let arrow = this.getArrowElem();
        let value = 2;
        // left click
        arrow[0].addEventListener('touchstart', async (ev) => {
            ev.stopImmediatePropagation();
            if (!this._clickCtrl) {
                this._clickCtrl = true;
                this._leftDelete(value);
                setTimeout(() => {
                    this._createCarouselFourElemLeft();
                    this._clickCtrl = false;
                }, 1500);
            }
        })
        //right click
        arrow[1].addEventListener('touchstart', async (ev) => {
            ev.stopImmediatePropagation();
            if (!this._clickCtrl) {
                this._clickCtrl = true;
                this._rightDelete(value);
                this._createCarouselFourElemRight();
                setTimeout(() => {
                    this._clickCtrl = false;
                }, 1550);
            }
        })
    }

    getArrowElem() {
        let left = document.querySelector('.left-arrow');
        let right = document.querySelector('.right-arrow');
        return [left, right];
    }

    setUpBig() {
        this.upCarousel[3].remove();
        let upperContainer = document.querySelector('.upper-carousel');
        let downContainer = document.querySelector('.down-carousel');
        for (let i = 0; i < 3; i++) {
            upperContainer.append(this.upCarousel[i].cloneNode(true));
            downContainer.append(this.downCarousel[i].cloneNode(true));
        }
        let part = this._generate(6);
        part.forEach((e, i) => {
            if (i < 3) {
                upperContainer.append(e.cloneNode(true));
            } else {
                downContainer.append(e.cloneNode(true));
            }
        })
    }

    setUpSmall() {
        this.upCarousel[3].remove();
        this.upCarousel[2].remove();
        this.downCarousel[2].remove();
        let upperContainer = document.querySelector('.upper-carousel');
        let downContainer = document.querySelector('.down-carousel');
        for (let i = 0; i < 2; i++) {
            upperContainer.append(this.upCarousel[i].cloneNode(true));
            downContainer.append(this.downCarousel[i].cloneNode(true));
        }
        let part = this._generate(4);
        part.forEach((e, i) => {
            if (i < 2) {
                upperContainer.append(e.cloneNode(true));
            } else {
                downContainer.append(e.cloneNode(true));
            }
        })
    }

    _createCarouselSixElemLeft() {
        let upperContainer = document.querySelector('.upper-carousel');
        let downContainer = document.querySelector('.down-carousel');
        let part = this._generate(6);
        part.forEach((e, i) => {
            if (i < 3) {
                upperContainer.append(e.cloneNode(true));
            } else {
                downContainer.append(e.cloneNode(true));
            }
        })
    }

    _createCarouselFourElemLeft() {
        let upperContainer = document.querySelector('.upper-carousel');
        let downContainer = document.querySelector('.down-carousel');
        let part = this._generate(4);
        part.forEach((e, i) => {
            if (i < 2) {
                upperContainer.append(e.cloneNode(true));
            } else {
                downContainer.append(e.cloneNode(true));
            }
        })
    }

    _createCarouselSixElemRight() {
        let upperContainer = document.querySelector('.upper-carousel');
        let downContainer = document.querySelector('.down-carousel');
        let part = this._generate(6);
        part.forEach((e, i) => {
            if (i < 3) {
                setTimeout(() => {
                    upperContainer.insertBefore(e.cloneNode(true), upperContainer.children[0]);

                }, 250)
            } else {
                setTimeout(() => {
                    downContainer.insertBefore(e.cloneNode(true), downContainer.children[0]);
                }, 250)
            }
        })
    }

    _createCarouselFourElemRight() {
        let upperContainer = document.querySelector('.upper-carousel');
        let downContainer = document.querySelector('.down-carousel');
        let part = this._generate(4);
        part.forEach((e, i) => {
            if (i < 2) {
                setTimeout(() => {
                    upperContainer.insertBefore(e.cloneNode(true), upperContainer.children[0]);

                }, 250)
            } else {
                setTimeout(() => {
                    downContainer.insertBefore(e.cloneNode(true), downContainer.children[0]);
                }, 250)
            }
        })
    }

    _leftDelete(value) {
        let timer = setInterval(() => {
            if (value) {
                this.upCarousel[0].remove();
                this.downCarousel[0].remove();
                value--;
            } else {
                clearInterval(timer);
            }
        }, 150);

    }

    _rightDelete(value) {
        let timer = setInterval(() => {
            if (value) {
                this.upCarousel[this.upCarousel.length - 1].remove();
                this.downCarousel[this.downCarousel.length - 1].remove();
                value--;
            } else {
                clearInterval(timer);
            }
        }, 50);
    }

    _generate(number) {
        let block = [];
        let controlUp = new Set();
        for (let i = 0; i < number; i++) {
            controlUp.add(i);
        }
        let index = undefined;
        while (block.length !== number) {
            index = this._random();
            if (controlUp.has(index)) {
                block.push(this.elems[index].cloneNode(true));
                controlUp.delete(index);
            }
        }
        return block;
    }

    _random() {
        return Math.floor(Math.random() * 7);
    }
}

class Testimonials {
    constructor() {
        this.container = document.querySelector('.testimonials-container');
        this.scrollLine = document.querySelector('.testimonials-scroll');
        this.elems = document.getElementsByClassName('testimonials-card');
        // [...document.getElementsByClassName('testimonials-card')].forEach(e=>{
        //     let block = e.cloneNode(true);
        //     this.elems.push(block);
        // });
        this._ctrlRotate = 0;
    }
    setMobileDesktop(){
        this.elems[0].remove();
        this.elems[1].remove();
        let saver = this.elems[3].cloneNode(true);
        this.elems[0].after(saver);
        let ctrl = this.elems.length;
        for (let i = 3; i < ctrl; i++) {
            this.elems[3].remove();
        }
    }
    setSmallDesktop(){
        let saver = this.elems[5].cloneNode(true);
        this.elems[2].remove();
        this.elems[1].after(saver);
    }
    setTabletDesktop(){
        let saver = this.elems[0].cloneNode(true);
        this.elems[0].remove();
        this.elems[this.elems.length - 1].after(saver);
        saver = this.elems[1].cloneNode(true);
        this.elems[1].remove();
        this.elems[this.elems.length - 1].after(saver);
        saver = this.elems[3].cloneNode(true);
        this.elems[0].after(saver);
    }

    addListener() {
        this.scrollLine.addEventListener('input', this._workerSlider.bind(this));
        this.container.addEventListener('wheel', this._wheelListener.bind(this));
    }
    _wheelListener(ev){
        ev.preventDefault();
        if(ev.deltaY > 0){
            if(this.scrollLine.value < 7){
                this._leftRotate();
            }
            this.scrollLine.value = (this.scrollLine.value < 7) ? (this.scrollLine.value = `${Number(this.scrollLine.value) + 1}`) : (this.scrollLine.value = '7');
        }else{
            if(this.scrollLine.value > 0){
                this._rightRotate();
            }
            this.scrollLine.value = (this.scrollLine.value > 0) ? (this.scrollLine.value = `${this.scrollLine.value - 1}`) : (this.scrollLine.value = '0');
        }
        console.dir(this.scrollLine);
    }

    _workerSlider(ev) {
            if (this._ctrlRotate < ev.target.value) {
                this._leftRotate();
            }else{
                this._rightRotate();
            }
        this._ctrlRotate = ev.target.value;
    }
    _leftRotate(){
        let saver = this.elems[0].cloneNode(true);
        this.elems[0].remove()
        this.elems[this.elems.length - 1].after(saver);
    }
    _rightRotate(){
        let saver = this.elems[this.elems.length - 1].cloneNode(true);
        this.elems[this.elems.length - 1].remove();
        this.elems[0].before(saver);
        this._ctrlRotate--;
    }
}

class PopUp{
    constructor() {
        this.menu = document.querySelector('.description');
        this._createPopUp();
    }
    _createPopUp(){
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
        for(let i=0; i < 6; i++){
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
    listener(){
        this.menu.addEventListener('touchstart', this._processing.bind(this));
    }
    _processing(){
            this.menu.addEventListener('touchend', this._showPopUp.bind(this));
            this.background.addEventListener('touchstart',(ev)=>{
                ev.stopPropagation();
                switch(ev.target.className){
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
    _showPopUp(ev){
        let page = document.querySelector('.page');
        page.children[0].before(this.background);
        this.background.appendChild(this.block);
        let open = new KeyframeEffect(this.block,[{top: '-12%'},{top: '0'}],{duration: 1000, fill: 'forwards'});
        let anim = new Animation(open);
        anim.play();
    }
    _closePopUp(ev){
        let close = new KeyframeEffect(this.block, [{top: '0'}, {top:"-12%"}], {duration: 1000, fill: 'forwards'});
        let anim = new Animation(close);
        anim.play();
        anim.onfinish = () =>{
            this.block.remove();
            this.background.remove();
        }
    }
}

window.addEventListener('load', () => {
    let active = new ActiveElem();
})
window.addEventListener('DOMContentLoaded', () => {
    let carousel = new Carousel();
    let testimonials = new Testimonials();
    let width = Math.max(window.innerWidth, document.body.clientWidth || 0);
    if (width > 1001) {
        testimonials.addListener();
        carousel.setUpBig();
        carousel.addListenersDesktop();
    } else if (width < 1001 && width > 640) {
        testimonials.setSmallDesktop();
        testimonials.addListener();
        carousel.adaptiveDesktop();
        carousel.setUpBig();
        carousel.addListenersDesktop();
    } else if (width < 641 && width > 320) {
        let popup = new PopUp();
        popup.listener();
        testimonials.setTabletDesktop();
        carousel.adaptiveDesktop();
        carousel.setUpSmall();
        carousel.addListenerTablet();
    }else{
        let popup = new PopUp();
        popup.listener();
        testimonials.setMobileDesktop();
    }
})
window.addEventListener('resize', () => {
    window.location.reload();
})






