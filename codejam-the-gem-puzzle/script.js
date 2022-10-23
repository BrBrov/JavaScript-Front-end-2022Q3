class AddElement {
    constructor(tag, nameClass, textContent) {
        let elem = document.createElement(`${tag}`);
        if (nameClass) {
            elem.className = `${nameClass}`;
        }
        if (textContent) {
            elem.textContent = `${textContent}`;
        }
        return elem;
    }
}

class Sound {
    constructor() {
        this.soundBlock = new AddElement(`div`, `sound-control`);
        this.sound = new AddElement('input', 'sound');
        this.sound.type = 'checkbox';
        this.checked = this.sound.checked;
        this.soundBlock.appendChild(this.sound);
        let soundLabel = new AddElement('span', 'sound-label', 'Sound on');
        this.soundBlock.appendChild(soundLabel);
        this.audio = new Audio(`./assets/sound/click.ogg`);
        this.audio.volume = 0.5;
        this.audio.autoplay = false;
    }

    play() {
        return this.audio.play();
    }

    checkStatus() {
        this.checked = this.sound.checked;
        return this.checked;
    }
}

class CountMove {
    constructor() {
        this.value = 0;
        this.moves = new AddElement('div', 'moves-block');
        let label = new AddElement('span', `move-label`, `moves:`);
        this.count = new AddElement('span', `move-count`, `0`);
        this.moves.appendChild(label);
        this.moves.appendChild(this.count);
    }

    addition() {
        this.value++;
        this.count.textContent = `${this.value}`;
    }

    reset() {
        this.value = 0;
        this.count.textContent = `${this.value}`;
    }

    setValue(value) {
        this.value = value;
        this.count.textContent = `${this.value}`;
    }
}

class Timer {
    constructor() {
        this.timerStarted = false;
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

    _processing() {
        this.handle = setInterval(() => {
            this.sec++;
            if (this.sec === 60) {
                this.min++;
                this.sec = 0;
            }
            this.seconds.textContent = (this.sec < 10) ? (`0` + this.sec) : (this.sec);
            this.minute.textContent = (this.min < 10) ? (`0` + this.min) : (this.min);
        }, 1000);
        this.hBlink = setInterval(() => {
            this.separator.textContent = (this.separator.textContent === ':') ? ('') : (':');
        }, 500);
    }

    start() {
        if (!this.timerStarted) {
            this._processing();
            this.timerStarted = true;
        }
    }

    stop() {
        if (this.timerStarted) {
            if (this.handle) {
                clearInterval(this.handle);
            }
            if (this.hBlink) {
                clearInterval(this.hBlink);
            }
            this.handle = 0;
            this.hBlink = 0;
            this.separator.textContent = ':';
            this.timerStarted = false;
        }
    }

    setTimer(minute, second) {
        this.min = minute;
        this.sec = second;
        this.minute.textContent = (minute < 10) ? ('0' + minute) : minute;
        this.seconds.textContent = (second < 10) ? ('0' + second) : second;
    }
}

class Draw {
    constructor() {
        this.canvas = new AddElement('canvas', 'game');
        this.canvas.style.setProperty('border-radius', '5px');
        this.dc = this.canvas.getContext('2d');
    }

    createBackground() {
        let container = document.querySelector('.middle-board');
        this.canvas.width = container.clientWidth;
        this.canvas.height = this.canvas.width;
        let color = this.dc.createLinearGradient(this.canvas.width, 0, 0, this.canvas.height);
        color.addColorStop(0, '#778bd7');
        color.addColorStop(0.5, '#9297be');
        color.addColorStop(1, '#18e3e1');
        this.dc.fillStyle = color;
        this.dc.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.dc.save();
    }

    _generateMatrix(value) {
        let countCells = value ** 2;
        let cellsArray = this._generateCellsNumber(countCells);
        let matrix = [];
        let saver = [];
        for (let i = 0; i < cellsArray.length; i++) {
            if (saver.length !== value) {
                saver.push(cellsArray[i]);
            }
            if (saver.length === value) {
                matrix.push(saver);
                saver = [];
            }
        }
        return matrix;
    }

