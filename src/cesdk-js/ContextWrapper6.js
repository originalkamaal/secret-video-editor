import { WL, zL } from "./working";

export function ContextWrapper6({ i18n: e, defaultNS: t, children: n }) {
  const s = (0, WL.useMemo)(() => ({ i18n: e, defaultNS: t }), [e, t]);
  return (0, WL.createElement)(zL.Provider, { value: s }, n);
}
