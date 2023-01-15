import './page.scss';
import Header from './header/header';
import Main from './main/main';
import Footer from './footer/footer';
// import State from '../utils/state';

export default class Page {
  private readonly main: Main;

  // private state: State;

  private garage: HTMLElement | undefined;

  constructor() {
    // this.state = new State();
    const { header } = new Header();
    this.main = new Main();
    const { footer } = new Footer();
    this.addElemsToPage(header, this.main, footer);
  }

  private generatePage(): HTMLElement[] {
    const container: HTMLElement = document.createElement('div');
    container.className = 'container';

    const page: HTMLElement = document.createElement('div');
    page.className = 'page';

    container.append(page);

    return [container, page];
  }

  // TODO: must add state page logic
  private addElemsToPage(header: HTMLElement, main: Main, footer: HTMLElement): void {
    const page: HTMLElement[] = this.generatePage();

    page[1].append(header);
    page[1].append(main.main);
    page[1].append(footer);

    document.body.append(page[0]);

    const fakeData: CarsData = [
      {
        name: 'Tesla',
        color: '#e6e6fa',
        id: 1,
      },
      {
        name: 'BMW',
        color: '#fede00',
        id: 2,
      },
      {
        name: 'Mersedes',
        color: '#6c779f',
        id: 3,
      },
      {
        name: 'Ford',
        color: '#ef3c40',
        id: 4,
      },
    ];

    this.main.createGarage(fakeData);
    this.main.addGarage();
  }

  public exam(): void {
    console.log('App started!');
  }
}
