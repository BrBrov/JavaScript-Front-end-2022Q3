import './page.scss';
import Header from './header/header';
import Main from './main/main';
import Footer from './footer/footer';
import State from '../utils/state';
import CarsLoader from '../utils/loaders-cars';
import WinnersLoader from '../utils/loaders-winners';

export default class Page {
  private readonly main: Main;

  private readonly state: State;

  private garage: HTMLElement | undefined;

  constructor() {
    this.state = new State();
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

  private addElemsToPage(header: HTMLElement, main: Main, footer: HTMLElement): void {
    const page: HTMLElement[] = this.generatePage();

    page[1].append(header);
    page[1].append(main.main);
    page[1].append(footer);

    document.body.append(page[0]);

    if (this.state && this.state.getView() === 'garage') {
      const loader: CarsLoader = new CarsLoader();
      loader.getCars(7, this.state.getGaragePage())
        .then((data: CarsData): HTMLElement => {
          const count: number = loader.getCountCars() || 0;
          return this.main.createGarage(data, count);
        })
        .then((): void => this.main.addGarage());
    } else {
      const winLoader: WinnersLoader = new WinnersLoader();
      const carsLoader: CarsLoader = new CarsLoader();
      let winData: AllWinners;
      winLoader.getWinners(this.state.getWinnersPage(), 10)
        .then((wins: AllWinners): Promise<CarsData> => {
          winData = wins;
          return carsLoader.getCars();
        })
        .then((carsData) => {
          const count: number = winLoader.getCountWinners() || 0;
          this.main.createWinners(winData, carsData, count);
          this.main.addWinners();
        });
    }
  }

  public exam(): void {
    console.log('App started!');
  }
}
// TODO: this fake data for testing
// const fakeData: CarsData = [
//   {
//     name: 'Tesla Govno',
//     color: '#0d0dda',
//     id: 1,
//   },
//   {
//     name: 'BMW Korito',
//     color: '#fede00',
//     id: 2,
//   },
//   {
//     name: 'Mersedes Tazik',
//     color: '#6c779f',
//     id: 3,
//   },
//   {
//     name: 'Ford Pony',
//     color: '#ef3c40',
//     id: 4,
//   },
// ];
//
// const fakeWin: AllWinners = [
//   {
//     id: 1,
//     wins: 1,
//     time: 10,
//   },
//   {
//     id: 2,
//     wins: 2,
//     time: 5,
//   },
//   {
//     id: 3,
//     wins: 5,
//     time: 2,
//   },
//   {
//     id: 4,
//     wins: 2,
//     time: 7.55,
//   },
// ];
