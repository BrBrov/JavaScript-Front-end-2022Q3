import ButtonElement from '../../components/button/button';

export default class Main {
  public main: HTMLElement;

  constructor() {
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

    return main;
  }
}
