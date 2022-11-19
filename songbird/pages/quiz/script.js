let testData = null;

let startGame = false;

let answerCount = 0;

let answerValue = null;

let answer = null;

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
    answer = testData[answerCount].answer;
    if (startGame) {
        document.querySelector(".question-answer").textContent = test[answer].name;
    }
    if (startGame === null && answerValue !== null) {
        document.querySelector(".answer-name").textContent = test[answerValue].name;
        document.querySelector(".latin-name").textContent = test[answerValue].species;
        document.querySelector(".answer-description").textContent = test[answerValue].description;
    }
    if (lanquage === 'en') {
        document.querySelector(".text-welcom").textContent = "Choose an answer option to start the quiz";
    } else {
        document.querySelector(".text-welcom").textContent = "Выберите вариант ответа для начала викторины";
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
    console.log(ev.target.parentElement);
    if (ev.target.parentElement.dataset.item || ev.target.dataset.item) {
        if (startGame !== null) {
            document.querySelector(".welcom-game").style.display = 'none';
            document.querySelector(".answer-comment").style.display = 'flex';
            startGame = null;
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
    nav[0].addEventListener('click', goToMain)
    nav[1].addEventListener('click', (ev) => {
        ev.stopPropagation();
        location.reload();
    });
    nav[2].addEventListener('click', (ev) => {
        ev.stopPropagation();
        localStorage.setItem('mode', 'gallery');
        location.href = "../result/index.html";
    })
    let git = document.querySelector(".git-logo");
    git.addEventListener('click', () => {
        location.href = "https://github.com/BrBrov";
    })
    let rs = document.querySelector(".rsschool");
    rs.addEventListener('click', () => {
        location.href = "https://rs.school/js/";
    })
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
            [{ transform: 'rotateY(0)' }, { transform: 'rotateY(90deg)' }],
            { duration: 500, fill: "forwards" });
        let endRotate = new KeyframeEffect(langBtn,
            [{ transform: 'rotateY(90deg)' }, { transform: "rotateY(0deg)" }],
            { duration: 500, fill: "forwards" });
        let anim = new Animation(startRotate, document.timeline);
        anim.play();
        anim.onfinish = async () => {
            await translator(lang, testData);
            anim = new Animation(endRotate, document.timeline);
            anim.play();
        }
    })
    let answersBoard = document.querySelector(".answers");
    answersBoard.addEventListener('click', quizProcessing);
})

