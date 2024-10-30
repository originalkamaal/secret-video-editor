import { Ey } from "./working";
import { reactJsx1 } from "./reacts";

export function CompTooltip({ showTooltip: e = false, ...t }) {
  return e ? (0, reactJsx1.jsx)(Ey, { ...t }) : t.children;
}
