export default class SaveElems {
  private template: Node | undefined;

  public save(template: Node): void {
    this.template = template;
  }

  public restore(): Node | undefined {
    if (!this.template) {
      return undefined;
    }
    return this.template.cloneNode(true);
  }

  public check(): boolean {
    return !!this.template;
  }
}
