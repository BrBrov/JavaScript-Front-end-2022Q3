export default class CarsEngine {
    private readonly garage: string = '/engine';
    private readonly host: string = 'http://127.0.0.1:3000';
    public startEngine: boolean = false;
    public async StartEngine(id: number): Promise<EngineCarParams> {
        let path = '/engine';
        path += `?id=${id}&status=started`;
        const url: URL = new URL(path, this.host);
        const resp = await fetch(url, {method: 'PATCH'});
        if (resp.status === 200) {
            return await resp.json();
        }
        throw new Error(`Bad response: ${resp.status} -> ${resp.statusText}`);
    }
    public async StopEngine(id: number): Promise<EngineCarParams> {
        let path = '/engine';
        path += `?id=${id}&status=stopped`;
        const url: URL = new URL(path, this.host);
        const resp = await fetch(url, {method: 'PATCH'});
        if (resp.status === 200) {
            return await resp.json();
        }
        throw new Error(`Bad response: ${resp.status} -> ${resp.statusText}`);
    }
    public async checkDriverMode(id: number): Promise<SuccessRace> {
        const path = `?id=${id}&status=drive`;
        const url: URL = new URL(this.garage + path, this.host);
        const resp = await fetch(url, {method: 'PATCH'});
        if (resp.status === 200) {
            return await resp.json();
        }
        if (resp.status === 500) {
            return {
                success: false
            }
        }
        throw new Error(`Bad response: ${resp.status} -> ${resp.statusText}`);
    }
}