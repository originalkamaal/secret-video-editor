import { bI } from "./reacts";


export var ShortcutScopeContext = (0, bI.createContext)(null);
export function useShortcutScope() {
  const e = (0, bI.useContext)(ShortcutScopeContext);
  if (!e)
    throw new Error("useShortcutScope must be used within a ShortcutScope");
  return e;
}
