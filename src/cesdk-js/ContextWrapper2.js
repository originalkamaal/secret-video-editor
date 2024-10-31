import { rv, context7 } from "./working";
import { x_, b_ } from "./reacts";

export var SizeProvider = ({
  className,
  children,
  containerName,
}) => {
  const s = (0, x_.useRef)(null),
    [i, o] = (0, x_.useState)(0),
    [r, a] = (0, x_.useState)(0);
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
  const l = (0, x_.useContext)(context7),
    c = (0, x_.useMemo)(
      () => ({ ...l, [containerName ?? "default"]: { width: r, height: i } }),
      [r, i, containerName, l]
    ),
    u = {
      [`--ubq_internal-containerquery-${
        containerName ? `${containerName}-` : ""
      }width`]: `${r}px`,
      [`--ubq_internal-containerquery-${
        containerName ? `${containerName}-` : ""
      }height`]: `${i}px`,
    };
  return (0, b_.jsx)(context7.Provider, {
    value: c,
    children: (0, b_.jsx)("div", {
      ref: s,
      className: className,
      style: u,
      children: children,
    }),
  });
};
