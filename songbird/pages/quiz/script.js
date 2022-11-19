let testData = null;

let startGame = false;

let answerCount = 0;

let answerValue = null;

let answer = null;

let player = {
    audio: new Audio(),
    mode: false,
    volume: 0.5
}
let mainPlayer = {
    audio: new Audio(),
    mode: false,
    volume: 0.5
}

let flagBtnNext = false;

let countScore = 5;

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

async function getTestArray() {
    let test = []
    birdsDataEn.forEach((bird, i) => {
        let ctrl = new Set([0, 1, 2, 3, 4, 5]);
        let result = [];
        let tResult = [];
        while (ctrl.size !== 0) {
            let index = Math.floor(Math.random() * 6);
            if (ctrl.has(index)) {
                result.push(bird[index]);
                tResult.push(birdsData[i][index])
                ctrl.delete(index);
            }
        }
        let number = Math.ceil(Math.random() * 6);
        let obj = {
            en: result,
            ru: tResult,
            answer: number
        };
        test.push(obj);
    })


    return test;
}

async function translator(lanquage, testData) {
    let ru = ["Главная", "Тест", "Галерея", "RU", "Счёт", "Разминка", "Воробьиные", "Лесные птицы", "Певчие птицы", "Хищные птицы", "Морские птицы", "Следующий", "Все права защищены ©, 2022"];
    let en = ["Main", "Quiz", "Gallery", "EN", "Score", "Warm-up", "Sparrows", "Forest birds", "Songbirds", "Birds of prey", "Seabirds", "Next question", "All right reserved ©, 2022"];
    let local = (lanquage === 'en') ? en : ru;
    let test = testData[answerCount];
    test = test[lanquage];
    let elemsArray = [];

    let elem = document.querySelectorAll(".nav-link");
    elem.forEach(el => {
        elemsArray.push(el);
    })
    elemsArray.push(document.querySelector(".language"));
    elemsArray.push(document.querySelector(".score-text"));
    elem = document.querySelectorAll(".test-label");
    elem.forEach(el => {
        elemsArray.push(el);
    })
    elemsArray.push(document.querySelector(".next-test"));
    elemsArray.push(document.querySelector(".git-text"));
    elemsArray.forEach((elment, i) => {
        elment.textContent = local[i];
    })

    elemsArray = [];

    elem = document.querySelectorAll(".answer");
    elem.forEach((el, i) => {
        el.textContent = test[i].name;
    })
    if(answerCount >= 5){
        if(lanquage === 'ru'){
            document.querySelector(".next-test").textContent = "Результат";
        }else{
            document.querySelector(".next-test").textContent = "Result";
        }
    }
    answer = testData[answerCount].answer;
    if (startGame) {
        document.querySelector(".question-answer").textContent = test[answer-1].name;
    }
    if (answerValue !== null) {
        document.querySelector(".answer-name").textContent = test[answerValue].name;
        document.querySelector(".latin-name").textContent = test[answerValue].species;
        document.querySelector(".answer-description").textContent = test[answerValue].description;
    }
    if (lanquage === 'en') {
        document.querySelector(".text-welcom").textContent = "Choose an answer option to start the quiz";
    } else {
        document.querySelector(".text-welcom").textContent = "Выберите вариант ответа для начала викторины";
    }
    mainPlayer.audio.src = test[answer - 1].audio;
    mainPlayer.audio.volume = mainPlayer.volume;
    mainPlayer.audio.ondurationchange = () =>{
        let duration = mainPlayer.audio.duration;
        document.querySelector(".main-seek").max = duration;
        let minutes = Math.trunc(duration/60);
        let seconds = Math.ceil(duration - minutes*60);
        if(minutes < 10){
            minutes = '0' + minutes;
        }
        if(seconds < 10){
            seconds = '0' + seconds;
        }
        document.querySelector(".main-duration").textContent = `${minutes}:${seconds}`;
    }
}

async function goToMain(ev) {
    ev.stopPropagation();
    localStorage.setItem('score', '0');
    localStorage.setItem('mode', 'null');
    location.href = "../main/index.html";
}

