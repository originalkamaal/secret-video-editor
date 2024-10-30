import { bufferIndex } from "../cesdk-common/buffer";
import { cesdkCore, cloneLoadashDebounce, cloneLodashIsEqual } from "../cesdk-common/cesdkCore";
import {
  cloneWithPrototypeAndProperties,
  executeInitializers,
  addPrivateMember,
  defineProperty,
  accessPrivateField,
  writePrivateField,
  createMetadataArray,
  defineMember,
  assignMetadata,
} from "../cesdk-common/others/createLazyModule";
import { lodashIsEqual, lodashOnce } from "../cesdk-common/lodash";

function St(e) {
  if (e.isValid()) {
    const t = e.value();
    return e.delete(), t;
  }
  {
    const t = e.error(),
      r = t.publicMessage();
    throw (t.delete(), e.delete(), new Error(r));
  }
}
function kt(e) {
  return new Promise((t, r) => {
    e((e) => {
      try {
        const r = St(e);
        t(r);
      } catch (e) {
        r(e);
      }
    });
  });
}
var xt = (e, t = !0) => {
    const r = [];
    for (let t = 0; t < e.size(); t += 1) r.push(e.get(t));
    return t && e.delete(), r;
  },
  Tt = new WeakMap(),
  At = { assets: [], total: 0, currentPage: 0, nextPage: void 0 },
  AssetAPI = class {
    #e;
    constructor(e) {
      this.#e = e;
    }
    #t = new Set();
    #r = new Set();
    unstable_registerApplyAssetMiddleware(e) {
      return (
        this.#t.add(e),
        () => {
          this.#t.delete(e);
        }
      );
    }
    unstable_registerApplyAssetToBlockMiddleware(e) {
      return (
        this.#r.add(e),
        () => {
          this.#r.delete(e);
        }
      );
    }
    addSource(e) {
      const t = e.getSupportedMimeTypes?.bind(e),
        r = e.getGroups?.bind(e),
        n = e.applyAsset?.bind(e),
        o = e.applyAssetToBlock?.bind(e),
        i = e.addAsset?.bind(e),
        a = e.removeAsset?.bind(e),
        s = e.credits,
        u = e.license;
      St(
        this.#e.addAssetSource(
          e.id,
          async (t, r) => {
            try {
              const n = {
                  ...t,
                  sortKey: t.sortKey,
                  sortingOrder: t.sortingOrder,
                  sortActiveFirst: t.sortActiveFirst,
                  tags: xt(t.tags),
                  groups: xt(t.groups),
                  excludeGroups: xt(t.excludeGroups),
                },
                o = await e.findAssets(n);
              if (o) {
                const t = { ...o, assets: o.assets.map((t) => Pt(t, e.id)) };
                r.invoke(t);
              } else r.invoke(At);
            } catch (e) {
              r.invoke(
                e.message ?? "Unknown error in user-defined `findAssets`"
              );
            }
          },
          r
            ? async (e) => {
                try {
                  const t = await r();
                  e.invoke(t);
                } catch (t) {
                  e.invoke(
                    t.message ?? "Unknown error in user-defined `getGroups`"
                  );
                }
              }
            : null,
          s ? () => ({ name: s.name, url: s.url ?? "" }) : null,
          u ? () => ({ name: u.name, url: u.url ?? "" }) : null,
          t ? () => t() ?? [] : null,
          n
            ? async (e, t) => {
                try {
                  const r = await n(this.#n(e));
                  t.invoke(r);
                } catch (e) {
                  t.invoke(
                    e.message ?? "Unknown error in user-defined `applyAsset`"
                  );
                }
              }
            : null,
          o
            ? async (e, t, r) => {
                try {
                  await o(this.#n(e), t), r.invoke({});
                } catch (e) {
                  r.invoke(
                    e.message ??
                      "Unknown error in user-defined `applyAssetToBlock`"
                  );
                }
              }
            : null,
          i
            ? async (e) => {
                i(e);
              }
            : null,
          a
            ? async (e) => {
                a(e);
              }
            : null
        )
      ),
        this.#o(e.id, e);
    }
    addLocalSource(e, t, r, n) {
      St(
        this.#e.addLocalAssetSource(
          e,
          t ?? [],
          r
            ? async (e, t) => {
                try {
                  const n = await r(this.#n(e));
                  t.invoke(n);
                } catch (e) {
                  t.invoke(
                    e.message ?? "Unknown error in user-defined `applyAsset`"
                  );
                }
              }
            : null,
          n
            ? async (e, t, r) => {
                try {
                  await n(this.#n(e), t), r.invoke({});
                } catch (e) {
                  r.invoke(
                    e.message ??
                      "Unknown error in user-defined `applyAssetToBlock`"
                  );
                }
              }
            : null
        )
      );
    }
    removeSource(e) {
      St(this.#e.removeAssetSource(e)), this.#i(e);
    }
    findAllSources() {
      return xt(this.#e.findAllAssetSources());
    }
    findAssets(e, t) {
      return new Promise((r, n) => {
        let o = t?.tags ?? [];
        Array.isArray(o) || (o = [o]);
        const i = {
          perPage: t?.perPage ?? 0,
          page: t?.page ?? 0,
          query: t?.query ?? "",
          tags: o,
          groups: t?.groups ?? [],
          excludeGroups: t?.excludeGroups ?? [],
          locale: t?.locale ?? "",
          sortingOrder: t?.sortingOrder ?? "None",
          sortKey: t?.sortKey ?? "",
          sortActiveFirst: t?.sortActiveFirst ?? !1,
        };
        this.#e.findAssetSourceAssets(e, i, (e) => {
          try {
            const t = St(e);
            r({ ...t, nextPage: -1 === t.nextPage ? void 0 : t.nextPage });
          } catch (e) {
            n(e);
          }
        });
      });
    }
    #n(e) {
      const t = { ...e };
      return (
        0 === t.groups?.length && delete t.groups,
        t.locale || delete t.locale,
        t.label || delete t.label,
        0 === t.tags?.length && delete t.tags,
        t.credits?.name || t.credits?.url
          ? t.credits.url || delete t.credits.url
          : delete t.credits,
        t.license?.name || t.license?.url
          ? t.license.url || delete t.license.url
          : delete t.license,
        t.utm?.source || t.utm?.medium
          ? (t.utm.source || delete t.utm.source,
            t.utm.medium || delete t.utm.medium)
          : delete t.utm,
        t
      );
    }
    async getGroups(e) {
      return kt((t) => this.#e.getAssetSourceGroups(e, t)).then((e) => xt(e));
    }
    getSupportedMimeTypes(e) {
      return xt(St(this.#e.getAssetSourceSupportedMimeTypes(e)));
    }
    getCredits(e) {
      const t = St(this.#e.getAssetSourceCredits(e));
      if (t.name || t.url) return t.url ? t : { name: t.name, url: void 0 };
    }
    getLicense(e) {
      const t = St(this.#e.getAssetSourceLicense(e));
      if (t.name || t.url) return t.url ? t : { name: t.name, url: void 0 };
    }
    canManageAssets(e) {
      return !!Tt.get(this.#e)?.get(e)?.canManageAssets;
    }
    addAssetToSource(e, t) {
      St(this.#e.addAssetToSource(e, t));
    }
    removeAssetFromSource(e, t) {
      St(this.#e.removeAssetFromSource(e, t));
    }
    #o(e, t) {
      Tt.has(this.#e) || Tt.set(this.#e, new Map()),
        t.canManageAssets &&
          console.warn(
            `\nDEPRECATION WARNING:\n\n'canManageAssets' flag was found for asset source with the id '${e}'.\n\nThis flag is deprecated and will be removed in the next version. If you have used it to control if an upload buttons is rendered in the asset library, use the 'canAdd' options on an asset library entry. See documentation here: https://img.ly/docs/cesdk/ui/guides/customize-asset-library/`
          ),
        Tt.get(this.#e).set(e, { canManageAssets: t.canManageAssets });
    }
    #i(e) {
      Tt.get(this.#e)?.delete(e);
    }
    async apply(e, t) {
      const r = (e, t) =>
        new Promise((r, n) => {
          this.#e.applyAssetSourceAsset(e, Pt(t, e), (e) => {
            try {
              const t = St(e);
              this.#e.isValid(t) ? r(t) : r(void 0);
            } catch (e) {
              n(e);
            }
          });
        });
      if (this.#t.size > 0) {
        return Array.from(this.#t).reduce((e, t) => (r, n) => t(r, n, e), r)(
          e,
          t
        );
      }
      return r(e, t);
    }
    async applyToBlock(e, t, r) {
      const n = (e, t, r) =>
        kt((n) => this.#e.applyAssetSourceAssetToBlock(e, Pt(t, e), r, n));
      if (this.#r.size > 0) {
        return Array.from(this.#r).reduce(
          (e, t) => (r, n, o) => t(r, n, o, e),
          n
        )(e, t, r);
      }
      return n(e, t, r);
    }
    async unstable_applyProperty(e, t, r) {
      return kt((n) =>
        this.#e.unstable_applyAssetSourceProperty(e, Pt(t, e), r, n)
      );
    }
    async defaultApplyAsset(e) {
      return new Promise((t, r) => {
        this.#e.defaultApplyAsset(Pt(e, ""), (e) => {
          try {
            const r = St(e);
            this.#e.isValid(r) ? t(r) : t(void 0);
          } catch (e) {
            r(e);
          }
        });
      });
    }
    async defaultApplyAssetToBlock(e, t) {
      return kt((r) => this.#e.defaultApplyAssetToBlock(Pt(e, ""), t, r));
    }
    onAssetSourceAdded = (e) => {
      const t = this.#e.subscribeToAssetSourceAdded(e);
      return () => {
        this.#e.isDeleted() || St(this.#e.unsubscribe(t));
      };
    };
    onAssetSourceRemoved = (e) => {
      const t = this.#e.subscribeToAssetSourceRemoved(e);
      return () => {
        this.#e.isDeleted() || St(this.#e.unsubscribe(t));
      };
    };
    onAssetSourceUpdated = (e) => {
      const t = this.#e.subscribeToAssetSourceUpdated(e);
      return () => {
        this.#e.isDeleted() || St(this.#e.unsubscribe(t));
      };
    };
    assetSourceContentsChanged(e) {
      St(this.#e.assetSourceContentsChanged(e));
    }
    dispose() {
      Tt.delete(this.#e);
    }
  };
function Pt(e, t) {
  return "context" in e && e.context.sourceId === t && "active" in e
    ? e
    : { ...e, active: e.active ?? !1, context: { sourceId: t } };
}
var Ft = class extends TypeError {
  constructor(e, t) {
    let r;
    const { message: n, ...o } = e,
      { path: i } = e;
    super(0 === i.length ? n : "At path: " + i.join(".") + " -- " + n),
      (this.value = void 0),
      (this.key = void 0),
      (this.type = void 0),
      (this.refinement = void 0),
      (this.path = void 0),
      (this.branch = void 0),
      (this.failures = void 0),
      Object.assign(this, o),
      (this.name = this.constructor.name),
      (this.failures = () => {
        var n;
        return null != (n = r) ? n : (r = [e, ...t()]);
      });
  }
};
function Lt(e) {
  return "object" == typeof e && null != e;
}
function Rt(e) {
  return "string" == typeof e ? JSON.stringify(e) : "" + e;
}
function Bt(e, t, r, n) {
  if (!0 === e) return;
  !1 === e ? (e = {}) : "string" == typeof e && (e = { message: e });
  const { path: o, branch: i } = t,
    { type: a } = r,
    {
      refinement: s,
      message: u = "Expected a value of type `" +
        a +
        "`" +
        (s ? " with refinement `" + s + "`" : "") +
        ", but received: `" +
        Rt(n) +
        "`",
    } = e;
  return {
    value: n,
    type: a,
    refinement: s,
    key: o[o.length - 1],
    path: o,
    branch: i,
    ...e,
    message: u,
  };
}
function* Dt(e, t, r, n) {
  var o;
  (Lt((o = e)) && "function" == typeof o[Symbol.iterator]) || (e = [e]);
  for (const o of e) {
    const e = Bt(o, t, r, n);
    e && (yield e);
  }
}
function* Mt(e, t, r = {}) {
  const { path: n = [], branch: o = [e], coerce: i = !1, mask: a = !1 } = r,
    s = { path: n, branch: o };
  if (
    i &&
    ((e = t.coercer(e, s)),
    a && "type" !== t.type && Lt(t.schema) && Lt(e) && !Array.isArray(e))
  )
    for (const r in e) void 0 === t.schema[r] && delete e[r];
  let u = !0;
  for (const r of t.validator(e, s)) (u = !1), yield [r, void 0];
  for (let [r, c, l] of t.entries(e, s)) {
    const t = Mt(c, l, {
      path: void 0 === r ? n : [...n, r],
      branch: void 0 === r ? o : [...o, c],
      coerce: i,
      mask: a,
    });
    for (const n of t)
      n[0]
        ? ((u = !1), yield [n[0], void 0])
        : i &&
          ((c = n[1]),
          void 0 === r
            ? (e = c)
            : e instanceof Map
            ? e.set(r, c)
            : e instanceof Set
            ? e.add(c)
            : Lt(e) && (e[r] = c));
  }
  if (u) for (const r of t.refiner(e, s)) (u = !1), yield [r, void 0];
  u && (yield [void 0, e]);
}
var Ot = class {
  constructor(e) {
    (this.TYPE = void 0),
      (this.type = void 0),
      (this.schema = void 0),
      (this.coercer = void 0),
      (this.validator = void 0),
      (this.refiner = void 0),
      (this.entries = void 0);
    const {
      type: t,
      schema: r,
      validator: n,
      refiner: o,
      coercer: i = (e) => e,
      entries: a = function* () {},
    } = e;
    (this.type = t),
      (this.schema = r),
      (this.entries = a),
      (this.coercer = i),
      (this.validator = n ? (e, t) => Dt(n(e, t), t, this, e) : () => []),
      (this.refiner = o ? (e, t) => Dt(o(e, t), t, this, e) : () => []);
  }
  assert(e) {
    return (function (e, t) {
      const r = It(e, t);
      if (r[0]) throw r[0];
    })(e, this);
  }
  create(e) {
    return (function (e, t) {
      const r = It(e, t, { coerce: !0 });
      if (r[0]) throw r[0];
      return r[1];
    })(e, this);
  }
  is(e) {
    return (function (e, t) {
      const r = It(e, t);
      return !r[0];
    })(e, this);
  }
  mask(e) {
    return (function (e, t) {
      const r = It(e, t, { coerce: !0, mask: !0 });
      if (r[0]) throw r[0];
      return r[1];
    })(e, this);
  }
  validate(e, t = {}) {
    return It(e, this, t);
  }
};
function It(e, t, r = {}) {
  const n = Mt(e, t, r),
    o = (function (e) {
      const { done: t, value: r } = e.next();
      return t ? void 0 : r;
    })(n);
  if (o[0]) {
    return [
      new Ft(o[0], function* () {
        for (const e of n) e[0] && (yield e[0]);
      }),
      void 0,
    ];
  }
  return [void 0, o[1]];
}
function jt(e, t) {
  return new Ot({ type: e, schema: null, validator: t });
}
function Ut(e) {
  return new Ot({
    type: "array",
    schema: e,
    *entries(t) {
      if (e && Array.isArray(t))
        for (const [r, n] of t.entries()) yield [r, n, e];
    },
    coercer: (e) => (Array.isArray(e) ? e.slice() : e),
    validator: (e) =>
      Array.isArray(e) || "Expected an array value, but received: " + Rt(e),
  });
}
function $t() {
  return jt("boolean", (e) => "boolean" == typeof e);
}
function qt() {
  return jt(
    "integer",
    (e) =>
      ("number" == typeof e && !isNaN(e) && Number.isInteger(e)) ||
      "Expected an integer, but received: " + Rt(e)
  );
}
function Ht() {
  return jt(
    "number",
    (e) =>
      ("number" == typeof e && !isNaN(e)) ||
      "Expected a number, but received: " + Rt(e)
  );
}
function Nt(e) {
  const t = e ? Object.keys(e) : [],
    r = jt("never", () => !1);
  return new Ot({
    type: "object",
    schema: e || null,
    *entries(n) {
      if (e && Lt(n)) {
        const o = new Set(Object.keys(n));
        for (const r of t) o.delete(r), yield [r, n[r], e[r]];
        for (const e of o) yield [e, n[e], r];
      }
    },
    validator: (e) => Lt(e) || "Expected an object, but received: " + Rt(e),
    coercer: (e) => (Lt(e) ? { ...e } : e),
  });
}
function Vt() {
  return jt(
    "string",
    (e) => "string" == typeof e || "Expected a string, but received: " + Rt(e)
  );
}
function zt(e, t, r = {}) {
  const { exclusive: n } = r;
  return Xt(e, "max", (r) =>
    n
      ? r < t
      : r <= t ||
        "Expected a " +
          e.type +
          " less than " +
          (n ? "" : "or equal to ") +
          t +
          " but received `" +
          r +
          "`"
  );
}
function Wt(e, t, r = {}) {
  const { exclusive: n } = r;
  return Xt(e, "min", (r) =>
    n
      ? r > t
      : r >= t ||
        "Expected a " +
          e.type +
          " greater than " +
          (n ? "" : "or equal to ") +
          t +
          " but received `" +
          r +
          "`"
  );
}
function Gt(e) {
  return Xt(e, "nonempty", (t) => {
    const r = (function (e) {
      return e instanceof Map || e instanceof Set ? e.size : e.length;
    })(t);
    return (
      r > 0 || "Expected a nonempty " + e.type + " but received an empty one"
    );
  });
}
function Xt(e, t, r) {
  return new Ot({
    ...e,
    *refiner(n, o) {
      yield* e.refiner(n, o);
      const i = Dt(r(n, o), o, e, n);
      for (const e of i) yield { ...e, refinement: t };
    },
  });
}
function Yt(e, t, r) {
  const [n] = It(t, r);
  if (n) throw ((n.message = `Error in argument '${e}': ${n.message}`), n);
}
function Kt() {
  const e =
    /image\/(png|jpeg|webp|x-tga)|audio\/(wav)|video\/(mp4|quicktime)|application\/octet-stream|application\/pdf/;
  return jt(
    "MimeType",
    (t) =>
      !("string" != typeof t || !e.test(t)) || {
        message: `expected one of "image/png", "image/jpeg", "image/webp", "image/x-tga", "video/mp4", "video/quicktime", "application/pdf" or "application/octet-stream", but got "${t}"`,
      }
  );
}
function Zt() {
  const e = ["Free", "VerticalStack", "HorizontalStack", "DepthStack"];
  return jt(
    "SceneLayout",
    (t) =>
      !("string" != typeof t || !e.includes(t)) || {
        message: `expected one of ${e
          .map((e) => `"${e}"`)
          .join(", ")}, but got "${t}"`,
      }
  );
}
var Qt = Symbol("PROXY");
function Jt(e, t) {
  Object.defineProperty(e, Qt, { value: { type: "getter" }, writable: !1 });
}
function er(e, t) {
  Object.defineProperty(e, Qt, { value: { type: "setter" }, writable: !1 });
}
var tr = {};
function rr(e, t, r) {
  return Object.hasOwnProperty.call(e, t)
    ? () => {
        e[t] = r;
      }
    : () => {
        delete e[t];
      };
}
var nr,
  or = ((e) => (
    (e.Png = "image/png"),
    (e.Jpeg = "image/jpeg"),
    (e.WebP = "image/webp"),
    (e.Tga = "image/x-tga"),
    (e.Wav = "audio/wav"),
    (e.Mp4 = "video/mp4"),
    (e.QuickTime = "video/quicktime"),
    (e.Binary = "application/octet-stream"),
    (e.Pdf = "application/pdf"),
    (e.Zip = "application/zip"),
    e
  ))(or || {}),
  MimeType = or;
function isRGBAColor(e) {
  return "r" in e && "a" in e && void 0 !== e.r && void 0 !== e.a;
}
function isSpotColor(e) {
  return "name" in e && void 0 !== e.name;
}
function isCMYKColor(e) {
  return (
    "c" in e &&
    "m" in e &&
    "y" in e &&
    "k" in e &&
    void 0 !== e.c &&
    void 0 !== e.m &&
    void 0 !== e.y &&
    void 0 !== e.k
  );
}
((e) => {
  let t;
  var r;
  ((r = t = e.ColorSpace || (e.ColorSpace = {}))[(r.sRGB = 0)] = "sRGB"),
    (r[(r.CMYK = 1)] = "CMYK"),
    (r[(r.SpotColor = 2)] = "SpotColor"),
    (e.toColor = function (e) {
      switch (e.colorSpace) {
        case 0:
          return {
            r: e.components.x,
            g: e.components.y,
            b: e.components.z,
            a: e.components.w,
          };
        case 2:
          return {
            name: e.spotColorName,
            tint: e.tint,
            externalReference: e.externalReference,
          };
        case 1:
          return {
            c: e.components.x,
            m: e.components.y,
            y: e.components.z,
            k: e.components.w,
            tint: e.tint,
          };
        default:
          throw new Error("Unknown color space!");
      }
    }),
    (e.fromColor = function (e) {
      if (isRGBAColor(e))
        return {
          colorSpace: 0,
          components: { x: e.r, y: e.g, z: e.b, w: e.a },
          spotColorName: "",
          tint: 1,
          externalReference: "",
        };
      if (isCMYKColor(e))
        return {
          colorSpace: 1,
          components: { x: e.c, y: e.m, z: e.y, w: e.k },
          spotColorName: "",
          tint: e.tint,
          externalReference: "",
        };
      if (isSpotColor(e))
        return {
          colorSpace: 2,
          components: { x: 0, y: 0, z: 0, w: 0 },
          spotColorName: e.name,
          tint: e.tint,
          externalReference: e.externalReference,
        };
      throw new Error("Unknown color space!");
    });
})(nr || (nr = {}));
var cr,
  lr,
  dr,
  hr,
  fr,
  pr,
  mr,
  gr,
  vr,
  yr,
  br,
  wr,
  _r,
  Er,
  Cr,
  Sr,
  kr,
  xr,
  Tr,
  Ar,
  Pr,
  Fr,
  Lr,
  Rr,
  Br,
  Dr,
  Mr,
  Or,
  Ir,
  jr,
  Ur,
  $r,
  qr,
  Hr,
  Nr,
  Vr,
  zr,
  Wr,
  Gr,
  Xr,
  Yr,
  Kr,
  Zr,
  Qr,
  Jr,
  en,
  tn,
  rn,
  nn,
  on,
  an,
  sn,
  un,
  cn,
  ln,
  dn,
  hn,
  fn,
  pn,
  mn,
  gn,
  vn,
  yn,
  bn,
  wn,
  _n,
  En,
  Cn,
  Sn,
  kn,
  xn,
  Tn,
  An,
  Pn,
  Fn,
  Ln,
  Rn,
  Bn,
  Dn,
  Mn,
  On,
  In,
  jn,
  Un,
  $n,
  qn,
  Hn,
  Nn,
  Vn,
  zn,
  Wn,
  Gn,
  Xn,
  Yn,
  Kn,
  Zn,
  Qn,
  Jn,
  eo,
  to,
  ro,
  no,
  oo,
  io,
  ao,
  so,
  uo,
  co,
  lo,
  ho,
  fo,
  po,
  mo,
  go,
  vo,
  yo,
  bo,
  wo,
  _o,
  Eo,
  Co,
  So,
  ko,
  xo,
  To,
  Ao,
  Po,
  Fo,
  Lo,
  Ro,
  Bo,
  Do,
  Mo,
  Oo,
  Io,
  jo,
  Uo,
  $o,
  qo,
  Ho,
  No,
  Vo,
  zo,
  Wo,
  Go,
  Xo,
  Yo,
  Ko,
  Zo,
  Qo,
  Jo,
  ei,
  ti,
  ri,
  ni,
  oi,
  ii,
  ai,
  si,
  ui,
  ci,
  li,
  di,
  hi,
  fi,
  pi,
  mi,
  gi,
  vi,
  yi,
  bi,
  wi,
  _i,
  Ei,
  Ci,
  Si,
  ki,
  xi,
  Ti,
  Ai,
  Pi,
  Fi,
  Li,
  Ri,
  Bi,
  Di,
  Mi,
  Oi,
  Ii,
  ji,
  Ui,
  $i,
  qi,
  Hi,
  Ni,
  Vi,
  zi,
  Wi,
  Gi,
  Xi,
  Yi,
  Ki,
  Zi,
  Qi,
  Ji,
  ea,
  ta,
  ra,
  na,
  oa,
  ia,
  aa,
  sa,
  ua,
  ca,
  la,
  da,
  ha,
  fa,
  pa,
  ma,
  ga,
  va,
  ya,
  ba,
  wa,
  _a,
  Ea,
  Ca,
  Sa,
  ka,
  xa,
  Ta,
  Aa,
  Pa,
  Fa,
  La,
  Ra,
  Ba,
  Da,
  Ma,
  Oa,
  Ia,
  ja,
  Ua,
  $a,
  qa,
  Ha,
  Na,
  Va,
  za,
  Wa,
  Ga,
  Xa,
  Ya,
  Ka,
  Za,
  Qa,
  Ja,
  es,
  ts,
  rs,
  ns,
  os,
  is,
  as,
  ss,
  us,
  cs,
  ls,
  ds,
  hs,
  fs,
  ps,
  ms,
  gs,
  vs,
  ys,
  bs,
  ws,
  _s,
  Es,
  Cs,
  Ss,
  ks,
  xs,
  Ts,
  As,
  Ps,
  Fs,
  Ls,
  Rs,
  Bs,
  Ds,
  Ms,
  Os,
  Is,
  js,
  Us,
  $s,
  qs,
  Hs,
  Ns,
  Vs,
  zs,
  Ws,
  Gs,
  Xs,
  Ys,
  Ks,
  Zs,
  Qs,
  Js,
  eu,
  tu,
  ru,
  nu,
  ou =
    "undefined" != typeof Blob
      ? Blob
      : (() => {
          try {
            return bufferIndex().Blob;
          } catch (e) {
            return function () {
              throw new Error(
                "Could not find Blob constructor and failed to require('buffer').Blob"
              );
            };
          }
        })();
(tu = [er]),
  (eu = [er]),
  (Js = [er]),
  (Qs = [er]),
  (Zs = [Jt]),
  (Ks = [Jt]),
  (Ys = [er]),
  (Xs = [er]),
  (Gs = [er]),
  (Ws = [Jt]),
  (zs = [Jt]),
  (Vs = [Jt]),
  (Ns = [er]),
  (Hs = [er]),
  (qs = [er]),
  ($s = [er]),
  (Us = [Jt]),
  (js = [er]),
  (Is = [er]),
  (Os = [Jt]),
  (Ms = [Jt]),
  (Ds = [Jt]),
  (Bs = [Jt]),
  (Rs = [Jt]),
  (Ls = [Jt]),
  (Fs = [Jt]),
  (Ps = [er]),
  (As = [Jt]),
  (Ts = [Jt]),
  (xs = [Jt]),
  (ks = [er]),
  (Ss = [Jt]),
  (Cs = [er]),
  (Es = [Jt]),
  (_s = [er]),
  (ws = [Jt]),
  (bs = [er]),
  (ys = [Jt]),
  (vs = [Jt]),
  (gs = [Jt]),
  (ms = [Jt]),
  (ps = [er]),
  (fs = [er]),
  (hs = [er]),
  (ds = [er]),
  (ls = [er]),
  (cs = [er]),
  (us = [Jt]),
  (ss = [Jt]),
  (as = [er]),
  (is = [er]),
  (os = [er]),
  (ns = [er]),
  (rs = [Jt]),
  (ts = [er]),
  (es = [Jt]),
  (Ja = [Jt]),
  (Qa = [er]),
  (Za = [er]),
  (Ka = [Jt]),
  (Ya = [Jt]),
  (Xa = [Jt]),
  (Ga = [Jt]),
  (Wa = [Jt]),
  (za = [Jt]),
  (Va = [er]),
  (Na = [er]),
  (Ha = [er]),
  (qa = [er]),
  ($a = [Jt]),
  (Ua = [Jt]),
  (ja = [Jt]),
  (Ia = [Jt]),
  (Oa = [er]),
  (Ma = [Jt]),
  (Da = [er]),
  (Ba = [er]),
  (Ra = [Jt]),
  (La = [Jt]),
  (Fa = [Jt]),
  (Pa = [er]),
  (Aa = [er]),
  (Ta = [Jt]),
  (xa = [Jt]),
  (ka = [Jt]),
  (Sa = [Jt]),
  (Ca = [Jt]),
  (Ea = [Jt]),
  (_a = [er]),
  (wa = [er]),
  (ba = [Jt]),
  (ya = [er]),
  (va = [er]),
  (ga = [er]),
  (ma = [er]),
  (pa = [er]),
  (fa = [er]),
  (ha = [Jt]),
  (da = [Jt]),
  (la = [Jt]),
  (ca = [Jt]),
  (ua = [Jt]),
  (sa = [er]),
  (aa = [Jt]),
  (ia = [er]),
  (oa = [Jt]),
  (na = [er]),
  (ra = [Jt]),
  (ta = [er]),
  (ea = [Jt]),
  (Ji = [er]),
  (Qi = [Jt]),
  (Zi = [er]),
  (Ki = [Jt]),
  (Yi = [er]),
  (Xi = [Jt]),
  (Gi = [er]),
  (Wi = [Jt]),
  (zi = [Jt]),
  (Vi = [er]),
  (Ni = [Jt]),
  (Hi = [Jt]),
  (qi = [er]),
  ($i = [er]),
  (Ui = [er]),
  (ji = [Jt]),
  (Ii = [Jt]),
  (Oi = [Jt]),
  (Mi = [er]),
  (Di = [er]),
  (Bi = [er]),
  (Ri = [er]),
  (Li = [er]),
  (Fi = [er]),
  (Pi = [er]),
  (Ai = [Jt]),
  (Ti = [Jt]),
  (xi = [Jt]),
  (ki = [Jt]),
  (Si = [Jt]),
  (Ci = [Jt]),
  (Ei = [er]),
  (_i = [er]),
  (wi = [er]),
  (bi = [Jt]),
  (yi = [Jt]),
  (vi = [er]),
  (gi = [Jt]),
  (mi = [Jt]),
  (pi = [Jt]),
  (fi = [er]),
  (hi = [Jt]),
  (di = [Jt]),
  (li = [Jt]),
  (ci = [er]),
  (ui = [er]),
  (si = [Jt]),
  (ai = [er]),
  (ii = [Jt]),
  (oi = [er]),
  (ni = [Jt]),
  (ri = [Jt]),
  (ti = [Jt]),
  (ei = [er]),
  (Jo = [er]),
  (Qo = [er]),
  (Zo = [Jt]),
  (Ko = [er]),
  (Yo = [Jt]),
  (Xo = [er]),
  (Go = [Jt]),
  (Wo = [Jt]),
  (zo = [er]),
  (Vo = [Jt]),
  (No = [er]),
  (Ho = [Jt]),
  (qo = [Jt]),
  ($o = [Jt]),
  (Uo = [er]),
  (jo = [Jt]),
  (Io = [er]),
  (Oo = [Jt]),
  (Mo = [Jt]),
  (Do = [Jt]),
  (Bo = [er]),
  (Ro = [Jt]),
  (Lo = [er]),
  (Fo = [er]),
  (Po = [Jt]),
  (Ao = [Jt]),
  (To = [er]),
  (xo = [Jt]),
  (ko = [er]),
  (So = [Jt]),
  (Co = [er]),
  (Eo = [Jt]),
  (_o = [er]),
  (wo = [Jt]),
  (bo = [Jt]),
  (yo = [Jt]),
  (vo = [er]),
  (go = [Jt]),
  (mo = [er]),
  (po = [er]),
  (fo = [Jt]),
  (ho = [Jt]),
  (lo = [er]),
  (co = [Jt]),
  (uo = [er]),
  (so = [Jt]),
  (ao = [er]),
  (io = [Jt]),
  (oo = [er]),
  (no = [Jt]),
  (ro = [er]),
  (to = [Jt]),
  (eo = [er]),
  (Jn = [er]),
  (Qn = [er]),
  (Zn = [er]),
  (Kn = [er]),
  (Yn = [er]),
  (Xn = [Jt]),
  (Gn = [Jt]),
  (Wn = [Jt]),
  (zn = [Jt]),
  (Vn = [er]),
  (Nn = [Jt]),
  (Hn = [Jt]),
  (qn = [er]),
  ($n = [er]),
  (Un = [er]),
  (jn = [er]),
  (In = [Jt]),
  (On = [Jt]),
  (Mn = [Jt]),
  (Dn = [Jt]),
  (Bn = [Jt]),
  (Rn = [er]),
  (Ln = [Jt]),
  (Fn = [er]),
  (Pn = [er]),
  (An = [Jt]),
  (Tn = [er]),
  (xn = [Jt]),
  (kn = [Jt]),
  (Sn = [Jt]),
  (Cn = [er]),
  (En = [Jt]),
  (_n = [Jt]),
  (wn = [Jt]),
  (bn = [er]),
  (yn = [Jt]),
  (vn = [er]),
  (gn = [Jt]),
  (mn = [er]),
  (pn = [Jt]),
  (fn = [Jt]),
  (hn = [Jt]),
  (dn = [er]),
  (ln = [er]),
  (cn = [Jt]),
  (un = [Jt]),
  (sn = [Jt]),
  (an = [Jt]),
  (on = [er]),
  (nn = [Jt]),
  (rn = [Jt]),
  (tn = [Jt]),
  (en = [er]),
  (Jr = [Jt]),
  (Qr = [Jt]),
  (Zr = [Jt]),
  (Kr = [er]),
  (Yr = [Jt]),
  (Xr = [er]),
  (Gr = [Jt]),
  (Wr = [Jt]),
  (zr = [er]),
  (Vr = [Jt]),
  (Nr = [Jt]),
  (Hr = [Jt]),
  (qr = [er]),
  ($r = [Jt]),
  (Ur = [Jt]),
  (jr = [er]),
  (Ir = [Jt]),
  (Or = [Jt]),
  (Mr = [Jt]),
  (Dr = [er]),
  (Br = [Jt]),
  (Rr = [er]),
  (Lr = [Jt]),
  (Fr = [er]),
  (Pr = [Jt]),
  (Ar = [er]),
  (Tr = [Jt]),
  (xr = [Jt]),
  (kr = [Jt]),
  (Sr = [Jt]),
  (Cr = [Jt]),
  (Er = [Jt]),
  (_r = [Jt]),
  (wr = [er]),
  (br = [Jt]),
  (yr = [er]),
  (vr = [er]),
  (gr = [er]),
  (mr = [Jt]),
  (pr = [Jt]),
  (fr = [Jt]),
  (hr = [er]),
  (dr = [Jt]),
  (lr = [er]),
  (cr = [er]);
var BlockAPI = class {
  constructor(e) {
    executeInitializers(nu, 5, this),
      addPrivateMember(this, ru),
      defineProperty(this, "onSelectionChanged", (e) => {
        const t = accessPrivateField(this, ru).subscribeToSelectionChange(e);
        return () => {
          accessPrivateField(this, ru).isDeleted() ||
            St(accessPrivateField(this, ru).unsubscribe(t));
        };
      }),
      defineProperty(this, "onClicked", (e) => {
        const t = accessPrivateField(this, ru).subscribeToBlockClicked(e);
        return () => {
          accessPrivateField(this, ru).isDeleted() ||
            St(accessPrivateField(this, ru).unsubscribe(t));
        };
      }),
      defineProperty(this, "onStateChanged", (e, t) => {
        Yt("ids", e, Ut(qt()));
        const r = accessPrivateField(this, ru).subscribeToBlockState(e, (e) => {
          try {
            t(xt(e, !0));
          } catch (e) {
            console.error(e);
          }
        });
        return () => {
          accessPrivateField(this, ru).isDeleted() ||
            St(accessPrivateField(this, ru).unsubscribe(r));
        };
      }),
      writePrivateField(this, ru, e);
  }
  async export(e, t = MimeType.Png, r = {}) {
    Yt("handle", e, Ht()), Yt("mimeType", t, Kt()), Yt("options", r, Nt());
    const n = null != r.targetWidth && null != r.targetHeight,
      o = r.jpegQuality ?? 0.9,
      i = r.webpQuality ?? 1,
      a = r.pngCompressionLevel ?? 5;
    return (
      Yt("jpegQuality", o, Wt(zt(Ht(), 1), 0, { exclusive: !0 })),
      Yt("webpQuality", i, Wt(zt(Ht(), 1), 0, { exclusive: !0 })),
      Yt("pngCompressionLevel", a, Wt(zt(qt(), 9), 0)),
      (null == r.targetWidth && null == r.targetHeight) ||
        (Yt("targetWidth", r.targetWidth, Ht()),
        Yt("targetHeight", r.targetHeight, Ht())),
      new Promise((s, u) => {
        accessPrivateField(this, ru).exportToBuffer(
          e,
          t,
          (e) => {
            "error" in e ? u(e.error) : s(new ou([e], { type: t }));
          },
          {
            pngCompressionLevel: a,
            jpegQuality: o,
            webpQuality: i,
            useTargetSize: n,
            targetWidth: r.targetWidth ?? 0,
            targetHeight: r.targetHeight ?? 0,
            exportPdfWithHighCompatibility:
              r.exportPdfWithHighCompatibility ?? !0,
            exportPdfWithUnderlayer: r.exportPdfWithUnderlayer ?? !1,
            underlayerSpotColorName: r.underlayerSpotColorName ?? "",
            underlayerOffset: r.underlayerOffset ?? 0,
          }
        );
      })
    );
  }
  async exportWithColorMask(e, t = MimeType.Png, r, n, o, i = {}) {
    Yt("handle", e, Ht()), Yt("mimeType", t, Kt()), Yt("options", i, Nt());
    const a = null != i.targetWidth && null != i.targetHeight,
      s = i.jpegQuality ?? 0.9,
      u = i.webpQuality ?? 1,
      c = i.pngCompressionLevel ?? 5;
    return (
      Yt("jpegQuality", s, Wt(zt(Ht(), 1), 0, { exclusive: !0 })),
      Yt("webpQuality", u, Wt(zt(Ht(), 1), 0, { exclusive: !0 })),
      Yt("pngCompressionLevel", c, Wt(zt(qt(), 9), 0)),
      (null == i.targetWidth && null == i.targetHeight) ||
        (Yt("targetWidth", i.targetWidth, Ht()),
        Yt("targetHeight", i.targetHeight, Ht())),
      new Promise((l, d) => {
        accessPrivateField(this, ru).exportWithColorMaskToBuffer(
          e,
          t,
          r,
          n,
          o,
          (e, r) => {
            if ("error" in e) d(e.error);
            else if ("error" in r) d(r.error);
            else {
              const n = new ou([e], { type: t }),
                o = new ou([r], { type: t });
              l([n, o]);
            }
          },
          {
            pngCompressionLevel: c,
            jpegQuality: s,
            webpQuality: u,
            useTargetSize: a,
            targetWidth: i.targetWidth ?? 0,
            targetHeight: i.targetHeight ?? 0,
            exportPdfWithHighCompatibility:
              i.exportPdfWithHighCompatibility ?? !0,
            exportPdfWithUnderlayer: i.exportPdfWithUnderlayer ?? !1,
            underlayerSpotColorName: i.underlayerSpotColorName ?? "",
            underlayerOffset: i.underlayerOffset ?? 0,
          }
        );
      })
    );
  }
  async exportVideo(e, t = MimeType.Mp4, r, n) {
    throw new Error(
      "Method not implemented. An implementation is available on the BlockAPI at engine.block or cesdk.engine.block"
    );
  }
  async unstable_exportAudio(e, t = MimeType.Wav, r, n) {
    return (
      Yt("handle", e, Ht()),
      Yt("mimeType", t, Kt()),
      Yt("options", n, Nt()),
      new Promise((o, i) => {
        accessPrivateField(this, ru).unstable_exportAudioToBuffer(
          e,
          n.timeOffset ?? 0,
          n.duration ?? 0,
          t,
          r,
          (e) => {
            "error" in e ? i(e.error) : o(new ou([e], { type: t }));
          },
          {
            sampleRate: n.sampleRate ?? 48e3,
            numberOfChannels: n.numberOfChannels ?? 2,
          }
        );
      })
    );
  }
  async loadFromString(e) {
    return (
      Yt("content", e, Vt()),
      kt((t) => accessPrivateField(this, ru).loadBlocksFromString(e, t)).then(
        (e) => xt(e)
      )
    );
  }
  loadFromArchiveURL(e) {
    return (
      Yt("url", e, Vt()),
      kt((t) =>
        accessPrivateField(this, ru).loadBlocksFromArchiveURL(e, t)
      ).then((e) => xt(e))
    );
  }
  async saveToString(e, t = ["buffer", "http", "https"]) {
    return (
      Yt("blocks", e, Ut(Ht())),
      kt((r) => accessPrivateField(this, ru).saveBlocksToString(e, r, t))
    );
  }
  async saveToArchive(e) {
    return (
      Yt("blocks", e, Ut(Ht())),
      new Promise((t, r) => {
        accessPrivateField(this, ru).saveBlocksToArchive(e, (e) => {
          "error" in e ? r(e.error) : t(new ou([e], { type: MimeType.Zip }));
        });
      })
    );
  }
  create(e) {
    return Yt("type", e, Vt()), St(accessPrivateField(this, ru).create(e));
  }
  createFill(e) {
    return Yt("type", e, Vt()), St(accessPrivateField(this, ru).createFill(e));
  }
  getType(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getType(e));
  }
  getKind(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getKind(e));
  }
  setKind(e, t) {
    Yt("id", e, qt()), St(accessPrivateField(this, ru).setKind(e, t));
  }
  select(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).select(e));
  }
  setSelected(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("selected", t, $t()),
      St(accessPrivateField(this, ru).setSelected(e, t))
    );
  }
  isSelected(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).isSelected(e));
  }
  findAllSelected() {
    return xt(accessPrivateField(this, ru).findAllSelected());
  }
  isGroupable(e) {
    return (
      Yt("ids", e, Ut(Ht())), St(accessPrivateField(this, ru).isGroupable(e))
    );
  }
  group(e) {
    return (
      Yt("ids", e, Gt(Ut(Ht()))), St(accessPrivateField(this, ru).group(e))
    );
  }
  ungroup(e) {
    return Yt("id", e, Ht()), St(accessPrivateField(this, ru).ungroup(e));
  }
  enterGroup(e) {
    return Yt("id", e, Ht()), St(accessPrivateField(this, ru).enterGroup(e));
  }
  exitGroup(e) {
    return Yt("id", e, Ht()), St(accessPrivateField(this, ru).exitGroup(e));
  }
  isCombinable(e) {
    return (
      Yt("ids", e, Ut(Ht())), St(accessPrivateField(this, ru).isCombinable(e))
    );
  }
  combine(e, t) {
    return (
      Yt("ids", e, Ut(Ht())),
      Yt("op", t, Vt()),
      St(accessPrivateField(this, ru).combine(e, t))
    );
  }
  setName(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("name", t, Vt()),
      St(accessPrivateField(this, ru).setName(e, t))
    );
  }
  getName(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getName(e));
  }
  getUUID(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getUUID(e));
  }
  findByName(e) {
    Yt("name", e, Vt());
    const t = accessPrivateField(this, ru).findByName(e);
    return xt(t);
  }
  findByType(e) {
    Yt("type", e, Vt());
    const t = St(accessPrivateField(this, ru).findByType(e));
    return xt(t);
  }
  findByKind(e) {
    Yt("kind", e, Vt());
    const t = St(accessPrivateField(this, ru).findByKind(e));
    return xt(t);
  }
  findAll() {
    return xt(accessPrivateField(this, ru).findAll());
  }
  findAllPlaceholders() {
    return xt(accessPrivateField(this, ru).findAllPlaceholders());
  }
  createShape(e) {
    return Yt("type", e, Vt()), St(accessPrivateField(this, ru).createShape(e));
  }
  hasShape(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasShape(e));
  }
  supportsShape(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsShape(e));
  }
  getShape(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getShape(e));
  }
  setShape(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("shape", t, qt()),
      St(accessPrivateField(this, ru).setShape(e, t))
    );
  }
  isVisible(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).isVisible(e));
  }
  setVisible(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("visible", t, $t()),
      St(accessPrivateField(this, ru).setVisible(e, t))
    );
  }
  isClipped(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).isClipped(e));
  }
  setClipped(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("clipped", t, $t()),
      St(accessPrivateField(this, ru).setClipped(e, t))
    );
  }
  isTransformLocked(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).isTransformLocked(e))
    );
  }
  setTransformLocked(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("locked", t, $t()),
      St(accessPrivateField(this, ru).setTransformLocked(e, t))
    );
  }
  getPositionX(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getPositionX(e));
  }
  getPositionXMode(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getPositionXMode(e))
    );
  }
  getPositionY(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getPositionY(e));
  }
  getPositionYMode(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getPositionYMode(e))
    );
  }
  setPositionX(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("value", t, Ht()),
      St(accessPrivateField(this, ru).setPositionX(e, t))
    );
  }
  setPositionXMode(e, t) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).setPositionXMode(e, t))
    );
  }
  setPositionY(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("value", t, Ht()),
      St(accessPrivateField(this, ru).setPositionY(e, t))
    );
  }
  setPositionYMode(e, t) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).setPositionYMode(e, t))
    );
  }
  setAlwaysOnTop(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setAlwaysOnTop(e, t))
    );
  }
  setAlwaysOnBottom(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setAlwaysOnBottom(e, t))
    );
  }
  isAlwaysOnTop(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).isAlwaysOnTop(e));
  }
  isAlwaysOnBottom(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).isAlwaysOnBottom(e))
    );
  }
  bringToFront(e) {
    return Yt("id", e, Ht()), St(accessPrivateField(this, ru).bringToFront(e));
  }
  sendToBack(e) {
    return Yt("id", e, Ht()), St(accessPrivateField(this, ru).sendToBack(e));
  }
  bringForward(e) {
    return Yt("id", e, Ht()), St(accessPrivateField(this, ru).bringForward(e));
  }
  sendBackward(e) {
    return Yt("id", e, Ht()), St(accessPrivateField(this, ru).sendBackward(e));
  }
  getRotation(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getRotation(e));
  }
  setRotation(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("radians", t, Ht()),
      St(accessPrivateField(this, ru).setRotation(e, t))
    );
  }
  getFlipHorizontal(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getFlip(e)).horizontal
    );
  }
  getFlipVertical(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getFlip(e)).vertical
    );
  }
  setFlipHorizontal(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("flip", t, $t()),
      St(accessPrivateField(this, ru).setFlipHorizontal(e, t))
    );
  }
  setFlipVertical(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("flip", t, $t()),
      St(accessPrivateField(this, ru).setFlipVertical(e, t))
    );
  }
  hasContentFillMode(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).hasContentFillMode(e))
    );
  }
  supportsContentFillMode(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).supportsContentFillMode(e))
    );
  }
  getWidth(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getWidth(e));
  }
  getWidthMode(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getWidthMode(e));
  }
  getHeight(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getHeight(e));
  }
  getHeightMode(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getHeightMode(e));
  }
  setWidth(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("value", t, Ht()),
      St(accessPrivateField(this, ru).setWidth(e, t))
    );
  }
  setWidthMode(e, t) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).setWidthMode(e, t))
    );
  }
  setHeight(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("value", t, Ht()),
      St(accessPrivateField(this, ru).setHeight(e, t))
    );
  }
  setHeightMode(e, t) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).setHeightMode(e, t))
    );
  }
  getFrameX(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getLastFrameX(e));
  }
  getFrameY(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getLastFrameY(e));
  }
  getFrameWidth(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getLastFrameWidth(e))
    );
  }
  getFrameHeight(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getLastFrameHeight(e))
    );
  }
  setContentFillMode(e, t) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).setContentFillMode(e, t))
    );
  }
  getContentFillMode(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getContentFillMode(e))
    );
  }
  duplicate(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).duplicate(e));
  }
  destroy(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).destroy(e));
  }
  isValid(e) {
    return Yt("id", e, qt()), accessPrivateField(this, ru).isValid(e);
  }
  getParent(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).hasParent(e))
        ? St(accessPrivateField(this, ru).getParent(e))
        : null
    );
  }
  getChildren(e) {
    Yt("id", e, qt());
    const t = St(accessPrivateField(this, ru).getChildren(e));
    return xt(t);
  }
  insertChild(e, t, r) {
    return (
      Yt("parent", e, Ht()),
      Yt("child", t, Ht()),
      Yt("index", r, Wt(Ht(), 0)),
      St(accessPrivateField(this, ru).insertChild(e, t, r))
    );
  }
  appendChild(e, t) {
    return (
      Yt("parent", e, Ht()),
      Yt("child", t, Ht()),
      St(accessPrivateField(this, ru).appendChild(e, t))
    );
  }
  referencesAnyVariables(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).referencesAnyVariables(e))
    );
  }
  getGlobalBoundingBoxX(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getGlobalBoundingBoxX(e))
    );
  }
  getGlobalBoundingBoxY(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getGlobalBoundingBoxY(e))
    );
  }
  getGlobalBoundingBoxWidth(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getGlobalBoundingBoxWidth(e))
    );
  }
  getGlobalBoundingBoxHeight(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getGlobalBoundingBoxHeight(e))
    );
  }
  getScreenSpaceBoundingBoxXYWH(e) {
    return (
      Yt("ids", e, Ut(Ht())),
      St(accessPrivateField(this, ru).getScreenSpaceBoundingBoxXYWH(e))
    );
  }
  alignHorizontally(e, t) {
    return (
      Yt("ids", e, Gt(Ut(Ht()))),
      St(accessPrivateField(this, ru).alignHorizontally(e, t))
    );
  }
  alignVertically(e, t) {
    return (
      Yt("ids", e, Gt(Ut(Ht()))),
      St(accessPrivateField(this, ru).alignVertically(e, t))
    );
  }
  isAlignable(e) {
    return (
      Yt("ids", e, Ut(Ht())), St(accessPrivateField(this, ru).isAlignable(e))
    );
  }
  distributeHorizontally(e) {
    return (
      Yt("ids", e, Gt(Ut(Ht()))),
      St(accessPrivateField(this, ru).distributeHorizontally(e))
    );
  }
  distributeVertically(e) {
    return (
      Yt("ids", e, Gt(Ut(Ht()))),
      St(accessPrivateField(this, ru).distributeVertically(e))
    );
  }
  isDistributable(e) {
    return (
      Yt("ids", e, Ut(Ht())),
      St(accessPrivateField(this, ru).isDistributable(e))
    );
  }
  fillParent(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).fillParent(e));
  }
  resizeContentAware(e, t, r) {
    return (
      Yt("ids", e, Ut(Ht())),
      Yt("width", t, Ht()),
      Yt("height", r, Ht()),
      St(accessPrivateField(this, ru).resizeContentAware(e, t, r))
    );
  }
  scale(e, t, r = 0, n = 0) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).scale(e, t, r, n))
    );
  }
  findAllProperties(e) {
    return (
      Yt("id", e, qt()),
      xt(St(accessPrivateField(this, ru).findAllProperties(e)))
    );
  }
  isPropertyReadable(e) {
    return (
      Yt("property", e, Vt()),
      accessPrivateField(this, ru).isPropertyReadable(e)
    );
  }
  isPropertyWritable(e) {
    return (
      Yt("property", e, Vt()),
      accessPrivateField(this, ru).isPropertyWritable(e)
    );
  }
  getPropertyType(e) {
    Yt("property", e, Vt());
    return St(accessPrivateField(this, ru).getPropertyType(e));
  }
  getEnumValues(e) {
    return (
      Yt("enumProperty", e, Vt()),
      xt(St(accessPrivateField(this, ru).getEnumValues(e)))
    );
  }
  setBool(e, t, r) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("value", r, $t()),
      St(accessPrivateField(this, ru).setBool(e, t, r))
    );
  }
  getBool(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).getBool(e, t))
    );
  }
  setInt(e, t, r) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("value", r, qt()),
      St(accessPrivateField(this, ru).setInt(e, t, r))
    );
  }
  getInt(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).getInt(e, t))
    );
  }
  setFloat(e, t, r) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("value", r, Ht()),
      St(accessPrivateField(this, ru).setFloat(e, t, r))
    );
  }
  getFloat(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).getFloat(e, t))
    );
  }
  setDouble(e, t, r) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("value", r, Ht()),
      St(accessPrivateField(this, ru).setDouble(e, t, r))
    );
  }
  getDouble(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).getDouble(e, t))
    );
  }
  setString(e, t, r) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("value", r, Vt()),
      St(accessPrivateField(this, ru).setString(e, t, r))
    );
  }
  getString(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).getString(e, t))
    );
  }
  setColor(e, t, r) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).setColor(e, t, nr.fromColor(r)))
    );
  }
  getColor(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      nr.toColor(St(accessPrivateField(this, ru).getColor(e, t)))
    );
  }
  setColorRGBA(e, t, r, n, o, i = 1) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("r", r, Ht()),
      Yt("g", n, Ht()),
      Yt("b", o, Ht()),
      Yt("a", i, Ht()),
      St(accessPrivateField(this, ru).setColorRGBA(e, t, r, n, o, i))
    );
  }
  getColorRGBA(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).getColorRGBA(e, t))
    );
  }
  setColorSpot(e, t, r, n = 1) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("name", r, Vt()),
      Yt("tint", n, Ht()),
      St(accessPrivateField(this, ru).setColorSpot(e, t, r, n))
    );
  }
  getColorSpotName(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).getColorSpotName(e, t))
    );
  }
  getColorSpotTint(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).getColorSpotTint(e, t))
    );
  }
  setGradientColorStops(e, t, r) {
    Yt("id", e, qt()), Yt("property", t, Vt());
    const n = r.map((e) => ({ color: nr.fromColor(e.color), stop: e.stop }));
    return St(accessPrivateField(this, ru).setGradientColorStops(e, t, n));
  }
  getGradientColorStops(e, t) {
    Yt("id", e, qt()), Yt("property", t, Vt());
    const r = St(accessPrivateField(this, ru).getGradientColorStops(e, t));
    return xt(r).map((e) => ({ color: nr.toColor(e.color), stop: e.stop }));
  }
  getSourceSet(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      xt(St(accessPrivateField(this, ru).getSourceSet(e, t)))
    );
  }
  setSourceSet(e, t, r) {
    Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("sourceSet", r, Ut(Nt({ uri: Vt(), width: Ht(), height: Ht() }))),
      St(accessPrivateField(this, ru).setSourceSet(e, t, r));
  }
  addImageFileURIToSourceSet(e, t, r) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("uri", r, Vt()),
      kt((n) =>
        accessPrivateField(this, ru).addImageFileURIToSourceSet(e, t, r, n)
      )
    );
  }
  setEnum(e, t, r) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      Yt("value", r, Vt()),
      St(accessPrivateField(this, ru).setEnum(e, t, r))
    );
  }
  getEnum(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("property", t, Vt()),
      St(accessPrivateField(this, ru).getEnum(e, t))
    );
  }
  hasCrop(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasCrop(e));
  }
  supportsCrop(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsCrop(e));
  }
  setCropScaleX(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("scaleX", t, Ht()),
      St(accessPrivateField(this, ru).setCropScaleX(e, t))
    );
  }
  setCropScaleY(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("scaleY", t, Ht()),
      St(accessPrivateField(this, ru).setCropScaleY(e, t))
    );
  }
  setCropRotation(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("rotation", t, Ht()),
      St(accessPrivateField(this, ru).setCropRotation(e, t))
    );
  }
  setCropScaleRatio(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("scaleRatio", t, Ht()),
      St(accessPrivateField(this, ru).setCropScaleRatio(e, t))
    );
  }
  setCropTranslationX(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("translationX", t, Ht()),
      St(accessPrivateField(this, ru).setCropTranslationX(e, t))
    );
  }
  setCropTranslationY(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("translationY", t, Ht()),
      St(accessPrivateField(this, ru).setCropTranslationY(e, t))
    );
  }
  resetCrop(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).resetCrop(e));
  }
  getCropScaleX(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getCropScaleX(e));
  }
  getCropScaleY(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getCropScaleY(e));
  }
  getCropRotation(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getCropRotation(e))
    );
  }
  getCropScaleRatio(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getCropScaleRatio(e))
    );
  }
  getCropTranslationX(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getCropTranslationX(e))
    );
  }
  getCropTranslationY(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getCropTranslationY(e))
    );
  }
  adjustCropToFillFrame(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("minScaleRatio", t, Ht()),
      St(accessPrivateField(this, ru).adjustCropToFillFrame(e, t))
    );
  }
  flipCropHorizontal(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).flipCropHorizontal(e))
    );
  }
  flipCropVertical(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).flipCropVertical(e))
    );
  }
  hasOpacity(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasOpacity(e));
  }
  supportsOpacity(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsOpacity(e))
    );
  }
  setOpacity(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("opacity", t, Ht()),
      St(accessPrivateField(this, ru).setOpacity(e, t))
    );
  }
  getOpacity(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getOpacity(e));
  }
  hasBlendMode(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasBlendMode(e));
  }
  supportsBlendMode(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsBlendMode(e))
    );
  }
  setBlendMode(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("blendMode", t, Vt()),
      St(accessPrivateField(this, ru).setBlendMode(e, t))
    );
  }
  getBlendMode(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getBlendMode(e));
  }
  hasFillColor(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasFillColor(e));
  }
  isIncludedInExport(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).isIncludedInExport(e))
    );
  }
  setIncludedInExport(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setIncludedInExport(e, t))
    );
  }
  setFillColorRGBA(e, t, r, n, o = 1) {
    return (
      Yt("id", e, qt()),
      Yt("r", t, Ht()),
      Yt("g", r, Ht()),
      Yt("b", n, Ht()),
      Yt("a", o, Ht()),
      St(accessPrivateField(this, ru).setFillColorRGBA(e, t, r, n, o))
    );
  }
  getFillColorRGBA(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getFillColorRGBA(e))
    );
  }
  setFillColorEnabled(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setFillColorEnabled(e, t))
    );
  }
  isFillColorEnabled(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).isFillColorEnabled(e))
    );
  }
  createEffect(e) {
    return (
      Yt("type", e, Vt()), St(accessPrivateField(this, ru).createEffect(e))
    );
  }
  hasEffects(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasEffects(e));
  }
  supportsEffects(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsEffects(e))
    );
  }
  getEffects(e) {
    Yt("id", e, qt());
    const t = St(accessPrivateField(this, ru).getEffects(e));
    return xt(t);
  }
  insertEffect(e, t, r) {
    Yt("id", e, qt()),
      Yt("effectId", t, qt()),
      Yt("index", r, Wt(qt(), 0)),
      St(accessPrivateField(this, ru).insertEffect(e, t, r));
  }
  appendEffect(e, t) {
    Yt("id", e, qt()),
      Yt("effectId", t, qt()),
      St(accessPrivateField(this, ru).appendEffect(e, t));
  }
  removeEffect(e, t) {
    Yt("id", e, qt()),
      Yt("index", t, Wt(qt(), 0)),
      St(accessPrivateField(this, ru).removeEffect(e, t));
  }
  hasEffectEnabled(e) {
    return (
      Yt("effectId", e, qt()),
      St(accessPrivateField(this, ru).hasEffectEnabled(e))
    );
  }
  setEffectEnabled(e, t) {
    Yt("effectId", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setEffectEnabled(e, t));
  }
  isEffectEnabled(e) {
    return (
      Yt("effectId", e, qt()),
      St(accessPrivateField(this, ru).isEffectEnabled(e))
    );
  }
  createBlur(e) {
    return Yt("type", e, Vt()), St(accessPrivateField(this, ru).createBlur(e));
  }
  hasBlur(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasBlur(e));
  }
  supportsBlur(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsBlur(e));
  }
  setBlur(e, t) {
    Yt("id", e, qt()),
      Yt("blurId", t, qt()),
      St(accessPrivateField(this, ru).setBlur(e, t));
  }
  getBlur(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getBlur(e));
  }
  setBlurEnabled(e, t) {
    Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setBlurEnabled(e, t));
  }
  isBlurEnabled(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).isBlurEnabled(e));
  }
  hasBackgroundColor(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).hasBackgroundColor(e))
    );
  }
  supportsBackgroundColor(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).supportsBackgroundColor(e))
    );
  }
  setBackgroundColorRGBA(e, t, r, n, o = 1) {
    return (
      Yt("id", e, qt()),
      Yt("r", t, Ht()),
      Yt("g", r, Ht()),
      Yt("b", n, Ht()),
      Yt("a", o, Ht()),
      St(accessPrivateField(this, ru).setBackgroundColorRGBA(e, t, r, n, o))
    );
  }
  getBackgroundColorRGBA(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getBackgroundColorRGBA(e))
    );
  }
  setBackgroundColorEnabled(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setBackgroundColorEnabled(e, t))
    );
  }
  isBackgroundColorEnabled(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).isBackgroundColorEnabled(e))
    );
  }
  hasStroke(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasStroke(e));
  }
  supportsStroke(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsStroke(e))
    );
  }
  setStrokeEnabled(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setStrokeEnabled(e, t))
    );
  }
  isStrokeEnabled(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).isStrokeEnabled(e))
    );
  }
  setStrokeColorRGBA(e, t, r, n, o = 1) {
    return (
      Yt("id", e, qt()),
      Yt("r", t, Ht()),
      Yt("g", r, Ht()),
      Yt("b", n, Ht()),
      Yt("a", o, Ht()),
      St(accessPrivateField(this, ru).setStrokeColorRGBA(e, t, r, n, o))
    );
  }
  setStrokeColor(e, t) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).setStrokeColor(e, nr.fromColor(t)))
    );
  }
  getStrokeColorRGBA(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getStrokeColorRGBA(e))
    );
  }
  getStrokeColor(e) {
    return (
      Yt("id", e, qt()),
      nr.toColor(St(accessPrivateField(this, ru).getStrokeColor(e)))
    );
  }
  setStrokeWidth(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("width", t, Ht()),
      St(accessPrivateField(this, ru).setStrokeWidth(e, t))
    );
  }
  getStrokeWidth(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getStrokeWidth(e))
    );
  }
  setStrokeStyle(e, t) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).setStrokeStyle(e, t))
    );
  }
  getStrokeStyle(e) {
    Yt("id", e, qt());
    return St(accessPrivateField(this, ru).getStrokeStyle(e));
  }
  setStrokePosition(e, t) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).setStrokePosition(e, t))
    );
  }
  getStrokePosition(e) {
    Yt("id", e, qt());
    return St(accessPrivateField(this, ru).getStrokePosition(e));
  }
  setStrokeCornerGeometry(e, t) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).setStrokeCornerGeometry(e, t))
    );
  }
  getStrokeCornerGeometry(e) {
    Yt("id", e, qt());
    return St(accessPrivateField(this, ru).getStrokeCornerGeometry(e));
  }
  hasDropShadow(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasDropShadow(e));
  }
  supportsDropShadow(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsDropShadow(e))
    );
  }
  setDropShadowEnabled(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setDropShadowEnabled(e, t))
    );
  }
  isDropShadowEnabled(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).isDropShadowEnabled(e))
    );
  }
  setDropShadowColorRGBA(e, t, r, n, o = 1) {
    return (
      Yt("id", e, qt()),
      Yt("r", t, Ht()),
      Yt("g", r, Ht()),
      Yt("b", n, Ht()),
      Yt("a", o, Ht()),
      St(accessPrivateField(this, ru).setDropShadowColorRGBA(e, t, r, n, o))
    );
  }
  setDropShadowColor(e, t) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).setDropShadowColor(e, nr.fromColor(t)))
    );
  }
  getDropShadowColorRGBA(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getDropShadowColorRGBA(e))
    );
  }
  getDropShadowColor(e) {
    return (
      Yt("id", e, qt()),
      nr.toColor(St(accessPrivateField(this, ru).getDropShadowColor(e)))
    );
  }
  setDropShadowOffsetX(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("offsetX", t, Ht()),
      St(accessPrivateField(this, ru).setDropShadowOffsetX(e, t))
    );
  }
  getDropShadowOffsetX(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getDropShadowOffsetX(e))
    );
  }
  setDropShadowOffsetY(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("offsetY", t, Ht()),
      St(accessPrivateField(this, ru).setDropShadowOffsetY(e, t))
    );
  }
  getDropShadowOffsetY(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getDropShadowOffsetY(e))
    );
  }
  setDropShadowBlurRadiusX(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("blurRadiusX", t, Ht()),
      St(accessPrivateField(this, ru).setDropShadowBlurRadiusX(e, t))
    );
  }
  getDropShadowBlurRadiusX(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getDropShadowBlurRadiusX(e))
    );
  }
  setDropShadowBlurRadiusY(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("blurRadiusY", t, Ht()),
      St(accessPrivateField(this, ru).setDropShadowBlurRadiusY(e, t))
    );
  }
  getDropShadowBlurRadiusY(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getDropShadowBlurRadiusY(e))
    );
  }
  setDropShadowClip(e, t) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).setDropShadowClip(e, t))
    );
  }
  getDropShadowClip(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getDropShadowClip(e))
    );
  }
  createCutoutFromBlocks(e, t = 2, r = 4) {
    return (
      Yt("ids", e, Ut(qt())),
      Yt("vectorizeDistanceThreshold", t, Ht()),
      Yt("maxSmoothingDistance", r, Ht()),
      St(accessPrivateField(this, ru).createCutoutFromBlocks(e, t, r))
    );
  }
  createCutoutFromPath(e) {
    return (
      Yt("path", e, Vt()),
      St(accessPrivateField(this, ru).createCutoutFromPath(e))
    );
  }
  createCutoutFromOperation(e, t) {
    return (
      Yt("ids", e, Ut(qt())),
      Yt(
        "op",
        t,
        (function () {
          const e = ["Difference", "Intersection", "Union", "XOR"];
          return jt(
            "CutoutOperation",
            (t) =>
              !("string" != typeof t || !e.includes(t)) || {
                message: `expected one of ${e
                  .map((e) => `"${e}"`)
                  .join(", ")}, but got "${t}"`,
              }
          );
        })()
      ),
      St(accessPrivateField(this, ru).createCutoutFromOperation(e, t))
    );
  }
  replaceText(e, t, r = -1, n = -1) {
    Yt("id", e, qt()),
      Yt("text", t, Vt()),
      Yt("from", r, qt()),
      Yt("to", n, qt()),
      St(accessPrivateField(this, ru).replaceText(e, t, r, n));
  }
  removeText(e, t = -1, r = -1) {
    Yt("id", e, qt()),
      Yt("from", t, qt()),
      Yt("to", r, qt()),
      St(accessPrivateField(this, ru).removeText(e, t, r));
  }
  setTextColor(e, t, r = -1, n = -1) {
    Yt("id", e, qt()),
      Yt("from", r, qt()),
      Yt("to", n, qt()),
      St(accessPrivateField(this, ru).setTextColor(e, nr.fromColor(t), r, n));
  }
  getTextColors(e, t = -1, r = -1) {
    Yt("id", e, qt()), Yt("from", t, qt()), Yt("to", r, qt());
    const n = accessPrivateField(this, ru).getTextColors(e, t, r);
    return xt(St(n)).map((e) => nr.toColor(e));
  }
  getTextFontWeights(e, t = -1, r = -1) {
    return (
      Yt("id", e, qt()),
      Yt("from", t, qt()),
      Yt("to", r, qt()),
      xt(St(accessPrivateField(this, ru).getTextFontWeights(e, t, r)))
    );
  }
  getTextFontStyles(e, t = -1, r = -1) {
    return (
      Yt("id", e, qt()),
      Yt("from", t, qt()),
      Yt("to", r, qt()),
      xt(St(accessPrivateField(this, ru).getTextFontStyles(e, t, r)))
    );
  }
  getTextCases(e, t = -1, r = -1) {
    return (
      Yt("id", e, qt()),
      Yt("from", t, qt()),
      Yt("to", r, qt()),
      xt(St(accessPrivateField(this, ru).getTextCases(e, t, r)))
    );
  }
  setTextCase(e, t, r = -1, n = -1) {
    Yt("id", e, qt()),
      Yt("textCase", t, Vt()),
      Yt("from", r, qt()),
      Yt("to", n, qt()),
      St(accessPrivateField(this, ru).setTextCase(e, t, r, n));
  }
  canToggleBoldFont(e, t = -1, r = -1) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).canToggleBoldFont(e, t, r))
    );
  }
  canToggleItalicFont(e, t = -1, r = -1) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).canToggleItalicFont(e, t, r))
    );
  }
  toggleBoldFont(e, t = -1, r = -1) {
    Yt("id", e, qt()), St(accessPrivateField(this, ru).toggleBoldFont(e, t, r));
  }
  toggleItalicFont(e, t = -1, r = -1) {
    Yt("id", e, qt()),
      St(accessPrivateField(this, ru).toggleItalicFont(e, t, r));
  }
  setFont(e, t, r) {
    Yt("block", e, qt()),
      Yt("fontFileUri", t, Vt()),
      St(accessPrivateField(this, ru).setFont(e, t, r));
  }
  setTypeface(e, t, r) {
    Yt("block", e, qt()),
      Yt("fontFileUri", t, Vt()),
      St(accessPrivateField(this, ru).setTypeface(e, t, r));
  }
  getTypeface(e) {
    return (
      Yt("block", e, qt()), St(accessPrivateField(this, ru).getTypeface(e))
    );
  }
  getTextCursorRange() {
    return St(accessPrivateField(this, ru).getTextCursorRange());
  }
  hasFill(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasFill(e));
  }
  supportsFill(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsFill(e));
  }
  isFillEnabled(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).isFillEnabled(e));
  }
  setFillEnabled(e, t) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).setFillEnabled(e, t))
    );
  }
  getFill(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getFill(e));
  }
  setFill(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("fill", t, qt()),
      St(accessPrivateField(this, ru).setFill(e, t))
    );
  }
  setFillSolidColor(e, t, r, n, o = 1) {
    Yt("id", e, qt()),
      St(accessPrivateField(this, ru).setFillSolidColor(e, t, r, n, o));
  }
  getFillSolidColor(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getFillSolidColor(e))
    );
  }
  setPlaceholderEnabled(e, t) {
    Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setPlaceholderEnabled(e, t));
  }
  isPlaceholderEnabled(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).isPlaceholderEnabled(e))
    );
  }
  hasPlaceholderBehavior(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).hasPlaceholderBehavior(e))
    );
  }
  supportsPlaceholderBehavior(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).supportsPlaceholderBehavior(e))
    );
  }
  setPlaceholderBehaviorEnabled(e, t) {
    Yt("id", e, qt()),
      St(accessPrivateField(this, ru).setPlaceholderBehaviorEnabled(e, t));
  }
  isPlaceholderBehaviorEnabled(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).isPlaceholderBehaviorEnabled(e))
    );
  }
  hasPlaceholderControls(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).hasPlaceholderControls(e))
    );
  }
  supportsPlaceholderControls(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).supportsPlaceholderControls(e))
    );
  }
  setPlaceholderControlsOverlayEnabled(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(
        accessPrivateField(this, ru).setPlaceholderControlsOverlayEnabled(e, t)
      )
    );
  }
  isPlaceholderControlsOverlayEnabled(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).isPlaceholderControlsOverlayEnabled(e))
    );
  }
  setPlaceholderControlsButtonEnabled(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setPlaceholderControlsButtonEnabled(e, t))
    );
  }
  isPlaceholderControlsButtonEnabled(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).isPlaceholderControlsButtonEnabled(e))
    );
  }
  setMetadata(e, t, r) {
    Yt("id", e, qt()),
      Yt("key", t, Vt()),
      Yt("value", r, Vt()),
      St(accessPrivateField(this, ru).setMetadata(e, t, r));
  }
  getMetadata(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("key", t, Vt()),
      St(accessPrivateField(this, ru).getMetadata(e, t))
    );
  }
  hasMetadata(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("key", t, Vt()),
      St(accessPrivateField(this, ru).hasMetadata(e, t))
    );
  }
  findAllMetadata(e) {
    return (
      Yt("id", e, qt()), xt(St(accessPrivateField(this, ru).findAllMetadata(e)))
    );
  }
  removeMetadata(e, t) {
    Yt("id", e, qt()),
      Yt("key", t, Vt()),
      St(accessPrivateField(this, ru).removeMetadata(e, t));
  }
  setScopeEnabled(e, t, r) {
    Yt("id", e, qt()),
      Yt("key", t, Vt()),
      Yt("enabled", r, $t()),
      St(accessPrivateField(this, ru).setScopeEnabled(e, t, r));
  }
  isScopeEnabled(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("key", t, Vt()),
      St(accessPrivateField(this, ru).isScopeEnabled(e, t))
    );
  }
  isAllowedByScope(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("key", t, Vt()),
      St(accessPrivateField(this, ru).isAllowedByScope(e, t))
    );
  }
  hasDuration(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasDuration(e));
  }
  supportsDuration(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsDuration(e))
    );
  }
  setDuration(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("duration", t, Ht()),
      St(accessPrivateField(this, ru).setDuration(e, t))
    );
  }
  getDuration(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getDuration(e));
  }
  hasTimeOffset(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasTimeOffset(e));
  }
  supportsTimeOffset(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsTimeOffset(e))
    );
  }
  setTimeOffset(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("offset", t, Ht()),
      St(accessPrivateField(this, ru).setTimeOffset(e, t))
    );
  }
  getTimeOffset(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getTimeOffset(e));
  }
  hasTrim(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).hasTrim(e));
  }
  supportsTrim(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsTrim(e));
  }
  setTrimOffset(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("offset", t, Ht()),
      St(accessPrivateField(this, ru).setTrimOffset(e, t))
    );
  }
  getTrimOffset(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getTrimOffset(e));
  }
  setTrimLength(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("length", t, Ht()),
      St(accessPrivateField(this, ru).setTrimLength(e, t))
    );
  }
  getTrimLength(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getTrimLength(e));
  }
  getTotalSceneDuration(e) {
    return (
      Yt("scene", e, qt()),
      St(accessPrivateField(this, ru).getTotalSceneDuration(e))
    );
  }
  setPlaying(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setPlaying(e, t))
    );
  }
  isPlaying(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).isPlaying(e));
  }
  hasPlaybackTime(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).hasPlaybackTime(e))
    );
  }
  supportsPlaybackTime(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).supportsPlaybackTime(e))
    );
  }
  setPlaybackTime(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("time", t, Ht()),
      St(accessPrivateField(this, ru).setPlaybackTime(e, t))
    );
  }
  getPlaybackTime(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getPlaybackTime(e))
    );
  }
  isVisibleAtCurrentPlaybackTime(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).isVisibleAtCurrentPlaybackTime(e))
    );
  }
  setSoloPlaybackEnabled(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("enabled", t, $t()),
      St(accessPrivateField(this, ru).setSoloPlaybackEnabled(e, t))
    );
  }
  isSoloPlaybackEnabled(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).isSoloPlaybackEnabled(e))
    );
  }
  hasPlaybackControl(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).hasPlaybackControl(e))
    );
  }
  supportsPlaybackControl(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).supportsPlaybackControl(e))
    );
  }
  setLooping(e, t) {
    Yt("id", e, qt()),
      Yt("looping", t, $t()),
      St(accessPrivateField(this, ru).setLooping(e, t));
  }
  isLooping(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).isLooping(e));
  }
  setMuted(e, t) {
    Yt("id", e, qt()),
      Yt("muted", t, $t()),
      St(accessPrivateField(this, ru).setMuted(e, t));
  }
  isMuted(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).isMuted(e));
  }
  setVolume(e, t) {
    Yt("id", e, qt()),
      Yt("volume", t, Ht()),
      St(accessPrivateField(this, ru).setVolume(e, t));
  }
  getVolume(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getVolume(e));
  }
  async forceLoadAVResource(e) {
    return (
      Yt("id", e, qt()),
      kt((t) => accessPrivateField(this, ru).forceLoadAVResource(e, t))
    );
  }
  unstable_isAVResourceLoaded(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).unstable_isAVResourceLoaded(e))
    );
  }
  getAVResourceTotalDuration(e) {
    return (
      Yt("id", e, qt()),
      St(accessPrivateField(this, ru).getAVResourceTotalDuration(e))
    );
  }
  getVideoWidth(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getVideoWidth(e));
  }
  getVideoHeight(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getVideoHeight(e))
    );
  }
  generateVideoThumbnailSequence(e, t, r, n, o, i) {
    Yt("id", e, qt()),
      Yt("thumbnailHeight", t, qt()),
      Yt("timeBegin", r, Ht()),
      Yt("timeEnd", n, Ht()),
      Yt("numberOfFrames", o, qt());
    const a = accessPrivateField(this, ru).generateVideoThumbnailSequence(
      e,
      t,
      r,
      n,
      o,
      (e) => {
        "error" in e
          ? i(0, new Error(e.error))
          : i(
              e.frameIndex,
              new ImageData(
                new Uint8ClampedArray(e.imageData),
                e.width,
                e.height
              )
            );
      }
    );
    return () => {
      accessPrivateField(this, ru).cancelVideoThumbnailSequenceGeneration(a);
    };
  }
  generateAudioThumbnailSequence(e, t, r, n, o, i, a) {
    Yt("id", e, qt()),
      Yt("samplesPerChunk", t, qt()),
      Yt("timeBegin", r, Ht()),
      Yt("timeEnd", n, Ht()),
      Yt("numberOfSamples", o, qt()),
      Yt("numberOfChannels", i, qt());
    const s = accessPrivateField(this, ru).generateAudioThumbnailSequence(
      e,
      t,
      r,
      n,
      o,
      i,
      (e) => {
        "error" in e ? a(0, new Error(e.error)) : a(e.chunkIndex, e.sampleData);
      }
    );
    return () => {
      accessPrivateField(this, ru).cancelAudioThumbnailSequenceGeneration(s);
    };
  }
  async getVideoFillThumbnail(e, t) {
    return (
      Yt("id", e, qt()),
      Yt("thumbnailHeight", t, qt()),
      new Promise((r, n) => {
        accessPrivateField(this, ru).getVideoFillThumbnail(e, t, (e) => {
          "error" in e ? n(e.error) : r(new ou([e], { type: "image/jpeg" }));
        });
      })
    );
  }
  async getVideoFillThumbnailAtlas(e, t, r, n) {
    return (
      Yt("id", e, qt()),
      Yt("numberOfColumns", t, qt()),
      Yt("numberOfRows", r, qt()),
      Yt("thumbnailHeight", n, qt()),
      new Promise((o, i) => {
        accessPrivateField(this, ru).getVideoFillThumbnailAtlas(
          e,
          t,
          r,
          n,
          (e) => {
            "error" in e ? i(e.error) : o(new ou([e], { type: "image/jpeg" }));
          }
        );
      })
    );
  }
  async getPageThumbnailAtlas(e, t, r, n) {
    return (
      Yt("id", e, qt()),
      Yt("numberOfColumns", t, qt()),
      Yt("numberOfRows", r, qt()),
      new Promise((o, i) => {
        accessPrivateField(this, ru).getPageThumbnailAtlas(e, t, r, n, (e) => {
          "error" in e ? i(e.error) : o(new ou([e], { type: "image/jpeg" }));
        });
      })
    );
  }
  createAnimation(e) {
    return (
      Yt("type", e, Vt()), St(accessPrivateField(this, ru).createAnimation(e))
    );
  }
  supportsAnimation(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).supportsAnimation(e))
    );
  }
  setInAnimation(e, t) {
    Yt("id", e, qt()),
      Yt("animation", t, qt()),
      St(accessPrivateField(this, ru).setInAnimation(e, t));
  }
  setLoopAnimation(e, t) {
    Yt("id", e, qt()),
      Yt("animation", t, qt()),
      St(accessPrivateField(this, ru).setLoopAnimation(e, t));
  }
  setOutAnimation(e, t) {
    Yt("id", e, qt()),
      Yt("animation", t, qt()),
      St(accessPrivateField(this, ru).setOutAnimation(e, t));
  }
  getInAnimation(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getInAnimation(e))
    );
  }
  getLoopAnimation(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getLoopAnimation(e))
    );
  }
  getOutAnimation(e) {
    return (
      Yt("id", e, qt()), St(accessPrivateField(this, ru).getOutAnimation(e))
    );
  }
  setNativePixelBuffer(e, t) {
    Yt("id", e, qt()),
      t instanceof HTMLVideoElement &&
        ((t.width = t.videoWidth), (t.height = t.videoHeight)),
      St(accessPrivateField(this, ru).setNativePixelBuffer(e, t));
  }
  getState(e) {
    return Yt("id", e, qt()), St(accessPrivateField(this, ru).getState(e));
  }
  setState(e, t) {
    Yt("id", e, qt()), St(accessPrivateField(this, ru).setState(e, t));
  }
  async forceLoadResources(e) {
    return (
      Yt("ids", e, Ut(qt())),
      kt((t) => accessPrivateField(this, ru).forceLoadResources(e, t))
    );
  }
};
(nu = createMetadataArray(null)),
  (ru = new WeakMap()),
  defineMember(nu, 1, "loadFromString", tu, BlockAPI),
  defineMember(nu, 1, "loadFromArchiveURL", eu, BlockAPI),
  defineMember(nu, 1, "create", Js, BlockAPI),
  defineMember(nu, 1, "createFill", Qs, BlockAPI),
  defineMember(nu, 1, "getType", Zs, BlockAPI),
  defineMember(nu, 1, "getKind", Ks, BlockAPI),
  defineMember(nu, 1, "setKind", Ys, BlockAPI),
  defineMember(nu, 1, "select", Xs, BlockAPI),
  defineMember(nu, 1, "setSelected", Gs, BlockAPI),
  defineMember(nu, 1, "isSelected", Ws, BlockAPI),
  defineMember(nu, 1, "findAllSelected", zs, BlockAPI),
  defineMember(nu, 1, "isGroupable", Vs, BlockAPI),
  defineMember(nu, 1, "group", Ns, BlockAPI),
  defineMember(nu, 1, "ungroup", Hs, BlockAPI),
  defineMember(nu, 1, "enterGroup", qs, BlockAPI),
  defineMember(nu, 1, "exitGroup", $s, BlockAPI),
  defineMember(nu, 1, "isCombinable", Us, BlockAPI),
  defineMember(nu, 1, "combine", js, BlockAPI),
  defineMember(nu, 1, "setName", Is, BlockAPI),
  defineMember(nu, 1, "getName", Os, BlockAPI),
  defineMember(nu, 1, "getUUID", Ms, BlockAPI),
  defineMember(nu, 1, "findByName", Ds, BlockAPI),
  defineMember(nu, 1, "findByType", Bs, BlockAPI),
  defineMember(nu, 1, "findByKind", Rs, BlockAPI),
  defineMember(nu, 1, "findAll", Ls, BlockAPI),
  defineMember(nu, 1, "findAllPlaceholders", Fs, BlockAPI),
  defineMember(nu, 1, "createShape", Ps, BlockAPI),
  defineMember(nu, 1, "hasShape", As, BlockAPI),
  defineMember(nu, 1, "supportsShape", Ts, BlockAPI),
  defineMember(nu, 1, "getShape", xs, BlockAPI),
  defineMember(nu, 1, "setShape", ks, BlockAPI),
  defineMember(nu, 1, "isVisible", Ss, BlockAPI),
  defineMember(nu, 1, "setVisible", Cs, BlockAPI),
  defineMember(nu, 1, "isClipped", Es, BlockAPI),
  defineMember(nu, 1, "setClipped", _s, BlockAPI),
  defineMember(nu, 1, "isTransformLocked", ws, BlockAPI),
  defineMember(nu, 1, "setTransformLocked", bs, BlockAPI),
  defineMember(nu, 1, "getPositionX", ys, BlockAPI),
  defineMember(nu, 1, "getPositionXMode", vs, BlockAPI),
  defineMember(nu, 1, "getPositionY", gs, BlockAPI),
  defineMember(nu, 1, "getPositionYMode", ms, BlockAPI),
  defineMember(nu, 1, "setPositionX", ps, BlockAPI),
  defineMember(nu, 1, "setPositionXMode", fs, BlockAPI),
  defineMember(nu, 1, "setPositionY", hs, BlockAPI),
  defineMember(nu, 1, "setPositionYMode", ds, BlockAPI),
  defineMember(nu, 1, "setAlwaysOnTop", ls, BlockAPI),
  defineMember(nu, 1, "setAlwaysOnBottom", cs, BlockAPI),
  defineMember(nu, 1, "isAlwaysOnTop", us, BlockAPI),
  defineMember(nu, 1, "isAlwaysOnBottom", ss, BlockAPI),
  defineMember(nu, 1, "bringToFront", as, BlockAPI),
  defineMember(nu, 1, "sendToBack", is, BlockAPI),
  defineMember(nu, 1, "bringForward", os, BlockAPI),
  defineMember(nu, 1, "sendBackward", ns, BlockAPI),
  defineMember(nu, 1, "getRotation", rs, BlockAPI),
  defineMember(nu, 1, "setRotation", ts, BlockAPI),
  defineMember(nu, 1, "getFlipHorizontal", es, BlockAPI),
  defineMember(nu, 1, "getFlipVertical", Ja, BlockAPI),
  defineMember(nu, 1, "setFlipHorizontal", Qa, BlockAPI),
  defineMember(nu, 1, "setFlipVertical", Za, BlockAPI),
  defineMember(nu, 1, "hasContentFillMode", Ka, BlockAPI),
  defineMember(nu, 1, "supportsContentFillMode", Ya, BlockAPI),
  defineMember(nu, 1, "getWidth", Xa, BlockAPI),
  defineMember(nu, 1, "getWidthMode", Ga, BlockAPI),
  defineMember(nu, 1, "getHeight", Wa, BlockAPI),
  defineMember(nu, 1, "getHeightMode", za, BlockAPI),
  defineMember(nu, 1, "setWidth", Va, BlockAPI),
  defineMember(nu, 1, "setWidthMode", Na, BlockAPI),
  defineMember(nu, 1, "setHeight", Ha, BlockAPI),
  defineMember(nu, 1, "setHeightMode", qa, BlockAPI),
  defineMember(nu, 1, "getFrameX", $a, BlockAPI),
  defineMember(nu, 1, "getFrameY", Ua, BlockAPI),
  defineMember(nu, 1, "getFrameWidth", ja, BlockAPI),
  defineMember(nu, 1, "getFrameHeight", Ia, BlockAPI),
  defineMember(nu, 1, "setContentFillMode", Oa, BlockAPI),
  defineMember(nu, 1, "getContentFillMode", Ma, BlockAPI),
  defineMember(nu, 1, "duplicate", Da, BlockAPI),
  defineMember(nu, 1, "destroy", Ba, BlockAPI),
  defineMember(nu, 1, "isValid", Ra, BlockAPI),
  defineMember(nu, 1, "getParent", La, BlockAPI),
  defineMember(nu, 1, "getChildren", Fa, BlockAPI),
  defineMember(nu, 1, "insertChild", Pa, BlockAPI),
  defineMember(nu, 1, "appendChild", Aa, BlockAPI),
  defineMember(nu, 1, "referencesAnyVariables", Ta, BlockAPI),
  defineMember(nu, 1, "getGlobalBoundingBoxX", xa, BlockAPI),
  defineMember(nu, 1, "getGlobalBoundingBoxY", ka, BlockAPI),
  defineMember(nu, 1, "getGlobalBoundingBoxWidth", Sa, BlockAPI),
  defineMember(nu, 1, "getGlobalBoundingBoxHeight", Ca, BlockAPI),
  defineMember(nu, 1, "getScreenSpaceBoundingBoxXYWH", Ea, BlockAPI),
  defineMember(nu, 1, "alignHorizontally", _a, BlockAPI),
  defineMember(nu, 1, "alignVertically", wa, BlockAPI),
  defineMember(nu, 1, "isAlignable", ba, BlockAPI),
  defineMember(nu, 1, "distributeHorizontally", ya, BlockAPI),
  defineMember(nu, 1, "distributeVertically", va, BlockAPI),
  defineMember(nu, 1, "isDistributable", ga, BlockAPI),
  defineMember(nu, 1, "fillParent", ma, BlockAPI),
  defineMember(nu, 1, "resizeContentAware", pa, BlockAPI),
  defineMember(nu, 1, "scale", fa, BlockAPI),
  defineMember(nu, 1, "findAllProperties", ha, BlockAPI),
  defineMember(nu, 1, "isPropertyReadable", da, BlockAPI),
  defineMember(nu, 1, "isPropertyWritable", la, BlockAPI),
  defineMember(nu, 1, "getPropertyType", ca, BlockAPI),
  defineMember(nu, 1, "getEnumValues", ua, BlockAPI),
  defineMember(nu, 1, "setBool", sa, BlockAPI),
  defineMember(nu, 1, "getBool", aa, BlockAPI),
  defineMember(nu, 1, "setInt", ia, BlockAPI),
  defineMember(nu, 1, "getInt", oa, BlockAPI),
  defineMember(nu, 1, "setFloat", na, BlockAPI),
  defineMember(nu, 1, "getFloat", ra, BlockAPI),
  defineMember(nu, 1, "setDouble", ta, BlockAPI),
  defineMember(nu, 1, "getDouble", ea, BlockAPI),
  defineMember(nu, 1, "setString", Ji, BlockAPI),
  defineMember(nu, 1, "getString", Qi, BlockAPI),
  defineMember(nu, 1, "setColor", Zi, BlockAPI),
  defineMember(nu, 1, "getColor", Ki, BlockAPI),
  defineMember(nu, 1, "setColorRGBA", Yi, BlockAPI),
  defineMember(nu, 1, "getColorRGBA", Xi, BlockAPI),
  defineMember(nu, 1, "setColorSpot", Gi, BlockAPI),
  defineMember(nu, 1, "getColorSpotName", Wi, BlockAPI),
  defineMember(nu, 1, "getColorSpotTint", zi, BlockAPI),
  defineMember(nu, 1, "setGradientColorStops", Vi, BlockAPI),
  defineMember(nu, 1, "getGradientColorStops", Ni, BlockAPI),
  defineMember(nu, 1, "getSourceSet", Hi, BlockAPI),
  defineMember(nu, 1, "setSourceSet", qi, BlockAPI),
  defineMember(nu, 1, "addImageFileURIToSourceSet", $i, BlockAPI),
  defineMember(nu, 1, "setEnum", Ui, BlockAPI),
  defineMember(nu, 1, "getEnum", ji, BlockAPI),
  defineMember(nu, 1, "hasCrop", Ii, BlockAPI),
  defineMember(nu, 1, "supportsCrop", Oi, BlockAPI),
  defineMember(nu, 1, "setCropScaleX", Mi, BlockAPI),
  defineMember(nu, 1, "setCropScaleY", Di, BlockAPI),
  defineMember(nu, 1, "setCropRotation", Bi, BlockAPI),
  defineMember(nu, 1, "setCropScaleRatio", Ri, BlockAPI),
  defineMember(nu, 1, "setCropTranslationX", Li, BlockAPI),
  defineMember(nu, 1, "setCropTranslationY", Fi, BlockAPI),
  defineMember(nu, 1, "resetCrop", Pi, BlockAPI),
  defineMember(nu, 1, "getCropScaleX", Ai, BlockAPI),
  defineMember(nu, 1, "getCropScaleY", Ti, BlockAPI),
  defineMember(nu, 1, "getCropRotation", xi, BlockAPI),
  defineMember(nu, 1, "getCropScaleRatio", ki, BlockAPI),
  defineMember(nu, 1, "getCropTranslationX", Si, BlockAPI),
  defineMember(nu, 1, "getCropTranslationY", Ci, BlockAPI),
  defineMember(nu, 1, "adjustCropToFillFrame", Ei, BlockAPI),
  defineMember(nu, 1, "flipCropHorizontal", _i, BlockAPI),
  defineMember(nu, 1, "flipCropVertical", wi, BlockAPI),
  defineMember(nu, 1, "hasOpacity", bi, BlockAPI),
  defineMember(nu, 1, "supportsOpacity", yi, BlockAPI),
  defineMember(nu, 1, "setOpacity", vi, BlockAPI),
  defineMember(nu, 1, "getOpacity", gi, BlockAPI),
  defineMember(nu, 1, "hasBlendMode", mi, BlockAPI),
  defineMember(nu, 1, "supportsBlendMode", pi, BlockAPI),
  defineMember(nu, 1, "setBlendMode", fi, BlockAPI),
  defineMember(nu, 1, "getBlendMode", hi, BlockAPI),
  defineMember(nu, 1, "hasFillColor", di, BlockAPI),
  defineMember(nu, 1, "isIncludedInExport", li, BlockAPI),
  defineMember(nu, 1, "setIncludedInExport", ci, BlockAPI),
  defineMember(nu, 1, "setFillColorRGBA", ui, BlockAPI),
  defineMember(nu, 1, "getFillColorRGBA", si, BlockAPI),
  defineMember(nu, 1, "setFillColorEnabled", ai, BlockAPI),
  defineMember(nu, 1, "isFillColorEnabled", ii, BlockAPI),
  defineMember(nu, 1, "createEffect", oi, BlockAPI),
  defineMember(nu, 1, "hasEffects", ni, BlockAPI),
  defineMember(nu, 1, "supportsEffects", ri, BlockAPI),
  defineMember(nu, 1, "getEffects", ti, BlockAPI),
  defineMember(nu, 1, "insertEffect", ei, BlockAPI),
  defineMember(nu, 1, "appendEffect", Jo, BlockAPI),
  defineMember(nu, 1, "removeEffect", Qo, BlockAPI),
  defineMember(nu, 1, "hasEffectEnabled", Zo, BlockAPI),
  defineMember(nu, 1, "setEffectEnabled", Ko, BlockAPI),
  defineMember(nu, 1, "isEffectEnabled", Yo, BlockAPI),
  defineMember(nu, 1, "createBlur", Xo, BlockAPI),
  defineMember(nu, 1, "hasBlur", Go, BlockAPI),
  defineMember(nu, 1, "supportsBlur", Wo, BlockAPI),
  defineMember(nu, 1, "setBlur", zo, BlockAPI),
  defineMember(nu, 1, "getBlur", Vo, BlockAPI),
  defineMember(nu, 1, "setBlurEnabled", No, BlockAPI),
  defineMember(nu, 1, "isBlurEnabled", Ho, BlockAPI),
  defineMember(nu, 1, "hasBackgroundColor", qo, BlockAPI),
  defineMember(nu, 1, "supportsBackgroundColor", $o, BlockAPI),
  defineMember(nu, 1, "setBackgroundColorRGBA", Uo, BlockAPI),
  defineMember(nu, 1, "getBackgroundColorRGBA", jo, BlockAPI),
  defineMember(nu, 1, "setBackgroundColorEnabled", Io, BlockAPI),
  defineMember(nu, 1, "isBackgroundColorEnabled", Oo, BlockAPI),
  defineMember(nu, 1, "hasStroke", Mo, BlockAPI),
  defineMember(nu, 1, "supportsStroke", Do, BlockAPI),
  defineMember(nu, 1, "setStrokeEnabled", Bo, BlockAPI),
  defineMember(nu, 1, "isStrokeEnabled", Ro, BlockAPI),
  defineMember(nu, 1, "setStrokeColorRGBA", Lo, BlockAPI),
  defineMember(nu, 1, "setStrokeColor", Fo, BlockAPI),
  defineMember(nu, 1, "getStrokeColorRGBA", Po, BlockAPI),
  defineMember(nu, 1, "getStrokeColor", Ao, BlockAPI),
  defineMember(nu, 1, "setStrokeWidth", To, BlockAPI),
  defineMember(nu, 1, "getStrokeWidth", xo, BlockAPI),
  defineMember(nu, 1, "setStrokeStyle", ko, BlockAPI),
  defineMember(nu, 1, "getStrokeStyle", So, BlockAPI),
  defineMember(nu, 1, "setStrokePosition", Co, BlockAPI),
  defineMember(nu, 1, "getStrokePosition", Eo, BlockAPI),
  defineMember(nu, 1, "setStrokeCornerGeometry", _o, BlockAPI),
  defineMember(nu, 1, "getStrokeCornerGeometry", wo, BlockAPI),
  defineMember(nu, 1, "hasDropShadow", bo, BlockAPI),
  defineMember(nu, 1, "supportsDropShadow", yo, BlockAPI),
  defineMember(nu, 1, "setDropShadowEnabled", vo, BlockAPI),
  defineMember(nu, 1, "isDropShadowEnabled", go, BlockAPI),
  defineMember(nu, 1, "setDropShadowColorRGBA", mo, BlockAPI),
  defineMember(nu, 1, "setDropShadowColor", po, BlockAPI),
  defineMember(nu, 1, "getDropShadowColorRGBA", fo, BlockAPI),
  defineMember(nu, 1, "getDropShadowColor", ho, BlockAPI),
  defineMember(nu, 1, "setDropShadowOffsetX", lo, BlockAPI),
  defineMember(nu, 1, "getDropShadowOffsetX", co, BlockAPI),
  defineMember(nu, 1, "setDropShadowOffsetY", uo, BlockAPI),
  defineMember(nu, 1, "getDropShadowOffsetY", so, BlockAPI),
  defineMember(nu, 1, "setDropShadowBlurRadiusX", ao, BlockAPI),
  defineMember(nu, 1, "getDropShadowBlurRadiusX", io, BlockAPI),
  defineMember(nu, 1, "setDropShadowBlurRadiusY", oo, BlockAPI),
  defineMember(nu, 1, "getDropShadowBlurRadiusY", no, BlockAPI),
  defineMember(nu, 1, "setDropShadowClip", ro, BlockAPI),
  defineMember(nu, 1, "getDropShadowClip", to, BlockAPI),
  defineMember(nu, 1, "createCutoutFromBlocks", eo, BlockAPI),
  defineMember(nu, 1, "createCutoutFromPath", Jn, BlockAPI),
  defineMember(nu, 1, "createCutoutFromOperation", Qn, BlockAPI),
  defineMember(nu, 1, "replaceText", Zn, BlockAPI),
  defineMember(nu, 1, "removeText", Kn, BlockAPI),
  defineMember(nu, 1, "setTextColor", Yn, BlockAPI),
  defineMember(nu, 1, "getTextColors", Xn, BlockAPI),
  defineMember(nu, 1, "getTextFontWeights", Gn, BlockAPI),
  defineMember(nu, 1, "getTextFontStyles", Wn, BlockAPI),
  defineMember(nu, 1, "getTextCases", zn, BlockAPI),
  defineMember(nu, 1, "setTextCase", Vn, BlockAPI),
  defineMember(nu, 1, "canToggleBoldFont", Nn, BlockAPI),
  defineMember(nu, 1, "canToggleItalicFont", Hn, BlockAPI),
  defineMember(nu, 1, "toggleBoldFont", qn, BlockAPI),
  defineMember(nu, 1, "toggleItalicFont", $n, BlockAPI),
  defineMember(nu, 1, "setFont", Un, BlockAPI),
  defineMember(nu, 1, "setTypeface", jn, BlockAPI),
  defineMember(nu, 1, "getTypeface", In, BlockAPI),
  defineMember(nu, 1, "getTextCursorRange", On, BlockAPI),
  defineMember(nu, 1, "hasFill", Mn, BlockAPI),
  defineMember(nu, 1, "supportsFill", Dn, BlockAPI),
  defineMember(nu, 1, "isFillEnabled", Bn, BlockAPI),
  defineMember(nu, 1, "setFillEnabled", Rn, BlockAPI),
  defineMember(nu, 1, "getFill", Ln, BlockAPI),
  defineMember(nu, 1, "setFill", Fn, BlockAPI),
  defineMember(nu, 1, "setFillSolidColor", Pn, BlockAPI),
  defineMember(nu, 1, "getFillSolidColor", An, BlockAPI),
  defineMember(nu, 1, "setPlaceholderEnabled", Tn, BlockAPI),
  defineMember(nu, 1, "isPlaceholderEnabled", xn, BlockAPI),
  defineMember(nu, 1, "hasPlaceholderBehavior", kn, BlockAPI),
  defineMember(nu, 1, "supportsPlaceholderBehavior", Sn, BlockAPI),
  defineMember(nu, 1, "setPlaceholderBehaviorEnabled", Cn, BlockAPI),
  defineMember(nu, 1, "isPlaceholderBehaviorEnabled", En, BlockAPI),
  defineMember(nu, 1, "hasPlaceholderControls", _n, BlockAPI),
  defineMember(nu, 1, "supportsPlaceholderControls", wn, BlockAPI),
  defineMember(nu, 1, "setPlaceholderControlsOverlayEnabled", bn, BlockAPI),
  defineMember(nu, 1, "isPlaceholderControlsOverlayEnabled", yn, BlockAPI),
  defineMember(nu, 1, "setPlaceholderControlsButtonEnabled", vn, BlockAPI),
  defineMember(nu, 1, "isPlaceholderControlsButtonEnabled", gn, BlockAPI),
  defineMember(nu, 1, "setMetadata", mn, BlockAPI),
  defineMember(nu, 1, "getMetadata", pn, BlockAPI),
  defineMember(nu, 1, "hasMetadata", fn, BlockAPI),
  defineMember(nu, 1, "findAllMetadata", hn, BlockAPI),
  defineMember(nu, 1, "removeMetadata", dn, BlockAPI),
  defineMember(nu, 1, "setScopeEnabled", ln, BlockAPI),
  defineMember(nu, 1, "isScopeEnabled", cn, BlockAPI),
  defineMember(nu, 1, "isAllowedByScope", un, BlockAPI),
  defineMember(nu, 1, "hasDuration", sn, BlockAPI),
  defineMember(nu, 1, "supportsDuration", an, BlockAPI),
  defineMember(nu, 1, "setDuration", on, BlockAPI),
  defineMember(nu, 1, "getDuration", nn, BlockAPI),
  defineMember(nu, 1, "hasTimeOffset", rn, BlockAPI),
  defineMember(nu, 1, "supportsTimeOffset", tn, BlockAPI),
  defineMember(nu, 1, "setTimeOffset", en, BlockAPI),
  defineMember(nu, 1, "getTimeOffset", Jr, BlockAPI),
  defineMember(nu, 1, "hasTrim", Qr, BlockAPI),
  defineMember(nu, 1, "supportsTrim", Zr, BlockAPI),
  defineMember(nu, 1, "setTrimOffset", Kr, BlockAPI),
  defineMember(nu, 1, "getTrimOffset", Yr, BlockAPI),
  defineMember(nu, 1, "setTrimLength", Xr, BlockAPI),
  defineMember(nu, 1, "getTrimLength", Gr, BlockAPI),
  defineMember(nu, 1, "getTotalSceneDuration", Wr, BlockAPI),
  defineMember(nu, 1, "setPlaying", zr, BlockAPI),
  defineMember(nu, 1, "isPlaying", Vr, BlockAPI),
  defineMember(nu, 1, "hasPlaybackTime", Nr, BlockAPI),
  defineMember(nu, 1, "supportsPlaybackTime", Hr, BlockAPI),
  defineMember(nu, 1, "setPlaybackTime", qr, BlockAPI),
  defineMember(nu, 1, "getPlaybackTime", $r, BlockAPI),
  defineMember(nu, 1, "isVisibleAtCurrentPlaybackTime", Ur, BlockAPI),
  defineMember(nu, 1, "setSoloPlaybackEnabled", jr, BlockAPI),
  defineMember(nu, 1, "isSoloPlaybackEnabled", Ir, BlockAPI),
  defineMember(nu, 1, "hasPlaybackControl", Or, BlockAPI),
  defineMember(nu, 1, "supportsPlaybackControl", Mr, BlockAPI),
  defineMember(nu, 1, "setLooping", Dr, BlockAPI),
  defineMember(nu, 1, "isLooping", Br, BlockAPI),
  defineMember(nu, 1, "setMuted", Rr, BlockAPI),
  defineMember(nu, 1, "isMuted", Lr, BlockAPI),
  defineMember(nu, 1, "setVolume", Fr, BlockAPI),
  defineMember(nu, 1, "getVolume", Pr, BlockAPI),
  defineMember(nu, 1, "forceLoadAVResource", Ar, BlockAPI),
  defineMember(nu, 1, "unstable_isAVResourceLoaded", Tr, BlockAPI),
  defineMember(nu, 1, "getAVResourceTotalDuration", xr, BlockAPI),
  defineMember(nu, 1, "getVideoWidth", kr, BlockAPI),
  defineMember(nu, 1, "getVideoHeight", Sr, BlockAPI),
  defineMember(nu, 1, "getVideoFillThumbnail", Cr, BlockAPI),
  defineMember(nu, 1, "getVideoFillThumbnailAtlas", Er, BlockAPI),
  defineMember(nu, 1, "getPageThumbnailAtlas", _r, BlockAPI),
  defineMember(nu, 1, "createAnimation", wr, BlockAPI),
  defineMember(nu, 1, "supportsAnimation", br, BlockAPI),
  defineMember(nu, 1, "setInAnimation", yr, BlockAPI),
  defineMember(nu, 1, "setLoopAnimation", vr, BlockAPI),
  defineMember(nu, 1, "setOutAnimation", gr, BlockAPI),
  defineMember(nu, 1, "getInAnimation", mr, BlockAPI),
  defineMember(nu, 1, "getLoopAnimation", pr, BlockAPI),
  defineMember(nu, 1, "getOutAnimation", fr, BlockAPI),
  defineMember(nu, 1, "setNativePixelBuffer", hr, BlockAPI),
  defineMember(nu, 1, "getState", dr, BlockAPI),
  defineMember(nu, 1, "setState", lr, BlockAPI),
  defineMember(nu, 1, "forceLoadResources", cr, BlockAPI),
  assignMetadata(nu, BlockAPI);
