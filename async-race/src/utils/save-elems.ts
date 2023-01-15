export default class SaveElems {
    private readonly saveClass: SaveElems | undefined;
    private template: HTMLElement | undefined;

    constructor() {
        if (!this.saveClass) {
            this.saveClass = new SaveElems();
            this.saveClass.template = undefined;
        }
        return this.saveClass;
    }

    public save(template: HTMLElement): void {
        this.template = template;
    }

    public restore(): HTMLElement | null {
        if (!this.template) {
            return null;
        }
        return this.template;
    }
}