async function quizProcessing(ev) {
    ev.stopPropagation();
    await player.audio.load();
    answerValue = ev.target.dataset.item || ev.target.parentElement.dataset.item;
    if (answerValue) {
        if (startGame !== null) {
            document.querySelector(".welcom-game").style.display = 'none';
            document.querySelector(".answer-comment").style.display = 'flex';
            startGame = null;
        }
        let lang = await locale();
        let data = testData[answerCount][lang];
        document.querySelector(".answer-image").src = data[answerValue].image;
        document.querySelector(".answer-name").textContent = data[answerValue].name;
        document.querySelector(".latin-name").textContent = data[answerValue].species;
        document.querySelector(".answer-description").textContent = data[answerValue].description;
        player.audio.src = data[answerValue].audio;
        player.audio.ondurationchange = () =>{
            let durationTime = player.audio.duration;
            document.querySelector(".answer-duration").textContent = `${Math.trunc(durationTime / 60)}:${Math.ceil(durationTime - ((Math.trunc(durationTime / 60)) * 60))}`;
            document.querySelector(".answer-block").max = durationTime;
        }
        document.querySelector(".answer-block").value = 0;
        document.querySelector(".answer-volume").value = 50;
        if (answerValue == (answer - 1)) {
            startGame = true;
            document.querySelectorAll(".answer-wrapper")[answerValue].className = 'answer-wrapper correct';
            let sound = new Audio('../../assets/mp3/correct.mp3');
            sound.volume = 0.5;
            sound.onloadeddata = () => {
                sound.play();
            }
            document.querySelectorAll(".mark")[answerValue].src = '../../assets/svg/correct.svg';
            flagBtnNext = true;
            document.querySelector(".next-test").className = "next-test active";
            document.querySelector(".question-image").src = data[answerValue].image;
            let totalScore = Number(localStorage.getItem('score'));
            totalScore += countScore;
            document.querySelector(".score").textContent = `${totalScore}`;
            localStorage.setItem('score', totalScore);
            countScore = 5;
            document.querySelector(".question-answer").textContent = testData[answerCount][lang][answer - 1].name;
            mainPlayer.audio.pause();
            player.audio.pause();
        } else {
            if (!flagBtnNext) {
                document.querySelectorAll(".answer-wrapper")[answerValue].className = 'answer-wrapper incorrect';
                let sound = new Audio('../../assets/mp3/error.mp3');
                sound.volume = 0.5;
                sound.onloadeddata = () => {
                    sound.play();
                }
                document.querySelectorAll(".mark")[answerValue].src = '../../assets/svg/wrong.svg';
                countScore--;
            }
        }
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    localStorage.setItem('score', '0');
    localStorage.setItem('mode', null);
    let lang = await locale();
    testData = await getTestArray(lang);
    translator(lang, testData);
})