var iu,
  au,
  su,
  uu,
  cu,
  lu,
  du,
  hu,
  fu,
  pu,
  mu,
  gu,
  vu,
  yu,
  bu,
  wu,
  _u,
  Eu,
  Cu,
  Su,
  ku,
  xu,
  Tu,
  Au,
  Pu,
  Fu,
  Lu,
  Ru,
  Bu,
  Du,
  Mu,
  Ou,
  Iu,
  ju,
  Uu,
  $u,
  qu,
  Hu,
  Nu,
  Vu,
  zu,
  Wu,
  Gu,
  Xu,
  Yu,
  Ku,
  Zu,
  Qu,
  Ju,
  ec,
  tc,
  rc,
  nc,
  oc,
  ic,
  ac,
  sc,
  uc,
  cc,
  lc = new WeakMap();
(sc = [er]),
  (ac = [er]),
  (ic = [er]),
  (oc = [Jt]),
  (nc = [Jt]),
  (rc = [er]),
  (tc = [er]),
  (ec = [Jt]),
  (Ju = [Jt]),
  (Qu = [Jt]),
  (Zu = [Jt]),
  (Ku = [Jt]),
  (Yu = [Jt]),
  (Xu = [er]),
  (Gu = [er]),
  (Wu = [er]),
  (zu = [Jt]),
  (Vu = [er]),
  (Nu = [er]),
  (Hu = [er]),
  (qu = [Jt]),
  ($u = [Jt]),
  (Uu = [er]),
  (ju = [Jt]),
  (Iu = [er]),
  (Ou = [Jt]),
  (Mu = [er]),
  (Du = [Jt]),
  (Bu = [er]),
  (Ru = [Jt]),
  (Lu = [er]),
  (Fu = [Jt]),
  (Pu = [er]),
  (Au = [Jt]),
  (Tu = [er]),
  (xu = [Jt]),
  (ku = [er]),
  (Su = [Jt]),
  (Cu = [Jt]),
  (Eu = [Jt]),
  (_u = [Jt]),
  (wu = [Jt]),
  (bu = [er]),
  (yu = [Jt]),
  (vu = [Jt]),
  (gu = [Jt]),
  (mu = [er]),
  (pu = [Jt]),
  (fu = [Jt]),
  (hu = [Jt]),
  (du = [Jt]),
  (lu = [er]),
  (cu = [er]),
  (uu = [er]),
  (su = [er]),
  (au = [er]),
  (iu = [Jt]);
