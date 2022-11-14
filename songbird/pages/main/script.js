async function localeSettings(locale) {
    if (locale) {
        localStorage.setItem('language', locale);
    } else {
        let local = localStorage.getItem('language');
        if (local) {
            return local;
        } else {
            if(/^en\b/.test(navigator.language)){
                local = 'en';
            }else{
                local = 'ru';
            }
            console.log(navigator.language);
            localStorage.setItem('language', local);
            return local;
        }
    }
}

async function getReference() {
    let elemsArray = [];
    let navLink = document.querySelectorAll(".nav-link");
    navLink.forEach(e => {
        elemsArray.push(e);
    })
    elemsArray.push(document.querySelector(".language"));
    elemsArray.push(document.querySelector(".text-intro"));
    elemsArray.push(document.querySelector(".start-quiz"));
    elemsArray.push(document.querySelector(".text-git"));
    return elemsArray;
}

async function setPageText(locale) {
    let stringRussian = ["➧ Главная", "➧ Тест", "➧ Зал славы","RU",
        "Многие помнят давно известные песни русских исполнителей. Но не все знают, " +
        "что некоторый русский рок - это зарубежные хиты. В то время даже попсой не брезговали. " +
        "Конечно же, многие указывали в своих альбомах, что это кавер или переделка на определённого " +
        "исполнителя. Например, Юрий Клинский (Хой) из Сектор газа частенько переделывал песни на музыку " +
        "известных западных исполнителей, периодически указывая автора песни или мелодии. " +
        " Ну а некоторые и вовсе не стеснялись \"заимствовать\" песни на то время " +
        "малоизвестных западных исполнителей из-за \"железного занавеса\" СССР. А вызнаете " +
        "этии композиции? Мы не обвиняем никого в плагиате, предлагаем пройти викторину и угадать, на какую песню " +
        "нашего исполнителя \"похожа\" песня зарубежной группы.",
        "Начать тест", "Все права защищены ⓒ, 2022"];

    let stringEnglish = ["➧ Main", "➧ Quiz", "➧ Music gallery", "EN",
        "Many remember the long-known songs of Russian performers. " +
        "But not everyone knows, that some Russian rock is foreign hits. " +
        "At that time, even pop was not disdained. Of course, many have " +
        "indicated in their albums that this is a cover or alteration of " +
        "a certain Artist. For example, Yuri Klinsky (Khoy) from Gaza Strip " +
        "often remade songs to music. famous Western performers, periodically " +
        "indicating the author of the song or melody. Well, some did not hesitate " +
        "to \"borrow\" songs at that time. little-known Western performers because " +
        "of the \"Iron Curtain\" of the USSR. And you know these compositions? " +
        "We do not accuse anyone of plagiarism, we offer to take a quiz and " +
        "guess which song our artist is \"similar\" to a song by a foreign band.",
        "Start quiz", "All rights reserved ⓒ, 2022"];

    let elemsArray = await getReference();

    let stringReference = [];

    if (locale === 'en') {
        stringReference = stringEnglish;
    } else {
        stringReference = stringRussian;
    }

    for (const str of stringReference) {
        const i = stringReference.indexOf(str);
        elemsArray[i].textContent = str;
    }

}

async function translate(ev) {
    let locale = await localeSettings();
    await setPageText(locale);
}

async function proc(){
    function toQuiz(ev){
        ev.stopPropagation();
        localStorage.setItem('result', null);
        location.href = "../game/index.html";
    }
    let navLink = document.querySelectorAll(".nav-link");
    navLink[0].addEventListener('click', (ev)=>{
        ev.stopPropagation();
        location.reload();
    })
    navLink[1].addEventListener('click', toQuiz);
    navLink[2].addEventListener('click', (ev)=>{
        ev.stopPropagation();
        localStorage.setItem('mode', 'gallery');
        location.href = "../result/index.html";
    })
    let btnStartQuiz = document.querySelector(".start-quiz");
    btnStartQuiz.addEventListener('click', toQuiz);
    let gitLink = document.querySelector(".git-logo");
    gitLink.addEventListener('click', ()=>{
        location.href = "https://github.com/BrBrov";
    })
    let rsLink = document.querySelector(".school");
    rsLink.addEventListener('click', ()=>{
        location.href = "https://rs.school/js/";
    })
    let lang = document.querySelector(".language");
    lang.addEventListener('click', async (ev)=>{
        ev.stopPropagation();
        let locale = await localeSettings();
        if(locale === 'en'){
            locale = 'ru';
            localeSettings(locale)
        }else{
            locale = 'en';
            localeSettings(locale);
        }
        let startRotate  = new KeyframeEffect(lang,
            [{transform:'rotateY(0)'},{transform: 'rotateY(90deg)'}],
            {duration: 500, fill: "forwards"});
        let endRotate = new KeyframeEffect(lang,
            [{transform:'rotateY(90deg)'},{transform: "rotateY(0deg)"}],
            {duration: 500, fill: "forwards"});
        let anim = new Animation(startRotate, document.timeline);
        anim.play();
        anim.onfinish = async () =>{
            await setPageText(locale);
            anim = new Animation(endRotate, document.timeline);
            anim.play();
        }
    })
}

document.addEventListener('DOMContentLoaded', translate);

window.addEventListener('load', proc);