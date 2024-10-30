import { react11, react12, Xg } from "./reacts";

export function ClickOutsideContextProvider({
  onClickOutside: e, children: t,
}) {
  const n = (0, react12.useRef)([]), s = (0, react12.useContext)(ClickOutsideContext), i = (0, react12.useRef)(e);
  i.current = e;
  const o = (0, react12.useCallback)(
    (e) => (
      n.current.push(e),
      () => {
        const t = n.current.indexOf(e);
        t >= 0 && n.current.splice(t, 1);
      }
    ),
    []
  );
  return (
    (0, react12.useEffect)(
      () => s((e) => {
        if (n.current.length > 0) {
          let t = true;
          if ((n.current.forEach((n) => {
            const s = e.clone();
            n(s), s.propagationStopped || (t = false);
          }),
            t))
            return void e.stopPropagation();
        }
        i.current?.(e);
      }),
      [s]
    ),
    (0, Xg.jsx)(ClickOutsideContext.Provider, { value: o, children: t })
  );
}export var ClickOutsideContext = (0, react11.createContext)(
  () => (
    console.warn(
      "Adding ClickOutside handler to dummy context value. Did you forget to install the ClickOutsideManager at the top of your app?"
    ),
    () => { }
  )
);
ClickOutsideContext.displayName = "ClickOutsideContext";