var EditorAPI = class {
  constructor(e) {
    executeInitializers(cc, 5, this),
      addPrivateMember(this, uc),
      defineProperty(this, "onStateChanged", (e) => {
        const t = accessPrivateField(this, uc).subscribeToEditorState(e);
        return () => {
          accessPrivateField(this, uc).isDeleted() ||
            St(accessPrivateField(this, uc).unsubscribe(t));
        };
      }),
      defineProperty(this, "onHistoryUpdated", (e) => {
        const t = accessPrivateField(this, uc).subscribeToHistory(e);
        return () => {
          accessPrivateField(this, uc).isDeleted() ||
            accessPrivateField(this, uc).unsubscribe(t);
        };
      }),
      defineProperty(this, "onSettingsChanged", (e) => {
        const t = accessPrivateField(this, uc).subscribeToSettings(e);
        return () => {
          accessPrivateField(this, uc).isDeleted() ||
            St(accessPrivateField(this, uc).unsubscribe(t));
        };
      }),
      defineProperty(this, "onRoleChanged", (e) => {
        const t = accessPrivateField(this, uc).subscribeToRoleChange(e);
        return () => {
          accessPrivateField(this, uc).isDeleted() ||
            St(accessPrivateField(this, uc).unsubscribe(t));
        };
      }),
      writePrivateField(this, uc, e);
  }
  unlockWithLicense(e) {
    St(accessPrivateField(this, uc).unlockWithLicense(e));
  }
  startTracking(e, t) {
    accessPrivateField(this, uc).startTracking(e, t, "");
  }
  setTrackingMetadata(e) {
    accessPrivateField(this, uc).setTrackingMetadata(e);
  }
  getTrackingMetadata() {
    return St(accessPrivateField(this, uc).getTrackingMetadata());
  }
  getActiveLicense() {
    return St(accessPrivateField(this, uc).getActiveLicense());
  }
  _update() {
    accessPrivateField(this, uc).update();
  }
  setEditMode(e) {
    Yt("keypath", e, Vt()), accessPrivateField(this, uc).setEditMode(e);
  }
  getEditMode() {
    return accessPrivateField(this, uc).getEditMode();
  }
  unstable_isInteractionHappening() {
    return St(accessPrivateField(this, uc).unstable_isInteractionHappening());
  }
  getCursorType() {
    return accessPrivateField(this, uc).getCursorType();
  }
  getCursorRotation() {
    return accessPrivateField(this, uc).getCursorRotation();
  }
  getTextCursorPositionInScreenSpaceX() {
    return accessPrivateField(this, uc).getTextCursorPositionInScreenSpaceX();
  }
  getTextCursorPositionInScreenSpaceY() {
    return accessPrivateField(this, uc).getTextCursorPositionInScreenSpaceY();
  }
  createHistory() {
    return accessPrivateField(this, uc).createHistory();
  }
  destroyHistory(e) {
    St(accessPrivateField(this, uc).destroyHistory(e));
  }
  setActiveHistory(e) {
    St(accessPrivateField(this, uc).setActiveHistory(e));
  }
  getActiveHistory() {
    return accessPrivateField(this, uc).getActiveHistory();
  }
  addUndoStep() {
    St(accessPrivateField(this, uc).addUndoStep());
  }
  undo() {
    St(accessPrivateField(this, uc).undo());
  }
  redo() {
    St(accessPrivateField(this, uc).redo());
  }
  canUndo() {
    return St(accessPrivateField(this, uc).canUndo());
  }
  canRedo() {
    return St(accessPrivateField(this, uc).canRedo());
  }
  setSettingBool(e, t) {
    return (
      Yt("keypath", e, Vt()),
      Yt("value", t, $t()),
      St(accessPrivateField(this, uc).setSettingBool(e, t))
    );
  }
  getSettingBool(e) {
    return (
      Yt("keypath", e, Vt()), St(accessPrivateField(this, uc).getSettingBool(e))
    );
  }
  setSettingInt(e, t) {
    return (
      Yt("keypath", e, Vt()),
      Yt("value", t, qt()),
      St(accessPrivateField(this, uc).setSettingInt(e, t))
    );
  }
  getSettingInt(e) {
    return (
      Yt("keypath", e, Vt()), St(accessPrivateField(this, uc).getSettingInt(e))
    );
  }
  setSettingFloat(e, t) {
    return (
      Yt("keypath", e, Vt()),
      Yt("value", t, Ht()),
      St(accessPrivateField(this, uc).setSettingFloat(e, t))
    );
  }
  getSettingFloat(e) {
    return (
      Yt("keypath", e, Vt()),
      St(accessPrivateField(this, uc).getSettingFloat(e))
    );
  }
  setSettingString(e, t) {
    return (
      Yt("keypath", e, Vt()),
      Yt("value", t, Vt()),
      St(accessPrivateField(this, uc).setSettingString(e, t))
    );
  }
  getSettingString(e) {
    return (
      Yt("keypath", e, Vt()),
      St(accessPrivateField(this, uc).getSettingString(e))
    );
  }
  setSettingColor(e, t) {
    return (
      Yt("keypath", e, Vt()),
      St(accessPrivateField(this, uc).setSettingColor(e, nr.fromColor(t)))
    );
  }
  getSettingColor(e) {
    return (
      Yt("keypath", e, Vt()),
      nr.toColor(St(accessPrivateField(this, uc).getSettingColor(e)))
    );
  }
  setSettingColorRGBA(e, t, r, n, o = 1) {
    return (
      Yt("keypath", e, Vt()),
      Yt("r", t, Ht()),
      Yt("g", r, Ht()),
      Yt("b", n, Ht()),
      Yt("a", o, Ht()),
      St(accessPrivateField(this, uc).setSettingColorRGBA(e, t, r, n, o))
    );
  }
  getSettingColorRGBA(e) {
    return (
      Yt("keypath", e, Vt()),
      St(accessPrivateField(this, uc).getSettingColorRGBA(e))
    );
  }
  setSettingEnum(e, t) {
    return (
      Yt("keypath", e, Vt()),
      Yt("value", t, Vt()),
      St(accessPrivateField(this, uc).setSettingEnum(e, t))
    );
  }
  getSettingEnum(e) {
    return (
      Yt("keypath", e, Vt()), St(accessPrivateField(this, uc).getSettingEnum(e))
    );
  }
  getSettingEnumOptions(e) {
    return (
      Yt("keypath", e, Vt()),
      xt(St(accessPrivateField(this, uc).getSettingEnumOptions(e)))
    );
  }
  setRole(e) {
    return St(accessPrivateField(this, uc).setRole(e));
  }
  getRole() {
    return St(accessPrivateField(this, uc).getRole());
  }
  findAllSettings() {
    return xt(accessPrivateField(this, uc).findAllSettings());
  }
  getSettingType(e) {
    Yt("keypath", e, Vt());
    return St(accessPrivateField(this, uc).getSettingType(e));
  }
  getAvailableMemory() {
    return St(accessPrivateField(this, uc).getAvailableMemory());
  }
  getUsedMemory() {
    return St(accessPrivateField(this, uc).getUsedMemory());
  }
  getMaxExportSize() {
    return St(accessPrivateField(this, uc).getMaxExportSize());
  }
  setURIResolver(e) {
    lc.set(accessPrivateField(this, uc), e);
    return St(
      accessPrivateField(this, uc).setURIResolver((t) =>
        e(t, this.defaultURIResolver.bind(this))
      )
    );
  }
  unstable_getURIResolver() {
    return lc.get(accessPrivateField(this, uc)) ?? null;
  }
  defaultURIResolver(e) {
    return accessPrivateField(this, uc).defaultURIResolver(e);
  }
  getAbsoluteURI(e) {
    return St(accessPrivateField(this, uc).getAbsoluteURI(e));
  }
  findAllScopes() {
    return xt(accessPrivateField(this, uc).findAllScopes());
  }
  setGlobalScope(e, t) {
    Yt("key", e, Vt()),
      Yt("value", t, Vt()),
      St(accessPrivateField(this, uc).setGlobalScope(e, t));
  }
  getGlobalScope(e) {
    return (
      Yt("key", e, Vt()), St(accessPrivateField(this, uc).getGlobalScope(e))
    );
  }
  findAllSpotColors() {
    return xt(accessPrivateField(this, uc).findAllSpotColors());
  }
  getSpotColorRGBA(e) {
    return Yt("name", e, Vt()), accessPrivateField(this, uc).getSpotColorRGB(e);
  }
  getSpotColorCMYK(e) {
    return (
      Yt("name", e, Vt()), accessPrivateField(this, uc).getSpotColorCMYK(e)
    );
  }
  setSpotColorRGB(e, t, r, n) {
    return (
      Yt("name", e, Vt()),
      Yt("r", t, Ht()),
      Yt("g", r, Ht()),
      Yt("b", n, Ht()),
      accessPrivateField(this, uc).setSpotColorRGB(e, t, r, n)
    );
  }
  setSpotColorCMYK(e, t, r, n, o) {
    return (
      Yt("name", e, Vt()),
      Yt("c", t, Ht()),
      Yt("m", r, Ht()),
      Yt("y", n, Ht()),
      Yt("k", o, Ht()),
      accessPrivateField(this, uc).setSpotColorCMYK(e, t, r, n, o)
    );
  }
  removeSpotColor(e) {
    return (
      Yt("name", e, Vt()), St(accessPrivateField(this, uc).removeSpotColor(e))
    );
  }
  setSpotColorForCutoutType(e, t) {
    return (
      Yt("type", e, Vt()),
      Yt("color", t, Vt()),
      St(accessPrivateField(this, uc).setSpotColorForCutoutType(e, t))
    );
  }
  getSpotColorForCutoutType(e) {
    return (
      Yt("type", e, Vt()),
      St(accessPrivateField(this, uc).getSpotColorForCutoutType(e))
    );
  }
  convertColorToColorSpace(e, t) {
    return (
      Yt("colorSpace", t, Vt()),
      nr.toColor(
        St(
          accessPrivateField(this, uc).convertColorToColorSpace(
            nr.fromColor(e),
            t
          )
        )
      )
    );
  }
  createBuffer() {
    return accessPrivateField(this, uc).createBuffer();
  }
  destroyBuffer(e) {
    St(accessPrivateField(this, uc).destroyBuffer(e));
  }
  setBufferData(e, t, r) {
    Yt("offset", t, qt()),
      St(accessPrivateField(this, uc).setBufferData(e, t, r));
  }
  getBufferData(e, t, r) {
    Yt("offset", t, qt()), Yt("length", r, qt());
    const n = accessPrivateField(this, uc).getBufferData(e, t, r);
    if ("error" in n) throw new Error(n.error);
    return n;
  }
  setBufferLength(e, t) {
    Yt("length", t, qt()),
      St(accessPrivateField(this, uc).setBufferLength(e, t));
  }
  getBufferLength(e) {
    return St(accessPrivateField(this, uc).getBufferLength(e));
  }
  cloneBuffers() {
    return xt(St(accessPrivateField(this, uc).cloneBuffers()));
  }
  restoreBuffers(e) {
    St(accessPrivateField(this, uc).restoreBuffers(e));
  }
  getMimeType(e) {
    return (
      Yt("uri", e, Vt()),
      kt((t) => accessPrivateField(this, uc).getMimeType(e, t))
    );
  }
  findAllTransientResources() {
    return xt(St(accessPrivateField(this, uc).findAllTransientResources()));
  }
  getResourceData(e, t, r) {
    Yt("uri", e, Vt()),
      Yt("chunkSize", t, qt()),
      St(accessPrivateField(this, uc).getResourceData(e, t, r));
  }
  relocateResource(e, t) {
    Yt("currentUrl", e, Vt()),
      Yt("relocatedUrl", t, Vt()),
      St(accessPrivateField(this, uc).relocateResource(e, t));
  }
};
(cc = createMetadataArray(null)),
  (uc = new WeakMap()),
  defineMember(cc, 1, "unlockWithLicense", sc, EditorAPI),
  defineMember(cc, 1, "startTracking", ac, EditorAPI),
  defineMember(cc, 1, "setTrackingMetadata", ic, EditorAPI),
  defineMember(cc, 1, "getTrackingMetadata", oc, EditorAPI),
  defineMember(cc, 1, "getActiveLicense", nc, EditorAPI),
  defineMember(cc, 1, "_update", rc, EditorAPI),
  defineMember(cc, 1, "setEditMode", tc, EditorAPI),
  defineMember(cc, 1, "getEditMode", ec, EditorAPI),
  defineMember(cc, 1, "unstable_isInteractionHappening", Ju, EditorAPI),
  defineMember(cc, 1, "getCursorType", Qu, EditorAPI),
  defineMember(cc, 1, "getCursorRotation", Zu, EditorAPI),
  defineMember(cc, 1, "getTextCursorPositionInScreenSpaceX", Ku, EditorAPI),
  defineMember(cc, 1, "getTextCursorPositionInScreenSpaceY", Yu, EditorAPI),
  defineMember(cc, 1, "createHistory", Xu, EditorAPI),
  defineMember(cc, 1, "destroyHistory", Gu, EditorAPI),
  defineMember(cc, 1, "setActiveHistory", Wu, EditorAPI),
  defineMember(cc, 1, "getActiveHistory", zu, EditorAPI),
  defineMember(cc, 1, "addUndoStep", Vu, EditorAPI),
  defineMember(cc, 1, "undo", Nu, EditorAPI),
  defineMember(cc, 1, "redo", Hu, EditorAPI),
  defineMember(cc, 1, "canUndo", qu, EditorAPI),
  defineMember(cc, 1, "canRedo", $u, EditorAPI),
  defineMember(cc, 1, "setSettingBool", Uu, EditorAPI),
  defineMember(cc, 1, "getSettingBool", ju, EditorAPI),
  defineMember(cc, 1, "setSettingInt", Iu, EditorAPI),
  defineMember(cc, 1, "getSettingInt", Ou, EditorAPI),
  defineMember(cc, 1, "setSettingFloat", Mu, EditorAPI),
  defineMember(cc, 1, "getSettingFloat", Du, EditorAPI),
  defineMember(cc, 1, "setSettingString", Bu, EditorAPI),
  defineMember(cc, 1, "getSettingString", Ru, EditorAPI),
  defineMember(cc, 1, "setSettingColor", Lu, EditorAPI),
  defineMember(cc, 1, "getSettingColor", Fu, EditorAPI),
  defineMember(cc, 1, "setSettingColorRGBA", Pu, EditorAPI),
  defineMember(cc, 1, "getSettingColorRGBA", Au, EditorAPI),
  defineMember(cc, 1, "setSettingEnum", Tu, EditorAPI),
  defineMember(cc, 1, "getSettingEnum", xu, EditorAPI),
  defineMember(cc, 1, "setRole", ku, EditorAPI),
  defineMember(cc, 1, "getRole", Su, EditorAPI),
  defineMember(cc, 1, "findAllSettings", Cu, EditorAPI),
  defineMember(cc, 1, "getAvailableMemory", Eu, EditorAPI),
  defineMember(cc, 1, "getUsedMemory", _u, EditorAPI),
  defineMember(cc, 1, "getMaxExportSize", wu, EditorAPI),
  defineMember(cc, 1, "setURIResolver", bu, EditorAPI),
  defineMember(cc, 1, "unstable_getURIResolver", yu, EditorAPI),
  defineMember(cc, 1, "getAbsoluteURI", vu, EditorAPI),
  defineMember(cc, 1, "findAllScopes", gu, EditorAPI),
  defineMember(cc, 1, "setGlobalScope", mu, EditorAPI),
  defineMember(cc, 1, "getGlobalScope", pu, EditorAPI),
  defineMember(cc, 1, "findAllSpotColors", fu, EditorAPI),
  defineMember(cc, 1, "getSpotColorRGBA", hu, EditorAPI),
  defineMember(cc, 1, "getSpotColorCMYK", du, EditorAPI),
  defineMember(cc, 1, "setSpotColorRGB", lu, EditorAPI),
  defineMember(cc, 1, "setSpotColorCMYK", cu, EditorAPI),
  defineMember(cc, 1, "removeSpotColor", uu, EditorAPI),
  defineMember(cc, 1, "setSpotColorForCutoutType", su, EditorAPI),
  defineMember(cc, 1, "getSpotColorForCutoutType", au, EditorAPI),
  defineMember(cc, 1, "convertColorToColorSpace", iu, EditorAPI),
  assignMetadata(cc, EditorAPI);
