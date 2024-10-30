import { createLazyModule } from "./others/createLazyModule";
import { tabbable } from "./tabbable";

export var focusTrap = createLazyModule({
  "../../node_modules/focus-trap/dist/focus-trap.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
    var t = tabbable();
    function n(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var s = Object.getOwnPropertySymbols(e);
        t &&
          (s = s.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, s);
      }
      return n;
    }
    function s(e) {
      for (var t = 1; t < arguments.length; t++) {
        var s = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? n(Object(s), !0).forEach(function (t) {
            i(e, t, s[t]);
          })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s))
            : n(Object(s)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(s, t)
              );
            });
      }
      return e;
    }
    function i(e, t, n) {
      return (
        (t = (function (e) {
          var t = (function (e, t) {
            if ("object" != typeof e || null === e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 !== n) {
              var s = n.call(e, t || "default");
              if ("object" != typeof s) return s;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return ("string" === t ? String : Number)(e);
          })(e, "string");
          return "symbol" == typeof t ? t : String(t);
        })(t)) in e
          ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
          : (e[t] = n),
        e
      );
    }
    var o = function (e, t) {
      if (e.length > 0) {
        var n = e[e.length - 1];
        n !== t && n.pause();
      }
      var s = e.indexOf(t);
      -1 === s || e.splice(s, 1), e.push(t);
    }, r = function (e, t) {
      var n = e.indexOf(t);
      -1 !== n && e.splice(n, 1), e.length > 0 && e[e.length - 1].unpause();
    }, a = function (e) {
      return (
        "Tab" === (null == e ? void 0 : e.key) ||
        9 === (null == e ? void 0 : e.keyCode)
      );
    }, l = function (e) {
      return a(e) && !e.shiftKey;
    }, c = function (e) {
      return a(e) && e.shiftKey;
    }, u = function (e) {
      return setTimeout(e, 0);
    }, d = function (e, t) {
      var n = -1;
      return (
        e.every(function (e, s) {
          return !t(e) || ((n = s), !1);
        }),
        n
      );
    }, p = function (e) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
        n[s - 1] = arguments[s];
      return "function" == typeof e ? e.apply(void 0, n) : e;
    }, f = function (e) {
      return e.target.shadowRoot && "function" == typeof e.composedPath
        ? e.composedPath()[0]
        : e.target;
    }, h = [];
    e.createFocusTrap = function (e, n) {
      var i, m = (null == n ? void 0 : n.document) || document, g = (null == n ? void 0 : n.trapStack) || h, x = s(
        {
          returnFocusOnDeactivate: !0,
          escapeDeactivates: !0,
          delayInitialFocus: !0,
          isKeyForward: l,
          isKeyBackward: c,
        },
        n
      ), b = {
        containers: [],
        containerGroups: [],
        tabbableGroups: [],
        nodeFocusedBeforeActivation: null,
        mostRecentlyFocusedNode: null,
        active: !1,
        paused: !1,
        delayInitialFocusTimer: void 0,
        recentNavEvent: void 0,
      }, y = function (e, t, n) {
        return e && void 0 !== e[t] ? e[t] : x[n || t];
      }, v = function (e, t) {
        var n = "function" == typeof (null == t ? void 0 : t.composedPath)
          ? t.composedPath()
          : void 0;
        return b.containerGroups.findIndex(function (t) {
          var s = t.container, i = t.tabbableNodes;
          return (
            s.contains(e) ||
            (null == n ? void 0 : n.includes(s)) ||
            i.find(function (t) {
              return t === e;
            })
          );
        });
      }, w = function (e) {
        var t = x[e];
        if ("function" == typeof t) {
          for (var n = arguments.length, s = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
            s[i - 1] = arguments[i];
          t = t.apply(void 0, s);
        }
        if ((!0 === t && (t = void 0), !t)) {
          if (void 0 === t || !1 === t) return t;
          throw new Error(
            "`".concat(
              e,
              "` was specified but was not a node, or did not return a node"
            )
          );
        }
        var o = t;
        if ("string" == typeof t && !(o = m.querySelector(t)))
          throw new Error(
            "`".concat(e, "` as selector refers to no known node")
          );
        return o;
      }, k = function () {
        var e = w("initialFocus");
        if (!1 === e) return !1;
        if (void 0 === e || !t.isFocusable(e, x.tabbableOptions))
          if (v(m.activeElement) >= 0) e = m.activeElement;
          else {
            var n = b.tabbableGroups[0];
            e = (n && n.firstTabbableNode) || w("fallbackFocus");
          }
        if (!e)
          throw new Error(
            "Your focus-trap needs to have at least one focusable element"
          );
        return e;
      }, C = function () {
        if (((b.containerGroups = b.containers.map(function (e) {
          var n = t.tabbable(e, x.tabbableOptions), s = t.focusable(e, x.tabbableOptions), i = n.length > 0 ? n[0] : void 0, o = n.length > 0 ? n[n.length - 1] : void 0, r = s.find(function (e) {
            return t.isTabbable(e);
          }), a = s
            .slice()
            .reverse()
            .find(function (e) {
              return t.isTabbable(e);
            }), l = !!n.find(function (e) {
              return t.getTabIndex(e) > 0;
            });
          return {
            container: e,
            tabbableNodes: n,
            focusableNodes: s,
            posTabIndexesFound: l,
            firstTabbableNode: i,
            lastTabbableNode: o,
            firstDomTabbableNode: r,
            lastDomTabbableNode: a,
            nextTabbableNode: function (e) {
              var i = !(arguments.length > 1 && void 0 !== arguments[1]) ||
                arguments[1], o = n.indexOf(e);
              return o < 0
                ? i
                  ? s.slice(s.indexOf(e) + 1).find(function (e) {
                    return t.isTabbable(e);
                  })
                  : s
                    .slice(0, s.indexOf(e))
                    .reverse()
                    .find(function (e) {
                      return t.isTabbable(e);
                    })
                : n[o + (i ? 1 : -1)];
            },
          };
        })),
          (b.tabbableGroups = b.containerGroups.filter(function (e) {
            return e.tabbableNodes.length > 0;
          })),
          b.tabbableGroups.length <= 0 && !w("fallbackFocus")))
          throw new Error(
            "Your focus-trap must have at least one container with at least one tabbable node in it at all times"
          );
        if (b.containerGroups.find(function (e) {
          return e.posTabIndexesFound;
        }) &&
          b.containerGroups.length > 1)
          throw new Error(
            "At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps."
          );
      }, j = function e(t) {
        !1 !== t &&
          t !== m.activeElement &&
          (t && t.focus
            ? (t.focus({ preventScroll: !!x.preventScroll }),
              (b.mostRecentlyFocusedNode = t),
              (function (e) {
                return (
                  e.tagName &&
                  "input" === e.tagName.toLowerCase() &&
                  "function" == typeof e.select
                );
              })(t) && t.select())
            : e(k()));
      }, S = function (e) {
        var t = w("setReturnFocus", e);
        return t || (!1 !== t && e);
      }, _ = function (e) {
        var n = e.target, s = e.event, i = e.isBackward, o = void 0 !== i && i;
        (n = n || f(s)), C();
        var r = null;
        if (b.tabbableGroups.length > 0) {
          var l = v(n, s), c = l >= 0 ? b.containerGroups[l] : void 0;
          if (l < 0)
            r = o
              ? b.tabbableGroups[b.tabbableGroups.length - 1]
                .lastTabbableNode
              : b.tabbableGroups[0].firstTabbableNode;
          else if (o) {
            var u = d(b.tabbableGroups, function (e) {
              var t = e.firstTabbableNode;
              return n === t;
            });
            if ((u < 0 &&
              (c.container === n ||
                (t.isFocusable(n, x.tabbableOptions) &&
                  !t.isTabbable(n, x.tabbableOptions) &&
                  !c.nextTabbableNode(n, !1))) &&
              (u = l),
              u >= 0)) {
              var p = 0 === u ? b.tabbableGroups.length - 1 : u - 1, h = b.tabbableGroups[p];
              r =
                t.getTabIndex(n) >= 0
                  ? h.lastTabbableNode
                  : h.lastDomTabbableNode;
            } else a(s) || (r = c.nextTabbableNode(n, !1));
          } else {
            var m = d(b.tabbableGroups, function (e) {
              var t = e.lastTabbableNode;
              return n === t;
            });
            if ((m < 0 &&
              (c.container === n ||
                (t.isFocusable(n, x.tabbableOptions) &&
                  !t.isTabbable(n, x.tabbableOptions) &&
                  !c.nextTabbableNode(n))) &&
              (m = l),
              m >= 0)) {
              var g = m === b.tabbableGroups.length - 1 ? 0 : m + 1, y = b.tabbableGroups[g];
              r =
                t.getTabIndex(n) >= 0
                  ? y.firstTabbableNode
                  : y.firstDomTabbableNode;
            } else a(s) || (r = c.nextTabbableNode(n));
          }
        } else r = w("fallbackFocus");
        return r;
      }, E = function (e) {
        var t = f(e);
        v(t, e) >= 0 ||
          (p(x.clickOutsideDeactivates, e)
            ? i.deactivate({ returnFocus: x.returnFocusOnDeactivate })
            : p(x.allowOutsideClick, e) || e.preventDefault());
      }, L = function (e) {
        var n = f(e), s = v(n, e) >= 0;
        if (s || n instanceof Document)
          s && (b.mostRecentlyFocusedNode = n);
        else {
          var i;
          e.stopImmediatePropagation();
          var o = !0;
          if (b.mostRecentlyFocusedNode)
            if (t.getTabIndex(b.mostRecentlyFocusedNode) > 0) {
              var r = v(b.mostRecentlyFocusedNode), a = b.containerGroups[r].tabbableNodes;
              if (a.length > 0) {
                var l = a.findIndex(function (e) {
                  return e === b.mostRecentlyFocusedNode;
                });
                l >= 0 &&
                  (x.isKeyForward(b.recentNavEvent)
                    ? l + 1 < a.length && ((i = a[l + 1]), (o = !1))
                    : l - 1 >= 0 && ((i = a[l - 1]), (o = !1)));
              }
            }
            else
              b.containerGroups.some(function (e) {
                return e.tabbableNodes.some(function (e) {
                  return t.getTabIndex(e) > 0;
                });
              }) || (o = !1);
          else o = !1;
          o &&
            (i = _({
              target: b.mostRecentlyFocusedNode,
              isBackward: x.isKeyBackward(b.recentNavEvent),
            })),
            j(i || b.mostRecentlyFocusedNode || k());
        }
        b.recentNavEvent = void 0;
      }, P = function (e) {
        if (!((t = e),
          ("Escape" !== (null == t ? void 0 : t.key) &&
            "Esc" !== (null == t ? void 0 : t.key) &&
            27 !== (null == t ? void 0 : t.keyCode)) ||
          !1 === p(x.escapeDeactivates, e)))
          return e.preventDefault(), void i.deactivate();
        var t;
        (x.isKeyForward(e) || x.isKeyBackward(e)) &&
          (function (e) {
            var t = arguments.length > 1 &&
              void 0 !== arguments[1] &&
              arguments[1];
            b.recentNavEvent = e;
            var n = _({ event: e, isBackward: t });
            n && (a(e) && e.preventDefault(), j(n));
          })(e, x.isKeyBackward(e));
      }, A = function (e) {
        var t = f(e);
        v(t, e) >= 0 ||
          p(x.clickOutsideDeactivates, e) ||
          p(x.allowOutsideClick, e) ||
          (e.preventDefault(), e.stopImmediatePropagation());
      }, B = function () {
        if (b.active)
          return (
            o(g, i),
            (b.delayInitialFocusTimer = x.delayInitialFocus
              ? u(function () {
                j(k());
              })
              : j(k())),
            m.addEventListener("focusin", L, !0),
            m.addEventListener("mousedown", E, {
              capture: !0,
              passive: !1,
            }),
            m.addEventListener("touchstart", E, {
              capture: !0,
              passive: !1,
            }),
            m.addEventListener("click", A, { capture: !0, passive: !1 }),
            m.addEventListener("keydown", P, { capture: !0, passive: !1 }),
            i
          );
      }, T = function () {
        if (b.active)
          return (
            m.removeEventListener("focusin", L, !0),
            m.removeEventListener("mousedown", E, !0),
            m.removeEventListener("touchstart", E, !0),
            m.removeEventListener("click", A, !0),
            m.removeEventListener("keydown", P, !0),
            i
          );
      }, M = "undefined" != typeof window && "MutationObserver" in window
        ? new MutationObserver(function (e) {
          e.some(function (e) {
            return Array.from(e.removedNodes).some(function (e) {
              return e === b.mostRecentlyFocusedNode;
            });
          }) && j(k());
        })
        : void 0, O = function () {
          M &&
            (M.disconnect(),
              b.active &&
              !b.paused &&
              b.containers.map(function (e) {
                M.observe(e, { subtree: !0, childList: !0 });
              }));
        };
      return (
        (i = {
          get active() {
            return b.active;
          },
          get paused() {
            return b.paused;
          },
          activate: function (e) {
            if (b.active) return this;
            var t = y(e, "onActivate"), n = y(e, "onPostActivate"), s = y(e, "checkCanFocusTrap");
            s || C(),
              (b.active = !0),
              (b.paused = !1),
              (b.nodeFocusedBeforeActivation = m.activeElement),
              null == t || t();
            var i = function () {
              s && C(), B(), O(), null == n || n();
            };
            return s
              ? (s(b.containers.concat()).then(i, i), this)
              : (i(), this);
          },
          deactivate: function (e) {
            if (!b.active) return this;
            var t = s(
              {
                onDeactivate: x.onDeactivate,
                onPostDeactivate: x.onPostDeactivate,
                checkCanReturnFocus: x.checkCanReturnFocus,
              },
              e
            );
            clearTimeout(b.delayInitialFocusTimer),
              (b.delayInitialFocusTimer = void 0),
              T(),
              (b.active = !1),
              (b.paused = !1),
              O(),
              r(g, i);
            var n = y(t, "onDeactivate"), o = y(t, "onPostDeactivate"), a = y(t, "checkCanReturnFocus"), l = y(t, "returnFocus", "returnFocusOnDeactivate");
            null == n || n();
            var c = function () {
              u(function () {
                l && j(S(b.nodeFocusedBeforeActivation)), null == o || o();
              });
            };
            return l && a
              ? (a(S(b.nodeFocusedBeforeActivation)).then(c, c), this)
              : (c(), this);
          },
          pause: function (e) {
            if (b.paused || !b.active) return this;
            var t = y(e, "onPause"), n = y(e, "onPostPause");
            return (
              (b.paused = !0),
              null == t || t(),
              T(),
              O(),
              null == n || n(),
              this
            );
          },
          unpause: function (e) {
            if (!b.paused || !b.active) return this;
            var t = y(e, "onUnpause"), n = y(e, "onPostUnpause");
            return (
              (b.paused = !1),
              null == t || t(),
              C(),
              B(),
              O(),
              null == n || n(),
              this
            );
          },
          updateContainerElements: function (e) {
            var t = [].concat(e).filter(Boolean);
            return (
              (b.containers = t.map(function (e) {
                return "string" == typeof e ? m.querySelector(e) : e;
              })),
              b.active && C(),
              O(),
              this
            );
          },
        }).updateContainerElements(e),
        i
      );
    };
  },
});
