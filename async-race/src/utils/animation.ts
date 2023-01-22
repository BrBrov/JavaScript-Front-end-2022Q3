export default class Animate {
  public animate: Animation | undefined;

  constructor(element: HTMLElement, duration: number) {
    this.init(element, duration);
  }

  private init(element: HTMLElement, duration: number): void {
    const keyFrame: KeyframeEffect = new KeyframeEffect(
      element,
      [
        { left: '0%' },
        { left: 'calc(100% - 67px)' },
      ],
      { duration, fill: 'forwards' },
    );

    this.animate = new Animation(keyFrame);
  }

  public async start(): Promise<void> {
    await this.animate?.play();
  }

  public async stop(): Promise<void> {
    await this.animate?.pause();
  }

  public async revert(): Promise<void> {
    await this.animate?.reverse();
  }
}
