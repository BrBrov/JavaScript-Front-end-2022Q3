export default class SaveElems {
  private template: HTMLElement | undefined;

  public save(template: HTMLElement): void {
    this.template = template;
  }

  public restore(): HTMLElement | null {
    if (!this.template) {
      return null;
    }
    return this.template;
  }

  public clear(): void {
    this.template = undefined;
  }
}
