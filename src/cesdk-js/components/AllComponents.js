import { ClickOutsideContextProvider } from "../ClickOutsideContextProvider";
import { CompCustomButton } from "../CompCustomButton";
import { CompCustomIcon } from "../CompCustomIcon";
import { Rx, Mx, CC, wC } from "../icons/Icons";
import { hm, mm, fm, vx, pm, Fx, Nx, Dx, Vx, Zx, Xx, eC, Jk, Wk, Zk, lC, mC, VC, jC, SC } from "../reacts";
import { $x, _C, AC, aC, BC, EC, Gk, Gx, gx, Hx, Ix, LC, MC, OC, PC, qx, Qx, RC, TC, Xk, xx, Yx, zx } from "../vh";
import { mostlyHook1, Ng, wx, um, DynamicPresenceTransition, hx, Sd, bC, Qb } from "../working";
import { Qg } from "../utils";
import { xh } from "../utils";

export var PopoverWrapper = (0, hm.forwardRef)(function (
  {
    children: [e, t], disableFocusTrap: n, placement: s, popperContainerClassname: i, onClose: o, onOpen: r, defaultOpen: a = false, closeOnWheel: l = false, closeOnOutsideClick: c = true, keyShortcutTrigger: u, keyShortcutTriggerOptions: { preventDefault: d, ...p } = {}, doubleOffset: f = false, className: h, returnFocus: m, boundary: g = {},
  },
  x
) {
  const [b] = (0, hm.useState)(yx), [y, v] = (0, hm.useState)(a), w = (0, hm.useRef)(null), k = (0, hm.useCallback)(
    (e) => {
      let t = null;
      (0, mm.flushSync)(() => {
        v((n) => {
          const s = "function" == typeof e ? e(n) : e;
          return n && !s && (t = "closed"), !n && s && (t = "opened"), s;
        });
      }),
        "closed" === t
          ? o?.()
          : "opened" === t && r?.({ forceUpdate: w.current });
    },
    [r, o]
  ), C = (0, hm.useCallback)(() => k(false), [k]);
  mostlyHook1(u, () => (k((e) => !e), !d), p);
  const [j, S] = (0, hm.useState)(null), [_, E] = (0, hm.useState)(null), L = (0, hm.useRef)(null), P = (0, hm.useRef)(null), A = !n && y;
  mostlyHook1(["esc"], A ? C : null, { elementRef: P });
  const {
    styles: B, attributes: T, forceUpdate: M,
  } = Ng(j, _, {
    placement: s,
    modifiers: (0, hm.useMemo)(
      () => [
        {
          name: "preventOverflow",
          options: { padding: g.padding ?? 8, boundary: g.element },
        },
        {
          name: "offset",
          options: {
            offset: () => [
              0,
              parseInt(xh("--ubq-scale-base", { fallback: "4px" }), 10) *
              (f ? 2 : 1),
            ],
          },
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: [
              "bottom-end",
              "bottom-start",
              "top",
              "top-end",
              "top-start",
              "left",
              "left-end",
              "left-start",
              "right",
              "right-end",
              "right-start",
            ],
          },
        },
      ],
      [g.element, g.padding, f]
    ),
  });
  w.current = M;
  (0, hm.useEffect)(() => {
    const e = ({ target: e }) => {
      e && _ && !_.contains(e) && y && k(false);
    };
    return (
      l && document.addEventListener("wheel", e, { passive: true }),
      () => {
        document.removeEventListener("wheel", e);
      }
    );
  }, [_, y]),
    (0, hm.useEffect)(() => {
      const e = (e) => {
        e.stopPropagation();
      };
      return (
        _?.addEventListener("wheel", e, { passive: true }),
        () => {
          _?.removeEventListener("wheel", e);
        }
      );
    }, [_]);
  const O = (0, hm.useMemo)(() => ({ isOpen: y, closePopover: C }), [C, y]);
  (0, hm.useEffect)(() => {
    if (j) {
      const e = () => k((e) => !e);
      return (
        j.addEventListener("click", e),
        () => {
          j.removeEventListener("click", e);
        }
      );
    }
    return fm.default;
  }, [j, k]);
  const R = {
    "aria-controls": b,
    "aria-haspopup": true,
    "aria-expanded": y,
    ref: (0, hm.useMemo)(() => Qg(L, S, x), [L, S, x]),
  }, [V, D] = (0, hm.useState)(null), F = (0, hm.useMemo)(() => (V ? [V] : []), [V]);
  return (0, vx.jsxs)(wx.Provider, {
    value: O,
    children: [
      e(R, O),
      (0, vx.jsx)(um, {
        containerElements: F,
        active: A && F.length > 0,
        focusTrapOptions: {
          preventScroll: true,
          escapeDeactivates: false,
          clickOutsideDeactivates: true,
          setReturnFocus: m,
        },
      }),
      (0, vx.jsx)(DynamicPresenceTransition, {
        children: y &&
          (0, vx.jsx)(hx, {
            children: (0, vx.jsx)(ClickOutsideContextProvider, {
              onClickOutside: (e) => {
                y && c && (e.isOutside(_, j) ? k(false) : e.stopPropagation());
              },
              children: (0, vx.jsx)(Sd.div, {
                ref: (e) => {
                  (P.current = e), E(e);
                },
                style: B.popper,
                ...T.popper,
                className: (0, pm.default)(gx, i, h),
                transition: { ease: "easeInOut", duration: 0.2 },
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                children: (0, vx.jsx)("div", {
                  id: b,
                  ref: D,
                  className: xx,
                  role: "menu",
                  "aria-hidden": !y,
                  children: t(O),
                }),
              }),
            }),
          }),
      }),
    ],
  });
});



