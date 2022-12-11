import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import Scroll from '../controller/scroll';

class App {
    private controller: AppController;
    private view: AppView;
    private scroll!: Scroll;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        this.scroll = new Scroll();
    }

    start(): void {
        const source = <Element>document.querySelector('.sources');
        source.addEventListener('click', (e): void => {
            this.controller.getNews(e, (data): void => this.view.drawNews(<ModifyData>data));
        });
        this.controller.getSources((data): void => this.view.drawSources(<ResponseData>data));
        this.scroll.getScrollBar();
        this.scroll.scrollBar.addEventListener('mousedown', (e: MouseEvent): void => this.scroll.getPosition(e));
        this.scroll.scrollBar.addEventListener('mouseleave', (): void => this.scroll.endMOving());
        this.scroll.scrollBar.addEventListener('mouseup', (): void => this.scroll.endMOving());
        this.scroll.scrollBar.addEventListener('mousemove', (e: MouseEvent): void => this.scroll.move(e));
        this.scroll.scrollBar.addEventListener('wheel', (e: WheelEvent): void => this.scroll.wheel(e));
    }
}

export default App;
