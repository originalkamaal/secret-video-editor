import { createLazyModule } from "./others/createLazyModule";

export var cjsSchedulerProduction = createLazyModule({
  "../../node_modules/scheduler/cjs/scheduler.production.min.js"(e) {
    function t(e, t) {
      var n = e.length;
      e.push(t);
      e: for (; 0 < n;) {
        var s = (n - 1) >>> 1, o = e[s];
        if (!(0 < i(o, t))) break e;
        (e[s] = t), (e[n] = o), (n = s);
      }
    }
    function n(e) {
      return 0 === e.length ? null : e[0];
    }
    function s(e) {
      if (0 === e.length) return null;
      var t = e[0], n = e.pop();
      if (n !== t) {
        e[0] = n;
        e: for (var s = 0, o = e.length, r = o >>> 1; s < r;) {
          var a = 2 * (s + 1) - 1, l = e[a], c = a + 1, u = e[c];
          if (0 > i(l, n))
            c < o && 0 > i(u, l)
              ? ((e[s] = u), (e[c] = n), (s = c))
              : ((e[s] = l), (e[a] = n), (s = a));
          else {
            if (!(c < o && 0 > i(u, n))) break e;
            (e[s] = u), (e[c] = n), (s = c);
          }
        }
      }
      return t;
    }
    function i(e, t) {
      var n = e.sortIndex - t.sortIndex;
      return 0 !== n ? n : e.id - t.id;
    }
    var o, r, a;
    "object" == typeof performance && "function" == typeof performance.now
      ? ((o = performance),
        (e.unstable_now = function () {
          return o.now();
        }))
      : ((r = Date),
        (a = r.now()),
        (e.unstable_now = function () {
          return r.now() - a;
        }));
    var l = [], c = [], u = 1, d = null, p = 3, f = !1, h = !1, m = !1, g = "function" == typeof setTimeout ? setTimeout : null, x = "function" == typeof clearTimeout ? clearTimeout : null, b = "undefined" != typeof setImmediate ? setImmediate : null;
    function y(e) {
      for (var i = n(c); null !== i;) {
        if (null === i.callback) s(c);
        else {
          if (!(i.startTime <= e)) break;
          s(c), (i.sortIndex = i.expirationTime), t(l, i);
        }
        i = n(c);
      }
    }
    function v(e) {
      if (((m = !1), y(e), !h))
        if (null !== n(l)) (h = !0), T(w);
        else {
          var t = n(c);
          null !== t && M(v, t.startTime - e);
        }
    }
    function w(t, i) {
      (h = !1), m && ((m = !1), x(E), (E = -1)), (f = !0);
      var o = p;
      try {
        for (y(i), d = n(l); null !== d && (!(d.expirationTime > i) || (t && !A()));) {
          var r = d.callback;
          if ("function" == typeof r) {
            (d.callback = null), (p = d.priorityLevel);
            var a = r(d.expirationTime <= i);
            (i = e.unstable_now()),
              "function" == typeof a ? (d.callback = a) : d === n(l) && s(l),
              y(i);
          } else s(l);
          d = n(l);
        }
        if (null !== d) var u = !0;
        else {
          var g = n(c);
          null !== g && M(v, g.startTime - i), (u = !1);
        }
        return u;
      } finally {
        (d = null), (p = o), (f = !1);
      }
    }
    "undefined" != typeof navigator &&
      void 0 !== navigator.scheduling &&
      void 0 !== navigator.scheduling.isInputPending &&
      navigator.scheduling.isInputPending.bind(navigator.scheduling);
    var k, C, j, S = !1, _ = null, E = -1, L = 5, P = -1;
    function A() {
      return !(e.unstable_now() - P < L);
    }
    function B() {
      if (null !== _) {
        var t = e.unstable_now();
        P = t;
        var n = !0;
        try {
          n = _(!0, t);
        } finally {
          n ? k() : ((S = !1), (_ = null));
        }
      } else S = !1;
    }
    function T(e) {
      (_ = e), S || ((S = !0), k());
    }
    function M(t, n) {
      E = g(function () {
        t(e.unstable_now());
      }, n);
    }
    "function" == typeof b
      ? (k = function () {
        b(B);
      })
      : "undefined" != typeof MessageChannel
        ? ((C = new MessageChannel()),
          (j = C.port2),
          (C.port1.onmessage = B),
          (k = function () {
            j.postMessage(null);
          }))
        : (k = function () {
          g(B, 0);
        }),
      (e.unstable_IdlePriority = 5),
      (e.unstable_ImmediatePriority = 1),
      (e.unstable_LowPriority = 4),
      (e.unstable_NormalPriority = 3),
      (e.unstable_Profiling = null),
      (e.unstable_UserBlockingPriority = 2),
      (e.unstable_cancelCallback = function (e) {
        e.callback = null;
      }),
      (e.unstable_continueExecution = function () {
        h || f || ((h = !0), T(w));
      }),
      (e.unstable_forceFrameRate = function (e) {
        0 > e || 125 < e
          ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
          : (L = 0 < e ? Math.floor(1e3 / e) : 5);
      }),
      (e.unstable_getCurrentPriorityLevel = function () {
        return p;
      }),
      (e.unstable_getFirstCallbackNode = function () {
        return n(l);
      }),
      (e.unstable_next = function (e) {
        switch (p) {
          case 1:
          case 2:
          case 3:
            var t = 3;
            break;
          default:
            t = p;
        }
        var n = p;
        p = t;
        try {
          return e();
        } finally {
          p = n;
        }
      }),
      (e.unstable_pauseExecution = function () { }),
      (e.unstable_requestPaint = function () { }),
      (e.unstable_runWithPriority = function (e, t) {
        switch (e) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            e = 3;
        }
        var n = p;
        p = e;
        try {
          return t();
        } finally {
          p = n;
        }
      }),
      (e.unstable_scheduleCallback = function (s, i, o) {
        var r = e.unstable_now();
        switch (("object" == typeof o && null !== o
          ? (o = "number" == typeof (o = o.delay) && 0 < o ? r + o : r)
          : (o = r),
          s)) {
          case 1:
            var a = -1;
            break;
          case 2:
            a = 250;
            break;
          case 5:
            a = 1073741823;
            break;
          case 4:
            a = 1e4;
            break;
          default:
            a = 5e3;
        }
        return (
          (s = {
            id: u++,
            callback: i,
            priorityLevel: s,
            startTime: o,
            expirationTime: (a = o + a),
            sortIndex: -1,
          }),
          o > r
            ? ((s.sortIndex = o),
              t(c, s),
              null === n(l) &&
              s === n(c) &&
              (m ? (x(E), (E = -1)) : (m = !0), M(v, o - r)))
            : ((s.sortIndex = a), t(l, s), h || f || ((h = !0), T(w))),
          s
        );
      }),
      (e.unstable_shouldYield = A),
      (e.unstable_wrapCallback = function (e) {
        var t = p;
        return function () {
          var n = p;
          p = t;
          try {
            return e.apply(this, arguments);
          } finally {
            p = n;
          }
        };
      });
  },
});export var schedulerIndex = createLazyModule({
  "../../node_modules/scheduler/index.js"(e, t) {
    t.exports = cjsSchedulerProduction();
  },
});