var dc,
  hc,
  fc,
  pc,
  mc,
  gc,
  vc,
  yc,
  bc,
  wc,
  _c,
  Ec,
  Cc,
  Sc,
  kc,
  xc,
  Tc,
  Ac,
  Pc,
  Fc,
  Lc,
  Rc,
  Bc,
  Dc,
  Mc,
  EventAPI = class {
    #e;
    constructor(e) {
      this.#e = e;
    }
    subscribe = (e, t) => {
      Yt("blocks", e, Ut());
      const r = this.#e.subscribe(e, (e) => {
        try {
          t(xt(e, !0));
        } catch (e) {
          console.error(e);
        }
      });
      return () => {
        this.#e.isDeleted() || St(this.#e.unsubscribe(r));
      };
    };
  };
(Bc = [er]),
  (Rc = [er]),
  (Lc = [er]),
  (Fc = [er]),
  (Pc = [er]),
  (Ac = [er]),
  (Tc = [er]),
  (xc = [Jt]),
  (kc = [er]),
  (Sc = [er]),
  (Cc = [Jt]),
  (Ec = [er]),
  (_c = [Jt]),
  (wc = [Jt]),
  (bc = [Jt]),
  (yc = [Jt]),
  (vc = [Jt]),
  (gc = [er]),
  (mc = [Jt]),
  (pc = [er]),
  (fc = [er]),
  (hc = [er]),
  (dc = [Jt]);
