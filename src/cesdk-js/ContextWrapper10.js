import { ZL, aV } from "./working";
import { Koe, Yoe } from "./reacts";
import { ContextWrapper11 } from "./ContextWrapper11";

export var ContextWrapper10 = function ({
  initError: e, facade: t, children: n,
}) {
  const [s, i] = (0, Koe.useState)(), { t: o } = ZL();
  return (
    (0, Koe.useEffect)(() => {
      if (!t) return aV;
      return t.addErrorCallbackListener((e) => {
        i(e);
      });
    }, [t]),
    (0, Yoe.jsx)(ContextWrapper11, { t: o, engineError: s ?? e, children: n })
  );
};
