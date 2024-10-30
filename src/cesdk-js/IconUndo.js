import { cloneWithPrototypeAndProperties } from "@/cesdk-common/others/createLazyModule";
import { react, reactJsxRuntime } from "@/cesdk-common/react";
export var Qle =
  (cloneWithPrototypeAndProperties(react()),
  cloneWithPrototypeAndProperties(reactJsxRuntime()));

export var IconUndo = (e) =>
  (0, Qle.jsx)("svg", {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    ...e,
    children: (0, Qle.jsx)("path", {
      d: "M1.99951 8V16H9.99951V14H5.6252C5.90351 13.5909 6.22432 13.2016 6.58788 12.838C9.70521 9.72069 14.7594 9.72069 17.8768 12.838C18.6579 13.6191 19.2416 14.5192 19.6305 15.4785L21.9474 14.5392C21.435 13.2753 20.6665 12.0922 19.6445 11.0703C15.5509 6.97661 8.91376 6.97661 4.82011 11.0703C4.52549 11.3649 4.25194 11.6729 3.99951 11.9924V8H1.99951Z",
      fill: "currentColor",
    }),
  });
