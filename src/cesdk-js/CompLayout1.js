import { classnames } from "@/cesdk-common/classnames";
import { cloneWithPrototypeAndProperties } from "@/cesdk-common/others/createLazyModule";
import { react, reactJsxRuntime } from "@/cesdk-common/react";

export var Gh = "UBQ_SegmentedGroup-module__equalWidth--DahgE";
export var Qh = "UBQ_SegmentedGroup-module__block--UUGgu";
export var Zh = cloneWithPrototypeAndProperties(reactJsxRuntime());
export var qh = cloneWithPrototypeAndProperties(react());
export var CompLayout1 = (0, qh.forwardRef)(function (
  {
    children: e,
    className: t,
    dataCy: n,
    equalWidth: s,
    orientation: i = "horizontal",
  },
  o
) {
  return (0, Zh.jsx)("div", {
    ref: o,
    className: (0, $h.default)(Qh, t, { [Gh]: s }),
    "aria-orientation": i,
    "data-cy": n,
    children: e,
  });
});
export var $h = cloneWithPrototypeAndProperties(classnames());

