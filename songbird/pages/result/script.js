function createElem(tag, nameClass) {
    let elem = document.createElement(tag);
    elem.className = nameClass;
    return elem;
}

class Player {
    constructor(objectData, dataSet) {
        let wrapper = this.createElem('div', 'player-wrapper');
        wrapper.dataset.count = dataSet;
        let playerInfo = this.createElem('div', 'player-info');
        let player = this.createElem('div', 'player');
        // Create info block
        let elem = this.createElem('div', 'bird-name');
        elem.textContent = objectData.name;
        playerInfo.appendChild(elem);
        elem = this.createElem('div', 'bird-latin');
        elem.textContent = objectData.species;
        playerInfo.appendChild(elem);
        elem = this.createElem('div', 'bird-info');
        elem.textContent = objectData.description;
        playerInfo.appendChild(elem);
        //Crate player
        let parentElem = this.createElem('img', 'player-image');
        parentElem.alt = "";
        parentElem.src = objectData.image;
        elem = this.createElem('div', 'player-image-wrapper');
        elem.appendChild(parentElem);
        player.appendChild(elem);
        elem = this.createElem('div', 'timing-wrapper');
        parentElem = this.createElem('span', 'current');
        parentElem.textContent = '00:00';
        elem.appendChild(parentElem);
        let duration = this.createElem('span', 'duration');
        let audio = new Audio(objectData.audio);

        // parentElem.textContent = '00:00';
        elem.appendChild(duration);
        let wrapperElem = this.createElem('div', 'controls-seek');
        let seek = this.createElem('input', 'seek');
        seek.type = 'range';
        seek.min = 0;
        seek.value = 0;
        seek.dataset.count = dataSet;
        audio.ondurationchange = () => {
            let minutes = Math.trunc(audio.duration / 60);
            let seconds = Math.ceil(audio.duration - minutes * 60);
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            duration.textContent = `${minutes}:${seconds}`;
            seek.max = audio.duration;
        }
        wrapperElem.appendChild(seek);
        wrapperElem.appendChild(elem);


        let playerControls = this.createElem('div', 'player-controls');
        playerControls.appendChild(wrapperElem);
        let volumeControls = this.createElem('div', 'controls-volume');
        elem = this.createElem('input', 'volume');
        elem.dataset.count = dataSet;
        elem.type = 'range';
        elem.value = 50;
        elem.min = 0;
        elem.max = 100;
        parentElem = this.createElem('span', 'volume-value');
        parentElem.textContent = '50';
        volumeControls.appendChild(elem);
        volumeControls.appendChild(parentElem);
        playerControls.appendChild(volumeControls);
        wrapperElem = this.createElem('div', 'player-wrapper-btn');
        elem = this.createElem('img', 'player-btn');
        elem.alt = "";
        elem.src = "../../assets/svg/play.svg";
        elem.dataset.count = dataSet;
        wrapperElem.appendChild(elem);
        playerControls.appendChild(wrapperElem);
        player.appendChild(playerControls);
        wrapper.appendChild(player);
        wrapper.appendChild(playerInfo);
        return wrapper;
    }
}

Player.prototype.createElem = createElem;

class BirdsGroup {
    constructor(text) {
        let wrapper = document.createElement('div');
        wrapper.className = "wrapper-label";
        let label = document.createElement('span');
        label.className = "birds-label";
        label.textContent = text;
        wrapper.appendChild(label);
        return wrapper;
    }
}

class WinTemplatePage {
    constructor(main) {
        let wrapper = createElem('div', 'win-image-wrapper');
        let elem = this.createElem('img', 'win-image');
        elem.src = "../../assets/image/win_image.gif";
        elem.alt = "victory";
        wrapper.appendChild(elem);
        main.appendChild(wrapper);
        for (let i = 0; i < 3; i++) {
            elem = this.createElem('span', 'result-win');
            main.appendChild(elem);
        }
        elem = this.createElem('span', 'text-win');
        main.appendChild(elem);
        elem = this.createElem('button', 'to-gallery');
        main.appendChild(elem);
        return main;
    }
}

WinTemplatePage.prototype.createElem = createElem;

