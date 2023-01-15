import ButtonElement from '../button/button';
import Car from '../car/car';
import './car-race.scss';
import '../../assets/svg/finish.svg';

export default class CarRace {
  public carRace: HTMLElement;

  private btnStart: ButtonElement | undefined;

  private btnStop: ButtonElement | undefined;

  private btnSelect: ButtonElement | undefined;

  private btnRemove: ButtonElement | undefined;

  private name: HTMLSpanElement | undefined;

  public car: Car | undefined;

  public startFlag: boolean = false;

  //     Here must enter car data
  // {
  //     name: string,
  //     color: string,
  //     id: number
  // }
  constructor(data: CarData) {
    this.carRace = this.createCar(data);
  }

  public checkStartFlag(flag: boolean): void {
    this.startFlag = flag;
    this.switcherBtn();
  }

  public updateCar(name: string, color: string): void {
    this.name!.textContent = name;
    this.car?.setColor(color);
  }

  private switcherBtn(): void {
    if (this.startFlag) {
      this.btnStart?.disable();
      this.btnRemove?.disable();
      this.btnSelect?.disable();
    } else {
      this.btnSelect?.enable();
      this.btnStart?.enable();
      this.btnRemove?.enable();
    }
  }

  private createCar(data: CarData): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'main__car-block';
    wrapper.dataset.id = `${data.id}`;

    let block: HTMLElement = document.createElement('div');
    block.className = 'main__cars-panel';

    wrapper.append(block);

    let panel: HTMLElement = document.createElement('div');
    panel.className = 'main__top-panel';

    this.createBtn();

    panel.append(this.btnSelect!.button);

    panel.append(this.btnRemove!.button);

    block.append(panel);

    panel = document.createElement('div');
    panel.className = 'main__bottom-panel';

    panel.append(this.btnStart!.button);

    panel.append(this.btnStop!.button);

    block.append(panel);

    block = document.createElement('div');
    block.className = 'main__track-block';

    const text: HTMLSpanElement = document.createElement('span');
    text.className = 'main-car-name';
    text.textContent = data.name;

    block.append(text);

    const track: HTMLElement = this.createTrack(data.color, data.id);

    block.append(track);

    wrapper.append(block);

    return wrapper;
  }

  private createBtn(): void {
    this.btnSelect = new ButtonElement('main__button-select', 'Select');
    this.btnRemove = new ButtonElement('main__button-remove', 'Remove');
    this.btnStart = new ButtonElement('main__button-start', 'Start');
    this.btnStop = new ButtonElement('main__button-stop', 'Stop');
  }

  private createTrack(color: string, id: number): HTMLElement {
    const block: HTMLElement = document.createElement('div');
    block.className = 'main__track';

    const panel: HTMLElement = document.createElement('div');
    panel.className = 'main__car-track';

    this.car = new Car(color, id);

    panel.append(this.car.car);

    const finish: HTMLElement = document.createElement('div');
    finish.className = 'main__finish';

    const flag: HTMLImageElement = document.createElement('img');
    flag.className = 'main__finish-flag';
    flag.alt = 'Finish';
    flag.src = './assets/svg/finish.svg';

    finish.append(flag);

    block.append(panel);

    block.append(finish);

    return block;
  }
}
