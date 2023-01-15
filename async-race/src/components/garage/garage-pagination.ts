import State from '../../utils/state';
import ButtonElement from '../button/button';
import './garage-pagination.scss';

export default class GaragePagination {
  public pagination: HTMLElement;

  private state: State;

  constructor() {
    this.state = new State();
    this.pagination = this.createPagination();
  }

  private createPagination(): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'main__garage-pagination';
    let btn: HTMLButtonElement = new ButtonElement('main__page-left', '<<').button;

    wrapper.append(btn);

    const input: HTMLInputElement = document.createElement('input');
    input.className = 'main__page-input';
    input.type = 'number';
    input.value = String(this.state.getGaragePage());

    wrapper.append(input);

    btn = new ButtonElement('main__page-right', '>>').button;

    wrapper.append(btn);

    return wrapper;
  }
}
