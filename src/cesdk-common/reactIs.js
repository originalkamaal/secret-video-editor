import { createLazyModule } from "./others/createLazyModule";

export var reactIs = createLazyModule({
  "../../node_modules/react-is/cjs/react-is.production.min.js"(e) {
    var t = "function" == typeof Symbol && Symbol.for, n = t ? Symbol.for("react.element") : 60103, s = t ? Symbol.for("react.portal") : 60106, i = t ? Symbol.for("react.fragment") : 60107, o = t ? Symbol.for("react.strict_mode") : 60108, r = t ? Symbol.for("react.profiler") : 60114, a = t ? Symbol.for("react.provider") : 60109, l = t ? Symbol.for("react.context") : 60110, c = t ? Symbol.for("react.async_mode") : 60111, u = t ? Symbol.for("react.concurrent_mode") : 60111, d = t ? Symbol.for("react.forward_ref") : 60112, p = t ? Symbol.for("react.suspense") : 60113, f = t ? Symbol.for("react.suspense_list") : 60120, h = t ? Symbol.for("react.memo") : 60115, m = t ? Symbol.for("react.lazy") : 60116, g = t ? Symbol.for("react.block") : 60121, x = t ? Symbol.for("react.fundamental") : 60117, b = t ? Symbol.for("react.responder") : 60118, y = t ? Symbol.for("react.scope") : 60119;
    function v(e) {
      if ("object" == typeof e && null !== e) {
        var t = e.$$typeof;
        switch (t) {
          case n:
            switch ((e = e.type)) {
              case c:
              case u:
              case i:
              case r:
              case o:
              case p:
                return e;
              default:
                switch ((e = e && e.$$typeof)) {
                  case l:
                  case d:
                  case m:
                  case h:
                  case a:
                    return e;
                  default:
                    return t;
                }
            }
          case s:
            return t;
        }
      }
    }
    function w(e) {
      return v(e) === u;
    }
    (e.AsyncMode = c),
      (e.ConcurrentMode = u),
      (e.ContextConsumer = l),
      (e.ContextProvider = a),
      (e.Element = n),
      (e.ForwardRef = d),
      (e.Fragment = i),
      (e.Lazy = m),
      (e.Memo = h),
      (e.Portal = s),
      (e.Profiler = r),
      (e.StrictMode = o),
      (e.Suspense = p),
      (e.isAsyncMode = function (e) {
        return w(e) || v(e) === c;
      }),
      (e.isConcurrentMode = w),
      (e.isContextConsumer = function (e) {
        return v(e) === l;
      }),
      (e.isContextProvider = function (e) {
        return v(e) === a;
      }),
      (e.isElement = function (e) {
        return "object" == typeof e && null !== e && e.$$typeof === n;
      }),
      (e.isForwardRef = function (e) {
        return v(e) === d;
      }),
      (e.isFragment = function (e) {
        return v(e) === i;
      }),
      (e.isLazy = function (e) {
        return v(e) === m;
      }),
      (e.isMemo = function (e) {
        return v(e) === h;
      }),
      (e.isPortal = function (e) {
        return v(e) === s;
      }),
      (e.isProfiler = function (e) {
        return v(e) === r;
      }),
      (e.isStrictMode = function (e) {
        return v(e) === o;
      }),
      (e.isSuspense = function (e) {
        return v(e) === p;
      }),
      (e.isValidElementType = function (e) {
        return (
          "string" == typeof e ||
          "function" == typeof e ||
          e === i ||
          e === u ||
          e === r ||
          e === o ||
          e === p ||
          e === f ||
          ("object" == typeof e &&
            null !== e &&
            (e.$$typeof === m ||
              e.$$typeof === h ||
              e.$$typeof === a ||
              e.$$typeof === l ||
              e.$$typeof === d ||
              e.$$typeof === x ||
              e.$$typeof === b ||
              e.$$typeof === y ||
              e.$$typeof === g))
        );
      }),
      (e.typeOf = v);
  },
});export var reactIsBase = createLazyModule({
  "../../node_modules/react-is/index.js"(e, t) {
    t.exports = reactIs();
  },
});

