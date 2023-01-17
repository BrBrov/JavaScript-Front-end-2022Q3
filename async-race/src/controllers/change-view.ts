import Save from '../utils/save-elems';
import State from '../utils/state';
import CarsLoader from '../utils/loaders-cars';
import WinnersLoader from '../utils/loaders-winners';
import Main from '../page/main/main';

export default class ViewChange {
  private saver: Save;

  private main: Main;

  private state: State;

  private clickCTRL: boolean = false;

  constructor(main: Main) {
    this.main = main;
    this.saver = new Save();
    this.state = new State();
    this.addListeners();
  }

  private addListeners(): void {
    const btnGarage: HTMLButtonElement = document.querySelector('.main__button-garage') as HTMLButtonElement;
    const btnWinners: HTMLButtonElement = document.querySelector('.main__button-winners') as HTMLButtonElement;

    btnGarage.addEventListener('click', this.toGarage.bind(this));
    btnWinners.addEventListener('click', this.toWinners.bind(this));
  }
  // main__block-view for garage;

  private async toWinners(ev: Event): Promise<void> {
    ev.stopPropagation();
    if (this.clickCTRL) return;
    if (this.state.getView() === 'garage') {
      this.clickCTRL = true;
      const winLoader = new WinnersLoader();
      const carsLoader = new CarsLoader();
      // sort = 'id'|'wins'|'time', order = 'none' | ASC'|'DESC'
      const winsData: AllWinners = await winLoader.getWinners(
        this.state.getWinnersPage(),
        10,
        this.state.getSort(),
        this.state.getOrder(),
      );
      const carsData: CarsData = await carsLoader.getCars();
      const count: number = winLoader.getCountWinners() || 0;
      this.main.createWinners(winsData, carsData, count);
      this.main.addWinners();
      this.state.setView('winners');
      this.clickCTRL = false;
    }
  }

  private async toGarage(ev: Event): Promise<void> {
    ev.stopPropagation();
    if (this.clickCTRL) return;
    console.log(ev);
    if (this.state.getView() === 'winners') {
      this.clickCTRL = true;
      console.log('+++');
      if (this.saver.check()) {
        this.main.garage!.garage = this.saver.restore() as HTMLElement;
      } else {
        const carLoader = new CarsLoader();
        const carsData: CarsData = await carLoader.getCars(7, this.state.getGaragePage());
        const count: number = carLoader.getCountCars();
        this.main.createGarage(carsData, count);
      }
      this.main.addGarage();
      this.state.setView('garage');
      this.clickCTRL = false;
    }
  }
}
