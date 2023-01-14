import {isNumberObject} from 'util/types';

export default class Loaders {
    private readonly host: string = 'http://127.0.0.1:3000';
    private readonly garage: string = '/garage';
    private readonly winners: string = '/winners';
    public async getCars(limit?: number, page?: number): Promise<CarsData> {
        let path = '';
        if (page) {
            path += `?_page=${page}`;
        }
        if (limit) {
            path +=  !page ? `?_limit=${limit}` : `&_limit=${limit}`;
        }

        const url: URL = new URL(this.garage + path, this.host);
        return await this.RequestServer<CarsData>(url, {method: 'GET'});
    }
    // Operation for cars
    public async getCar(id: number): Promise<CarData> {
        let url = new URL(this.garage + `${id}`, this.host);
        return await this.RequestServer<CarData>(url, {method: 'GET'});
    }
    public async createCar(name: string, color: string): Promise<CarData> {
        const url: URL = new URL(this.garage, this.host);
        const car: CarParams = {
            name: name,
            color: color
        }
        const requestInit: RequestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(car),
        }
        return await this.RequestServer<CarData>(url, requestInit);
    }
    public async deleteCar(id: number): Promise<EmptyObject> {
        const url: URL = new URL(this.garage + `${id}`, this.host);
        return await this.RequestServer<EmptyObject>(url, {method: 'DELETE'});
    }
    public async updateCar(id: number, name: string, color: string): Promise<CarData> {
        const url: URL = new URL(this.garage + `${id}`, this.host);
        const car: CarParams = {
            name: name,
            color: color
        }
        const requestInit: RequestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(car),
        }
        return await this.RequestServer(url, requestInit);
    }
    // Operation for winner
    public async getWinners(page?: number, limit?: number, sort?: string, order?: string):Promise<AllWinners> {
        // _page = number
        // _limit = number
        // _sort = 'id'|'wins'|'time'
        // _order= 'ASC'|'DESC'
        // If _limit param is passed api returns a header X-Total-Count that countains total number of records.
        let path = '';
        if (page) {
            path += `?_page=${page}`;
        }
        if (limit) {
            path += !page ? `?_limit=${limit}` : `&_limit=${limit}`;
        }
        if (sort) {
            path += !page || !limit ? `?` : `&`;
            path += `_sort=${sort}`;
        }
        if (!order) {
            path += !page || !limit || !sort ? `?` : `&`;
            path += `_order=${order}`;
        }
        const url: URL = new URL(this.winners + path, this.host);
        return await this.RequestServer(url, {method: 'GET'});
    }
    public async getWinner(id: number): Promise<Winner | EmptyObject> {
        const url: URL = new URL(this.winners + `${id}`, this.host);
        return await this.RequestServer<Winner | EmptyObject>(url, {method: 'GET'});
    }
    public async createWinner(id: number, wins: number, time: number): Promise<Winner> {
        const url: URL = new URL(this.winners, this.host);
        const data: Winner = {
            id: id,
            wins: wins,
            time: time,
        }
        const requestInit: RequestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }
        return await this.RequestServer<Winner>(url, requestInit);
    }
    public async deleteWinner(id: number): Promise<EmptyObject>{
        const url: URL = new URL(this.winners + `${id}`, this.host);
        return await this.RequestServer<EmptyObject>(url, {method: 'DELETE'});
    }
    public async updateWinner(id: number, wins: number, time: number): Promise<Winner | EmptyObject> {
        const url: URL = new URL(this.winners + `${id}`, this.host);
        const body: WinnerParam = {
            wins: wins,
            time: time,
        }
        const requestInit: RequestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        }
        return this.RequestServer<Winner | EmptyObject>(url, requestInit);
    }
    private async RequestServer<T>(url: URL, options?: RequestInit): Promise<T> {
        const response: Response = await fetch(url, options!);
        if (!response.ok) throw new Error(`Server error: ${response.statusText} -> ${response.status}`);
        return await response.json();
    }
}