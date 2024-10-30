import { LB, _M, eT } from "../../working";
import { uM } from "@/cesdk-js/reacts";

export class UserInterfaceAPI {
  #n;
  constructor(e) {
    this.#n = e;
  }
  openPanel(e, t) {
    const { payload: n, ...s } = t ?? {};
    LB(() => {
      this.#n.setPanelState(e, { open: true, payload: n, sessionOptions: s });
    });
  }
  closePanel(e) {
    LB(() => {
      this.#n.setPanelState(e, { open: false });
    });
  }
  isPanelOpen(e, t) {
    const n = this.#n.getPanelState(e);
    if (!n) return false;
    if (false === n.open || null == n.open) return false;
    if (t) {
      if (null != t.position && this.getPanelPosition(e) !== t.position)
        return false;
      if (null != t.floating && this.getPanelFloating(e) !== t.floating)
        return false;
      if (null != t.payload && !(0, uM.default)(n.payload, t.payload))
        return false;
    }
    return true;
  }
  findAllPanels(e) {
    const t = this.#n.panels;
    return Object.keys(t).filter((n) => {
      const s = t[n];
      if (!s) return false;
      if (e) {
        if (null != e.open && s.open !== e.open) return false;
        if (null != e.position && this.getPanelPosition(n) !== e.position)
          return false;
        if (null != e.floating && this.getPanelFloating(n) !== e.floating)
          return false;
        if (null != e.payload && !(0, uM.default)(s.payload, e.payload))
          return false;
      }
      return true;
    });
  }
  setPanelPosition(e, t) {
    LB(() => {
      this.#n.setPanelPosition(e, t);
    });
  }
  getPanelPosition(e) {
    return this.#n.getPanelPosition(e);
  }
  setPanelFloating(e, t) {
    LB(() => {
      this.#n.setPanelFloating(e, t);
    });
  }
  getPanelFloating(e) {
    return this.#n.getPanelFloating(e);
  }
  showNotification(e) {
    const t = _M(), n = { type: "info", duration: "medium" };
    return (
      LB(() => {
        "string" == typeof e
          ? this.#n.addNotification({ id: t, message: e, ...n })
          : this.#n.addNotification({ id: t, ...n, ...e });
      }),
      t
    );
  }
  dismissNotification(e) {
    LB(() => {
      this.#n.removeNotification(e);
    });
  }
  updateNotification(e, t) {
    LB(() => {
      this.#n.updateNotification(e, t);
    });
  }
  showDialog(e) {
    const t = _M(), n = {
      type: "regular",
      actions: {
        label: "common.close",
        onClick: () => {
          LB(() => {
            this.#n.removeDialog(t);
          });
        },
      },
      clickOutsideToClose: true,
    };
    return (
      LB(() => {
        "string" == typeof e
          ? this.#n.addDialog(t, { content: { message: e }, ...n })
          : this.#n.addDialog(t, { ...n, ...e });
      }),
      t
    );
  }
  updateDialog(e, t) {
    LB(() => {
      this.#n.updateDialog(e, t);
    });
  }
  closeDialog(e) {
    LB(() => {
      this.#n.removeDialog(e);
    });
  }
  unstable_registerCustomPanel(e, t) {
    LB(() => {
      this.#n.registerCustomPanel(e, t);
    });
  }
  registerPanel(e, t) {
    LB(() => {
      this.#n.registerPanel(e, t);
    });
  }
  unstable_registerPanel(e, t) {
    this.registerPanel(e, t);
  }
  registerComponent(e, t) {
    LB(() => {
      if (Array.isArray(e))
        e.forEach((e) => {
          this.#n.registerComponent(e, t);
        });
      else {
        if ("string" != typeof e)
          throw new Error("The id must be a string or an array of strings");
        this.#n.registerComponent(e, t);
      }
    });
  }
  setDockOrder(e, t) {
    this.#n.setDockOrder(e, t);
  }
  getDockOrder(e) {
    return eT(this.#n.getDockOrder(e)[0]);
  }
  setInspectorBarOrder(e, t) {
    LB(() => {
      this.#n.setInspectorBarOrder(e, t);
    });
  }
  getInspectorBarOrder(e) {
    return eT(this.#n.getInspectorBarOrder(e)[0]);
  }
  setCanvasMenuOrder(e, t) {
    LB(() => {
      this.#n.setCanvasMenuOrder(e, t);
    });
  }
  getCanvasMenuOrder(e) {
    return eT(this.#n.getCanvasMenuOrder(e)[0]);
  }
  setNavigationBarOrder(e, t) {
    LB(() => {
      this.#n.setNavigationBarOrder(e, t);
    });
  }
  getNavigationBarOrder(e) {
    return eT(this.#n.getNavigationBarOrder(e)[0]);
  }
  setCanvasBarOrder(e, t, n) {
    LB(() => {
      this.#n.setCanvasBarOrder(e, t, n);
    });
  }
  getCanvasBarOrder(e, t) {
    return eT(this.#n.getCanvasBarOrder(e, t)[0]);
  }
  addAssetLibraryEntry(e) {
    LB(() => {
      this.#n.assetLibraryEntries[e.id] = e;
    });
  }
  updateAssetLibraryEntry(e, t) {
    LB(() => {
      this.#n.assetLibraryEntries[e] = {
        ...(this.#n.assetLibraryEntries[e] || {}),
        ...t,
      };
    });
  }
  removeAssetLibraryEntry(e) {
    LB(() => {
      delete this.#n.assetLibraryEntries[e];
    });
  }
  getAssetLibraryEntry(e) {
    return eT(this.#n.assetLibraryEntries[e]);
  }
  findAllAssetLibraryEntries() {
    return Object.keys(this.#n.assetLibraryEntries);
  }
  setBackgroundTrackAssetLibraryEntries(e) {
    LB(() => {
      this.#n.backgroundTrackLibraryEntries = e;
    });
  }
  getBackgroundTrackAssetLibraryEntries() {
    return eT(this.#n.backgroundTrackLibraryEntries);
  }
  setReplaceAssetLibraryEntries(e) {
    if (null == e || "function" != typeof e)
      throw new Error(
        "The replaceAssetLibraryEntries argument must be a function"
      );
    LB(() => {
      this.#n.replaceAssetLibraryEntries = e;
    });
  }
  unstable_getView() {
    return this.#n.viewStyle;
  }
  addIconSet(e, t) {
    LB(() => {
      this.#n.addIconSet(e, t);
    });
  }
}
