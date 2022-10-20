class AddElement{
    constructor(tag, nameClass, textContent) {
        let elem = document.createElement(`${tag}`);
        if(nameClass){
            elem.className = `${nameClass}`;
        }
        if(textContent){
            elem.textContent = `${textContent}`;
        }
        return elem;
    }
}

class Sound{
    constructor() {
        this.soundBlock = new AddElement(`div`, `sound-control`);
        this.sound = new AddElement('input', 'sound');
        this.sound.type = 'checkbox';
        this.sound.value = true;
        this.sound.checked = true;
        this.soundBlock.appendChild(this.sound);
        let soundLabel = new AddElement('span', 'sound-label', 'Sound on');
        this.soundBlock.appendChild(soundLabel);
        this.audio = new Audio(`./assets/sound/click.mp3`);
        this.audio.volume = 0.5;
        this.audio.autoplay = false;
    }
    play(){
        this.audio.play();
    }
}

class CountMove{
    constructor() {
        this.value = 0;
        this.moves = new AddElement('div', 'moves-block');
        let label = new AddElement('span', `move-label`, `moves:`);
        this.count = new AddElement('span', `move-count`, `0`);
        this.moves.appendChild(label);
        this.moves.appendChild(this.count);
    }
    addition(){
        this.value++;
        this.count.textContent = `${this.value}`;
    }
    reset(){
        this.value = 0;
        this.count.textContent = `${this.value}`;
    }
    setValue(value){
        this.value = value;
        this.count.textContent = `${this.value}`;
    }
}

class Timer{
    constructor() {
        this.handle = null;
        this.hBlink = null;
        this.min = 0;
        this.sec = 0;
        this.timer = new AddElement('div', `time-block`);
        let label = new AddElement('span', `time-label`, `time`);
        this.minute = new AddElement('span', `minute`, `00`);
        this.separator = new AddElement('span', `time-separator`, `:`);
        this.seconds = new AddElement('span', `seconds`, `00`);
        this.timer.appendChild(label);
        this.timer.appendChild(this.minute);
        this.timer.appendChild(this.separator);
        this.timer.appendChild(this.seconds);
    }
    _processing(){
        this.handle = setInterval(()=>{
            this.sec++;
            if(this.sec === 60){
                this.minute++;
            }
            this.seconds.textContent = (this.sec < 10) ? (`0` + this.sec) : (this.sec);
            this.minute.textContent = (this.min < 10) ? (`0` + this.min) : (this.min);
        }, 1000);
        this.hBlink = setInterval(()=>{
            this.separator.style.color = '#3fbe48';
        }, 500);
    }
    start(){
        this._processing();
    }
    stop(){
        if(this.handle){
            clearInterval(this.handle);
        }
        if(this.hBlink){
            clearInterval(this.hBlink);
        }
        this.handle = 0;
        this.hBlink = 0;
    }
    setTimer(minute, second){
        if(!minute || !second || second > 59){
            return;
        }
        this.min = minute;
        this.sec = second;
        this.minute.textContent = (minute<10) ? ('0'+minute) : minute;
        this.seconds.textContent = (second<10) ? ('0'+second) : second;
    }
}

class Page{
    constructor() {
        let tags = {
            div: `div`,
            span: `span`,
            button: `button`,
            canvas: `canvas`
        }
        let element = document.body;
        let insertElem = new AddElement(tags.div, 'container');
        element.appendChild(insertElem);
        element = new AddElement(tags.div, `page`);
        insertElem.appendChild(element);
        let gameBoard = new AddElement(tags.div, 'game-board');
        element.appendChild(gameBoard);
        this.sound = new Sound();
        element.appendChild(this.sound.soundBlock);
        let block = new AddElement(tags.div, `upper-board`);
        gameBoard.appendChild(block);
        element = new AddElement(tags.div, 'upper-control');
        this.shuffle = new AddElement(tags.button, `shuffle`, `Shuffle and start`);
        this.stop = new AddElement(tags.button, `stop`, `Stop`);
        this.save = new AddElement(tags.button, `save`, `Save`);
        this.results =  new AddElement(tags.button, `results`, `Results`);
        element.appendChild(this.shuffle);
        element.appendChild(this.stop);
        element.appendChild(this.save);
        element.appendChild(this.results);
        block.appendChild(element);
        this.timer = new Timer();
        this.moves = new CountMove();
        element = new AddElement(tags.div, `upper-statistic`);
        element.appendChild(this.moves.moves);
        element.appendChild(this.timer.timer);
        block.appendChild(element);
        block = new AddElement(tags.div, 'middle-board');
        element = new AddElement(tags.canvas, `game`);
        block.appendChild(element);
        gameBoard.appendChild(block);
        block = new AddElement(tags.div, 'down-bord');
        element = new AddElement(tags.div, `info-size`);
        insertElem = new AddElement(tags.span, `frame-label`, 'Frame size:');
        element.appendChild(insertElem);
        insertElem = new AddElement(tags.div, `frame-value`, `4x4`);
        element.appendChild(insertElem);
        block.appendChild(element);
        this.size = new AddElement(tags.div, `check-size`);
        insertElem = new AddElement(tags.span, `check-label`, `Others sizes:`);
        this.size.appendChild(insertElem);
        insertElem = new AddElement(tags.span, `very-easy`, '3x3');
        this.size.appendChild(insertElem);
        insertElem = new AddElement(tags.span, `easy`, '4x4');
        this.size.appendChild(insertElem);
        insertElem = new AddElement(tags.span, `normal`, '5x5');
        this.size.appendChild(insertElem);
        insertElem = new AddElement(tags.span, `hard`, '6x6');
        this.size.appendChild(insertElem);
        insertElem = new AddElement(tags.span, `very-hard`, '7x7');
        this.size.appendChild(insertElem);
        insertElem = new AddElement(tags.span, `unreal`, '8x8');
        this.size.appendChild(insertElem);
        block.appendChild(this.size);
        gameBoard.appendChild(block);

    }
}

window.addEventListener('load', ()=>{
    let page = new Page();
})