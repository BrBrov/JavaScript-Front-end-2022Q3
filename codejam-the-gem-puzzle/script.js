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
                this.min++;
                this.sec = 0;
            }
            this.seconds.textContent = (this.sec < 10) ? (`0` + this.sec) : (this.sec);
            this.minute.textContent = (this.min < 10) ? (`0` + this.min) : (this.min);
        }, 1000);
        this.hBlink = setInterval(()=>{
            this.separator.textContent = (this.separator.textContent === ':') ? ('') : (':');
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
        this.separator.textContent = ':';
    }
    setTimer(minute, second){
        this.min = minute;
        this.sec = second;
        this.minute.textContent = (minute<10) ? ('0'+minute) : minute;
        this.seconds.textContent = (second<10) ? ('0'+second) : second;
    }
}

class Draw{
    constructor()
    {
        this.canvas = new AddElement('canvas', 'game');
        this.canvas.className = 'game';
        this.canvas.style.setProperty('border-radius', '5px');
        this.dc = this.canvas.getContext('2d');
    }
    createBackground(){
        let container = document.querySelector('.middle-board');
        this.canvas.width = container.clientWidth;
        this.canvas.height = this.canvas.width;
        let color = this.dc.createLinearGradient(this.canvas.width, 0, 0, this.canvas.height);
        color.addColorStop(0, '#778bd7');
        color.addColorStop(0.5, '#9297be');
        color.addColorStop(1, '#18e3e1');
        this.dc.fillStyle = color;
        this.dc.fillRect(0,0,this.canvas.width, this.canvas.height);
        this.dc.save();
    }
    createCells(value) {
        let countCells = value ** 2;
        let width = (this.canvas.width / 4) - 2;
        let heigth = width;
        let cellsArray = this._generateCellsNumber(countCells);
        let matrix = [];
        let saver = [];
        for (let i = 0; i < cellsArray.length; i++) {
            if(saver.length !== value){
                saver.push(cellsArray[i]);
            }
            if(saver.length === value){
                matrix.push(saver);
                saver = [];
            }
        }
        this.tableCells = [];
        for(let i = 0; i < value; i++){
            for (let j = 0; j < value; j++) {
                this.dc.fillStyle = '#ce7709';
                let position = {
                    text: '',
                    x: 0,
                    y: 0,
                    textX: 0,
                    textY: 0
                }
                position.x = 2*(j + 1) + width * j;
                position.y = 2*(i + 1) + heigth * i

                position.textX = position.x + (width/2);
                position.textY = position.y + (heigth/1.5);
                position.text = matrix[i][j];
                this.tableCells.push(position);
            }
        }
        this.tableCells.forEach((e, i)=>{
            if(e.text === 0 && i !== (this.tableCells.length - 1) ) {
                [e.text, this.tableCells[this.tableCells.length - 1].text] = [this.tableCells[this.tableCells.length - 1].text, e.text];
            }
        })
    }
    drawCells(){
        let width = (this.canvas.width/4) - 4;
        let height = width;
        this.tableCells.forEach(position =>{
            if(position.text !== 0){
                this.dc.fillStyle = '#e59d4b';
                this.dc.fillRect(position.x, position.y, width, height);
                this.dc.font = '3em serif';
                this.dc.textAlign = 'center';
                this.dc.textBaseline = 'center';
                this.dc.color = '#020448';
                this.dc.strokeText( `${position.text}`, position.textX, position.textY);
            }
        })
    }
    drawCongratulation(time, count){
        let width = (this.canvas.width * 6)/8;
        let heigth = this.canvas.width/3;
        let x = this.canvas.width/8;
        let y = this.canvas.width/3;
        this.dc.fillStyle = '#076e08'
        this.dc.fillRect(x,y,width, heigth);
        this.dc.font = '1.2em sans-serif';
        this.dc.fillStyle = '#e72525';
        x = this.canvas.width/2;
        y = y + y/3;
        this.dc.textAlign = 'center';
        this.dc.fillText(`Hooray! You solved the puzzle in`,x, y);
        y = y + 30;
        this.dc.fillText(`${time.minutes}:${time.seconds} and ${count} moves!`,x, y);
    }
    _generateCellsNumber(count){
        let ctrl = new Set();
        for(let i = 0; i <= count; i++){
            ctrl.add(i);
        }
        let arr = [];
        while(arr.length !== count){
            let num = this._random(count);

            if(ctrl.has(num)){
                arr.push(num);
                ctrl.delete(num);
            }
        }
        return arr;
    }
    _random(count){
        return Math.trunc(Math.random()*count);
    }
}

