import CarsLoader from '../utils/loaders-cars';
import WinnersLoader from '../utils/loaders-winners';
import GarageUtils from '../utils/garage-utils';

export default class RaceController {
  private block: HTMLElement;

  constructor(block: HTMLElement) {
    this.block = block;
    this.init();
  }

  private init(): void {
    this.addListeners();
  }

  private addListeners(): void {
    this.block.addEventListener('click', this.onClick.bind(this));
  }

  private async onClick(ev: Event): Promise<void> {
    ev.stopPropagation();
    const target = <HTMLElement> ev.target;

    switch (target.className) {
      case 'main__button-select':
        this.onSelect(ev);
        break;
      case 'main__button-remove':
        await this.onRemove(ev);
        break;
      default:
        break;
    }
  }

  private onSelect(ev: Event): void {
    ev.stopPropagation();
    const target: HTMLButtonElement = ev.target as HTMLButtonElement;
    const id: string = <string>target.dataset.id;
    const btnUpdateCar: HTMLButtonElement = document.querySelector('.main__update-create') as HTMLButtonElement;
    btnUpdateCar.dataset.mode = id;
    btnUpdateCar.textContent = 'Update';
    const input: HTMLInputElement = document.querySelector('.main__car-name') as HTMLInputElement;
    const carName: HTMLSpanElement = this.block.querySelector('.main__name-car') as HTMLSpanElement;
    input.value = <string>carName.textContent;
    const inputColor: HTMLInputElement = document.querySelector('.main__car-palette') as HTMLInputElement;
    const carSvg: SVGElement = this.block.querySelector('.main__car-svg') as SVGElement;
    inputColor.value = <string>carSvg.dataset.color;
  }

  private async onRemove(ev: Event): Promise<void> {
    ev.stopPropagation();
    const target: HTMLButtonElement = ev.target as HTMLButtonElement;
    const id: string = <string>target.dataset.id;
    const loader: CarsLoader = new CarsLoader();
    const winner: WinnersLoader = new WinnersLoader();
    await loader.deleteCar(Number(id));
    const car: EmptyObject | Winner = await winner.getWinner(Number(id));
    if ('wins' in car && car.wins) await winner.deleteWinner(Number(id));
    const utils: GarageUtils = new GarageUtils();
    await utils.updateRaceList();
  }
}
