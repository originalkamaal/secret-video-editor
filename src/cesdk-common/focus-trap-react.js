import { createLazyModule } from "./others/createLazyModule";
import { react } from "./react";
import { proptypes } from "./prop-types";
import { focusTrap } from "./focus-trap";
import { tabbable } from "./tabbable";

export var focusTrapReact = createLazyModule({
  "../../node_modules/focus-trap-react/dist/focus-trap-react.js"(e, t) {
    function n(e) {
      return (n =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
            return typeof e;
          }
          : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
    }
    function s(e, t) {
      for (var n = 0; n < t.length; n++) {
        var s = t[n];
        (s.enumerable = s.enumerable || !1),
          (s.configurable = !0),
          "value" in s && (s.writable = !0),
          Object.defineProperty(e, l(s.key), s);
      }
    }
    function i(e, t) {
      return (i = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    function o(e) {
      var t = (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () { })
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      })();
      return function () {
        var s, i = a(e);
        if (t) {
          var o = a(this).constructor;
          s = Reflect.construct(i, arguments, o);
        } else s = i.apply(this, arguments);
        return (function (e, t) {
          if (t && ("object" === n(t) || "function" == typeof t)) return t;
          if (void 0 !== t)
            throw new TypeError(
              "Derived constructors may only return object or undefined"
            );
          return r(e);
        })(this, s);
      };
    }
    function r(e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return e;
    }
    function a(e) {
      return (a = Object.setPrototypeOf
        ? Object.getPrototypeOf.bind()
        : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
    }
    function l(e) {
      var t = (function (e, t) {
        if ("object" !== n(e) || null === e) return e;
        var s = e[Symbol.toPrimitive];
        if (void 0 !== s) {
          var i = s.call(e, t || "default");
          if ("object" !== n(i)) return i;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === t ? String : Number)(e);
      })(e, "string");
      return "symbol" === n(t) ? t : String(t);
    }
    var c = react(), u = proptypes(), p = focusTrap().createFocusTrap, f = tabbable().isFocusable, h = (function (e) {
      !(function (e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(e, "prototype", { writable: !1 }),
          t && i(e, t);
      })(d, e);
      var t, n, a, u = o(d);
      function d(e) {
        var t, n, s, i;
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, d),
          (t = u.call(this, e)),
          (n = r(t)),
          (i = function (e) {
            var t, n = null !== (t = this.internalOptions[e]) && void 0 !== t
              ? t
              : this.originalOptions[e];
            if ("function" == typeof n) {
              for (var s = arguments.length, i = new Array(s > 1 ? s - 1 : 0), o = 1; o < s; o++)
                i[o - 1] = arguments[o];
              n = n.apply(void 0, i);
            }
            if ((!0 === n && (n = void 0), !n)) {
              if (void 0 === n || !1 === n) return n;
              throw new Error(
                "`".concat(
                  e,
                  "` was specified but was not a node, or did not return a node"
                )
              );
            }
            var r, a = n;
            if ("string" == typeof n &&
              !(a =
                null === (r = this.getDocument()) || void 0 === r
                  ? void 0
                  : r.querySelector(n)))
              throw new Error(
                "`".concat(e, "` as selector refers to no known node")
              );
            return a;
          }),
          (s = l((s = "getNodeForOption"))) in n
            ? Object.defineProperty(n, s, {
              value: i,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
            : (n[s] = i),
          (t.handleDeactivate = t.handleDeactivate.bind(r(t))),
          (t.handlePostDeactivate = t.handlePostDeactivate.bind(r(t))),
          (t.handleClickOutsideDeactivates =
            t.handleClickOutsideDeactivates.bind(r(t))),
          (t.internalOptions = {
            returnFocusOnDeactivate: !1,
            checkCanReturnFocus: null,
            onDeactivate: t.handleDeactivate,
            onPostDeactivate: t.handlePostDeactivate,
            clickOutsideDeactivates: t.handleClickOutsideDeactivates,
          }),
          (t.originalOptions = {
            returnFocusOnDeactivate: !0,
            onDeactivate: null,
            onPostDeactivate: null,
            checkCanReturnFocus: null,
            clickOutsideDeactivates: !1,
          });
        var o = e.focusTrapOptions;
        for (var a in o)
          Object.prototype.hasOwnProperty.call(o, a) &&
            ("returnFocusOnDeactivate" !== a &&
              "onDeactivate" !== a &&
              "onPostDeactivate" !== a &&
              "checkCanReturnFocus" !== a &&
              "clickOutsideDeactivates" !== a
              ? (t.internalOptions[a] = o[a])
              : (t.originalOptions[a] = o[a]));
        return (
          (t.outsideClick = null),
          (t.focusTrapElements = e.containerElements || []),
          t.updatePreviousElement(),
          t
        );
      }
      return (
        (t = d),
        (n = [
          {
            key: "getDocument",
            value: function () {
              return (
                this.props.focusTrapOptions.document ||
                ("undefined" != typeof document ? document : void 0)
              );
            },
          },
          {
            key: "getReturnFocusNode",
            value: function () {
              var e = this.getNodeForOption(
                "setReturnFocus",
                this.previouslyFocusedElement
              );
              return e || (!1 !== e && this.previouslyFocusedElement);
            },
          },
          {
            key: "updatePreviousElement",
            value: function () {
              var e = this.getDocument();
              e && (this.previouslyFocusedElement = e.activeElement);
            },
          },
          {
            key: "deactivateTrap",
            value: function () {
              this.focusTrap &&
                this.focusTrap.active &&
                this.focusTrap.deactivate({
                  returnFocus: !1,
                  checkCanReturnFocus: null,
                  onDeactivate: this.originalOptions.onDeactivate,
                });
            },
          },
          {
            key: "handleClickOutsideDeactivates",
            value: function (e) {
              var t = "function" ==
                typeof this.originalOptions.clickOutsideDeactivates
                ? this.originalOptions.clickOutsideDeactivates.call(
                  null,
                  e
                )
                : this.originalOptions.clickOutsideDeactivates;
              return (
                t &&
                (this.outsideClick = {
                  target: e.target,
                  allowDeactivation: t,
                }),
                t
              );
            },
          },
          {
            key: "handleDeactivate",
            value: function () {
              this.originalOptions.onDeactivate &&
                this.originalOptions.onDeactivate.call(null),
                this.deactivateTrap();
            },
          },
          {
            key: "handlePostDeactivate",
            value: function () {
              var e = this, t = function () {
                var t = e.getReturnFocusNode(), n = !(
                  !e.originalOptions.returnFocusOnDeactivate ||
                  null == t ||
                  !t.focus ||
                  (e.outsideClick &&
                    (!e.outsideClick.allowDeactivation ||
                      f(
                        e.outsideClick.target,
                        e.internalOptions.tabbableOptions
                      )))
                ), s = e.internalOptions.preventScroll, i = void 0 !== s && s;
                n && t.focus({ preventScroll: i }),
                  e.originalOptions.onPostDeactivate &&
                  e.originalOptions.onPostDeactivate.call(null),
                  (e.outsideClick = null);
              };
              this.originalOptions.checkCanReturnFocus
                ? this.originalOptions.checkCanReturnFocus
                  .call(null, this.getReturnFocusNode())
                  .then(t, t)
                : t();
            },
          },
          {
            key: "setupFocusTrap",
            value: function () {
              this.focusTrap
                ? this.props.active &&
                !this.focusTrap.active &&
                (this.focusTrap.activate(),
                  this.props.paused && this.focusTrap.pause())
                : this.focusTrapElements.some(Boolean) &&
                ((this.focusTrap = this.props._createFocusTrap(
                  this.focusTrapElements,
                  this.internalOptions
                )),
                  this.props.active && this.focusTrap.activate(),
                  this.props.paused && this.focusTrap.pause());
            },
          },
          {
            key: "componentDidMount",
            value: function () {
              this.props.active && this.setupFocusTrap();
            },
          },
          {
            key: "componentDidUpdate",
            value: function (e) {
              if (this.focusTrap) {
                e.containerElements !== this.props.containerElements &&
                  this.focusTrap.updateContainerElements(
                    this.props.containerElements
                  );
                var t = !e.active && this.props.active, n = e.active && !this.props.active, s = !e.paused && this.props.paused, i = e.paused && !this.props.paused;
                if ((t &&
                  (this.updatePreviousElement(),
                    this.focusTrap.activate()),
                  n))
                  return void this.deactivateTrap();
                s && this.focusTrap.pause(), i && this.focusTrap.unpause();
              }
              else
                e.containerElements !== this.props.containerElements &&
                  (this.focusTrapElements = this.props.containerElements),
                  this.props.active &&
                  (this.updatePreviousElement(), this.setupFocusTrap());
            },
          },
          {
            key: "componentWillUnmount",
            value: function () {
              this.deactivateTrap();
            },
          },
          {
            key: "render",
            value: function () {
              var e = this, t = this.props.children
                ? c.Children.only(this.props.children)
                : void 0;
              if (t) {
                if (t.type && t.type === c.Fragment)
                  throw new Error(
                    "A focus-trap cannot use a Fragment as its child container. Try replacing it with a <div> element."
                  );
                return c.cloneElement(t, {
                  ref: function (n) {
                    var s = e.props.containerElements;
                    t &&
                      ("function" == typeof t.ref
                        ? t.ref(n)
                        : t.ref && (t.ref.current = n)),
                      (e.focusTrapElements = s || [n]);
                  },
                });
              }
              return null;
            },
          },
        ]) && s(t.prototype, n),
        a && s(t, a),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        d
      );
    })(c.Component), m = "undefined" == typeof Element ? Function : Element;
    (h.propTypes = {
      active: u.bool,
      paused: u.bool,
      focusTrapOptions: u.shape({
        document: u.object,
        onActivate: u.func,
        onPostActivate: u.func,
        checkCanFocusTrap: u.func,
        onPause: u.func,
        onPostPause: u.func,
        onUnpause: u.func,
        onPostUnpause: u.func,
        onDeactivate: u.func,
        onPostDeactivate: u.func,
        checkCanReturnFocus: u.func,
        initialFocus: u.oneOfType([
          u.instanceOf(m),
          u.string,
          u.bool,
          u.func,
        ]),
        fallbackFocus: u.oneOfType([u.instanceOf(m), u.string, u.func]),
        escapeDeactivates: u.oneOfType([u.bool, u.func]),
        clickOutsideDeactivates: u.oneOfType([u.bool, u.func]),
        returnFocusOnDeactivate: u.bool,
        setReturnFocus: u.oneOfType([
          u.instanceOf(m),
          u.string,
          u.bool,
          u.func,
        ]),
        allowOutsideClick: u.oneOfType([u.bool, u.func]),
        preventScroll: u.bool,
        tabbableOptions: u.shape({
          displayCheck: u.oneOf([
            "full",
            "legacy-full",
            "non-zero-area",
            "none",
          ]),
          getShadowRoot: u.oneOfType([u.bool, u.func]),
        }),
        trapStack: u.array,
        isKeyForward: u.func,
        isKeyBackward: u.func,
      }),
      containerElements: u.arrayOf(u.instanceOf(m)),
      children: u.oneOfType([u.element, u.instanceOf(m)]),
    }),
      (h.defaultProps = {
        active: !0,
        paused: !1,
        focusTrapOptions: {},
        _createFocusTrap: p,
      }),
      (t.exports = h);
  },
});