    createCells(value) {
        this.tableCells = [];
        let width = (this.canvas.width / value) - 2;
        let height = width;
        let matrix = null;
        let x = false;
        while (x === false) {
            matrix = this._generateMatrix(value);
            x = this._checkMatrix(matrix);
        }
        this.tableCells = [];
        for (let i = 0; i < value; i++) {
            for (let j = 0; j < value; j++) {
                this.dc.fillStyle = '#ce7709';
                let position = {
                    text: '',
                    x: 0,
                    y: 0,
                    textX: 0,
                    textY: 0
                }
                position.x = 2 * (j + 1) + width * j;
                position.y = 2 * (i + 1) + height * i

                position.textX = position.x + (width / 2);
                position.textY = position.y + (height / 1.5);
                position.text = matrix[i][j];
                this.tableCells.push(position);
            }
        }
        this.tableCells.forEach((e, i) => {
            if (e.text === 0 && i !== (this.tableCells.length - 1)) {
                [e.text, this.tableCells[this.tableCells.length - 1].text] = [this.tableCells[this.tableCells.length - 1].text, e.text];
            }
        })
    }

    _checkMatrix(matrix) {
        let arrayMatrix = [];
        matrix.forEach(e => {
            e.forEach(elem => {
                arrayMatrix.push(elem);
            })
        })
        let indexOfNull = arrayMatrix.indexOf(0);
        [arrayMatrix[indexOfNull], arrayMatrix[arrayMatrix.length - 1]] = [arrayMatrix[arrayMatrix.length - 1], arrayMatrix[indexOfNull]];
        // arrayMatrix.pop();
        let summery = 0;
        arrayMatrix.forEach((e, index, array) => {
            let count = 0;
            for (let i = index + 1; i < array.length; i++) {
                if (array[i] && array[i] < e) {
                    count++;
                }
            }
            summery += count;
        })
        let result = summery % 2;
        if (result === 0) {
            return true
        } else {
            return false
        }
    }

    drawCells(size) {
        let width = (this.canvas.width / size) - 4;
        let height = width;
        this.tableCells.forEach(position => {
            if (position.text !== 0) {
                this.dc.fillStyle = '#e59d4b';
                this.dc.fillRect(position.x, position.y, width, height);
                this.dc.font = '3em serif';
                this.dc.textAlign = 'center';
                this.dc.textBaseline = 'center';
                this.dc.color = '#020448';
                this.dc.strokeText(`${position.text}`, position.textX, position.textY);
            }
        })
    }

    drawCongratulation(time, count) {
        let width = (this.canvas.width * 6) / 8;
        let height = this.canvas.width / 3;
        let x = this.canvas.width / 8;
        let y = this.canvas.width / 3;
        // this.dc.clearRect(0,0,width, height);
        this.dc.fillStyle = '#89e8d2'
        this.dc.fillRect(x, y, width, height);
        this.dc.font = '0.8em sans-serif';
        this.dc.fillStyle = '#b03939';
        x = this.canvas.width / 2;
        y = y + y / 3;
        this.dc.textAlign = 'center';
        this.dc.fillText(`Hooray! You solved the puzzle in`, x, y);
        y = y + 30;
        this.dc.fillText(`${time.minutes}:${time.seconds} and ${count} moves!`, x, y);
    }

    _generateCellsNumber(count) {
        let ctrl = new Set();
        for (let i = 0; i <= count; i++) {
            ctrl.add(i);
        }
        let arr = [];
        while (arr.length !== count) {
            let num = this._random(count);

            if (ctrl.has(num)) {
                arr.push(num);
                ctrl.delete(num);
            }
        }
        return arr;
    }

    _random(count) {
        return Math.trunc(Math.random() * count);
    }