var Oc,
  Ic,
  jc,
  Uc,
  $c,
  qc,
  SceneAPI = class {
    constructor(e) {
      executeInitializers(Mc, 5, this),
        addPrivateMember(this, Dc),
        defineProperty(this, "onZoomLevelChanged", (e) => {
          const t = accessPrivateField(this, Dc).subscribeToZoomLevel(e);
          return () => {
            accessPrivateField(this, Dc).isDeleted() ||
              St(accessPrivateField(this, Dc).unsubscribe(t));
          };
        }),
        defineProperty(this, "onActiveChanged", (e) => {
          const t = accessPrivateField(this, Dc).subscribeToActiveSceneChange(
            e
          );
          return () => {
            accessPrivateField(this, Dc).isDeleted() ||
              St(accessPrivateField(this, Dc).unsubscribe(t));
          };
        }),
        writePrivateField(this, Dc, e);
    }
    async loadFromString(e) {
      return (
        Yt("sceneContent", e, Vt()),
        kt((t) => accessPrivateField(this, Dc).loadSceneFromString(e, t))
      );
    }
    async loadFromURL(e) {
      return (
        Yt("url", e, Vt()),
        kt((t) => accessPrivateField(this, Dc).loadSceneFromURL(e, t))
      );
    }
    async loadFromArchiveURL(e) {
      return (
        Yt("url", e, Vt()),
        kt((t) => accessPrivateField(this, Dc).loadSceneFromArchiveURL(e, t))
      );
    }
    async saveToString(e = ["blob", "bundle", "file", "http", "https"]) {
      const t = this.get();
      if (null == t) throw new Error("No scene available.");
      return kt((r) => {
        accessPrivateField(this, Dc).saveSceneToString(t, r, e);
      });
    }
    async saveToArchive() {
      return new Promise((e, t) => {
        const r = this.get();
        null == r
          ? t(new Error("No scene available."))
          : accessPrivateField(this, Dc).saveSceneToArchive(r, (r) => {
              "error" in r ? t(r.error) : e(new ou([r], { type: MimeType.Zip }));
            });
      });
    }
    create(e = "Free") {
      Yt("sceneLayout", e, Zt());
      return St(accessPrivateField(this, Dc).createScene(e));
    }
    createVideo() {
      return St(accessPrivateField(this, Dc).createVideoScene());
    }
    createFromImage(e, t = 300, r = 1, n = "Free", o = 0, i = !1) {
      return (
        Yt("url", e, Vt()),
        Yt("dpi", t, Wt(Ht(), 0)),
        Yt("pixelScaleFactor", r, Wt(Ht(), 0)),
        Yt("sceneLayout", n, Zt()),
        kt((a) =>
          accessPrivateField(this, Dc).createSceneFromImage(e, t, r, n, o, i, a)
        )
      );
    }
    createFromVideo(e) {
      return (
        Yt("url", e, Vt()),
        kt((t) => accessPrivateField(this, Dc).createSceneFromVideo(e, t))
      );
    }
    get() {
      const e = St(accessPrivateField(this, Dc).findByType("scene")),
        t = xt(e);
      return t.length > 0 ? t[0] : null;
    }
    async applyTemplateFromString(e) {
      return (
        Yt("content", e, Vt()),
        kt((t) => accessPrivateField(this, Dc).applyTemplateFromString(e, t))
      );
    }
    async applyTemplateFromURL(e) {
      return (
        Yt("url", e, Vt()),
        kt((t) => accessPrivateField(this, Dc).applyTemplateFromURL(e, t))
      );
    }
    getMode() {
      const e = this.get();
      return St(accessPrivateField(this, Dc).getSceneMode(e));
    }
    setDesignUnit(e) {
      Yt(
        "designUnit",
        e,
        (function () {
          const e = ["Pixel", "Millimeter", "Inch"];
          return jt(
            "DesignUnit",
            (t) =>
              !("string" != typeof t || !e.includes(t)) || {
                message: `expected one of ${e
                  .map((e) => `"${e}"`)
                  .join(", ")}, but got "${t}"`,
              }
          );
        })()
      );
      const t = this.get();
      St(accessPrivateField(this, Dc).setDesignUnit(t, e));
    }
    getDesignUnit() {
      const e = this.get();
      return St(accessPrivateField(this, Dc).getDesignUnit(e));
    }
    getPages() {
      return xt(St(accessPrivateField(this, Dc).getPages()));
    }
    getCurrentPage() {
      const e = this.get();
      if (null == e) return null;
      const t = accessPrivateField(this, Dc).getCurrentPage(e);
      return t.isValid() ? St(t) : null;
    }
    findNearestToViewPortCenterByType(e) {
      Yt("type", e, Vt());
      const t = this.get();
      if (null == t) return [];
      const r = St(
        accessPrivateField(this, Dc).findNearestToViewPortCenterByType(t, e)
      );
      return xt(r);
    }
    findNearestToViewPortCenterByKind(e) {
      Yt("kind", e, Vt());
      const t = this.get();
      if (null == t) return [];
      const r = St(
        accessPrivateField(this, Dc).findNearestToViewPortCenterByKind(t, e)
      );
      return xt(r);
    }
    setZoomLevel(e = 1) {
      const t = this.get();
      Yt("zoomLevel", e, Wt(Ht(), 0)),
        accessPrivateField(this, Dc).setZoomLevel(t, e);
    }
    getZoomLevel() {
      const e = this.get();
      return St(accessPrivateField(this, Dc).getZoomLevel(e));
    }
    async zoomToBlock(e, t = 0, r = 0, n = 0, o = 0) {
      return (
        Yt("id", e, qt()),
        kt((i) => accessPrivateField(this, Dc).zoomToBlock(e, t, r, n, o, i))
      );
    }
    enableZoomAutoFit(e, t, r = 0, n = 0, o = 0, i = 0) {
      return (
        Yt("id", e, qt()),
        Yt(
          "axis",
          t,
          (function () {
            const e = ["Horizontal", "Vertical", "Both"];
            return jt(
              "ZoomAutoFitAxis",
              (t) =>
                !("string" != typeof t || !e.includes(t)) || {
                  message: `expected one of ${e
                    .map((e) => `"${e}"`)
                    .join(", ")}, but got "${t}"`,
                }
            );
          })()
        ),
        "Horizontal" === t
          ? (Yt("paddingBefore", r, Ht()),
            Yt("paddingAfter", n, Ht()),
            St(
              accessPrivateField(this, Dc).enableZoomAutoFit(e, t, r, 0, n, 0)
            ))
          : "Vertical" === t
          ? (Yt("paddingBefore", r, Ht()),
            Yt("paddingAfter", n, Ht()),
            St(
              accessPrivateField(this, Dc).enableZoomAutoFit(e, t, 0, r, 0, n)
            ))
          : (Yt("paddingLeft", r, Ht()),
            Yt("paddingTop", n, Ht()),
            Yt("paddingRight", o, Ht()),
            Yt("paddingBottom", i, Ht()),
            St(
              accessPrivateField(this, Dc).enableZoomAutoFit(e, t, r, n, o, i)
            ))
      );
    }
    disableZoomAutoFit(e) {
      return (
        Yt("blockOrScene", e, qt()),
        St(accessPrivateField(this, Dc).disableZoomAutoFit(e))
      );
    }
    isZoomAutoFitEnabled(e) {
      return (
        Yt("blockOrScene", e, qt()),
        St(accessPrivateField(this, Dc).isZoomAutoFitEnabled(e))
      );
    }
    unstable_enableCameraPositionClamping(
      e,
      t = 0,
      r = 0,
      n = 0,
      o = 0,
      i = 0,
      a = 0,
      s = 0,
      u = 0
    ) {
      return (
        Yt("ids", e, Ut(Ht())),
        Yt("paddingLeft", t, Ht()),
        Yt("paddingTop", r, Ht()),
        Yt("paddingRight", n, Ht()),
        Yt("paddingBottom", o, Ht()),
        Yt("scaledPaddingLeft", t, Ht()),
        Yt("scaledPaddingTop", r, Ht()),
        Yt("scaledPaddingRight", n, Ht()),
        Yt("scaledPaddingBottom", o, Ht()),
        St(
          accessPrivateField(this, Dc).unstable_enableCameraPositionClamping(
            e,
            t,
            r,
            n,
            o,
            i,
            a,
            s,
            u
          )
        )
      );
    }
    unstable_disableCameraPositionClamping(e = this.get()) {
      if (null == e) throw new Error("No scene available.");
      return St(
        accessPrivateField(this, Dc).unstable_disableCameraPositionClamping(e)
      );
    }
    unstable_isCameraPositionClampingEnabled(e = this.get()) {
      if (null == e) throw new Error("No scene available.");
      return St(
        accessPrivateField(this, Dc).unstable_isCameraPositionClampingEnabled(e)
      );
    }
    unstable_enableCameraZoomClamping(
      e,
      t = -1,
      r = -1,
      n = 0,
      o = 0,
      i = 0,
      a = 0
    ) {
      return (
        Yt("ids", e, Ut(Ht())),
        Yt("minZoomLimit", t, Ht()),
        Yt("maxZoomLimit", r, Ht()),
        Yt("paddingLeft", n, Ht()),
        Yt("paddingTop", o, Ht()),
        Yt("paddingRight", i, Ht()),
        Yt("paddingBottom", a, Ht()),
        St(
          accessPrivateField(this, Dc).unstable_enableCameraZoomClamping(
            e,
            t,
            r,
            n,
            o,
            i,
            a
          )
        )
      );
    }
    unstable_disableCameraZoomClamping(e = this.get()) {
      if (null == e) throw new Error("No scene available.");
      return St(
        accessPrivateField(this, Dc).unstable_disableCameraZoomClamping(e)
      );
    }
    unstable_isCameraZoomClampingEnabled(e = this.get()) {
      if (null == e) throw new Error("No scene available.");
      return St(
        accessPrivateField(this, Dc).unstable_isCameraZoomClampingEnabled(e)
      );
    }
  };
(Mc = createMetadataArray(null)),
  (Dc = new WeakMap()),
  defineMember(Mc, 1, "loadFromString", Bc, SceneAPI),
  defineMember(Mc, 1, "loadFromURL", Rc, SceneAPI),
  defineMember(Mc, 1, "loadFromArchiveURL", Lc, SceneAPI),
  defineMember(Mc, 1, "create", Fc, SceneAPI),
  defineMember(Mc, 1, "createVideo", Pc, SceneAPI),
  defineMember(Mc, 1, "createFromImage", Ac, SceneAPI),
  defineMember(Mc, 1, "createFromVideo", Tc, SceneAPI),
  defineMember(Mc, 1, "get", xc, SceneAPI),
  defineMember(Mc, 1, "applyTemplateFromString", kc, SceneAPI),
  defineMember(Mc, 1, "applyTemplateFromURL", Sc, SceneAPI),
  defineMember(Mc, 1, "getMode", Cc, SceneAPI),
  defineMember(Mc, 1, "setDesignUnit", Ec, SceneAPI),
  defineMember(Mc, 1, "getDesignUnit", _c, SceneAPI),
  defineMember(Mc, 1, "getPages", wc, SceneAPI),
  defineMember(Mc, 1, "getCurrentPage", bc, SceneAPI),
  defineMember(Mc, 1, "findNearestToViewPortCenterByType", yc, SceneAPI),
  defineMember(Mc, 1, "findNearestToViewPortCenterByKind", vc, SceneAPI),
  defineMember(Mc, 1, "setZoomLevel", gc, SceneAPI),
  defineMember(Mc, 1, "getZoomLevel", mc, SceneAPI),
  defineMember(Mc, 1, "zoomToBlock", pc, SceneAPI),
  defineMember(Mc, 1, "enableZoomAutoFit", fc, SceneAPI),
  defineMember(Mc, 1, "disableZoomAutoFit", hc, SceneAPI),
  defineMember(Mc, 1, "isZoomAutoFitEnabled", dc, SceneAPI),
  assignMetadata(Mc, SceneAPI),
  (Uc = [Jt]),
  (jc = [er]),
  (Ic = [Jt]),
  (Oc = [er]);
var VariableAPI = class {
  constructor(e) {
    executeInitializers(qc, 5, this),
      addPrivateMember(this, $c),
      writePrivateField(this, $c, e);
  }
  findAll() {
    return xt(accessPrivateField(this, $c).findAllVariables());
  }
  setString(e, t) {
    return (
      Yt("key", e, Vt()),
      Yt("value", t, Vt()),
      St(accessPrivateField(this, $c).setVariableString(e, t))
    );
  }
  getString(e) {
    return (
      Yt("key", e, Vt()), St(accessPrivateField(this, $c).getVariableString(e))
    );
  }
  remove(e) {
    return (
      Yt("key", e, Vt()), St(accessPrivateField(this, $c).removeVariable(e))
    );
  }
};
(qc = createMetadataArray(null)),
  ($c = new WeakMap()),
  defineMember(qc, 1, "findAll", Uc, VariableAPI),
  defineMember(qc, 1, "setString", jc, VariableAPI),
  defineMember(qc, 1, "getString", Ic, VariableAPI),
  defineMember(qc, 1, "remove", Oc, VariableAPI),
  assignMetadata(qc, VariableAPI);
var Hc = async function (e, t, r = fetch, n, o = new Set(n.findAllSources())) {
  const i = e.map(async (e) => {
    const i =
      ((a = `/${e}/content.json`),
      `${t.replace(/\/+$/, "")}/${a.replace(/^\/+/, "")}`);
    var a;
    return r(i)
      .then((e) => {
        if (!e.ok) throw new Error(e.statusText);
        return e.json();
      })
      .then((r) => {
        if (void 0 === r.assets)
          throw new Error(`Invalid content.json for assets: ${e}`);
        const i = r.assets;
        o.has(e) || n.addLocalSource(e),
          i.forEach((r) => {
            r.meta &&
              Object.entries(r.meta).forEach(([e, n]) => {
                const o = n.toString();
                if (o.includes("{{base_url}}")) {
                  const n = o.replace("{{base_url}}", t);
                  r.meta && (r.meta[e] = n);
                }
              }),
              r.payload?.typeface &&
                r.payload.typeface.fonts.forEach((e) => {
                  e.uri.includes("{{base_url}}") &&
                    (e.uri = e.uri.replace("{{base_url}}", t));
                }),
              r.payload?.sourceSet &&
                r.payload.sourceSet.forEach((e) => {
                  e.uri.includes("{{base_url}}") &&
                    (e.uri = e.uri.replace("{{base_url}}", t));
                }),
              n.addAssetToSource(e, r);
          });
      });
  });
  await Promise.all(i);
};
var Nc = async function (e, t, r, n) {
    const o = [
      "ly.img.sticker",
      "ly.img.vectorpath",
      "ly.img.colors.defaultPalette",
      "ly.img.filter.lut",
      "ly.img.filter.duotone",
      "ly.img.effect",
      "ly.img.blur",
      "ly.img.typeface",
    ].filter((e) => !r.includes(e));
    await Hc(o, t, n, e);
  },
  Vc = ((e) => (
    (e[(e.Information = 0)] = "Information"),
    (e[(e.Warning = 1)] = "Warning"),
    (e[(e.Error = 2)] = "Error"),
    e
  ))(Vc || {}),
  zc = ((e) => (
    (e[(e.Free = 0)] = "Free"),
    (e[(e.VerticalStack = 1)] = "VerticalStack"),
    (e[(e.HorizontalStack = 2)] = "HorizontalStack"),
    (e[(e.DepthStack = 3)] = "DepthStack"),
    e
  ))(zc || {});