export var Ux = function ({
  className: e, children: t, labelFor: n, isDisabled: s = false, ...i
}) {
  return (0, Nx.jsx)("label", {
    htmlFor: n,
    ...i,
    className: (0, Fx.default)(Ix, { [Hx]: s }, e),
    children: t,
  });
};
export var Wx = function ({
  name: e, label: t, ariaLabel: n, ariaControls: s, onChange: i, "data-cy": o, checked: r, isDisabled: a, labelPosition: l = "left", icon: c, className: u, indeterminate: d, hideLabel: p = false,
}) {
  const f = (0, Dx.useRef)(null);
  return (
    (0, Dx.useEffect)(() => {
      f.current && (f.current.indeterminate = d ?? false);
    }, [d]),
    (0, Zx.jsxs)("div", {
      className: (0, Vx.default)(zx, u, { [Gx]: a, [$x]: "right" === l }),
      "aria-label": n || t,
      children: [
        !p &&
        (0, Zx.jsxs)(Ux, {
          htmlFor: e,
          "data-checked": d ? "mixed" : r,
          children: [
            c &&
            ("string" == typeof c
              ? (0, Zx.jsx)(CompCustomIcon, { icon: c })
              : c),
            t,
          ],
        }),
        (0, Zx.jsxs)("div", {
          className: (0, Vx.default)(qx),
          children: [
            (0, Zx.jsx)("input", {
              type: "checkbox",
              name: e,
              id: e,
              "data-cy": o || e,
              "aria-controls": s,
              "aria-label": p ? t : undefined,
              checked: true === r,
              onChange: () => {
                i?.(!r);
              },
              tabIndex: 0,
              disabled: a,
              ref: f,
            }),
            (0, Zx.jsx)("div", {
              className: (0, Vx.default)(Qx),
              "data-checked": d ? "mixed" : r,
              children: d ? (0, Zx.jsx)(Rx, {}) : (0, Zx.jsx)(Mx, {}),
            }),
          ],
        }),
      ],
    })
  );
};
export function Jx({ children: e }) {
  return (0, Xx.jsx)("li", { className: Yx, children: e });
}
export var Kk = function ({ children: e, className: t, "data-cy": n }) {
  return (0, Wk.jsx)("div", {
    className: (0, Zk.default)(Gk, t),
    "data-cy": n,
    children: e,
  });
};


