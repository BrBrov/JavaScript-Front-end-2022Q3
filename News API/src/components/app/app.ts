import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const source = <Element>document.querySelector('.sources');
        source.addEventListener('click', (e): void => {
            this.controller.getNews(e, (data): void => this.view.drawNews(<ModifyData>data));
        });

        this.controller.getSources((data): void => this.view.drawSources(<ResponseData>data));
    }
}

export default App;
