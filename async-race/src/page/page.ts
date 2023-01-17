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
        name: 'Tesla Govno',
        color: '#0d0dda',
        id: 1,
      },
      {
        name: 'BMW Korito',
        color: '#fede00',
        id: 2,
      },
      {
        name: 'Mersedes Tazik',
        color: '#6c779f',
        id: 3,
      },
      {
        name: 'Ford Pony',
        color: '#ef3c40',
        id: 4,
      },
    ];

    const fakeWin: AllWinners = [
      {
        id: 1,
        wins: 1,
        time: 10,
      },
      {
        id: 2,
        wins: 2,
        time: 5,
      },
      {
        id: 3,
        wins: 5,
        time: 2,
      },
      {
        id: 4,
        wins: 2,
        time: 7.55,
      },
    ];

    // this.main.createGarage(fakeData);
    // this.main.addGarage();
    this.main.createWinners(fakeWin, fakeData);
    this.main.addWinners();
  }

  public exam(): void {
    console.log('App started!');
  }
}
