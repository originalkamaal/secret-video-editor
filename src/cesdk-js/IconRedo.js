import { cloneWithPrototypeAndProperties } from "@/cesdk-common/others/createLazyModule";
import { react, reactJsxRuntime } from "@/cesdk-common/react";
export var $le =
  (cloneWithPrototypeAndProperties(react()),
  cloneWithPrototypeAndProperties(reactJsxRuntime()));

export var IconRedo = (e) =>
  (0, $le.jsx)("svg", {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    ...e,
    children: (0, $le.jsx)("path", {
      d: "M22.0001 8V16H14.0001V14H18.3744C18.0961 13.5909 17.7753 13.2016 17.4117 12.838C14.2944 9.72069 9.2402 9.72069 6.12286 12.838C5.34176 13.6191 4.75803 14.5192 4.36907 15.4785L2.05225 14.5392C2.56466 13.2753 3.33314 12.0922 4.35509 11.0703C8.44874 6.97661 15.0859 6.97661 19.1795 11.0703C19.4741 11.3649 19.7477 11.6729 20.0001 11.9924V8H22.0001Z",
      fill: "currentColor",
    }),
  });