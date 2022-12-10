import './news.css';

class News {
    draw(data: Array<NewsData>): void {
        const news: Array<NewsData> =
            data.length >= 10 ? data.filter((_item: NewsData, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = <DocumentFragment>document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = <HTMLTemplateElement>document.querySelector('#newsItemTemp');

        news.forEach((item: NewsData, idx: number) => {
            const newsClone: HTMLElement = newsItemTemp.content.cloneNode(true) as HTMLElement;

            if (idx % 2) {
                const elem: HTMLElement = newsClone.querySelector('.news__item') as HTMLElement;
                elem.classList.add('alt');
            }

            const metaPhoto: HTMLElement = <HTMLElement>newsClone.querySelector('.news__meta-photo');
            metaPhoto.style.backgroundImage = `url(${item.urlToImage || './img/news_placeholder.jpg'})`;

            let elem: HTMLElement = newsClone.querySelector('.news__meta-author') as HTMLElement;
            elem.textContent = item.author || item.source.name;
            elem = newsClone.querySelector('.news__meta-date') as HTMLElement;
            elem.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            elem = newsClone.querySelector('.news__description-title') as HTMLElement;
            elem.textContent = item.title;
            elem = newsClone.querySelector('.news__description-source') as HTMLElement;
            elem.textContent = item.source.name;
            elem = newsClone.querySelector('.news__description-content') as HTMLElement;
            elem.textContent = item.description;
            elem = newsClone.querySelector('.news__read-more a') as HTMLElement;
            elem.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        let elem: HTMLElement = document.querySelector('.news') as HTMLElement;
        elem.innerHTML = '';
        elem = document.querySelector('.news') as HTMLElement;
        elem.appendChild(fragment);
    }
}

export default News;
