let testData = null;

let startGame = false;

let answerCount = 0;

let answer = null;

async function locale(language){
    if(language){
        localStorage.setItem('language', language);
    }else{
        let locale = localStorage.getItem('language');
        if(locale){
            return locale
        }else{
            if (/^ru\b/.test(navigator.language)) {
                locale = 'ru';
            }else{
                locale = 'en'
            }
            localStorage.setItem('language', locale);
            return locale;
        }
    }
}

async function getTestArray(language){
    let arr = [];
    if(language === 'en'){
        arr = birdsDataEn;
    }else{
        arr = birdsData;
    }
    let test = []
    arr.forEach(bird =>{
        let ctrl = new Set([0,1,2,3,4,5]);
        let result = [];
        while (ctrl.size !== 0){
            let index = Math.floor(Math.random()*6);
            if(ctrl.has(index)){
                result.push(bird[index]);
                ctrl.delete(index);
            }
        }
        let number = Math.ceil(Math.random()*5);
        let obj = {
            test: result,
            answer: number
        };
        test.push(obj);
    })

    return test;
}

async function translator(lanquage, testData){
    let ru = ["Главная", "Тест", "Галерея", "RU", "Счёт", "Разминка", "Воробьиные", "Лесные птицы", "Певчие птицы", "Хищные птицы", "Морские птицы", "Следующий", "Все права защищены ©, 2022"];
    let en = ["Main", "Quiz", "Gallery", "EN", "Score", "Warm-up", "Sparrows", "Forest birds", "Songbirds", "Birds of prey", "Seabirds", "Next question", "All right reserved ©, 2022"];
    let local = (lanquage === 'en') ? en : ru;
    let test = testData[answerCount].test;
    console.log(testData);
    let elemsArray = [];

    let elem = document.querySelectorAll(".nav-link");
    elem.forEach(el=>{
        elemsArray.push(el);
    })
    elemsArray.push(document.querySelector(".language"));
    elemsArray.push(document.querySelector(".score-text"));
    elem = document.querySelectorAll(".test-label");
    elem.forEach(el=>{
        elemsArray.push(el);
    })
    elemsArray.push(document.querySelector(".next-test"));
    elemsArray.push(document.querySelector(".git-text"));
    elemsArray.forEach((elment, i)=>{
        elment.textContent = local[i];
    })

    elemsArray = [];

    elem = document.querySelectorAll(".answer");
    elem.forEach((el, i)=>{
        el.textContent = test[i].name;
    })
    answer = testData[answerCount].answer;

    console.log(answer);
}

window.addEventListener('DOMContentLoaded', async () =>{
    localStorage.setItem('score', '0');
    localStorage.setItem('mode', null);
    let lang = await locale();
    testData = await getTestArray(lang);
    translator(lang, testData);
})

