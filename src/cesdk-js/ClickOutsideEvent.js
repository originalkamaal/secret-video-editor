export class ClickOutsideEvent {
  #e = false;
  get propagationStopped() {
    return this.#e;
  }
  target;
  constructor(e) {
    this.target = e;
  }
  stopPropagation() {
    this.#e = true;
  }
  isOutside(...e) {
    return e.every(
      (e) => !(function (e, t) {
        return !!t && t.contains(e);
      })(this.target, e)
    );
  }
  clone() {
    return new ClickOutsideEvent(this.target);
  }
}
