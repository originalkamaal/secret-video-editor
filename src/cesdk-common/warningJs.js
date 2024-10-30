import { createLazyModule } from "./others/createLazyModule";

export var warningJs = createLazyModule({
  "../../node_modules/warning/warning.js"(e, t) {
    var n = function () { };
    t.exports = n;
  },
});
