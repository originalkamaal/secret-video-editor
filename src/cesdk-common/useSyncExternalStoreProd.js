import { createLazyModule } from "./others/createLazyModule";
import { react } from "./react";

export var useSyncExternalStoreProd = createLazyModule({
  "../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.min.js"(
    e
  ) {
    var t = react();
    var n = "function" == typeof Object.is
      ? Object.is
      : function (e, t) {
        return (
          (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t)
        );
      }, s = t.useState, i = t.useEffect, o = t.useLayoutEffect, r = t.useDebugValue;
    function a(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var s = t();
        return !n(e, s);
      } catch (e) {
        return !0;
      }
    }
    var l = "undefined" == typeof window ||
      void 0 === window.document ||
      void 0 === window.document.createElement
      ? function (e, t) {
        return t();
      }
      : function (e, t) {
        var n = t(), l = s({ inst: { value: n, getSnapshot: t } }), c = l[0].inst, u = l[1];
        return (
          o(
            function () {
              (c.value = n), (c.getSnapshot = t), a(c) && u({ inst: c });
            },
            [e, n, t]
          ),
          i(
            function () {
              return (
                a(c) && u({ inst: c }),
                e(function () {
                  a(c) && u({ inst: c });
                })
              );
            },
            [e]
          ),
          r(n),
          n
        );
      };
    e.useSyncExternalStore =
      void 0 !== t.useSyncExternalStore ? t.useSyncExternalStore : l;
  },
});
export var useSyncExternalStore = createLazyModule({
  "../../node_modules/use-sync-external-store/shim/index.js"(e, t) {
    t.exports = useSyncExternalStoreProd();
  },
});
