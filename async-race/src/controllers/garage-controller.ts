import GarageUtils from '../utils/garage-utils';
import LoaderCar from '../utils/loaders-cars';

export default class GarageController {
  private garage: HTMLElement;

  private menu: HTMLElement;

  private nameCar: HTMLInputElement | undefined;

  private colorCar: HTMLInputElement | undefined;

  private btnCreateUpdate: HTMLButtonElement | undefined;

  private btnRace: HTMLButtonElement | undefined;

  private btnReset: HTMLButtonElement | undefined;

  private btnCreateCars: HTMLButtonElement | undefined;

  private pgLeft: HTMLButtonElement | undefined;

  private pgRight: HTMLButtonElement | undefined;

  private pgInput: HTMLInputElement | undefined;

  // private modeRace: boolean = false;
  //
  // private modeCreate: boolean = false;

  constructor(menu: HTMLElement, garage: HTMLElement) {
    this.menu = menu;
    this.garage = garage;
    this.addElems();
    this.addListeners();
  }

  private addElems(): void {
    this.btnCreateUpdate = this.menu?.querySelector('.main__update-create') as HTMLButtonElement;
    this.btnRace = this.menu?.querySelector('.main__button-race') as HTMLButtonElement;
    this.btnReset = this.menu?.querySelector('.main__button-reset') as HTMLButtonElement;
    this.btnCreateCars = this.menu?.querySelector('.main__button-generate') as HTMLButtonElement;
    this.nameCar = this.menu?.querySelector('.main__car-name') as HTMLInputElement;
    this.colorCar = this.menu?.querySelector('.main__car-palette') as HTMLInputElement;
    this.pgLeft = this.garage?.querySelector('.main__page-left') as HTMLButtonElement;
    this.pgRight = this.garage?.querySelector('.main__page-right') as HTMLButtonElement;
    this.pgInput = this.garage?.querySelector('.main__page-input') as HTMLInputElement;
  }

  private addListeners(): void {
    this.btnCreateUpdate?.addEventListener('click', this.onBtnCreateUpdate.bind(this));
    this.btnRace?.addEventListener('click', this.onRace.bind(this));
    this.btnReset?.addEventListener('click', this.onReset.bind(this));
    this.btnCreateCars?.addEventListener('click', this.onCreateCars.bind(this));
  }

  private async onBtnCreateUpdate(ev: Event): Promise<void> {
    ev.stopPropagation();
    const target: HTMLElement = ev.target as HTMLElement;
    const carsLoader = new LoaderCar();
    if (!this.nameCar!.value) {
      this.nameCar!.placeholder = 'You don\'t enter car!';
      setTimeout(() => { this.nameCar!.placeholder = 'Enter car name!'; });
    }
    const text: string = this.nameCar!.value;
    const color: string = this.colorCar!.value;
    let resp: CarData;
    if (target.dataset.mode === 'create') {
      resp = await carsLoader.createCar(text, color);
    } else {
      const id = Number(target.dataset.mode);
      resp = await carsLoader.updateCar(id, text, color);
    }

    if (!resp.name) throw new Error('Car wasn\'t create!');
    const utils = new GarageUtils();
    await utils.updateRaceList(this.garage);
    this.nameCar!.value = '';
  }

  private async onRace(ev: Event): Promise<void> {
    console.log(ev);
  }

  private async onReset(ev: Event): Promise<void> {
    console.log(ev);
  }

  private async onCreateCars(ev: Event): Promise<void> {
    console.log(ev);
  }
}