class LooseTemplatePage {
    constructor(main) {
        let wrapper = createElem('div', 'loose-image-wrapper');
        let elem = this.createElem('img', 'loose-image');
        elem.src = "../../assets/image/loose_image.gif";
        elem.alt = "loose";
        wrapper.appendChild(elem);
        main.appendChild(wrapper);
        for (let i = 0; i < 3; i++) {
            elem = this.createElem('span', 'result-loose');
            main.appendChild(elem);
        }
        elem = this.createElem('span', 'text-loose');
        main.appendChild(elem);
        elem = this.createElem('button', 'new-quiz');
        main.appendChild(elem);
        return main;
    }
}

LooseTemplatePage.prototype.createElem = createElem;

async function getMode() {
    let mode = localStorage.getItem('mode');
    if (mode === 'gallery' || mode === 'win' || mode === 'loose') {
        return mode;
    } else {
        return undefined;
    }
}

let dataBirds = {};

let listSound = [];

let player = {
    audio: new Audio(),
    play: false,
    count: null,
    control: null,
    node: null
}

async function createData() {
    return {
        ru: birdsData,
        en: birdsDataEn
    }
}

async function locale(language) {
    if (language) {
        localStorage.setItem('language', language);
    } else {
        let locale = localStorage.getItem('language');
        if (locale) {
            return locale
        } else {
            if (/^ru\b/.test(navigator.language)) {
                locale = 'ru';
            } else {
                locale = 'en'
            }
            localStorage.setItem('language', locale);
            return locale;
        }
    }
}

async function translator(language, mode) {
    let ru = ["Главная", "Тест", "Галерея", "RU", "Все права защищены ©, 2022"];
    let en = ["Main", "Quiz", "Gallery", "EN", "All right reserved ©, 2022"];
    let local = (language === 'ru') ? ru : en;
    let elemsArray = [];
    let elem = document.querySelectorAll(".nav-link");
    elem.forEach(el => {
        elemsArray.push(el);
    })
    elemsArray.push(document.querySelector(".language"));
    elemsArray.push(document.querySelector(".git-text"));
    elemsArray.forEach((element, i) => {
        element.textContent = local[i];
    })
    switch (mode) {
        case 'gallery':
            showGallery(language);
            break;
        case 'win':
            showWin(language);
            break;
        case 'loose':
            showLoose(language);
            break;
    }
}

// Functions for building of different pages

async function showGallery(language) {
    let strRu = ["Для разминки", "Воробьиные", "Лесные птицы", "Певчие птицы", "Хищные птицы", "Морские птицы"];
    let strEn = ["For warm-up", "Sparrows", "Forest birds", "Songbirds", "Birds of Prey", "Seabirds"];
    let data = (language === 'ru') ? dataBirds.ru : dataBirds.en;
    let strArr = (language === 'ru') ? strRu : strEn;
    console.log(data);
    let mainBlock = document.querySelector(".main");
    console.dir(mainBlock);
    if (mainBlock.childrenElementCount !== 0) {
        [...mainBlock.children].forEach(elem => {
            elem.remove();
        })
    }
    let dataSetCounter = 0;
    data.forEach((elem, index) => {
        let label = new BirdsGroup(strArr[index]);
        mainBlock.appendChild(label);
        elem.forEach(elem => {
            let insertNode = new Player(elem, dataSetCounter);
            mainBlock.appendChild(insertNode);
            dataSetCounter++;
            listSound.push(elem.audio);
        })
    })
}

async function showWin(language) {
    let main = document.querySelector(".main");
    if (main.childElementCount !== 0) {
        [...main.children].forEach(elem => {
            elem.remove();
        })
    }
    new WinTemplatePage(main);
    let ru = ["Поздравляем!",
        "Вы набрали из \<span class=\"result-win color\"\>6\<\/span\> вопросов \<span class=\"result-win color\"\>30\<\/span\> баллов!",
        "Это максимальное количество баллов!",
        "Вы очень хорошо знаете птиц. Вы можете повторно посмотреть информацию он них у нас в галерее\.",
        "Перейти в галерею"];
    let en = ["Congratulations!",
        "You scored from \<span class=\"result-win color\"\>6\<\/span\> questions \<span class=\"result-win color\"\>30\<\/span\> points!",
        "This is the maximum number of points!",
        "You know birds very well. You can re-view the information about them in our gallery.",
        "Go to Gallery"];
    let local = (language === 'ru') ? ru : en;
    let arrayElements = [];
    let elem = document.querySelectorAll(".result-win");
    elem.forEach(e => {
        arrayElements.push(e);
    })
    elem = document.querySelector(".text-win");
    arrayElements.push(elem);
    elem = document.querySelector(".to-gallery");
    arrayElements.push(elem);
    arrayElements.forEach((element, index) => {
        if (index === 1) {
            element.innerHTML = local[index];
        } else {
            element.textContent = local[index];
        }
    })

}

