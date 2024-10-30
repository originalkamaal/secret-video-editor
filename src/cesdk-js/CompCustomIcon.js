import { cloneWithPrototypeAndProperties } from "../cesdk-common/others/createLazyModule";
import { reactJsxRuntime } from "../cesdk-common/react";
import { classnames } from "../cesdk-common/classnames";

export var Sp = cloneWithPrototypeAndProperties(classnames()),
  _p = "UBQ_Icon-module__block--xwdR3",
  Ep = "UBQ_Icon-module__normal--nLp7i",
  Lp = "UBQ_Icon-module__large--ntKxk",
  Pp = cloneWithPrototypeAndProperties(reactJsxRuntime());
export const classNames2 = cloneWithPrototypeAndProperties(classnames());
export var CompCustomIcon = function ({
  icon: e,
  iconSize: t = "normal",
  width: n,
  height: s,
  style: i,
  className: o,
}) {
  if (!e) return null;
  const r = "normal" === t ? 16 : 24;
  return (0, Pp.jsx)("svg", {
    viewBox: `0 0 ${n ?? r} ${s ?? r}`,
    width: n ?? r,
    height: s ?? r,
    style: i,
    className: (0, Sp.default)(_p, o, {
      [Lp]: "large" === t,
      [Ep]: "normal" === t,
    }),
    "aria-hidden": "true",
    children: (0, Pp.jsx)("use", {
      href: `#${e}`,
      width: n ?? r,
      height: s ?? r,
    }),
  });
};
export const reactJsx = cloneWithPrototypeAndProperties(reactJsxRuntime());
