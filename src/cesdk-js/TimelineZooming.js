import { CompButtonGroup } from "./CompButtonGroup";
import { CompCustomButton } from "./CompCustomButton";
import { X3, HZ } from "./icons/Icons";
import { u7 } from "./reacts";
import { ZL, c7, Sv, Ly } from "./working";

export function TimelineZooming({ zoomIn: e, zoomOut: t, zoomToFit: n }) {
  const { t: s } = ZL();
  return (0, u7.jsxs)("div", {
    className: c7.zoomControls,
    children: [
      (0, u7.jsx)(Sv, { children: s("component.timeline.scale.label") }),
      (0, u7.jsxs)(CompButtonGroup, {
        children: [
          (0, u7.jsx)(Ly, {
            label: s("component.timeline.scale.down"),
            children: (0, u7.jsx)(CompCustomButton, {
              name: "timeline-scale-down",
              "aria-label": s("component.timeline.scale.down.description"),
              onClick: t,
              children: (0, u7.jsx)(X3, {}),
            }),
          }),
          (0, u7.jsx)(Ly, {
            label: s("component.timeline.scale.up"),
            children: (0, u7.jsx)(CompCustomButton, {
              name: "timeline-scale-up",
              "aria-label": s("component.timeline.scale.up.description"),
              onClick: e,
              children: (0, u7.jsx)(HZ, {}),
            }),
          }),
        ],
      }),
      (0, u7.jsx)(CompCustomButton, {
        name: "timeline-scale-fit",
        "aria-label": s("component.timeline.scale.fit.description"),
        onClick: n,
        children: s("component.timeline.scale.fit"),
      }),
    ],
  });
}