export var tC = function ({ children: e, className: t, "data-cy": n }) {
  return (0, eC.jsx)("div", {
    className: (0, Jk.default)(Xk, t),
    "data-cy": n,
    children: e,
  });
};
export var cC = function ({ value: e, readOnly: t = false }) {
  return (0, lC.jsx)("textarea", { className: aC, value: e, readOnly: t });
};

export function gC({ children: e, ...t }) {
  return (0, mC.jsx)("li", { role: "menuitem", ...t, children: e });
}
export function FC({ children: e, isActive: t, className: n, ...s }, i) {
  return (0, VC.jsx)("li", {
    className: (0, jC.default)(LC, { [TC]: t }),
    children: (0, VC.jsx)("button", {
      ref: i,
      type: "button",
      ...s,
      className: (0, jC.default)(OC, n),
      children: e,
    }),
  });
}
export function IC(
  { children: e, isActive: t, menu: n, className: s, ...i },
  o
) {
  return (0, VC.jsxs)("li", {
    className: (0, jC.default)(LC, { [TC]: t }),
    children: [
      (0, VC.jsx)("a", {
        ref: o,
        ...i,
        className: (0, jC.default)(MC, s),
        children: e,
      }),
      n,
    ],
  });
}
export function HC({ children: e, className: t }) {
  return (0, VC.jsx)("div", { className: (0, jC.default)(RC, t), children: e });
}
export function NC(
  { children: e, icon: t, isActive: n, menu: s, className: i, ...o },
  r
) {
  return (0, VC.jsxs)("li", {
    className: PC,
    children: [
      (0, VC.jsxs)("button", {
        ref: r,
        type: "button",
        ...o,
        className: (0, jC.default)(OC, i, { [TC]: n }),
        children: [
          (0, VC.jsx)("div", { className: (0, jC.default)(AC), children: t }),
          " ",
          e,
        ],
      }),
      s,
    ],
  });
}
export function UC(
  { icon: e, isActive: t, menu: n, children: s, className: i, ...o },
  r
) {
  return (0, VC.jsxs)("li", {
    className: (0, jC.default)(PC, { [TC]: t }),
    children: [
      (0, VC.jsxs)("a", {
        ref: r,
        ...o,
        className: (0, jC.default)(MC, i),
        children: [
          (0, VC.jsx)("div", { className: (0, jC.default)(AC), children: e }),
          " ",
          s,
        ],
      }),
      n,
    ],
  });
}
export function zC({ children: e }) {
  return (0, VC.jsx)(bC.Item, { children: e });
}
export function $C({ children: e, isDisabled: t }) {
  return (0, VC.jsxs)(PopoverWrapper, {
    children: [
      (e) => (0, VC.jsx)(CompCustomButton, {
        name: "treeViewMenuMore",
        "aria-label": "Open folder options",
        variant: "plain",
        className: BC,
        isDisabled: t,
        ...e,
        children: (0, VC.jsxs)(Qb, {
          children: [(0, VC.jsx)(CC, {}), (0, VC.jsx)(wC, {})],
        }),
      }),
      ({ closePopover: t }) => (0, VC.jsx)(bC.Container, {
        children: "function" == typeof e ? e({ onMenuClose: t }) : e,
      }),
    ],
  });
}
export function DC({ children: e, isActive: t, className: n }) {
  return (0, VC.jsx)("ul", {
    className: (0, jC.default)(_C, n, { [EC]: t }),
    children: e,
  });
}
((xC = DC || (DC = {})).HeaderButton = (0, SC.forwardRef)(FC)),
  (xC.HeaderLink = (0, SC.forwardRef)(IC)),
  (xC.HeaderIcon = HC),
  (xC.ItemButton = (0, SC.forwardRef)(NC)),
  (xC.ItemLink = (0, SC.forwardRef)(UC)),
  (xC.Menu = $C),
  (xC.MenuItem = zC);
export var xC;
export var bx = 0;
export var yx = () => `UBQ__popover-content-group-${(bx += 1)}`;

