export default class Loader {
  protected countCars: number | undefined;

  protected countWinners: number | undefined;

  protected async RequestServer<T>(url: URL, options?: RequestInit): Promise<T> {
    const response: Response = await fetch(url, options!);
    if (!response.ok) throw new Error(`Server error: ${response.statusText} -> ${response.status}`);
    const data = await response.json();
    if (this.checkTypeAllWinners(data)) {
      const count = response.headers.get('X-Total-Count');
      if (count) this.countWinners = Number(count);
    }
    if (this.checkTypeCarsData(data)) {
      const count = response.headers.get('X-Total-Count');
      if (count) this.countCars = Number(count);
    }
    return data;
  }

  private checkTypeAllWinners(data: AllWinners): data is AllWinners {
    return !data[0].time;
  }

  private checkTypeCarsData(data: CarsData): data is CarsData {
    return !data[0].color;
  }
}
