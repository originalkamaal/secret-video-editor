import { createLazyModule } from "./others/createLazyModule";

export var tabbable = createLazyModule({
  "../../node_modules/tabbable/dist/index.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
    var t = [
      "input:not([inert])",
      "select:not([inert])",
      "textarea:not([inert])",
      "a[href]:not([inert])",
      "button:not([inert])",
      "[tabindex]:not(slot):not([inert])",
      "audio[controls]:not([inert])",
      "video[controls]:not([inert])",
      '[contenteditable]:not([contenteditable="false"]):not([inert])',
      "details>summary:first-of-type:not([inert])",
      "details:not([inert])",
    ], n = t.join(","), s = "undefined" == typeof Element, i = s
      ? function () { }
      : Element.prototype.matches ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector, o = !s && Element.prototype.getRootNode
        ? function (e) {
          var t;
          return null == e || null === (t = e.getRootNode) || void 0 === t
            ? void 0
            : t.call(e);
        }
        : function (e) {
          return null == e ? void 0 : e.ownerDocument;
        }, r = function e(t, n) {
          var s;
          void 0 === n && (n = !0);
          var i = null == t || null === (s = t.getAttribute) || void 0 === s
            ? void 0
            : s.call(t, "inert");
          return "" === i || "true" === i || (n && t && e(t.parentNode));
        }, a = function (e, t, s) {
          if (r(e)) return [];
          var o = Array.prototype.slice.apply(e.querySelectorAll(n));
          return t && i.call(e, n) && o.unshift(e), (o = o.filter(s));
        }, l = function e(t, s, o) {
          for (var a = [], l = Array.from(t); l.length;) {
            var c = l.shift();
            if (!r(c, !1))
              if ("SLOT" === c.tagName) {
                var u = c.assignedElements(), d = e(u.length ? u : c.children, !0, o);
                o.flatten
                  ? a.push.apply(a, d)
                  : a.push({ scopeParent: c, candidates: d });
              } else {
                i.call(c, n) && o.filter(c) && (s || !t.includes(c)) && a.push(c);
                var p = c.shadowRoot ||
                  ("function" == typeof o.getShadowRoot && o.getShadowRoot(c)), f = !r(p, !1) && (!o.shadowRootFilter || o.shadowRootFilter(c));
                if (p && f) {
                  var h = e(!0 === p ? c.children : p.children, !0, o);
                  o.flatten
                    ? a.push.apply(a, h)
                    : a.push({ scopeParent: c, candidates: h });
                } else l.unshift.apply(l, c.children);
              }
          }
          return a;
        }, c = function (e) {
          return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
        }, u = function (e) {
          if (!e) throw new Error("No node provided");
          return e.tabIndex < 0 &&
            (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) ||
              (function (e) {
                var t, n = null == e || null === (t = e.getAttribute) || void 0 === t
                  ? void 0
                  : t.call(e, "contenteditable");
                return "" === n || "true" === n;
              })(e)) &&
            !c(e)
            ? 0
            : e.tabIndex;
        }, d = function (e, t) {
          return e.tabIndex === t.tabIndex
            ? e.documentOrder - t.documentOrder
            : e.tabIndex - t.tabIndex;
        }, p = function (e) {
          return "INPUT" === e.tagName;
        }, f = function (e) {
          return (
            (function (e) {
              return p(e) && "radio" === e.type;
            })(e) &&
            !(function (e) {
              if (!e.name) return !0;
              var t, n = e.form || o(e), s = function (e) {
                return n.querySelectorAll(
                  'input[type="radio"][name="' + e + '"]'
                );
              };
              if ("undefined" != typeof window &&
                void 0 !== window.CSS &&
                "function" == typeof window.CSS.escape)
                t = s(window.CSS.escape(e.name));

              else
                try {
                  t = s(e.name);
                } catch (e) {
                  return (
                    console.error(
                      "Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",
                      e.message
                    ),
                    !1
                  );
                }
              var i = (function (e, t) {
                for (var n = 0; n < e.length; n++)
                  if (e[n].checked && e[n].form === t) return e[n];
              })(t, e.form);
              return !i || i === e;
            })(e)
          );
        }, h = function (e) {
          var t = e.getBoundingClientRect(), n = t.width, s = t.height;
          return 0 === n && 0 === s;
        }, m = function (e, t) {
          var n = t.displayCheck, s = t.getShadowRoot;
          if ("hidden" === getComputedStyle(e).visibility) return !0;
          var r = i.call(e, "details>summary:first-of-type")
            ? e.parentElement
            : e;
          if (i.call(r, "details:not([open]) *")) return !0;
          if (n && "full" !== n && "legacy-full" !== n) {
            if ("non-zero-area" === n) return h(e);
          } else {
            if ("function" == typeof s) {
              for (var a = e; e;) {
                var l = e.parentElement, c = o(e);
                if (l && !l.shadowRoot && !0 === s(l)) return h(e);
                e = e.assignedSlot
                  ? e.assignedSlot
                  : l || c === e.ownerDocument
                    ? l
                    : c.host;
              }
              e = a;
            }
            if ((function (e) {
              var t, n, s, i, r = e && o(e), a = null === (t = r) || void 0 === t ? void 0 : t.host, l = !1;
              if (r && r !== e)
                for (l = !!(
                  (null !== (n = a) &&
                    void 0 !== n &&
                    null !== (s = n.ownerDocument) &&
                    void 0 !== s &&
                    s.contains(a)) ||
                  (null != e &&
                    null !== (i = e.ownerDocument) &&
                    void 0 !== i &&
                    i.contains(e))
                ); !l && a;) {
                  var c, u, d;
                  l = !(
                    null ===
                    (u = a =
                      null === (c = r = o(a)) || void 0 === c
                        ? void 0
                        : c.host) ||
                    void 0 === u ||
                    null === (d = u.ownerDocument) ||
                    void 0 === d ||
                    !d.contains(a)
                  );
                }
              return l;
            })(e))
              return !e.getClientRects().length;
            if ("legacy-full" !== n) return !0;
          }
          return !1;
        }, g = function (e, t) {
          return !(
            t.disabled ||
            r(t) ||
            (function (e) {
              return p(e) && "hidden" === e.type;
            })(t) ||
            m(t, e) ||
            (function (e) {
              return (
                "DETAILS" === e.tagName &&
                Array.prototype.slice.apply(e.children).some(function (e) {
                  return "SUMMARY" === e.tagName;
                })
              );
            })(t) ||
            (function (e) {
              if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
                for (var t = e.parentElement; t;) {
                  if ("FIELDSET" === t.tagName && t.disabled) {
                    for (var n = 0; n < t.children.length; n++) {
                      var s = t.children.item(n);
                      if ("LEGEND" === s.tagName)
                        return (
                          !!i.call(t, "fieldset[disabled] *") || !s.contains(e)
                        );
                    }
                    return !0;
                  }
                  t = t.parentElement;
                }
              return !1;
            })(t)
          );
        }, x = function (e, t) {
          return !(f(t) || u(t) < 0 || !g(e, t));
        }, b = function (e) {
          var t = parseInt(e.getAttribute("tabindex"), 10);
          return !!(isNaN(t) || t >= 0);
        }, y = function e(t) {
          var n = [], s = [];
          return (
            t.forEach(function (t, i) {
              var o = !!t.scopeParent, r = o ? t.scopeParent : t, a = (function (e, t) {
                var n = u(e);
                return n < 0 && t && !c(e) ? 0 : n;
              })(r, o), l = o ? e(t.candidates) : r;
              0 === a
                ? o
                  ? n.push.apply(n, l)
                  : n.push(r)
                : s.push({
                  documentOrder: i,
                  tabIndex: a,
                  item: t,
                  isScope: o,
                  content: l,
                });
            }),
            s
              .sort(d)
              .reduce(function (e, t) {
                return (
                  t.isScope ? e.push.apply(e, t.content) : e.push(t.content), e
                );
              }, [])
              .concat(n)
          );
        }, v = t.concat("iframe").join(",");
    (e.focusable = function (e, t) {
      return (t = t || {}).getShadowRoot
        ? l([e], t.includeContainer, {
          filter: g.bind(null, t),
          flatten: !0,
          getShadowRoot: t.getShadowRoot,
        })
        : a(e, t.includeContainer, g.bind(null, t));
    }),
      (e.getTabIndex = u),
      (e.isFocusable = function (e, t) {
        if (((t = t || {}), !e)) throw new Error("No node provided");
        return !1 !== i.call(e, v) && g(t, e);
      }),
      (e.isTabbable = function (e, t) {
        if (((t = t || {}), !e)) throw new Error("No node provided");
        return !1 !== i.call(e, n) && x(t, e);
      }),
      (e.tabbable = function (e, t) {
        var n;
        return (
          (n = (t = t || {}).getShadowRoot
            ? l([e], t.includeContainer, {
              filter: x.bind(null, t),
              flatten: !1,
              getShadowRoot: t.getShadowRoot,
              shadowRootFilter: b,
            })
            : a(e, t.includeContainer, x.bind(null, t))),
          y(n)
        );
      });
  },
});