class Settings{
    constructor() {
        this.settings = JSON.parse(localStorage.getItem('settings'));
        if(!this.settings){
            this.settings = {
                time: {
                    minutes: 0,
                    seconds: 0
                },
                countMoves: 0,
                tableCells: null,
                size: 4,
                result: {},
                condition: false,
                sound: true
            };
            localStorage.setItem('settings', JSON.stringify(this.settings));
        }
    }
    getOption(param){
        switch (param){
            case 'minutes':
                return this.settings.time.minutes;
                break;
            case 'seconds':
                return this.settings.time.seconds;
                break;
            case 'moves':
                return this.settings.countMoves;
                break;
            case 'tableCells':
                return this.settings.tableCells;
                break;
            case 'size':
                return this.settings.size;
                break;
            case 'result':
                return this.settings.result;
                break;
            case 'condition':
                return this.settings.condition;
                break;
            case 'sound':
                return this.settings.sound;
                break;
            default:
                return this.settings;
                break;
        }
    }
    setOption(param, value){
        if(!param){
            return;
        }
        switch (param){
            case 'minutes':
                this.settings.time.minutes = value;
                break;
            case 'seconds':
                this.settings.time.seconds = value;
                break;
            case 'moves':
                this.settings.countMoves = value;
                break;
            case 'tableCells':
                this.settings.tableCells = value;
                break;
            case 'size':
                this.settings.size = value;
                break;
            case 'result':
                this.settings.result = value;
                break;
            case 'condition':
                this.settings.condition = value;
                break;
            case 'sound':
                this.settings.sound = value;
                break;
        }
        localStorage.setItem('settings', JSON.stringify(this.settings));
    }
}