    getElemOnClick(position, size) {
        let cellSize = this.canvas.width / size;
        let cells = {
            cell: {},
            nullCell: {}
        };
        this.tableCells.forEach((e, i) => {
            if ((position.x >= e.x && position.x <= (e.x + cellSize + 4)) && (position.y >= e.y && position.y <= (e.y + cellSize + 4))) {
                cells.cell.index = i;
                cells.cell.element = e;

            }
            if (e.text === 0) {
                cells.nullCell.index = i;
                cells.nullCell.element = e;
            }
        })
        return cells;
    }

    moveElement(mousePosition, size) {
        let side = this.canvas.width;
        let cells = this.getElemOnClick(mousePosition, size);
        if (cells.cell.element.text === cells.nullCell.element.text) {
            return;
        }
        let neighborsElements = [];
        neighborsElements.push((cells.nullCell.index - size));
        neighborsElements.push(cells.nullCell.index - 1);
        neighborsElements.push(cells.nullCell.index + 1);
        neighborsElements.push(cells.nullCell.index + size);
        let moveSide = null;
        neighborsElements.forEach(e => {
            if (e >= 0 || e < this.tableCells.length) {
                if (cells.cell.index === e) {
                    moveSide = {
                        stepX: ((cells.nullCell.element.x - cells.cell.element.x) / 25),
                        stepY: ((cells.nullCell.element.y - cells.cell.element.y) / 25)
                    }
                }
            }
        })
        if (!moveSide) {
            return false;
        }
        let step = 100;
        while (step) {
            this.tableCells[cells.cell.index].x += moveSide.stepX;
            this.tableCells[cells.cell.index].y += moveSide.stepY;
            this.tableCells[cells.cell.index].textX += moveSide.stepX;
            this.tableCells[cells.cell.index].textY += moveSide.stepY;
            this.tableCells[cells.nullCell.index].x -= moveSide.stepX;
            this.tableCells[cells.nullCell.index].y -= moveSide.stepY;
            this.tableCells[cells.nullCell.index].textX -= moveSide.stepX;
            this.tableCells[cells.nullCell.index].textY -= moveSide.stepY;
            this.dc.clearRect(0, 0, side, side);
            this.createBackground()
            this.drawCells(size);
            step = step - 4;
        }
        [this.tableCells[cells.cell.index].text, this.tableCells[cells.nullCell.index].text] = [this.tableCells[cells.nullCell.index].text, this.tableCells[cells.cell.index].text];
        [this.tableCells[cells.cell.index].x, this.tableCells[cells.nullCell.index].x] = [this.tableCells[cells.nullCell.index].x, this.tableCells[cells.cell.index].x];
        [this.tableCells[cells.cell.index].y, this.tableCells[cells.nullCell.index].y] = [this.tableCells[cells.nullCell.index].y, this.tableCells[cells.cell.index].y];
        [this.tableCells[cells.cell.index].textX, this.tableCells[cells.nullCell.index].textX] = [this.tableCells[cells.nullCell.index].textX, this.tableCells[cells.cell.index].textX];
        [this.tableCells[cells.cell.index].textY, this.tableCells[cells.nullCell.index].textY] = [this.tableCells[cells.nullCell.index].textY, this.tableCells[cells.cell.index].textY];
        return true;
    }

    checkResult(size) {
        size = size ** 2;
        let controlArray = [];
        for (let i = 1; i <= size; i++) {
            if (i < size) {
                controlArray.push(i);
            } else {
                controlArray.push(0);
            }
        }
        let resultArray = this.tableCells.map(e => {
            return e.text;
        })
        for (const index in controlArray) {
            if (controlArray[index] !== resultArray[index]) {
                return false;
            }
        }
        return true;
    }
}

class Settings {
    constructor() {
        this.settings = JSON.parse(localStorage.getItem('settings'));
        if (!this.settings) {
            this.settings = {
                time: {
                    minutes: 0,
                    seconds: 0
                },
                countMoves: 0,
                tableCells: null,
                size: 4,
                result: [],
                stop: false,
                condition: false,
                sound: true
            };
            localStorage.setItem('settings', JSON.stringify(this.settings));
        }
    }

