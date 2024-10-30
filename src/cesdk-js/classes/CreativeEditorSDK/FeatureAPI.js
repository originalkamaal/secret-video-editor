import { _B } from "../../working";

export class FeatureAPI {
  #t;
  constructor(e) {
    this.#t = e;
  }
  enable(e, t) {
    const n = Array.isArray(e) ? e : [e];
    _B(() => {
      n.forEach((e) => this.#t.enable(e, t));
    })();
  }
  isEnabled(e, t) {
    return this.#t.isEnabled(e, t);
  }
}
