import { ClickOutsideEvent } from "./ClickOutsideEvent";
import { ClickOutsideContext } from "./ClickOutsideContextProvider";
import { tx } from "./reacts";
import { ex } from "./reacts";

export function ContextWrapper9({ children: e }) {
  const t = (0, ex.useRef)([]), n = (0, ex.useCallback)(function (e) {
    return (
      t.current.push(e),
      () => {
        const n = t.current.indexOf(e);
        n >= 0 && t.current.splice(n, 1);
      }
    );
  }, []);
  return (
    (0, ex.useEffect)(() => {
      const e = (e) => {
        const n = e?.composedPath()[0];
        t.current.forEach((e) => e(new ClickOutsideEvent(n)));
      };
      window.addEventListener("mousedown", e, { passive: true }),
        window.addEventListener("touchstart", e, { passive: true });
      const n = t.current;
      return () => {
        window.removeEventListener("touchstart", e),
          window.removeEventListener("mousedown", e),
          (n.length = 0);
      };
    }, []),
    (0, tx.jsx)(ClickOutsideContext.Provider, { value: n, children: e })
  );
}
