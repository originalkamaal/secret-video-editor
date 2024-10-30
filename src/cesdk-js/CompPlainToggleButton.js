import { CompCustomButton } from "./CompCustomButton";
import { classNamePlainToggleButton } from "./working";
import { cloneWithPrototypeAndProperties } from "@/cesdk-common/others/createLazyModule";
import { classnames } from "@/cesdk-common/classnames";
import { react } from "@/cesdk-common/react";
import { reactJsxRuntime } from "@/cesdk-common/react";

export var classNames1 = cloneWithPrototypeAndProperties(classnames());
export var react1 = cloneWithPrototypeAndProperties(react());
export var reactJsx1 = cloneWithPrototypeAndProperties(reactJsxRuntime());
export var CompPlainToggleButton = (0, react1.forwardRef)(function (
  { children: e, className: t, ...n },
  s
) {
  return (0, reactJsx1.jsx)(CompCustomButton, {
    className: (0, classNames1.default)(classNamePlainToggleButton, t),
    variant: "plain",
    ...n,
    ref: s,
    children: e,
  });
});
