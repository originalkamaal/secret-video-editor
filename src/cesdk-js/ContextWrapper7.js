import { GR } from "./working";
import { QR, HR } from "./reacts";

export function ContextWrapper7({
  children: e, engineStore: t, configurationStore: n, userInterfaceStore: s,
}) {
  return (0, QR.jsx)(GR.Provider, {
    value: (0, HR.useMemo)(
      () => ({ engine: t, configuration: n, userInterface: s }),
      [t, n, s]
    ),
    children: e,
  });
}
