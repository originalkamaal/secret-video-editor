import { react14, lx, context9 } from "./reacts";
import { ax } from "./working";

export function ContextPortalContextProvider({ children: e }) {
  const [t, n] = (0, react14.useState)({}), s = ax(), i = (0, react14.useCallback)(
    (e, t) => (
      n((n) => ({ ...n, [e]: t })),
      () => {
        s.current &&
          n((t) => {
            const { ...n } = t;
            return delete n[e], n;
          });
      }
    ),
    [s]
  ), o = (0, react14.useMemo)(() => ({ portals: t, addPortal: i }), [i, t]);
  return (0, lx.jsx)(context9.Provider, { value: o, children: e });
}
