import { ShortcutScopeContext } from "./useShortcutScope";
import { wI } from "./reacts";
import { kI, CI } from "./reacts";

export function ContextWrapper14({ children: e }) {
  const t = (0, kI.useRef)(new Map()), n = (0, kI.useRef)(new Map()), s = (0, kI.useCallback)((e, n) => {
    t.current.set(e, n);
  }, []), i = (0, kI.useCallback)((e) => {
    t.current.delete(e);
  }, []), o = (0, kI.useCallback)((e) => {
    const s = t.current.get(e), i = n.current.get(e);
    if (s && i) return { element: s, callbacks: Array.from(i.values()) };
  }, []), r = (0, kI.useCallback)((e, t) => {
    const s = (0, wI.default)("shortcut_");
    return (
      n.current.get(e)
        ? n.current.get(e)?.set(s, t)
        : n.current.set(e, new Map([[s, t]])),
      s
    );
  }, []), a = (0, kI.useCallback)((e, t) => {
    n.current.get(e)?.delete(t);
  }, []), l = (0, kI.useMemo)(
    () => ({
      registerScope: s,
      unregisterScope: i,
      getScope: o,
      registerShortcut: r,
      unregisterShortcut: a,
    }),
    [o, s, r, i, a]
  );
  return (0, CI.jsx)(ShortcutScopeContext.Provider, { value: l, children: e });
}
