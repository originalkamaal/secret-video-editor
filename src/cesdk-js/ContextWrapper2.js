import { x_, rv, context7, b_ } from "./working";

export var ContextWrapper2 = function ({
  className: e, children: t, containerName: n,
}) {
  const s = (0, x_.useRef)(null), [i, o] = (0, x_.useState)(0), [r, a] = (0, x_.useState)(0);
  (0, x_.useEffect)(() => {
    if (s.current) {
      const { width: e, height: t } = s.current.getBoundingClientRect();
      o(t), a(e);
    }
  }, []),
    rv(s.current, (e) => {
      const { width: t, height: n } = e;
      a(t), o(n);
    });
  const l = (0, x_.useContext)(context7), c = (0, x_.useMemo)(
    () => ({ ...l, [n ?? "default"]: { width: r, height: i } }),
    [r, i, n, l]
  ), u = {
    [`--ubq_internal-containerquery-${n ? `${n}-` : ""}width`]: `${r}px`,
    [`--ubq_internal-containerquery-${n ? `${n}-` : ""}height`]: `${i}px`,
  };
  return (0, b_.jsx)(context7.Provider, {
    value: c,
    children: (0, b_.jsx)("div", {
      ref: s,
      className: e,
      style: u,
      children: t,
    }),
  });
};
