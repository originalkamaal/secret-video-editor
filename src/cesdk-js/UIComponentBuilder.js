import { cloneWithPrototypeAndProperties } from "@/cesdk-common/others/createLazyModule";
import { reactJsxRuntime } from "@/cesdk-common/react";
import {  f$, Cx, Sw, Kz } from "./working";
import { m$ } from "./vh";
import { pb } from "./Icons";
import { ub } from "./Icons";
import { h$ } from "./reacts";
import { CompButtonGroup } from "./CompButtonGroup";
import { CompCustomButton } from "./CompCustomButton";
import { CompTooltip } from "./CompTooltip";

export var reactJsx1 = cloneWithPrototypeAndProperties(reactJsxRuntime());
export var reactJsx2 = cloneWithPrototypeAndProperties(reactJsxRuntime());
export var reactJsx3 = cloneWithPrototypeAndProperties(reactJsxRuntime());
export var componentBuilderWarnings = new Set();

export class UIComponentBuilder {
  #name;
  #elementIds = [];
  #elements = [];
  translator;
  nestingStack = [];
  engine;
  context;
  constructor(name, elements, translator, context, engine) {
    (this.#name = name),
      (this.#elements = elements),
      (this.context = context),
      (this.engine = engine),
      (this.translator = translator);
  }
  _push = (e) => {
    -1 === this.#elementIds.indexOf(e.id)
      ? (this.#elements.push(e), this.#elementIds.push(e.id))
      : console.warn(
          `Id '${e.id}' was already used in this builder. Skipping this element. Please use unique ids for every UI element in a component.`
        );
  };
  get _currentNesting() {
    return this.nestingStack[this.nestingStack.length - 1];
  }
  get name() {
    return this.#name;
  }
  _translateLabel = (e) =>
    null != e ? this.translator(e, { defaultValue: e }) : undefined;
  _printWarning = (e, t) => {
    const n = `${this.context.componentId}/${this.#name}/${e}`;
    componentBuilderWarnings.has(n) ||
      (componentBuilderWarnings.add(n), console.warn(t));
  };
  _printUnsupportedWarning = (e) => {
    this._printWarning(
      e,
      `'${e}' is not supported in '${
        this.#name
      }' yet but is used in the registered component '${
        this.context.componentId
      }'. Please remove this call.`
    );
  };
  _pushChildren = (e, t) => {
    let n = [];
    if (null != t) {
      const s = this.#elements;
      (this.#elements = []),
        this.nestingStack.push(e),
        t(),
        this.nestingStack.pop(),
        (n = this.#elements),
        (this.#elements = s);
    }
    return n;
  };
  toString() {
    return this.#name;
  }
  Button = (e, { label: t, tooltip: n, onClick: s, icon: i, ...o }) => {
    const r = this._translateLabel(t),
      a = this._translateLabel(n),
      l = "ButtonGroup" === this._currentNesting;
    this._push({
      id: e,
      type: "Button",
      focusable: !o.isDisabled,
      node: (0, reactJsx3.jsx)(CompTooltip, {
        showTooltip: null != a,
        label: a ?? "",
        children: (0, reactJsx3.jsx)(CompCustomButton, {
          name: `${this.#name}-Button-${e}`,
          onClick: s,
          variant: o.variant ?? (l ? "regular" : "plain"),
          color: o.color,
          size: o.size,
          isActive: o.isActive,
          isSelected: o.isSelected,
          isDisabled: o.isDisabled,
          isLoading: o.isLoading,
          loadingProgress: o.loadingProgress,
          icon:
            null != i
              ? (0, reactJsx3.jsx)(f$, { iconSize: "normal", customIcon: i })
              : undefined,
          children: r,
        }),
      }),
    });
  };
  ButtonGroup = (e, { children: t }) => {
    const n = this._pushChildren("ButtonGroup", t).filter(
        (e) =>
          !!["Button", "Dropdown", "Select"].includes(e.type) ||
          (this._printWarning(
            `unsupportedChild/${e.type}`,
            `Unsupported child type '${e.type}' in ButtonGroup`
          ),
          false)
      ),
      s = !n.some(({ focusable: e }) => e);
    this._push({
      id: e,
      type: "ButtonGroup",
      focusable: s,
      node: (0, reactJsx3.jsx)(CompButtonGroup, {
        orientation: this.context.orientation,
        children: n.map(({ id: e, node: t }) =>
          (0, reactJsx3.jsx)(h$.Fragment, { children: t }, e)
        ),
      }),
    });
  };
  Checkbox = (e, t) => {
    this._printUnsupportedWarning("Checkbox");
  };
  Dropdown = (e, { label: t, tooltip: n, icon: s, children: i, ...o }) => {
    const r = this._translateLabel(t),
      a = this._translateLabel(n);
    let l = () => {};
    const c = {
        close: () => {
          l();
        },
      },
      u = this._pushChildren("Dropdown", i ? () => i(c) : undefined),
      d = !u.some(({ focusable: e }) => e),
      p = "ButtonGroup" === this._currentNesting;
    this._push({
      id: e,
      type: "Dropdown",
      focusable: !o.isDisabled,
      node: (0, reactJsx3.jsxs)(Cx, {
        placement: "bottom",
        disableFocusTrap: d,
        children: [
          (t, { isOpen: n }) =>
            (0, reactJsx3.jsx)(CompTooltip, {
              showTooltip: null != a,
              label: a ?? "",
              children: (0, reactJsx3.jsxs)(CompCustomButton, {
                name: `${this.name}-Dropdown-${e}`,
                variant: o.variant ?? (p ? "regular" : "plain"),
                color: o.color,
                size: o.size,
                isLoading: o.isLoading,
                loadingProgress: o.loadingProgress,
                ...t,
                isDisabled: 0 === u.length || o.isDisabled,
                icon:
                  null != s
                    ? (0, reactJsx3.jsx)(f$, { iconSize: "normal", customIcon: s })
                    : undefined,
                children: [r, n ? (0, reactJsx3.jsx)(pb, {}) : (0, reactJsx3.jsx)(ub, {})],
              }),
            }),
          ({ closePopover: t }) => (
            (l = t),
            (0, reactJsx3.jsx)("ul", {
              className: m$,
              children: u.map(({ id: t, node: n, type: s }) =>
                "Separator" === s
                  ? (0, reactJsx3.jsx)(h$.Fragment, { children: n }, e)
                  : (0, reactJsx3.jsx)("li", { children: n }, t)
              ),
            })
          ),
        ],
      }),
    });
  };
  MediaPreview = (e, t) => {
    this._printUnsupportedWarning("MediaPreview");
  };
  Section = (e, t) => {
    this._printUnsupportedWarning("Section");
  };
  Separator = (e) => {
    const t = "Dropdown" === this._currentNesting ? "horizontal" : "vertical";
    this._push({
      id: e,
      type: "Separator",
      focusable: false,
      node: (0, reactJsx3.jsx)(Sw, { orientation: t }),
    });
  };
  TextArea = (e, t) => {
    this._printUnsupportedWarning("TextArea");
  };
  TextInput = (e, t) => {
    this._printUnsupportedWarning("TextInput");
  };
  NumberInput = (e, t) => {
    this._printUnsupportedWarning("NumberInput");
  };
  ColorInput = (e, t) => {
    this._printUnsupportedWarning("ColorInput");
  };
  Slider = (e, t) => {
    this._printUnsupportedWarning("Slider");
  };
  Library = (e, t) => {
    this._printUnsupportedWarning("Library");
  };
  Heading = (e, t) => {
    this._printUnsupportedWarning("Heading");
  };
  Text = (e, t) => {
    this._printUnsupportedWarning("Text");
  };
  Select = (e, t) => {
    this._printUnsupportedWarning("Select");
  };
}
export class CanvasMenuBuilder extends UIComponentBuilder {
  constructor(e, t, n, s) {
    super("CanvasMenuBuilder", e, t, n, s);
  }
  Button = (e, { label: t, tooltip: n, onClick: s, icon: i, ...o }) => {
    const r = this._translateLabel(t),
      a = this._translateLabel(n),
      l = "ButtonGroup" === this._currentNesting;
    this._push({
      id: e,
      type: "Button",
      focusable: !o.isDisabled,
      node: (0, reactJsx1.jsx)(CompTooltip, {
        showTooltip: null != a,
        label: a ?? "",
        children: (0, reactJsx1.jsx)(Kz, {
          "aria-label": r,
          name: `${this.name}-Button-${e}`,
          onClick: s,
          variant: o.variant ?? (l ? "regular" : "plain"),
          color: o.color,
          size: o.size,
          isActive: o.isActive,
          isSelected: o.isSelected,
          isDisabled: o.isDisabled,
          isLoading: o.isLoading,
          loadingProgress: o.loadingProgress,
          icon:
            null != i
              ? (0, reactJsx1.jsx)(f$, { iconSize: "normal", customIcon: i })
              : undefined,
          children: r,
        }),
      }),
    });
  };
}
