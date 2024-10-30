export var ComponentController = class {
  constructor() {
    this.componentControls = new Set();
  }
  subscribe(e) {
    return (
      this.componentControls.add(e), () => this.componentControls.delete(e)
    );
  }
  start(e, t) {
    this.componentControls.forEach((n) => {
      n.start(e.nativeEvent || e, t);
    });
  }
};
