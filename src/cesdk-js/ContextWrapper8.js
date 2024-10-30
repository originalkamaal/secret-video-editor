import { Kp, wh, Wp, kh } from "./reacts";
import { vh } from "./vh";
import { gh } from "./working";
import { yh } from "./vh";


export function ContextWrapper8({
  children: e, theme: t = "light", scale: n = "normal", className: s, contextContainer: i, renderTarget: o, assetPath: r, disableFontInsertion: a,
}) {
  (0, Kp.useLayoutEffect)(() => {
    const e = `ubq-${t}`, s = `ubq-${n}`;
    let r;
    const a = document.querySelector(`.${gh}`);
    return (
      o &&
      (o.classList.remove("ubq-light"),
        o.classList.remove("ubq-dark"),
        o.classList.add(e),
        o.classList.add("ubq-static"),
        o.classList.remove("ubq-normal"),
        o.classList.remove("ubq-large"),
        o.classList.add(s),
        a instanceof HTMLElement &&
        ((a.dataset.ubqTheme = t), (a.dataset.ubqScale = n))),
      i &&
      (i.classList.add(vh),
        (r = window.setTimeout(() => {
          i.classList.remove(vh);
        }, 300))),
      () => {
        clearTimeout(r);
      }
    );
  }, [t, n, o, i]),
    (0, Kp.useEffect)(
      function () {
        if (a) return () => { };
        const e = `${r}fonts/`, t = document.createElement("style");
        t.innerHTML = `\n      @font-face {\n        font-family: 'Inter';\n        src: url('${e}Inter-Regular.woff2') format('woff2'),\n          url('${e}Inter-Regular.woff') format('woff');\n        font-weight: normal;\n      }\n\n      @font-face {\n        font-family: 'Inter';\n        src: url('${e}Inter-Medium.woff2') format('woff2'),\n          url('${e}Inter-Medium.woff') format('woff');\n        font-weight: 500;\n      }\n\n      @font-face {\n        font-family: 'Inter';\n        src: url('${e}Inter-Bold.woff2') format('woff2'),\n          url('${e}Inter-Bold.woff') format('woff');\n        font-weight: 600;\n      }\n    `;
        const n = document.querySelector("head");
        return (
          n && n.appendChild(t),
          function () {
            t.remove();
          }
        );
      },
      [r, a]
    );
  const l = (0, Kp.useMemo)(
    () => ({ theme: t, scale: n, container: i }),
    [i, n, t]
  );
  return (0, wh.jsx)("div", {
    className: (0, Wp.default)(yh, s),
    children: (0, wh.jsx)(kh.Provider, { value: l, children: e }),
  });
}
(ContextWrapper8 || (ContextWrapper8 = {})).Context = kh;
