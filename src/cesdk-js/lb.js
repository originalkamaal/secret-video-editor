import { ib, rb, sb } from "./reacts";
import { ob } from "./working";


export var AnotherButtonComponent = (0, ib.forwardRef)(function (
  {
    children: e, color: t, onClick: n, name: s, "aria-label": i, className: o, isDisabled: r = false, "data-cy": a,
  },
  l
) {
  return (0, rb.jsx)("button", {
    ref: l,
    name: s,
    type: "button",
    className: (0, sb.default)(ob.block, o),
    style: { background: t },
    onClick: n,
    "aria-label": i,
    disabled: r,
    "data-cy": a,
    children: e,
  });
});
export function lb({ children: e, color: t, className: n }) {
  return (0, rb.jsx)("div", {
    className: (0, sb.default)(ob.block, n),
    style: { background: t },
    children: e,
  });
}
AnotherButtonComponent.displayName = "uikit/ColorFieldButton";
