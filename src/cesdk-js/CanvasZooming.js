import { CompButtonGroup } from "./CompButtonGroup";
import { CompCustomButton } from "./CompCustomButton";
import { IconSearch, IconChevronDown, IconChevronUp, IconCheckmark, IconArrowUpOutline, IconPlusCircle } from "./Icons";
import { Yle, oce } from "./reacts";
import { DO, ZL, Nz, oD, possibleHook3, uD, rce, ace, pp, Xy, iL, Ly, Cx, ice, yC, cce, Sw } from "./working";

export function CanvasZooming() {
  const e = DO(), { t: t } = ZL(), n = Nz(), s = oD(), [i, o] = possibleHook3(s.camera.zoomLevel), [r] = possibleHook3(s.camera.autoFit), a = (0, Yle.useRef)(window.devicePixelRatio), l = (0, Yle.useRef)(r), c = (0, Yle.useCallback)(() => {
    const t = e.engine.scene.getCurrentPage();
    null !== t && (e.focusBlock(t), e.enableZoomAutoFit(t));
  }, [e]);
  (0, Yle.useEffect)(() => {
    const e = window.devicePixelRatio;
    l && e !== a.current && c(), (l.current = r), (a.current = e);
  }, [r, c]);
  const { selectedDesignElement: u, hasMultiSelection: d } = uD(), p = (0, Yle.useRef)(null), f = i > rce, h = i < ace, m = (e, t = false) => {
    p.current && p.current.stop();
    const n = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    t && !n
      ? (p.current = pp(i, e, {
        ease: "easeOut",
        duration: 0.15,
        onUpdate(e) {
          o(e);
        },
        onStop: () => {
          p.current = null;
        },
        onComplete: () => {
          p.current = null;
        },
      }))
      : o(e);
  }, g = () => {
    const e = Math.round(100 * i) / 100;
    for (let t = rce; t <= ace; t *= 2) {
      if ((t - e) / t >= 0.3) {
        m(t, true);
        break;
      }
    }
  }, x = () => {
    const e = Math.round(100 * i) / 100;
    for (let t = ace; t >= rce; t /= 2) {
      if ((e - t) / e >= 0.3) {
        m(t, true);
        break;
      }
    }
  }, b = `${Math.round(100 * i)}%`, y = t("component.zoom.out"), v = t("component.zoom.in"), w = t("component.zoom.options"), k = {
    "shift+2": () => {
      m(1);
    },
    "+": () => {
      g();
    },
    "-": () => {
      x();
    },
  };
  Xy(Object.keys(k), (e, t) => {
    k[t]();
  });
  const { width: C } = iL("embedViewport"), j = 0 !== C && C >= 480;
  return (0, oce.jsxs)(CompButtonGroup, {
    dataCy: "zoom-controls",
    children: [
      j &&
      (0, oce.jsx)(Ly, {
        label: y,
        children: (0, oce.jsx)(CompCustomButton, {
          "aria-label": y,
          name: "zoom-out",
          onClick: x,
          isDisabled: !f,
          children: (0, oce.jsx)(IconSearch, {}),
        }),
      }),
      (0, oce.jsxs)(Cx, {
        children: [
          (e, { isOpen: n }) => (0, oce.jsx)(Ly, {
            label: w,
            children: (0, oce.jsxs)(CompCustomButton, {
              name: "zoomOptions",
              className: ice.label,
              "aria-label": w,
              ...e,
              children: [
                r ? t("component.zoom.label.auto") : b,
                n ? (0, oce.jsx)(IconChevronDown, {}) : (0, oce.jsx)(IconChevronUp, {}),
              ],
            }),
          }),
          ({ closePopover: s }) => (0, oce.jsxs)(yC.Container, {
            className: ice.optionsMenu,
            "aria-label": t("component.placeholder.settingsMenu"),
            children: [
              (0, oce.jsx)(yC.ItemCheckbox, {
                checked: r,
                children: (0, oce.jsxs)(cce, {
                  label: t("component.zoom.autoFit"),
                  onZoomChange: async () => {
                    c(), s();
                  },
                  children: [
                    r ? (0, oce.jsx)(IconCheckmark, { className: ice.checkIcon }) : null,
                    t("component.zoom.autoFit"),
                  ],
                }),
              }),
              (0, oce.jsx)(Sw, {}),
              (0, oce.jsx)(yC.Item, {
                children: (0, oce.jsx)(cce, {
                  label: t("component.zoom.fitPage"),
                  onZoomChange: async () => {
                    const t = e.engine.scene.getCurrentPage();
                    null != t && e.focusBlock(t), s();
                  },
                }),
              }),
              (0, oce.jsx)(yC.Item, {
                children: (0, oce.jsx)(cce, {
                  label: t("component.zoom.fitSelection"),
                  onZoomChange: () => {
                    u && (e.focusBlock(u.id), s());
                  },
                  isDisabled: !u || d,
                }),
              }),
              (0, oce.jsx)(Sw, {}),
              (0, oce.jsx)(yC.Item, {
                children: (0, oce.jsx)(cce, {
                  label: t("component.zoom.to", { percentage: 200 }),
                  onZoomChange: () => {
                    m(2), s();
                  },
                }),
              }),
              (0, oce.jsx)(yC.Item, {
                children: (0, oce.jsxs)(cce, {
                  label: t("component.zoom.to", { percentage: 100 }),
                  onZoomChange: () => {
                    m(1), s();
                  },
                  shortcut: "shift+2",
                  shortcutLabel: t("component.zoom.shortcut", {
                    shortcut: "shift+2",
                  }),
                  children: [
                    t("component.zoom.to", { percentage: 100 }),
                    !n &&
                    (0, oce.jsxs)("span", {
                      className: ice.shortcutContainer,
                      children: [(0, oce.jsx)(IconArrowUpOutline, {}), "2"],
                    }),
                  ],
                }),
              }),
              (0, oce.jsx)(yC.Item, {
                children: (0, oce.jsx)(cce, {
                  label: t("component.zoom.to", { percentage: 50 }),
                  onZoomChange: () => {
                    m(0.5), s();
                  },
                }),
              }),
              (0, oce.jsx)(Sw, {}),
              (0, oce.jsx)(yC.Item, {
                children: (0, oce.jsxs)(cce, {
                  label: t("component.zoom.in"),
                  onZoomChange: () => {
                    g(), s();
                  },
                  shortcut: "+",
                  shortcutLabel: t("component.zoom.shortcut", {
                    shortcut: "+",
                  }),
                  isDisabled: !h,
                  children: [
                    t("component.zoom.in"),
                    !n &&
                    (0, oce.jsx)("span", {
                      className: ice.shortcutContainer,
                      children: "+",
                    }),
                  ],
                }),
              }),
              (0, oce.jsx)(yC.Item, {
                children: (0, oce.jsxs)(cce, {
                  label: t("component.zoom.out"),
                  onZoomChange: () => {
                    x(), s();
                  },
                  shortcut: "-",
                  shortcutLabel: t("component.zoom.shortcut", {
                    shortcut: "-",
                  }),
                  isDisabled: !f,
                  children: [
                    t("component.zoom.out"),
                    !n &&
                    (0, oce.jsx)("span", {
                      className: ice.shortcutContainer,
                      children: "-",
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
      j &&
      (0, oce.jsx)(Ly, {
        label: v,
        children: (0, oce.jsx)(CompCustomButton, {
          "aria-label": v,
          name: "zoom-in",
          onClick: g,
          isDisabled: !h,
          children: (0, oce.jsx)(IconPlusCircle, {}),
        }),
      }),
    ],
  });
}
