import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '500223348eb84205b4ecefe586bd0fff', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
