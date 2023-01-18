import CarsLoader from './loaders-cars';
import State from './state';
import CarRace from '../components/car-race/car-race';

export default class GarageUtils {
  public async updateRaceList(block: HTMLElement): Promise<void> {
    const titleCount: HTMLSpanElement = block.querySelector('.main__garage-count') as HTMLSpanElement;
    let raceBlock: HTMLElement = block.querySelector('.main__race-block') as HTMLSpanElement;
    raceBlock.remove();
    raceBlock = document.createElement('div');
    raceBlock.className = 'main__race-block';
    (block.querySelector('.main__garage-label') as HTMLElement).after(raceBlock);
    const loader = new CarsLoader();
    const state = new State();
    const resp = await loader.getCars(7, state.getGaragePage());
    if (resp.length === 0) throw new Error('Cannot load cars data into GarageUtils');

    resp.forEach((car: CarData) => {
      const race = new CarRace(car);
      raceBlock.append(race.carRace);
      // TODO: add listener for every cars!
    });
    titleCount.textContent = String(loader.getCountCars());
  }
}
