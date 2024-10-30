import { CompLayout1 } from "./CompLayout1";
import { cloneWithPrototypeAndProperties } from "@/cesdk-common/others/createLazyModule";
import { reactJsxRuntime } from "@/cesdk-common/react";
import { classnames } from "@/cesdk-common/classnames";

export var Px = "UBQ_ButtonGroup-module__block--S7piL";
export var Lx = cloneWithPrototypeAndProperties(classnames());
export var Ax = cloneWithPrototypeAndProperties(reactJsxRuntime());
export var CompButtonGroup = function ({
  children: e, className: t, orientation: n, dataCy: s,
}) {
  return (0, Ax.jsx)(CompLayout1, {
    className: (0, Lx.default)(Px, t),
    orientation: n,
    dataCy: s,
    children: e,
  });
};

