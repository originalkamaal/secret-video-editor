import { CompCustomButton } from "./CompCustomButton";
import { Yw, HI } from "./working";
import { Yoe } from "./reacts";
import React from "react";

export class ContextWrapper11 extends React.Component {
  constructor(e) {
    super(e), (this.state = { error: undefined });
  }
  static getDerivedStateFromError(e) {
    return { error: e };
  }
  render() {
    const { children: e, t: t, engineError: n } = this.props,
      { error: s } = this.state,
      i = t("common.reloadPage"),
      o = t("error.generic"),
      r = t("error.generic.description");
    return !(!s && !n)
      ? (0, Yoe.jsxs)(Yw, {
          show: true,
          "aria-label": t("error.generic.description"),
          type: "error",
          footer: (0, Yoe.jsx)(Yw.Footer, {
            children: (0, Yoe.jsx)(CompCustomButton, {
              color: "accent",
              name: "role-dialog-button-cancel",
              "aria-label": i,
              onClick: () => {
                window.location.reload();
              },
              children: i,
            }),
          }),
          children: [
            (0, Yoe.jsx)(HI, { level: 3, children: o }),
            (0, Yoe.jsx)("p", { children: r }),
          ],
        })
      : e;
  }
}