async function showLoose(language){
    let main = document.querySelector(".main");
    if (main.childElementCount !== 0) {
        [...main.children].forEach(elem => {
            elem.remove();
        })
    }
    new LooseTemplatePage(main);
    let ru = ["Вы проиграли!",
        "Вы набрали из \<span class=\"result-win color\"\>6\<\/span\> вопросов \<span class=\"result-win color\"\>0\<\/span\> баллов!",
        "Максимальное количество баллов - 30!",
        "Вам нужно подтянуть знания. Попробуйте ещё раз пройти тест\.",
        "Попробовать снова?"];
    let en = ["You lost!",
        "You scored from \<span class=\"result-win color\"\>6\<\/span\> questions \<span class=\"result-win color\"\>0\<\/span\> points!",
        "The maximum number of points is 30!",
        "You need to improve your knowledge. Try to take the quiz again\.",
        "Try again?"];
    let local = (language === 'ru') ? ru : en;
    let score = localStorage.getItem('score');
    let arrayElements = [];
    let elem = document.querySelectorAll(".result-loose");
    elem.forEach(e => {
        arrayElements.push(e);
    })
    elem = document.querySelector(".text-loose");
    arrayElements.push(elem);
    elem = document.querySelector(".new-quiz");
    arrayElements.push(elem);
    arrayElements.forEach((element, index) => {
        if (index === 1) {
            element.innerHTML = local[index];
        } else {
            element.textContent = local[index];
        }
    })
    if(score > 0){
        document.querySelectorAll(".color")[1].textContent = score;
    }
}

//Function of controls for pages

