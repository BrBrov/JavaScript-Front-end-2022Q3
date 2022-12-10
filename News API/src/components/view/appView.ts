import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news: News;
    private sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ModifyData): void {
        const values: Array<NewsData> = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ResponseData): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
