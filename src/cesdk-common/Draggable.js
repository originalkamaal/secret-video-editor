import { createLazyModule } from "./others/createLazyModule";
import { react } from "./react";
import { reactDom } from "./react-dom";
import { clsx } from "./clsx";

export var Draggable = createLazyModule({
  "../../node_modules/react-draggable/build/cjs/Draggable.js"(e) {
    function t(e) {
      return (t =
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
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "DraggableCore", {
        enumerable: !0,
        get: function () {
          return c.default;
        },
      }),
      (e.default = void 0);
    var n = (function (e, n) {
      if (!n && e && e.__esModule) return e;
      if (null === e || ("object" !== t(e) && "function" != typeof e))
        return { default: e };
      var s = h(n);
      if (s && s.has(e)) return s.get(e);
      var i = {}, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var r in e)
        if ("default" !== r && Object.prototype.hasOwnProperty.call(e, r)) {
          var a = o ? Object.getOwnPropertyDescriptor(e, r) : null;
          a && (a.get || a.set)
            ? Object.defineProperty(i, r, a)
            : (i[r] = e[r]);
        }
      (i.default = e), s && s.set(e, i);
      return i;
    })(react()), s = f(draggablePropTypes()), i = f(reactDom()), o = f(clsx()), r = domFns(), a = positionFns(), l = shims(), c = f(DraggableCore()), u = f(log()), p = [
      "axis",
      "bounds",
      "children",
      "defaultPosition",
      "defaultClassName",
      "defaultClassNameDragging",
      "defaultClassNameDragged",
      "position",
      "positionOffset",
      "scale",
    ];
    function f(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function h(e) {
      if ("function" != typeof WeakMap) return null;
      var t = new WeakMap(), n = new WeakMap();
      return (h = function (e) {
        return e ? n : t;
      })(e);
    }
    function m() {
      return (
        (m =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var s in n)
                Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
            }
            return e;
          }),
        m.apply(this, arguments)
      );
    }
    function g(e, t) {
      if (null == e) return {};
      var n, s, i = (function (e, t) {
        if (null == e) return {};
        var n, s, i = {}, o = Object.keys(e);
        for (s = 0; s < o.length; s++)
          (n = o[s]), t.indexOf(n) >= 0 || (i[n] = e[n]);
        return i;
      })(e, t);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        for (s = 0; s < o.length; s++)
          (n = o[s]),
            t.indexOf(n) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(e, n) &&
              (i[n] = e[n]));
      }
      return i;
    }
    function x(e, t) {
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
    function b(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? x(Object(n), !0).forEach(function (t) {
            E(e, t, n[t]);
          })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : x(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    function y(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          var n = null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
            e["@@iterator"];
          if (null == n) return;
          var s, i, o = [], r = !0, a = !1;
          try {
            for (n = n.call(e); !(r = (s = n.next()).done) &&
              (o.push(s.value), !t || o.length !== t); r = !0);
          } catch (e) {
            (a = !0), (i = e);
          } finally {
            try {
              r || null == n.return || n.return();
            } finally {
              if (a) throw i;
            }
          }
          return o;
        })(e, t) ||
        (function (e, t) {
          if (!e) return;
          if ("string" == typeof e) return v(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === n && e.constructor && (n = e.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(e);
          if ("Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
            return v(e, t);
        })(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function v(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, s = new Array(t); n < t; n++) s[n] = e[n];
      return s;
    }
    function w(e, t) {
      for (var n = 0; n < t.length; n++) {
        var s = t[n];
        (s.enumerable = s.enumerable || !1),
          (s.configurable = !0),
          "value" in s && (s.writable = !0),
          Object.defineProperty(e, s.key, s);
      }
    }
    function k(e, t) {
      return (k =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    function C(e) {
      var n = (function () {
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
        var s, i = S(e);
        if (n) {
          var o = S(this).constructor;
          s = Reflect.construct(i, arguments, o);
        } else s = i.apply(this, arguments);
        return (function (e, n) {
          if (n && ("object" === t(n) || "function" == typeof n)) return n;
          if (void 0 !== n)
            throw new TypeError(
              "Derived constructors may only return object or undefined"
            );
          return j(e);
        })(this, s);
      };
    }
    function j(e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return e;
    }
    function S(e) {
      return (S = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
    }
    function E(e, t, n) {
      return (
        t in e
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
    var L = (function (e) {
      !(function (e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(e, "prototype", { writable: !1 }),
          t && k(e, t);
      })(f, e);
      var t, s, l, d = C(f);
      function f(e) {
        var t;
        return (
          (function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, f),
          E(j((t = d.call(this, e))), "onDragStart", function (e, n) {
            if (((0, u.default)("Draggable: onDragStart: %j", n),
              !1 === t.props.onStart(e, (0, a.createDraggableData)(j(t), n))))
              return !1;
            t.setState({ dragging: !0, dragged: !0 });
          }),
          E(j(t), "onDrag", function (e, n) {
            if (!t.state.dragging) return !1;
            (0, u.default)("Draggable: onDrag: %j", n);
            var s = (0, a.createDraggableData)(j(t), n), i = { x: s.x, y: s.y };
            if (t.props.bounds) {
              var o = i.x, r = i.y;
              (i.x += t.state.slackX), (i.y += t.state.slackY);
              var l = y((0, a.getBoundPosition)(j(t), i.x, i.y), 2), c = l[0], d = l[1];
              (i.x = c),
                (i.y = d),
                (i.slackX = t.state.slackX + (o - i.x)),
                (i.slackY = t.state.slackY + (r - i.y)),
                (s.x = i.x),
                (s.y = i.y),
                (s.deltaX = i.x - t.state.x),
                (s.deltaY = i.y - t.state.y);
            }
            if (!1 === t.props.onDrag(e, s)) return !1;
            t.setState(i);
          }),
          E(j(t), "onDragStop", function (e, n) {
            if (!t.state.dragging) return !1;
            if (!1 === t.props.onStop(e, (0, a.createDraggableData)(j(t), n)))
              return !1;
            (0, u.default)("Draggable: onDragStop: %j", n);
            var s = { dragging: !1, slackX: 0, slackY: 0 };
            if (Boolean(t.props.position)) {
              var i = t.props.position, o = i.x, r = i.y;
              (s.x = o), (s.y = r);
            }
            t.setState(s);
          }),
          (t.state = {
            dragging: !1,
            dragged: !1,
            x: e.position ? e.position.x : e.defaultPosition.x,
            y: e.position ? e.position.y : e.defaultPosition.y,
            prevPropsPosition: b({}, e.position),
            slackX: 0,
            slackY: 0,
            isElementSVG: !1,
          }),
          !e.position ||
          e.onDrag ||
          e.onStop ||
          console.warn(
            "A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element."
          ),
          t
        );
      }
      return (
        (t = f),
        (l = [
          {
            key: "getDerivedStateFromProps",
            value: function (e, t) {
              var n = e.position, s = t.prevPropsPosition;
              return !n || (s && n.x === s.x && n.y === s.y)
                ? null
                : ((0, u.default)("Draggable: getDerivedStateFromProps %j", {
                  position: n,
                  prevPropsPosition: s,
                }),
                  { x: n.x, y: n.y, prevPropsPosition: b({}, n) });
            },
          },
        ]),
        (s = [
          {
            key: "componentDidMount",
            value: function () {
              void 0 !== window.SVGElement &&
                this.findDOMNode() instanceof window.SVGElement &&
                this.setState({ isElementSVG: !0 });
            },
          },
          {
            key: "componentWillUnmount",
            value: function () {
              this.setState({ dragging: !1 });
            },
          },
          {
            key: "findDOMNode",
            value: function () {
              var e, t, n;
              return null !==
                (e =
                  null === (t = this.props) ||
                    void 0 === t ||
                    null === (n = t.nodeRef) ||
                    void 0 === n
                    ? void 0
                    : n.current) && void 0 !== e
                ? e
                : i.default.findDOMNode(this);
            },
          },
          {
            key: "render",
            value: function () {
              var e, t = this.props, s = (t.axis, t.bounds, t.children), i = t.defaultPosition, l = t.defaultClassName, u = t.defaultClassNameDragging, d = t.defaultClassNameDragged, f = t.position, h = t.positionOffset, x = (t.scale, g(t, p)), y = {}, v = null, w = !Boolean(f) || this.state.dragging, k = f || i, C = {
                x: (0, a.canDragX)(this) && w ? this.state.x : k.x,
                y: (0, a.canDragY)(this) && w ? this.state.y : k.y,
              };
              this.state.isElementSVG
                ? (v = (0, r.createSVGTransform)(C, h))
                : (y = (0, r.createCSSTransform)(C, h));
              var j = (0, o.default)(
                s.props.className || "",
                l,
                (E((e = {}), u, this.state.dragging),
                  E(e, d, this.state.dragged),
                  e)
              );
              return n.createElement(
                c.default,
                m({}, x, {
                  onStart: this.onDragStart,
                  onDrag: this.onDrag,
                  onStop: this.onDragStop,
                }),
                n.cloneElement(n.Children.only(s), {
                  className: j,
                  style: b(b({}, s.props.style), y),
                  transform: v,
                })
              );
            },
          },
        ]) && w(t.prototype, s),
        l && w(t, l),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        f
      );
    })(n.Component);
    (e.default = L),
      E(L, "displayName", "Draggable"),
      E(
        L,
        "propTypes",
        b(
          b({}, c.default.propTypes),
          {},
          {
            axis: s.default.oneOf(["both", "x", "y", "none"]),
            bounds: s.default.oneOfType([
              s.default.shape({
                left: s.default.number,
                right: s.default.number,
                top: s.default.number,
                bottom: s.default.number,
              }),
              s.default.string,
              s.default.oneOf([!1]),
            ]),
            defaultClassName: s.default.string,
            defaultClassNameDragging: s.default.string,
            defaultClassNameDragged: s.default.string,
            defaultPosition: s.default.shape({
              x: s.default.number,
              y: s.default.number,
            }),
            positionOffset: s.default.shape({
              x: s.default.oneOfType([s.default.number, s.default.string]),
              y: s.default.oneOfType([s.default.number, s.default.string]),
            }),
            position: s.default.shape({
              x: s.default.number,
              y: s.default.number,
            }),
            className: l.dontSetMe,
            style: l.dontSetMe,
            transform: l.dontSetMe,
          }
        )
      ),
      E(
        L,
        "defaultProps",
        b(
          b({}, c.default.defaultProps),
          {},
          {
            axis: "both",
            bounds: !1,
            defaultClassName: "react-draggable",
            defaultClassNameDragging: "react-draggable-dragging",
            defaultClassNameDragged: "react-draggable-dragged",
            defaultPosition: { x: 0, y: 0 },
            scale: 1,
          }
        )
      );
  },
});export var draggableCJS = createLazyModule({
  "../../node_modules/react-draggable/build/cjs/cjs.js"(e, t) {
    var n = Draggable(), s = n.default, i = n.DraggableCore;
    (t.exports = s), (t.exports.default = s), (t.exports.DraggableCore = i);
  },
});
export var DraggableCore = createLazyModule({
  "../../node_modules/react-draggable/build/cjs/DraggableCore.js"(e) {
    function t(e) {
      return (t =
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
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var n = (function (e, n) {
      if (!n && e && e.__esModule) return e;
      if (null === e || ("object" !== t(e) && "function" != typeof e))
        return { default: e };
      var s = u(n);
      if (s && s.has(e)) return s.get(e);
      var i = {}, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var r in e)
        if ("default" !== r && Object.prototype.hasOwnProperty.call(e, r)) {
          var a = o ? Object.getOwnPropertyDescriptor(e, r) : null;
          a && (a.get || a.set)
            ? Object.defineProperty(i, r, a)
            : (i[r] = e[r]);
        }
      (i.default = e), s && s.set(e, i);
      return i;
    })(react()), s = c(draggablePropTypes()), i = c(reactDom()), o = domFns(), r = positionFns(), a = shims(), l = c(log());
    function c(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function u(e) {
      if ("function" != typeof WeakMap) return null;
      var t = new WeakMap(), n = new WeakMap();
      return (u = function (e) {
        return e ? n : t;
      })(e);
    }
    function p(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          var n = null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
            e["@@iterator"];
          if (null == n) return;
          var s, i, o = [], r = !0, a = !1;
          try {
            for (n = n.call(e); !(r = (s = n.next()).done) &&
              (o.push(s.value), !t || o.length !== t); r = !0);
          } catch (e) {
            (a = !0), (i = e);
          } finally {
            try {
              r || null == n.return || n.return();
            } finally {
              if (a) throw i;
            }
          }
          return o;
        })(e, t) ||
        (function (e, t) {
          if (!e) return;
          if ("string" == typeof e) return f(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === n && e.constructor && (n = e.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(e);
          if ("Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
            return f(e, t);
        })(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function f(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, s = new Array(t); n < t; n++) s[n] = e[n];
      return s;
    }
    function h(e, t) {
      for (var n = 0; n < t.length; n++) {
        var s = t[n];
        (s.enumerable = s.enumerable || !1),
          (s.configurable = !0),
          "value" in s && (s.writable = !0),
          Object.defineProperty(e, s.key, s);
      }
    }
    function m(e, t) {
      return (m =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    function g(e) {
      var n = (function () {
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
        var s, i = b(e);
        if (n) {
          var o = b(this).constructor;
          s = Reflect.construct(i, arguments, o);
        } else s = i.apply(this, arguments);
        return (function (e, n) {
          if (n && ("object" === t(n) || "function" == typeof n)) return n;
          if (void 0 !== n)
            throw new TypeError(
              "Derived constructors may only return object or undefined"
            );
          return x(e);
        })(this, s);
      };
    }
    function x(e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return e;
    }
    function b(e) {
      return (b = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
    }
    function y(e, t, n) {
      return (
        t in e
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
    var v = { start: "touchstart", move: "touchmove", stop: "touchend" }, w = { start: "mousedown", move: "mousemove", stop: "mouseup" }, k = w, C = (function (e) {
      !(function (e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(e, "prototype", { writable: !1 }),
          t && m(e, t);
      })(u, e);
      var t, s, a, c = g(u);
      function u() {
        var e;
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, u);
        for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
          n[s] = arguments[s];
        return (
          y(x((e = c.call.apply(c, [this].concat(n)))), "state", {
            dragging: !1,
            lastX: NaN,
            lastY: NaN,
            touchIdentifier: null,
          }),
          y(x(e), "mounted", !1),
          y(x(e), "handleDragStart", function (t) {
            if ((e.props.onMouseDown(t),
              !e.props.allowAnyClick &&
              "number" == typeof t.button &&
              0 !== t.button))
              return !1;
            var n = e.findDOMNode();
            if (!n || !n.ownerDocument || !n.ownerDocument.body)
              throw new Error("<DraggableCore> not mounted on DragStart!");
            var s = n.ownerDocument;
            if (!(
              e.props.disabled ||
              !(t.target instanceof s.defaultView.Node) ||
              (e.props.handle &&
                !(0, o.matchesSelectorAndParentsTo)(
                  t.target,
                  e.props.handle,
                  n
                )) ||
              (e.props.cancel &&
                (0, o.matchesSelectorAndParentsTo)(
                  t.target,
                  e.props.cancel,
                  n
                ))
            )) {
              "touchstart" === t.type && t.preventDefault();
              var i = (0, o.getTouchIdentifier)(t);
              e.setState({ touchIdentifier: i });
              var a = (0, r.getControlPosition)(t, i, x(e));
              if (null != a) {
                var c = a.x, u = a.y, d = (0, r.createCoreData)(x(e), c, u);
                (0, l.default)("DraggableCore: handleDragStart: %j", d),
                  (0, l.default)("calling", e.props.onStart),
                  !1 !== e.props.onStart(t, d) &&
                  !1 !== e.mounted &&
                  (e.props.enableUserSelectHack &&
                    (0, o.addUserSelectStyles)(s),
                    e.setState({ dragging: !0, lastX: c, lastY: u }),
                    (0, o.addEvent)(s, k.move, e.handleDrag),
                    (0, o.addEvent)(s, k.stop, e.handleDragStop));
              }
            }
          }),
          y(x(e), "handleDrag", function (t) {
            var n = (0, r.getControlPosition)(
              t,
              e.state.touchIdentifier,
              x(e)
            );
            if (null != n) {
              var s = n.x, i = n.y;
              if (Array.isArray(e.props.grid)) {
                var o = s - e.state.lastX, a = i - e.state.lastY, c = p((0, r.snapToGrid)(e.props.grid, o, a), 2);
                if (((o = c[0]), (a = c[1]), !o && !a)) return;
                (s = e.state.lastX + o), (i = e.state.lastY + a);
              }
              var u = (0, r.createCoreData)(x(e), s, i);
              if (((0, l.default)("DraggableCore: handleDrag: %j", u),
                !1 !== e.props.onDrag(t, u) && !1 !== e.mounted))
                e.setState({ lastX: s, lastY: i });

              else
                try {
                  e.handleDragStop(new MouseEvent("mouseup"));
                } catch (t) {
                  var d = document.createEvent("MouseEvents");
                  d.initMouseEvent(
                    "mouseup",
                    !0,
                    !0,
                    window,
                    0,
                    0,
                    0,
                    0,
                    0,
                    !1,
                    !1,
                    !1,
                    !1,
                    0,
                    null
                  ),
                    e.handleDragStop(d);
                }
            }
          }),
          y(x(e), "handleDragStop", function (t) {
            if (e.state.dragging) {
              var n = (0, r.getControlPosition)(
                t,
                e.state.touchIdentifier,
                x(e)
              );
              if (null != n) {
                var s = n.x, i = n.y;
                if (Array.isArray(e.props.grid)) {
                  var a = s - e.state.lastX || 0, c = i - e.state.lastY || 0, u = p((0, r.snapToGrid)(e.props.grid, a, c), 2);
                  (a = u[0]),
                    (c = u[1]),
                    (s = e.state.lastX + a),
                    (i = e.state.lastY + c);
                }
                var d = (0, r.createCoreData)(x(e), s, i);
                if (!1 === e.props.onStop(t, d) || !1 === e.mounted)
                  return !1;
                var f = e.findDOMNode();
                f &&
                  e.props.enableUserSelectHack &&
                  (0, o.removeUserSelectStyles)(f.ownerDocument),
                  (0, l.default)("DraggableCore: handleDragStop: %j", d),
                  e.setState({ dragging: !1, lastX: NaN, lastY: NaN }),
                  f &&
                  ((0, l.default)("DraggableCore: Removing handlers"),
                    (0, o.removeEvent)(f.ownerDocument, k.move, e.handleDrag),
                    (0, o.removeEvent)(
                      f.ownerDocument,
                      k.stop,
                      e.handleDragStop
                    ));
              }
            }
          }),
          y(x(e), "onMouseDown", function (t) {
            return (k = w), e.handleDragStart(t);
          }),
          y(x(e), "onMouseUp", function (t) {
            return (k = w), e.handleDragStop(t);
          }),
          y(x(e), "onTouchStart", function (t) {
            return (k = v), e.handleDragStart(t);
          }),
          y(x(e), "onTouchEnd", function (t) {
            return (k = v), e.handleDragStop(t);
          }),
          e
        );
      }
      return (
        (t = u),
        (s = [
          {
            key: "componentDidMount",
            value: function () {
              this.mounted = !0;
              var e = this.findDOMNode();
              e &&
                (0, o.addEvent)(e, v.start, this.onTouchStart, {
                  passive: !1,
                });
            },
          },
          {
            key: "componentWillUnmount",
            value: function () {
              this.mounted = !1;
              var e = this.findDOMNode();
              if (e) {
                var t = e.ownerDocument;
                (0, o.removeEvent)(t, w.move, this.handleDrag),
                  (0, o.removeEvent)(t, v.move, this.handleDrag),
                  (0, o.removeEvent)(t, w.stop, this.handleDragStop),
                  (0, o.removeEvent)(t, v.stop, this.handleDragStop),
                  (0, o.removeEvent)(e, v.start, this.onTouchStart, {
                    passive: !1,
                  }),
                  this.props.enableUserSelectHack &&
                  (0, o.removeUserSelectStyles)(t);
              }
            },
          },
          {
            key: "findDOMNode",
            value: function () {
              var e, t, n;
              return null !== (e = this.props) && void 0 !== e && e.nodeRef
                ? null === (t = this.props) ||
                  void 0 === t ||
                  null === (n = t.nodeRef) ||
                  void 0 === n
                  ? void 0
                  : n.current
                : i.default.findDOMNode(this);
            },
          },
          {
            key: "render",
            value: function () {
              return n.cloneElement(n.Children.only(this.props.children), {
                onMouseDown: this.onMouseDown,
                onMouseUp: this.onMouseUp,
                onTouchEnd: this.onTouchEnd,
              });
            },
          },
        ]) && h(t.prototype, s),
        a && h(t, a),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        u
      );
    })(n.Component);
    (e.default = C),
      y(C, "displayName", "DraggableCore"),
      y(C, "propTypes", {
        allowAnyClick: s.default.bool,
        disabled: s.default.bool,
        enableUserSelectHack: s.default.bool,
        offsetParent: function (e, t) {
          if (e[t] && 1 !== e[t].nodeType)
            throw new Error("Draggable's offsetParent must be a DOM Node.");
        },
        grid: s.default.arrayOf(s.default.number),
        handle: s.default.string,
        cancel: s.default.string,
        nodeRef: s.default.object,
        onStart: s.default.func,
        onDrag: s.default.func,
        onStop: s.default.func,
        onMouseDown: s.default.func,
        scale: s.default.number,
        className: a.dontSetMe,
        style: a.dontSetMe,
        transform: a.dontSetMe,
      }),
      y(C, "defaultProps", {
        allowAnyClick: !1,
        disabled: !1,
        enableUserSelectHack: !0,
        onStart: function () { },
        onDrag: function () { },
        onStop: function () { },
        onMouseDown: function () { },
        scale: 1,
      });
  },
});
export var log = createLazyModule({
  "../../node_modules/react-draggable/build/cjs/utils/log.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = function () {
        void 0;
      });
  },
});
export var positionFns = createLazyModule({
  "../../node_modules/react-draggable/build/cjs/utils/positionFns.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.canDragX = function (e) {
        return "both" === e.props.axis || "x" === e.props.axis;
      }),
      (e.canDragY = function (e) {
        return "both" === e.props.axis || "y" === e.props.axis;
      }),
      (e.createCoreData = function (e, n, i) {
        var o = e.state, r = !(0, t.isNum)(o.lastX), a = s(e);
        return r
          ? { node: a, deltaX: 0, deltaY: 0, lastX: n, lastY: i, x: n, y: i }
          : {
            node: a,
            deltaX: n - o.lastX,
            deltaY: i - o.lastY,
            lastX: o.lastX,
            lastY: o.lastY,
            x: n,
            y: i,
          };
      }),
      (e.createDraggableData = function (e, t) {
        var n = e.props.scale;
        return {
          node: t.node,
          x: e.state.x + t.deltaX / n,
          y: e.state.y + t.deltaY / n,
          deltaX: t.deltaX / n,
          deltaY: t.deltaY / n,
          lastX: e.state.x,
          lastY: e.state.y,
        };
      }),
      (e.getBoundPosition = function (e, i, o) {
        if (!e.props.bounds) return [i, o];
        var r = e.props.bounds;
        r =
          "string" == typeof r
            ? r
            : (function (e) {
              return {
                left: e.left,
                top: e.top,
                right: e.right,
                bottom: e.bottom,
              };
            })(r);
        var a = s(e);
        if ("string" == typeof r) {
          var l, c = a.ownerDocument, u = c.defaultView;
          if (!(
            (l =
              "parent" === r ? a.parentNode : c.querySelector(r)) instanceof
            u.HTMLElement
          ))
            throw new Error(
              'Bounds selector "' + r + '" could not find an element.'
            );
          var d = l, p = u.getComputedStyle(a), f = u.getComputedStyle(d);
          r = {
            left: -a.offsetLeft +
              (0, t.int)(f.paddingLeft) +
              (0, t.int)(p.marginLeft),
            top: -a.offsetTop + (0, t.int)(f.paddingTop) + (0, t.int)(p.marginTop),
            right: (0, n.innerWidth)(d) -
              (0, n.outerWidth)(a) -
              a.offsetLeft +
              (0, t.int)(f.paddingRight) -
              (0, t.int)(p.marginRight),
            bottom: (0, n.innerHeight)(d) -
              (0, n.outerHeight)(a) -
              a.offsetTop +
              (0, t.int)(f.paddingBottom) -
              (0, t.int)(p.marginBottom),
          };
        }
        (0, t.isNum)(r.right) && (i = Math.min(i, r.right));
        (0, t.isNum)(r.bottom) && (o = Math.min(o, r.bottom));
        (0, t.isNum)(r.left) && (i = Math.max(i, r.left));
        (0, t.isNum)(r.top) && (o = Math.max(o, r.top));
        return [i, o];
      }),
      (e.getControlPosition = function (e, t, i) {
        var o = "number" == typeof t ? (0, n.getTouch)(e, t) : null;
        if ("number" == typeof t && !o) return null;
        var r = s(i), a = i.props.offsetParent || r.offsetParent || r.ownerDocument.body;
        return (0, n.offsetXYFromParent)(o || e, a, i.props.scale);
      }),
      (e.snapToGrid = function (e, t, n) {
        var s = Math.round(t / e[0]) * e[0], i = Math.round(n / e[1]) * e[1];
        return [s, i];
      });
    var t = shims(), n = domFns();
    function s(e) {
      var t = e.findDOMNode();
      if (!t) throw new Error("<DraggableCore>: Unmounted during event!");
      return t;
    }
  },
});
export var domFns = createLazyModule({
  "../../node_modules/react-draggable/build/cjs/utils/domFns.js"(e) {
    function t(e) {
      return (t =
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
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.addClassName = d),
      (e.addEvent = function (e, t, n, s) {
        if (!e) return;
        var i = r({ capture: !0 }, s);
        e.addEventListener
          ? e.addEventListener(t, n, i)
          : e.attachEvent
            ? e.attachEvent("on" + t, n)
            : (e["on" + t] = n);
      }),
      (e.addUserSelectStyles = function (e) {
        if (!e) return;
        var t = e.getElementById("react-draggable-style-el");
        t ||
          (((t = e.createElement("style")).type = "text/css"),
            (t.id = "react-draggable-style-el"),
            (t.innerHTML =
              ".react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n"),
            (t.innerHTML +=
              ".react-draggable-transparent-selection *::selection {all: inherit;}\n"),
            e.getElementsByTagName("head")[0].appendChild(t));
        e.body && d(e.body, "react-draggable-transparent-selection");
      }),
      (e.createCSSTransform = function (e, t) {
        var n = u(e, t, "px");
        return a({}, (0, s.browserPrefixToKey)("transform", s.default), n);
      }),
      (e.createSVGTransform = function (e, t) {
        return u(e, t, "");
      }),
      (e.getTouch = function (e, t) {
        return (
          (e.targetTouches &&
            (0, n.findInArray)(e.targetTouches, function (e) {
              return t === e.identifier;
            })) ||
          (e.changedTouches &&
            (0, n.findInArray)(e.changedTouches, function (e) {
              return t === e.identifier;
            }))
        );
      }),
      (e.getTouchIdentifier = function (e) {
        if (e.targetTouches && e.targetTouches[0])
          return e.targetTouches[0].identifier;
        if (e.changedTouches && e.changedTouches[0])
          return e.changedTouches[0].identifier;
      }),
      (e.getTranslation = u),
      (e.innerHeight = function (e) {
        var t = e.clientHeight, s = e.ownerDocument.defaultView.getComputedStyle(e);
        return (
          (t -= (0, n.int)(s.paddingTop)), (t -= (0, n.int)(s.paddingBottom))
        );
      }),
      (e.innerWidth = function (e) {
        var t = e.clientWidth, s = e.ownerDocument.defaultView.getComputedStyle(e);
        return (
          (t -= (0, n.int)(s.paddingLeft)), (t -= (0, n.int)(s.paddingRight))
        );
      }),
      (e.matchesSelector = c),
      (e.matchesSelectorAndParentsTo = function (e, t, n) {
        var s = e;
        do {
          if (c(s, t)) return !0;
          if (s === n) return !1;
          s = s.parentNode;
        } while (s);
        return !1;
      }),
      (e.offsetXYFromParent = function (e, t, n) {
        var s = t === t.ownerDocument.body
          ? { left: 0, top: 0 }
          : t.getBoundingClientRect(), i = (e.clientX + t.scrollLeft - s.left) / n, o = (e.clientY + t.scrollTop - s.top) / n;
        return { x: i, y: o };
      }),
      (e.outerHeight = function (e) {
        var t = e.clientHeight, s = e.ownerDocument.defaultView.getComputedStyle(e);
        return (
          (t += (0, n.int)(s.borderTopWidth)),
          (t += (0, n.int)(s.borderBottomWidth))
        );
      }),
      (e.outerWidth = function (e) {
        var t = e.clientWidth, s = e.ownerDocument.defaultView.getComputedStyle(e);
        return (
          (t += (0, n.int)(s.borderLeftWidth)),
          (t += (0, n.int)(s.borderRightWidth))
        );
      }),
      (e.removeClassName = p),
      (e.removeEvent = function (e, t, n, s) {
        if (!e) return;
        var i = r({ capture: !0 }, s);
        e.removeEventListener
          ? e.removeEventListener(t, n, i)
          : e.detachEvent
            ? e.detachEvent("on" + t, n)
            : (e["on" + t] = null);
      }),
      (e.removeUserSelectStyles = function (e) {
        if (!e) return;
        try {
          if ((e.body && p(e.body, "react-draggable-transparent-selection"),
            e.selection))
            e.selection.empty();
          else {
            var t = (e.defaultView || window).getSelection();
            t && "Caret" !== t.type && t.removeAllRanges();
          }
        } catch (e) { }
      });
    var n = shims(), s = (function (e, n) {
      if (!n && e && e.__esModule) return e;
      if (null === e || ("object" !== t(e) && "function" != typeof e))
        return { default: e };
      var s = i(n);
      if (s && s.has(e)) return s.get(e);
      var o = {}, r = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var a in e)
        if ("default" !== a && Object.prototype.hasOwnProperty.call(e, a)) {
          var l = r ? Object.getOwnPropertyDescriptor(e, a) : null;
          l && (l.get || l.set)
            ? Object.defineProperty(o, a, l)
            : (o[a] = e[a]);
        }
      (o.default = e), s && s.set(e, o);
      return o;
    })(getPrefix());
    function i(e) {
      if ("function" != typeof WeakMap) return null;
      var t = new WeakMap(), n = new WeakMap();
      return (i = function (e) {
        return e ? n : t;
      })(e);
    }
    function o(e, t) {
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
    function r(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? o(Object(n), !0).forEach(function (t) {
            a(e, t, n[t]);
          })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : o(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    function a(e, t, n) {
      return (
        t in e
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
    var l = "";
    function c(e, t) {
      return (
        l ||
        (l = (0, n.findInArray)(
          [
            "matches",
            "webkitMatchesSelector",
            "mozMatchesSelector",
            "msMatchesSelector",
            "oMatchesSelector",
          ],
          function (t) {
            return (0, n.isFunction)(e[t]);
          }
        )),
        !!(0, n.isFunction)(e[l]) && e[l](t)
      );
    }
    function u(e, t, n) {
      var s = e.x, i = e.y, o = "translate(".concat(s).concat(n, ",").concat(i).concat(n, ")");
      if (t) {
        var r = "".concat("string" == typeof t.x ? t.x : t.x + n), a = "".concat("string" == typeof t.y ? t.y : t.y + n);
        o = "translate(".concat(r, ", ").concat(a, ")") + o;
      }
      return o;
    }
    function d(e, t) {
      e.classList
        ? e.classList.add(t)
        : e.className.match(new RegExp("(?:^|\\s)".concat(t, "(?!\\S)"))) ||
        (e.className += " ".concat(t));
    }
    function p(e, t) {
      e.classList
        ? e.classList.remove(t)
        : (e.className = e.className.replace(
          new RegExp("(?:^|\\s)".concat(t, "(?!\\S)"), "g"),
          ""
        ));
    }
  },
});
export var getPrefix = createLazyModule({
  "../../node_modules/react-draggable/build/cjs/utils/getPrefix.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.browserPrefixToKey = s),
      (e.browserPrefixToStyle = function (e, t) {
        return t ? "-".concat(t.toLowerCase(), "-").concat(e) : e;
      }),
      (e.default = void 0),
      (e.getPrefix = n);
    var t = ["Moz", "Webkit", "O", "ms"];
    function n() {
      var e, n, i = arguments.length > 0 && void 0 !== arguments[0]
        ? arguments[0]
        : "transform";
      if ("undefined" == typeof window) return "";
      var o = null === (e = window.document) ||
        void 0 === e ||
        null === (n = e.documentElement) ||
        void 0 === n
        ? void 0
        : n.style;
      if (!o) return "";
      if (i in o) return "";
      for (var r = 0; r < t.length; r++) if (s(i, t[r]) in o) return t[r];
      return "";
    }
    function s(e, t) {
      return t
        ? "".concat(t).concat(
          (function (e) {
            for (var t = "", n = !0, s = 0; s < e.length; s++)
              n
                ? ((t += e[s].toUpperCase()), (n = !1))
                : "-" === e[s]
                  ? (n = !0)
                  : (t += e[s]);
            return t;
          })(e)
        )
        : e;
    }
    var i = n();
    e.default = i;
  },
});
export var shims = createLazyModule({
  "../../node_modules/react-draggable/build/cjs/utils/shims.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.dontSetMe = function (e, t, n) {
        if (e[t])
          return new Error(
            "Invalid prop "
              .concat(t, " passed to ")
              .concat(n, " - do not set this, set it on the child.")
          );
      }),
      (e.findInArray = function (e, t) {
        for (var n = 0, s = e.length; n < s; n++)
          if (t.apply(t, [e[n], n, e])) return e[n];
      }),
      (e.int = function (e) {
        return parseInt(e, 10);
      }),
      (e.isFunction = function (e) {
        return (
          "function" == typeof e ||
          "[object Function]" === Object.prototype.toString.call(e)
        );
      }),
      (e.isNum = function (e) {
        return "number" == typeof e && !isNaN(e);
      });
  },
});
export var draggableRectPropTypesSecret = createLazyModule({
  "../../node_modules/react-draggable/node_modules/prop-types/lib/ReactPropTypesSecret.js"(
    e,
    t
  ) {
    t.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  },
});
export var draggableFactoryWithThrowingShims = createLazyModule({
  "../../node_modules/react-draggable/node_modules/prop-types/factoryWithThrowingShims.js"(
    e,
    t
  ) {
    var n = draggableRectPropTypesSecret();
    function s() { }
    function i() { }
    (i.resetWarningCache = s),
      (t.exports = function () {
        function e(e, t, s, i, o, r) {
          if (r !== n) {
            var a = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw ((a.name = "Invariant Violation"), a);
          }
        }
        function t() {
          return e;
        }
        e.isRequired = e;
        var o = {
          array: e,
          bigint: e,
          bool: e,
          func: e,
          number: e,
          object: e,
          string: e,
          symbol: e,
          any: e,
          arrayOf: t,
          element: e,
          elementType: e,
          instanceOf: t,
          node: e,
          objectOf: t,
          oneOf: t,
          oneOfType: t,
          shape: t,
          exact: t,
          checkPropTypes: i,
          resetWarningCache: s,
        };
        return (o.PropTypes = o), o;
      });
  },
});
export var draggablePropTypes = createLazyModule({
  "../../node_modules/react-draggable/node_modules/prop-types/index.js"(e, t) {
    t.exports = draggableFactoryWithThrowingShims()();
  },
});

