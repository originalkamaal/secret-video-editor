import { createLazyModule } from "./others/createLazyModule";


export var classnames = createLazyModule({
  "../../node_modules/classnames/index.js"(e, t) {
    !(function () {
      var e = {}.hasOwnProperty;
      function n() {
        for (var t = [], s = 0; s < arguments.length; s++) {
          var i = arguments[s];
          if (i) {
            var o = typeof i;
            if ("string" === o || "number" === o) t.push(i);
            else if (Array.isArray(i) && i.length) {
              var r = n.apply(null, i);
              r && t.push(r);
            } else if ("object" === o)
              for (var a in i) e.call(i, a) && i[a] && t.push(a);
          }
        }
        return t.join(" ");
      }
      void 0 !== t && t.exports
        ? ((n.default = n), (t.exports = n))
        : "function" == typeof define &&
          "object" == typeof define.amd &&
          define.amd
          ? define("classnames", [], function () {
            return n;
          })
          : (window.classNames = n);
    })();
  },
});
