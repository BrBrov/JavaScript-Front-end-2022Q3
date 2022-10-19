class AddElem{
    constructor( tag, className, textContent) {
        let elem = document.createElement(`${tag}`);
        elem.classList.add(`${className}`);
        elem.textContent = `${textContent}`;
        return elem;
    }
}