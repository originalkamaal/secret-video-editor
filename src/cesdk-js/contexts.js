import { cloneWithPrototypeAndProperties } from "@/cesdk-common/others/createLazyModule";
import { react } from "@/cesdk-common/react";


export var pagePointContext = (0,
  cloneWithPrototypeAndProperties(react(), 1).createContext)({
    transformPagePoint: (e) => e,
    isStatic: false,
    reducedMotion: "never",
  });
