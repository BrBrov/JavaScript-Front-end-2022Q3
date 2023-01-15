import './main.scss';
import ButtonElement from '../../components/button/button';
import GarageMenu from '../../components/garage/garage-menu';
import Garage from '../../components/garage/garage';
import State from '../../utils/state';
import SaveElems from '../../utils/save-elems';

export default class Main {
  public main: HTMLElement;

  public garage: Garage | undefined;

  // public winners: Winners;

  public garageMenu: GarageMenu;

  private state: State;

  private save: SaveElems;

  constructor() {
    this.state = new State();
    this.save = new SaveElems();
    this.garageMenu = new GarageMenu();
    this.main = this.createMain();
  }

  private createMain(): HTMLElement {
    const main: HTMLElement = document.createElement('main');
    main.className = 'main';

    const menu: HTMLElement = document.createElement('div');
    menu.className = 'main__menu-wrapper';

    let btn: HTMLButtonElement = new ButtonElement('main__button-garage', 'Garage').button;

    menu.append(btn);

    btn = new ButtonElement('main__button-winners', 'Winners').button;

    menu.append(btn);

    main.append(menu);

    const block: HTMLElement = document.createElement('div');
    block.className = 'main__block-view';

    main.append(block);

    return main;
  }

  public createGarage(data: CarsData): HTMLElement {
    this.garage = new Garage(this.state.getGaragePage(), data);
    return <HTMLElement> this.garage.garage;
  }

  // public createWinners(data: CarsData): HTMLElement {
  //
  // }

  public addGarage(): void {
    const block: HTMLElement = this.removeBlock();
    if (!block) throw new Error('Cannot find .main__block-view');
    if (!this.garageMenu.MenuGarage) throw new Error('Not found garage menu into main!');
    if (!this.garage?.garage) throw new Error('Cannot find garage!');
    block.append(this.garageMenu.MenuGarage);
    block.append(this.garage.garage);
    console.log(this.save.restore());
    this.main.append(block);
  }

  private removeBlock(): HTMLElement {
    let block: HTMLElement = this.main.querySelector('.main__block-view') as HTMLElement;
    const copy: HTMLElement = block.cloneNode(true) as HTMLElement;
    this.save.save(copy);
    block.remove();
    block = document.createElement('div');
    block.className = 'main__block-view';
    return block;
  }
}
