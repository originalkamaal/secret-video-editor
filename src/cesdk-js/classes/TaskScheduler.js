export var TaskScheduler = class {
  constructor() {
    (this.order = []), (this.scheduled = new Set());
  }
  add(e) {
    if (!this.scheduled.has(e))
      return this.scheduled.add(e), this.order.push(e), !0;
  }
  remove(e) {
    const t = this.order.indexOf(e);
    -1 !== t && (this.order.splice(t, 1), this.scheduled.delete(e));
  }
  clear() {
    (this.order.length = 0), this.scheduled.clear();
  }
};
