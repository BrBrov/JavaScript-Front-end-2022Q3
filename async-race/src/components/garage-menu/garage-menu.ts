import './garage-menu.scss';
import ButtonElement from '../button/button';

export default class GarageMenu {
  private btnCreateUpdate: ButtonElement | undefined;

  private btnRace: ButtonElement | undefined;

  private btnReset: ButtonElement | undefined;

  private btnGenerateCars: ButtonElement | undefined;

  public MenuGarage: HTMLElement;

  constructor() {
    this.MenuGarage = this.createGarageMenu();
  }

  private createGarageMenu(): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'main__garage-menu';

    let block: HTMLElement = document.createElement('div');
    block.className = 'main__block-manipulate';

    let input: HTMLInputElement = document.createElement('input');
    input.className = 'main__car-name';
    input.type = 'text';
    input.placeholder = 'Enter car name';

    block.append(block);

    input = document.createElement('input');
    input.className = 'main__car-palette';
    input.type = 'color';
    input.value = '#ffffff';

    block.append(input);

    this.btnCreateUpdate = new ButtonElement('main__update-create', 'Create car');

    block.append(this.btnCreateUpdate.button);

    wrapper.append(block);

    block = document.createElement('div');
    block.className = 'main__block-buttons';

    this.btnRace = new ButtonElement('main__button-race', 'Race');

    block.append(this.btnRace.button);

    this.btnReset = new ButtonElement('main__button-reset', 'Reset');

    block.append(this.btnReset.button);

    this.btnGenerateCars = new ButtonElement('main__button-generate', 'Generate 100 cars!');

    block.append(this.btnGenerateCars.button);

    wrapper.append(block);

    return wrapper;
  }
}
