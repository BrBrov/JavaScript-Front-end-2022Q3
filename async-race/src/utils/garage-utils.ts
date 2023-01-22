import CarsLoader from './loaders-cars';
import State from './state';
import CarRace from '../components/car-race/car-race';

export default class GarageUtils {
  public async updateRaceList(): Promise<void> {
    const block: HTMLElement = <HTMLElement> document.querySelector('.main__garage-block');
    const titleCount: HTMLSpanElement = block.querySelector('.main__garage-count') as HTMLSpanElement;
    let raceBlock: HTMLElement = block.querySelector('.main__race-block') as HTMLSpanElement;
    raceBlock.remove();
    raceBlock = document.createElement('div');
    raceBlock.className = 'main__race-block';
    (block.querySelector('.main__garage-label') as HTMLElement).after(raceBlock);
    const loader = new CarsLoader();
    const state = new State();
    const resp: CarsData = await loader.getCars(7, state.getGaragePage());
    if (resp.length === 0) {
      let page: number = state.getGaragePage();
      if (page <= 1) {
        throw new Error('Page cannot to be less then 1!');
      }
      page -= 1;
      state.setGaragePage(page);
      await this.updateRaceList();
      return;
    }

    resp.forEach((car: CarData) => {
      const race = new CarRace(car);
      raceBlock.append(race.carRace);
    });
    titleCount.textContent = String(loader.getCountCars());
    this.updateGaragePageInput();
  }

  private updateGaragePageInput(): void {
    const inputPage: HTMLInputElement = document.querySelector('.main__page-input') as HTMLInputElement;
    const state = new State();
    inputPage.value = String(state.getGaragePage());
  }
}
