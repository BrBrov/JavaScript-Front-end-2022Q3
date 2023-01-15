export default class State {
  private state: StateData | undefined;

  constructor() {
    this.getState();
  }

  public changeView(): void {
    if (this.state) {
      this.state.view = this.state?.view === 'garage' ? 'winners' : 'garage';
    }
    this.setState();
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
    this.setState();
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
    this.setState();
  }

  private getState(): void {
    const data = localStorage.getItem('state');
    if (!data) {
      const newState: StateData = {
        view: 'garage',
        garagePage: 1,
        winnersPage: 1,
      };
      localStorage.setItem('state', JSON.stringify(newState));
    }
    this.state = JSON.parse(data!);
  }

  private setState(): void {
    localStorage.setItem('state', JSON.stringify(this.state));
  }
}
