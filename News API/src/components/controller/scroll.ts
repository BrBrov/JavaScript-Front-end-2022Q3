class Scroll {
    private clickControl: boolean;
    private startPosition: number;
    private offset: number;
    scrollBar!: HTMLElement;
    constructor() {
        this.clickControl = false;
        this.startPosition = 0;
        this.offset = 0;
    }

    getScrollBar(): void {
        this.scrollBar = document.querySelector('.sources') as HTMLElement;
    }
    getPosition(e: MouseEvent): void {
        e.preventDefault();
        this.clickControl = <boolean>true;
        this.startPosition = e.pageX - this.scrollBar.offsetLeft;
        this.offset = this.scrollBar.scrollLeft;
    }
    endMoving(): void {
        this.clickControl = false;
    }
    move(e: MouseEvent): void {
        if (!this.clickControl) return;
        const start: number = e.pageX - this.scrollBar.offsetLeft;
        const step: number = (start - this.startPosition) * 1; //speed move
        this.scrollBar.scrollLeft = this.offset - step;
    }
    wheel(e: WheelEvent): void {
        e.preventDefault();
        this.scrollBar.scrollLeft += e.deltaY - 75; //speed mode
    }
}

export default Scroll;
