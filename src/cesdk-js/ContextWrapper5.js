import { context9, lx } from "./working";
import { react14 } from "./reacts";

export function ContextWrapper5({ layer: e = "default", children: t, className: n }) {
  const s = (0, react14.useRef)(null), { addPortal: i } = (0, react14.useContext)(context9);
  return (
    (0, react14.useEffect)(
      () => (s.current ? i(e, s.current) : () => null),
      [s.current]
    ),
    (0, lx.jsxs)(lx.Fragment, {
      children: [
        t,
        (0, lx.jsx)("div", {
          id: `ubq-portal-container_${e}`,
          ref: s,
          className: n,
        }),
      ],
    })
  );
}
