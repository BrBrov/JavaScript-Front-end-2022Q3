import './sources.css';

class Sources {
    draw(data: Array<DynamicObject>): void {
        const fragment: DocumentFragment = <DocumentFragment>document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');

        data.forEach((item: DynamicObject) => {
            const sourceClone: HTMLElement = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            let elem: HTMLElement = sourceClone.querySelector('.source__item-name') as HTMLElement;
            elem.textContent = <string>item.name;
            elem = sourceClone.querySelector('.source__item') as HTMLElement;
            elem.setAttribute('data-source-id', <string>item.id);

            fragment.append(sourceClone);
        });

        const elem: HTMLElement = document.querySelector('.sources') as HTMLElement;
        elem.append(fragment);
    }
}

export default Sources;
