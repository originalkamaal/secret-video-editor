import { createLazyModule } from "./others/createLazyModule";

var reactProd = createLazyModule({
  "../../node_modules/react/cjs/react.production.min.js"(e) {
    var t = Symbol.for("react.element"),
      n = Symbol.for("react.portal"),
      s = Symbol.for("react.fragment"),
      i = Symbol.for("react.strict_mode"),
      o = Symbol.for("react.profiler"),
      r = Symbol.for("react.provider"),
      a = Symbol.for("react.context"),
      l = Symbol.for("react.forward_ref"),
      c = Symbol.for("react.suspense"),
      u = Symbol.for("react.memo"),
      d = Symbol.for("react.lazy"),
      p = Symbol.iterator;
    var f = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      h = Object.assign,
      m = {};
    function g(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = m),
        (this.updater = n || f);
    }
    function x() {}
    function b(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = m),
        (this.updater = n || f);
    }
    (g.prototype.isReactComponent = {}),
      (g.prototype.setState = function (e, t) {
        if ("object" != typeof e && "function" != typeof e && null != e)
          throw Error(
            "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, e, t, "setState");
      }),
      (g.prototype.forceUpdate = function (e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      }),
      (x.prototype = g.prototype);
    var y = (b.prototype = new x());
    (y.constructor = b), h(y, g.prototype), (y.isPureReactComponent = !0);
    var v = Array.isArray,
      w = Object.prototype.hasOwnProperty,
      k = { current: null },
      C = { key: !0, ref: !0, __self: !0, __source: !0 };
    function j(e, n, s) {
      var i,
        o = {},
        r = null,
        a = null;
      if (null != n)
        for (i in (void 0 !== n.ref && (a = n.ref),
        void 0 !== n.key && (r = "" + n.key),
        n))
          w.call(n, i) && !C.hasOwnProperty(i) && (o[i] = n[i]);
      var l = arguments.length - 2;
      if (1 === l) o.children = s;
      else if (1 < l) {
        for (var c = Array(l), u = 0; u < l; u++) c[u] = arguments[u + 2];
        o.children = c;
      }
      if (e && e.defaultProps)
        for (i in (l = e.defaultProps)) void 0 === o[i] && (o[i] = l[i]);
      return {
        $$typeof: t,
        type: e,
        key: r,
        ref: a,
        props: o,
        _owner: k.current,
      };
    }
    function S(e) {
      return "object" == typeof e && null !== e && e.$$typeof === t;
    }
    var _ = /\/+/g;
    function E(e, t) {
      return "object" == typeof e && null !== e && null != e.key
        ? (function (e) {
            var t = { "=": "=0", ":": "=2" };
            return (
              "$" +
              e.replace(/[=:]/g, function (e) {
                return t[e];
              })
            );
          })("" + e.key)
        : t.toString(36);
    }
    function L(e, s, i, o, r) {
      var a = typeof e;
      ("undefined" !== a && "boolean" !== a) || (e = null);
      var l = !1;
      if (null === e) l = !0;
      else
        switch (a) {
          case "string":
          case "number":
            l = !0;
            break;
          case "object":
            switch (e.$$typeof) {
              case t:
              case n:
                l = !0;
            }
        }
      if (l)
        return (
          (r = r((l = e))),
          (e = "" === o ? "." + E(l, 0) : o),
          v(r)
            ? ((i = ""),
              null != e && (i = e.replace(_, "$&/") + "/"),
              L(r, s, i, "", function (e) {
                return e;
              }))
            : null != r &&
              (S(r) &&
                (r = (function (e, n) {
                  return {
                    $$typeof: t,
                    type: e.type,
                    key: n,
                    ref: e.ref,
                    props: e.props,
                    _owner: e._owner,
                  };
                })(
                  r,
                  i +
                    (!r.key || (l && l.key === r.key)
                      ? ""
                      : ("" + r.key).replace(_, "$&/") + "/") +
                    e
                )),
              s.push(r)),
          1
        );
      if (((l = 0), (o = "" === o ? "." : o + ":"), v(e)))
        for (var c = 0; c < e.length; c++) {
          var u = o + E((a = e[c]), c);
          l += L(a, s, i, u, r);
        }
      else if (
        ((u = (function (e) {
          return null === e || "object" != typeof e
            ? null
            : "function" == typeof (e = (p && e[p]) || e["@@iterator"])
            ? e
            : null;
        })(e)),
        "function" == typeof u)
      )
        for (e = u.call(e), c = 0; !(a = e.next()).done; )
          l += L((a = a.value), s, i, (u = o + E(a, c++)), r);
      else if ("object" === a)
        throw (
          ((s = String(e)),
          Error(
            "Objects are not valid as a React child (found: " +
              ("[object Object]" === s
                ? "object with keys {" + Object.keys(e).join(", ") + "}"
                : s) +
              "). If you meant to render a collection of children, use an array instead."
          ))
        );
      return l;
    }
    function P(e, t, n) {
      if (null == e) return e;
      var s = [],
        i = 0;
      return (
        L(e, s, "", "", function (e) {
          return t.call(n, e, i++);
        }),
        s
      );
    }
    function A(e) {
      if (-1 === e._status) {
        var t = e._result;
        (t = t()).then(
          function (t) {
            (0 !== e._status && -1 !== e._status) ||
              ((e._status = 1), (e._result = t));
          },
          function (t) {
            (0 !== e._status && -1 !== e._status) ||
              ((e._status = 2), (e._result = t));
          }
        ),
          -1 === e._status && ((e._status = 0), (e._result = t));
      }
      if (1 === e._status) return e._result.default;
      throw e._result;
    }
    var B = { current: null },
      T = { transition: null },
      M = {
        ReactCurrentDispatcher: B,
        ReactCurrentBatchConfig: T,
        ReactCurrentOwner: k,
      };
    (e.Children = {
      map: P,
      forEach: function (e, t, n) {
        P(
          e,
          function () {
            t.apply(this, arguments);
          },
          n
        );
      },
      count: function (e) {
        var t = 0;
        return (
          P(e, function () {
            t++;
          }),
          t
        );
      },
      toArray: function (e) {
        return (
          P(e, function (e) {
            return e;
          }) || []
        );
      },
      only: function (e) {
        if (!S(e))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return e;
      },
    }),
      (e.Component = g),
      (e.Fragment = s),
      (e.Profiler = o),
      (e.PureComponent = b),
      (e.StrictMode = i),
      (e.Suspense = c),
      (e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = M),
      (e.cloneElement = function (e, n, s) {
        if (null == e)
          throw Error(
            "React.cloneElement(...): The argument must be a React element, but you passed " +
              e +
              "."
          );
        var i = h({}, e.props),
          o = e.key,
          r = e.ref,
          a = e._owner;
        if (null != n) {
          if (
            (void 0 !== n.ref && ((r = n.ref), (a = k.current)),
            void 0 !== n.key && (o = "" + n.key),
            e.type && e.type.defaultProps)
          )
            var l = e.type.defaultProps;
          for (c in n)
            w.call(n, c) &&
              !C.hasOwnProperty(c) &&
              (i[c] = void 0 === n[c] && void 0 !== l ? l[c] : n[c]);
        }
        var c = arguments.length - 2;
        if (1 === c) i.children = s;
        else if (1 < c) {
          l = Array(c);
          for (var u = 0; u < c; u++) l[u] = arguments[u + 2];
          i.children = l;
        }
        return {
          $$typeof: t,
          type: e.type,
          key: o,
          ref: r,
          props: i,
          _owner: a,
        };
      }),
      (e.createContext = function (e) {
        return (
          ((e = {
            $$typeof: a,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null,
          }).Provider = { $$typeof: r, _context: e }),
          (e.Consumer = e)
        );
      }),
      (e.createElement = j),
      (e.createFactory = function (e) {
        var t = j.bind(null, e);
        return (t.type = e), t;
      }),
      (e.createRef = function () {
        return { current: null };
      }),
      (e.forwardRef = function (e) {
        return { $$typeof: l, render: e };
      }),
      (e.isValidElement = S),
      (e.lazy = function (e) {
        return {
          $$typeof: d,
          _payload: { _status: -1, _result: e },
          _init: A,
        };
      }),
      (e.memo = function (e, t) {
        return { $$typeof: u, type: e, compare: void 0 === t ? null : t };
      }),
      (e.startTransition = function (e) {
        var t = T.transition;
        T.transition = {};
        try {
          e();
        } finally {
          T.transition = t;
        }
      }),
      (e.unstable_act = function () {
        throw Error("act(...) is not supported in production builds of React.");
      }),
      (e.useCallback = function (e, t) {
        return B.current.useCallback(e, t);
      }),
      (e.useContext = function (e) {
        return B.current.useContext(e);
      }),
      (e.useDebugValue = function () {}),
      (e.useDeferredValue = function (e) {
        return B.current.useDeferredValue(e);
      }),
      (e.useEffect = function (e, t) {
        return B.current.useEffect(e, t);
      }),
      (e.useId = function () {
        return B.current.useId();
      }),
      (e.useImperativeHandle = function (e, t, n) {
        return B.current.useImperativeHandle(e, t, n);
      }),
      (e.useInsertionEffect = function (e, t) {
        return B.current.useInsertionEffect(e, t);
      }),
      (e.useLayoutEffect = function (e, t) {
        return B.current.useLayoutEffect(e, t);
      }),
      (e.useMemo = function (e, t) {
        return B.current.useMemo(e, t);
      }),
      (e.useReducer = function (e, t, n) {
        return B.current.useReducer(e, t, n);
      }),
      (e.useRef = function (e) {
        return B.current.useRef(e);
      }),
      (e.useState = function (e) {
        return B.current.useState(e);
      }),
      (e.useSyncExternalStore = function (e, t, n) {
        return B.current.useSyncExternalStore(e, t, n);
      }),
      (e.useTransition = function () {
        return B.current.useTransition();
      }),
      (e.version = "18.2.0");
  },
});
export var react = createLazyModule({
  "../../node_modules/react/index.js"(e, t) {
    t.exports = reactProd();
  },
});
export var reactJsxRuntime = createLazyModule({
  "../../node_modules/react/jsx-runtime.js"(e, t) {
    t.exports = jsxRuntimeProd();
  },
});
export var jsxRuntimeProd = createLazyModule({
  "../../node_modules/react/cjs/react-jsx-runtime.production.min.js"(e) {
    var t = react(),
      n = Symbol.for("react.element"),
      s = Symbol.for("react.fragment"),
      i = Object.prototype.hasOwnProperty,
      o =
        t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
      r = { key: !0, ref: !0, __self: !0, __source: !0 };
    function a(e, t, s) {
      var a,
        l = {},
        c = null,
        u = null;
      for (a in (void 0 !== s && (c = "" + s),
      void 0 !== t.key && (c = "" + t.key),
      void 0 !== t.ref && (u = t.ref),
      t))
        i.call(t, a) && !r.hasOwnProperty(a) && (l[a] = t[a]);
      if (e && e.defaultProps)
        for (a in (t = e.defaultProps)) void 0 === l[a] && (l[a] = t[a]);
      return {
        $$typeof: n,
        type: e,
        key: c,
        ref: u,
        props: l,
        _owner: o.current,
      };
    }
    (e.Fragment = s), (e.jsx = a), (e.jsxs = a);
  },
});
