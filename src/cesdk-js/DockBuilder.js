import { CompDynamicIcon } from "./CompDynamicIcon";
import { CompTooltip } from "./CompTooltip";
import { UIComponentBuilder } from "./UIComponentBuilder";
import { Fq, mq, yj } from "./working";

export var DockBuilder = class extends UIComponentBuilder {
  constructor(e, t, n, s) {
    super("DockBuilder", e, t, n, s);
  }
  Separator = (e) => {
    this._push({
      id: e,
      type: "Separator",
      focusable: false,
      node: (0, Fq.jsx)(mq, {}),
    });
  };
  Button = (e, { label: t, tooltip: n, onClick: s, icon: i, ...o }) => {
    const r = this._translateLabel(t), a = this._translateLabel(n), l = null != i &&
      "string" == typeof i &&
      [
        "@imgly/Audio",
        "@imgly/CustomLibrary",
        "@imgly/Image",
        "@imgly/Library",
        "@imgly/Shapes",
        "@imgly/Sticker",
        "@imgly/Template",
        "@imgly/Text",
        "@imgly/Upload",
        "@imgly/Video",
      ].includes(i)
      ? i
      : undefined, c = "ButtonGroup" === this._currentNesting;
    this._push({
      id: e,
      type: "Button",
      focusable: !o.isDisabled,
      node: (0, Fq.jsx)(CompTooltip, {
        showTooltip: null != a,
        label: a ?? "",
        children: (0, Fq.jsx)(yj.Button, {
          "aria-label": this.context.hideLabels ? r : undefined,
          name: `${this.name}-Button-${e}`,
          onClick: s,
          icon: (0, Fq.jsx)(CompDynamicIcon, {
            id: l,
            customIcon: null == l ? i : undefined,
            iconSize: this.context.iconSize,
          }),
          variant: o.variant ?? (c ? "regular" : "plain"),
          color: o.color,
          size: o.size,
          isActive: o.isActive,
          isSelected: o.isSelected,
          isDisabled: o.isDisabled,
          isLoading: o.isLoading,
          loadingProgress: o.loadingProgress,
          children: !this.context.hideLabels && r,
        }),
      }),
    });
  };
  Dropdown = () => {
    this._printUnsupportedWarning("Dropdown");
  };
};
