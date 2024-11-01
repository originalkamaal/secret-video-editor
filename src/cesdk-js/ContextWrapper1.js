import {
  possibleHook3,
  dI,
  tre,
  pI,
  tk,
  hx,
  Uoe,
  Qoe,
  SomeKindOfErrorComponent,
  ContextWrapper15Memo,
} from "./working";
import { WF } from "./reacts";
import { nre } from "./reacts";
import { ContextWrapper14 } from "./ContextWrapper14";
import { ContextWrapper13 } from "./ContextWrapper13";
import { ContextWrapper12 } from "./ContextWrapper12";
import { ContextWrapper9 } from "./ContextWrapper9";
import { ContextWrapper10 } from "./ContextWrapper10";
import { ContextWrapper7 } from "./ContextWrapper7";
import { SizeProvider } from "./ContextWrapper2";
import { ContextWrapper3 } from "./ContextWrapper3";

export function RootOfEditor({
  cesdk: e,
  facade: t,
  initError: n,
  i18n: s,
  config: i,
  internalRenderTarget: o,
  configuredRenderTarget: r,
  configurationStore: a,
  userInterfaceStore: l,
  engineStore: c,
}) {
  const [u] = possibleHook3(t?.channels.scene.ready, false),
    d = dI(),
    p = !u || "pending" === d.state;
  return (0, nre.jsx)(SizeProvider, {
    className: tre.globalContainerQuery,
    containerName: "embedViewport",
    children: (0, nre.jsx)(ContextWrapper3, {
      client: pI,
      children: (0, nre.jsx)(tk.Provider, {
        children: (0, nre.jsx)(hx.Container, {
          children: (0, nre.jsx)(WF.Provider, {
            value: i,
            children: (0, nre.jsx)(Uoe, {
              i18n: s,
              configurationStore: a,
              internalRenderTarget: o,
              children: (0, nre.jsx)(ContextWrapper7, {
                configurationStore: a,
                userInterfaceStore: l,
                engineStore: c,
                children: (0, nre.jsx)(Qoe, {
                  configurationStore: a,
                  config: i,
                  internalRenderTarget: o,
                  configuredRenderTarget: r,
                  facade: t,
                  children: (0, nre.jsx)(ContextWrapper9, {
                    children: (0, nre.jsx)(ContextWrapper10, {
                      facade: t,
                      children: p
                        ? (0, nre.jsx)(SomeKindOfErrorComponent, { error: n })
                        : (0, nre.jsx)(ContextWrapper12, {
                            children: (0, nre.jsx)(ContextWrapper13, {
                              context: { cesdk: e, facade: t, container: o },
                              children: (0, nre.jsx)(ContextWrapper14, {
                                children: (0, nre.jsx)(ContextWrapper15Memo, {
                                  videoExportSupportState: d,
                                  editorContainer: o,
                                }),
                              }),
                            }),
                          }),
                    }),
                  }),
                }),
              }),
            }),
          }),
        }),
      }),
    }),
  });
}
