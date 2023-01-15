export default class State {
    private state: StateData | undefined;
    private readonly instance: State | undefined;

    constructor() {
        if (!this.instance) {
            this.instance = new State();
            this.instance.getState();
        }
        return this.instance;
    }

    public changeView(): void {
        if (this.state) {
            this.state.view = this.state?.view === 'garage' ? 'winners' : 'garage';
        }
        this.getState();
    }

    public getView(): string {
        if (!this.state) {
            this.getState();
        }
        return this.state!.view;
    }

    public getGaragePage(): number {
        if (!this.state) {
            this.getState();
        }
        return this.state!.garagePage;
    }

    public setGaragePage(page: number): void {
        if (!this.state) {
            this.getState();
        }
        this.state!.garagePage = page;
    }

    public getWinnersPage(): number {
        if (!this.state) {
            this.getState();
        }
        return this.state!.winnersPage;
    }

    public setWinnersPage(page: number): void {
        if (!this.state) {
            this.getState();
        }
        this.state!.winnersPage = page;
    }

    private getState(): void {
        const data = localStorage.get('state');
        if (!data) {
            const newState: StateData = {
                view: 'garage',
                garagePage: 1,
                winnersPage: 1,
            };
            localStorage.setItem('state', JSON.stringify(newState));
        }
        this.state = JSON.parse(data);
    }
}
