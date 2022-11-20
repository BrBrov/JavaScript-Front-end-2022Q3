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
            if(minutes<10){
                minutes = '0' + minutes;
            }
            if(seconds<10){
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

    createElem(tag, nameClass) {
        let elem = document.createElement(tag);
        elem.className = nameClass;
        return elem;
    }
}

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


//Function of controls for pages

async function galleryListener() {
    let main = document.querySelector(".main");
    let arrayOfAllPlayers = document.querySelectorAll(".player-wrapper");
    async function setSeek(e){
        if(e.target.dataset.count === player.count){
            player.audio.pause();
            player.audio.currentTime = e.target.value;
        }
    }
    async function playAfter(){
        await player.audio.play();
    }
    let seekElements = main.querySelectorAll(".seek");
    seekElements.forEach(elem=>{
        elem.addEventListener('input', setSeek);
        elem.addEventListener('mouseup', playAfter);
    })
    let volumeElements = document.querySelectorAll(".volume");
    volumeElements.forEach(elem=>{
        elem.addEventListener('input', (e)=>{
            player.audio.volume = e.target.value/100;
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

window.addEventListener('DOMContentLoaded', async () => {
    let mode = await getMode();
    if (!mode) {
        location.href = "../main/index.html";
    }
    dataBirds = await createData();
    console.log(dataBirds);
    let lang = await locale();
    translator(lang, mode);
})
window.addEventListener('load', async () => {
    let mode = await getMode();
    switch (mode) {
        case "gallery":
            galleryListener();
            break;
    }
})