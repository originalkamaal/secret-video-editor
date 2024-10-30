import { createLazyModule } from "./others/createLazyModule";

export var mouseTrap = createLazyModule({
  "../../node_modules/mousetrap/mousetrap.js"(e, t) {
    !(function (e, n, s) {
      if (e) {
        for (var i, o = {
          8: "backspace",
          9: "tab",
          13: "enter",
          16: "shift",
          17: "ctrl",
          18: "alt",
          20: "capslock",
          27: "esc",
          32: "space",
          33: "pageup",
          34: "pagedown",
          35: "end",
          36: "home",
          37: "left",
          38: "up",
          39: "right",
          40: "down",
          45: "ins",
          46: "del",
          91: "meta",
          93: "meta",
          224: "meta",
        }, r = {
          106: "*",
          107: "+",
          109: "-",
          110: ".",
          111: "/",
          186: ";",
          187: "=",
          188: ",",
          189: "-",
          190: ".",
          191: "/",
          192: "`",
          219: "[",
          220: "\\",
          221: "]",
          222: "'",
        }, a = {
          "~": "`",
          "!": "1",
          "@": "2",
          "#": "3",
          $: "4",
          "%": "5",
          "^": "6",
          "&": "7",
          "*": "8",
          "(": "9",
          ")": "0",
          _: "-",
          "+": "=",
          ":": ";",
          '"': "'",
          "<": ",",
          ">": ".",
          "?": "/",
          "|": "\\",
        }, l = {
          option: "alt",
          command: "meta",
          return: "enter",
          escape: "esc",
          plus: "+",
          mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform)
            ? "meta"
            : "ctrl",
        }, c = 1; c < 20; ++c)
          o[111 + c] = "f" + c;
        for (c = 0; c <= 9; ++c) o[c + 96] = c.toString();
        (x.prototype.bind = function (e, t, n) {
          var s = this;
          return (
            (e = e instanceof Array ? e : [e]),
            s._bindMultiple.call(s, e, t, n),
            s
          );
        }),
          (x.prototype.unbind = function (e, t) {
            return this.bind.call(this, e, function () { }, t);
          }),
          (x.prototype.trigger = function (e, t) {
            var n = this;
            return (
              n._directMap[e + ":" + t] && n._directMap[e + ":" + t]({}, e), n
            );
          }),
          (x.prototype.reset = function () {
            var e = this;
            return (e._callbacks = {}), (e._directMap = {}), e;
          }),
          (x.prototype.stopCallback = function (e, t) {
            if ((" " + t.className + " ").indexOf(" mousetrap ") > -1)
              return !1;
            if (g(t, this.target)) return !1;
            if ("composedPath" in e && "function" == typeof e.composedPath) {
              var n = e.composedPath()[0];
              n !== e.target && (t = n);
            }
            return (
              "INPUT" == t.tagName ||
              "SELECT" == t.tagName ||
              "TEXTAREA" == t.tagName ||
              t.isContentEditable
            );
          }),
          (x.prototype.handleKey = function () {
            return this._handleKey.apply(this, arguments);
          }),
          (x.addKeycodes = function (e) {
            for (var t in e) e.hasOwnProperty(t) && (o[t] = e[t]);
            i = null;
          }),
          (x.init = function () {
            var e = x(n);
            for (var t in e)
              "_" !== t.charAt(0) &&
                (x[t] = (function (t) {
                  return function () {
                    return e[t].apply(e, arguments);
                  };
                })(t));
          }),
          x.init(),
          (e.Mousetrap = x),
          void 0 !== t && t.exports && (t.exports = x),
          "function" == typeof define &&
          define.amd &&
          define(function () {
            return x;
          });
      }
      function u(e, t, n) {
        e.addEventListener
          ? e.addEventListener(t, n, !1)
          : e.attachEvent("on" + t, n);
      }
      function d(e) {
        if ("keypress" == e.type) {
          var t = String.fromCharCode(e.which);
          return e.shiftKey || (t = t.toLowerCase()), t;
        }
        return o[e.which]
          ? o[e.which]
          : r[e.which]
            ? r[e.which]
            : String.fromCharCode(e.which).toLowerCase();
      }
      function p(e, t) {
        return e.sort().join(",") === t.sort().join(",");
      }
      function f(e) {
        return "shift" == e || "ctrl" == e || "alt" == e || "meta" == e;
      }
      function h(e, t, n) {
        return (
          n ||
          (n = (function () {
            if (!i)
              for (var e in ((i = {}), o))
                (e > 95 && e < 112) || (o.hasOwnProperty(e) && (i[o[e]] = e));
            return i;
          })()[e]
            ? "keydown"
            : "keypress"),
          "keypress" == n && t.length && (n = "keydown"),
          n
        );
      }
      function m(e, t) {
        var n, s, i, o = [];
        for (n = (function (e) {
          return "+" === e
            ? ["+"]
            : (e = e.replace(/\+{2}/g, "+plus")).split("+");
        })(e),
          i = 0; i < n.length; ++i)
          (s = n[i]),
            l[s] && (s = l[s]),
            t && "keypress" != t && a[s] && ((s = a[s]), o.push("shift")),
            f(s) && o.push(s);
        return { key: s, modifiers: o, action: (t = h(s, o, t)) };
      }
      function g(e, t) {
        return null !== e && e !== n && (e === t || g(e.parentNode, t));
      }
      function x(e) {
        var t = this;
        if (((e = e || n), !(t instanceof x))) return new x(e);
        (t.target = e), (t._callbacks = {}), (t._directMap = {});
        var s, i = {}, o = !1, r = !1, a = !1;
        function l(e) {
          e = e || {};
          var t, n = !1;
          for (t in i) e[t] ? (n = !0) : (i[t] = 0);
          n || (a = !1);
        }
        function c(e, n, s, o, r, a) {
          var l, c, u = [], d = s.type;
          if (!t._callbacks[e]) return [];
          for ("keyup" == d && f(e) && (n = [e]), l = 0; l < t._callbacks[e].length; ++l)
            if (((c = t._callbacks[e][l]),
              (o || !c.seq || i[c.seq] == c.level) &&
              d == c.action &&
              (("keypress" == d && !s.metaKey && !s.ctrlKey) ||
                p(n, c.modifiers)))) {
              var h = !o && c.combo == r, m = o && c.seq == o && c.level == a;
              (h || m) && t._callbacks[e].splice(l, 1), u.push(c);
            }
          return u;
        }
        function h(e, n, s, i) {
          t.stopCallback(n, n.target || n.srcElement, s, i) ||
            (!1 === e(n, s) &&
              ((function (e) {
                e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
              })(n),
                (function (e) {
                  e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0);
                })(n)));
        }
        function g(e) {
          "number" != typeof e.which && (e.which = e.keyCode);
          var n = d(e);
          n &&
            ("keyup" != e.type || o !== n
              ? t.handleKey(
                n,
                (function (e) {
                  var t = [];
                  return (
                    e.shiftKey && t.push("shift"),
                    e.altKey && t.push("alt"),
                    e.ctrlKey && t.push("ctrl"),
                    e.metaKey && t.push("meta"),
                    t
                  );
                })(e),
                e
              )
              : (o = !1));
        }
        function b(e, t, n, r) {
          function c(t) {
            return function () {
              (a = t), ++i[e], clearTimeout(s), (s = setTimeout(l, 1e3));
            };
          }
          function u(t) {
            h(n, t, e), "keyup" !== r && (o = d(t)), setTimeout(l, 10);
          }
          i[e] = 0;
          for (var p = 0; p < t.length; ++p) {
            var f = p + 1 === t.length ? u : c(r || m(t[p + 1]).action);
            y(t[p], f, r, e, p);
          }
        }
        function y(e, n, s, i, o) {
          t._directMap[e + ":" + s] = n;
          var r, a = (e = e.replace(/\s+/g, " ")).split(" ");
          a.length > 1
            ? b(e, a, n, s)
            : ((r = m(e, s)),
              (t._callbacks[r.key] = t._callbacks[r.key] || []),
              c(r.key, r.modifiers, { type: r.action }, i, e, o),
              t._callbacks[r.key][i ? "unshift" : "push"]({
                callback: n,
                modifiers: r.modifiers,
                action: r.action,
                seq: i,
                level: o,
                combo: e,
              }));
        }
        (t._handleKey = function (e, t, n) {
          var s, i = c(e, t, n), o = {}, u = 0, d = !1;
          for (s = 0; s < i.length; ++s)
            i[s].seq && (u = Math.max(u, i[s].level));
          for (s = 0; s < i.length; ++s)
            if (i[s].seq) {
              if (i[s].level != u) continue;
              (d = !0),
                (o[i[s].seq] = 1),
                h(i[s].callback, n, i[s].combo, i[s].seq);
            } else d || h(i[s].callback, n, i[s].combo);
          var p = "keypress" == n.type && r;
          n.type != a || f(e) || p || l(o), (r = d && "keydown" == n.type);
        }),
          (t._bindMultiple = function (e, t, n) {
            for (var s = 0; s < e.length; ++s) y(e[s], t, n);
          }),
          u(e, "keypress", g),
          u(e, "keydown", g),
          u(e, "keyup", g);
      }
    })(
      "undefined" != typeof window ? window : null,
      "undefined" != typeof window ? document : null
    );
  },
});
