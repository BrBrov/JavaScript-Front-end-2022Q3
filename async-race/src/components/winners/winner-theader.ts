import './winner-theader.scss';

export default class WinnerTableHeader {
  public header: HTMLElement;

  constructor() {
    this.header = this.createHeader();
  }

  private createHeader(): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'main__winners-theader';

    const classNames: Array<string> = ['main__table-number', 'main__table-car', 'main__table-name', 'main__table-wins', 'main__table-time'];

    const arrData: Array<string> = ['ID ↓', 'Car', 'Name', 'Wins', 'Best time']; // ↑

    arrData.forEach((info: string, index: number) => {
      const span: HTMLSpanElement = this.createSpan(info, classNames[index]);
      wrapper.append(span);
    });

    return wrapper;
  }

  private createSpan(text: string, className: string): HTMLElement {
    const span: HTMLSpanElement = document.createElement('span');
    span.className = className;
    span.textContent = text;

    return span;
  }
}