    getOption(param) {
        switch (param) {
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
            case 'stop':
                return this.settings.stop;
                break;
            default:
                return this.settings;
                break;
        }
    }

    setOption(param, value) {
        if (!param) {
            return;
        }
        switch (param) {
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
            case 'stop':
                this.settings.stop = value;
                break;
        }
        localStorage.setItem('settings', JSON.stringify(this.settings));
    }
}

class Page extends Settings {
    constructor() {
        super();
        this._buildHTML();
        this.clickCtrl = false;
        this.stopCtrl = false;
        this.canvasCtrl = false;
        this.resultsShow = false;
        this.sizeCheckCtrl = true;
    }

    _buildHTML() {
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
        this.sound.sound.checked = this.getOption('sound');
        element.appendChild(this.sound.soundBlock);
        let block = new AddElement(tags.div, `upper-board`);
        gameBoard.appendChild(block);
        element = new AddElement(tags.div, 'upper-control');
        this.shuffle = new AddElement(tags.button, `shuffle`, `Shuffle and start`);
        this.stop = new AddElement(tags.button, `stop`, `Stop`);
        this.save = new AddElement(tags.button, `save`, `Save`);
        this.results = new AddElement(tags.button, `results`, `Results`);
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
        block = new AddElement(tags.div, 'down-board');
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

    madeGame() {
        this.timer.setTimer(this.getOption('minutes'), this.getOption('seconds'));
        this.moves.textContent = this.getOption('moves');
        this.sound.sound.checked = this.getOption('sound');
        this.canvas.createBackground();
        let cellsNumbers = this.getOption('size');
        if (!this.getOption('tableCells')) {
            this.canvas.createCells(cellsNumbers);

        } else {
            this.canvas.tableCells = this.getOption('tableCells');
        }
        this.size.textContent = this._getTextSize(cellsNumbers);
        let arrClassName = ['very-easy', 'easy', 'normal', 'hard', 'very-hard', 'unreal'];
        [...this.checkSize.children].forEach((e, i) => {
            if (e.className !== 'check-label') {
                if (e.textContent === this._getTextSize(cellsNumbers)) {
                    e.className = arrClassName[i - 1] + ' checked';
                } else {
                    e.className = arrClassName[i - 1];
                }
            }
        });
        this.canvas.drawCells(this.getOption('size'));
        if (this.getOption('condition')) {
            let time = {
                minutes: this.getOption('minutes'),
                seconds: this.getOption('seconds')
            }
            this.canvas.drawCongratulation(time, this.getOption('moves'));
            this.timer.stop();
            this.timer.setTimer(time.minutes, time.seconds);
            this.moves.textContent = this.getOption('moves');
        } else {
            this.timer.setTimer(this.getOption('minutes'), this.getOption('seconds'));
            this.moves.textContent = this.getOption('moves');
            this.timer.stop();
        }
        if (this.getOption('stop')) {
            this.stop.className = 'stop choosed';
            this.stopCtrl = true;
            this.canvasCtrl = true;
        }
        this._logicProcess();
    }

    _logicProcess() {
        this.shuffle.addEventListener('click', ev => this._shuffle.call(this, ev));
        this.stop.addEventListener('click', ev => this._stop.call(this, ev));
        this.save.addEventListener('click', ev => this._save.call(this, ev));
        this.results.addEventListener('click', ev => this._resultOpen.call(this, ev));
        this.canvas.canvas.addEventListener('click', ev => this._canvas.call(this, ev));
        this.checkSize.addEventListener('click', ev => this._checkSize.call(this, ev));
        this.sound.sound.addEventListener('click', ev => this._soundCheck.call(this, ev))
    }

    _shuffle(e) {
        e.stopPropagation();
        if (!this.clickCtrl) {
            this.clickCtrl = true;
            this.timer.stop();
            this.timer.setTimer(0, 0);
            this.moves.reset();
            this.canvas.createCells(this.getOption('size'));
            this.canvas.dc.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
            this.canvas.createBackground();
            this.canvas.drawCells(this.getOption('size'));
            this.setOption('tableCells', null);
            this.setOption('moves', 0);
            this.setOption('minutes', 0);
            this.setOption('seconds', 0);
            this.setOption('condition', false);
            this.canvasCtrl = false;
            if (this.sound.checkStatus()) {
                this.sound.play();
            }
            setTimeout(() => {
                this.clickCtrl = false;
            }, 100);
        }
    }

    _stop(e) {
        e.stopPropagation();
        this.stopTimeCtrl = null;
        if (!this.clickCtrl) {
            this.clickCtrl = true;
            if (!this.stopCtrl) {
                this.stop.className += ` choosed`;
                this.timer.stop();
                this.stopCtrl = true;
                this.stopTimeCtrl = setInterval(() => {
                    if (this.timer.timerStarted === true) {
                        this.timer.stop();
                    }
                }, 10);
                this.canvasCtrl = true;
                this.setOption('stop', true);
                this.setOption('tableCells', this.canvas.tableCells);
                this.setOption('moves', this.moves.value);
                this.setOption('minutes', this.timer.min);
                this.setOption('seconds', this.timer.sec);
            } else {
                clearInterval(this.stopTimeCtrl);
                this.canvasCtrl = false;
                this.stopTimeCtrl = null;
                this.stop.className = 'stop';
                this.timer.start();
                this.stopCtrl = false;
                this.setOption('stop', false);
                this.setOption('tableCells', null);
                this.setOption('moves', 0);
                this.setOption('minutes', 0);
                this.setOption('seconds', 0);
            }
            if (this.sound.checkStatus()) {
                this.sound.play();
            }
            setTimeout(() => {
                this.clickCtrl = false;
            }, 100);

        }
    }

    _save(e) {
        e.stopPropagation();
        if (!this.clickCtrl) {
            this.clickCtrl = true;
            this.setOption('tableCells', this.canvas.tableCells);
            this.setOption('minutes', this.timer.min);
            this.setOption('seconds', this.timer.sec);
            this.setOption('moves', this.moves.value);
            let size = 4;
            switch (this.size.textContent) {
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
            if (this.sound.checkStatus()) {
                this.sound.play();
            }
            setTimeout(() => {
                this.clickCtrl = false;
            }, 100);

        }
    }

    _canvas(e) {
        e.stopPropagation();
        if (!this.clickCtrl) {
            if (this.canvasCtrl) {
                return;
            }
            this.clickCtrl = true;
            this.timer.start();
            let mousePosition = {
                x: e.offsetX,
                y: e.offsetY
            }
            let countCell = this.getOption('size');
            let moveResult = this.canvas.moveElement(mousePosition, countCell);
            if (moveResult) {
                this.moves.addition();
            }
            let checkFlag = this.canvas.checkResult(countCell);
            if (checkFlag) {
                this.canvasCtrl = true;
                this.timer.stop();
                let time = {
                    minutes: this.timer.min,
                    seconds: this.timer.sec
                }
                this.canvas.drawCongratulation(time, this.moves.value);
                this.setOption('condition', true);
                this.setOption('moves', this.moves.value);
                this.setOption('tableCells', this.canvas.tableCells);
                this.setOption('minutes', this.timer.min);
                this.setOption('seconds', this.timer.sec);
                let savedResults = this.getOption('result');
                let date = new Date();
                let resultDate = date.getDate() + '.';
                resultDate += (date.getMonth() + 1) + '.';
                resultDate += date.getFullYear();
                let result = {
                    date: resultDate,
                    moves: this.moves.value,
                    time: `${this.timer.min}:${this.timer.sec}`
                }
                if (savedResults.length < 10) {
                    savedResults.push(result);
                } else {
                    savedResults.pop();
                    savedResults.unshift(result);
                }
                this.setOption('result', savedResults);
            }
            if (this.sound.checkStatus()) {
                this.sound.play();
            }
            setTimeout(() => {
                this.clickCtrl = false;
            }, 100);
        }
    }

    _resultOpen(ev) {
        ev.stopPropagation();
        if (!this.clickCtrl) {
            this.clickCtrl = true;
            if (this.sound.checkStatus()) {
                this.sound.play();
            }
            if(!this.resultsShow){
                this._showResults();
                this.resultsShow = true;
                this.sizeCheckCtrl = false;
                this.canvasCtrl = true;
                if (this.timer.timerStarted) {
                    this.timer.stop();
                }
            }else{
                this.canvas.dc.clearRect(0, 0, 400, 400);
                this.canvas.createBackground();
                this.canvas.drawCells(this.getOption('size'));
                this.resultsShow = false;
                this.sizeCheckCtrl = true;
                this.canvasCtrl = false;
                if (this.timer.timerStarted) {
                    this.timer.start();
                }
            }
            this.clickCtrl = false;
        }
    }

    _showResults(){
        let resultArray = this.getOption('result');
        let position = {
            x: 20,
            y: 35
        }
        if (resultArray.length !== 0) {
            this.canvas.dc.clearRect(0, 0, 400, 400);
            this.canvas.createBackground();
            resultArray.forEach(e => {
                this.canvas.dc.font = '30px sans';
                this.canvas.dc.fillStyle = '#9fd3c9';
                this.canvas.dc.fillText(`${e.date} -> ${e.moves} for the ${e.time}`, position.x, position.y);
                this.canvas.dc.strokeStyle = '#7133b0';
                this.canvas.dc.strokeRect(position.x - 10, position.y - 30, 380, 35);
                position.y += 35;
            })
        }else{
            this.canvas.dc.clearRect(0, 0, 400, 400);
            this.canvas.createBackground();
            this.canvas.dc.font = '30px sans';
            this.canvas.dc.fillStyle = '#9fd3c9';
            this.canvas.dc.fillText(`Here aren\'t a results`, 100, 200);
        }
    }

    _soundCheck(ev) {
        ev.stopPropagation();
        this.setOption('sound', this.sound.checkStatus());
    }

    _getTextSize(value) {
        let size = 0;
        switch (value) {
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
                size = '8x8';
                break;
        }
        return size;
    };

    _checkSize(ev) {
        ev.stopPropagation();
        if(!this.clickCtrl){
            this.clickCtrl = true;
            if(this.sizeCheckCtrl){
                let size = 0;
                if (ev.target.className !== 'check-label') {
                    switch (ev.target.textContent) {
                        case '3x3':
                            size = 3;
                            break;
                        case '4x4':
                            size = 4;
                            break;
                        case '5x5':
                            size = 5;
                            break;
                        case '6x6':
                            size = 6;
                            break;
                        case '7x7':
                            size = 7;
                            break;
                        case '8x8':
                            size = 8;
                            break;
                    }
                    this.setOption('size', size);
                    this.setOption('tableCells', null);
                    this.setOption('condition', false);
                    this.setOption('minutes', 0);
                    this.setOption('seconds', 0);
                    this.setOption('moves', 0);
                    this.timer.stop();
                    this.moves.reset();
                    this.timer.min = 0;
                    this.timer.sec = 0;
                    let arrClassName = ['very-easy', 'easy', 'normal', 'hard', 'very-hard', 'unreal'];
                    [...this.checkSize.children].forEach((e, i) => {
                        if (e.className !== 'check-label') {
                            if (e.className === ev.target.className) {
                                e.className = arrClassName[i - 1] + ' checked';
                            } else {
                                e.className = arrClassName[i - 1];
                            }
                        }
                    });
                    this.size.textContent = ev.target.textContent;
                    this.canvas.dc.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
                    this.canvasCtrl = false;
                    this.canvas.createBackground();
                    this.canvas.createCells(this.getOption('size'));
                    this.canvas.drawCells(this.getOption('size'));
                    this.resultsShow = false;
                }
           }
        }
        this.clickCtrl = false;
    }
}

window.addEventListener('load', () => {
    let page = new Page();
    page.madeGame();
})