async function galleryListener() {
    let main = document.querySelector(".main");
    let arrayOfAllPlayers = document.querySelectorAll(".player-wrapper");

    async function setSeek(e) {
        if (e.target.dataset.count === player.count) {
            player.audio.pause();
            player.audio.currentTime = e.target.value;
        }
    }

    async function playAfter() {
        await player.audio.play();
    }

    let seekElements = main.querySelectorAll(".seek");
    seekElements.forEach(elem => {
        elem.addEventListener('input', setSeek);
        elem.addEventListener('mouseup', playAfter);
    })
    let volumeElements = document.querySelectorAll(".volume");
    volumeElements.forEach(elem => {
        elem.addEventListener('input', (e) => {
            player.audio.volume = e.target.value / 100;
            let volumeValue = e.target.parentElement.querySelector(".volume-value");
            volumeValue.textContent = e.target.value;
        })
    })
    main.addEventListener('click', async (ev) => {
        console.dir(ev.target);
        let count = ev.target.dataset.count;
        let parentNode = null;
        for (const parentNodeElement of arrayOfAllPlayers) {
            let index = parentNodeElement.dataset.count;
            if (index === count) {
                parentNode = parentNodeElement;
                break;
            }
        }

        if (ev.target.className === 'player-btn') {
            if (player.count === count) {
                if (player.play) {
                    player.play = false;
                    ev.target.src = '../../assets/svg/play.svg';
                    player.audio.pause();
                } else {
                    player.play = true;
                    ev.target.src = '../../assets/svg/pause.svg';
                    await player.audio.play();
                }
            } else {
                player.count = count;
                player.audio.load();
                player.audio.src = listSound[count];
                if (player.control) {
                    player.control.src = '../../assets/svg/play.svg';
                }
                ev.target.src = '../../assets/svg/pause.svg';
                player.audio.volume = (parentNode.querySelector(".volume").value / 100);
                player.play = true;
                player.control = ev.target;
                if (player.node) {
                    player.node.querySelector(".seek").value = 0;
                }
                player.node = parentNode;
                player.audio.oncanplaythrough = () => {
                    player.audio.play();
                }
            }
            player.audio.ontimeupdate = () => {
                let current = parentNode.querySelector(".current");
                parentNode.querySelector(".seek").value = player.audio.currentTime;
                let time = player.audio.currentTime;
                let minute = Math.trunc(time / 60);
                let seconds = Math.ceil(time - minute * 60);
                if (minute < 10) {
                    minute = '0' + minute;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                current.textContent = `${minute}:${seconds}`;
            }
        }
    })
}

async function winListener() {
    let btn = document.querySelector(".to-gallery");
    btn.addEventListener('click', () => {
        localStorage.setItem('score', '0');
        localStorage.setItem('mode', 'gallery');
        location.href = "./index.html";
    })
}

async function looseListener(){
    let btn = document.querySelector(".new-quiz");
    btn.addEventListener('click', ()=>{
        localStorage.setItem('mode', null);
        localStorage.setItem('score', '0');
        location.href = "../quiz/index.html";
    })
}

window.addEventListener('DOMContentLoaded', async () => {
    let mode = await getMode();
    if (!mode) {
        localStorage.setItem('score', '0');
        localStorage.setItem('mode', null);
        location.href = "../main/index.html";
    }
    let lang = await locale();
    dataBirds = await createData();
    translator(lang, mode);
    switch (mode) {
        case 'gallery':
            document.querySelector(".container").className += " gallery";
            document.querySelector(".logo").className += " logo-gallery";
            break;
        case 'win':
            document.querySelector(".container").className += " win";
            document.querySelector(".logo").className += " logo-win";
            break;
        case 'loose':
            document.querySelector(".container").className += " loose";
            document.querySelector(".logo").className += " logo-loose";
            break;
        default:
            localStorage.setItem('score', '0');
            localStorage.setItem('mode', null);
            location.href = "../main/index.html";
            break;
    }
})

window.addEventListener('load', async () => {
    function clearLStorage() {
        localStorage.setItem('score', '0');
        localStorage.setItem('mode', null);
    }

    let navLinks = document.querySelectorAll(".nav-link");
    navLinks[0].addEventListener('click', () => {
        clearLStorage();
        location.href = "../main/index.html";
    })
    navLinks[1].addEventListener('click', () => {
        clearLStorage();
        location.href = "../quiz/index.html";
    })
    navLinks[2].addEventListener('click', () => {
        localStorage.setItem('mode', 'gallery');
        localStorage.setItem('score', '0');
        location.href = "./index.html";
    })
    let git = document.querySelector(".git-logo");
    git.addEventListener('click', () => {
        clearLStorage();
        location.href = "https://github.com/BrBrov";
    })
    let rs = document.querySelector(".rsschool");
    rs.addEventListener('click', () => {
        clearLStorage();
        location.href = "https://rs.school/js/";
    })
    let langBtn = document.querySelector(".language");
    langBtn.addEventListener('click', async () => {
        let lang = await locale();
        let mode = await getMode();
        if (lang === 'ru') {
            lang = 'en';
        } else {
            lang = 'ru';
        }
        locale(lang);
        let startRotate = new KeyframeEffect(langBtn,
            [{transform: 'rotateY(0)'}, {transform: 'rotateY(90deg)'}],
            {duration: 500, fill: "forwards"});
        let endRotate = new KeyframeEffect(langBtn,
            [{transform: 'rotateY(90deg)'}, {transform: "rotateY(0deg)"}],
            {duration: 500, fill: "forwards"});
        let anim = new Animation(startRotate, document.timeline);
        anim.play();
        anim.onfinish = async () => {
            await translator(lang, mode);
            anim = new Animation(endRotate, document.timeline);
            anim.play();
        }
    });
    let mode = await getMode();
    switch (mode) {
        case "gallery":
            galleryListener();
            break;
        case 'win':
            player.audio.src = "../../assets/mp3/win.mp3";
            player.audio.autoplay = true;
            player.audio.oncanplaythrough = ()=>{
                player.audio.play()
                    .then(player.audio.load());
            }
            winListener();
            break;
        case 'loose':
            looseListener();
            break;
        default:
            clearLStorage();
            location.href = "../main/index.html";
            break;
    }
})