var Wc = async function (
  e,
  t,
  r,
  n,
  o,
  i,
  a = "https://cdn.img.ly/assets/demo/v2"
) {
  const s = new Set(e.findAllSources()),
    u = "ly.img.image.upload";
  !o ||
    r.includes(u) ||
    s.has(u) ||
    e.addLocalSource(u, [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "image/gif",
      "image/bmp",
    ]);
  const c = "ly.img.video.upload";
  "Video" !== n ||
    !o ||
    r.includes(c) ||
    s.has(c) ||
    e.addLocalSource(c, ["video/mp4", "video/quicktime"]);
  const l = "ly.img.audio.upload";
  "Video" !== n ||
    !o ||
    r.includes(l) ||
    s.has(l) ||
    e.addLocalSource(l, [
      "audio/mpeg",
      "audio/mp3",
      "audio/x-m4a",
      "audio/wav",
    ]);
  const d = ["ly.img.image", "ly.img.video", "ly.img.audio"].filter(
    (e) => !r.includes(e)
  );
  s.has("ly.img.template") ||
    r.includes("ly.img.template") ||
    (e.addLocalSource("ly.img.template", void 0, async (e) => {
      const r = e.meta?.uri;
      if (r)
        if (r.startsWith("UBQ1")) t.applyTemplateFromString(r);
        else {
          const e = new URL(r, window.location.href);
          t.applyTemplateFromURL(e.href);
        }
    }),
    d.push("ly.img.template")),
    "Video" !== n ||
      s.has("ly.img.video.template") ||
      r.includes("ly.img.video.template") ||
      (e.addLocalSource("ly.img.video.template", void 0, async (e) => {
        const r = e.meta?.uri;
        if (r)
          if (r.startsWith("UBQ1")) t.applyTemplateFromString(r);
          else {
            const e = new URL(r, window.location.href);
            t.applyTemplateFromURL(e.href);
          }
      }),
      d.push("ly.img.video.template")),
    await Hc(d, a, i, e);
};
function Gc(e, t) {
  let r;
  const n = new Set();
  function o() {
    const n = window.devicePixelRatio,
      { width: i, height: a } = e.getBoundingClientRect();
    t(i * n, a * n, n),
      (r = matchMedia(`(resolution: ${n}dppx)`)),
      r.addEventListener("change", o, { once: !0 });
  }
  o();
  const i = new ResizeObserver(function ([e]) {
    const { width: r, height: o } = e.target.getBoundingClientRect();
    if (r <= 0 || o <= 0) return;
    const i = window.devicePixelRatio,
      a = setTimeout(function () {
        n.delete(a), t(r * i, o * i, i);
      }, 0);
    n.add(a);
  });
  return (
    i.observe(e),
    () => {
      r.removeEventListener("change", o), i.disconnect();
      for (const e of n) clearTimeout(e);
      n.clear(), (e = null), (t = null);
    }
  );
}
var Xc = cloneWithPrototypeAndProperties(lodashIsEqual());
function Yc(e, t) {
  const r = new Set();
  function n(n) {
    r.add(n);
    e?.((e, ...t) => {
      n(e);
      for (const e of t) n(e);
    });
    return () => {
      r.delete(n), t?.();
    };
  }
  return (
    (n.emit = function (e, ...t) {
      for (const n of r) {
        n(e);
        for (const e of t) n(e);
      }
    }),
    (n.handlers = r),
    n
  );
}
var Kc = (e) => (t) =>
  function (r) {
    return t(function (t) {
      r(e(t));
    });
  };
function Zc(e) {
  return (t) =>
    function (r) {
      let n = !1;
      const o = t(function (e) {
        (n = !0), r(e);
      });
      return n || r(e instanceof Function ? e() : e), o;
    };
}
var Qc =
    (e = (e, t) => e === t) =>
    (t) =>
      function (r) {
        let n;
        return t(function (t) {
          e(t, n) || ((n = t), r(t));
        });
      },
  Jc = (e) => {
    const t = new Set();
    let r = null;
    return function (n) {
      return (
        t.add(n),
        null === r &&
          (r = e(function (e) {
            t.forEach((t) => t(e));
          })),
        function () {
          t.delete(n), 0 === t.size && (r?.(), (r = null));
        }
      );
    };
  };