window.addEventListener('load', async () => {
    let nav = document.querySelectorAll(".nav-link");
    // link to main
    nav[0].addEventListener('click', goToMain);
    // link on quiz
    nav[1].addEventListener('click', (ev) => {
        ev.stopPropagation();
        location.reload();
    });
    // link to gallery
    nav[2].addEventListener('click', (ev) => {
        ev.stopPropagation();
        localStorage.setItem('mode', 'gallery');
        location.href = "../result/index.html";
    });
    // link to git
    let git = document.querySelector(".git-logo");
    git.addEventListener('click', () => {
        location.href = "https://github.com/BrBrov";
    })
    //link to rsshool
    let rs = document.querySelector(".rsschool");
    rs.addEventListener('click', () => {
        location.href = "https://rs.school/js/";
    })
    //botton for translate page;
    let langBtn = document.querySelector(".language");
    langBtn.addEventListener('click', async () => {
        let lang = await locale();
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
            await translator(lang, testData);
            anim = new Animation(endRotate, document.timeline);
            anim.play();
        }
    });
    // Listener for variants of answers
    let answersBoard = document.querySelector(".answers");
    answersBoard.addEventListener('click', quizProcessing);
    //Play/Pause sound of answers
    let imgPlay = document.querySelector(".image-of-answer");
    imgPlay.addEventListener('click', async () => {
        if(mainPlayer.mode === true){
            mainPlayer.mode = false;
            document.querySelector(".play").src = "../../assets/svg/play.svg";
            await mainPlayer.audio.pause();
        }
        player.audio.volume = player.volume;
        if (player.mode) {
            imgPlay.src = "../../assets/svg/play.svg";
            player.audio.load();
            player.mode = false;
        } else {
            imgPlay.src = "../../assets/svg/pause.svg";
            await player.audio.play();
            player.mode = true;
        }
        player.audio.ontimeupdate = () => {
            let current = player.audio.currentTime;
            let minutes = Math.trunc(current / 60);
            let seconds = Math.ceil(current - ((Math.trunc(current / 60)) * 60));
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            document.querySelector(".answer-current").textContent = `${minutes}:${seconds}`;
            document.querySelector(".answer-block").value = current;
        }
        player.audio.onended = () => {
            player.audio.pause();
            player.audio.currentTime = 0;
            document.querySelector(".image-of-answer").src = "../../assets/svg/play.svg";
            document.querySelector(".answer-block").value = "00:00";
        }
    });
    // Play/pause sound of question
    let btnQuestion = document.querySelector(".play");
    btnQuestion.addEventListener('click', async () => {
        if(player.mode === true){
            player.mode = false;
            document.querySelector(".image-of-answer").src = "../../assets/svg/play.svg";
            await player.audio.pause();
        }
        if (mainPlayer.mode) {
            mainPlayer.audio.pause();
            mainPlayer.mode = false;
            document.querySelector(".play").src = '../../assets/svg/play.svg';
        } else {
            mainPlayer.audio.play();
            mainPlayer.mode = true;
            document.querySelector(".play").src = '../../assets/svg/pause.svg';
        }
        mainPlayer.audio.onended = () => {
            mainPlayer.audio.pause();
            mainPlayer.audio.currentTime = 0;
            document.querySelector(".main-seek").value = 0;
            document.querySelector(".main-current").textContent = '00:00';
            document.querySelector(".play").src = '../../assets/svg/play.svg';
        }
        mainPlayer.audio.ontimeupdate = () => {
            let currentPos = mainPlayer.audio.currentTime;
            let minutes = Math.trunc(currentPos / 60);
            let seconds = Math.ceil(currentPos - ((Math.trunc(currentPos / 60)) * 60));
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            document.querySelector(".main-current").textContent = `${minutes}:${seconds}`;
            document.querySelector(".main-seek").value = currentPos;
        }
    });
    let rangeQuestion = document.querySelector(".main-seek");
    //Input position of question player
    rangeQuestion.addEventListener('input', async ()=>{
        mainPlayer.audio.volume = 0;
        mainPlayer.audio.currentTime = rangeQuestion.value;
    });
    rangeQuestion.addEventListener('mouseup', async ()=>{
        mainPlayer.audio.volume = mainPlayer.volume;
    })
    //Volume of question player
    let volumeQuestion = document.querySelector(".main-volume");
    volumeQuestion.addEventListener('input', async ()=>{
        let volume = document.querySelector(".main-volume").value;
        document.querySelector('.main-value').textContent = volume;
        mainPlayer.volume = volume/100;
        mainPlayer.audio.volume = volume/100;
    });
    // Seek of answers player
    let rangeAnswers = document.querySelector(".answer-block");
    rangeAnswers.addEventListener('input', async ()=>{
        player.audio.volume = 0;
        player.audio.currentTime = rangeAnswers.value;
    });
    rangeAnswers.addEventListener('mouseup', async ()=>{
        player.audio.volume = player.volume;
    });
    // Volume of answer player
    let volumeAnswer = document.querySelector(".answer-volume");
    volumeAnswer.addEventListener('input', async ()=>{
        player.audio.volume = volumeAnswer.value/100;
        player.volume = player.audio.volume;
        document.querySelector(".answer-value").textContent = volumeAnswer.value;
    });
    // Next question after correct answer
    let btnNext = document.querySelector(".next-test");
    btnNext.addEventListener('click', async (ev)=>{
        ev.stopPropagation();
        if(flagBtnNext){
            if(answerCount < 5){
                answerCount++;
                flagBtnNext = false;
                startGame = false;
                countScore = 5;
                answerValue = null;
                answer = null;
                let lang = await locale();
                translator(lang, testData);
                document.querySelector(".next-test").className = 'next-test inactive';
                document.querySelectorAll(".test-label")[answerCount].className += " check-round";
                let answers = document.querySelectorAll(".answer-wrapper");
                answers.forEach(elem=>{
                    elem.className = 'answer-wrapper';
                })
                answers = document.querySelectorAll(".mark");
                answers.forEach(elem=>{
                    elem.src = "../../assets/svg/unchecked.svg";
                })
                document.querySelector(".question-image").src = "../../assets/svg/ask.svg";
                document.querySelector(".question-answer").textContent = "********";
                document.querySelector(".welcom-game").style.display = 'flex';
                document.querySelector(".answer-comment").style.display = 'none';
                document.querySelector(".play").src = "../../assets/svg/play.svg";
                document.querySelector(".image-of-answer").src = "../../assets/svg/play.svg";
                mainPlayer.audio.load();
                mainPlayer.mode = false;
                player.audio.load();
                player.mode = false;
            }else{
                let result = Number(localStorage.getItem('score'));
                if(result < 25){
                    localStorage.setItem('mode', 'loose');
                }else{
                    localStorage.setItem('mode', 'win');
                }
                location.href = "../result/index.html";
            }

        }
    })
})

