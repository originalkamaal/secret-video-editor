export var RoleManager = class {
  #settings;
  constructor(settings) {
    this.#settings = settings;
  }
  setRole(e) {
    this.#settings.roles.regularRole.update(e);
  }
  setPageFormats(e) {
    this.#settings.pageFormats.update(e);
  }
};
