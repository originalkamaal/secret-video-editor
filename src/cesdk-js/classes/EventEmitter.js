export class EventEmitter {
  eventListeners;
  globalListeners;
  batchedEvents;
  batching = 0;
  conflateBatching = false;
  id;
  constructor(id) {
    (this.eventListeners = {}),
      (this.globalListeners = []),
      (this.batchedEvents = []),
      (this.id = id);
  }
  addGlobalListener(listener) {
    return (
      this.globalListeners.push(listener),
      () => {
        this.removeGlobalListener(listener);
      }
    );
  }
  removeGlobalListener(listener) {
    const t = this.globalListeners.lastIndexOf(listener);
    return -1 === t || this.globalListeners.splice(t, 1), this;
  }
  addListener(event, callback) {
    const n = this.eventListeners[event];
    return (
      n ? n.push(callback) : (this.eventListeners[event] = [callback]),
      () => {
        this.removeListener(event, callback);
      }
    );
  }
  removeListener(event, callback) {
    const n = this.eventListeners[event];
    if (!n) return this;
    const s = n.lastIndexOf(callback);
    return -1 === s || n.splice(s, 1), this;
  }
  removeAllEventListeners(event) {
    return (
      event
        ? (this.eventListeners[event] = undefined)
        : (this.eventListeners = {}),
      this
    );
  }
  removeAllGlobalListeners() {
    return (this.globalListeners = []), this;
  }
  removeAllListeners() {
    return this.removeAllGlobalListeners().removeAllEventListeners();
  }
  on(event, callback) {
    return this.addListener(event, callback);
  }
  off(event, callback) {
    return this.removeListener(event, callback);
  }
  emit = (event, options) => (
    this.batching
      ? (this.batchedEvents.push({ event: event, options: options }),
        this.batching > 0 &&
          this.batchedEvents.length >= this.batching &&
          this.flush())
      : this.emitToListener({ event: event, options: options }),
    this
  );
  enableBatching(config = {}) {
    (this.batching = null != config.batchSize ? config.batchSize : -1),
      (this.conflateBatching =
        null != config.conflateBatching
          ? config.conflateBatching
          : this.conflateBatching);
  }
  disableBatching() {
    this.batching = 0;
  }
  isBatching() {
    return !!this.batching;
  }
  flush() {
    this.conflateBatching && this.batchedEvents.length > 0
      ? this.emitToListener(this.batchedEvents)
      : this.batchedEvents.forEach(({ event, options }) => {
          this.emitToListener({ event, options });
        }),
      (this.batchedEvents = []);
  }
  emitToListener = (eventData) => {
    const events = Array.isArray(eventData) ? eventData : [eventData];
    events.forEach((e) => {
      const t = this.eventListeners[e.event];
      t && t.length && t.forEach((t) => t(e));
    }),
      this.globalListeners.forEach((e) => e(events));
  };
  toString() {
    return this.id;
  }
}
