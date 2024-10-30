import CreativeEngine, {
  _applyFallback,
  _migrateConfigObject,
  _warnKeys, defaultLogger, normalizeBaseURL, supportsBrowser
} from "@/cesdk-engine";
import { qR, $R, kM, lM, IR, UL, cL, eD, bh, $se, rre, lre, pre, mre, vae, yae, lle, jre, X7, gh, rm } from "../../working";
import { ContextWrapper1 } from "@/cesdk-js/ContextWrapper1";
import { KM, LocalizationConfig, HeadingLevelStart, CDNBaseURL } from "@/cesdk-js/constants/configs";
import { configMigrations } from "./utils/uploadHandler";
import { isDOMAvailable } from "./utils/uploadHandler";
import { uploadHandler } from "./utils/uploadHandler";
import { registerNavigationComponents } from "./registerNavigationComponents";
import { FeatureAPI } from "./FeatureAPI";
import { UserInterfaceAPI } from "./UserInterfaceAPI";
import { RoleManager } from "../RoleManager";
import { reactJsxRuntime } from "../../../cesdk-common/react";
import { cloneWithPrototypeAndProperties } from "../../../cesdk-common/others/createLazyModule";
import { cloneDeep, mergeWith } from "@/cesdk-common/lodash2";

export var jsxRuntimeClone = cloneWithPrototypeAndProperties(reactJsxRuntime());
export var LM = cloneWithPrototypeAndProperties(mergeWith());
export var EM = cloneWithPrototypeAndProperties(cloneDeep());
export var CreativeEditorSDK = class {
  facade;
  #S;
  engine;
  ui;
  feature;
  #_;
  configuration;
  config;
  constructor(e) {
    (this.engine = e.facade.engine),
      (this.configuration = new RoleManager(e.facade.settings)),
      (this.config = e.config),
      (this.ui = new UserInterfaceAPI(e.userInterfaceStore)),
      (this.feature = new FeatureAPI(e.featureStore)),
      (this.#_ = setTimeout(() => {
        null == this.engine.scene.get() &&
          e.facade.configuration.logger(
            "No scene found after editor creation. Please load or create a scene to display the editor.",
            "Warning"
          );
      }, 2e3)),
      (this.#S = e);
  }
  async addDefaultAssetSources({
    baseURL: e = "https://cdn.img.ly/assets/v3", excludeAssetSourceIds: t = [],
  } = {}) {
    return this.engine.addDefaultAssetSources({
      excludeAssetSourceIds: t,
      baseURL: e,
    });
  }
  async addDemoAssetSources({
    baseURL: e = "https://cdn.img.ly/assets/demo/v2", excludeAssetSourceIds: t = [], sceneMode: n,
  } = {}) {
    const s = null != this.#S.facade.configuration.callbacks.onUpload, i = this.engine.scene.get(), o = null != i && this.engine.block.isValid(i)
      ? this.engine.scene.getMode()
      : undefined;
    return this.engine.addDemoAssetSources({
      baseURL: e,
      excludeAssetSourceIds: t,
      sceneMode: n ?? o ?? "Design",
      withUploadAssetSources: s,
    });
  }
  export(e) {
    return this.#S.facade.export(e);
  }
  async createDesignScene(e) {
    return this.#S.facade.initializeEmptyScene("Design", e);
  }
  async createVideoScene(e) {
    return this.#S.facade.initializeEmptyScene("Video", e);
  }
  load(e) {
    return this.loadFromString(e);
  }
  loadFromString(e) {
    return this.#S.facade.engine.scene.loadFromString(e);
  }
  loadFromURL(e) {
    return this.#S.facade.engine.scene.loadFromURL(e);
  }
  createFromImage(e) {
    return this.#S.facade.createSceneFromImage(e);
  }
  disableNoSceneWarning() {
    clearTimeout(this.#_);
  }
  save() {
    return this.engine.scene.saveToString();
  }
  setTranslations(e) {
    Object.entries(e).forEach(([e, t]) => {
      this.#S.facade.addTranslations(t, e);
    });
  }
  async unstable_switchPage(e) {
    const t = this.#S.facade.getPageManager();
    t.setSinglePageVisibility(e), await t.focusPage(e);
  }
  unstable_getPages() {
    return Promise.resolve([...this.#S.facade.getPageManager().getPages()]);
  }
  unstable_onActivePageChanged(e) {
    const t = this.#S.facade.engine;
    return t.editor.onHistoryUpdated(() => {
      const n = t.scene.getCurrentPage();
      null != n && e(n);
    });
  }
  unstable_focusPage(e) {
    return this.#S.facade.focusBlock(e);
  }
  async unstable_addPlugin(e) {
    e.initialize &&
      e.initialize({
        asset: this.engine.asset,
        block: this.engine.block,
        scene: this.engine.scene,
        editor: this.engine.editor,
        event: this.engine.event,
        variable: this.engine.variable,
      }),
      e.initializeUserInterface && e.initializeUserInterface({ cesdk: this });
  }
  addPlugin(e) {
    if (e.initialize) {
      const t = {
        cesdk: this,
        engine: {
          asset: this.engine.asset,
          block: this.engine.block,
          scene: this.engine.scene,
          editor: this.engine.editor,
          event: this.engine.event,
          variable: this.engine.variable,
        },
      };
      e.initialize(t);
    }
  }
  unstable_supportsUpload(e) {
    const { callback: t, options: n } = uploadHandler(this.config);
    if (null == t) return false;
    if (null == e) return true;
    const { supportedMimeTypes: s = [] } = n, i = "string" == typeof e ? [e] : e ?? [];
    return 0 === s.length || i.every((e) => s.includes(e));
  }
  async unstable_upload(e, t) {
    const { callback: n, options: s } = uploadHandler(this.config);
    if (null == n) throw new Error("No `onUpload` callback configured");
    const { supportedMimeTypes: i = [] } = s;
    if (0 === i.length || i.includes(e.type)) return n(e, t);
    throw new Error(
      `Could not upload ${e.name} because the upload handler does not support the MIME type ${e.type}.`
    );
  }
  refetchAssetSources(e = this.engine.asset.findAllSources()) {
    Array.isArray(e)
      ? e.forEach((e) => this.engine.asset.assetSourceContentsChanged(e))
      : this.engine.asset.assetSourceContentsChanged(e);
  }
  dispose() {
    this.#S.reactRoot.unmount(), clearTimeout(this.#_);
    const e = this.#S.facade.engine;
    this.#S.facade.dispose(),
      e.dispose(),
      this.#S.internalRenderTarget && this.#S.internalRenderTarget.remove(),
      this.#S.publicStylingContainer && this.#S.publicStylingContainer.remove(),
      this.#S.themeStyleSheet && this.#S.themeStyleSheet.remove();
  }
  static async init(e, t) {
    return (
      console.error(
        "After being deprecated for over a year, the `init()` method has been removed. Please use `CreativeEditorSDK.create()` instead. For more information see https://img.ly/docs/cesdk/introduction/migration_1_13/. CreativeEditorSDK will now attempt to pass the configuration to `CreativeEditorSDK.create()` and continue the initialization process. This is unlikely to work as expected."
      ),
      this.create(e, t)
    );
  }
  static async create(e, t) {
    const [n, s] = await this.#E(e, t);
    for (const e of _warnKeys(configMigrations, t)) s.configuration.logger(e, "Warning");
    return _applyFallback(configMigrations, t, n.engine), n;
  }
  static async #E(e, t) {
    if (!isDOMAvailable)
      throw new Error(
        "You are trying to initialize CreativeEditorSDK in an environment without a DOM. Most likely this happens during server side rendering. In that case you have to look into the documentation of you library how to exclude the initialization of CreativeEditorSDK on the server."
      );
    if (!supportsBrowser())
      throw (
        (t?.callbacks?.onUnsupportedBrowser
          ? t.callbacks.onUnsupportedBrowser()
          : window.alert(
            "Your current browser is not supported.\nPlease use one of the following:\n\n- Mozilla Firefox 115 or newer\n- Apple Safari 15.6 or newer\n- Microsoft Edge 114 or newer\n- Google Chrome 114 or newer"
          ),
          new Error("Current browser type and/or version is not supported"))
      );
    const n = "0aacf25c06e", s = "1.37.0";
    if (n || s) {
      const e = ["[CE.SDK]"];
      s && e.push(`v${s}`),
        n && e.push(`Revision ${n}`),
        console.log(e.join(" "));
    }
    const i = _migrateConfigObject(configMigrations, t), o = (function (e = {}) {
      const t = {
        logger: e.logger ?? defaultLogger,
        locale: e.locale ?? "en",
        theme: e.theme ?? "light",
        devMode: e.devMode ?? false,
        ui: (0, LM.default)((0, EM.default)(KM), e.ui ?? {}, (e, t) => "boolean" == typeof t &&
          "object" == typeof e &&
          null !== e &&
          "boolean" == typeof e?.show
          ? { ...e, show: t }
          : Array.isArray(e) && Array.isArray(t)
            ? t
            : undefined
        ),
        i18n: e.i18n ?? { ...LocalizationConfig },
        a11y: e.a11y ?? { ...HeadingLevelStart },
        callbacks: e.callbacks ?? {},
        featureFlags: e.featureFlags,
      }, n = normalizeBaseURL(e.baseURL ?? CDNBaseURL);
      return (t.ui.baseURL = normalizeBaseURL(t.ui.baseURL, n)), t;
    })(i), {
      configuredRenderTarget: r, internalRenderTarget: a, publicStylingContainer: l, themeStyleSheet: c,
    } = this.#L(e, o), u = new qR(), d = new $R(o), p = new kM(d), f = new lM(), h = IR({ locale: o.locale, custom: o.i18n });
    h.use(UL);
    const m = (0, cL.createRoot)(a);
    g(undefined, undefined, undefined);
    try {
      const e = await CreativeEngine.init({ baseURL: CDNBaseURL, ...i }), t = new eD(e, {
        configuration: o,
        engineStore: u,
        configurationStore: d,
        i18n: h,
      });
      await new Promise((n, s) => {
        const i = Date.now();
        !(function o() {
          try {
            [
              ["--ubq-foreground-light", "page/title/color"],
              ["--ubq-static-selection-frame", "highlightColor"],
              [
                "Creator" === t.settings.roles.effectiveRole.value()
                  ? "--ubq-static-text-variable"
                  : "--ubq-static-selection-frame",
                "placeholderHighlightColor",
              ],
              ["--ubq-progress", "progressColor"],
              ["--ubq-notice-error", "errorStateColor"],
            ].forEach(([t, n]) => {
              const s = bh(t);
              e.editor.setSettingColor(n, s);
            }),
              n(),
              n();
          } catch (e) {
            Date.now() - i < 1e4 ? window.requestAnimationFrame(o) : s();
          }
        })();
      }).catch(() => {
        throw new Error("Failed to read theme variables");
      });
      const n = new this({
        facade: t,
        internalRenderTarget: a,
        publicStylingContainer: l,
        userInterfaceStore: p,
        featureStore: f,
        themeStyleSheet: c,
        reactRoot: m,
        config: o,
      });
      (t.cesdk = n),
        (window.Cypress || window.IS_PLAYWRIGHT) && (n.facade = t),
        $se(n, o),
        rre(n, d);
      const s = lre(n, o);
      return (
        pre(n, i, s),
        mre(n, o),
        vae(n, p),
        yae(n, p),
        lle(n, p),
        registerNavigationComponents(n, p, o),
        jre(n, p),
        g(n, t, undefined),
        [n, t]
      );
    } catch (e) {
      throw (g(undefined, undefined, e), e);
    }
    function g(e, t, n) {
      m.render(
        (0, jsxRuntimeClone.jsx)(ContextWrapper1, {
          cesdk: e,
          facade: t,
          initError: n,
          i18n: h,
          config: o,
          internalRenderTarget: a,
          engineStore: u,
          configurationStore: d,
          userInterfaceStore: p,
          configuredRenderTarget: r,
        })
      );
    }
  }
  static #L(e, t) {
    const n = t.ui.baseURL, s = !t.ui.stylesheets?.disableShadowDOM, i = !t.ui.stylesheets?.disableTagInsertion, o = "string" == typeof e ? document.querySelector(e) : e;
    if (!o) throw new Error(`Container ${e} is invalid!`);
    let r;
    i && ((r = X7("cesdk-themes.css", n ?? "")), o.appendChild(r));
    const a = document.createElement("div");
    (a.id = "root-shadow"),
      (a.style.height = "100%"),
      (a.style.width = "100%"),
      a.classList.add(gh),
      o.appendChild(a);
    const l = rm && s ? a.attachShadow({ mode: "open" }) : a;
    i && l.appendChild(X7("cesdk.css", n ?? ""));
    const c = document.createElement("div");
    return (
      (c.style.height = "100%"),
      (c.style.width = "100%"),
      (c.style.position = "relative"),
      c.setAttribute("data-ubq-internal-target", "true"),
      l.appendChild(c),
      {
        configuredRenderTarget: o,
        internalRenderTarget: c,
        publicStylingContainer: a,
        themeStyleSheet: r,
      }
    );
  }
};

