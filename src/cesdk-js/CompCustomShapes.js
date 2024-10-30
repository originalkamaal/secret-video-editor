import { Sd } from "./working";
import { classNames3 } from "./classnames";
import { cloneWithPrototypeAndProperties } from "../cesdk-common/others/createLazyModule";
import { reactJsxRuntime } from "../cesdk-common/react";

export var bp = "UBQ_CircularProgress-module__block--noKfW",
  yp = "UBQ_CircularProgress-module__track--kjW5M",
  vp = "UBQ_CircularProgress-module__label--FKIHb",
  wp = "UBQ_CircularProgress-module__stopGradientStart--V4nSj",
  kp = "UBQ_CircularProgress-module__stopGradientEnd--iZ2JD",
  Cp = cloneWithPrototypeAndProperties(reactJsxRuntime());
export var CompCustomShapes = function ({
  className: className,
  variant: variant = "indeterminate",
  label: label,
  value: value = 0,
  max: max = 100,
  strokeWidth: strokeWidth = 4,
  style: style,
}) {
  const a = 40,
    l = (a - strokeWidth) / 2,
    c = 2 * Math.PI * l,
    u = c / 1.5,
    d = ((max - value) / max) * c;
  return (0, Cp.jsxs)("svg", {
    className: (0, classNames3.default)(bp, className),
    role: "progressbar",
    viewBox: "0 0 40 40",
    fill: "none",
    style: style,
    children: [
      "indeterminate" === variant
        ? (0, Cp.jsx)(Sd.circle, {
            cx: 20,
            cy: 20,
            r: l,
            stroke: "currentColor",
            strokeWidth: strokeWidth,
            strokeLinecap: "round",
            strokeDasharray: `${u}, ${u}`,
            strokeDashoffset: "0",
            transform: "rotate(-90 20 20)",
            animate: {
              rotate: 360,
              strokeDasharray: [
                `${u}, ${u}`,
                `${u}, ${1.92 * u}`,
                `${u}, ${u}`,
              ],
              strokeDashoffset: [0, -1 * u, -2 * u],
            },
            transition: {
              repeat: 1 / 0,
              duration: 1.4,
              times: [0, 0.5, 1],
              type: "tween",
              ease: "linear",
            },
          })
        : (0, Cp.jsxs)(Cp.Fragment, {
            children: [
              (0, Cp.jsx)("circle", {
                className: yp,
                cx: 20,
                cy: 20,
                r: l,
                strokeWidth: strokeWidth,
                strokeLinecap: "round",
              }),
              (0, Cp.jsx)(Sd.circle, {
                cx: 20,
                cy: 20,
                r: l,
                stroke: "currentColor",
                strokeWidth: strokeWidth,
                strokeLinecap: "round",
                transform: "rotate(-90 20 20)",
                initial: { strokeDasharray: c, strokeDashoffset: d },
                animate: { strokeDasharray: c, strokeDashoffset: d },
                transition: { bounce: 0 },
              }),
              (0, Cp.jsx)("foreignObject", {
                x: "0",
                y: "0",
                width: a,
                height: a,
                children: (0, Cp.jsxs)("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: a,
                  height: a,
                  viewBox: "0 0 40 40",
                  fill: "none",
                  children: [
                    (0, Cp.jsx)("defs", {
                      children: (0, Cp.jsxs)("linearGradient", {
                        id: "gradient",
                        children: [
                          (0, Cp.jsx)("stop", {
                            className: wp,
                            offset: "0%",
                          }),
                          (0, Cp.jsx)("stop", {
                            className: kp,
                            offset: "100%",
                          }),
                        ],
                      }),
                    }),
                    (0, Cp.jsx)("path", {
                      stroke: "url(#gradient)",
                      d: `M ${a - strokeWidth / 2} 20 A ${l} ${l} 0 0 1 ${
                        strokeWidth / 2
                      } 20`,
                      strokeWidth: strokeWidth,
                      strokeLinecap: "round",
                    }),
                    (0, Cp.jsx)("animateTransform", {
                      from: "0 0 0",
                      to: "360 0 0",
                      attributeName: "transform",
                      type: "rotate",
                      repeatCount: "indefinite",
                      dur: "1300ms",
                    }),
                  ],
                }),
              }),
            ],
          }),
      label &&
        (0, Cp.jsx)("text", {
          className: vp,
          x: "50%",
          y: "50%",
          dy: ".1em",
          textAnchor: "middle",
          dominantBaseline: "middle",
          children: label,
        }),
    ],
  });
};