class Page extends Settings{
    constructor() {
        super();
        this._buildHTML();
        this.clickCtrl = false;
        this.stopCtrl = false;
        // this.sound
        // this.stop
        // this.shuffle
        // this.save
        // this.results
        // this.size
        // this.canvas
        // this.moves
        // this.timer
    }
    _buildHTML(){
        let tags = {
            div: `div`,
            span: `span`,
            button: `button`
        }
        let element = document.body;
        let insertElem = new AddElement(tags.div, 'container');
        element.appendChild(insertElem);
        element = new AddElement(tags.div, `page`);
        insertElem.appendChild(element);
        let gameBoard = new AddElement(tags.div, 'game-board');
        element.appendChild(gameBoard);
        this.sound = new Sound();//sound
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
        this.canvas = new Draw();//canvas
        block.appendChild(this.canvas.canvas);
        gameBoard.appendChild(block);
        block = new AddElement(tags.div, 'down-bord');
        element = new AddElement(tags.div, `info-size`);
        insertElem = new AddElement(tags.span, `frame-label`, 'Frame size:');
        element.appendChild(insertElem);
        this.size = new AddElement(tags.span, `frame-value`, `4x4`);
        element.appendChild(this.size);
        block.appendChild(element);
        this.checkSize = new AddElement(tags.div, `check-size`);
        insertElem = new AddElement(tags.span, `check-label`, `Others sizes:`);
        this.checkSize.appendChild(insertElem);
        insertElem = new AddElement(tags.span, `very-easy`, '3x3');
        this.checkSize.appendChild(insertElem);
        insertElem = new AddElement(tags.span, `easy checked`, '4x4');
        this.checkSize.appendChild(insertElem);
        insertElem = new AddElement(tags.span, `normal`, '5x5');
        this.checkSize.appendChild(insertElem);
        insertElem = new AddElement(tags.span, `hard`, '6x6');
        this.checkSize.appendChild(insertElem);
        insertElem = new AddElement(tags.span, `very-hard`, '7x7');
        this.checkSize.appendChild(insertElem);
        insertElem = new AddElement(tags.span, `unreal`, '8x8');
        this.checkSize.appendChild(insertElem);
        block.appendChild(this.checkSize);
        gameBoard.appendChild(block);
    }
    madeGame(){
        this.timer.setTimer(this.getOption('minutes'), this.getOption('seconds'));
        this.moves.textContent = this.getOption('moves');
        this.sound.checked = this.getOption('sound');
        this.canvas.createBackground();
        let cellsNumbers = this.getOption('size');
        if(!this.getOption('tableCells')){
            this.canvas.createCells(cellsNumbers);
        }else{
            this.canvas.tableCells = this.getOption('tableCells');
            let size = 0;
            switch(cellsNumbers){
                case 3:
                    size = '3x3';
                    break;
                case 4:
                    size = '4x4';
                    break;
                case 5:
                    size = '5x5';
                    break;
                case 6:
                    size = '6x6';
                    break;
                case 7:
                    size = '7x7';
                    break;
                case 8:
                    size = '7x7';
                    break;
            }
            this.size.textConten = size;
        }
        this.canvas.drawCells();
        if(this.getOption('condition')){
            let time = {
                minutes: this.getOption('minutes'),
                seconds: this.getOption('seconds')
            }
            this.canvas.drawCongratulation(time, this.getOption('moves'));
            this.timer.stop();
            this.timer.setTimer(time.minutes, time.seconds);
            this.moves.textContent = this.getOption('moves');
        }else{
            this.timer.setTimer(this.getOption('minutes'), this.getOption('seconds'));
            this.moves.textContent = this.getOption('moves');
            this.timer.start();
        }
        this._logicProcess();
    }
    _logicProcess(){
        this.shuffle.addEventListener('click', ev => this._shuffle.call(this,ev));
        this.stop.addEventListener('click', ev=>this._stop.call(this, ev));
        this.save.addEventListener('click', ev=> this._save.call(this, ev));
    }
    _shuffle(e){
        e.stopPropagation();
        if(!this.clickCtrl) {
            this.clickCtrl = true;
            this.timer.stop();
            this.timer.setTimer(0, 0);
            this.moves.reset();
            console.log(this.getOption('size'));
            this.canvas.createCells(this.getOption('size'));
            this.canvas.drawCells();
            this.setOption('tableCells', null);
            this.setOption('moves', 0);
            this.setOption('minutes', 0);
            this.setOption('seconds', 0);
            if (this.sound.checked) {
                this.sound.play();
            }
            setTimeout(()=>{
                this.clickCtrl = false;
                this.timer.start();
            }, 500);
        }
    }
    _stop(e){//need to fix after canvas logic click!!!!!!!
        e.stopPropagation();
        if (this.sound.checked) {
            this.sound.play();
        }
        if(!this.stopCtrl){
            this.stop.className +=` choosed`;
            this.timer.stop();
            this.stopCtrl = true;
        }else{
            this.stop.className = 'stop';
            this.timer.start();
            this.stopCtrl = false;
        }
    }
    _save(e){
        e.stopPropagation();
        if (this.sound.checked){
            this.sound.play();
        }
        this.setOption('tableCells', this.canvas.tableCells);
        this.setOption('minutes', this.timer.min);
        this.setOption('seconds', this.timer.sec);
        this.setOption('moves', this.moves.value);
        let size = 4;
        switch (this.size.textContent){
            case '3x3':
                size = 4;
                break;
            case '4x4':
                size = 4;
                break;
            case '5x5':
                size = 4;
                break;
            case '6x6':
                size = 4;
                break;
            case '7x7':
                size = 4;
                break;
            case '8x8':
                size = 4;
                break;
        }
        this.setOption('size', size);
    }
}

window.addEventListener('load', ()=>{
    let page = new Page();
    page.madeGame();
})