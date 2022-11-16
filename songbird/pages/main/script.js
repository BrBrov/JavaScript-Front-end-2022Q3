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

async function translate(language){
    let ru = [
        "Главная",
        "Тест",
        "Галерея",
        "RU",
        "Рядом с нами живут пернатые братья наши меньшие. "+
        "Мы их видим каждый день, но насколько хорошо вы "+
        "знаете их? Мы предлагаем пройти небольшую викторину"+
        "на знание птиц. Вы готовы проверить свои знания?",
        "Начать тест",
        "Все права защищены ©, 2022"
    ];
    let en = [
        "Main",
        "Quiz",
        "Gallery",
        "EN",
        "Our smaller feathered brothers live next to us. "+
        "We see them every day, but how well do you know them? "+
        "We offer you to take a small quiz on the knowledge of birds. "+
        "Are you ready to test your knowledge?",
        "Start quiz",
        "All right reserved ©, 2022"
    ];
    let elemsArray = [];
    let elem = document.querySelectorAll(".nav-link");
    elem.forEach(e=>{
        elemsArray.push(e);
    });
    elem = document.querySelector(".language");
    elemsArray.push(elem);
    elem = document.querySelector(".main-text");
    elemsArray.push(elem);
    elem = document.querySelector(".start-quiz");
    elemsArray.push(elem);
    elem = document.querySelector(".git-text");
    elemsArray.push(elem);
    let _lang = null;
    if(language === 'ru'){
        _lang = ru;
    }else{
        _lang = en;
    }
    elemsArray.forEach((element, index)=>{
        element.textContent = _lang[index];
    })
}

async function goToQuiz(ev){
    ev.stopPropagation();
    localStorage.setItem('score', '0');
    localStorage.setItem('mode', 'null');
    location.href = "../quiz/index.html";
}

window.addEventListener('DOMContentLoaded', async ()=>{
    localStorage.setItem('mode', null);
    localStorage.setItem('score', null);
    let lang = await locale();
    await translate(lang);
})
window.addEventListener('load', async ()=>{
    let nav = document.querySelectorAll(".nav-link");
    nav[0].addEventListener('click', (ev)=>{
        ev.stopPropagation();
        location.reload();
    })
    nav[1].addEventListener('click', goToQuiz);
    nav[2].addEventListener('click', (ev)=>{
        ev.stopPropagation();
        localStorage.setItem('mode', 'gallery');
        location.href = "../result/index.html";
    })
    let btn = document.querySelector(".start-quiz");
    btn.addEventListener('click', goToQuiz);
    let git = document.querySelector(".git-logo");
    git.addEventListener('click', ()=>{
        location.href = "https://github.com/BrBrov";
    })
    let rs = document.querySelector(".rsschool");
    rs.addEventListener('click', ()=>{
        location.href = "https://rs.school/js/";
    })
    let langBtn = document.querySelector(".language");
    langBtn.addEventListener('click', async ()=>{
        let lang = await locale();
        if(lang === 'ru'){
            lang = 'en';
        }else{
            lang = 'ru';
        }
        locale(lang);
        let startRotate  = new KeyframeEffect(langBtn,
            [{transform:'rotateY(0)'},{transform: 'rotateY(90deg)'}],
            {duration: 500, fill: "forwards"});
        let endRotate = new KeyframeEffect(langBtn,
            [{transform:'rotateY(90deg)'},{transform: "rotateY(0deg)"}],
            {duration: 500, fill: "forwards"});
        let anim = new Animation(startRotate, document.timeline);
        anim.play();
        anim.onfinish = async () =>{
            await translate(lang);
            anim = new Animation(endRotate, document.timeline);
            anim.play();
        }
    })
})