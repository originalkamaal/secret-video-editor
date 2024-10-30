import { BUTTON_STYLES } from "./constants/constants";
import { Vp, Dp, Rp } from "./reacts";

export var CompCustomButtonLink = ((0, Vp.forwardRef)(
  (
    {
      children: e, variant: t = "regular", size: n = "normal", "data-cy": s, ...i
    },
    o
  ) => (0, Dp.jsx)("a", {
    ref: o,
    ...i,
    className: (0, Rp.default)(
      BUTTON_STYLES.block,
      BUTTON_STYLES.link,
      BUTTON_STYLES[`ubq-variant_${t}`],
      BUTTON_STYLES[`ubq-size_${n}`],
      i.className
    ),
    "data-cy": s,
    children: (0, Dp.jsx)("span", {
      children: Vp.Children.map(e, (e) => "string" == typeof e ? (0, Dp.jsx)("span", { children: e }) : e
      ),
    }),
  })
).displayName = "uikit/ButtonLink");