function el(e, ...t) {
  return t.reduce((e, t) => t(e), e);
}
var tl = (...e) => {
  const t = Array.from(e);
  return function (e) {
    const r = t.map(function (t) {
      return t(e);
    });
    return function () {
      for (const e of r) e();
    };
  };
};
function rl(e) {
  return function (t) {
    let r = null;
    const n = e(function (e) {
      r?.(), (r = e ? e(t) : e);
    });
    return function () {
      n(), r?.(), (r = null);
    };
  };
}
function nl(...e) {
  const t = Array.from(e);
  return function (e) {
    const r = new Array(t.length),
      n = t.map((t, n) =>
        t(function (t) {
          (r[n] = t), e(r);
        })
      );
    return function () {
      n.forEach((e) => e()), (r.length = 0);
    };
  };
}
var ol = Symbol("NO_VALUE");
function _makeValueChannel(e) {
  let t = ol;
  const r = Yc();
  return {
    subscribe: r,
    value: () => (t === ol && (t = e()), t),
    update(e) {
      (t = e), r.emit(t);
    },
  };
}
var al = cloneWithPrototypeAndProperties(lodashOnce());
function _getBlockStream(e, t) {
  const { block: r, event: n } = t;
  return el((t) => {
    const o = r.getType(e),
      i = (0, al.default)(
        n.subscribe([e], function (n) {
          (n.some((e) => "Destroyed" === e.type) && !r.isValid(e)) ||
          r.getType(e) !== o
            ? i()
            : t(n);
        })
      );
    return i;
  }, Jc);
}
function _memoizeResult(e, t) {
  if (!t) return e;
  let r;
  return (...n) => {
    const o = e(...n);
    return t(o, r) || (r = o), r;
  };
}
var _makeEngineChannel = function (e, t, r, n) {
  const o = _memoizeResult(t, n?.equals),
    i = Yc();
  return {
    subscribe: el(tl(e, i), Kc(o), Qc(), Jc),
    update: r,
    value: o,
    flush: () => i.emit(),
  };
};
var ll = class {
  settings;
  clampCamera = !1;
  clampResult = _makeValueChannel(() => ({
    sceneSize: { x: 0, y: 0 },
    scrollPercentage: { x: NaN, y: NaN },
  }));
  zoomLevel;
  #a;
  viewportPadding = _makeValueChannel(() => ({ x: 40, y: 48 }));
  autoFit;
  scrollPercentage;
  sceneSize;
  scroll;
  constructor(e) {
    const { block: t, scene: r, _legacyApi: n } = e,
      o = el(
        r.onActiveChanged,
        Zc(),
        Kc(() => r.get())
      ),
      i = el(
        o,
        Kc((r) =>
          null != r && t.isValid(r)
            ? el(
                _getBlockStream(r, e),
                Zc([]),
                Kc(() => t.getFloat(r, "scene/dpi"))
              )
            : () => () => {}
        ),
        rl
      ),
      a = el(
        o,
        Kc(() => {
          const r = t.findByType("camera")[0];
          return null == r
            ? () => () => {}
            : el(
                _getBlockStream(r, e),
                Zc([]),
                Kc(() => r)
              );
        }),
        rl
      );
    (this.settings = {
      subscribe: el(
        a,
        Kc((e) => ({
          width: t.getFloat(e, "camera/resolution/width"),
          height: t.getFloat(e, "camera/resolution/height"),
          pixelRatio: t.getFloat(e, "camera/pixelRatio"),
        })),
        Qc(Xc.default),
        Jc
      ),
      update({ width: e, height: r, pixelRatio: n }) {
        const o = t.findByType("camera")[0];
        null != o &&
          (t.setFloat(o, "camera/resolution/width", e),
          t.setFloat(o, "camera/resolution/height", r),
          t.setFloat(o, "camera/pixelRatio", n));
      },
      value() {
        const e = t.findByType("camera")[0];
        return null == e
          ? { width: 0, height: 0, pixelRatio: 1 }
          : {
              width: t.getFloat(e, "camera/resolution/width"),
              height: t.getFloat(e, "camera/resolution/height"),
              pixelRatio: t.getFloat(e, "camera/pixelRatio"),
            };
      },
    }),
      (this.zoomLevel = _makeEngineChannel(
        tl(r.onZoomLevelChanged, i),
        () => {
          const e = r.get(),
            { pixelRatio: n } = this.settings.value();
          return null != e && t.isValid(e) ? r.getZoomLevel() / n : 1;
        },
        (e) => {
          const n = r.get(),
            { pixelRatio: o } = this.settings.value();
          null != n && t.isValid(n) && r.setZoomLevel(e * o);
        }
      )),
      (this.#a = {
        subscribe: el(
          a,
          Kc((e) => n.getValue(e, "ubq/designblocks/Camera", "zoomLevel")),
          Qc()
        ),
        value() {
          const e = t.findByType("camera")[0];
          return null == e
            ? 1
            : n.getValue(e, "ubq/designblocks/Camera", "zoomLevel");
        },
      }),
      (this.autoFit = _makeEngineChannel(r.onZoomLevelChanged, () => {
        const e = r.get();
        return null != e && r.isZoomAutoFitEnabled(e);
      })),
      (this.scrollPercentage = {
        subscribe: el(
          this.clampResult.subscribe,
          Kc((e) => e.scrollPercentage),
          Qc(Xc.default)
        ),
        value: () => this.clampResult.value().scrollPercentage,
      }),
      (this.sceneSize = {
        subscribe: el(
          nl(
            this.clampResult.subscribe,
            this.#a.subscribe,
            this.settings.subscribe
          ),
          Kc(([e, t, r]) => {
            const n = e?.sceneSize ??
                this.clampResult.value().sceneSize ?? { x: 0, y: 0 },
              o = t ?? this.#a.value() ?? 10,
              i = r?.pixelRatio ?? this.settings.value().pixelRatio ?? 1;
            return { x: (n.x * o) / i, y: (n.y * o) / i };
          }),
          Qc(Xc.default)
        ),
        value: () => {
          const e = this.clampResult.value().sceneSize ?? { x: 0, y: 0 },
            t = this.#a.value() ?? 10,
            r = this.settings.value().pixelRatio ?? 1;
          return { x: (e.x * t) / r, y: (e.y * t) / r };
        },
      }),
      (this.scroll = (e) => {
        const r = t.findByType("camera")[0];
        if (null == r) return;
        const n = this.#a.value(),
          o = this.settings.value().pixelRatio,
          i = (e.x * o) / n,
          a = (e.y * o) / n,
          s = { x: t.getPositionX(r) + i, y: t.getPositionY(r) + a };
        t.setPositionX(r, s.x), t.setPositionY(r, s.y);
      });
  }
};
function defaultLogger(e, t) {
  const r = `[UBQ] ${e}`;
  switch (t) {
    case "Warning":
      console.warn(r);
      break;
    case "Error":
      console.error(r);
      break;
    case "Info":
      console.info(r);
      break;
    default:
      console.log(r);
  }
}
function normalizeBaseURL(e, t) {
  return (
    (t ??= "undefined" == typeof window ? void 0 : window.location.href),
    new URL(e ?? "", t).href.replace(/\/*$/, "/")
  );
}
function _initWithDefaults(e = {}) {
  const t = {
    ...e,
    license: e.license ?? "",
    baseURL:
      e.baseURL ??
      "https://cdn.img.ly/packages/imgly/cesdk-engine/1.37.0/assets",
    core: e.core ?? { baseURL: "core/" },
    logger: e.logger ?? defaultLogger,
    presets: e.presets ?? {},
  };
  return (
    (t.baseURL = normalizeBaseURL(t.baseURL)),
    (t.core.baseURL = normalizeBaseURL(t.core.baseURL, t.baseURL)),
    t
  );
}
var pl = {
  warnKeys(e) {
    if (
      e.scene ||
      e.page ||
      e.assetSources ||
      e.presets?.colorPalettes ||
      e.presets?.images ||
      e.presets?.pageFormats ||
      e.presets?.colorPalettes ||
      e.variables ||
      e.callbacks?.log ||
      e.initialSceneMode ||
      e.initialSceneString ||
      e.initialSceneURL ||
      e.initialImageURL
    )
      return "Your configuration contains keys that are no longer supported and will be ignored. Refer to https://img.ly/docs/cesdk/introduction/migration_1_13/ for information about the removed keys.";
  },
};
function _warnKeys(e, t) {
  return t
    ? e.flatMap((e) => {
        const r = e.warnKeys?.(t);
        return "string" == typeof r ? [r] : r ?? [];
      })
    : [];
}
function _applyFallback(e, t, r) {
  if (t) for (const n of e) n.applyFallback?.(t, r);
}
function _migrateConfigObject(e, t) {
  return t
    ? e.reduce(
        (e, t) => (t.migrateConfigObject ? t.migrateConfigObject(e) : e),
        t
      )
    : t;
}
var yl,
  bl,
  wl,
  _l,
  El = [
    pl,
    new (class _TypefaceMigration {
      static APIFALLBACK_TYPEFACES_SOURCE_ID = "apiFallbackTypefaces";
      warnKeys(e) {
        if (e.presets?.typefaces)
          return "The `presets.typefaces` configuration option is deprecated. Use the AssetAPI to add typefaces instead.";
      }
      applyFallback(e, t) {
        if (e)
          try {
            const r = t.asset;
            if (e.presets?.typefaces) {
              r.addLocalSource(
                _TypefaceMigration.APIFALLBACK_TYPEFACES_SOURCE_ID
              );
              for (const [t, n] of Object.entries(e.presets.typefaces))
                r.addAssetToSource(
                  _TypefaceMigration.APIFALLBACK_TYPEFACES_SOURCE_ID,
                  {
                    id: t,
                    payload: {
                      typeface: {
                        name: n.family,
                        fonts: n.fonts.map((e) => ({
                          subFamily: `${e.weight} ${e.style}`,
                          style: e.style,
                          uri: e.fontURL,
                          weight: e.weight,
                        })),
                      },
                    },
                  }
                );
            }
          } catch (e) {
            console.error(e);
          }
      }
    })(),
  ];
function Cl(e, t, r = void 0) {
  const n = (e) => {
      St(t.setContext("")), e.preventDefault();
    },
    o = (e) => {
      St(t.setContext("!canvas")), r && r(), e.preventDefault();
    };
  return (
    e.addEventListener("webglcontextlost", n, !1),
    e.addEventListener("webglcontextrestored", o, !1),
    () => {
      e.removeEventListener("webglcontextlost", n),
        e.removeEventListener("webglcontextrestored", o);
    }
  );
}
function Sl(e) {
  const t = {
    key: 255,
    characters: e.key,
    shiftIsHeld: e.shiftKey,
    commandIsHeld: e.metaKey || e.ctrlKey,
    optionIsHeld: e.altKey,
    timestamp: Date.now(),
  };
  switch (e.key.toUpperCase()) {
    case "0":
      t.key = 0;
      break;
    case "1":
      t.key = 1;
      break;
    case "2":
      t.key = 2;
      break;
    case "3":
      t.key = 3;
      break;
    case "4":
      t.key = 4;
      break;
    case "5":
      t.key = 5;
      break;
    case "6":
      t.key = 6;
      break;
    case "7":
      t.key = 7;
      break;
    case "8":
      t.key = 8;
      break;
    case "9":
      t.key = 9;
      break;
    case "A":
      t.key = 10;
      break;
    case "B":
      t.key = 11;
      break;
    case "C":
      t.key = 12;
      break;
    case "D":
      t.key = 13;
      break;
    case "E":
      t.key = 14;
      break;
    case "F":
      t.key = 15;
      break;
    case "G":
      t.key = 16;
      break;
    case "H":
      t.key = 17;
      break;
    case "I":
      t.key = 18;
      break;
    case "J":
      t.key = 19;
      break;
    case "K":
      t.key = 20;
      break;
    case "L":
      t.key = 21;
      break;
    case "M":
      t.key = 22;
      break;
    case "N":
      t.key = 23;
      break;
    case "O":
      t.key = 24;
      break;
    case "P":
      t.key = 25;
      break;
    case "Q":
      t.key = 26;
      break;
    case "R":
      t.key = 27;
      break;
    case "S":
      t.key = 28;
      break;
    case "T":
      t.key = 29;
      break;
    case "U":
      t.key = 30;
      break;
    case "V":
      t.key = 31;
      break;
    case "W":
      t.key = 32;
      break;
    case "X":
      t.key = 33;
      break;
    case "Y":
      t.key = 34;
      break;
    case "Z":
      t.key = 35;
      break;
    case " ":
      t.key = 42;
      break;
    case "ESCAPE":
      (t.key = 43), (t.characters = "");
      break;
    case "BACKSPACE":
      (t.key = 40), (t.characters = "");
      break;
    case "DELETE":
      (t.key = 44), (t.characters = "");
      break;
    case "ENTER":
      (t.key = 41), (t.characters = t.shiftIsHeld ? "\u2028" : "\n");
      break;
    case "CONTROL":
      (t.key = 45), (t.characters = "");
      break;
    case "ALT":
      (t.key = 46), (t.characters = "");
      break;
    case "SHIFT":
      (t.key = 47), (t.characters = "");
      break;
    case "ARROWLEFT":
      (t.key = 36), (t.characters = "");
      break;
    case "ARROWRIGHT":
      (t.key = 37), (t.characters = "");
      break;
    case "ARROWUP":
      (t.key = 38), (t.characters = "");
      break;
    case "ARROWDOWN":
      (t.key = 39), (t.characters = "");
      break;
    case "DEAD":
      (t.key = 255), (t.characters = "");
  }
  return t;
}
(wl = [Jt]), (bl = [Jt]), (yl = [Jt]);
var kl = class {
  constructor(e) {
    executeInitializers(_l, 5, this),
      defineProperty(this, "ubique"),
      defineProperty(this, "notificationStream", (e) => {
        const t = this.ubique.addEventCallback("NotificationEvent", (t) =>
          e({ type: Vc[t.type], i18n: t.i18n })
        );
        return () => {
          t.dispose(), t.delete();
        };
      }),
      defineProperty(this, "designElementLifecycleStream", (e) => (t) => {
        const r = this.ubique.addEventCallback(e, t);
        return () => {
          r.dispose(), r.delete();
        };
      }),
      defineProperty(this, "historyStream", (e) => {
        const t = this.ubique.addEventCallback("HistoryUpdatedEvent", e);
        return () => {
          t.dispose(), t.delete();
        };
      }),
      (this.ubique = e.getInternalAPI());
  }
  dispose() {
    this.ubique.delete();
  }
  setErrorCallback(e, t) {
    this.ubique.setErrorCallback(e, t);
  }
  getSelectedText() {
    return St(this.ubique.getSelectedText());
  }
  hasComponent(e, t) {
    return St(this.ubique.hasComponent(e, t));
  }
  getValue(e, t, r) {
    return St(this.ubique.getValue(e, t, r));
  }
  execute(e, t) {
    let r;
    const n = new Promise((n, o) => {
      r = this.ubique.ubqExecute(e, t, (e) => {
        try {
          const t = St(e);
          n(t);
        } catch (e) {
          o(e);
        }
      });
    });
    return St(r), n;
  }
  sendKey(e) {
    return this.execute("ubq/inputs/keyboardkey", Sl(e));
  }
  changeSceneLayout(e, t, r, n) {
    return this.execute("ubq/scene/changeLayout", [e, zc[t], r, n]);
  }
};
defineMember((_l = createMetadataArray(null)), 1, "getSelectedText", wl, kl),
  defineMember(_l, 1, "hasComponent", bl, kl),
  defineMember(_l, 1, "getValue", yl, kl),
  assignMetadata(_l, kl);
var xl = !1;
var Tl = "https://api.img.ly/activate";
var Al = cloneWithPrototypeAndProperties(cesdkCore()),
  Pl = "./cesdk-v1.37.0-XHZXX7DG.data",
  Fl = "./cesdk-v1.37.0-PJWLHKQM.wasm",
  Ll = Al.default,
  Rl =
    (!(
      "undefined" == typeof window ||
      !window.document ||
      !window.document.createElement
    ) &&
      navigator &&
      navigator.userAgent) ||
    "",
  Bl = -1 !== Rl.indexOf("Edge"),
  Dl = !!Rl.match(/msie|trident/i),
  Ml =
    /\b(iPad|iPhone|iPod)\b/.test(Rl) &&
    /WebKit/.test(Rl) &&
    !/Edge/.test(Rl) &&
    ("undefined" == typeof window || !("MSStream" in window)),
  Ol = (e, t) => {
    if (null != t) {
      return [t, e.split("/").pop()].join("");
    }
    return new URL(e, window.location.origin);
  };
function Il() {
  try {
    return new WebAssembly.Memory({
      initial: jl(Ml ? 512 : 32),
      maximum: jl(2048),
    });
  } catch (e) {
    return new WebAssembly.Memory({ initial: jl(32), maximum: jl(2048) });
  }
}
function jl(e) {
  return (1024 * e * 1024) / 65536;
}
async function Ul(e, t) {
  const { core: r } = t,
    n = t.logger,
    o = Ol(Fl, r.baseURL).toString(),
    i = Ol(Pl, r.baseURL).toString(),
    a = /electron/i.test(navigator.userAgent),
    s = (function (e, t = fetch) {
      if (!e.license) throw new Error("Missing license key in config");
      return e.license.length < 128
        ? t(Tl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ apiKey: e.license, userId: e.userId }),
          })
            .then((e) => {
              if (e.ok) return e.json();
              throw new Error(
                "Unfortunately we are experiencing a server down time and your License key cannot be validated. We're already working on a fix and will restore service soon. Should services not restore within the hour, kindly get in touch with our support team."
              );
            })
            .then((e) => {
              if ("valid" === e.status) return e.license;
              throw "expired" === e.status
                ? new Error(
                    "Thanks for using IMG.LY for creative editing. Please note that your license file or commercial use is expired. Please get in touch with our sales team to discuss extension of your commercial license."
                  )
                : new Error(
                    "The License Key (API Key) you are using to access the IMG.LY SDK is invalid. Please ensure that you are using the license key tied to your subscription and get in touch with our support team."
                  );
            })
        : Promise.resolve(e.license);
    })(t),
    u = a
      ? await fetch(i, { credentials: "same-origin" })
          .then((e) => e.arrayBuffer())
          .then(
            (e) =>
              function (t, r) {
                if (t !== i) return null;
                if (r === e.byteLength) return e;
                throw new Error(
                  `Attempt to get preloaded package of unknown name or size: ${t} ${r}`
                );
              }
          )
      : void 0;
  return new Promise((r, a) => {
    const c = {
      getPreloadedPackage: u,
      locateFile: (e, t) =>
        e.endsWith(".wasm") ? o : e.endsWith(".data") ? i : t + e,
      print: (e) => {
        e && "undefined" !== e && n(e, "Info");
      },
      printErr: (e) => {
        e && "undefined" !== e && n(e, "Error");
      },
      logReadFiles: !1,
      printWithColors: !0,
      wasmMemory: Il(),
    };
    Ll(c)
      .then(async (n) => {
        n.specialHTMLTargets["!canvas"] = e;
        n.emscripten_ubq_settings_forceWebGL1 = Ml || !!t?.forceWebGL1;
        const o = St(n.createEngine("!canvas", t.audioOutput ?? "auto"));
        !(function (e, t) {
          if (!t) throw new Error("Missing license key");
          St(e.unlockWithLicense(t));
        })(o, await s),
          (function (e, t) {
            const r = new EditorAPI(e),
              n = new AssetAPI(e);
            if ((r.setRole(t.role ?? "Creator"), xl)) {
              const t = new kl(e);
              t.execute("cesdk/getVersionInfo").then((e) => console.debug(e)),
                t
                  .execute("cesdk/getCapabilitiesInfo")
                  .then((e) => console.debug(e)),
                t.dispose();
            }
            r.setSettingString("basePath", t.baseURL),
              r.setSettingBool("showBuildVersion", xl || !1),
              t.featureFlags?.preventScrolling &&
                (r.setSettingBool("touch/singlePointPanning", !1),
                r.setSettingBool("touch/dragStartCanSelect", !1)),
              n.addLocalSource("ly.img.text"),
              (function () {
                xl &&
                  (r.setSettingBool(
                    "features/hspSelectiveAdjustmentsEnabled",
                    !1
                  ),
                  r.setSettingBool("features/templatingEnabled", !0));
                const e = !!t.featureFlags?.singlePageMode;
                r.setSettingBool("features/singlePageModeEnabled", e),
                  r.setSettingBool("features/effectsEnabled", !0);
              })(),
              (function () {
                const t = new VariableAPI(e);
                (xl || ("undefined" != typeof window && window.Cypress)) &&
                  (t.setString("company_name", "img.ly"),
                  t.setString("first_name", "Charly"),
                  t.setString("last_name", "Williams"),
                  t.setString("address", "742 Evergreen Terrace"),
                  t.setString("city", "Springfield"));
              })(),
              r.startTracking(t.license, t.userId ?? "");
          })(o, t),
          r(o);
      })
      .catch(a);
  });
}
var $l = class {
    _reactor;
    _updateHandler = null;
    debugName;
    dirty = !0;
    readCalls = new Set();
    constructor(e, t) {
      (this.debugName = t), (this._reactor = e);
    }
    dispose() {
      (this._updateHandler = null),
        this._reactor._unregisterReaction(this),
        (this._reactor = null);
    }
    track(e) {
      return this._reactor._trackReaction(this, e);
    }
    subscribe(e) {
      return (
        this._reactor._registerReaction(this),
        (this._updateHandler = e),
        () => {
          (this._updateHandler = null), this._reactor._unregisterReaction(this);
        }
      );
    }
    update() {
      this._updateHandler?.();
    }
  },
  ql = cloneWithPrototypeAndProperties(lodashIsEqual()),
  Hl = Symbol("NO_VALUE"),
  Nl = class {
    callId;
    _value = Hl;
    _lastUpdateValue = Hl;
    _readFromEngine;
    constructor(e, t) {
      (this.callId = e),
        (this._readFromEngine = t),
        this.read(),
        (this._lastUpdateValue = this._value);
    }
    readCachedValue() {
      return this._value === Hl || this.revalidate ? this.read() : this._value;
    }
    revalidate = !1;
    invalidate() {
      this.revalidate = !0;
    }
    read() {
      const e = this._readFromEngine();
      return (
        (this.revalidate = !1),
        (0, ql.default)(this._value, e) ? this._value : ((this._value = e), e)
      );
    }
    updateValueAndCheckDirty() {
      try {
        const e = this.read(),
          t = this._lastUpdateValue !== e;
        return (this._lastUpdateValue = e), t;
      } catch {
        return (this._lastUpdateValue = Hl), !0;
      }
    }
    update(e) {
      this._readFromEngine = e;
    }
  },
  Vl = class {
    readCalls = new Map();
    _createOrUpdateReadCall(e, t) {
      if (this.readCalls.has(e)) {
        this.readCalls.get(e).update(t);
      } else this.readCalls.set(e, new Nl(e, t));
    }
    registeredReactions = new Set();
    activeReactions = new Set();
    get isTracking() {
      return this.activeReactions.size > 0;
    }
    _nextReaction;
    _resolveNextReaction;
    _createNextReaction() {
      this._nextReaction = new Promise((e) => {
        this._resolveNextReaction = e;
      });
    }
    constructor() {
      this._createNextReaction();
    }
    get nextReaction() {
      return this._nextReaction;
    }
    _getterCalled(e, t) {
      if (this.isTracking) {
        this._createOrUpdateReadCall(e, t);
        for (const t of this.activeReactions) t.readCalls.add(e);
      }
    }
    _setterCalled() {
      for (const e of this.readCalls.values()) e.invalidate();
    }
    read(e, t) {
      return this.isTracking && this.readCalls.has(e)
        ? this.readCalls.get(e).readCachedValue()
        : t();
    }
    createReaction(e) {
      return new $l(this, e);
    }
    _registerReaction(e) {
      this.registeredReactions.add(e);
    }
    _unregisterReaction(e) {
      this.registeredReactions.delete(e);
    }
    _cleanupReadCalls() {
      const e = new Set();
      for (const t of this.registeredReactions)
        for (const r of t.readCalls) e.add(r);
      for (const [t] of this.readCalls) e.has(t) || this.readCalls.delete(t);
    }
    #s = new Set();
    updateDirtyReactions() {
      const e = new Set();
      for (const [t, r] of this.readCalls)
        r.updateValueAndCheckDirty() && e.add(t);
      if (e.size > 0)
        for (const t of this.registeredReactions)
          if (!t.dirty)
            for (const r of t.readCalls)
              if (e.has(r)) {
                t.dirty = !0;
                break;
              }
      for (const e of this.registeredReactions)
        if (!this.#s.has(e) && e.dirty)
          try {
            this.#s.add(e), e.update();
          } finally {
            (e.dirty = !1), this.#s.delete(e);
          }
      this._cleanupReadCalls(),
        this._resolveNextReaction(),
        this._createNextReaction();
    }
    _trackReaction(e, t) {
      try {
        return this.activeReactions.add(e), e.readCalls.clear(), t();
      } finally {
        (e.dirty = !1), this.activeReactions.delete(e);
      }
    }
    decorateFunction(e, t) {
      return (function (e, t, r = t.name) {
        tr[r] ??= 0;
        const n = tr[r]++;
        return function (...o) {
          const i = this,
            a = `${r}${n}-${JSON.stringify(o, null, 0)}`;
          function s() {
            return Reflect.apply(t, i, o);
          }
          return e._getterCalled(a, s), e.read(a, s);
        };
      })(this, e, t);
    }
    decorateObject(e) {
      return (function (e, t) {
        const r = t.constructor?.name ?? crypto.randomUUID(),
          n = [];
        let o = !1;
        const i = Object.getOwnPropertyNames(t.constructor.prototype).concat(
          Object.getOwnPropertyNames(t)
        );
        for (const s of i) {
          const i = t[s];
          if ("function" == typeof (a = i) && Qt in a)
            if ("getter" === i[Qt].type) {
              let a = function (...t) {
                if (o) throw new Error("Disposed @getter proxy called");
                const n = this,
                  a = `${r}-${s.toString()}-${JSON.stringify(t, null, 0)}`;
                function u() {
                  return Reflect.apply(i, n, t);
                }
                return e._getterCalled(a, u), e.read(a, u);
              };
              n.push(rr(t, s, i)), (t[s] = a);
            } else if ("setter" === i[Qt].type) {
              let r = function (...t) {
                if (o) throw new Error("Disposed @setter proxy called");
                const r = this;
                return e._setterCalled(), Reflect.apply(i, r, t);
              };
              n.push(rr(t, s, i)), (t[s] = r);
            }
        }
        var a;
        return function () {
          o = !0;
          for (const e of n) e();
          n.length = 0;
        };
      })(this, e);
    }
    dispose() {
      this.registeredReactions.forEach((e) => e.dispose()),
        this.registeredReactions.clear(),
        this.readCalls.clear(),
        this.activeReactions.clear();
    }
  },
  zl =
    'url("data:image/svg+xml,%3Csvg width=%2722%27 height=%2725%27 viewBox=%270 0 22 25%27 fill=%27none%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg filter=%27url(%23filter0_d)%27%3E%3Cpath d=%27M18 11.1071C18 14.5637 15.5566 17.4515 12.3314 18.0846V20L7.20308 17.0145L12.3314 14.0289V15.7825C14.3292 15.1951 15.7946 13.3221 15.7946 11.107C15.7946 8.42285 13.6437 6.23908 11 6.23908C8.35629 6.23908 6.20542 8.42285 6.20542 11.107C6.20542 11.8299 6.35745 12.5252 6.65738 13.1736L4.66118 14.1255C4.22245 13.1771 4 12.1616 4 11.1071C4.00007 7.18825 7.1403 4 11.0001 4C14.8599 4 18 7.18825 18 11.1071Z%27 fill=%27black%27/%3E%3Cpath d=%27M12.8314 15.0559V14.0289V13.1593L12.0799 13.5968L6.95152 16.5824L6.20927 17.0145L6.95152 17.4466L12.0799 20.4321L12.8314 20.8696V20V18.4841C16.0889 17.6521 18.5 14.6573 18.5 11.1071C18.5 6.9193 15.1431 3.5 11.0001 3.5C6.85702 3.5 3.50008 6.91929 3.5 11.1071V11.1071C3.5 12.2334 3.73793 13.3206 4.20739 14.3354L4.41978 14.7946L4.8764 14.5768L6.8726 13.6249L7.31866 13.4122L7.11118 12.9637C6.84206 12.3819 6.70542 11.7584 6.70542 11.107C6.70542 8.69181 8.63956 6.73908 11 6.73908C13.3604 6.73908 15.2946 8.69181 15.2946 11.107C15.2946 12.8513 14.2837 14.3564 12.8314 15.0559Z%27 stroke=%27white%27/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id=%27filter0_d%27 x=%270.0599999%27 y=%270.0599999%27 width=%2721.88%27 height=%2724.6193%27 filterUnits=%27userSpaceOnUse%27 color-interpolation-filters=%27sRGB%27%3E%3CfeFlood flood-opacity=%270%27 result=%27BackgroundImageFix%27/%3E%3CfeColorMatrix in=%27SourceAlpha%27 type=%27matrix%27 values=%270 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0%27/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation=%271.47%27/%3E%3CfeColorMatrix type=%27matrix%27 values=%270 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0%27/%3E%3CfeBlend mode=%27normal%27 in2=%27BackgroundImageFix%27 result=%27effect1_dropShadow%27/%3E%3CfeBlend mode=%27normal%27 in=%27SourceGraphic%27 in2=%27effect1_dropShadow%27 result=%27shape%27/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E") 12 12, pointer';
function Wl(e, t) {
  let r;
  return t.onStateChanged(() => {
    const n = (function (e, t) {
      switch (e) {
        case "Arrow":
          return "default";
        case "Move":
          return "move";
        case "MoveNotPermitted":
          return "auto";
        case "Resize": {
          const e = (180 * t) / Math.PI + 45;
          if (!Dl && !Bl)
            return `url("data:image/svg+xml,%3Csvg style='transform: rotate(${e}deg)' width ='22' height ='22' viewBox ='0 0 22 22' fill ='none' xmlns ='http://www.w3.org/2000/svg'%3E%3Cg filter ='url(%23filter0_d)'%3E%3Cpath d ='M13.7 11.1L9.7 15.2L12.5 18H4V9.5L6.9 12.3L10.9 8.3L12.3 6.9L9.5 4H18V12.5L15.2 9.7L13.7 11.1Z' fill ='white'/%3E%3C/g%3E%3Cpath d ='M12.7 10.7L8.3 15.2L10.1 17H5V11.9L6.9 13.8L11.3 9.3L13.8 6.9L11.9 5H17V10.1L15.2 8.3L12.7 10.7Z' fill ='black'/%3E%3Cdefs%3E%3Cfilter id ='filter0_d' x ='0' y ='0' width ='22' height ='22' filterUnits ='userSpaceOnUse' color-interpolation-filters ='sRGB'%3E%3CfeFlood flood-opacity ='0' result ='BackgroundImageFix'/%3E%3CfeColorMatrix in ='SourceAlpha' type ='matrix' values ='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation ='2'/%3E%3CfeColorMatrix type ='matrix' values ='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'/%3E%3CfeBlend mode ='normal' in2 ='BackgroundImageFix' result ='effect1_dropShadow'/%3E%3CfeBlend mode ='normal' in ='SourceGraphic' in2 ='effect1_dropShadow' result ='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E") 12 12, pointer`;
          switch (e) {
            case 90:
            case 270:
              return "nwse-resize";
            case 135:
            case 315:
              return "ns-resize";
            case 180:
            case 360:
              return "nesw-resize";
            case 225:
              return "ew-resize";
            default:
              return "move";
          }
        }
        case "Rotate":
          return zl;
        case "Text":
          return "text";
        default:
          return "auto";
      }
    })(t.getCursorType(), t.getCursorRotation());
    if (n !== r) {
      r = n;
      const t = new CustomEvent("cesdk-cursor", {
        composed: !0,
        bubbles: !0,
        cancelable: !0,
        detail: n,
      });
      e.dispatchEvent(t) && e.style.setProperty("cursor", n);
    }
  });
}
var Gl = function (e, t, r, n, o) {
  let i,
    a = null;
  const s = n.onStateChanged(() => {
    (i = n.getEditMode()),
      "Text" !== i || a
        ? "Text" !== i && a && (a(), (a = null))
        : (a = (function () {
            const i = a();
            return () => {
              i?.();
            };
            function a() {
              let i = !1,
                a = "";
              if (null == e.parentElement)
                return (
                  console.warn(
                    'Could not attach hidden text input to the DOM: Canvas has no parentElement. This can happen if edit mode is switched to "Text", while the canvas is removed from the DOM.'
                  ),
                  () => {}
                );
              const s = c();
              d();
              const u = h();
              return (
                e.parentElement.appendChild(s),
                f(),
                () => {
                  u(), l();
                }
              );
              function c() {
                const e = document.createElement("textarea");
                return (
                  (e.id =
                    "ubq_internal-inline_text_editing_html_representation"),
                  e.setAttribute("data-cy", "inline-text-editing-input"),
                  (e.autocapitalize = "none"),
                  (e.spellcheck = !1),
                  (e.cols = 4096),
                  (e.style.contain = "strict"),
                  (e.style.opacity = "0"),
                  (e.style.pointerEvents = "none"),
                  (e.style.zIndex = "-1"),
                  (e.style.position = "fixed"),
                  (e.style.width = "1px"),
                  (e.style.height = "1px"),
                  (e.style.padding = "0"),
                  (e.style.margin = "-1px"),
                  (e.style.overflow = "hidden"),
                  (e.style.clip = "rect(0, 0, 0, 0)"),
                  (e.style.border = "0"),
                  e
                );
              }
              function l() {
                s.blur(), s.remove();
              }
              function d() {
                const t = n.getTextCursorPositionInScreenSpaceX(),
                  r = n.getTextCursorPositionInScreenSpaceY(),
                  { left: o, top: i } = e.getBoundingClientRect();
                (s.style.left = `${o + t / window.devicePixelRatio}px`),
                  (s.style.top = `${i + r / window.devicePixelRatio}px`);
              }
              function h() {
                const t = e.getRootNode();
                s.addEventListener("input", w),
                  s.addEventListener("keydown", E),
                  s.addEventListener("copy", v),
                  s.addEventListener("cut", y),
                  s.addEventListener("compositionstart", C),
                  s.addEventListener("compositionend", S),
                  s.addEventListener("beforeinput", A),
                  s.addEventListener("focusout", P),
                  t.addEventListener("touchend", T),
                  t.addEventListener("mousedown", T),
                  t.addEventListener("mouseup", x);
                const r = n.onStateChanged(() => {
                  d();
                });
                return () => {
                  s.removeEventListener("input", w),
                    s.removeEventListener("keydown", E),
                    s.removeEventListener("copy", v),
                    s.removeEventListener("cut", y),
                    s.removeEventListener("compositionstart", C),
                    s.removeEventListener("compositionend", S),
                    s.removeEventListener("beforeinput", A),
                    s.removeEventListener("focusout", P),
                    t.removeEventListener("mousedown", T),
                    t.removeEventListener("mouseup", x),
                    t.removeEventListener("touchend", T),
                    r();
                };
              }
              function f() {
                null !== s.parentElement &&
                  (s.focus(), p() || setTimeout(() => s.focus(), 0));
              }
              function p() {
                return s.getRootNode().activeElement === s;
              }
              function m(e) {
                return [...e].length;
              }
              function g(e) {
                const t = e.selectionEnd ?? e.selectionStart ?? 0;
                return m(e.value.substring(0, t));
              }
              function v(e) {
                try {
                  const r = t.getSelectedText();
                  "" !== r &&
                    e.clipboardData &&
                    (e.clipboardData.setData("text/plain", r),
                    e.preventDefault());
                } catch (e) {
                  console.error(e);
                }
              }
              function y(e) {
                try {
                  const r = t.getSelectedText();
                  if ("" !== r && e.clipboardData) {
                    e.clipboardData.setData("text/plain", r),
                      e.preventDefault();
                    const n = {
                      key: 44,
                      characters: "",
                      shiftIsHeld: !1,
                      commandIsHeld: !1,
                      optionIsHeld: !1,
                      timestamp: Date.now(),
                    };
                    t.execute("ubq/inputs/keyboardkey", n);
                  }
                } catch (e) {
                  console.error(e);
                }
              }
              async function b() {
                return (
                  !(!i || r.unstable_isTextCursorInCompositionRange()) &&
                  (await S(), !0)
                );
              }
              function w(e) {
                const r = e.target,
                  { value: n } = r;
                if (i) {
                  const e = g(s);
                  t.execute("ubq/text/compositionUpdate", {
                    value: n,
                    cursorPosition: e,
                  });
                } else n.length > 0 && (r.value = "");
              }
              function _(e) {
                const r = {
                  key: 255,
                  characters: e,
                  shiftIsHeld: !1,
                  commandIsHeld: !1,
                  optionIsHeld: !1,
                  timestamp: Date.now(),
                };
                t.execute("ubq/inputs/keyboardkey", r);
              }
              async function E(e) {
                if (
                  (b(),
                  1 === e.key.length && (a = e.key),
                  "a" === e.key && (e.metaKey || e.ctrlKey))
                )
                  return (
                    i && S(), void (await t.execute("ubq/text/selectAllText"))
                  );
                if ("Escape" === e.key) return void B();
                if (
                  "Backspace" !== e.key &&
                  "Delete" !== e.key &&
                  "ArrowLeft" !== e.key &&
                  "ArrowRight" !== e.key &&
                  "ArrowUp" !== e.key &&
                  "ArrowDown" !== e.key &&
                  "Enter" !== e.key
                )
                  return;
                const r = Sl(e);
                await t.execute("ubq/inputs/keyboardkey", r),
                  e.currentTarget && (s.value = "");
              }
              async function C() {
                (i = !0), await t.execute("ubq/text/compositionStart");
              }
              async function S() {
                i
                  ? ((i = !1),
                    (s.value = ""),
                    t.execute("ubq/text/compositionEnd"))
                  : (s.value = "");
              }
              async function k() {
                if (!i) return;
                o();
                if (await b()) return;
                const e = r.unstable_getCursorPosition(),
                  t = r.unstable_getCompositionRange(),
                  n = e.end - t.start,
                  a = g(s);
                e.start >= t.start && e.start <= 1 + t.end && n !== a && S();
              }
              async function x() {
                k();
              }
              async function T(t) {
                k(),
                  t.target === e &&
                    "Text" === n.getEditMode() &&
                    (f(), t.preventDefault());
              }
              async function A(e) {
                if ((i && !e.isComposing && S(), null === e.data)) return;
                const r = e.target,
                  n = e.data;
                if (await b()) _(a);
                else if (i) {
                  const e = m(n);
                  t.execute("ubq/text/compositionUpdate", {
                    value: n,
                    cursorPosition: e,
                  });
                } else n.length > 0 && ("\n" !== n[0] && _(n), (r.value = ""));
              }
              function P(e) {
                if (R(e.relatedTarget) && F(e.relatedTarget));
                else {
                  L(e);
                }
              }
              function F(t) {
                const r = new CustomEvent("cesdk-blur", {
                  composed: !0,
                  bubbles: !0,
                  cancelable: !0,
                  detail: t,
                });
                return e.dispatchEvent(r);
              }
              function L(t) {
                const r = new CustomEvent("cesdk-refocus", {
                    composed: !0,
                    bubbles: !0,
                    cancelable: !0,
                    detail: t.relatedTarget,
                  }),
                  n = e.dispatchEvent(r);
                return n && f(), n;
              }
              function R(e) {
                return (
                  null != e &&
                  e instanceof HTMLElement &&
                  (e instanceof HTMLTextAreaElement ||
                    (e instanceof HTMLInputElement &&
                      e.type.match("^(text|number|url|email|search|tel)$")) ||
                    e.isContentEditable)
                );
              }
              async function B() {
                n.setEditMode("Transform");
              }
            }
          })());
  });
  return () => {
    a?.(), s();
  };
};
function Xl(e, t, r) {
  const n = [],
    o = (r) => {
      if ("touch" === r.pointerType) return;
      const n = Yl(e, r);
      t.execute("ubq/inputs/mousemove", n);
    },
    i = (o) => {
      if ("touch" === o.pointerType) return;
      const i = {
        ...Yl(e, o),
        button: Kl(o.button),
        state: 0,
        shiftIsHeld: !!o.shiftKey,
      };
      (n[o.button] = !1),
        o.currentTarget.releasePointerCapture(o.pointerId),
        t.execute("ubq/inputs/mousebutton", i),
        r();
    },
    a = (r) => {
      if ("touch" === r.pointerType) return;
      const o = {
        ...Yl(e, r),
        button: Kl(r.button),
        state: 1,
        shiftIsHeld: !!r.shiftKey,
      };
      (n[r.button] = !0),
        r.currentTarget.setPointerCapture(r.pointerId),
        t.execute("ubq/inputs/mousebutton", o);
    },
    s = (r) => {
      if ("touch" === r.pointerType) return;
      const o = { ...Yl(e, r), shiftIsHeld: !!r.shiftKey };
      n.forEach((e, r) => {
        if (e) {
          const e = { ...o, button: r, state: 0 };
          t.execute("ubq/inputs/mousebutton", e);
        }
      }),
        (n.length = 0);
    },
    u = (e) => {
      e.cancelable && e.preventDefault();
    };
  return (
    e.addEventListener("pointerdown", a),
    e.addEventListener("pointerup", i),
    e.addEventListener("pointercancel", i),
    e.addEventListener("pointermove", o),
    e.addEventListener("lostpointercapture", s),
    e.addEventListener("touchmove", u, { passive: !1 }),
    () => {
      e.removeEventListener("pointerdown", a),
        e.removeEventListener("pointerup", i),
        e.removeEventListener("pointercancel", i),
        e.removeEventListener("pointermove", o),
        e.removeEventListener("lostpointercapture", s),
        e.removeEventListener("touchmove", u),
        (e = null);
    }
  );
}
function Yl(e, t) {
  const r = e.getBoundingClientRect(),
    n = r?.top ?? 0,
    o = r?.left ?? 0;
  return {
    position: {
      x: (t.clientX - o) * window.devicePixelRatio,
      y: (t.clientY - n) * window.devicePixelRatio,
    },
    isTouch: !1,
    timestamp: t.timeStamp,
  };
}
function Kl(e) {
  switch (e) {
    case 0:
      return 0;
    case 1:
      return 2;
    case 2:
      return 1;
    default:
      return 255;
  }
}
var Zl = class {
    ubq;
    enabled;
    initialTarget;
    target;
    dispose;
    constructor(e, t) {
      (this.ubq = t),
        (this.enabled = _makeEngineChannel(e.editor.onSettingsChanged, () => {
          const t = e.editor.getSettingBool("mouse/enableZoom"),
            r = e.editor.getSettingBool("mouse/enableScroll");
          return t || r;
        })),
        (this.target = _makeValueChannel(() => {})),
        (this.dispose = () => {
          this.target.update(void 0),
            (this.target = null),
            (this.enabled = null),
            (this.ubq = null),
            (this.initialTarget = null),
            (e = null),
            (t = null);
        });
    }
    initialize(e) {
      let t;
      this.initialTarget = e;
      const r = tl(
        this.enabled.subscribe,
        this.target.subscribe
      )(() => {
        t?.(), (t = void 0);
        const e = this.target.value();
        this.enabled.value() && e && (t = this.addWheelListener(e));
      });
      this.target.update(e);
      return () => {
        r(), t?.();
      };
    }
    setTarget(e) {
      this.target.update(e);
      return () => {
        this.target.update(this.initialTarget);
      };
    }
    addWheelListener(e) {
      const t = (e) => {
        if (!this.initialTarget) throw new Error("initialTarget is not set");
        const t = {
          ...Yl(this.initialTarget, e),
          deltaX: e.deltaX,
          deltaY: e.deltaY,
          deltaMode: e.deltaMode,
          shiftIsHeld: !!e.shiftKey,
          ctrlOrMetaIsHeld: !!e.ctrlKey || !!e.metaKey,
        };
        this.ubq.mouseWheel(t) && (e.stopPropagation(), e.preventDefault());
      };
      e.addEventListener("wheel", t, { passive: !1, capture: !0 });
      return () => {
        e.removeEventListener("wheel", t, { capture: !0 }), (e = null);
      };
    }
  },
  Ql = class {
    active = !1;
    enableDebug = !1;
    timestamp = 0;
    baseTouches = [];
    touches = [];
    currentTransform;
    constructor() {
      this.currentTransform = this.emptyTransform();
    }
    touchAddRemove(e) {
      const t = new Array(e.touches.length);
      for (let r = 0; r < e.touches.length; r++) {
        const n = e.touches.item(r);
        t[r] = Jl(n);
      }
      this.touches = t;
    }
    touchUpdate(e) {
      for (let t = 0; t < e.touches.length; t++) {
        const r = e.touches.item(t),
          n = this.touches.find((e) => e.identifier === r.identifier);
        if (!n) return;
        (n.x = r.clientX), (n.y = r.clientY);
      }
    }
    listen(e) {
      return (
        e.addEventListener("touchstart", this.touchstart, { passive: !0 }),
        e.addEventListener("touchend", this.touchend),
        e.addEventListener("touchcancel", this.touchcancel),
        e.addEventListener("touchmove", this.touchmove, { passive: !0 }),
        () => {
          e.removeEventListener("touchstart", this.touchstart),
            e.removeEventListener("touchend", this.touchend),
            e.removeEventListener("touchcancel", this.touchcancel),
            e.removeEventListener("touchmove", this.touchmove);
        }
      );
    }
    touchstart = (e) => {
      this.touchAddRemove(e),
        (this.timestamp = e.timeStamp),
        this.process("touchstart");
    };
    touchend = (e) => {
      this.touchAddRemove(e),
        (this.timestamp = e.timeStamp),
        this.process("touchend");
    };
    touchcancel = (e) => {
      this.touchAddRemove(e),
        (this.timestamp = e.timeStamp),
        this.process("touchcancel");
    };
    touchmove = (e) => {
      this.touchUpdate(e),
        (this.timestamp = e.timeStamp),
        this.process("touchmove");
    };
    debugState;
    debug() {
      if (!this.enableDebug) return;
      const e = JSON.stringify(this.currentTransform);
      function t(e, [t, r, n], o) {
        const i = document.createElement("div");
        return (
          (i.style.position = "fixed"),
          (i.style.top = "-25px"),
          (i.style.left = "-25px"),
          (i.style.width = "50px"),
          (i.style.height = "50px"),
          (i.style.border = `3px ${o} rgb(${t},${r},${n})`),
          (i.style.borderRadius = "50%"),
          (i.style.borderStyle = o),
          (i.style.backgroundColor = `rgba(${t},${r},${n}, 0.5)`),
          (i.style.transformOrigin = "center"),
          (i.style.textAlign = "center"),
          (i.innerHTML = e),
          (i.style.display = "none"),
          document.body.appendChild(i),
          i
        );
      }
      this.debugState ||
        (this.debugState = {
          touches: [
            t("T1", [218, 212, 104], "solid"),
            t("T2", [218, 212, 104], "solid"),
          ],
          value: this.debugValueDiv(void 0, e, this.touches, [218, 212, 104]),
          baseTouches: [
            t("B1", [128, 128, 128], "solid"),
            t("B2", [128, 128, 128], "solid"),
          ],
        }),
        (this.debugState.touches[0].style.display = this.touches[0]
          ? "block"
          : "none"),
        (this.debugState.touches[1].style.display = this.touches[1]
          ? "block"
          : "none"),
        (this.debugState.baseTouches[0].style.display = this.baseTouches[0]
          ? "block"
          : "none"),
        (this.debugState.baseTouches[1].style.display = this.baseTouches[1]
          ? "block"
          : "none"),
        this.touches[0] &&
          (this.debugState.touches[0].style.transform = `translate(${this.touches[0]?.x}px, ${this.touches[0]?.y}px)`),
        this.touches[1] &&
          (this.debugState.touches[1].style.transform = `translate(${this.touches[1]?.x}px, ${this.touches[1]?.y}px)`),
        this.baseTouches[0] &&
          (this.debugState.baseTouches[0].style.transform = `translate(${this.baseTouches[0]?.x}px, ${this.baseTouches[0]?.y}px)`),
        this.baseTouches[1] &&
          (this.debugState.baseTouches[1].style.transform = `translate(${this.baseTouches[1]?.x}px, ${this.baseTouches[1]?.y}px)`),
        (this.debugState.value = this.debugValueDiv(
          this.debugState.value,
          e,
          this.touches
        ));
    }
    debugValueDiv(e, t, r, n) {
      if (!e) {
        const [t, r, o] = n ?? [128, 128, 128];
        ((e = document.createElement("div")).style.position = "fixed"),
          (e.style.top = "50px"),
          (e.style.left = "50px"),
          (e.style.width = "300px"),
          (e.style.height = "100px"),
          (e.style.border = `3px solid rgb(${t},${r},${o})`),
          (e.style.borderStyle = "dashed"),
          (e.style.backgroundColor = `rgba(${t},${r},${o}, 0.5)`),
          (e.style.transformOrigin = "center"),
          (e.style.overflow = "visible"),
          (e.style.textOverflow = "visible"),
          (e.style.display = "none"),
          document.body.appendChild(e);
      }
      return (
        this.active
          ? (e.style.borderStyle = "solid")
          : (e.style.borderStyle = "dashed"),
        0 === r.length
          ? ((e.style.display = "none"), e)
          : ((e.style.display = "block"), (e.innerHTML = t), e)
      );
    }
    resetBaseTouches() {
      this.baseTouches = this.touches.map(Jl);
    }
    process(e) {
      if ("touchcancel" === e)
        return (
          this.resetBaseTouches(), this.reset(), this.debug(), void this.emit(2)
        );
      ("touchstart" !== e && "touchend" !== e) ||
        (this.resetBaseTouches(), this.debug()),
        !this.active &&
          this.shouldStart() &&
          ((this.active = !0), this.emit(0)),
        "touchmove" === e &&
          ((this.currentTransform = this.calculateTransform()),
          this.active && this.emit(1)),
        this.debug(),
        this.active &&
          this.shouldStop() &&
          ((this.active = !1), this.emit(2), this.reset());
    }
    shouldStart() {
      return 2 === this.touches.length;
    }
    shouldStop() {
      return 2 !== this.touches.length;
    }
    emit(e) {
      const t = {
          timestamp: this.timestamp,
          state: e,
          touchPoints: this.touches,
        },
        r = this.makeEvent(t);
      for (const e of this.handlers) e(r);
    }
    handlers = new Set();
    addListener(e) {
      return (
        this.handlers.add(e),
        () => {
          this.handlers.delete(e);
        }
      );
    }
    reset() {
      (this.active = !1), (this.currentTransform = this.emptyTransform());
    }
  };
function Jl(e) {
  if (null != e)
    return e instanceof Touch
      ? { identifier: e.identifier, x: e.clientX, y: e.clientY }
      : { identifier: e.identifier, x: e.x, y: e.y };
}
var ed = class _PanRecognizer extends Ql {
  static PAN_THRESHOLD = 10;
  makeEvent(e) {
    const t = 0 === e.state ? { x: 0, y: 0 } : this.currentTransform;
    return { ...e, panDistance: t };
  }
  calculateTransform() {
    const e = rd(this.touches),
      t = rd(this.baseTouches);
    return { x: e.x - t.x, y: e.y - t.y };
  }
  emptyTransform() {
    return { x: 0, y: 0 };
  }
  shouldStart() {
    return (
      super.shouldStart() &&
      td(this.calculateTransform()) > _PanRecognizer.PAN_THRESHOLD
    );
  }
};
function td(e) {
  return Math.sqrt(e.x ** 2 + e.y ** 2);
}
function rd(e) {
  let t = 0,
    r = 0;
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    (t += o.x), (r += o.y);
  }
  return (t /= e.length), (r /= e.length), { x: t, y: r };
}
var nd = class _PinchRecognizer extends Ql {
    static PINCH_THRESHOLD = 0.2;
    makeEvent(e) {
      return { ...e, scale: this.currentTransform };
    }
    calculateTransform() {
      const e = this.baseTouches,
        t = this.touches;
      if (2 !== e.length || 2 !== t.length) return 1;
      const r = Math.sqrt(
        Math.pow(e[0].x - e[1].x, 2) + Math.pow(e[0].y - e[1].y, 2)
      );
      return (
        Math.sqrt(Math.pow(t[0].x - t[1].x, 2) + Math.pow(t[0].y - t[1].y, 2)) /
        r
      );
    }
    emptyTransform() {
      return 1;
    }
    shouldStart() {
      return (
        super.shouldStart() &&
        Math.abs(this.calculateTransform() - 1) >
          _PinchRecognizer.PINCH_THRESHOLD
      );
    }
  },
  od = class _PointRecognizer extends Ql {
    static DISTANCE_THRESHOLD = 5;
    static TAP_MAX_TIME = 250;
    lastPosition = { x: 0, y: 0 };
    makeEvent(e) {
      const t = this.tapDetected ? this.tapLocation : e.touchPoints[0];
      return 0 === e.state
        ? ((this.lastPosition = t),
          {
            button: 0,
            state: 1,
            position: t,
            shiftIsHeld: !1,
            isTouch: !0,
            timestamp: e.timestamp,
          })
        : 2 === e.state
        ? {
            button: 0,
            state: 0,
            position: t ?? this.lastPosition,
            shiftIsHeld: !1,
            isTouch: !0,
            timestamp: e.timestamp,
          }
        : ((this.lastPosition = t),
          { position: t, isTouch: !0, timestamp: e.timestamp });
    }
    previousNumTouches = 0;
    fingerDownTimestamp = 0;
    tapDetected = !1;
    tapLocation = { x: 0, y: 0 };
    process(e) {
      if ("touchstart" === e || "touchend" === e) {
        this.tapDetected = !1;
        const e = 1 === this.touches.length && 0 === this.previousNumTouches,
          t = 0 === this.touches.length && 1 === this.previousNumTouches;
        e &&
          ((this.fingerDownTimestamp = performance.now()),
          (this.tapLocation = this.touches[0])),
          t &&
            performance.now() - this.fingerDownTimestamp <
              _PointRecognizer.TAP_MAX_TIME &&
            (this.tapDetected = !0),
          (this.previousNumTouches = this.touches.length);
      }
      super.process(e);
    }
    calculateTransform() {
      if (0 === this.touches.length || 0 === this.baseTouches.length)
        return { x: 0, y: 0 };
      const e = this.touches[0],
        t = this.baseTouches[0];
      return { x: e.x - t.x, y: e.y - t.y };
    }
    emptyTransform() {
      return { x: 0, y: 0 };
    }
    shouldStart() {
      return (
        this.tapDetected ||
        (1 === this.touches.length &&
          td(this.calculateTransform()) > _PointRecognizer.DISTANCE_THRESHOLD)
      );
    }
    shouldStop() {
      return 1 !== this.touches.length;
    }
  },
  id = class _RotateRecognizer extends Ql {
    static ROTATE_THRESHOLD = 0.1;
    makeEvent(e) {
      return { ...e, rotation: this.currentTransform };
    }
    calculateTransform() {
      const e = this.baseTouches,
        t = this.touches;
      if (e.length < 2 || t.length < 2) return 0;
      const r = Math.atan2(e[1].y - e[0].y, e[1].x - e[0].x);
      return Math.atan2(t[1].y - t[0].y, t[1].x - t[0].x) - r;
    }
    emptyTransform() {
      return 0;
    }
    shouldStart() {
      return (
        super.shouldStart() &&
        Math.abs(this.calculateTransform()) > _RotateRecognizer.ROTATE_THRESHOLD
      );
    }
  };
function ad(e, t, r) {
  const n = [],
    o = new od();
  n.push(o.listen(e)),
    n.push(
      o.addListener((n) => {
        "button" in n
          ? (t.execute("ubq/inputs/mousebutton", sd(e, n)), r.update())
          : t.execute("ubq/inputs/mousemove", sd(e, n));
      })
    );
  const i = new ed();
  n.push(i.listen(e)),
    n.push(
      i.addListener((r) => {
        t.execute("ubq/inputs/touchpan", sd(e, r));
      })
    );
  const a = new nd();
  n.push(a.listen(e)),
    n.push(
      a.addListener((r) => {
        t.execute("ubq/inputs/touchpinch", sd(e, r));
      })
    );
  const s = new id();
  return (
    n.push(s.listen(e)),
    n.push(
      s.addListener((r) => {
        t.execute("ubq/inputs/touchrotate", sd(e, r));
      })
    ),
    () => {
      n.forEach((e) => e());
    }
  );
}
function sd(e, t) {
  const r = window.devicePixelRatio ?? 1,
    { top: n, left: o } = e.getBoundingClientRect();
  if (1 === r && 0 === n && 0 === o) return t;
  const i = (e) => ({ x: (e.x - o) * r, y: (e.y - n) * r });
  if ("position" in t) return { ...t, position: i(t.position) };
  const a = t.touchPoints.map(i);
  return "panDistance" in t
    ? { ...t, touchPoints: a, panDistance: i(t.panDistance) }
    : { ...t, touchPoints: a };
}
function ud(e, t, r = Number.EPSILON) {
  return Math.abs(e - t) < r;
}
var cd = "assets/core/worker-host-v1.37.0.js",
  ld = "application/javascript";
var dd,
  hd,
  LogLevel = { Info: "Info", Warning: "Warning", Error: "Error" };
((hd = dd || (dd = {})).start = function (e) {
  return { ...e, msg: "exportVideo" };
}),
  (hd.abort = function () {
    return { msg: "exportVideoAbort" };
  }),
  (hd.finished = function (e) {
    return { ...e, msg: "exportVideoFinished" };
  }),
  (hd.error = function (e) {
    return { ...e, msg: "exportVideoError" };
  }),
  (hd.progress = function (e) {
    return { ...e, msg: "exportVideoProgress" };
  }),
  (hd.log = function (e) {
    return { ...e, msg: "exportLog" };
  });
var WorkerClient = class {
  configuration;
  constructor(e) {
    this.configuration = e;
  }
  async exportVideo(e, t, r, n, o) {
    const { abortSignal: i, inactivityTimeout: a } = n ?? {},
      s = await (async function (e) {
        const t = cd.toString().split("/").pop(),
          r = await (async function (e) {
            if (
              !(e = e.toString()).includes("://") ||
              e.includes(window.location.origin)
            )
              return e;
            const t = `const _importScripts = importScripts;\n     const _fixImports = (url) => new URL(url, '${new URL(
              e
            ).href
              .split("/")
              .slice(0, -1)
              .join(
                "/"
              )}/').href;\n     importScripts = (...urls) => _importScripts(...urls.map(_fixImports));`;
            return URL.createObjectURL(
              new Blob([`${t}importScripts("${e}")`], { type: ld })
            );
          })(new URL(t, e.core.baseURL));
        return new Worker(r);
      })(this.configuration),
      u = (function (e) {
        return {
          baseURL: e.baseURL,
          license: e.license,
          core: e.core,
          role: e.role,
          presets: e.presets,
          featureFlags: e.featureFlags,
          forceWebGL1: e.forceWebGL1,
          audioOutput: e.audioOutput,
        };
      })(this.configuration),
      c = new Promise((e, t) => {
        if (
          ((s.onmessage = ({ data: r }) => {
            if ("exportVideoFinished" === r.msg) {
              const t = new Blob([r.data], { type: r.mimeType });
              e(t);
            } else
              "exportVideoError" === r.msg
                ? t(r.error)
                : "exportVideoProgress" === r.msg
                ? n?.onProgress?.(
                    r.renderedFrames,
                    r.encodedFrames,
                    r.totalFrames
                  )
                : "exportLog" === r.msg
                ? this.configuration.logger(r.message, r.logLevel)
                : console.error("Unknown message received ", r);
          }),
          i)
        ) {
          let e = !1;
          const t = () => {
            e || ((e = !0), s.postMessage(dd.abort()));
          };
          i.addEventListener("abort", t, { once: !0 });
        }
      });
    s.postMessage(
      dd.start({
        sceneString: e,
        engineSettings: t,
        config: u,
        exportOptions: r,
        workerOptions: o,
        inactivityTimeout: a,
      })
    );
    const l = () => {
      s.postMessage({
        msg: "setVisibility",
        visible: "visible" === document.visibilityState,
      });
    };
    document.addEventListener("visibilitychange", l);
    try {
      return await c;
    } finally {
      s.terminate(), document.removeEventListener("visibilitychange", l);
    }
  }
};
var md = 10;
globalThis.ubq_browserTabHidden = !0;
var gd = {
  value: () =>
    "undefined" == typeof document || "visible" === document.visibilityState,
  subscribe(e) {
    if ("undefined" == typeof document) return () => {};
    {
      const t = () => {
        e("visible" === document.visibilityState);
      };
      return (
        document.addEventListener("visibilitychange", t),
        () => {
          document.removeEventListener("visibilitychange", t);
        }
      );
    }
  },
};
function vd(e, t, r) {
  return async (n, o, i, a) => {
    const s = t.scene.get();
    if (null == s || !t.block.isValid(s))
      throw new Error("No valid scene available.");
    const u = await t.scene.saveToString([
        "blob",
        "bundle",
        "file",
        "http",
        "https",
        "buffer",
      ]),
      c = (function (e) {
        const t = new Map(),
          r = e.findAllSettings();
        for (const n of r)
          switch (e.getSettingType(n)) {
            case "Bool":
              t.set(n, e.getSettingBool(n));
              break;
            case "Int":
              t.set(n, e.getSettingInt(n));
              break;
            case "Float":
              t.set(n, e.getSettingFloat(n));
              break;
            case "String":
              t.set(n, e.getSettingString(n));
              break;
            case "Color":
              t.set(n, e.getSettingColor(n));
              break;
            case "Enum":
              t.set(n, e.getSettingEnum(n));
          }
        return t;
      })(t.editor),
      l = r(),
      d = t.editor.getActiveLicense(),
      h = {
        scopes: Object.fromEntries(
          t.editor.findAllScopes().map((e) => [e, t.editor.getGlobalScope(e)])
        ),
        uriResolver: t.editor.unstable_getURIResolver()?.toString(),
      };
    try {
      h.trackingMetadata = t.editor.getTrackingMetadata();
    } catch {
      h.trackingMetadata = void 0;
    }
    h.buffers = t.editor.cloneBuffers();
    const f = {
      block: n,
      width: a.targetWidth,
      height: a.targetHeight,
      duration: a.duration,
      framerate: a.framerate,
      h264Level: a.h264Level,
      h264Profile: a.h264Profile,
      videoBitrate: a.videoBitrate,
      audioBitrate: a.audioBitrate,
      timeOffset: a.timeOffset,
    };
    if (e.featureFlags?.exportWorker ?? 1) {
      return new WorkerClient({ ...e, license: d }).exportVideo(
        u,
        c,
        f,
        { abortSignal: a.abortSignal, inactivityTimeout: l, onProgress: i },
        h
      );
    }
    return (async function (e, t, r, n, o, i) {
      let a,
        s,
        u = 0,
        c = null;
      const l = i.visibility ?? gd,
        d = i.inactivityTimeout,
        h = l.subscribe(() => {
          null !== c && (c = Date.now()),
            (globalThis.ubq_browserTabHidden = !l.value());
        });
      let f = null;
      function p() {
        clearTimeout(s), h(), f?.();
      }
      try {
        let h = function () {
          !0 === l.value() && null !== c && Date.now() - c > d
            ? a(new Error("Video export timed out due to inactivity."))
            : (u < md && g.update(), (s = setTimeout(h, 1)));
        };
        const m = new OffscreenCanvas(64, 64),
          g = await Ul(m, { ...e, audioOutput: "none" }),
          v = new SceneAPI(g),
          y = new BlockAPI(g),
          b = new EditorAPI(g);
        if (
          ((f = () => {
            g.delete();
          }),
          (function (e, t) {
            for (const [r, n] of t)
              switch (e.getSettingType(r)) {
                case "Bool":
                  e.setSettingBool(r, n);
                  break;
                case "Int":
                  e.setSettingInt(r, n);
                  break;
                case "Float":
                  e.setSettingFloat(r, n);
                  break;
                case "String":
                  e.setSettingString(r, n);
                  break;
                case "Color":
                  e.setSettingColor(r, n);
                  break;
                case "Enum": {
                  const t = r,
                    o = n;
                  e.setSettingEnum(t, o);
                }
              }
          })(b, t),
          o?.trackingMetadata && b.setTrackingMetadata(o.trackingMetadata),
          o?.uriResolver)
        ) {
          let e = function (e, r) {
            try {
              return t(e, r);
            } catch (t) {
              return (
                console.warn(
                  `Error during execution of URI resolver: ${t}.\nMake sure the url resolver function does not reference any external variables. Falling back to default URI resolver.`
                ),
                r(e)
              );
            }
          };
          const t = (0, eval)(`'use strict';(${o.uriResolver})`);
          b.setURIResolver(e);
        }
        if (o?.scopes)
          for (const [e, t] of Object.entries(o.scopes)) b.setGlobalScope(e, t);
        o?.buffers && b.restoreBuffers(o.buffers);
        const w = await v.loadFromString(r),
          _ = n.block
            ? y.getDuration(n.block)
            : y.getTotalSceneDuration(v.get());
        h();
        const E = await new Promise((t, r) => {
            (a = r),
              e.abortSignal?.addEventListener("abort", () => {
                r(new Error("AbortSignal received"));
              }),
              g.exportVideoToBuffer(
                n.block ?? w,
                n.timeOffset ?? 0,
                n.duration ?? _,
                MimeType.Mp4,
                (e, t, r) => {
                  (u = e - t), (c = Date.now()), i?.onProgress?.(e, t, r);
                },
                (e) => {
                  "error" in e ? r(e.error) : t(e);
                },
                {
                  h264Profile: n.h264Profile ?? 77,
                  h264Level: n.h264Level ?? 52,
                  framerate: n.framerate ?? 30,
                  videoBitrate: n.videoBitrate ?? 0,
                  audioBitrate: n.audioBitrate ?? 0,
                  useTargetSize: void 0 !== n.width && void 0 !== n.height,
                  targetWidth: n.width ?? 0,
                  targetHeight: n.height ?? 0,
                }
              );
          }),
          C = new Uint8Array(E.byteLength);
        return C.set(E), p(), C;
      } catch (e) {
        throw (p(), e);
      }
    })(a.abortSignal ? { ...e, abortSignal: a.abortSignal } : e, c, u, f, h, {
      onProgress: i,
      visibility: wd,
      inactivityTimeout: l,
    }).then((e) => new Blob([e], { type: MimeType.Mp4 }));
  };
}
var yd,
  bd,
  wd = {
    value: () => "visible" === document.visibilityState,
    subscribe: el(
      ((yd = document),
      (bd = "visibilitychange"),
      function (e) {
        return (
          yd.addEventListener(bd, e),
          function () {
            yd.removeEventListener(bd, e);
          }
        );
      }),
      Kc(() => "visible" === document.visibilityState)
    ),
  },
  CreativeEngine = class {
    asset;
    block;
    editor;
    event;
    scene;
    variable;
    reactor;
    #u;
    #c;
    #l;
    #d;
    #e;
    #h;
    #f = [];
    constructor(e, t, r) {
      (this.#e = e),
        (this.#h = new kl(e)),
        (this.asset = new AssetAPI(e)),
        (this.block = new BlockAPI(e)),
        (this.editor = new EditorAPI(e)),
        (this.event = new EventAPI(e)),
        (this.scene = new SceneAPI(e)),
        (this.variable = new VariableAPI(e)),
        (this.#d = new Zl(this, e)),
        this.#f.push(this.#d.dispose);
      const n = new Vl();
      this.reactor = n;
      const o = [
          n.decorateObject(this.#h),
          n.decorateObject(this.block),
          n.decorateObject(this.editor),
          n.decorateObject(this.scene),
          n.decorateObject(this.variable),
        ],
        i = this.addPostUpdateCallback(n.updateDirtyReactions.bind(n));
      this.#f.push(() => {
        o.forEach((e) => e()), i(), this.reactor.dispose();
      }),
        (this.block.exportVideo = vd(
          r,
          { block: this.block, scene: this.scene, editor: this.editor },
          () => this._unstable_videoExportInactivityTimeout
        )),
        "getInternalCanvas" in t
          ? ((this.#c = t.getInternalCanvas()), (this.#l = t))
          : (this.#c = t),
        (this.#u = new ll(this)),
        this.#p(),
        "undefined" != typeof window &&
          window.Cypress &&
          ((this.config = r), (this.legacyAPI = this.#h));
    }
    addPlugin(e) {
      if (e.initialize) {
        const t = {
          engine: {
            asset: this.asset,
            block: this.block,
            scene: this.scene,
            editor: this.editor,
            event: this.event,
            variable: this.variable,
          },
        };
        e.initialize(t);
      }
    }
    unstable_setVideoExportInactivityTimeout(e) {
      this._unstable_videoExportInactivityTimeout = e;
    }
    _unstable_videoExportInactivityTimeout = 1e4;
    #m() {
      if (!this.#l) return;
      const e = this.#l.getInternalCanvas(),
        t = e.getBoundingClientRect();
      if (0 === t.width || 0 === t.height) return;
      const r = "undefined" != typeof window ? window.devicePixelRatio : 1,
        n = t.width * r,
        o = t.height * r;
      e.width !== n && (e.width = n), e.height !== o && (e.height = o);
    }
    #g() {
      const { width: e, height: t } = this.#c,
        r = "undefined" != typeof window ? window.devicePixelRatio : 1,
        { height: n, width: o, pixelRatio: i } = this.#u.settings.value();
      if (!ud(o, e, 1e-4) || !ud(n, t, 1e-4) || !ud(i, r, 1e-4)) {
        this.#u.settings.update({ height: t, width: e, pixelRatio: r });
        const n = this.scene.get();
        if (
          !ud(i, r, 1e-4) &&
          null !== n &&
          !1 === this.scene.isZoomAutoFitEnabled(n)
        ) {
          const e = this.scene.getZoomLevel();
          this.scene.setZoomLevel(e * (r / i));
        }
      }
    }
    #v = [];
    #y = [];
    addPostUpdateCallback(e) {
      return (
        this.#v.push(e),
        () => {
          const t = this.#v.indexOf(e);
          -1 !== t && this.#v.splice(t, 1);
        }
      );
    }
    addPreUpdateCallback(e) {
      return (
        this.#y.push(e),
        () => {
          const t = this.#y.indexOf(e);
          -1 !== t && this.#y.splice(t, 1);
        }
      );
    }
    #b;
    #p(e = !0) {
      this.#w(e), this.#_();
    }
    #w(e = !0) {
      let t,
        r = !1,
        n = 0;
      if (this.#b) return;
      const o = () => {
        if (((this.#b = requestAnimationFrame(o)), !r))
          try {
            this.#E(e), (n = 0);
          } catch (e) {
            throw (
              (n++,
              n >= 10 &&
                (console.error(
                  "Repeated exceptions in update loop. Stopping loop."
                ),
                t?.(),
                this.#C()),
              e)
            );
          }
      };
      this.#b = requestAnimationFrame(o);
    }
    #_() {
      if (
        ((e = this.#c),
        !(
          "undefined" != typeof HTMLCanvasElement &&
          e instanceof HTMLCanvasElement
        ))
      )
        return;
      var e;
      const t = this.#l ?? this.#c,
        r = this.#E.bind(this, !1),
        n = [
          Xl(t, this.#h, r),
          this.#d.initialize(t),
          Gl(t, this.#h, this.#e, this.editor, r),
          Wl(t, this.editor),
          ad(t, this.#h, this.#e),
          Cl(this.#c, this.#e, () => {
            this.#c.width = this.#c.width;
          }),
          Gc(t, this.#S),
        ];
      this.#k = () => {
        n.reverse().forEach((e) => e());
      };
    }
    setWheelEventTarget(e) {
      return this.#d.setTarget(e);
    }
    #S = (0, cloneLoadashDebounce.default)(
      function () {
        this.#E();
      }.bind(this),
      100,
      { leading: !0, trailing: !1 }
    );
    #k;
    #C() {
      this.#k?.(),
        (this.#k = void 0),
        this.#b && (cancelAnimationFrame(this.#b), (this.#b = 0));
    }
    #E(e = !0) {
      for (const e of this.#y) e();
      if (e) {
        1 === this.block.findByType("scene").length && this.#x();
      }
      this.#m(), this.#g(), this.#e.update();
      for (const e of this.#v) e();
    }
    #x() {
      if (this.#u.clampCamera) {
        const e = {
          sceneSize: { x: 0, y: 0 },
          scrollPercentage: { x: NaN, y: NaN },
        };
        this.#h
          .execute("cesdk/clampCameraAndRender", {
            horizontalPaddingInPixels: this._camera.viewportPadding.value().x,
            verticalPaddingInPixels: this._camera.viewportPadding.value().y,
          })
          .then(
            (e) => {
              (0, cloneLodashIsEqual.default)(this.#u.clampResult.value(), e) ||
                this.#u.clampResult.update(e);
            },
            () => {
              (0, cloneLodashIsEqual.default)(this.#u.clampResult.value(), e) ||
                this.#u.clampResult.update(e);
            }
          );
      } else this.#h.execute("ubq/render");
    }
    get element() {
      return this.#l;
    }
    dispose() {
      this.#f.forEach((e) => e()),
        this.#C(),
        this.asset.dispose(),
        (this.#c = null),
        this.#l?.dispose(),
        (this.#l = void 0),
        (this.block = null),
        (this.scene = null),
        (this.variable = null),
        (this.asset = null),
        (this.editor = null),
        (this.event = null),
        (this.#v.length = 0),
        this.#h.dispose(),
        (this.#h = null),
        this.#e.delete(),
        (this.#e = null);
    }
    static async init(e, t) {
      let r = (function (e, t) {
        if (r(t?.canvas)) return t?.canvas;
        if (r(e))
          return (
            console.warn(
              "Passing an existing HTMLCanvasElement as a second parameter to CreativeEngine.init() is deprecated. Use the element property on the CreativeEngine instance to access a fully managed canvas to append into the DOM instead. For more information, have a look into our documentation at https://img.ly/docs/cesdk/next/engine/quickstart/#initialization."
            ),
            e
          );
        return;
        function r(e) {
          return (
            ("undefined" != typeof OffscreenCanvas &&
              e instanceof OffscreenCanvas) ||
            ("undefined" != typeof HTMLCanvasElement &&
              e instanceof HTMLCanvasElement)
          );
        }
      })(t, e);
      const n = "0aacf25c06e",
        o = "1.37.0";
      if (n || o) {
        const e = ["[CreativeEngine]"];
        o && e.push(`v${o}`),
          n && e.push(`Revision ${n}`),
          console.log(e.join(" "));
      }
      let i;
      r ||
        ((i = (function () {
          customElements.get("cesdk-canvas") ||
            customElements.define(
              "cesdk-canvas",
              class HTMLCreativeEngineCanvasElement extends HTMLElement {
                #c;
                constructor() {
                  super(), (this.#c = document.createElement("canvas"));
                  const e = document.createElement("style");
                  (e.textContent =
                    ":host {display: block; width: 100%; height: 100%; contain: content;} canvas {position: absolute; inset: 0; width: 100%; height:100%; display: block; touch-action: none;}"),
                    this.attachShadow({ mode: "closed" }).append(e, this.#c);
                }
                getInternalCanvas() {
                  if (!this.#c)
                    throw new Error("Internal canvas element is undefined");
                  return this.#c;
                }
                dispose() {
                  this.#c?.remove(), (this.#c = void 0);
                }
                clear() {
                  if (!this.#c) return;
                  const e = this.#c.width;
                  (this.#c.width = 1), (this.#c.width = e);
                }
              }
            );
          return document.createElement("cesdk-canvas");
        })()),
        (r = i.getInternalCanvas()));
      const a = _initWithDefaults(_migrateConfigObject(El, e));
      if (
        !(function (e) {
          return !0 === e?._skipConfigWarnings;
        })(e)
      )
        for (const t of _warnKeys(El, e)) a.logger(t, "Warning");
      const s = new this(await Ul(r, a), i ?? r, a);
      return _applyFallback(El, a, s), s;
    }
    async addDefaultAssetSources({
      baseURL: e = "https://cdn.img.ly/assets/v3",
      excludeAssetSourceIds: t = [],
    } = {}) {
      return Nc(this.asset, e, t);
    }
    async addDemoAssetSources({
      baseURL: e = "https://cdn.img.ly/assets/demo/v2",
      excludeAssetSourceIds: t = [],
      sceneMode: r = "Design",
      withUploadAssetSources: n = !1,
    } = {}) {
      return Wc(this.asset, this.scene, t, r, n, void 0, e);
    }
    get _camera() {
      return this.#u;
    }
    get _legacyApi() {
      return this.#h;
    }
  };
var supportsWasm = function () {
    try {
      if (
        "object" == typeof WebAssembly &&
        "function" == typeof WebAssembly.instantiate
      ) {
        const e = new WebAssembly.Module(
          Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0)
        );
        if (e instanceof WebAssembly.Module)
          return new WebAssembly.Instance(e) instanceof WebAssembly.Instance;
      }
    } catch (e) {
      return console.error(e), !1;
    }
    return !1;
  },
  Ed = 1e4,
  Cd = 1e6,
  Sd = 8;
async function kd() {
  if ("undefined" == typeof window) throw new Error("Window is undefined");
  if (
    !(
      "VideoFrame" in window &&
      "VideoDecoder" in window &&
      "VideoEncoder" in window
    )
  )
    throw new Error("Missing required web video APIs");
  const e = {
    codec: "avc1.4D0034",
    width: 1920,
    height: 1080,
    avc: { format: "annexb" },
    framerate: 30,
  };
  if (!(await VideoEncoder.isConfigSupported(e)))
    throw new Error("Encoder config not supported");
  const t = new OffscreenCanvas(e.width, e.height),
    r = t.getContext("webgl2");
  if (!r) throw new Error("Could not create WebGL2 context");
  return (
    r.clearColor(1, 0, 1, 1),
    r.clear(r.COLOR_BUFFER_BIT),
    new Promise((r, n) => {
      setTimeout(() => {
        n(new Error("Timed out during video export"));
      }, Ed);
      const o = new VideoEncoder({ output: () => r(!0), error: (e) => n(e) });
      o.configure(e);
      for (let r = 0; r < Sd; ++r) {
        const n = new VideoFrame(t, {
          timestamp: r * (Cd / e.framerate),
          duration: Cd / e.framerate,
        });
        o.encode(n, { keyFrame: !0 }), n.close();
      }
      o.flush().then(
        () => {
          "closed" !== o.state && o.close();
        },
        (e) => {
          n(new Error(`Error during video export: ${e}`));
        }
      );
    })
  );
}
async function xd() {
  if ("undefined" == typeof window) throw new Error("Window is undefined");
  if (!("AudioDecoder" in window && "AudioEncoder" in window))
    throw new Error("Missing required web audio APIs");
  const e = {
    codec: "mp4a.40.02",
    sampleRate: 48e3,
    numberOfChannels: 2,
    bitrate: 128e3,
  };
  if (!(await AudioEncoder.isConfigSupported(e)))
    throw new Error("Encoder config not supported");
  return new Promise((t, r) => {
    setTimeout(() => {
      r(new Error("Timed out during audio export"));
    }, Ed);
    const n = new AudioEncoder({ output: () => t(!0), error: r });
    n.configure(e);
    const o = 1024,
      i = new Float32Array(o * e.numberOfChannels);
    for (let e = 0; e < o; ++e) {
      const t = e / o;
      (i[2 * e + 0] = Math.sin(880 * Math.PI * t)),
        (i[2 * e + 1] = Math.sin(888 * Math.PI * t));
    }
    for (let t = 0; t < 10; ++t) {
      const r = new AudioData({
        format: "f32",
        sampleRate: e.sampleRate,
        numberOfFrames: o,
        numberOfChannels: e.numberOfChannels,
        timestamp: ((t * o) / e.sampleRate) * Cd,
        data: i,
      });
      n.encode(r), r.close();
    }
    n.flush().then(
      () => {
        "closed" !== n.state && n.close();
      },
      (e) => {
        r(new Error(`Error during audio export: ${e}`));
      }
    );
  });
}
function supportsVideo() {
  if ("undefined" == typeof window) return !1;
  return (
    "VideoFrame" in window &&
    "VideoDecoder" in window &&
    "VideoEncoder" in window &&
    "AudioDecoder" in window &&
    "AudioEncoder" in window
  );
}
function supportsVideoExport() {
  return Promise.all([kd(), xd()]).then(
    (e) => e.every((e) => e),
    () => !1
  );
}
var _streams,
  Fd,
  supportsBrowser = function () {
    try {
      const e = !0,
        t = !0,
        r = "globalThis" in window,
        n = "BigInt" in window,
        o = "allSettled" in Promise,
        i = "matchAll" in String.prototype,
        a = CSS.supports("contain: content"),
        s =
          "MediaRecorder" in window &&
          "pause" in window.MediaRecorder.prototype,
        u = CSS.supports("color: lab(29.2345% 39.3825 20.0664)");
      return supportsWasm() && e && t && r && n && o && i && a && s && u;
    } catch {
      return !1;
    }
  };
((Fd = _streams || (_streams = {})).combineLatest = nl),
  (Fd.fan = Jc),
  (Fd.makeSource = Yc),
  (Fd.map = Kc),
  (Fd.memo = Qc),
  (Fd.merge = tl),
  (Fd.pipe = el),
  (Fd.startWith = Zc),
  (Fd.switchAll = rl);
export {
  LogLevel,
  MimeType,
  WorkerClient,
  _applyFallback,
  _getBlockStream,
  _initWithDefaults,
  _makeEngineChannel,
  _makeValueChannel,
  _memoizeResult,
  _migrateConfigObject,
  _streams,
  _warnKeys,
  CreativeEngine as default,
  defaultLogger,
  isCMYKColor,
  isRGBAColor,
  isSpotColor,
  normalizeBaseURL,
  supportsBrowser,
  supportsVideo,
  supportsVideoExport,
  supportsWasm,
};
