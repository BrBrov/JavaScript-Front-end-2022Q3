import GarageLabel from './garage-label';
import CarRace from '../car-race/car-race';
import Pagination from './garage-pagination';
import './garage.scss';

export default class Garage {
    private label: GarageLabel | undefined;

    private carsArray: CarRace[] | undefined;

    private pagination: Pagination | undefined;

    constructor(count: number, data: CarsData) {
        this.createGarage(count, data);
    }

    private createGarage(count: number, data: CarsData): HTMLElement {
        const wrapper: HTMLElement = document.createElement('div');
        wrapper.className = 'main__garage-block';
        this.label = new GarageLabel(count);

        wrapper.append(this.label.label);

        const raceBlock: HTMLElement = document.createElement('div');
        raceBlock.className = 'main__race-block';

        this.generateCarsRace(data);

        this.carsArray?.forEach((race: CarRace) => {
            raceBlock.append(race.carRace);
        })

        wrapper.append(raceBlock);

        this.pagination = new Pagination();

        wrapper.append(this.pagination.pagination);

        return wrapper;
    }

    private generateCarsRace(data: CarsData): void {
        this.carsArray = [];
        this.carsArray = data.map((carData: CarData) => {
            return new CarRace(carData);
        });
    }

    public updateGarage(data: CarsData): void {
        this.generateCarsRace(data);
    }

    private onPagination(data: CarsData): void {
        this.generateCarsRace(data);
    }

    public setCarCount(count: number): void {
        this.label?.setCount(count);
    }
    public updateCar(name: string, color: string, id: number): void {
        const carRace: CarRace | undefined = this.carsArray?.find((race: CarRace) => race.carRace.dataset.id === `${id}`);
        if (carRace) {
            carRace.updateCar(name, color);
        }
        throw new Error('Not found car for update!');
    }
}