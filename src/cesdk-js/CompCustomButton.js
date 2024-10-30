import { BUTTON_STYLES } from "./constants/constants";
import { CompCustomShapes } from "./CompCustomShapes";
import {
  reactJsx,
  classNames2,
  CompCustomIcon,
} from "./CompCustomIcon";
import { cloneWithPrototypeAndProperties } from "../cesdk-common/others/createLazyModule";
import { react } from "../cesdk-common/react";

export var react2 = cloneWithPrototypeAndProperties(react());
export const CompCustomButton = (0, react2.forwardRef)(
  (
    {
      children: children,
      icon: icon,
      variant: variant = "regular",
      color: color,
      size: size = "normal",
      isActive: isActive = false,
      activeStateStyle: activeStateStyle = "outline",
      isSelected: isSelected = false,
      isDisabled: isDisabled = false,
      isLoading: isLoading = false,
      loadingProgress: loadingProgress,
      "data-cy": dataCy,
      "data-ubq-action": dataUbqAction,
      "data-active": dataActive,
      centered: centered = false,
      ...rest
    },
    ref
  ) =>
    (0, reactJsx.jsx)("button", {
      ref: ref,
      type: "button",
      ...rest,
      "aria-pressed": isActive,
      className: (0, classNames2.default)(
        BUTTON_STYLES.block,
        BUTTON_STYLES[`ubq-size_${size}`],
        BUTTON_STYLES[`ubq-variant_${variant}`],
        rest.className,
        {
          [BUTTON_STYLES["ubq-state_active"]]:
            isActive && "none" !== activeStateStyle,
          [BUTTON_STYLES["ubq-state_active-style_outline"]]:
            "outline" === activeStateStyle,
          [BUTTON_STYLES["ubq-state_active-style_pill"]]:
            "pill" === activeStateStyle,
          [BUTTON_STYLES["ubq-state_selected"]]:
            isSelected && "none" !== activeStateStyle,
          [BUTTON_STYLES["ubq-color_accent"]]: "accent" === color,
          [BUTTON_STYLES["ubq-color_danger"]]: "danger" === color,
          [BUTTON_STYLES.centered]: centered,
        }
      ),
      disabled: rest.disabled || isDisabled || isLoading,
      "data-cy": dataCy || rest.name,
      "data-ubq-action": dataUbqAction,
      "data-loading": isLoading,
      "data-active": dataActive || isActive,
      children: (0, reactJsx.jsxs)("span", {
        children: [
          isLoading
            ? (0, reactJsx.jsx)(CompCustomShapes, {
                className: BUTTON_STYLES.spinner,
                variant:
                  null != loadingProgress ? "determinate" : "indeterminate",
                value: loadingProgress,
                strokeWidth: 2,
              })
            : "string" == typeof icon
            ? (0, reactJsx.jsx)(CompCustomIcon, { icon: icon })
            : icon,
          react2.Children.map(children, (e) =>
            "string" == typeof e
              ? (0, reactJsx.jsx)("span", { children: e })
              : e
          ),
        ],
      }),
    })
);

CompCustomButton.displayName = "uikit/Button";
