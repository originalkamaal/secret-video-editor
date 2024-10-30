import {
  createLazyModule,
  cloneWithPrototypeAndProperties,
} from "./others/createLazyModule";
import { esbuildPolyfillNoopJs } from "./others/esbuildPolyfillNoopJs";
import { lodashDebounce, lodashIsEqual } from "./lodash";

export var cesdkCore = createLazyModule({
    "../../../_builds/cesdk/wasm32-unknown-emscripten/Release/cesdk.js"(e, t) {
      var r,
        n =
          ((r =
            "undefined" != typeof document && document.currentScript
              ? document.currentScript.src
              : void 0),
          "undefined" != typeof __filename && (r ||= __filename),
          function (e = {}) {
            var t,
              n,
              o,
              i,
              a,
              s,
              u = e;
            (u.ready = new Promise((e, r) => {
              (t = e), (n = r);
            })),
              u.expectedDataFileDownloads || (u.expectedDataFileDownloads = 0),
              u.expectedDataFileDownloads++,
              u.ENVIRONMENT_IS_PTHREAD ||
                u.$ww ||
                (function (e) {
                  "object" == typeof window
                    ? window.encodeURIComponent(
                        window.location.pathname
                          .toString()
                          .substring(
                            0,
                            window.location.pathname.toString().lastIndexOf("/")
                          ) + "/"
                      )
                    : "undefined" == typeof process &&
                      "undefined" != typeof location &&
                      encodeURIComponent(
                        location.pathname
                          .toString()
                          .substring(
                            0,
                            location.pathname.toString().lastIndexOf("/")
                          ) + "/"
                      );
                  var t = "cesdk.data";
                  "function" != typeof u.locateFilePackage ||
                    u.locateFile ||
                    ((u.locateFile = u.locateFilePackage),
                    k(
                      "warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)"
                    ));
                  var r = u.locateFile ? u.locateFile(t, "") : t,
                    n = e.remote_package_size,
                    o = null,
                    i = u.getPreloadedPackage
                      ? u.getPreloadedPackage(r, n)
                      : null;
                  function a() {
                    function t(e, t) {
                      if (!e) throw t + new Error().stack;
                    }
                    function r(e, t, r) {
                      (this.start = e), (this.end = t), (this.audio = r);
                    }
                    u.FS_createPath("/", "ly.img.cesdk", !0, !0),
                      u.FS_createPath("/ly.img.cesdk", "fonts", !0, !0),
                      u.FS_createPath("/ly.img.cesdk", "icons", !0, !0),
                      u.FS_createPath("/ly.img.cesdk", "icu", !0, !0),
                      u.FS_createPath("/ly.img.cesdk", "presets", !0, !0),
                      u.FS_createPath("/ly.img.cesdk", "shaders", !0, !0),
                      u.FS_createPath(
                        "/ly.img.cesdk/shaders",
                        "common",
                        !0,
                        !0
                      ),
                      (r.prototype = {
                        requests: {},
                        open: function (e, t) {
                          (this.name = t),
                            (this.requests[t] = this),
                            u.addRunDependency(`fp ${this.name}`);
                        },
                        send: function () {},
                        onload: function () {
                          var e = this.byteArray.subarray(this.start, this.end);
                          this.finish(e);
                        },
                        finish: function (e) {
                          u.FS_createDataFile(this.name, null, e, !0, !0, !0),
                            u.removeRunDependency(`fp ${this.name}`),
                            (this.requests[this.name] = null);
                        },
                      });
                    for (var n = e.files, a = 0; a < n.length; ++a)
                      new r(n[a].start, n[a].end, n[a].audio || 0).open(
                        "GET",
                        n[a].filename
                      );
                    function s(n) {
                      t(n, "Loading data file failed."),
                        t(
                          n.constructor.name === ArrayBuffer.name,
                          "bad input to processPackageData"
                        );
                      var o = new Uint8Array(n);
                      r.prototype.byteArray = o;
                      for (var i = e.files, a = 0; a < i.length; ++a)
                        r.prototype.requests[i[a].filename].onload();
                      u.removeRunDependency("datafile_cesdk.data");
                    }
                    u.addRunDependency("datafile_cesdk.data"),
                      u.preloadResults || (u.preloadResults = {}),
                      (u.preloadResults["cesdk.data"] = { fromCache: !1 }),
                      i ? (s(i), (i = null)) : (o = s);
                  }
                  i ||
                    (function (e, t, r, n) {
                      if (
                        "object" != typeof process ||
                        "object" != typeof process.versions ||
                        "string" != typeof process.versions.node
                      ) {
                        var o = new XMLHttpRequest();
                        o.open("GET", e, !0),
                          (o.responseType = "arraybuffer"),
                          (o.onprogress = function (r) {
                            var n = e,
                              i = t;
                            if ((r.total && (i = r.total), r.loaded)) {
                              o.addedTotal
                                ? (u.dataFileDownloads[n].loaded = r.loaded)
                                : ((o.addedTotal = !0),
                                  u.dataFileDownloads ||
                                    (u.dataFileDownloads = {}),
                                  (u.dataFileDownloads[n] = {
                                    loaded: r.loaded,
                                    total: i,
                                  }));
                              var a = 0,
                                s = 0,
                                c = 0;
                              for (var l in u.dataFileDownloads) {
                                var d = u.dataFileDownloads[l];
                                (a += d.total), (s += d.loaded), c++;
                              }
                              (a = Math.ceil(
                                (a * u.expectedDataFileDownloads) / c
                              )),
                                u.setStatus &&
                                  u.setStatus(
                                    `Downloading data... (${s}/${a})`
                                  );
                            } else
                              u.dataFileDownloads ||
                                (u.setStatus &&
                                  u.setStatus("Downloading data..."));
                          }),
                          (o.onerror = function (t) {
                            throw new Error("NetworkError for: " + e);
                          }),
                          (o.onload = function (e) {
                            if (
                              !(
                                200 == o.status ||
                                304 == o.status ||
                                206 == o.status ||
                                (0 == o.status && o.response)
                              )
                            )
                              throw new Error(
                                o.statusText + " : " + o.responseURL
                              );
                            var t = o.response;
                            r(t);
                          }),
                          o.send(null);
                      } else
                        esbuildPolyfillNoopJs().readFile(e, function (e, t) {
                          e ? n(e) : r(t.buffer);
                        });
                    })(
                      r,
                      n,
                      function (e) {
                        o ? (o(e), (o = null)) : (i = e);
                      },
                      function (e) {
                        console.error("package error:", e);
                      }
                    ),
                    u.calledRun
                      ? a()
                      : (u.preRun || (u.preRun = []), u.preRun.push(a));
                })({
                  files: [
                    {
                      filename:
                        "/ly.img.cesdk/fonts/imgly_font_inter_semibold.otf",
                      start: 0,
                      end: 270760,
                    },
                    {
                      filename: "/ly.img.cesdk/icons/ErrorAudio.svg",
                      start: 270760,
                      end: 271672,
                    },
                    {
                      filename: "/ly.img.cesdk/icons/ErrorConnection.svg",
                      start: 271672,
                      end: 272620,
                    },
                    {
                      filename: "/ly.img.cesdk/icons/ErrorVideo.svg",
                      start: 272620,
                      end: 273473,
                    },
                    {
                      filename: "/ly.img.cesdk/icons/Move.svg",
                      start: 273473,
                      end: 274413,
                    },
                    {
                      filename: "/ly.img.cesdk/icons/RotateIndicator.svg",
                      start: 274413,
                      end: 275394,
                    },
                    {
                      filename: "/ly.img.cesdk/icu/icudt74l.dat",
                      start: 275394,
                      end: 810498,
                    },
                    {
                      filename: "/ly.img.cesdk/presets/.keep",
                      start: 810498,
                      end: 810498,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/adjustments.sksl",
                      start: 810498,
                      end: 814387,
                    },
                    {
                      filename:
                        "/ly.img.cesdk/shaders/black_and_white_color_mixer.sksl",
                      start: 814387,
                      end: 820704,
                    },
                    {
                      filename:
                        "/ly.img.cesdk/shaders/common/ubq_adjustments.sksl",
                      start: 820704,
                      end: 825295,
                    },
                    {
                      filename:
                        "/ly.img.cesdk/shaders/common/ubq_color_conversions.sksl",
                      start: 825295,
                      end: 835280,
                    },
                    {
                      filename:
                        "/ly.img.cesdk/shaders/common/ubq_constants.sksl",
                      start: 835280,
                      end: 835770,
                    },
                    {
                      filename:
                        "/ly.img.cesdk/shaders/common/ubq_hue_constants.sksl",
                      start: 835770,
                      end: 838937,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/common/ubq_noise.sksl",
                      start: 838937,
                      end: 841575,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/cross_cut.sksl",
                      start: 841575,
                      end: 842522,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/dot_pattern.sksl",
                      start: 842522,
                      end: 843600,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/duotone_filter.sksl",
                      start: 843600,
                      end: 844564,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/extrude_blur.sksl",
                      start: 844564,
                      end: 846681,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/glow.sksl",
                      start: 846681,
                      end: 847648,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/half_tone.sksl",
                      start: 847648,
                      end: 848142,
                    },
                    {
                      filename:
                        "/ly.img.cesdk/shaders/hsp_selective_adjustments.sksl",
                      start: 848142,
                      end: 861742,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/linocut.sksl",
                      start: 861742,
                      end: 862527,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/liquid.sksl",
                      start: 862527,
                      end: 863009,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/lut_filter.sksl",
                      start: 863009,
                      end: 865872,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/mask_color.sksl",
                      start: 865872,
                      end: 866377,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/mirror.sksl",
                      start: 866377,
                      end: 866831,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/outliner.sksl",
                      start: 866831,
                      end: 868468,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/pixelize.sksl",
                      start: 868468,
                      end: 868768,
                    },
                    {
                      filename:
                        "/ly.img.cesdk/shaders/placeholder_overlay_lines.sksl",
                      start: 868768,
                      end: 869456,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/posterize.sksl",
                      start: 869456,
                      end: 869668,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/radial_pixel.sksl",
                      start: 869668,
                      end: 870231,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/recolor.sksl",
                      start: 870231,
                      end: 872432,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/sharpie.sksl",
                      start: 872432,
                      end: 874737,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/shifter.sksl",
                      start: 874737,
                      end: 875421,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/tiltshift.sksl",
                      start: 875421,
                      end: 876003,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/tv_glitch.sksl",
                      start: 876003,
                      end: 876721,
                    },
                    {
                      filename: "/ly.img.cesdk/shaders/vignette.sksl",
                      start: 876721,
                      end: 877093,
                    },
                  ],
                  remote_package_size: 877093,
                }),
              "object" == typeof window && "object" == typeof window.performance
                ? (u.performance = performance)
                : "object" == typeof global &&
                  "object" == typeof global.perf_hooks &&
                  "object" == typeof global.perf_hooks.performance
                ? (u.performance = global.perf_hooks.performance)
                : (u.performance = {
                    mark: function () {},
                    measure: function () {},
                  }),
              ((i = o || (o = {}))[(i.PENDING = 0)] = "PENDING"),
              (i[(i.FINISHED = 1)] = "FINISHED"),
              (i[(i.ALLOCATED = 2)] = "ALLOCATED"),
              (i[(i.ERROR = 3)] = "ERROR"),
              ((s = a || (a = {}))[(s.GET = 0)] = "GET"),
              (s[(s.POST = 1)] = "POST");
            class FetchProcess {
              constructor(e, t) {
                (this.state = o.PENDING),
                  (this.totalBytes = 0),
                  (this.receivedLength = 0),
                  (this.handle = e),
                  (this.uri = t),
                  (this.abortController = new AbortController()),
                  (this.abortSignal = this.abortController.signal);
              }
              async readChunks(e) {
                let t = 0;
                const r = [],
                  n = (e) => {
                    r.push(e), (t += e.length), (this.receivedLength = t);
                  };
                if (null == e);
                else if ("getReader" in e) {
                  const t = e.getReader();
                  for (;;) {
                    const { done: e, value: r } = await t.read();
                    if (e) break;
                    if (this.abortSignal.aborted)
                      throw (
                        (await t.cancel(),
                        t.releaseLock(),
                        new Error(this.abortSignal.reason))
                      );
                    n(r);
                  }
                  t.releaseLock();
                } else {
                  const t = () => e.destroy(new Error(this.abortSignal.reason));
                  this.abortSignal.addEventListener("abort", t, { once: !0 });
                  try {
                    await new Promise((t, r) => {
                      e.on("data", n),
                        e.on("end", () => t()),
                        e.on("error", (e) => r(e));
                    });
                  } finally {
                    this.abortSignal.removeEventListener("abort", t);
                  }
                }
                const o = new Uint8Array(t);
                let i = 0;
                for (const e of r) o.set(e, i), (i += e.length);
                return this.finish(o);
              }
              abort() {
                this.isPending() && this.abortController.abort("Fetch aborted");
              }
              isPending() {
                return this.state === o.PENDING;
              }
              isError() {
                return this.state === o.ERROR;
              }
              isFinished() {
                return this.state === o.FINISHED;
              }
              isAllocated() {
                return this.state === o.ALLOCATED;
              }
              allocate() {
                if (this.isAllocated()) return this;
                if (this.isFinished()) {
                  const e = this.result.length,
                    t = u._malloc(e);
                  u.HEAPU8.set(this.result, t);
                  const r = Object.assign(Object.assign({}, this), {
                    state: o.ALLOCATED,
                    resultAddress: t,
                    resultLength: e,
                  });
                  return Object.assign(this, r), r;
                }
                return null;
              }
              finish(e) {
                const t = Object.assign(Object.assign({}, this), {
                  state: o.FINISHED,
                  result: e,
                  totalBytes: e.length,
                });
                return Object.assign(this, t);
              }
              fail(e) {
                const t = Object.assign(Object.assign({}, this), {
                  state: o.ERROR,
                  error: e,
                });
                return Object.assign(this, t);
              }
            }
            (u.emscripten_ubq_asyncFetchManager = new (class AsyncFetchManager {
              constructor() {
                (this._nextHandle = 0),
                  (this._nextHeaderHandle = 0),
                  (this._processes = new Map()),
                  (this._headers = new Map()),
                  (this._fetchImpl = null);
              }
              _fetch(e, t) {
                return this._fetchImpl ? this._fetchImpl(e, t) : fetch(e, t);
              }
              setFetch(e) {
                this._fetchImpl = e;
              }
              getProcess(e) {
                return this._processes.get(e);
              }
              deleteProcess(e) {
                const t = this._processes.get(e);
                return (
                  (null == t ? void 0 : t.isPending()) && t.abort(),
                  this._processes.delete(e)
                );
              }
              clear() {
                for (const e of this._processes.values())
                  e.isPending() && e.abort();
                this._processes.clear(), this._headers.clear();
              }
              fetch(e, t, r, n, o, i, a, s, c) {
                const l = u.UTF8ToString(t, r),
                  d = this._nextHandle++,
                  h = new FetchProcess(d, l);
                return (
                  this._processes.set(d, h),
                  l.match(/^file:/)
                    ? this._fetchFile(h).catch((e) => {
                        h.fail(e);
                      })
                    : this._fetchRemote(h, e, n, o, i, a, s, c).catch((e) => {
                        h.fail(e);
                      }),
                  h
                );
              }
              async _fetchFile(e) {
                if ("undefined" != typeof window)
                  throw new Error("File URLs supported only in Node.JS");
                const t = esbuildPolyfillNoopJs(),
                  { fileURLToPath: r } = esbuildPolyfillNoopJs(),
                  n = t.createReadStream(r(e.uri));
                return e.readChunks(n);
              }
              async _fetchRemote(e, t, r, n, o, i, s, c) {
                const l = u.UTF8ToString(s, c),
                  d = this.getHeaders(r, n),
                  h =
                    t === a.POST
                      ? new Uint8Array(new Uint8Array(u.HEAPU8.buffer, o, i))
                      : void 0,
                  f = await this._fetch(e.uri, {
                    method: a[t],
                    headers: d,
                    body: h,
                    mode: "cors",
                    credentials: l,
                    signal: e.abortSignal,
                  });
                if (f.status >= 200 && f.status <= 209) {
                  let t = 0;
                  return (
                    f.headers.has("Content-Length") &&
                      (t = +f.headers.get("Content-Length")),
                    (e.totalBytes = t),
                    e.readChunks(f.body)
                  );
                }
                return e.fail(f.statusText);
              }
              getHeaders(e, t) {
                const r = {};
                for (let n = 0; n < t; n++) {
                  const t = u.getValue(e + 4 * n, "i32"),
                    o = this._headers.get(t);
                  r[o.key] = o.value;
                }
                return r;
              }
              createHeader(e, t, r, n) {
                const o = u.UTF8ToString(e, t),
                  i = u.UTF8ToString(r, n),
                  a = this._nextHeaderHandle++;
                return this._headers.set(a, { key: o, value: i }), a;
              }
              deleteHeader(e) {
                return this._headers.delete(e);
              }
            })()),
              (u.emscripten_ubq_codec_videoDecoders = new Map()),
              (u.emscripten_ubq_codec_audioDecoders = new Map()),
              (u.emscripten_ubq_codec_videoEncoders = new Map()),
              (u.emscripten_ubq_codec_audioEncoders = new Map()),
              (u.emscripten_ubq_codec_videoDecoderNextHandle = 1),
              (u.emscripten_ubq_codec_audioDecoderNextHandle = 1),
              (u.emscripten_ubq_codec_videoEncoderNextHandle = 1),
              (u.emscripten_ubq_codec_audioEncoderNextHandle = 1),
              (u.emscripten_ubq_codec_createNativeResult = function (e) {
                const t = u._malloc(8),
                  r = u.HEAPU32.subarray(t / 4, t / 4 + 2);
                if (
                  ((r[0] = e.handle ? e.handle : e.code ? e.code : 0), e.error)
                ) {
                  const t = new TextEncoder().encode(e.error),
                    n = u._malloc(t.length + 1),
                    o = u.HEAPU8.subarray(n, n + t.length + 1);
                  for (let e = 0; e < t.length; e++) o[e] = t[e];
                  (o[t.length] = 0), (r[1] = n);
                } else r[1] = 0;
                return t;
              }),
              (u.emscripten_ubq_codec_createVideoDecoder = function (e, t) {
                const r = new VideoDecoder({
                  output: (n) => {
                    const o = r.textures;
                    let i = !1;
                    if (
                      ((r.shouldDropFrames ||
                        r.decodedFrames < r.requestedFrame ||
                        r.decodeQueueSize >= o.length) &&
                        (i = !0),
                      !i)
                    ) {
                      var a = u.ctx;
                      const e = r.decodedFrames % o.length,
                        t = a.getParameter(a.TEXTURE_BINDING_2D);
                      a.bindTexture(a.TEXTURE_2D, o[e]),
                        a.texImage2D(
                          a.TEXTURE_2D,
                          0,
                          a.RGBA,
                          a.RGBA,
                          a.UNSIGNED_BYTE,
                          n
                        ),
                        a.bindTexture(a.TEXTURE_2D, t);
                    }
                    n.close(),
                      r.decodedFrames++,
                      u.emscripten_ubq_codec_onOutputDecodedVideoFrame(
                        e,
                        r.decodedFrames,
                        i,
                        t
                      );
                  },
                  error: (e) => {
                    (r.unexpectedError = e), console.error(e);
                  },
                });
                return (
                  (r.decodedFrames = 0),
                  (r.requestedFrame = 0),
                  (r.shouldDropFrames = !1),
                  r
                );
              }),
              (u.emscripten_ubq_codec_createAudioDecoder = function (e, t, r) {
                const n = new AudioDecoder({
                  output: (o) => {
                    if (n.flushing) return void o.close();
                    const i = u.HEAPF32.subarray(e / 4, e / 4 + r),
                      a = u.HEAPF32.subarray(t / 4, t / 4 + r),
                      s = 1 === o.numberOfChannels ? 0 : 1;
                    if ("f32-planar" === o.format) {
                      let e = n.writtenFrames % r;
                      if (e + o.numberOfFrames <= r)
                        o.copyTo(i.subarray(e), {
                          planeIndex: 0,
                          frameCount: o.numberOfFrames,
                        }),
                          o.copyTo(a.subarray(e), {
                            planeIndex: s,
                            frameCount: o.numberOfFrames,
                          });
                      else {
                        const t = r - e;
                        o.copyTo(i.subarray(e), {
                          planeIndex: 0,
                          frameCount: t,
                        }),
                          o.copyTo(a.subarray(e), {
                            planeIndex: s,
                            frameCount: t,
                          }),
                          o.copyTo(i, { planeIndex: 0, frameOffset: t }),
                          o.copyTo(a, { planeIndex: s, frameOffset: t });
                      }
                      n.writtenFrames += o.numberOfFrames;
                    } else if ("s16-planar" === o.format)
                      if (1 === o.numberOfChannels) {
                        const e = new Int16Array(o.numberOfFrames);
                        o.copyTo(e, { planeIndex: 0 });
                        for (let t = 0; t < o.numberOfFrames; t++) {
                          const o = e[t] / 32768;
                          let s = n.writtenFrames % r;
                          (i[s] = o), (a[s] = o), n.writtenFrames++;
                        }
                      } else {
                        const e = new Int16Array(o.numberOfFrames),
                          t = new Int16Array(o.numberOfFrames);
                        o.copyTo(e, { planeIndex: 0 }),
                          o.copyTo(t, { planeIndex: 1 });
                        for (let s = 0; s < o.numberOfFrames; s++) {
                          let o = n.writtenFrames % r;
                          (i[o] = e[s] / 32768),
                            (a[o] = t[s] / 32768),
                            n.writtenFrames++;
                        }
                      }
                    else if ("s16" === o.format) {
                      const e = new Int16Array(
                        o.numberOfFrames * o.numberOfChannels
                      );
                      if (
                        (o.copyTo(e, { planeIndex: 0 }),
                        1 === o.numberOfChannels)
                      )
                        for (let t = 0; t < o.numberOfFrames; t++) {
                          const o = e[t] / 32768;
                          let s = n.writtenFrames % r;
                          (i[s] = o), (a[s] = o), n.writtenFrames++;
                        }
                      else
                        for (let t = 0; t < o.numberOfFrames; t++) {
                          let s = n.writtenFrames % r;
                          (i[s] = e[t * o.numberOfChannels + 0] / 32768),
                            (a[s] = e[t * o.numberOfChannels + 1] / 32768),
                            n.writtenFrames++;
                        }
                    } else console.error("Unsupported audio format:", o.format);
                    o.close();
                  },
                  error: (e) => {
                    (n.unexpectedError = e), console.error(e);
                  },
                });
                return (n.writtenFrames = 0), n;
              }),
              (u.emscripten_ubq_settings_forceWebGL1 = !1);
            var c,
              l,
              d,
              h = Object.assign({}, u),
              f = [],
              p = "./this.program",
              m = (e, t) => {
                throw t;
              },
              g = "object" == typeof window,
              v = "function" == typeof importScripts,
              y =
                "object" == typeof process &&
                "object" == typeof process.versions &&
                "string" == typeof process.versions.node,
              b = "";
            if (y) {
              var w = esbuildPolyfillNoopJs(),
                _ = esbuildPolyfillNoopJs();
              (b = v ? _.dirname(b) + "/" : __dirname + "/"),
                (c = (e, t) => (
                  (e = ee(e) ? new URL(e) : _.normalize(e)),
                  w.readFileSync(e, t ? void 0 : "utf8")
                )),
                (d = (e) => {
                  var t = c(e, !0);
                  return t.buffer || (t = new Uint8Array(t)), t;
                }),
                (l = (e, t, r, n = !0) => {
                  (e = ee(e) ? new URL(e) : _.normalize(e)),
                    w.readFile(e, n ? void 0 : "utf8", (e, o) => {
                      e ? r(e) : t(n ? o.buffer : o);
                    });
                }),
                !u.thisProgram &&
                  process.argv.length > 1 &&
                  (p = process.argv[1].replace(/\\/g, "/")),
                (f = process.argv.slice(2)),
                (m = (e, t) => {
                  throw ((process.exitCode = e), t);
                });
            } else
              (g || v) &&
                (v
                  ? (b = self.location.href)
                  : "undefined" != typeof document &&
                    document.currentScript &&
                    (b = document.currentScript.src),
                r && (b = r),
                (b = b.startsWith("blob:")
                  ? ""
                  : b.substr(0, b.replace(/[?#].*/, "").lastIndexOf("/") + 1)),
                (c = (e) => {
                  var t = new XMLHttpRequest();
                  return t.open("GET", e, !1), t.send(null), t.responseText;
                }),
                v &&
                  (d = (e) => {
                    var t = new XMLHttpRequest();
                    return (
                      t.open("GET", e, !1),
                      (t.responseType = "arraybuffer"),
                      t.send(null),
                      new Uint8Array(t.response)
                    );
                  }),
                (l = (e, t, r) => {
                  var n = new XMLHttpRequest();
                  n.open("GET", e, !0),
                    (n.responseType = "arraybuffer"),
                    (n.onload = () => {
                      200 == n.status || (0 == n.status && n.response)
                        ? t(n.response)
                        : r();
                    }),
                    (n.onerror = r),
                    n.send(null);
                }));
            var E,
              C,
              S = u.print || console.log.bind(console),
              k = u.printErr || console.error.bind(console);
            Object.assign(u, h),
              (h = null),
              u.arguments && (f = u.arguments),
              u.thisProgram && (p = u.thisProgram),
              u.quit && (m = u.quit),
              u.wasmBinary && (E = u.wasmBinary),
              "object" != typeof WebAssembly &&
                K("no native wasm support detected");
            var x,
              T,
              A,
              P,
              F,
              L,
              R,
              B,
              D,
              M,
              O,
              I = !1;
            function j(e, t) {
              e || K(t);
            }
            function U() {
              var e = C.buffer;
              (u.HEAP8 = T = new Int8Array(e)),
                (u.HEAP16 = P = new Int16Array(e)),
                (u.HEAPU8 = A = new Uint8Array(e)),
                (u.HEAPU16 = F = new Uint16Array(e)),
                (u.HEAP32 = L = new Int32Array(e)),
                (u.HEAPU32 = R = new Uint32Array(e)),
                (u.HEAPF32 = B = new Float32Array(e)),
                (u.HEAPF64 = O = new Float64Array(e)),
                (u.HEAP64 = D = new BigInt64Array(e)),
                (u.HEAPU64 = M = new BigUint64Array(e));
            }
            var $ = u.INITIAL_MEMORY || 16777216;
            (C = u.wasmMemory
              ? u.wasmMemory
              : new WebAssembly.Memory({ initial: $ / 65536, maximum: 32768 })),
              U(),
              ($ = C.buffer.byteLength);
            var q = [],
              H = [],
              N = [],
              V = [],
              z = 0,
              W = null,
              G = null;
            function X(e) {
              z++, u.monitorRunDependencies?.(z);
            }
            function Y(e) {
              if (
                (z--,
                u.monitorRunDependencies?.(z),
                0 == z && (null !== W && (clearInterval(W), (W = null)), G))
              ) {
                var t = G;
                (G = null), t();
              }
            }
            function K(e) {
              u.onAbort?.(e),
                k((e = "Aborted(" + e + ")")),
                (I = !0),
                (x = 1),
                (e += ". Build with -sASSERTIONS for more info.");
              var t = new WebAssembly.RuntimeError(e);
              throw (n(t), t);
            }
            var Z,
              Q,
              J = (e) => e.startsWith("data:application/octet-stream;base64,"),
              ee = (e) => e.startsWith("file://");
            function te(e) {
              if (e == Z && E) return new Uint8Array(E);
              if (d) return d(e);
              throw "both async and sync fetching of the wasm failed";
            }
            function re(e, t, r) {
              return (function (e) {
                return E || (!g && !v) || "function" != typeof fetch
                  ? Promise.resolve().then(() => te(e))
                  : fetch(e, { credentials: "same-origin" })
                      .then((t) => {
                        if (!t.ok)
                          throw `failed to load wasm binary file at '${e}'`;
                        return t.arrayBuffer();
                      })
                      .catch(() => te(e));
              })(e)
                .then((e) => WebAssembly.instantiate(e, t))
                .then((e) => e)
                .then(r, (e) => {
                  k(`failed to asynchronously prepare wasm: ${e}`), K(e);
                });
            }
            J((Z = "cesdk.wasm")) ||
              ((Q = Z), (Z = u.locateFile ? u.locateFile(Q, b) : b + Q));
            var ne = {
              2483220: (e, t, r, n, o) =>
                "undefined" == typeof window ||
                void 0 === (window.AudioContext || window.webkitAudioContext)
                  ? 0
                  : (void 0 === window.miniaudio &&
                      ((window.miniaudio = { referenceCount: 0 }),
                      (window.miniaudio.device_type = {}),
                      (window.miniaudio.device_type.playback = e),
                      (window.miniaudio.device_type.capture = t),
                      (window.miniaudio.device_type.duplex = r),
                      (window.miniaudio.device_state = {}),
                      (window.miniaudio.device_state.stopped = n),
                      (window.miniaudio.device_state.started = o),
                      (miniaudio.devices = []),
                      (miniaudio.track_device = function (e) {
                        for (var t = 0; t < miniaudio.devices.length; ++t)
                          if (null == miniaudio.devices[t])
                            return (miniaudio.devices[t] = e), t;
                        return (
                          miniaudio.devices.push(e),
                          miniaudio.devices.length - 1
                        );
                      }),
                      (miniaudio.untrack_device_by_index = function (e) {
                        for (
                          miniaudio.devices[e] = null;
                          miniaudio.devices.length > 0 &&
                          null ==
                            miniaudio.devices[miniaudio.devices.length - 1];

                        )
                          miniaudio.devices.pop();
                      }),
                      (miniaudio.untrack_device = function (e) {
                        for (var t = 0; t < miniaudio.devices.length; ++t)
                          if (miniaudio.devices[t] == e)
                            return miniaudio.untrack_device_by_index(t);
                      }),
                      (miniaudio.get_device_by_index = function (e) {
                        return miniaudio.devices[e];
                      }),
                      (miniaudio.unlock_event_types = (function () {
                        return ["touchstart", "touchend", "click"];
                      })()),
                      (miniaudio.unlock = function () {
                        for (var e = 0; e < miniaudio.devices.length; ++e) {
                          var t = miniaudio.devices[e];
                          null != t &&
                            null != t.webaudio &&
                            2 === t.state &&
                            t.webaudio.resume();
                        }
                        miniaudio.unlock_event_types.map(function (e) {
                          document.removeEventListener(e, miniaudio.unlock, !0);
                        });
                      }),
                      miniaudio.unlock_event_types.map(function (e) {
                        document.addEventListener(e, miniaudio.unlock, !0);
                      })),
                    (window.miniaudio.referenceCount += 1),
                    1),
              2485210: () => {
                void 0 !== window.miniaudio &&
                  ((window.miniaudio.referenceCount -= 1),
                  0 === window.miniaudio.referenceCount &&
                    delete window.miniaudio);
              },
              2485374: () =>
                void 0 !== navigator.mediaDevices &&
                void 0 !== navigator.mediaDevices.getUserMedia,
              2485478: () => {
                try {
                  var e = new (window.AudioContext ||
                      window.webkitAudioContext)(),
                    t = e.sampleRate;
                  return e.close(), t;
                } catch (e) {
                  return 0;
                }
              },
              2485649: (e, t, r, n, o, i) => {
                var a = e,
                  s = t,
                  c = r,
                  l = n,
                  d = o,
                  h = i;
                if (void 0 === window.miniaudio) return -1;
                var f = {},
                  p = {};
                a == window.miniaudio.device_type.playback &&
                  (p.sampleRate = c),
                  (f.webaudio = new (window.AudioContext ||
                    window.webkitAudioContext)(p)),
                  f.webaudio.suspend(),
                  (f.state = window.miniaudio.device_state.stopped);
                var m = 0,
                  g = s;
                return (
                  a != window.miniaudio.device_type.playback && (m = s),
                  (f.scriptNode = f.webaudio.createScriptProcessor(l, m, g)),
                  (f.scriptNode.onaudioprocess = function (e) {
                    if (
                      ((null != f.intermediaryBufferView &&
                        0 != f.intermediaryBufferView.length) ||
                        (f.intermediaryBufferView = new Float32Array(
                          u.HEAPF32.buffer,
                          d,
                          l * s
                        )),
                      a == miniaudio.device_type.capture ||
                        a == miniaudio.device_type.duplex)
                    ) {
                      for (var t = 0; t < s; t += 1)
                        for (
                          var r = e.inputBuffer.getChannelData(t),
                            n = f.intermediaryBufferView,
                            o = 0;
                          o < l;
                          o += 1
                        )
                          n[o * s + t] = r[o];
                      Ru(h, l, d);
                    }
                    if (
                      a == miniaudio.device_type.playback ||
                      a == miniaudio.device_type.duplex
                    )
                      for (
                        Bu(h, l, d), t = 0;
                        t < e.outputBuffer.numberOfChannels;
                        ++t
                      ) {
                        var i = e.outputBuffer.getChannelData(t);
                        for (n = f.intermediaryBufferView, o = 0; o < l; o += 1)
                          i[o] = n[o * s + t];
                      }
                    else
                      for (t = 0; t < e.outputBuffer.numberOfChannels; ++t)
                        e.outputBuffer.getChannelData(t).fill(0);
                  }),
                  (a != miniaudio.device_type.capture &&
                    a != miniaudio.device_type.duplex) ||
                    navigator.mediaDevices
                      .getUserMedia({ audio: !0, video: !1 })
                      .then(function (e) {
                        (f.streamNode = f.webaudio.createMediaStreamSource(e)),
                          f.streamNode.connect(f.scriptNode),
                          f.scriptNode.connect(f.webaudio.destination);
                      })
                      .catch(function (e) {
                        console.log("Failed to get user media: " + e);
                      }),
                  a == miniaudio.device_type.playback &&
                    f.scriptNode.connect(f.webaudio.destination),
                  miniaudio.track_device(f)
                );
              },
              2488432: (e) =>
                miniaudio.get_device_by_index(e).webaudio.sampleRate,
              2488498: (e) => {
                var t = miniaudio.get_device_by_index(e);
                void 0 !== t.scriptNode &&
                  ((t.scriptNode.onaudioprocess = function (e) {}),
                  t.scriptNode.disconnect(),
                  (t.scriptNode = void 0)),
                  void 0 !== t.streamNode &&
                    (t.streamNode.disconnect(), (t.streamNode = void 0)),
                  t.webaudio.close(),
                  (t.webaudio = void 0);
              },
              2488863: (e) => {
                miniaudio.untrack_device_by_index(e);
              },
              2488906: (e) => {
                var t = miniaudio.get_device_by_index(e);
                t.webaudio.resume(), (t.state = miniaudio.device_state.started);
              },
              2489031: (e) => {
                var t = miniaudio.get_device_by_index(e);
                t.webaudio.suspend(),
                  (t.state = miniaudio.device_state.stopped);
              },
              2489157: () => !!globalThis.ubq_browserTabHidden,
              2489203: () => T.length,
            };
            function oe(e) {
              (this.name = "ExitStatus"),
                (this.message = `Program terminated with exit(${e})`),
                (this.status = e);
            }
            var ie = (e) => {
                for (; e.length > 0; ) e.shift()(u);
              },
              ae = u.noExitRuntime || !0,
              se = [],
              ue = 0;
            class ExceptionInfo {
              constructor(e) {
                (this.excPtr = e), (this.ptr = e - 24);
              }
              set_type(e) {
                R[(this.ptr + 4) >> 2] = e;
              }
              get_type() {
                return R[(this.ptr + 4) >> 2];
              }
              set_destructor(e) {
                R[(this.ptr + 8) >> 2] = e;
              }
              get_destructor() {
                return R[(this.ptr + 8) >> 2];
              }
              set_caught(e) {
                (e = e ? 1 : 0), (T[(this.ptr + 12) >> 0] = e);
              }
              get_caught() {
                return 0 != T[(this.ptr + 12) >> 0];
              }
              set_rethrown(e) {
                (e = e ? 1 : 0), (T[(this.ptr + 13) >> 0] = e);
              }
              get_rethrown() {
                return 0 != T[(this.ptr + 13) >> 0];
              }
              init(e, t) {
                this.set_adjusted_ptr(0),
                  this.set_type(e),
                  this.set_destructor(t);
              }
              set_adjusted_ptr(e) {
                R[(this.ptr + 16) >> 2] = e;
              }
              get_adjusted_ptr() {
                return R[(this.ptr + 16) >> 2];
              }
              get_exception_ptr() {
                if (Vu(this.get_type())) return R[this.excPtr >> 2];
                var e = this.get_adjusted_ptr();
                return 0 !== e ? e : this.excPtr;
              }
            }
            var ce = (e) => {
                var t = ue;
                if (!t) return Du(0), 0;
                var r = new ExceptionInfo(t);
                r.set_adjusted_ptr(t);
                var n = r.get_type();
                if (!n) return Du(0), t;
                for (var o in e) {
                  var i = e[o];
                  if (0 === i || i === n) break;
                  var a = r.ptr + 16;
                  if (Nu(i, n, a)) return Du(i), t;
                }
                return Du(n), t;
              },
              le = {
                isAbs: (e) => "/" === e.charAt(0),
                splitPath: (e) =>
                  /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
                    .exec(e)
                    .slice(1),
                normalizeArray: (e, t) => {
                  for (var r = 0, n = e.length - 1; n >= 0; n--) {
                    var o = e[n];
                    "." === o
                      ? e.splice(n, 1)
                      : ".." === o
                      ? (e.splice(n, 1), r++)
                      : r && (e.splice(n, 1), r--);
                  }
                  if (t) for (; r; r--) e.unshift("..");
                  return e;
                },
                normalize: (e) => {
                  var t = le.isAbs(e),
                    r = "/" === e.substr(-1);
                  return (
                    (e = le
                      .normalizeArray(
                        e.split("/").filter((e) => !!e),
                        !t
                      )
                      .join("/")) ||
                      t ||
                      (e = "."),
                    e && r && (e += "/"),
                    (t ? "/" : "") + e
                  );
                },
                dirname: (e) => {
                  var t = le.splitPath(e),
                    r = t[0],
                    n = t[1];
                  return r || n
                    ? (n && (n = n.substr(0, n.length - 1)), r + n)
                    : ".";
                },
                basename: (e) => {
                  if ("/" === e) return "/";
                  var t = (e = (e = le.normalize(e)).replace(
                    /\/$/,
                    ""
                  )).lastIndexOf("/");
                  return -1 === t ? e : e.substr(t + 1);
                },
                join: function () {
                  var e = Array.prototype.slice.call(arguments);
                  return le.normalize(e.join("/"));
                },
                join2: (e, t) => le.normalize(e + "/" + t),
              },
              de = (e) =>
                (de = (() => {
                  if (
                    "object" == typeof crypto &&
                    "function" == typeof crypto.getRandomValues
                  )
                    return (e) => crypto.getRandomValues(e);
                  if (y)
                    try {
                      var e = esbuildPolyfillNoopJs();
                      if (e.randomFillSync) return (t) => e.randomFillSync(t);
                      var t = e.randomBytes;
                      return (e) => (e.set(t(e.byteLength)), e);
                    } catch (e) {}
                  K("initRandomDevice");
                })())(e),
              he = {
                resolve: function () {
                  for (
                    var e = "", t = !1, r = arguments.length - 1;
                    r >= -1 && !t;
                    r--
                  ) {
                    var n = r >= 0 ? arguments[r] : Se.cwd();
                    if ("string" != typeof n)
                      throw new TypeError(
                        "Arguments to path.resolve must be strings"
                      );
                    if (!n) return "";
                    (e = n + "/" + e), (t = le.isAbs(n));
                  }
                  return (
                    (t ? "/" : "") +
                      (e = le
                        .normalizeArray(
                          e.split("/").filter((e) => !!e),
                          !t
                        )
                        .join("/")) || "."
                  );
                },
                relative: (e, t) => {
                  function r(e) {
                    for (var t = 0; t < e.length && "" === e[t]; t++);
                    for (var r = e.length - 1; r >= 0 && "" === e[r]; r--);
                    return t > r ? [] : e.slice(t, r - t + 1);
                  }
                  (e = he.resolve(e).substr(1)), (t = he.resolve(t).substr(1));
                  for (
                    var n = r(e.split("/")),
                      o = r(t.split("/")),
                      i = Math.min(n.length, o.length),
                      a = i,
                      s = 0;
                    s < i;
                    s++
                  )
                    if (n[s] !== o[s]) {
                      a = s;
                      break;
                    }
                  var u = [];
                  for (s = a; s < n.length; s++) u.push("..");
                  return (u = u.concat(o.slice(a))).join("/");
                },
              },
              fe =
                "undefined" != typeof TextDecoder
                  ? new TextDecoder("utf8")
                  : void 0,
              pe = (e, t, r) => {
                for (var n = t + r, o = t; e[o] && !(o >= n); ) ++o;
                if (o - t > 16 && e.buffer && fe)
                  return fe.decode(e.subarray(t, o));
                for (var i = ""; t < o; ) {
                  var a = e[t++];
                  if (128 & a) {
                    var s = 63 & e[t++];
                    if (192 != (224 & a)) {
                      var u = 63 & e[t++];
                      if (
                        (a =
                          224 == (240 & a)
                            ? ((15 & a) << 12) | (s << 6) | u
                            : ((7 & a) << 18) |
                              (s << 12) |
                              (u << 6) |
                              (63 & e[t++])) < 65536
                      )
                        i += String.fromCharCode(a);
                      else {
                        var c = a - 65536;
                        i += String.fromCharCode(
                          55296 | (c >> 10),
                          56320 | (1023 & c)
                        );
                      }
                    } else i += String.fromCharCode(((31 & a) << 6) | s);
                  } else i += String.fromCharCode(a);
                }
                return i;
              },
              me = [],
              ge = (e) => {
                for (var t = 0, r = 0; r < e.length; ++r) {
                  var n = e.charCodeAt(r);
                  n <= 127
                    ? t++
                    : n <= 2047
                    ? (t += 2)
                    : n >= 55296 && n <= 57343
                    ? ((t += 4), ++r)
                    : (t += 3);
                }
                return t;
              },
              ve = (e, t, r, n) => {
                if (!(n > 0)) return 0;
                for (var o = r, i = r + n - 1, a = 0; a < e.length; ++a) {
                  var s = e.charCodeAt(a);
                  if (
                    (s >= 55296 &&
                      s <= 57343 &&
                      (s =
                        (65536 + ((1023 & s) << 10)) |
                        (1023 & e.charCodeAt(++a))),
                    s <= 127)
                  ) {
                    if (r >= i) break;
                    t[r++] = s;
                  } else if (s <= 2047) {
                    if (r + 1 >= i) break;
                    (t[r++] = 192 | (s >> 6)), (t[r++] = 128 | (63 & s));
                  } else if (s <= 65535) {
                    if (r + 2 >= i) break;
                    (t[r++] = 224 | (s >> 12)),
                      (t[r++] = 128 | ((s >> 6) & 63)),
                      (t[r++] = 128 | (63 & s));
                  } else {
                    if (r + 3 >= i) break;
                    (t[r++] = 240 | (s >> 18)),
                      (t[r++] = 128 | ((s >> 12) & 63)),
                      (t[r++] = 128 | ((s >> 6) & 63)),
                      (t[r++] = 128 | (63 & s));
                  }
                }
                return (t[r] = 0), r - o;
              };
            function ye(e, t, r) {
              var n = r > 0 ? r : ge(e) + 1,
                o = new Array(n),
                i = ve(e, o, 0, o.length);
              return t && (o.length = i), o;
            }
            var be = {
                ttys: [],
                init() {},
                shutdown() {},
                register(e, t) {
                  (be.ttys[e] = { input: [], output: [], ops: t }),
                    Se.registerDevice(e, be.stream_ops);
                },
                stream_ops: {
                  open(e) {
                    var t = be.ttys[e.node.rdev];
                    if (!t) throw new Se.ErrnoError(43);
                    (e.tty = t), (e.seekable = !1);
                  },
                  close(e) {
                    e.tty.ops.fsync(e.tty);
                  },
                  fsync(e) {
                    e.tty.ops.fsync(e.tty);
                  },
                  read(e, t, r, n, o) {
                    if (!e.tty || !e.tty.ops.get_char)
                      throw new Se.ErrnoError(60);
                    for (var i = 0, a = 0; a < n; a++) {
                      var s;
                      try {
                        s = e.tty.ops.get_char(e.tty);
                      } catch (e) {
                        throw new Se.ErrnoError(29);
                      }
                      if (void 0 === s && 0 === i) throw new Se.ErrnoError(6);
                      if (null == s) break;
                      i++, (t[r + a] = s);
                    }
                    return i && (e.node.timestamp = Date.now()), i;
                  },
                  write(e, t, r, n, o) {
                    if (!e.tty || !e.tty.ops.put_char)
                      throw new Se.ErrnoError(60);
                    try {
                      for (var i = 0; i < n; i++)
                        e.tty.ops.put_char(e.tty, t[r + i]);
                    } catch (e) {
                      throw new Se.ErrnoError(29);
                    }
                    return n && (e.node.timestamp = Date.now()), i;
                  },
                },
                default_tty_ops: {
                  get_char: (e) =>
                    (() => {
                      if (!me.length) {
                        var e = null;
                        if (y) {
                          var t = Buffer.alloc(256),
                            r = 0,
                            n = process.stdin.fd;
                          try {
                            r = w.readSync(n, t);
                          } catch (e) {
                            if (!e.toString().includes("EOF")) throw e;
                            r = 0;
                          }
                          e = r > 0 ? t.slice(0, r).toString("utf-8") : null;
                        } else
                          "undefined" != typeof window &&
                          "function" == typeof window.prompt
                            ? null !== (e = window.prompt("Input: ")) &&
                              (e += "\n")
                            : "function" == typeof readline &&
                              null !== (e = readline()) &&
                              (e += "\n");
                        if (!e) return null;
                        me = ye(e, !0);
                      }
                      return me.shift();
                    })(),
                  put_char(e, t) {
                    null === t || 10 === t
                      ? (S(pe(e.output, 0)), (e.output = []))
                      : 0 != t && e.output.push(t);
                  },
                  fsync(e) {
                    e.output &&
                      e.output.length > 0 &&
                      (S(pe(e.output, 0)), (e.output = []));
                  },
                  ioctl_tcgets: (e) => ({
                    c_iflag: 25856,
                    c_oflag: 5,
                    c_cflag: 191,
                    c_lflag: 35387,
                    c_cc: [
                      3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22,
                      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    ],
                  }),
                  ioctl_tcsets: (e, t, r) => 0,
                  ioctl_tiocgwinsz: (e) => [24, 80],
                },
                default_tty1_ops: {
                  put_char(e, t) {
                    null === t || 10 === t
                      ? (k(pe(e.output, 0)), (e.output = []))
                      : 0 != t && e.output.push(t);
                  },
                  fsync(e) {
                    e.output &&
                      e.output.length > 0 &&
                      (k(pe(e.output, 0)), (e.output = []));
                  },
                },
              },
              we = (e) => {
                e = ((e, t) => Math.ceil(e / t) * t)(e, 65536);
                var t = Ou(65536, e);
                return t ? ((e, t) => (A.fill(0, e, e + t), e))(t, e) : 0;
              },
              _e = {
                ops_table: null,
                mount: (e) => _e.createNode(null, "/", 16895, 0),
                createNode(e, t, r, n) {
                  if (Se.isBlkdev(r) || Se.isFIFO(r))
                    throw new Se.ErrnoError(63);
                  _e.ops_table ||= {
                    dir: {
                      node: {
                        getattr: _e.node_ops.getattr,
                        setattr: _e.node_ops.setattr,
                        lookup: _e.node_ops.lookup,
                        mknod: _e.node_ops.mknod,
                        rename: _e.node_ops.rename,
                        unlink: _e.node_ops.unlink,
                        rmdir: _e.node_ops.rmdir,
                        readdir: _e.node_ops.readdir,
                        symlink: _e.node_ops.symlink,
                      },
                      stream: { llseek: _e.stream_ops.llseek },
                    },
                    file: {
                      node: {
                        getattr: _e.node_ops.getattr,
                        setattr: _e.node_ops.setattr,
                      },
                      stream: {
                        llseek: _e.stream_ops.llseek,
                        read: _e.stream_ops.read,
                        write: _e.stream_ops.write,
                        allocate: _e.stream_ops.allocate,
                        mmap: _e.stream_ops.mmap,
                        msync: _e.stream_ops.msync,
                      },
                    },
                    link: {
                      node: {
                        getattr: _e.node_ops.getattr,
                        setattr: _e.node_ops.setattr,
                        readlink: _e.node_ops.readlink,
                      },
                      stream: {},
                    },
                    chrdev: {
                      node: {
                        getattr: _e.node_ops.getattr,
                        setattr: _e.node_ops.setattr,
                      },
                      stream: Se.chrdev_stream_ops,
                    },
                  };
                  var o = Se.createNode(e, t, r, n);
                  return (
                    Se.isDir(o.mode)
                      ? ((o.node_ops = _e.ops_table.dir.node),
                        (o.stream_ops = _e.ops_table.dir.stream),
                        (o.contents = {}))
                      : Se.isFile(o.mode)
                      ? ((o.node_ops = _e.ops_table.file.node),
                        (o.stream_ops = _e.ops_table.file.stream),
                        (o.usedBytes = 0),
                        (o.contents = null))
                      : Se.isLink(o.mode)
                      ? ((o.node_ops = _e.ops_table.link.node),
                        (o.stream_ops = _e.ops_table.link.stream))
                      : Se.isChrdev(o.mode) &&
                        ((o.node_ops = _e.ops_table.chrdev.node),
                        (o.stream_ops = _e.ops_table.chrdev.stream)),
                    (o.timestamp = Date.now()),
                    e && ((e.contents[t] = o), (e.timestamp = o.timestamp)),
                    o
                  );
                },
                getFileDataAsTypedArray: (e) =>
                  e.contents
                    ? e.contents.subarray
                      ? e.contents.subarray(0, e.usedBytes)
                      : new Uint8Array(e.contents)
                    : new Uint8Array(0),
                expandFileStorage(e, t) {
                  var r = e.contents ? e.contents.length : 0;
                  if (!(r >= t)) {
                    (t = Math.max(t, (r * (r < 1048576 ? 2 : 1.125)) >>> 0)),
                      0 != r && (t = Math.max(t, 256));
                    var n = e.contents;
                    (e.contents = new Uint8Array(t)),
                      e.usedBytes > 0 &&
                        e.contents.set(n.subarray(0, e.usedBytes), 0);
                  }
                },
                resizeFileStorage(e, t) {
                  if (e.usedBytes != t)
                    if (0 == t) (e.contents = null), (e.usedBytes = 0);
                    else {
                      var r = e.contents;
                      (e.contents = new Uint8Array(t)),
                        r &&
                          e.contents.set(
                            r.subarray(0, Math.min(t, e.usedBytes))
                          ),
                        (e.usedBytes = t);
                    }
                },
                node_ops: {
                  getattr(e) {
                    var t = {};
                    return (
                      (t.dev = Se.isChrdev(e.mode) ? e.id : 1),
                      (t.ino = e.id),
                      (t.mode = e.mode),
                      (t.nlink = 1),
                      (t.uid = 0),
                      (t.gid = 0),
                      (t.rdev = e.rdev),
                      Se.isDir(e.mode)
                        ? (t.size = 4096)
                        : Se.isFile(e.mode)
                        ? (t.size = e.usedBytes)
                        : Se.isLink(e.mode)
                        ? (t.size = e.link.length)
                        : (t.size = 0),
                      (t.atime = new Date(e.timestamp)),
                      (t.mtime = new Date(e.timestamp)),
                      (t.ctime = new Date(e.timestamp)),
                      (t.blksize = 4096),
                      (t.blocks = Math.ceil(t.size / t.blksize)),
                      t
                    );
                  },
                  setattr(e, t) {
                    void 0 !== t.mode && (e.mode = t.mode),
                      void 0 !== t.timestamp && (e.timestamp = t.timestamp),
                      void 0 !== t.size && _e.resizeFileStorage(e, t.size);
                  },
                  lookup(e, t) {
                    throw Se.genericErrors[44];
                  },
                  mknod: (e, t, r, n) => _e.createNode(e, t, r, n),
                  rename(e, t, r) {
                    if (Se.isDir(e.mode)) {
                      var n;
                      try {
                        n = Se.lookupNode(t, r);
                      } catch (e) {}
                      if (n)
                        for (var o in n.contents) throw new Se.ErrnoError(55);
                    }
                    delete e.parent.contents[e.name],
                      (e.parent.timestamp = Date.now()),
                      (e.name = r),
                      (t.contents[r] = e),
                      (t.timestamp = e.parent.timestamp),
                      (e.parent = t);
                  },
                  unlink(e, t) {
                    delete e.contents[t], (e.timestamp = Date.now());
                  },
                  rmdir(e, t) {
                    var r = Se.lookupNode(e, t);
                    for (var n in r.contents) throw new Se.ErrnoError(55);
                    delete e.contents[t], (e.timestamp = Date.now());
                  },
                  readdir(e) {
                    var t = [".", ".."];
                    for (var r of Object.keys(e.contents)) t.push(r);
                    return t;
                  },
                  symlink(e, t, r) {
                    var n = _e.createNode(e, t, 41471, 0);
                    return (n.link = r), n;
                  },
                  readlink(e) {
                    if (!Se.isLink(e.mode)) throw new Se.ErrnoError(28);
                    return e.link;
                  },
                },
                stream_ops: {
                  read(e, t, r, n, o) {
                    var i = e.node.contents;
                    if (o >= e.node.usedBytes) return 0;
                    var a = Math.min(e.node.usedBytes - o, n);
                    if (a > 8 && i.subarray) t.set(i.subarray(o, o + a), r);
                    else for (var s = 0; s < a; s++) t[r + s] = i[o + s];
                    return a;
                  },
                  write(e, t, r, n, o, i) {
                    if ((t.buffer === T.buffer && (i = !1), !n)) return 0;
                    var a = e.node;
                    if (
                      ((a.timestamp = Date.now()),
                      t.subarray && (!a.contents || a.contents.subarray))
                    ) {
                      if (i)
                        return (
                          (a.contents = t.subarray(r, r + n)),
                          (a.usedBytes = n),
                          n
                        );
                      if (0 === a.usedBytes && 0 === o)
                        return (
                          (a.contents = t.slice(r, r + n)), (a.usedBytes = n), n
                        );
                      if (o + n <= a.usedBytes)
                        return a.contents.set(t.subarray(r, r + n), o), n;
                    }
                    if (
                      (_e.expandFileStorage(a, o + n),
                      a.contents.subarray && t.subarray)
                    )
                      a.contents.set(t.subarray(r, r + n), o);
                    else
                      for (var s = 0; s < n; s++) a.contents[o + s] = t[r + s];
                    return (a.usedBytes = Math.max(a.usedBytes, o + n)), n;
                  },
                  llseek(e, t, r) {
                    var n = t;
                    if (
                      (1 === r
                        ? (n += e.position)
                        : 2 === r &&
                          Se.isFile(e.node.mode) &&
                          (n += e.node.usedBytes),
                      n < 0)
                    )
                      throw new Se.ErrnoError(28);
                    return n;
                  },
                  allocate(e, t, r) {
                    _e.expandFileStorage(e.node, t + r),
                      (e.node.usedBytes = Math.max(e.node.usedBytes, t + r));
                  },
                  mmap(e, t, r, n, o) {
                    if (!Se.isFile(e.node.mode)) throw new Se.ErrnoError(43);
                    var i,
                      a,
                      s = e.node.contents;
                    if (2 & o || s.buffer !== T.buffer) {
                      if (
                        ((r > 0 || r + t < s.length) &&
                          (s = s.subarray
                            ? s.subarray(r, r + t)
                            : Array.prototype.slice.call(s, r, r + t)),
                        (a = !0),
                        !(i = we(t)))
                      )
                        throw new Se.ErrnoError(48);
                      T.set(s, i);
                    } else (a = !1), (i = s.byteOffset);
                    return { ptr: i, allocated: a };
                  },
                  msync: (e, t, r, n, o) => (
                    _e.stream_ops.write(e, t, 0, n, r, !1), 0
                  ),
                },
              },
              Ee = u.preloadPlugins || [],
              Ce = (e, t) => {
                var r = 0;
                return e && (r |= 365), t && (r |= 146), r;
              },
              Se = {
                root: null,
                mounts: [],
                devices: {},
                streams: [],
                nextInode: 1,
                nameTable: null,
                currentPath: "/",
                initialized: !1,
                ignorePermissions: !0,
                ErrnoError: class {
                  constructor(e) {
                    (this.name = "ErrnoError"), (this.errno = e);
                  }
                },
                genericErrors: {},
                filesystems: null,
                syncFSRequests: 0,
                lookupPath(e, t = {}) {
                  if (!(e = he.resolve(e))) return { path: "", node: null };
                  if (
                    (t = Object.assign(
                      { follow_mount: !0, recurse_count: 0 },
                      t
                    )).recurse_count > 8
                  )
                    throw new Se.ErrnoError(32);
                  for (
                    var r = e.split("/").filter((e) => !!e),
                      n = Se.root,
                      o = "/",
                      i = 0;
                    i < r.length;
                    i++
                  ) {
                    var a = i === r.length - 1;
                    if (a && t.parent) break;
                    if (
                      ((n = Se.lookupNode(n, r[i])),
                      (o = le.join2(o, r[i])),
                      Se.isMountpoint(n) &&
                        (!a || (a && t.follow_mount)) &&
                        (n = n.mounted.root),
                      !a || t.follow)
                    )
                      for (var s = 0; Se.isLink(n.mode); ) {
                        var u = Se.readlink(o);
                        if (
                          ((o = he.resolve(le.dirname(o), u)),
                          (n = Se.lookupPath(o, {
                            recurse_count: t.recurse_count + 1,
                          }).node),
                          s++ > 40)
                        )
                          throw new Se.ErrnoError(32);
                      }
                  }
                  return { path: o, node: n };
                },
                getPath(e) {
                  for (var t; ; ) {
                    if (Se.isRoot(e)) {
                      var r = e.mount.mountpoint;
                      return t
                        ? "/" !== r[r.length - 1]
                          ? `${r}/${t}`
                          : r + t
                        : r;
                    }
                    (t = t ? `${e.name}/${t}` : e.name), (e = e.parent);
                  }
                },
                hashName(e, t) {
                  for (var r = 0, n = 0; n < t.length; n++)
                    r = ((r << 5) - r + t.charCodeAt(n)) | 0;
                  return ((e + r) >>> 0) % Se.nameTable.length;
                },
                hashAddNode(e) {
                  var t = Se.hashName(e.parent.id, e.name);
                  (e.name_next = Se.nameTable[t]), (Se.nameTable[t] = e);
                },
                hashRemoveNode(e) {
                  var t = Se.hashName(e.parent.id, e.name);
                  if (Se.nameTable[t] === e) Se.nameTable[t] = e.name_next;
                  else
                    for (var r = Se.nameTable[t]; r; ) {
                      if (r.name_next === e) {
                        r.name_next = e.name_next;
                        break;
                      }
                      r = r.name_next;
                    }
                },
                lookupNode(e, t) {
                  var r = Se.mayLookup(e);
                  if (r) throw new Se.ErrnoError(r);
                  for (
                    var n = Se.hashName(e.id, t), o = Se.nameTable[n];
                    o;
                    o = o.name_next
                  ) {
                    var i = o.name;
                    if (o.parent.id === e.id && i === t) return o;
                  }
                  return Se.lookup(e, t);
                },
                createNode(e, t, r, n) {
                  var o = new Se.FSNode(e, t, r, n);
                  return Se.hashAddNode(o), o;
                },
                destroyNode(e) {
                  Se.hashRemoveNode(e);
                },
                isRoot: (e) => e === e.parent,
                isMountpoint: (e) => !!e.mounted,
                isFile: (e) => 32768 == (61440 & e),
                isDir: (e) => 16384 == (61440 & e),
                isLink: (e) => 40960 == (61440 & e),
                isChrdev: (e) => 8192 == (61440 & e),
                isBlkdev: (e) => 24576 == (61440 & e),
                isFIFO: (e) => 4096 == (61440 & e),
                isSocket: (e) => 49152 == (49152 & e),
                flagsToPermissionString(e) {
                  var t = ["r", "w", "rw"][3 & e];
                  return 512 & e && (t += "w"), t;
                },
                nodePermissions: (e, t) =>
                  Se.ignorePermissions ||
                  ((!t.includes("r") || 292 & e.mode) &&
                    (!t.includes("w") || 146 & e.mode) &&
                    (!t.includes("x") || 73 & e.mode))
                    ? 0
                    : 2,
                mayLookup(e) {
                  if (!Se.isDir(e.mode)) return 54;
                  var t = Se.nodePermissions(e, "x");
                  return t || (e.node_ops.lookup ? 0 : 2);
                },
                mayCreate(e, t) {
                  try {
                    return Se.lookupNode(e, t), 20;
                  } catch (e) {}
                  return Se.nodePermissions(e, "wx");
                },
                mayDelete(e, t, r) {
                  var n;
                  try {
                    n = Se.lookupNode(e, t);
                  } catch (e) {
                    return e.errno;
                  }
                  var o = Se.nodePermissions(e, "wx");
                  if (o) return o;
                  if (r) {
                    if (!Se.isDir(n.mode)) return 54;
                    if (Se.isRoot(n) || Se.getPath(n) === Se.cwd()) return 10;
                  } else if (Se.isDir(n.mode)) return 31;
                  return 0;
                },
                mayOpen: (e, t) =>
                  e
                    ? Se.isLink(e.mode)
                      ? 32
                      : Se.isDir(e.mode) &&
                        ("r" !== Se.flagsToPermissionString(t) || 512 & t)
                      ? 31
                      : Se.nodePermissions(e, Se.flagsToPermissionString(t))
                    : 44,
                MAX_OPEN_FDS: 4096,
                nextfd() {
                  for (var e = 0; e <= Se.MAX_OPEN_FDS; e++)
                    if (!Se.streams[e]) return e;
                  throw new Se.ErrnoError(33);
                },
                getStreamChecked(e) {
                  var t = Se.getStream(e);
                  if (!t) throw new Se.ErrnoError(8);
                  return t;
                },
                getStream: (e) => Se.streams[e],
                createStream: (e, t = -1) => (
                  Se.FSStream ||
                    ((Se.FSStream = function () {
                      this.shared = {};
                    }),
                    (Se.FSStream.prototype = {}),
                    Object.defineProperties(Se.FSStream.prototype, {
                      object: {
                        get() {
                          return this.node;
                        },
                        set(e) {
                          this.node = e;
                        },
                      },
                      isRead: {
                        get() {
                          return 1 != (2097155 & this.flags);
                        },
                      },
                      isWrite: {
                        get() {
                          return 0 != (2097155 & this.flags);
                        },
                      },
                      isAppend: {
                        get() {
                          return 1024 & this.flags;
                        },
                      },
                      flags: {
                        get() {
                          return this.shared.flags;
                        },
                        set(e) {
                          this.shared.flags = e;
                        },
                      },
                      position: {
                        get() {
                          return this.shared.position;
                        },
                        set(e) {
                          this.shared.position = e;
                        },
                      },
                    })),
                  (e = Object.assign(new Se.FSStream(), e)),
                  -1 == t && (t = Se.nextfd()),
                  (e.fd = t),
                  (Se.streams[t] = e),
                  e
                ),
                closeStream(e) {
                  Se.streams[e] = null;
                },
                chrdev_stream_ops: {
                  open(e) {
                    var t = Se.getDevice(e.node.rdev);
                    (e.stream_ops = t.stream_ops), e.stream_ops.open?.(e);
                  },
                  llseek() {
                    throw new Se.ErrnoError(70);
                  },
                },
                major: (e) => e >> 8,
                minor: (e) => 255 & e,
                makedev: (e, t) => (e << 8) | t,
                registerDevice(e, t) {
                  Se.devices[e] = { stream_ops: t };
                },
                getDevice: (e) => Se.devices[e],
                getMounts(e) {
                  for (var t = [], r = [e]; r.length; ) {
                    var n = r.pop();
                    t.push(n), r.push.apply(r, n.mounts);
                  }
                  return t;
                },
                syncfs(e, t) {
                  "function" == typeof e && ((t = e), (e = !1)),
                    Se.syncFSRequests++,
                    Se.syncFSRequests > 1 &&
                      k(
                        `warning: ${Se.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`
                      );
                  var r = Se.getMounts(Se.root.mount),
                    n = 0;
                  function o(e) {
                    return Se.syncFSRequests--, t(e);
                  }
                  function i(e) {
                    if (e) return i.errored ? void 0 : ((i.errored = !0), o(e));
                    ++n >= r.length && o(null);
                  }
                  r.forEach((t) => {
                    if (!t.type.syncfs) return i(null);
                    t.type.syncfs(t, e, i);
                  });
                },
                mount(e, t, r) {
                  var n,
                    o = "/" === r,
                    i = !r;
                  if (o && Se.root) throw new Se.ErrnoError(10);
                  if (!o && !i) {
                    var a = Se.lookupPath(r, { follow_mount: !1 });
                    if (((r = a.path), (n = a.node), Se.isMountpoint(n)))
                      throw new Se.ErrnoError(10);
                    if (!Se.isDir(n.mode)) throw new Se.ErrnoError(54);
                  }
                  var s = { type: e, opts: t, mountpoint: r, mounts: [] },
                    u = e.mount(s);
                  return (
                    (u.mount = s),
                    (s.root = u),
                    o
                      ? (Se.root = u)
                      : n &&
                        ((n.mounted = s), n.mount && n.mount.mounts.push(s)),
                    u
                  );
                },
                unmount(e) {
                  var t = Se.lookupPath(e, { follow_mount: !1 });
                  if (!Se.isMountpoint(t.node)) throw new Se.ErrnoError(28);
                  var r = t.node,
                    n = r.mounted,
                    o = Se.getMounts(n);
                  Object.keys(Se.nameTable).forEach((e) => {
                    for (var t = Se.nameTable[e]; t; ) {
                      var r = t.name_next;
                      o.includes(t.mount) && Se.destroyNode(t), (t = r);
                    }
                  }),
                    (r.mounted = null);
                  var i = r.mount.mounts.indexOf(n);
                  r.mount.mounts.splice(i, 1);
                },
                lookup: (e, t) => e.node_ops.lookup(e, t),
                mknod(e, t, r) {
                  var n = Se.lookupPath(e, { parent: !0 }).node,
                    o = le.basename(e);
                  if (!o || "." === o || ".." === o)
                    throw new Se.ErrnoError(28);
                  var i = Se.mayCreate(n, o);
                  if (i) throw new Se.ErrnoError(i);
                  if (!n.node_ops.mknod) throw new Se.ErrnoError(63);
                  return n.node_ops.mknod(n, o, t, r);
                },
                create: (e, t) => (
                  (t = void 0 !== t ? t : 438),
                  (t &= 4095),
                  (t |= 32768),
                  Se.mknod(e, t, 0)
                ),
                mkdir: (e, t) => (
                  (t = void 0 !== t ? t : 511),
                  (t &= 1023),
                  (t |= 16384),
                  Se.mknod(e, t, 0)
                ),
                mkdirTree(e, t) {
                  for (var r = e.split("/"), n = "", o = 0; o < r.length; ++o)
                    if (r[o]) {
                      n += "/" + r[o];
                      try {
                        Se.mkdir(n, t);
                      } catch (e) {
                        if (20 != e.errno) throw e;
                      }
                    }
                },
                mkdev: (e, t, r) => (
                  void 0 === r && ((r = t), (t = 438)),
                  (t |= 8192),
                  Se.mknod(e, t, r)
                ),
                symlink(e, t) {
                  if (!he.resolve(e)) throw new Se.ErrnoError(44);
                  var r = Se.lookupPath(t, { parent: !0 }).node;
                  if (!r) throw new Se.ErrnoError(44);
                  var n = le.basename(t),
                    o = Se.mayCreate(r, n);
                  if (o) throw new Se.ErrnoError(o);
                  if (!r.node_ops.symlink) throw new Se.ErrnoError(63);
                  return r.node_ops.symlink(r, n, e);
                },
                rename(e, t) {
                  var r,
                    n,
                    o = le.dirname(e),
                    i = le.dirname(t),
                    a = le.basename(e),
                    s = le.basename(t);
                  if (
                    ((r = Se.lookupPath(e, { parent: !0 }).node),
                    (n = Se.lookupPath(t, { parent: !0 }).node),
                    !r || !n)
                  )
                    throw new Se.ErrnoError(44);
                  if (r.mount !== n.mount) throw new Se.ErrnoError(75);
                  var u,
                    c = Se.lookupNode(r, a),
                    l = he.relative(e, i);
                  if ("." !== l.charAt(0)) throw new Se.ErrnoError(28);
                  if ("." !== (l = he.relative(t, o)).charAt(0))
                    throw new Se.ErrnoError(55);
                  try {
                    u = Se.lookupNode(n, s);
                  } catch (e) {}
                  if (c !== u) {
                    var d = Se.isDir(c.mode),
                      h = Se.mayDelete(r, a, d);
                    if (h) throw new Se.ErrnoError(h);
                    if ((h = u ? Se.mayDelete(n, s, d) : Se.mayCreate(n, s)))
                      throw new Se.ErrnoError(h);
                    if (!r.node_ops.rename) throw new Se.ErrnoError(63);
                    if (Se.isMountpoint(c) || (u && Se.isMountpoint(u)))
                      throw new Se.ErrnoError(10);
                    if (n !== r && (h = Se.nodePermissions(r, "w")))
                      throw new Se.ErrnoError(h);
                    Se.hashRemoveNode(c);
                    try {
                      r.node_ops.rename(c, n, s);
                    } catch (e) {
                      throw e;
                    } finally {
                      Se.hashAddNode(c);
                    }
                  }
                },
                rmdir(e) {
                  var t = Se.lookupPath(e, { parent: !0 }).node,
                    r = le.basename(e),
                    n = Se.lookupNode(t, r),
                    o = Se.mayDelete(t, r, !0);
                  if (o) throw new Se.ErrnoError(o);
                  if (!t.node_ops.rmdir) throw new Se.ErrnoError(63);
                  if (Se.isMountpoint(n)) throw new Se.ErrnoError(10);
                  t.node_ops.rmdir(t, r), Se.destroyNode(n);
                },
                readdir(e) {
                  var t = Se.lookupPath(e, { follow: !0 }).node;
                  if (!t.node_ops.readdir) throw new Se.ErrnoError(54);
                  return t.node_ops.readdir(t);
                },
                unlink(e) {
                  var t = Se.lookupPath(e, { parent: !0 }).node;
                  if (!t) throw new Se.ErrnoError(44);
                  var r = le.basename(e),
                    n = Se.lookupNode(t, r),
                    o = Se.mayDelete(t, r, !1);
                  if (o) throw new Se.ErrnoError(o);
                  if (!t.node_ops.unlink) throw new Se.ErrnoError(63);
                  if (Se.isMountpoint(n)) throw new Se.ErrnoError(10);
                  t.node_ops.unlink(t, r), Se.destroyNode(n);
                },
                readlink(e) {
                  var t = Se.lookupPath(e).node;
                  if (!t) throw new Se.ErrnoError(44);
                  if (!t.node_ops.readlink) throw new Se.ErrnoError(28);
                  return he.resolve(
                    Se.getPath(t.parent),
                    t.node_ops.readlink(t)
                  );
                },
                stat(e, t) {
                  var r = Se.lookupPath(e, { follow: !t }).node;
                  if (!r) throw new Se.ErrnoError(44);
                  if (!r.node_ops.getattr) throw new Se.ErrnoError(63);
                  return r.node_ops.getattr(r);
                },
                lstat: (e) => Se.stat(e, !0),
                chmod(e, t, r) {
                  var n;
                  if (
                    !(n =
                      "string" == typeof e
                        ? Se.lookupPath(e, { follow: !r }).node
                        : e).node_ops.setattr
                  )
                    throw new Se.ErrnoError(63);
                  n.node_ops.setattr(n, {
                    mode: (4095 & t) | (-4096 & n.mode),
                    timestamp: Date.now(),
                  });
                },
                lchmod(e, t) {
                  Se.chmod(e, t, !0);
                },
                fchmod(e, t) {
                  var r = Se.getStreamChecked(e);
                  Se.chmod(r.node, t);
                },
                chown(e, t, r, n) {
                  var o;
                  if (
                    !(o =
                      "string" == typeof e
                        ? Se.lookupPath(e, { follow: !n }).node
                        : e).node_ops.setattr
                  )
                    throw new Se.ErrnoError(63);
                  o.node_ops.setattr(o, { timestamp: Date.now() });
                },
                lchown(e, t, r) {
                  Se.chown(e, t, r, !0);
                },
                fchown(e, t, r) {
                  var n = Se.getStreamChecked(e);
                  Se.chown(n.node, t, r);
                },
                truncate(e, t) {
                  if (t < 0) throw new Se.ErrnoError(28);
                  var r;
                  if (
                    !(r =
                      "string" == typeof e
                        ? Se.lookupPath(e, { follow: !0 }).node
                        : e).node_ops.setattr
                  )
                    throw new Se.ErrnoError(63);
                  if (Se.isDir(r.mode)) throw new Se.ErrnoError(31);
                  if (!Se.isFile(r.mode)) throw new Se.ErrnoError(28);
                  var n = Se.nodePermissions(r, "w");
                  if (n) throw new Se.ErrnoError(n);
                  r.node_ops.setattr(r, { size: t, timestamp: Date.now() });
                },
                ftruncate(e, t) {
                  var r = Se.getStreamChecked(e);
                  if (0 == (2097155 & r.flags)) throw new Se.ErrnoError(28);
                  Se.truncate(r.node, t);
                },
                utime(e, t, r) {
                  var n = Se.lookupPath(e, { follow: !0 }).node;
                  n.node_ops.setattr(n, { timestamp: Math.max(t, r) });
                },
                open(e, t, r) {
                  if ("" === e) throw new Se.ErrnoError(44);
                  var n;
                  if (
                    ((r = void 0 === r ? 438 : r),
                    (r =
                      64 &
                      (t =
                        "string" == typeof t
                          ? ((e) => {
                              var t = {
                                r: 0,
                                "r+": 2,
                                w: 577,
                                "w+": 578,
                                a: 1089,
                                "a+": 1090,
                              }[e];
                              if (void 0 === t)
                                throw new Error(`Unknown file open mode: ${e}`);
                              return t;
                            })(t)
                          : t)
                        ? (4095 & r) | 32768
                        : 0),
                    "object" == typeof e)
                  )
                    n = e;
                  else {
                    e = le.normalize(e);
                    try {
                      n = Se.lookupPath(e, { follow: !(131072 & t) }).node;
                    } catch (e) {}
                  }
                  var o = !1;
                  if (64 & t)
                    if (n) {
                      if (128 & t) throw new Se.ErrnoError(20);
                    } else (n = Se.mknod(e, r, 0)), (o = !0);
                  if (!n) throw new Se.ErrnoError(44);
                  if (
                    (Se.isChrdev(n.mode) && (t &= -513),
                    65536 & t && !Se.isDir(n.mode))
                  )
                    throw new Se.ErrnoError(54);
                  if (!o) {
                    var i = Se.mayOpen(n, t);
                    if (i) throw new Se.ErrnoError(i);
                  }
                  512 & t && !o && Se.truncate(n, 0), (t &= -131713);
                  var a = Se.createStream({
                    node: n,
                    path: Se.getPath(n),
                    flags: t,
                    seekable: !0,
                    position: 0,
                    stream_ops: n.stream_ops,
                    ungotten: [],
                    error: !1,
                  });
                  return (
                    a.stream_ops.open && a.stream_ops.open(a),
                    !u.logReadFiles ||
                      1 & t ||
                      (Se.readFiles || (Se.readFiles = {}),
                      e in Se.readFiles || (Se.readFiles[e] = 1)),
                    a
                  );
                },
                close(e) {
                  if (Se.isClosed(e)) throw new Se.ErrnoError(8);
                  e.getdents && (e.getdents = null);
                  try {
                    e.stream_ops.close && e.stream_ops.close(e);
                  } catch (e) {
                    throw e;
                  } finally {
                    Se.closeStream(e.fd);
                  }
                  e.fd = null;
                },
                isClosed: (e) => null === e.fd,
                llseek(e, t, r) {
                  if (Se.isClosed(e)) throw new Se.ErrnoError(8);
                  if (!e.seekable || !e.stream_ops.llseek)
                    throw new Se.ErrnoError(70);
                  if (0 != r && 1 != r && 2 != r) throw new Se.ErrnoError(28);
                  return (
                    (e.position = e.stream_ops.llseek(e, t, r)),
                    (e.ungotten = []),
                    e.position
                  );
                },
                read(e, t, r, n, o) {
                  if (n < 0 || o < 0) throw new Se.ErrnoError(28);
                  if (Se.isClosed(e)) throw new Se.ErrnoError(8);
                  if (1 == (2097155 & e.flags)) throw new Se.ErrnoError(8);
                  if (Se.isDir(e.node.mode)) throw new Se.ErrnoError(31);
                  if (!e.stream_ops.read) throw new Se.ErrnoError(28);
                  var i = void 0 !== o;
                  if (i) {
                    if (!e.seekable) throw new Se.ErrnoError(70);
                  } else o = e.position;
                  var a = e.stream_ops.read(e, t, r, n, o);
                  return i || (e.position += a), a;
                },
                write(e, t, r, n, o, i) {
                  if (n < 0 || o < 0) throw new Se.ErrnoError(28);
                  if (Se.isClosed(e)) throw new Se.ErrnoError(8);
                  if (0 == (2097155 & e.flags)) throw new Se.ErrnoError(8);
                  if (Se.isDir(e.node.mode)) throw new Se.ErrnoError(31);
                  if (!e.stream_ops.write) throw new Se.ErrnoError(28);
                  e.seekable && 1024 & e.flags && Se.llseek(e, 0, 2);
                  var a = void 0 !== o;
                  if (a) {
                    if (!e.seekable) throw new Se.ErrnoError(70);
                  } else o = e.position;
                  var s = e.stream_ops.write(e, t, r, n, o, i);
                  return a || (e.position += s), s;
                },
                allocate(e, t, r) {
                  if (Se.isClosed(e)) throw new Se.ErrnoError(8);
                  if (t < 0 || r <= 0) throw new Se.ErrnoError(28);
                  if (0 == (2097155 & e.flags)) throw new Se.ErrnoError(8);
                  if (!Se.isFile(e.node.mode) && !Se.isDir(e.node.mode))
                    throw new Se.ErrnoError(43);
                  if (!e.stream_ops.allocate) throw new Se.ErrnoError(138);
                  e.stream_ops.allocate(e, t, r);
                },
                mmap(e, t, r, n, o) {
                  if (0 != (2 & n) && 0 == (2 & o) && 2 != (2097155 & e.flags))
                    throw new Se.ErrnoError(2);
                  if (1 == (2097155 & e.flags)) throw new Se.ErrnoError(2);
                  if (!e.stream_ops.mmap) throw new Se.ErrnoError(43);
                  return e.stream_ops.mmap(e, t, r, n, o);
                },
                msync: (e, t, r, n, o) =>
                  e.stream_ops.msync ? e.stream_ops.msync(e, t, r, n, o) : 0,
                munmap: (e) => 0,
                ioctl(e, t, r) {
                  if (!e.stream_ops.ioctl) throw new Se.ErrnoError(59);
                  return e.stream_ops.ioctl(e, t, r);
                },
                readFile(e, t = {}) {
                  if (
                    ((t.flags = t.flags || 0),
                    (t.encoding = t.encoding || "binary"),
                    "utf8" !== t.encoding && "binary" !== t.encoding)
                  )
                    throw new Error(`Invalid encoding type "${t.encoding}"`);
                  var r,
                    n = Se.open(e, t.flags),
                    o = Se.stat(e).size,
                    i = new Uint8Array(o);
                  return (
                    Se.read(n, i, 0, o, 0),
                    "utf8" === t.encoding
                      ? (r = pe(i, 0))
                      : "binary" === t.encoding && (r = i),
                    Se.close(n),
                    r
                  );
                },
                writeFile(e, t, r = {}) {
                  r.flags = r.flags || 577;
                  var n = Se.open(e, r.flags, r.mode);
                  if ("string" == typeof t) {
                    var o = new Uint8Array(ge(t) + 1),
                      i = ve(t, o, 0, o.length);
                    Se.write(n, o, 0, i, void 0, r.canOwn);
                  } else {
                    if (!ArrayBuffer.isView(t))
                      throw new Error("Unsupported data type");
                    Se.write(n, t, 0, t.byteLength, void 0, r.canOwn);
                  }
                  Se.close(n);
                },
                cwd: () => Se.currentPath,
                chdir(e) {
                  var t = Se.lookupPath(e, { follow: !0 });
                  if (null === t.node) throw new Se.ErrnoError(44);
                  if (!Se.isDir(t.node.mode)) throw new Se.ErrnoError(54);
                  var r = Se.nodePermissions(t.node, "x");
                  if (r) throw new Se.ErrnoError(r);
                  Se.currentPath = t.path;
                },
                createDefaultDirectories() {
                  Se.mkdir("/tmp"),
                    Se.mkdir("/home"),
                    Se.mkdir("/home/web_user");
                },
                createDefaultDevices() {
                  Se.mkdir("/dev"),
                    Se.registerDevice(Se.makedev(1, 3), {
                      read: () => 0,
                      write: (e, t, r, n, o) => n,
                    }),
                    Se.mkdev("/dev/null", Se.makedev(1, 3)),
                    be.register(Se.makedev(5, 0), be.default_tty_ops),
                    be.register(Se.makedev(6, 0), be.default_tty1_ops),
                    Se.mkdev("/dev/tty", Se.makedev(5, 0)),
                    Se.mkdev("/dev/tty1", Se.makedev(6, 0));
                  var e = new Uint8Array(1024),
                    t = 0,
                    r = () => (0 === t && (t = de(e).byteLength), e[--t]);
                  Se.createDevice("/dev", "random", r),
                    Se.createDevice("/dev", "urandom", r),
                    Se.mkdir("/dev/shm"),
                    Se.mkdir("/dev/shm/tmp");
                },
                createSpecialDirectories() {
                  Se.mkdir("/proc");
                  var e = Se.mkdir("/proc/self");
                  Se.mkdir("/proc/self/fd"),
                    Se.mount(
                      {
                        mount() {
                          var t = Se.createNode(e, "fd", 16895, 73);
                          return (
                            (t.node_ops = {
                              lookup(e, t) {
                                var r = +t,
                                  n = Se.getStreamChecked(r),
                                  o = {
                                    parent: null,
                                    mount: { mountpoint: "fake" },
                                    node_ops: { readlink: () => n.path },
                                  };
                                return (o.parent = o), o;
                              },
                            }),
                            t
                          );
                        },
                      },
                      {},
                      "/proc/self/fd"
                    );
                },
                createStandardStreams() {
                  u.stdin
                    ? Se.createDevice("/dev", "stdin", u.stdin)
                    : Se.symlink("/dev/tty", "/dev/stdin"),
                    u.stdout
                      ? Se.createDevice("/dev", "stdout", null, u.stdout)
                      : Se.symlink("/dev/tty", "/dev/stdout"),
                    u.stderr
                      ? Se.createDevice("/dev", "stderr", null, u.stderr)
                      : Se.symlink("/dev/tty1", "/dev/stderr"),
                    Se.open("/dev/stdin", 0),
                    Se.open("/dev/stdout", 1),
                    Se.open("/dev/stderr", 1);
                },
                staticInit() {
                  [44].forEach((e) => {
                    (Se.genericErrors[e] = new Se.ErrnoError(e)),
                      (Se.genericErrors[e].stack = "<generic error, no stack>");
                  }),
                    (Se.nameTable = new Array(4096)),
                    Se.mount(_e, {}, "/"),
                    Se.createDefaultDirectories(),
                    Se.createDefaultDevices(),
                    Se.createSpecialDirectories(),
                    (Se.filesystems = { MEMFS: _e });
                },
                init(e, t, r) {
                  (Se.init.initialized = !0),
                    (u.stdin = e || u.stdin),
                    (u.stdout = t || u.stdout),
                    (u.stderr = r || u.stderr),
                    Se.createStandardStreams();
                },
                quit() {
                  Se.init.initialized = !1;
                  for (var e = 0; e < Se.streams.length; e++) {
                    var t = Se.streams[e];
                    t && Se.close(t);
                  }
                },
                findObject(e, t) {
                  var r = Se.analyzePath(e, t);
                  return r.exists ? r.object : null;
                },
                analyzePath(e, t) {
                  try {
                    e = (n = Se.lookupPath(e, { follow: !t })).path;
                  } catch (e) {}
                  var r = {
                    isRoot: !1,
                    exists: !1,
                    error: 0,
                    name: null,
                    path: null,
                    object: null,
                    parentExists: !1,
                    parentPath: null,
                    parentObject: null,
                  };
                  try {
                    var n = Se.lookupPath(e, { parent: !0 });
                    (r.parentExists = !0),
                      (r.parentPath = n.path),
                      (r.parentObject = n.node),
                      (r.name = le.basename(e)),
                      (n = Se.lookupPath(e, { follow: !t })),
                      (r.exists = !0),
                      (r.path = n.path),
                      (r.object = n.node),
                      (r.name = n.node.name),
                      (r.isRoot = "/" === n.path);
                  } catch (e) {
                    r.error = e.errno;
                  }
                  return r;
                },
                createPath(e, t, r, n) {
                  e = "string" == typeof e ? e : Se.getPath(e);
                  for (var o = t.split("/").reverse(); o.length; ) {
                    var i = o.pop();
                    if (i) {
                      var a = le.join2(e, i);
                      try {
                        Se.mkdir(a);
                      } catch (e) {}
                      e = a;
                    }
                  }
                  return a;
                },
                createFile(e, t, r, n, o) {
                  var i = le.join2("string" == typeof e ? e : Se.getPath(e), t),
                    a = Ce(n, o);
                  return Se.create(i, a);
                },
                createDataFile(e, t, r, n, o, i) {
                  var a = t;
                  e &&
                    ((e = "string" == typeof e ? e : Se.getPath(e)),
                    (a = t ? le.join2(e, t) : e));
                  var s = Ce(n, o),
                    u = Se.create(a, s);
                  if (r) {
                    if ("string" == typeof r) {
                      for (
                        var c = new Array(r.length), l = 0, d = r.length;
                        l < d;
                        ++l
                      )
                        c[l] = r.charCodeAt(l);
                      r = c;
                    }
                    Se.chmod(u, 146 | s);
                    var h = Se.open(u, 577);
                    Se.write(h, r, 0, r.length, 0, i),
                      Se.close(h),
                      Se.chmod(u, s);
                  }
                },
                createDevice(e, t, r, n) {
                  var o = le.join2("string" == typeof e ? e : Se.getPath(e), t),
                    i = Ce(!!r, !!n);
                  Se.createDevice.major || (Se.createDevice.major = 64);
                  var a = Se.makedev(Se.createDevice.major++, 0);
                  return (
                    Se.registerDevice(a, {
                      open(e) {
                        e.seekable = !1;
                      },
                      close(e) {
                        n?.buffer?.length && n(10);
                      },
                      read(e, t, n, o, i) {
                        for (var a = 0, s = 0; s < o; s++) {
                          var u;
                          try {
                            u = r();
                          } catch (e) {
                            throw new Se.ErrnoError(29);
                          }
                          if (void 0 === u && 0 === a)
                            throw new Se.ErrnoError(6);
                          if (null == u) break;
                          a++, (t[n + s] = u);
                        }
                        return a && (e.node.timestamp = Date.now()), a;
                      },
                      write(e, t, r, o, i) {
                        for (var a = 0; a < o; a++)
                          try {
                            n(t[r + a]);
                          } catch (e) {
                            throw new Se.ErrnoError(29);
                          }
                        return o && (e.node.timestamp = Date.now()), a;
                      },
                    }),
                    Se.mkdev(o, i, a)
                  );
                },
                forceLoadFile(e) {
                  if (e.isDevice || e.isFolder || e.link || e.contents)
                    return !0;
                  if ("undefined" != typeof XMLHttpRequest)
                    throw new Error(
                      "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
                    );
                  if (!c)
                    throw new Error(
                      "Cannot load without read() or XMLHttpRequest."
                    );
                  try {
                    (e.contents = ye(c(e.url), !0)),
                      (e.usedBytes = e.contents.length);
                  } catch (e) {
                    throw new Se.ErrnoError(29);
                  }
                },
                createLazyFile(e, t, r, n, o) {
                  function i() {
                    (this.lengthKnown = !1), (this.chunks = []);
                  }
                  if (
                    ((i.prototype.get = function (e) {
                      if (!(e > this.length - 1 || e < 0)) {
                        var t = e % this.chunkSize,
                          r = (e / this.chunkSize) | 0;
                        return this.getter(r)[t];
                      }
                    }),
                    (i.prototype.setDataGetter = function (e) {
                      this.getter = e;
                    }),
                    (i.prototype.cacheLength = function () {
                      var e = new XMLHttpRequest();
                      if (
                        (e.open("HEAD", r, !1),
                        e.send(null),
                        !(
                          (e.status >= 200 && e.status < 300) ||
                          304 === e.status
                        ))
                      )
                        throw new Error(
                          "Couldn't load " + r + ". Status: " + e.status
                        );
                      var t,
                        n = Number(e.getResponseHeader("Content-length")),
                        o =
                          (t = e.getResponseHeader("Accept-Ranges")) &&
                          "bytes" === t,
                        i =
                          (t = e.getResponseHeader("Content-Encoding")) &&
                          "gzip" === t,
                        a = 1048576;
                      o || (a = n);
                      var s = this;
                      s.setDataGetter((e) => {
                        var t = e * a,
                          o = (e + 1) * a - 1;
                        if (
                          ((o = Math.min(o, n - 1)),
                          void 0 === s.chunks[e] &&
                            (s.chunks[e] = ((e, t) => {
                              if (e > t)
                                throw new Error(
                                  "invalid range (" +
                                    e +
                                    ", " +
                                    t +
                                    ") or no bytes requested!"
                                );
                              if (t > n - 1)
                                throw new Error(
                                  "only " +
                                    n +
                                    " bytes available! programmer error!"
                                );
                              var o = new XMLHttpRequest();
                              if (
                                (o.open("GET", r, !1),
                                n !== a &&
                                  o.setRequestHeader(
                                    "Range",
                                    "bytes=" + e + "-" + t
                                  ),
                                (o.responseType = "arraybuffer"),
                                o.overrideMimeType &&
                                  o.overrideMimeType(
                                    "text/plain; charset=x-user-defined"
                                  ),
                                o.send(null),
                                !(
                                  (o.status >= 200 && o.status < 300) ||
                                  304 === o.status
                                ))
                              )
                                throw new Error(
                                  "Couldn't load " + r + ". Status: " + o.status
                                );
                              return void 0 !== o.response
                                ? new Uint8Array(o.response || [])
                                : ye(o.responseText || "", !0);
                            })(t, o)),
                          void 0 === s.chunks[e])
                        )
                          throw new Error("doXHR failed!");
                        return s.chunks[e];
                      }),
                        (!i && n) ||
                          ((a = n = 1),
                          (n = this.getter(0).length),
                          (a = n),
                          S(
                            "LazyFiles on gzip forces download of the whole file when length is accessed"
                          )),
                        (this._length = n),
                        (this._chunkSize = a),
                        (this.lengthKnown = !0);
                    }),
                    "undefined" != typeof XMLHttpRequest)
                  ) {
                    if (!v)
                      throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                    var a = new i();
                    Object.defineProperties(a, {
                      length: {
                        get: function () {
                          return (
                            this.lengthKnown || this.cacheLength(), this._length
                          );
                        },
                      },
                      chunkSize: {
                        get: function () {
                          return (
                            this.lengthKnown || this.cacheLength(),
                            this._chunkSize
                          );
                        },
                      },
                    });
                    var s = { isDevice: !1, contents: a };
                  } else s = { isDevice: !1, url: r };
                  var u = Se.createFile(e, t, s, n, o);
                  s.contents
                    ? (u.contents = s.contents)
                    : s.url && ((u.contents = null), (u.url = s.url)),
                    Object.defineProperties(u, {
                      usedBytes: {
                        get: function () {
                          return this.contents.length;
                        },
                      },
                    });
                  var c = {};
                  function l(e, t, r, n, o) {
                    var i = e.node.contents;
                    if (o >= i.length) return 0;
                    var a = Math.min(i.length - o, n);
                    if (i.slice)
                      for (var s = 0; s < a; s++) t[r + s] = i[o + s];
                    else for (s = 0; s < a; s++) t[r + s] = i.get(o + s);
                    return a;
                  }
                  return (
                    Object.keys(u.stream_ops).forEach((e) => {
                      var t = u.stream_ops[e];
                      c[e] = function () {
                        return Se.forceLoadFile(u), t.apply(null, arguments);
                      };
                    }),
                    (c.read = (e, t, r, n, o) => (
                      Se.forceLoadFile(u), l(e, t, r, n, o)
                    )),
                    (c.mmap = (e, t, r, n, o) => {
                      Se.forceLoadFile(u);
                      var i = we(t);
                      if (!i) throw new Se.ErrnoError(48);
                      return l(e, T, i, t, r), { ptr: i, allocated: !0 };
                    }),
                    (u.stream_ops = c),
                    u
                  );
                },
              },
              ke = (e, t) => (e ? pe(A, e, t) : ""),
              xe = {
                DEFAULT_POLLMASK: 5,
                calculateAt(e, t, r) {
                  if (le.isAbs(t)) return t;
                  var n;
                  if (
                    ((n = -100 === e ? Se.cwd() : xe.getStreamFromFD(e).path),
                    0 == t.length)
                  ) {
                    if (!r) throw new Se.ErrnoError(44);
                    return n;
                  }
                  return le.join2(n, t);
                },
                doStat(e, t, r) {
                  var n = e(t);
                  (L[r >> 2] = n.dev),
                    (L[(r + 4) >> 2] = n.mode),
                    (R[(r + 8) >> 2] = n.nlink),
                    (L[(r + 12) >> 2] = n.uid),
                    (L[(r + 16) >> 2] = n.gid),
                    (L[(r + 20) >> 2] = n.rdev),
                    (D[(r + 24) >> 3] = BigInt(n.size)),
                    (L[(r + 32) >> 2] = 4096),
                    (L[(r + 36) >> 2] = n.blocks);
                  var o = n.atime.getTime(),
                    i = n.mtime.getTime(),
                    a = n.ctime.getTime();
                  return (
                    (D[(r + 40) >> 3] = BigInt(Math.floor(o / 1e3))),
                    (R[(r + 48) >> 2] = (o % 1e3) * 1e3),
                    (D[(r + 56) >> 3] = BigInt(Math.floor(i / 1e3))),
                    (R[(r + 64) >> 2] = (i % 1e3) * 1e3),
                    (D[(r + 72) >> 3] = BigInt(Math.floor(a / 1e3))),
                    (R[(r + 80) >> 2] = (a % 1e3) * 1e3),
                    (D[(r + 88) >> 3] = BigInt(n.ino)),
                    0
                  );
                },
                doMsync(e, t, r, n, o) {
                  if (!Se.isFile(t.node.mode)) throw new Se.ErrnoError(43);
                  if (2 & n) return 0;
                  var i = A.slice(e, e + r);
                  Se.msync(t, i, o, r, n);
                },
                varargs: void 0,
                get() {
                  var e = L[+xe.varargs >> 2];
                  return (xe.varargs += 4), e;
                },
                getp: () => xe.get(),
                getStr: (e) => ke(e),
                getStreamFromFD: (e) => Se.getStreamChecked(e),
              },
              Te = {},
              Ae = (e) => {
                for (; e.length; ) {
                  var t = e.pop();
                  e.pop()(t);
                }
              };
            function Pe(e) {
              return this.fromWireType(L[e >> 2]);
            }
            var Fe,
              Le,
              Re,
              Be = {},
              De = {},
              Me = {},
              Oe = (e) => {
                throw new Fe(e);
              },
              Ie = (e, t, r) => {
                function n(t) {
                  var n = r(t);
                  n.length !== e.length &&
                    Oe("Mismatched type converter count");
                  for (var o = 0; o < e.length; ++o) He(e[o], n[o]);
                }
                e.forEach(function (e) {
                  Me[e] = t;
                });
                var o = new Array(t.length),
                  i = [],
                  a = 0;
                t.forEach((e, t) => {
                  De.hasOwnProperty(e)
                    ? (o[t] = De[e])
                    : (i.push(e),
                      Be.hasOwnProperty(e) || (Be[e] = []),
                      Be[e].push(() => {
                        (o[t] = De[e]), ++a === i.length && n(o);
                      }));
                }),
                  0 === i.length && n(o);
              },
              je = {},
              Ue = (e) => {
                if (null === e) return "null";
                var t = typeof e;
                return "object" === t || "array" === t || "function" === t
                  ? e.toString()
                  : "" + e;
              },
              $e = (e) => {
                for (var t = "", r = e; A[r]; ) t += Le[A[r++]];
                return t;
              },
              qe = (e) => {
                throw new Re(e);
              };
            function He(e, t, r = {}) {
              if (!("argPackAdvance" in t))
                throw new TypeError(
                  "registerType registeredInstance requires argPackAdvance"
                );
              return (function (e, t, r = {}) {
                var n = t.name;
                if (
                  (e ||
                    qe(
                      `type "${n}" must have a positive integer typeid pointer`
                    ),
                  De.hasOwnProperty(e))
                ) {
                  if (r.ignoreDuplicateRegistrations) return;
                  qe(`Cannot register type '${n}' twice`);
                }
                if (((De[e] = t), delete Me[e], Be.hasOwnProperty(e))) {
                  var o = Be[e];
                  delete Be[e], o.forEach((e) => e());
                }
              })(e, t, r);
            }
            var Ne,
              Ve = (e, t, r) => {
                switch (t) {
                  case 1:
                    return r ? (e) => T[e >> 0] : (e) => A[e >> 0];
                  case 2:
                    return r ? (e) => P[e >> 1] : (e) => F[e >> 1];
                  case 4:
                    return r ? (e) => L[e >> 2] : (e) => R[e >> 2];
                  case 8:
                    return r ? (e) => D[e >> 3] : (e) => M[e >> 3];
                  default:
                    throw new TypeError(`invalid integer width (${t}): ${e}`);
                }
              },
              ze = 8,
              We = (e) => {
                qe(
                  e.$$.ptrType.registeredClass.name +
                    " instance already deleted"
                );
              },
              Ge = !1,
              Xe = (e) => {},
              Ye = (e) => {
                (e.count.value -= 1),
                  0 === e.count.value &&
                    ((e) => {
                      e.smartPtr
                        ? e.smartPtrType.rawDestructor(e.smartPtr)
                        : e.ptrType.registeredClass.rawDestructor(e.ptr);
                    })(e);
              },
              Ke = (e, t, r) => {
                if (t === r) return e;
                if (void 0 === r.baseClass) return null;
                var n = Ke(e, t, r.baseClass);
                return null === n ? null : r.downcast(n);
              },
              Ze = {},
              Qe = () => Object.keys(nt).length,
              Je = () => {
                var e = [];
                for (var t in nt) nt.hasOwnProperty(t) && e.push(nt[t]);
                return e;
              },
              et = [],
              tt = () => {
                for (; et.length; ) {
                  var e = et.pop();
                  (e.$$.deleteScheduled = !1), e.delete();
                }
              },
              rt = (e) => {
                (Ne = e), et.length && Ne && Ne(tt);
              },
              nt = {},
              ot = (e, t) => (
                (t = ((e, t) => {
                  for (
                    void 0 === t && qe("ptr should not be undefined");
                    e.baseClass;

                  )
                    (t = e.upcast(t)), (e = e.baseClass);
                  return t;
                })(e, t)),
                nt[t]
              ),
              it = (e, t) => (
                (t.ptrType && t.ptr) ||
                  Oe("makeClassHandle requires ptr and ptrType"),
                !!t.smartPtrType != !!t.smartPtr &&
                  Oe("Both smartPtrType and smartPtr must be specified"),
                (t.count = { value: 1 }),
                st(Object.create(e, { $$: { value: t, writable: !0 } }))
              );
            function at(e) {
              var t = this.getPointee(e);
              if (!t) return this.destructor(e), null;
              var r = ot(this.registeredClass, t);
              if (void 0 !== r) {
                if (0 === r.$$.count.value)
                  return (r.$$.ptr = t), (r.$$.smartPtr = e), r.clone();
                var n = r.clone();
                return this.destructor(e), n;
              }
              function o() {
                return this.isSmartPointer
                  ? it(this.registeredClass.instancePrototype, {
                      ptrType: this.pointeeType,
                      ptr: t,
                      smartPtrType: this,
                      smartPtr: e,
                    })
                  : it(this.registeredClass.instancePrototype, {
                      ptrType: this,
                      ptr: e,
                    });
              }
              var i,
                a = this.registeredClass.getActualType(t),
                s = Ze[a];
              if (!s) return o.call(this);
              i = this.isConst ? s.constPointerType : s.pointerType;
              var u = Ke(t, this.registeredClass, i.registeredClass);
              return null === u
                ? o.call(this)
                : this.isSmartPointer
                ? it(i.registeredClass.instancePrototype, {
                    ptrType: i,
                    ptr: u,
                    smartPtrType: this,
                    smartPtr: e,
                  })
                : it(i.registeredClass.instancePrototype, {
                    ptrType: i,
                    ptr: u,
                  });
            }
            var st = (e) =>
              "undefined" == typeof FinalizationRegistry
                ? ((st = (e) => e), e)
                : ((Ge = new FinalizationRegistry((e) => {
                    Ye(e.$$);
                  })),
                  (Xe = (e) => Ge.unregister(e)),
                  (st = (e) => {
                    var t = e.$$;
                    if (t.smartPtr) {
                      var r = { $$: t };
                      Ge.register(e, r, e);
                    }
                    return e;
                  })(e));
            function ut() {}
            var ct = (e, t) => Object.defineProperty(t, "name", { value: e }),
              lt = (e, t, r) => {
                if (void 0 === e[t].overloadTable) {
                  var n = e[t];
                  (e[t] = function () {
                    return (
                      e[t].overloadTable.hasOwnProperty(arguments.length) ||
                        qe(
                          `Function '${r}' called with an invalid number of arguments (${arguments.length}) - expects one of (${e[t].overloadTable})!`
                        ),
                      e[t].overloadTable[arguments.length].apply(
                        this,
                        arguments
                      )
                    );
                  }),
                    (e[t].overloadTable = []),
                    (e[t].overloadTable[n.argCount] = n);
                }
              },
              dt = (e, t, r) => {
                u.hasOwnProperty(e)
                  ? ((void 0 === r ||
                      (void 0 !== u[e].overloadTable &&
                        void 0 !== u[e].overloadTable[r])) &&
                      qe(`Cannot register public name '${e}' twice`),
                    lt(u, e, e),
                    u.hasOwnProperty(r) &&
                      qe(
                        `Cannot register multiple overloads of a function with the same number of arguments (${r})!`
                      ),
                    (u[e].overloadTable[r] = t))
                  : ((u[e] = t), void 0 !== r && (u[e].numArguments = r));
              };
            function ht(e, t, r, n, o, i, a, s) {
              (this.name = e),
                (this.constructor = t),
                (this.instancePrototype = r),
                (this.rawDestructor = n),
                (this.baseClass = o),
                (this.getActualType = i),
                (this.upcast = a),
                (this.downcast = s),
                (this.pureVirtualFunctions = []);
            }
            var ft = (e, t, r) => {
              for (; t !== r; )
                t.upcast ||
                  qe(
                    `Expected null or instance of ${r.name}, got an instance of ${t.name}`
                  ),
                  (e = t.upcast(e)),
                  (t = t.baseClass);
              return e;
            };
            function pt(e, t) {
              if (null === t)
                return (
                  this.isReference && qe(`null is not a valid ${this.name}`), 0
                );
              t.$$ || qe(`Cannot pass "${Ue(t)}" as a ${this.name}`),
                t.$$.ptr ||
                  qe(
                    `Cannot pass deleted object as a pointer of type ${this.name}`
                  );
              var r = t.$$.ptrType.registeredClass;
              return ft(t.$$.ptr, r, this.registeredClass);
            }
            function mt(e, t) {
              var r;
              if (null === t)
                return (
                  this.isReference && qe(`null is not a valid ${this.name}`),
                  this.isSmartPointer
                    ? ((r = this.rawConstructor()),
                      null !== e && e.push(this.rawDestructor, r),
                      r)
                    : 0
                );
              (t && t.$$) || qe(`Cannot pass "${Ue(t)}" as a ${this.name}`),
                t.$$.ptr ||
                  qe(
                    `Cannot pass deleted object as a pointer of type ${this.name}`
                  ),
                !this.isConst &&
                  t.$$.ptrType.isConst &&
                  qe(
                    `Cannot convert argument of type ${
                      t.$$.smartPtrType
                        ? t.$$.smartPtrType.name
                        : t.$$.ptrType.name
                    } to parameter type ${this.name}`
                  );
              var n = t.$$.ptrType.registeredClass;
              if (
                ((r = ft(t.$$.ptr, n, this.registeredClass)),
                this.isSmartPointer)
              )
                switch (
                  (void 0 === t.$$.smartPtr &&
                    qe("Passing raw pointer to smart pointer is illegal"),
                  this.sharingPolicy)
                ) {
                  case 0:
                    t.$$.smartPtrType === this
                      ? (r = t.$$.smartPtr)
                      : qe(
                          `Cannot convert argument of type ${
                            t.$$.smartPtrType
                              ? t.$$.smartPtrType.name
                              : t.$$.ptrType.name
                          } to parameter type ${this.name}`
                        );
                    break;
                  case 1:
                    r = t.$$.smartPtr;
                    break;
                  case 2:
                    if (t.$$.smartPtrType === this) r = t.$$.smartPtr;
                    else {
                      var o = t.clone();
                      (r = this.rawShare(
                        r,
                        Mt.toHandle(() => o.delete())
                      )),
                        null !== e && e.push(this.rawDestructor, r);
                    }
                    break;
                  default:
                    qe("Unsupporting sharing policy");
                }
              return r;
            }
            function gt(e, t) {
              if (null === t)
                return (
                  this.isReference && qe(`null is not a valid ${this.name}`), 0
                );
              t.$$ || qe(`Cannot pass "${Ue(t)}" as a ${this.name}`),
                t.$$.ptr ||
                  qe(
                    `Cannot pass deleted object as a pointer of type ${this.name}`
                  ),
                t.$$.ptrType.isConst &&
                  qe(
                    `Cannot convert argument of type ${t.$$.ptrType.name} to parameter type ${this.name}`
                  );
              var r = t.$$.ptrType.registeredClass;
              return ft(t.$$.ptr, r, this.registeredClass);
            }
            function vt(e) {
              return this.fromWireType(R[e >> 2]);
            }
            function yt(e, t, r, n, o, i, a, s, u, c, l) {
              (this.name = e),
                (this.registeredClass = t),
                (this.isReference = r),
                (this.isConst = n),
                (this.isSmartPointer = o),
                (this.pointeeType = i),
                (this.sharingPolicy = a),
                (this.rawGetPointee = s),
                (this.rawConstructor = u),
                (this.rawShare = c),
                (this.rawDestructor = l),
                o || void 0 !== t.baseClass
                  ? (this.toWireType = mt)
                  : n
                  ? ((this.toWireType = pt), (this.destructorFunction = null))
                  : ((this.toWireType = gt), (this.destructorFunction = null));
            }
            var bt,
              _t,
              Et = (e, t, r) => {
                u.hasOwnProperty(e) ||
                  Oe("Replacing nonexistant public symbol"),
                  void 0 !== u[e].overloadTable && void 0 !== r
                    ? (u[e].overloadTable[r] = t)
                    : ((u[e] = t), (u[e].argCount = r));
              },
              Ct = [],
              St = (e) => {
                var t = Ct[e];
                return (
                  t ||
                    (e >= Ct.length && (Ct.length = e + 1),
                    (Ct[e] = t = bt.get(e))),
                  t
                );
              },
              kt = (e, t) => {
                e = $e(e);
                var r = St(t);
                return (
                  "function" != typeof r &&
                    qe(`unknown function pointer with signature ${e}: ${t}`),
                  r
                );
              },
              xt = (e) => {
                var t = Mu(e),
                  r = $e(t);
                return Lu(t), r;
              },
              Tt = (e, t) => {
                var r = [],
                  n = {};
                throw (
                  (t.forEach(function e(t) {
                    n[t] ||
                      De[t] ||
                      (Me[t] ? Me[t].forEach(e) : (r.push(t), (n[t] = !0)));
                  }),
                  new _t(`${e}: ` + r.map(xt).join([", "])))
                );
              },
              At = (e, t) => {
                for (var r = [], n = 0; n < e; n++) r.push(R[(t + 4 * n) >> 2]);
                return r;
              };
            function Pt(e, t, r, n, o, i) {
              var a = t.length;
              a < 2 &&
                qe(
                  "argTypes array size mismatch! Must at least get return value and 'this' types!"
                );
              var s = null !== t[1] && null !== r,
                u = (function (e) {
                  for (var t = 1; t < e.length; ++t)
                    if (null !== e[t] && void 0 === e[t].destructorFunction)
                      return !0;
                  return !1;
                })(t),
                c = "void" !== t[0].name,
                l = a - 2,
                d = new Array(l),
                h = [],
                f = [];
              return ct(e, function () {
                var r;
                arguments.length !== l &&
                  qe(
                    `function ${e} called with ${arguments.length} arguments, expected ${l}`
                  ),
                  (f.length = 0),
                  (h.length = s ? 2 : 1),
                  (h[0] = o),
                  s && ((r = t[1].toWireType(f, this)), (h[1] = r));
                for (var i = 0; i < l; ++i)
                  (d[i] = t[i + 2].toWireType(f, arguments[i])), h.push(d[i]);
                return (function (e) {
                  if (u) Ae(f);
                  else
                    for (var n = s ? 1 : 2; n < t.length; n++) {
                      var o = 1 === n ? r : d[n - 2];
                      null !== t[n].destructorFunction &&
                        t[n].destructorFunction(o);
                    }
                  if (c) return t[0].fromWireType(e);
                })(n.apply(null, h));
              });
            }
            var Ft,
              Lt = (e) => {
                const t = (e = e.trim()).indexOf("(");
                return -1 !== t ? e.substr(0, t) : e;
              },
              Rt = new (class HandleAllocator {
                constructor() {
                  (this.allocated = [void 0]), (this.freelist = []);
                }
                get(e) {
                  return this.allocated[e];
                }
                has(e) {
                  return void 0 !== this.allocated[e];
                }
                allocate(e) {
                  var t = this.freelist.pop() || this.allocated.length;
                  return (this.allocated[t] = e), t;
                }
                free(e) {
                  (this.allocated[e] = void 0), this.freelist.push(e);
                }
              })(),
              Bt = (e) => {
                e >= Rt.reserved && 0 == --Rt.get(e).refcount && Rt.free(e);
              },
              Dt = () => {
                for (var e = 0, t = Rt.reserved; t < Rt.allocated.length; ++t)
                  void 0 !== Rt.allocated[t] && ++e;
                return e;
              },
              Mt = {
                toValue: (e) => (
                  e || qe("Cannot use deleted val. handle = " + e),
                  Rt.get(e).value
                ),
                toHandle: (e) => {
                  switch (e) {
                    case void 0:
                      return 1;
                    case null:
                      return 2;
                    case !0:
                      return 3;
                    case !1:
                      return 4;
                    default:
                      return Rt.allocate({ refcount: 1, value: e });
                  }
                },
              },
              Ot = {
                name: "emscripten::val",
                fromWireType: (e) => {
                  var t = Mt.toValue(e);
                  return Bt(e), t;
                },
                toWireType: (e, t) => Mt.toHandle(t),
                argPackAdvance: ze,
                readValueFromPointer: Pe,
                destructorFunction: null,
              },
              It = (e, t, r) => {
                switch (t) {
                  case 1:
                    return r
                      ? function (e) {
                          return this.fromWireType(T[e >> 0]);
                        }
                      : function (e) {
                          return this.fromWireType(A[e >> 0]);
                        };
                  case 2:
                    return r
                      ? function (e) {
                          return this.fromWireType(P[e >> 1]);
                        }
                      : function (e) {
                          return this.fromWireType(F[e >> 1]);
                        };
                  case 4:
                    return r
                      ? function (e) {
                          return this.fromWireType(L[e >> 2]);
                        }
                      : function (e) {
                          return this.fromWireType(R[e >> 2]);
                        };
                  default:
                    throw new TypeError(`invalid integer width (${t}): ${e}`);
                }
              },
              jt = (e, t) => {
                var r = De[e];
                return void 0 === r && qe(t + " has unknown type " + xt(e)), r;
              },
              Ut = (e, t) => {
                switch (t) {
                  case 4:
                    return function (e) {
                      return this.fromWireType(B[e >> 2]);
                    };
                  case 8:
                    return function (e) {
                      return this.fromWireType(O[e >> 3]);
                    };
                  default:
                    throw new TypeError(`invalid float width (${t}): ${e}`);
                }
              },
              $t = (e, t, r) => ve(e, A, t, r),
              qt =
                "undefined" != typeof TextDecoder
                  ? new TextDecoder("utf-16le")
                  : void 0,
              Ht = (e, t) => {
                for (var r = e, n = r >> 1, o = n + t / 2; !(n >= o) && F[n]; )
                  ++n;
                if ((r = n << 1) - e > 32 && qt)
                  return qt.decode(A.subarray(e, r));
                for (var i = "", a = 0; !(a >= t / 2); ++a) {
                  var s = P[(e + 2 * a) >> 1];
                  if (0 == s) break;
                  i += String.fromCharCode(s);
                }
                return i;
              },
              Nt = (e, t, r) => {
                if (((r ??= 2147483647), r < 2)) return 0;
                for (
                  var n = t,
                    o = (r -= 2) < 2 * e.length ? r / 2 : e.length,
                    i = 0;
                  i < o;
                  ++i
                ) {
                  var a = e.charCodeAt(i);
                  (P[t >> 1] = a), (t += 2);
                }
                return (P[t >> 1] = 0), t - n;
              },
              Vt = (e) => 2 * e.length,
              zt = (e, t) => {
                for (var r = 0, n = ""; !(r >= t / 4); ) {
                  var o = L[(e + 4 * r) >> 2];
                  if (0 == o) break;
                  if ((++r, o >= 65536)) {
                    var i = o - 65536;
                    n += String.fromCharCode(
                      55296 | (i >> 10),
                      56320 | (1023 & i)
                    );
                  } else n += String.fromCharCode(o);
                }
                return n;
              },
              Wt = (e, t, r) => {
                if (((r ??= 2147483647), r < 4)) return 0;
                for (var n = t, o = n + r - 4, i = 0; i < e.length; ++i) {
                  var a = e.charCodeAt(i);
                  if (
                    (a >= 55296 &&
                      a <= 57343 &&
                      (a =
                        (65536 + ((1023 & a) << 10)) |
                        (1023 & e.charCodeAt(++i))),
                    (L[t >> 2] = a),
                    (t += 4) + 4 > o)
                  )
                    break;
                }
                return (L[t >> 2] = 0), t - n;
              },
              Gt = (e) => {
                for (var t = 0, r = 0; r < e.length; ++r) {
                  var n = e.charCodeAt(r);
                  n >= 55296 && n <= 57343 && ++r, (t += 4);
                }
                return t;
              },
              Xt = (e, t, r) => {
                var n = [],
                  o = e.toWireType(n, r);
                return n.length && (R[t >> 2] = Mt.toHandle(n)), o;
              },
              Yt = [],
              Kt = {},
              Zt = (e) => {
                var t = Kt[e];
                return void 0 === t ? $e(e) : t;
              },
              Qt = () => {
                if ("object" == typeof globalThis) return globalThis;
                function e(e) {
                  e.$$$embind_global$$$ = e;
                  var t =
                    "object" == typeof $$$embind_global$$$ &&
                    e.$$$embind_global$$$ == e;
                  return t || delete e.$$$embind_global$$$, t;
                }
                if ("object" == typeof $$$embind_global$$$)
                  return $$$embind_global$$$;
                if (
                  ("object" == typeof global && e(global)
                    ? ($$$embind_global$$$ = global)
                    : "object" == typeof self &&
                      e(self) &&
                      ($$$embind_global$$$ = self),
                  "object" == typeof $$$embind_global$$$)
                )
                  return $$$embind_global$$$;
                throw Error("unable to get global object.");
              },
              Jt = Reflect.construct,
              er = (e) =>
                e < -9007199254740992 || e > 9007199254740992 ? NaN : Number(e),
              tr = (e) => e % 4 == 0 && (e % 100 != 0 || e % 400 == 0),
              rr = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335],
              nr = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
              or = (e) =>
                (tr(e.getFullYear()) ? rr : nr)[e.getMonth()] + e.getDate() - 1,
              ir = (e) => {
                var t = ge(e) + 1,
                  r = Pu(t);
                return r && $t(e, r, t), r;
              },
              ar = (e, t) => {
                if (
                  ((fr.mainLoop.timingMode = e),
                  (fr.mainLoop.timingValue = t),
                  !fr.mainLoop.func)
                )
                  return 1;
                if ((fr.mainLoop.running || (fr.mainLoop.running = !0), 0 == e))
                  (fr.mainLoop.scheduler = function () {
                    var e =
                      0 | Math.max(0, fr.mainLoop.tickStartTime + t - Ft());
                    setTimeout(fr.mainLoop.runner, e);
                  }),
                    (fr.mainLoop.method = "timeout");
                else if (1 == e)
                  (fr.mainLoop.scheduler = function () {
                    fr.requestAnimationFrame(fr.mainLoop.runner);
                  }),
                    (fr.mainLoop.method = "rAF");
                else if (2 == e) {
                  if (void 0 === fr.setImmediate)
                    if ("undefined" == typeof setImmediate) {
                      var r = [],
                        n = "setimmediate";
                      addEventListener(
                        "message",
                        (e) => {
                          (e.data !== n && e.data.target !== n) ||
                            (e.stopPropagation(), r.shift()());
                        },
                        !0
                      ),
                        (fr.setImmediate = function (e) {
                          r.push(e),
                            v
                              ? (void 0 === u.setImmediates &&
                                  (u.setImmediates = []),
                                u.setImmediates.push(e),
                                postMessage({ target: n }))
                              : postMessage(n, "*");
                        });
                    } else fr.setImmediate = setImmediate;
                  (fr.mainLoop.scheduler = function () {
                    fr.setImmediate(fr.mainLoop.runner);
                  }),
                    (fr.mainLoop.method = "immediate");
                }
                return 0;
              };
            Ft = () => performance.now();
            var sr = (e) => {
                if (e instanceof oe || "unwind" == e) return x;
                m(1, e);
              },
              ur = () => ae || !1,
              cr = (e, t) => {
                var r;
                (x = e),
                  (x = r = e),
                  ur() || (u.onExit?.(r), (I = !0)),
                  m(r, new oe(r));
              },
              lr = cr,
              dr = (e) => {
                if (!I)
                  try {
                    e(),
                      (() => {
                        if (!ur())
                          try {
                            lr(x);
                          } catch (e) {
                            sr(e);
                          }
                      })();
                  } catch (e) {
                    sr(e);
                  }
              },
              hr = (e, t) =>
                setTimeout(() => {
                  dr(e);
                }, t),
              fr = {
                mainLoop: {
                  running: !1,
                  scheduler: null,
                  method: "",
                  currentlyRunningMainloop: 0,
                  func: null,
                  arg: 0,
                  timingMode: 0,
                  timingValue: 0,
                  currentFrameNumber: 0,
                  queue: [],
                  pause() {
                    (fr.mainLoop.scheduler = null),
                      fr.mainLoop.currentlyRunningMainloop++;
                  },
                  resume() {
                    fr.mainLoop.currentlyRunningMainloop++;
                    var e = fr.mainLoop.timingMode,
                      t = fr.mainLoop.timingValue,
                      r = fr.mainLoop.func;
                    (fr.mainLoop.func = null),
                      ((e, t, r, n, o) => {
                        j(
                          !fr.mainLoop.func,
                          "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters."
                        ),
                          (fr.mainLoop.func = e),
                          (fr.mainLoop.arg = n);
                        var i = fr.mainLoop.currentlyRunningMainloop;
                        function a() {
                          return !(i < fr.mainLoop.currentlyRunningMainloop);
                        }
                        if (
                          ((fr.mainLoop.running = !1),
                          (fr.mainLoop.runner = function () {
                            if (!I)
                              if (fr.mainLoop.queue.length > 0) {
                                Date.now();
                                var t = fr.mainLoop.queue.shift();
                                if (
                                  (t.func(t.arg), fr.mainLoop.remainingBlockers)
                                ) {
                                  var r = fr.mainLoop.remainingBlockers,
                                    n = r % 1 == 0 ? r - 1 : Math.floor(r);
                                  t.counted
                                    ? (fr.mainLoop.remainingBlockers = n)
                                    : ((n += 0.5),
                                      (fr.mainLoop.remainingBlockers =
                                        (8 * r + n) / 9));
                                }
                                if ((fr.mainLoop.updateStatus(), !a())) return;
                                setTimeout(fr.mainLoop.runner, 0);
                              } else
                                a() &&
                                  ((fr.mainLoop.currentFrameNumber =
                                    (fr.mainLoop.currentFrameNumber + 1) | 0),
                                  1 == fr.mainLoop.timingMode &&
                                  fr.mainLoop.timingValue > 1 &&
                                  fr.mainLoop.currentFrameNumber %
                                    fr.mainLoop.timingValue !=
                                    0
                                    ? fr.mainLoop.scheduler()
                                    : (0 == fr.mainLoop.timingMode &&
                                        (fr.mainLoop.tickStartTime = Ft()),
                                      fr.mainLoop.runIter(e),
                                      a() &&
                                        ("object" == typeof SDL &&
                                          SDL.audio?.queueNewAudioData?.(),
                                        fr.mainLoop.scheduler())));
                          }),
                          o ||
                            (t && t > 0 ? ar(0, 1e3 / t) : ar(1, 1),
                            fr.mainLoop.scheduler()),
                          r)
                        )
                          throw "unwind";
                      })(r, 0, !1, fr.mainLoop.arg, !0),
                      ar(e, t),
                      fr.mainLoop.scheduler();
                  },
                  updateStatus() {
                    if (u.setStatus) {
                      var e = u.statusMessage || "Please wait...",
                        t = fr.mainLoop.remainingBlockers,
                        r = fr.mainLoop.expectedBlockers;
                      t
                        ? t < r
                          ? u.setStatus(e + " (" + (r - t) + "/" + r + ")")
                          : u.setStatus(e)
                        : u.setStatus("");
                    }
                  },
                  runIter(e) {
                    if (!I) {
                      if (u.preMainLoop && !1 === u.preMainLoop()) return;
                      dr(e), u.postMainLoop?.();
                    }
                  },
                },
                isFullscreen: !1,
                pointerLock: !1,
                moduleContextCreatedCallbacks: [],
                workers: [],
                init() {
                  if (!fr.initted) {
                    fr.initted = !0;
                    var e = {
                      canHandle: function (e) {
                        return (
                          !u.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(e)
                        );
                      },
                      handle: function (e, t, r, n) {
                        var o = new Blob([e], { type: fr.getMimetype(t) });
                        o.size !== e.length &&
                          (o = new Blob([new Uint8Array(e).buffer], {
                            type: fr.getMimetype(t),
                          }));
                        var i = URL.createObjectURL(o),
                          a = new Image();
                        (a.onload = () => {
                          j(a.complete, `Image ${t} could not be decoded`);
                          var n = document.createElement("canvas");
                          (n.width = a.width),
                            (n.height = a.height),
                            n.getContext("2d").drawImage(a, 0, 0),
                            (_u[t] = n),
                            URL.revokeObjectURL(i),
                            r?.(e);
                        }),
                          (a.onerror = (e) => {
                            k(`Image ${i} could not be decoded`), n?.();
                          }),
                          (a.src = i);
                      },
                    };
                    Ee.push(e);
                    var t = {
                      canHandle: function (e) {
                        return (
                          !u.noAudioDecoding &&
                          e.substr(-4) in { ".ogg": 1, ".wav": 1, ".mp3": 1 }
                        );
                      },
                      handle: function (e, t, r, n) {
                        var o = !1;
                        function i(n) {
                          o || ((o = !0), (Eu[t] = n), r?.(e));
                        }
                        var a = new Blob([e], { type: fr.getMimetype(t) }),
                          s = URL.createObjectURL(a),
                          u = new Audio();
                        u.addEventListener("canplaythrough", () => i(u), !1),
                          (u.onerror = function (r) {
                            o ||
                              (k(
                                `warning: browser could not fully decode audio ${t}, trying slower base64 approach`
                              ),
                              (u.src =
                                "data:audio/x-" +
                                t.substr(-3) +
                                ";base64," +
                                (function (e) {
                                  for (
                                    var t =
                                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                                      r = "",
                                      n = 0,
                                      o = 0,
                                      i = 0;
                                    i < e.length;
                                    i++
                                  )
                                    for (
                                      n = (n << 8) | e[i], o += 8;
                                      o >= 6;

                                    ) {
                                      var a = (n >> (o - 6)) & 63;
                                      (o -= 6), (r += t[a]);
                                    }
                                  return (
                                    2 == o
                                      ? ((r += t[(3 & n) << 4]), (r += "=="))
                                      : 4 == o &&
                                        ((r += t[(15 & n) << 2]), (r += "=")),
                                    r
                                  );
                                })(e)),
                              i(u));
                          }),
                          (u.src = s),
                          hr(() => {
                            i(u);
                          }, 1e4);
                      },
                    };
                    Ee.push(t);
                    var r = u.canvas;
                    r &&
                      ((r.requestPointerLock =
                        r.requestPointerLock ||
                        r.mozRequestPointerLock ||
                        r.webkitRequestPointerLock ||
                        r.msRequestPointerLock ||
                        (() => {})),
                      (r.exitPointerLock =
                        document.exitPointerLock ||
                        document.mozExitPointerLock ||
                        document.webkitExitPointerLock ||
                        document.msExitPointerLock ||
                        (() => {})),
                      (r.exitPointerLock = r.exitPointerLock.bind(document)),
                      document.addEventListener("pointerlockchange", n, !1),
                      document.addEventListener("mozpointerlockchange", n, !1),
                      document.addEventListener(
                        "webkitpointerlockchange",
                        n,
                        !1
                      ),
                      document.addEventListener("mspointerlockchange", n, !1),
                      u.elementPointerLock &&
                        r.addEventListener(
                          "click",
                          (e) => {
                            !fr.pointerLock &&
                              u.canvas.requestPointerLock &&
                              (u.canvas.requestPointerLock(),
                              e.preventDefault());
                          },
                          !1
                        ));
                  }
                  function n() {
                    fr.pointerLock =
                      document.pointerLockElement === u.canvas ||
                      document.mozPointerLockElement === u.canvas ||
                      document.webkitPointerLockElement === u.canvas ||
                      document.msPointerLockElement === u.canvas;
                  }
                },
                createContext(e, t, r, n) {
                  if (t && u.ctx && e == u.canvas) return u.ctx;
                  var o, i;
                  if (t) {
                    var a = {
                      antialias: !1,
                      alpha: !1,
                      majorVersion:
                        "undefined" != typeof WebGL2RenderingContext ? 2 : 1,
                    };
                    if (n) for (var s in n) a[s] = n[s];
                    void 0 !== mr &&
                      (i = mr.createContext(e, a)) &&
                      (o = mr.getContext(i).GLctx);
                  } else o = e.getContext("2d");
                  return o
                    ? (r &&
                        (t ||
                          j(
                            void 0 === wu,
                            "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"
                          ),
                        (u.ctx = o),
                        t && mr.makeContextCurrent(i),
                        (u.useWebGL = t),
                        fr.moduleContextCreatedCallbacks.forEach((e) => e()),
                        fr.init()),
                      o)
                    : null;
                },
                destroyContext(e, t, r) {},
                fullscreenHandlersInstalled: !1,
                lockPointer: void 0,
                resizeCanvas: void 0,
                requestFullscreen(e, t) {
                  (fr.lockPointer = e),
                    (fr.resizeCanvas = t),
                    void 0 === fr.lockPointer && (fr.lockPointer = !0),
                    void 0 === fr.resizeCanvas && (fr.resizeCanvas = !1);
                  var r = u.canvas;
                  function n() {
                    fr.isFullscreen = !1;
                    var e = r.parentNode;
                    (document.fullscreenElement ||
                      document.mozFullScreenElement ||
                      document.msFullscreenElement ||
                      document.webkitFullscreenElement ||
                      document.webkitCurrentFullScreenElement) === e
                      ? ((r.exitFullscreen = fr.exitFullscreen),
                        fr.lockPointer && r.requestPointerLock(),
                        (fr.isFullscreen = !0),
                        fr.resizeCanvas
                          ? fr.setFullscreenCanvasSize()
                          : fr.updateCanvasDimensions(r))
                      : (e.parentNode.insertBefore(r, e),
                        e.parentNode.removeChild(e),
                        fr.resizeCanvas
                          ? fr.setWindowedCanvasSize()
                          : fr.updateCanvasDimensions(r)),
                      u.onFullScreen?.(fr.isFullscreen),
                      u.onFullscreen?.(fr.isFullscreen);
                  }
                  fr.fullscreenHandlersInstalled ||
                    ((fr.fullscreenHandlersInstalled = !0),
                    document.addEventListener("fullscreenchange", n, !1),
                    document.addEventListener("mozfullscreenchange", n, !1),
                    document.addEventListener("webkitfullscreenchange", n, !1),
                    document.addEventListener("MSFullscreenChange", n, !1));
                  var o = document.createElement("div");
                  r.parentNode.insertBefore(o, r),
                    o.appendChild(r),
                    (o.requestFullscreen =
                      o.requestFullscreen ||
                      o.mozRequestFullScreen ||
                      o.msRequestFullscreen ||
                      (o.webkitRequestFullscreen
                        ? () =>
                            o.webkitRequestFullscreen(
                              Element.ALLOW_KEYBOARD_INPUT
                            )
                        : null) ||
                      (o.webkitRequestFullScreen
                        ? () =>
                            o.webkitRequestFullScreen(
                              Element.ALLOW_KEYBOARD_INPUT
                            )
                        : null)),
                    o.requestFullscreen();
                },
                exitFullscreen: () =>
                  !!fr.isFullscreen &&
                  ((
                    document.exitFullscreen ||
                    document.cancelFullScreen ||
                    document.mozCancelFullScreen ||
                    document.msExitFullscreen ||
                    document.webkitCancelFullScreen ||
                    (() => {})
                  ).apply(document, []),
                  !0),
                nextRAF: 0,
                fakeRequestAnimationFrame(e) {
                  var t = Date.now();
                  if (0 === fr.nextRAF) fr.nextRAF = t + 1e3 / 60;
                  else for (; t + 2 >= fr.nextRAF; ) fr.nextRAF += 1e3 / 60;
                  var r = Math.max(fr.nextRAF - t, 0);
                  setTimeout(e, r);
                },
                requestAnimationFrame(e) {
                  "function" != typeof requestAnimationFrame
                    ? (0, fr.fakeRequestAnimationFrame)(e)
                    : requestAnimationFrame(e);
                },
                safeSetTimeout: (e, t) => hr(e, t),
                safeRequestAnimationFrame: (e) =>
                  fr.requestAnimationFrame(() => {
                    dr(e);
                  }),
                getMimetype: (e) =>
                  ({
                    jpg: "image/jpeg",
                    jpeg: "image/jpeg",
                    png: "image/png",
                    bmp: "image/bmp",
                    ogg: "audio/ogg",
                    wav: "audio/wav",
                    mp3: "audio/mpeg",
                  }[e.substr(e.lastIndexOf(".") + 1)]),
                getUserMedia(e) {
                  (window.getUserMedia ||=
                    navigator.getUserMedia || navigator.mozGetUserMedia),
                    window.getUserMedia(e);
                },
                getMovementX: (e) =>
                  e.movementX || e.mozMovementX || e.webkitMovementX || 0,
                getMovementY: (e) =>
                  e.movementY || e.mozMovementY || e.webkitMovementY || 0,
                getMouseWheelDelta(e) {
                  var t = 0;
                  switch (e.type) {
                    case "DOMMouseScroll":
                      t = e.detail / 3;
                      break;
                    case "mousewheel":
                      t = e.wheelDelta / 120;
                      break;
                    case "wheel":
                      switch (((t = e.deltaY), e.deltaMode)) {
                        case 0:
                          t /= 100;
                          break;
                        case 1:
                          t /= 3;
                          break;
                        case 2:
                          t *= 80;
                          break;
                        default:
                          throw (
                            "unrecognized mouse wheel delta mode: " +
                            e.deltaMode
                          );
                      }
                      break;
                    default:
                      throw "unrecognized mouse wheel event: " + e.type;
                  }
                  return t;
                },
                mouseX: 0,
                mouseY: 0,
                mouseMovementX: 0,
                mouseMovementY: 0,
                touches: {},
                lastTouches: {},
                calculateMouseCoords(e, t) {
                  var r = u.canvas.getBoundingClientRect(),
                    n = u.canvas.width,
                    o = u.canvas.height,
                    i =
                      void 0 !== window.scrollX
                        ? window.scrollX
                        : window.pageXOffset,
                    a =
                      void 0 !== window.scrollY
                        ? window.scrollY
                        : window.pageYOffset,
                    s = e - (i + r.left),
                    c = t - (a + r.top);
                  return { x: (s *= n / r.width), y: (c *= o / r.height) };
                },
                setMouseCoords(e, t) {
                  const { x: r, y: n } = fr.calculateMouseCoords(e, t);
                  (fr.mouseMovementX = r - fr.mouseX),
                    (fr.mouseMovementY = n - fr.mouseY),
                    (fr.mouseX = r),
                    (fr.mouseY = n);
                },
                calculateMouseEvent(e) {
                  if (fr.pointerLock)
                    "mousemove" != e.type && "mozMovementX" in e
                      ? (fr.mouseMovementX = fr.mouseMovementY = 0)
                      : ((fr.mouseMovementX = fr.getMovementX(e)),
                        (fr.mouseMovementY = fr.getMovementY(e))),
                      "undefined" != typeof SDL
                        ? ((fr.mouseX = SDL.mouseX + fr.mouseMovementX),
                          (fr.mouseY = SDL.mouseY + fr.mouseMovementY))
                        : ((fr.mouseX += fr.mouseMovementX),
                          (fr.mouseY += fr.mouseMovementY));
                  else {
                    if (
                      "touchstart" === e.type ||
                      "touchend" === e.type ||
                      "touchmove" === e.type
                    ) {
                      var t = e.touch;
                      if (void 0 === t) return;
                      var r = fr.calculateMouseCoords(t.pageX, t.pageY);
                      if ("touchstart" === e.type)
                        (fr.lastTouches[t.identifier] = r),
                          (fr.touches[t.identifier] = r);
                      else if (
                        "touchend" === e.type ||
                        "touchmove" === e.type
                      ) {
                        var n = fr.touches[t.identifier];
                        (n ||= r),
                          (fr.lastTouches[t.identifier] = n),
                          (fr.touches[t.identifier] = r);
                      }
                      return;
                    }
                    fr.setMouseCoords(e.pageX, e.pageY);
                  }
                },
                resizeListeners: [],
                updateResizeListeners() {
                  var e = u.canvas;
                  fr.resizeListeners.forEach((t) => t(e.width, e.height));
                },
                setCanvasSize(e, t, r) {
                  var n = u.canvas;
                  fr.updateCanvasDimensions(n, e, t),
                    r || fr.updateResizeListeners();
                },
                windowedWidth: 0,
                windowedHeight: 0,
                setFullscreenCanvasSize() {
                  if ("undefined" != typeof SDL) {
                    var e = R[SDL.screen >> 2];
                    (e |= 8388608), (L[SDL.screen >> 2] = e);
                  }
                  fr.updateCanvasDimensions(u.canvas),
                    fr.updateResizeListeners();
                },
                setWindowedCanvasSize() {
                  if ("undefined" != typeof SDL) {
                    var e = R[SDL.screen >> 2];
                    (e &= -8388609), (L[SDL.screen >> 2] = e);
                  }
                  fr.updateCanvasDimensions(u.canvas),
                    fr.updateResizeListeners();
                },
                updateCanvasDimensions(e, t, r) {
                  t && r
                    ? ((e.widthNative = t), (e.heightNative = r))
                    : ((t = e.widthNative), (r = e.heightNative));
                  var n = t,
                    o = r;
                  if (
                    (u.forcedAspectRatio &&
                      u.forcedAspectRatio > 0 &&
                      (n / o < u.forcedAspectRatio
                        ? (n = Math.round(o * u.forcedAspectRatio))
                        : (o = Math.round(n / u.forcedAspectRatio))),
                    (document.fullscreenElement ||
                      document.mozFullScreenElement ||
                      document.msFullscreenElement ||
                      document.webkitFullscreenElement ||
                      document.webkitCurrentFullScreenElement) ===
                      e.parentNode && "undefined" != typeof screen)
                  ) {
                    var i = Math.min(screen.width / n, screen.height / o);
                    (n = Math.round(n * i)), (o = Math.round(o * i));
                  }
                  fr.resizeCanvas
                    ? (e.width != n && (e.width = n),
                      e.height != o && (e.height = o),
                      void 0 !== e.style &&
                        (e.style.removeProperty("width"),
                        e.style.removeProperty("height")))
                    : (e.width != t && (e.width = t),
                      e.height != r && (e.height = r),
                      void 0 !== e.style &&
                        (n != t || o != r
                          ? (e.style.setProperty(
                              "width",
                              n + "px",
                              "important"
                            ),
                            e.style.setProperty(
                              "height",
                              o + "px",
                              "important"
                            ))
                          : (e.style.removeProperty("width"),
                            e.style.removeProperty("height"))));
                },
              },
              pr = {
                errorCode: 12288,
                defaultDisplayInitialized: !1,
                currentContext: 0,
                currentReadSurface: 0,
                currentDrawSurface: 0,
                contextAttributes: {
                  alpha: !1,
                  depth: !1,
                  stencil: !1,
                  antialias: !1,
                },
                stringCache: {},
                setErrorCode(e) {
                  pr.errorCode = e;
                },
                chooseConfig(e, t, r, n, o) {
                  if (62e3 != e) return pr.setErrorCode(12296), 0;
                  if (t)
                    for (;;) {
                      var i = L[t >> 2];
                      if (12321 == i) {
                        var a = L[(t + 4) >> 2];
                        pr.contextAttributes.alpha = a > 0;
                      } else if (12325 == i) {
                        var s = L[(t + 4) >> 2];
                        pr.contextAttributes.depth = s > 0;
                      } else if (12326 == i) {
                        var u = L[(t + 4) >> 2];
                        pr.contextAttributes.stencil = u > 0;
                      } else if (12337 == i) {
                        var c = L[(t + 4) >> 2];
                        pr.contextAttributes.antialias = c > 0;
                      } else if (12338 == i)
                        (c = L[(t + 4) >> 2]),
                          (pr.contextAttributes.antialias = 1 == c);
                      else if (12544 == i) {
                        var l = L[(t + 4) >> 2];
                        pr.contextAttributes.lowLatency = 12547 != l;
                      } else if (12344 == i) break;
                      t += 8;
                    }
                  return (r && n) || o
                    ? (o && (L[o >> 2] = 1),
                      r && n > 0 && (R[r >> 2] = 62002),
                      pr.setErrorCode(12288),
                      1)
                    : (pr.setErrorCode(12300), 0);
                },
              },
              mr = {
                counter: 1,
                buffers: [],
                programs: [],
                framebuffers: [],
                renderbuffers: [],
                textures: [],
                shaders: [],
                vaos: [],
                contexts: [],
                offscreenCanvases: {},
                queries: [],
                samplers: [],
                transformFeedbacks: [],
                syncs: [],
                stringCache: {},
                stringiCache: {},
                unpackAlignment: 4,
                recordError: function (e) {
                  mr.lastError || (mr.lastError = e);
                },
                getNewId: (e) => {
                  for (var t = mr.counter++, r = e.length; r < t; r++)
                    e[r] = null;
                  return t;
                },
                getSource: (e, t, r, n) => {
                  for (var o = "", i = 0; i < t; ++i) {
                    var a = n ? R[(n + 4 * i) >> 2] : void 0;
                    o += ke(R[(r + 4 * i) >> 2], a);
                  }
                  return o;
                },
                createContext: (e, t) => {
                  if (!e.getContextSafariWebGL2Fixed) {
                    let t = function (t, r) {
                      var n = e.getContextSafariWebGL2Fixed(t, r);
                      return ("webgl" == t) ==
                        n instanceof WebGLRenderingContext
                        ? n
                        : null;
                    };
                    (e.getContextSafariWebGL2Fixed = e.getContext),
                      (e.getContext = t);
                  }
                  var r =
                    t.majorVersion > 1
                      ? e.getContext("webgl2", t)
                      : e.getContext("webgl", t);
                  return r ? mr.registerContext(r, t) : 0;
                },
                registerContext: (e, t) => {
                  var r = mr.getNewId(mr.contexts),
                    n = {
                      handle: r,
                      attributes: t,
                      version: t.majorVersion,
                      GLctx: e,
                    };
                  return (
                    e.canvas && (e.canvas.GLctxObject = n),
                    (mr.contexts[r] = n),
                    r
                  );
                },
                makeContextCurrent: (e) => (
                  (mr.currentContext = mr.contexts[e]),
                  (u.ctx = wu = mr.currentContext?.GLctx),
                  !(e && !wu)
                ),
                getContext: (e) => mr.contexts[e],
                deleteContext: (e) => {
                  mr.currentContext === mr.contexts[e] &&
                    (mr.currentContext = null),
                    "object" == typeof ou &&
                      ou.removeAllHandlersOnTarget(mr.contexts[e].GLctx.canvas),
                    mr.contexts[e] &&
                      mr.contexts[e].GLctx.canvas &&
                      (mr.contexts[e].GLctx.canvas.GLctxObject = void 0),
                    (mr.contexts[e] = null);
                },
              },
              gr = [],
              vr = (e, t, r) => {
                var n = ((e, t) => {
                  var r;
                  for (gr.length = 0; (r = A[e++]); ) {
                    var n = 105 != r;
                    (t += (n &= 112 != r) && t % 8 ? 4 : 0),
                      gr.push(
                        112 == r
                          ? R[t >> 2]
                          : 106 == r
                          ? D[t >> 3]
                          : 105 == r
                          ? L[t >> 2]
                          : O[t >> 3]
                      ),
                      (t += n ? 8 : 4);
                  }
                  return gr;
                })(t, r);
                return ne[e].apply(null, n);
              },
              yr = function (e) {
                wu.activeTexture(e);
              },
              br = (e, t) => {
                wu.attachShader(mr.programs[e], mr.shaders[t]);
              },
              wr = (e, t) => {
                wu.beginQuery(e, mr.queries[t]);
              },
              _r = (e, t) => {
                wu.disjointTimerQueryExt.beginQueryEXT(e, mr.queries[t]);
              },
              Er = function (e) {
                wu.beginTransformFeedback(e);
              },
              Cr = (e, t, r) => {
                wu.bindAttribLocation(mr.programs[e], t, ke(r));
              },
              Sr = (e, t) => {
                35051 == e
                  ? (wu.currentPixelPackBufferBinding = t)
                  : 35052 == e && (wu.currentPixelUnpackBufferBinding = t),
                  wu.bindBuffer(e, mr.buffers[t]);
              },
              kr = (e, t, r) => {
                wu.bindBufferBase(e, t, mr.buffers[r]);
              },
              xr = (e, t, r, n, o) => {
                wu.bindBufferRange(e, t, mr.buffers[r], n, o);
              },
              Tr = (e, t) => {
                wu.bindFramebuffer(e, mr.framebuffers[t]);
              },
              Ar = (e, t) => {
                wu.bindRenderbuffer(e, mr.renderbuffers[t]);
              },
              Pr = (e, t) => {
                wu.bindSampler(e, mr.samplers[t]);
              },
              Fr = (e, t) => {
                wu.bindTexture(e, mr.textures[t]);
              },
              Lr = (e, t) => {
                wu.bindTransformFeedback(e, mr.transformFeedbacks[t]);
              },
              Rr = (e) => {
                wu.bindVertexArray(mr.vaos[e]);
              },
              Br = Rr,
              Dr = Rr,
              Mr = function (e, t, r, n) {
                wu.blendColor(e, t, r, n);
              },
              Or = function (e) {
                wu.blendEquation(e);
              },
              Ir = function (e, t) {
                wu.blendEquationSeparate(e, t);
              },
              jr = function (e, t) {
                wu.blendFunc(e, t);
              },
              Ur = function (e, t, r, n) {
                wu.blendFuncSeparate(e, t, r, n);
              },
              $r = function (e, t, r, n, o, i, a, s, u, c) {
                wu.blitFramebuffer(e, t, r, n, o, i, a, s, u, c);
              },
              qr = (e, t, r, n) => {
                mr.currentContext.version >= 2
                  ? r && t
                    ? wu.bufferData(e, A, n, r, t)
                    : wu.bufferData(e, t, n)
                  : wu.bufferData(e, r ? A.subarray(r, r + t) : t, n);
              },
              Hr = (e, t, r, n) => {
                mr.currentContext.version >= 2
                  ? r && wu.bufferSubData(e, t, A, n, r)
                  : wu.bufferSubData(e, t, A.subarray(n, n + r));
              },
              Nr = function (e) {
                return wu.checkFramebufferStatus(e);
              },
              Vr = function (e) {
                wu.clear(e);
              },
              zr = function (e, t, r, n) {
                wu.clearBufferfi(e, t, r, n);
              },
              Wr = (e, t, r) => {
                wu.clearBufferfv(e, t, B, r >> 2);
              },
              Gr = (e, t, r) => {
                wu.clearBufferiv(e, t, L, r >> 2);
              },
              Xr = (e, t, r) => {
                wu.clearBufferuiv(e, t, R, r >> 2);
              },
              Yr = function (e, t, r, n) {
                wu.clearColor(e, t, r, n);
              },
              Kr = function (e) {
                wu.clearDepth(e);
              },
              Zr = function (e) {
                wu.clearStencil(e);
              },
              Qr = (e, t, r) => (
                (r = Number(r)), wu.clientWaitSync(mr.syncs[e], t, r)
              ),
              Jr = (e, t, r, n) => {
                wu.colorMask(!!e, !!t, !!r, !!n);
              },
              en = (e) => {
                wu.compileShader(mr.shaders[e]);
              },
              tn = (e, t, r, n, o, i, a, s) => {
                mr.currentContext.version >= 2
                  ? wu.currentPixelUnpackBufferBinding || !a
                    ? wu.compressedTexImage2D(e, t, r, n, o, i, a, s)
                    : wu.compressedTexImage2D(e, t, r, n, o, i, A, s, a)
                  : wu.compressedTexImage2D(
                      e,
                      t,
                      r,
                      n,
                      o,
                      i,
                      s ? A.subarray(s, s + a) : null
                    );
              },
              rn = (e, t, r, n, o, i, a, s, u) => {
                wu.currentPixelUnpackBufferBinding
                  ? wu.compressedTexImage3D(e, t, r, n, o, i, a, s, u)
                  : wu.compressedTexImage3D(e, t, r, n, o, i, a, A, u, s);
              },
              nn = (e, t, r, n, o, i, a, s, u) => {
                mr.currentContext.version >= 2
                  ? wu.currentPixelUnpackBufferBinding || !s
                    ? wu.compressedTexSubImage2D(e, t, r, n, o, i, a, s, u)
                    : wu.compressedTexSubImage2D(e, t, r, n, o, i, a, A, u, s)
                  : wu.compressedTexSubImage2D(
                      e,
                      t,
                      r,
                      n,
                      o,
                      i,
                      a,
                      u ? A.subarray(u, u + s) : null
                    );
              },
              on = (e, t, r, n, o, i, a, s, u, c, l) => {
                wu.currentPixelUnpackBufferBinding
                  ? wu.compressedTexSubImage3D(e, t, r, n, o, i, a, s, u, c, l)
                  : wu.compressedTexSubImage3D(
                      e,
                      t,
                      r,
                      n,
                      o,
                      i,
                      a,
                      s,
                      u,
                      A,
                      l,
                      c
                    );
              },
              an = function (e, t, r, n, o) {
                wu.copyBufferSubData(e, t, r, n, o);
              },
              sn = function (e, t, r, n, o, i, a, s) {
                wu.copyTexImage2D(e, t, r, n, o, i, a, s);
              },
              un = function (e, t, r, n, o, i, a, s) {
                wu.copyTexSubImage2D(e, t, r, n, o, i, a, s);
              },
              cn = function (e, t, r, n, o, i, a, s, u) {
                wu.copyTexSubImage3D(e, t, r, n, o, i, a, s, u);
              },
              ln = () => {
                var e = mr.getNewId(mr.programs),
                  t = wu.createProgram();
                return (
                  (t.name = e),
                  (t.maxUniformLength =
                    t.maxAttributeLength =
                    t.maxUniformBlockNameLength =
                      0),
                  (t.uniformIdCounter = 1),
                  (mr.programs[e] = t),
                  e
                );
              },
              dn = (e) => {
                var t = mr.getNewId(mr.shaders);
                return (mr.shaders[t] = wu.createShader(e)), t;
              },
              hn = function (e) {
                wu.cullFace(e);
              },
              fn = (e, t) => {
                for (var r = 0; r < e; r++) {
                  var n = L[(t + 4 * r) >> 2],
                    o = mr.buffers[n];
                  o &&
                    (wu.deleteBuffer(o),
                    (o.name = 0),
                    (mr.buffers[n] = null),
                    n == wu.currentPixelPackBufferBinding &&
                      (wu.currentPixelPackBufferBinding = 0),
                    n == wu.currentPixelUnpackBufferBinding &&
                      (wu.currentPixelUnpackBufferBinding = 0));
                }
              },
              pn = (e, t) => {
                for (var r = 0; r < e; ++r) {
                  var n = L[(t + 4 * r) >> 2],
                    o = mr.framebuffers[n];
                  o &&
                    (wu.deleteFramebuffer(o),
                    (o.name = 0),
                    (mr.framebuffers[n] = null));
                }
              },
              mn = (e) => {
                if (e) {
                  var t = mr.programs[e];
                  t
                    ? (wu.deleteProgram(t),
                      (t.name = 0),
                      (mr.programs[e] = null))
                    : mr.recordError(1281);
                }
              },
              gn = (e, t) => {
                for (var r = 0; r < e; r++) {
                  var n = L[(t + 4 * r) >> 2],
                    o = mr.queries[n];
                  o && (wu.deleteQuery(o), (mr.queries[n] = null));
                }
              },
              vn = (e, t) => {
                for (var r = 0; r < e; r++) {
                  var n = L[(t + 4 * r) >> 2],
                    o = mr.queries[n];
                  o &&
                    (wu.disjointTimerQueryExt.deleteQueryEXT(o),
                    (mr.queries[n] = null));
                }
              },
              yn = (e, t) => {
                for (var r = 0; r < e; r++) {
                  var n = L[(t + 4 * r) >> 2],
                    o = mr.renderbuffers[n];
                  o &&
                    (wu.deleteRenderbuffer(o),
                    (o.name = 0),
                    (mr.renderbuffers[n] = null));
                }
              },
              bn = (e, t) => {
                for (var r = 0; r < e; r++) {
                  var n = L[(t + 4 * r) >> 2],
                    o = mr.samplers[n];
                  o &&
                    (wu.deleteSampler(o),
                    (o.name = 0),
                    (mr.samplers[n] = null));
                }
              },
              wn = (e) => {
                if (e) {
                  var t = mr.shaders[e];
                  t
                    ? (wu.deleteShader(t), (mr.shaders[e] = null))
                    : mr.recordError(1281);
                }
              },
              _n = (e) => {
                if (e) {
                  var t = mr.syncs[e];
                  t
                    ? (wu.deleteSync(t), (t.name = 0), (mr.syncs[e] = null))
                    : mr.recordError(1281);
                }
              },
              En = (e, t) => {
                for (var r = 0; r < e; r++) {
                  var n = L[(t + 4 * r) >> 2],
                    o = mr.textures[n];
                  o &&
                    (wu.deleteTexture(o),
                    (o.name = 0),
                    (mr.textures[n] = null));
                }
              },
              Cn = (e, t) => {
                for (var r = 0; r < e; r++) {
                  var n = L[(t + 4 * r) >> 2],
                    o = mr.transformFeedbacks[n];
                  o &&
                    (wu.deleteTransformFeedback(o),
                    (o.name = 0),
                    (mr.transformFeedbacks[n] = null));
                }
              },
              Sn = (e, t) => {
                for (var r = 0; r < e; r++) {
                  var n = L[(t + 4 * r) >> 2];
                  wu.deleteVertexArray(mr.vaos[n]), (mr.vaos[n] = null);
                }
              },
              kn = Sn,
              xn = Sn,
              Tn = function (e) {
                wu.depthFunc(e);
              },
              An = (e) => {
                wu.depthMask(!!e);
              },
              Pn = function (e, t) {
                wu.depthRange(e, t);
              },
              Fn = (e, t) => {
                wu.detachShader(mr.programs[e], mr.shaders[t]);
              },
              Ln = function (e) {
                wu.disable(e);
              },
              Rn = (e) => {
                wu.disableVertexAttribArray(e);
              },
              Bn = (e, t, r) => {
                wu.drawArrays(e, t, r);
              },
              Dn = (e, t, r, n) => {
                wu.drawArraysInstanced(e, t, r, n);
              },
              Mn = Dn,
              On = Dn,
              In = Dn,
              jn = (e, t, r, n, o) => {
                wu.dibvbi.drawArraysInstancedBaseInstanceWEBGL(e, t, r, n, o);
              },
              Un = Dn,
              $n = Dn,
              qn = [],
              Hn = (e, t) => {
                for (var r = qn[e], n = 0; n < e; n++)
                  r[n] = L[(t + 4 * n) >> 2];
                wu.drawBuffers(r);
              },
              Nn = Hn,
              Vn = Hn,
              zn = Hn,
              Wn = (e, t, r, n) => {
                wu.drawElements(e, t, r, n);
              },
              Gn = Wn,
              Xn = (e, t, r, n, o) => {
                wu.drawElementsInstanced(e, t, r, n, o);
              },
              Yn = Xn,
              Kn = Xn,
              Zn = Xn,
              Qn = (e, t, r, n, o, i, a) => {
                wu.dibvbi.drawElementsInstancedBaseVertexBaseInstanceWEBGL(
                  e,
                  t,
                  r,
                  n,
                  o,
                  i,
                  a
                );
              },
              Jn = Xn,
              eo = Xn,
              to = (e, t, r, n, o, i) => {
                Wn(e, n, o, i);
              },
              ro = function (e) {
                wu.enable(e);
              },
              no = (e) => {
                wu.enableVertexAttribArray(e);
              },
              oo = function (e) {
                wu.endQuery(e);
              },
              io = (e) => {
                wu.disjointTimerQueryExt.endQueryEXT(e);
              },
              ao = function () {
                wu.endTransformFeedback();
              },
              so = (e, t) => {
                var r = wu.fenceSync(e, t);
                if (r) {
                  var n = mr.getNewId(mr.syncs);
                  return (r.name = n), (mr.syncs[n] = r), n;
                }
                return 0;
              },
              uo = function () {
                wu.finish();
              },
              co = function () {
                wu.flush();
              },
              lo = (e, t, r, n) => {
                wu.framebufferRenderbuffer(e, t, r, mr.renderbuffers[n]);
              },
              ho = (e, t, r, n, o) => {
                wu.framebufferTexture2D(e, t, r, mr.textures[n], o);
              },
              fo = (e, t, r, n, o) => {
                wu.framebufferTextureLayer(e, t, mr.textures[r], n, o);
              },
              po = function (e) {
                wu.frontFace(e);
              },
              mo = (e, t, r, n) => {
                for (var o = 0; o < e; o++) {
                  var i = wu[r](),
                    a = i && mr.getNewId(n);
                  i ? ((i.name = a), (n[a] = i)) : mr.recordError(1282),
                    (L[(t + 4 * o) >> 2] = a);
                }
              },
              go = (e, t) => {
                mo(e, t, "createBuffer", mr.buffers);
              },
              vo = (e, t) => {
                mo(e, t, "createFramebuffer", mr.framebuffers);
              },
              yo = (e, t) => {
                mo(e, t, "createQuery", mr.queries);
              },
              bo = (e, t) => {
                for (var r = 0; r < e; r++) {
                  var n = wu.disjointTimerQueryExt.createQueryEXT();
                  if (!n) {
                    for (mr.recordError(1282); r < e; )
                      L[(t + 4 * r++) >> 2] = 0;
                    return;
                  }
                  var o = mr.getNewId(mr.queries);
                  (n.name = o), (mr.queries[o] = n), (L[(t + 4 * r) >> 2] = o);
                }
              },
              wo = (e, t) => {
                mo(e, t, "createRenderbuffer", mr.renderbuffers);
              },
              _o = (e, t) => {
                mo(e, t, "createSampler", mr.samplers);
              },
              Eo = (e, t) => {
                mo(e, t, "createTexture", mr.textures);
              },
              Co = (e, t) => {
                mo(e, t, "createTransformFeedback", mr.transformFeedbacks);
              };
            function So(e, t) {
              mo(e, t, "createVertexArray", mr.vaos);
            }
            var ko,
              xo,
              To,
              Ao = So,
              Po = So,
              Fo = function (e) {
                wu.generateMipmap(e);
              },
              Lo = (e, t, r, n, o, i, a, s) => {
                t = mr.programs[t];
                var u = wu[e](t, r);
                if (u) {
                  var c = s && $t(u.name, s, n);
                  o && (L[o >> 2] = c),
                    i && (L[i >> 2] = u.size),
                    a && (L[a >> 2] = u.type);
                }
              },
              Ro = (e, t, r, n, o, i, a) => {
                Lo("getActiveAttrib", e, t, r, n, o, i, a);
              },
              Bo = (e, t, r, n, o, i, a) => {
                Lo("getActiveUniform", e, t, r, n, o, i, a);
              },
              Do = (e, t, r, n, o) => {
                e = mr.programs[e];
                var i = wu.getActiveUniformBlockName(e, t);
                if (i)
                  if (o && r > 0) {
                    var a = $t(i, o, r);
                    n && (L[n >> 2] = a);
                  } else n && (L[n >> 2] = 0);
              },
              Mo = (e, t, r, n) => {
                if (n)
                  if (((e = mr.programs[e]), 35393 != r)) {
                    var o = wu.getActiveUniformBlockParameter(e, t, r);
                    if (null !== o)
                      if (35395 == r)
                        for (var i = 0; i < o.length; i++)
                          L[(n + 4 * i) >> 2] = o[i];
                      else L[n >> 2] = o;
                  } else {
                    var a = wu.getActiveUniformBlockName(e, t);
                    L[n >> 2] = a.length + 1;
                  }
                else mr.recordError(1281);
              },
              Oo = (e, t, r, n, o) => {
                if (o)
                  if (t > 0 && 0 == r) mr.recordError(1281);
                  else {
                    e = mr.programs[e];
                    for (var i = [], a = 0; a < t; a++)
                      i.push(L[(r + 4 * a) >> 2]);
                    var s = wu.getActiveUniforms(e, i, n);
                    if (s) {
                      var u = s.length;
                      for (a = 0; a < u; a++) L[(o + 4 * a) >> 2] = s[a];
                    }
                  }
                else mr.recordError(1281);
              },
              Io = (e, t, r, n) => {
                var o = wu.getAttachedShaders(mr.programs[e]),
                  i = o.length;
                i > t && (i = t), (L[r >> 2] = i);
                for (var a = 0; a < i; ++a) {
                  var s = mr.shaders.indexOf(o[a]);
                  L[(n + 4 * a) >> 2] = s;
                }
              },
              jo = (e, t) => wu.getAttribLocation(mr.programs[e], ke(t)),
              Uo = (e, t) => {
                R[e >> 2] = t;
                var r = R[e >> 2];
                R[(e + 4) >> 2] = (t - r) / 4294967296;
              },
              $o = function () {
                var e,
                  t =
                    ((e = [
                      "ANGLE_instanced_arrays",
                      "EXT_blend_minmax",
                      "EXT_disjoint_timer_query",
                      "EXT_frag_depth",
                      "EXT_shader_texture_lod",
                      "EXT_sRGB",
                      "OES_element_index_uint",
                      "OES_fbo_render_mipmap",
                      "OES_standard_derivatives",
                      "OES_texture_float",
                      "OES_texture_half_float",
                      "OES_texture_half_float_linear",
                      "OES_vertex_array_object",
                      "WEBGL_color_buffer_float",
                      "WEBGL_depth_texture",
                      "WEBGL_draw_buffers",
                      "EXT_color_buffer_float",
                      "EXT_disjoint_timer_query_webgl2",
                      "EXT_texture_norm16",
                      "WEBGL_clip_cull_distance",
                      "EXT_color_buffer_half_float",
                      "EXT_float_blend",
                      "EXT_texture_compression_bptc",
                      "EXT_texture_compression_rgtc",
                      "EXT_texture_filter_anisotropic",
                      "KHR_parallel_shader_compile",
                      "OES_texture_float_linear",
                      "WEBGL_compressed_texture_s3tc",
                      "WEBGL_compressed_texture_s3tc_srgb",
                      "WEBGL_debug_renderer_info",
                      "WEBGL_debug_shaders",
                      "WEBGL_lose_context",
                      "WEBGL_multi_draw",
                    ]),
                    (wu.getSupportedExtensions() || []).filter((t) =>
                      e.includes(t)
                    ));
                return (t = t.concat(t.map((e) => "GL_" + e)));
              },
              qo = (e, t, r) => {
                if (t) {
                  var n = void 0;
                  switch (e) {
                    case 36346:
                      n = 1;
                      break;
                    case 36344:
                      return void (0 != r && 1 != r && mr.recordError(1280));
                    case 34814:
                    case 36345:
                      n = 0;
                      break;
                    case 34466:
                      var o = wu.getParameter(34467);
                      n = o ? o.length : 0;
                      break;
                    case 33309:
                      if (mr.currentContext.version < 2)
                        return void mr.recordError(1282);
                      n = $o().length;
                      break;
                    case 33307:
                    case 33308:
                      if (mr.currentContext.version < 2)
                        return void mr.recordError(1280);
                      n = 33307 == e ? 3 : 0;
                  }
                  if (void 0 === n) {
                    var i = wu.getParameter(e);
                    switch (typeof i) {
                      case "number":
                        n = i;
                        break;
                      case "boolean":
                        n = i ? 1 : 0;
                        break;
                      case "string":
                        return void mr.recordError(1280);
                      case "object":
                        if (null === i)
                          switch (e) {
                            case 34964:
                            case 35725:
                            case 34965:
                            case 36006:
                            case 36007:
                            case 32873:
                            case 34229:
                            case 36662:
                            case 36663:
                            case 35053:
                            case 35055:
                            case 36010:
                            case 35097:
                            case 35869:
                            case 32874:
                            case 36389:
                            case 35983:
                            case 35368:
                            case 34068:
                              n = 0;
                              break;
                            default:
                              return void mr.recordError(1280);
                          }
                        else {
                          if (
                            i instanceof Float32Array ||
                            i instanceof Uint32Array ||
                            i instanceof Int32Array ||
                            i instanceof Array
                          ) {
                            for (var a = 0; a < i.length; ++a)
                              switch (r) {
                                case 0:
                                  L[(t + 4 * a) >> 2] = i[a];
                                  break;
                                case 2:
                                  B[(t + 4 * a) >> 2] = i[a];
                                  break;
                                case 4:
                                  T[(t + a) >> 0] = i[a] ? 1 : 0;
                              }
                            return;
                          }
                          try {
                            n = 0 | i.name;
                          } catch (t) {
                            return (
                              mr.recordError(1280),
                              void k(
                                `GL_INVALID_ENUM in glGet${r}v: Unknown object returned from WebGL getParameter(${e})! (error: ${t})`
                              )
                            );
                          }
                        }
                        break;
                      default:
                        return (
                          mr.recordError(1280),
                          void k(
                            `GL_INVALID_ENUM in glGet${r}v: Native code calling glGet${r}v(${e}) and it returns ${i} of type ${typeof i}!`
                          )
                        );
                    }
                  }
                  switch (r) {
                    case 1:
                      Uo(t, n);
                      break;
                    case 0:
                      L[t >> 2] = n;
                      break;
                    case 2:
                      B[t >> 2] = n;
                      break;
                    case 4:
                      T[t >> 0] = n ? 1 : 0;
                  }
                } else mr.recordError(1281);
              },
              Ho = (e, t) => qo(e, t, 4),
              No = (e, t, r) => {
                r ? Uo(r, wu.getBufferParameter(e, t)) : mr.recordError(1281);
              },
              Vo = (e, t, r) => {
                r
                  ? (L[r >> 2] = wu.getBufferParameter(e, t))
                  : mr.recordError(1281);
              },
              zo = () => {
                var e = wu.getError() || mr.lastError;
                return (mr.lastError = 0), e;
              },
              Wo = (e, t) => qo(e, t, 2),
              Go = (e, t) => wu.getFragDataLocation(mr.programs[e], ke(t)),
              Xo = (e, t, r, n) => {
                var o = wu.getFramebufferAttachmentParameter(e, t, r);
                (o instanceof WebGLRenderbuffer || o instanceof WebGLTexture) &&
                  (o = 0 | o.name),
                  (L[n >> 2] = o);
              },
              Yo = (e, t, r, n) => {
                if (r) {
                  var o,
                    i = wu.getIndexedParameter(e, t);
                  switch (typeof i) {
                    case "boolean":
                      o = i ? 1 : 0;
                      break;
                    case "number":
                      o = i;
                      break;
                    case "object":
                      if (null === i)
                        switch (e) {
                          case 35983:
                          case 35368:
                            o = 0;
                            break;
                          default:
                            return void mr.recordError(1280);
                        }
                      else {
                        if (!(i instanceof WebGLBuffer))
                          return void mr.recordError(1280);
                        o = 0 | i.name;
                      }
                      break;
                    default:
                      return void mr.recordError(1280);
                  }
                  switch (n) {
                    case 1:
                      Uo(r, o);
                      break;
                    case 0:
                      L[r >> 2] = o;
                      break;
                    case 2:
                      B[r >> 2] = o;
                      break;
                    case 4:
                      T[r >> 0] = o ? 1 : 0;
                      break;
                    default:
                      throw (
                        "internal emscriptenWebGLGetIndexed() error, bad type: " +
                        n
                      );
                  }
                } else mr.recordError(1281);
              },
              Ko = (e, t, r) => Yo(e, t, r, 1),
              Zo = (e, t) => {
                qo(e, t, 1);
              },
              Qo = (e, t, r) => Yo(e, t, r, 0),
              Jo = (e, t) => qo(e, t, 0),
              ei = (e, t, r, n, o) => {
                if (n < 0) mr.recordError(1281);
                else if (o) {
                  var i = wu.getInternalformatParameter(e, t, r);
                  if (null !== i)
                    for (var a = 0; a < i.length && a < n; ++a)
                      L[(o + 4 * a) >> 2] = i[a];
                } else mr.recordError(1281);
              },
              ti = (e, t, r, n, o) => {
                mr.recordError(1282);
              },
              ri = (e, t, r, n) => {
                var o = wu.getProgramInfoLog(mr.programs[e]);
                null === o && (o = "(unknown error)");
                var i = t > 0 && n ? $t(o, n, t) : 0;
                r && (L[r >> 2] = i);
              },
              ni = (e, t, r) => {
                if (r)
                  if (e >= mr.counter) mr.recordError(1281);
                  else if (((e = mr.programs[e]), 35716 == t)) {
                    var n = wu.getProgramInfoLog(e);
                    null === n && (n = "(unknown error)"),
                      (L[r >> 2] = n.length + 1);
                  } else if (35719 == t) {
                    if (!e.maxUniformLength)
                      for (var o = 0; o < wu.getProgramParameter(e, 35718); ++o)
                        e.maxUniformLength = Math.max(
                          e.maxUniformLength,
                          wu.getActiveUniform(e, o).name.length + 1
                        );
                    L[r >> 2] = e.maxUniformLength;
                  } else if (35722 == t) {
                    if (!e.maxAttributeLength)
                      for (o = 0; o < wu.getProgramParameter(e, 35721); ++o)
                        e.maxAttributeLength = Math.max(
                          e.maxAttributeLength,
                          wu.getActiveAttrib(e, o).name.length + 1
                        );
                    L[r >> 2] = e.maxAttributeLength;
                  } else if (35381 == t) {
                    if (!e.maxUniformBlockNameLength)
                      for (o = 0; o < wu.getProgramParameter(e, 35382); ++o)
                        e.maxUniformBlockNameLength = Math.max(
                          e.maxUniformBlockNameLength,
                          wu.getActiveUniformBlockName(e, o).length + 1
                        );
                    L[r >> 2] = e.maxUniformBlockNameLength;
                  } else L[r >> 2] = wu.getProgramParameter(e, t);
                else mr.recordError(1281);
              },
              oi = (e, t, r) => {
                if (r) {
                  var n,
                    o = mr.queries[e];
                  (n =
                    mr.currentContext.version < 2
                      ? wu.disjointTimerQueryExt.getQueryObjectEXT(o, t)
                      : wu.getQueryParameter(o, t)),
                    Uo(r, "boolean" == typeof n ? (n ? 1 : 0) : n);
                } else mr.recordError(1281);
              },
              ii = oi,
              ai = (e, t, r) => {
                if (r) {
                  var n,
                    o = mr.queries[e],
                    i = wu.disjointTimerQueryExt.getQueryObjectEXT(o, t);
                  (n = "boolean" == typeof i ? (i ? 1 : 0) : i),
                    (L[r >> 2] = n);
                } else mr.recordError(1281);
              },
              si = ai,
              ui = oi,
              ci = (e, t, r) => {
                if (r) {
                  var n,
                    o = mr.queries[e],
                    i = wu.getQueryParameter(o, t);
                  (n = "boolean" == typeof i ? (i ? 1 : 0) : i),
                    (L[r >> 2] = n);
                } else mr.recordError(1281);
              },
              li = ai,
              di = (e, t, r) => {
                r ? (L[r >> 2] = wu.getQuery(e, t)) : mr.recordError(1281);
              },
              hi = (e, t, r) => {
                r
                  ? (L[r >> 2] = wu.disjointTimerQueryExt.getQueryEXT(e, t))
                  : mr.recordError(1281);
              },
              fi = (e, t, r) => {
                r
                  ? (L[r >> 2] = wu.getRenderbufferParameter(e, t))
                  : mr.recordError(1281);
              },
              pi = (e, t, r) => {
                r
                  ? (B[r >> 2] = wu.getSamplerParameter(mr.samplers[e], t))
                  : mr.recordError(1281);
              },
              mi = (e, t, r) => {
                r
                  ? (L[r >> 2] = wu.getSamplerParameter(mr.samplers[e], t))
                  : mr.recordError(1281);
              },
              gi = (e, t, r, n) => {
                var o = wu.getShaderInfoLog(mr.shaders[e]);
                null === o && (o = "(unknown error)");
                var i = t > 0 && n ? $t(o, n, t) : 0;
                r && (L[r >> 2] = i);
              },
              vi = (e, t, r, n) => {
                var o = wu.getShaderPrecisionFormat(e, t);
                (L[r >> 2] = o.rangeMin),
                  (L[(r + 4) >> 2] = o.rangeMax),
                  (L[n >> 2] = o.precision);
              },
              yi = (e, t, r, n) => {
                var o = wu.getShaderSource(mr.shaders[e]);
                if (o) {
                  var i = t > 0 && n ? $t(o, n, t) : 0;
                  r && (L[r >> 2] = i);
                }
              },
              bi = (e, t, r) => {
                if (r)
                  if (35716 == t) {
                    var n = wu.getShaderInfoLog(mr.shaders[e]);
                    null === n && (n = "(unknown error)");
                    var o = n ? n.length + 1 : 0;
                    L[r >> 2] = o;
                  } else if (35720 == t) {
                    var i = wu.getShaderSource(mr.shaders[e]),
                      a = i ? i.length + 1 : 0;
                    L[r >> 2] = a;
                  } else L[r >> 2] = wu.getShaderParameter(mr.shaders[e], t);
                else mr.recordError(1281);
              },
              wi = (e) => {
                var t = mr.stringCache[e];
                if (!t) {
                  switch (e) {
                    case 7939:
                      t = ir($o().join(" "));
                      break;
                    case 7936:
                    case 7937:
                    case 37445:
                    case 37446:
                      var r = wu.getParameter(e);
                      r || mr.recordError(1280), (t = r ? ir(r) : 0);
                      break;
                    case 7938:
                      var n = wu.getParameter(7938);
                      (n =
                        mr.currentContext.version >= 2
                          ? `OpenGL ES 3.0 (${n})`
                          : `OpenGL ES 2.0 (${n})`),
                        (t = ir(n));
                      break;
                    case 35724:
                      var o = wu.getParameter(35724),
                        i = o.match(
                          /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/
                        );
                      null !== i &&
                        (3 == i[1].length && (i[1] = i[1] + "0"),
                        (o = `OpenGL ES GLSL ES ${i[1]} (${o})`)),
                        (t = ir(o));
                      break;
                    default:
                      mr.recordError(1280);
                  }
                  mr.stringCache[e] = t;
                }
                return t;
              },
              _i = (e, t) => {
                if (mr.currentContext.version < 2)
                  return mr.recordError(1282), 0;
                var r = mr.stringiCache[e];
                if (r)
                  return t < 0 || t >= r.length
                    ? (mr.recordError(1281), 0)
                    : r[t];
                if (7939 === e) {
                  var n = $o().map(ir);
                  return (
                    (r = mr.stringiCache[e] = n),
                    t < 0 || t >= r.length ? (mr.recordError(1281), 0) : r[t]
                  );
                }
                return mr.recordError(1280), 0;
              },
              Ei = (e, t, r, n, o) => {
                if (r < 0) mr.recordError(1281);
                else if (o) {
                  var i = wu.getSyncParameter(mr.syncs[e], t);
                  null !== i && ((L[o >> 2] = i), n && (L[n >> 2] = 1));
                } else mr.recordError(1281);
              },
              Ci = (e, t, r) => {
                r
                  ? (B[r >> 2] = wu.getTexParameter(e, t))
                  : mr.recordError(1281);
              },
              Si = (e, t, r) => {
                r
                  ? (L[r >> 2] = wu.getTexParameter(e, t))
                  : mr.recordError(1281);
              },
              ki = (e, t, r, n, o, i, a) => {
                e = mr.programs[e];
                var s = wu.getTransformFeedbackVarying(e, t);
                if (s) {
                  if (a && r > 0) {
                    var u = $t(s.name, a, r);
                    n && (L[n >> 2] = u);
                  } else n && (L[n >> 2] = 0);
                  o && (L[o >> 2] = s.size), i && (L[i >> 2] = s.type);
                }
              },
              xi = (e, t) => wu.getUniformBlockIndex(mr.programs[e], ke(t)),
              Ti = (e, t, r, n) => {
                if (n)
                  if (t > 0 && (0 == r || 0 == n)) mr.recordError(1281);
                  else {
                    e = mr.programs[e];
                    for (var o = [], i = 0; i < t; i++)
                      o.push(ke(L[(r + 4 * i) >> 2]));
                    var a = wu.getUniformIndices(e, o);
                    if (a) {
                      var s = a.length;
                      for (i = 0; i < s; i++) L[(n + 4 * i) >> 2] = a[i];
                    }
                  }
                else mr.recordError(1281);
              },
              Ai = (e) => "]" == e.slice(-1) && e.lastIndexOf("["),
              Pi = (e) => {
                var t,
                  r,
                  n = e.uniformLocsById,
                  o = e.uniformSizeAndIdsByName;
                if (!n)
                  for (
                    e.uniformLocsById = n = {},
                      e.uniformArrayNamesById = {},
                      t = 0;
                    t < wu.getProgramParameter(e, 35718);
                    ++t
                  ) {
                    var i = wu.getActiveUniform(e, t),
                      a = i.name,
                      s = i.size,
                      u = Ai(a),
                      c = u > 0 ? a.slice(0, u) : a,
                      l = e.uniformIdCounter;
                    for (
                      e.uniformIdCounter += s, o[c] = [s, l], r = 0;
                      r < s;
                      ++r
                    )
                      (n[l] = r), (e.uniformArrayNamesById[l++] = c);
                  }
              },
              Fi = (e, t) => {
                if (((t = ke(t)), (e = mr.programs[e]))) {
                  Pi(e);
                  var r = e.uniformLocsById,
                    n = 0,
                    o = t,
                    i = Ai(t);
                  i > 0 &&
                    ((s = t.slice(i + 1)),
                    (n = parseInt(s) >>> 0),
                    (o = t.slice(0, i)));
                  var a = e.uniformSizeAndIdsByName[o];
                  if (
                    a &&
                    n < a[0] &&
                    (r[(n += a[1])] = r[n] || wu.getUniformLocation(e, t))
                  )
                    return n;
                } else mr.recordError(1281);
                var s;
                return -1;
              },
              Li = (e) => {
                var t = wu.currentProgram;
                if (t) {
                  var r = t.uniformLocsById[e];
                  return (
                    "number" == typeof r &&
                      (t.uniformLocsById[e] = r =
                        wu.getUniformLocation(
                          t,
                          t.uniformArrayNamesById[e] + (r > 0 ? `[${r}]` : "")
                        )),
                    r
                  );
                }
                mr.recordError(1282);
              },
              Ri = (e, t, r, n) => {
                if (r) {
                  (e = mr.programs[e]), Pi(e);
                  var o = wu.getUniform(e, Li(t));
                  if ("number" == typeof o || "boolean" == typeof o)
                    switch (n) {
                      case 0:
                        L[r >> 2] = o;
                        break;
                      case 2:
                        B[r >> 2] = o;
                    }
                  else
                    for (var i = 0; i < o.length; i++)
                      switch (n) {
                        case 0:
                          L[(r + 4 * i) >> 2] = o[i];
                          break;
                        case 2:
                          B[(r + 4 * i) >> 2] = o[i];
                      }
                } else mr.recordError(1281);
              },
              Bi = (e, t, r) => {
                Ri(e, t, r, 2);
              },
              Di = (e, t, r) => {
                Ri(e, t, r, 0);
              },
              Mi = (e, t, r) => Ri(e, t, r, 0),
              Oi = (e, t, r, n) => {
                if (r) {
                  var o = wu.getVertexAttrib(e, t);
                  if (34975 == t) L[r >> 2] = o && o.name;
                  else if ("number" == typeof o || "boolean" == typeof o)
                    switch (n) {
                      case 0:
                        L[r >> 2] = o;
                        break;
                      case 2:
                        B[r >> 2] = o;
                        break;
                      case 5:
                        L[r >> 2] = Math.fround(o);
                    }
                  else
                    for (var i = 0; i < o.length; i++)
                      switch (n) {
                        case 0:
                          L[(r + 4 * i) >> 2] = o[i];
                          break;
                        case 2:
                          B[(r + 4 * i) >> 2] = o[i];
                          break;
                        case 5:
                          L[(r + 4 * i) >> 2] = Math.fround(o[i]);
                      }
                } else mr.recordError(1281);
              },
              Ii = (e, t, r) => {
                Oi(e, t, r, 0);
              },
              ji = Ii,
              Ui = Ii,
              $i = (e, t, r) => {
                r
                  ? (L[r >> 2] = wu.getVertexAttribOffset(e, t))
                  : mr.recordError(1281);
              },
              qi = (e, t, r) => {
                Oi(e, t, r, 2);
              },
              Hi = (e, t, r) => {
                Oi(e, t, r, 5);
              },
              Ni = function (e, t) {
                wu.hint(e, t);
              },
              Vi = (e, t, r) => {
                for (var n = qn[t], o = 0; o < t; o++)
                  n[o] = L[(r + 4 * o) >> 2];
                wu.invalidateFramebuffer(e, n);
              },
              zi = (e, t, r, n, o, i, a) => {
                for (var s = qn[t], u = 0; u < t; u++)
                  s[u] = L[(r + 4 * u) >> 2];
                wu.invalidateSubFramebuffer(e, s, n, o, i, a);
              },
              Wi = (e) => {
                var t = mr.buffers[e];
                return t ? wu.isBuffer(t) : 0;
              },
              Gi = function (e) {
                return wu.isEnabled(e);
              },
              Xi = (e) => {
                var t = mr.framebuffers[e];
                return t ? wu.isFramebuffer(t) : 0;
              },
              Yi = (e) => ((e = mr.programs[e]) ? wu.isProgram(e) : 0),
              Ki = (e) => {
                var t = mr.queries[e];
                return t ? wu.isQuery(t) : 0;
              },
              Zi = (e) => {
                var t = mr.queries[e];
                return t ? wu.disjointTimerQueryExt.isQueryEXT(t) : 0;
              },
              Qi = (e) => {
                var t = mr.renderbuffers[e];
                return t ? wu.isRenderbuffer(t) : 0;
              },
              Ji = (e) => {
                var t = mr.samplers[e];
                return t ? wu.isSampler(t) : 0;
              },
              ea = (e) => {
                var t = mr.shaders[e];
                return t ? wu.isShader(t) : 0;
              },
              ta = (e) => wu.isSync(mr.syncs[e]),
              ra = (e) => {
                var t = mr.textures[e];
                return t ? wu.isTexture(t) : 0;
              },
              na = (e) => wu.isTransformFeedback(mr.transformFeedbacks[e]),
              oa = (e) => {
                var t = mr.vaos[e];
                return t ? wu.isVertexArray(t) : 0;
              },
              ia = oa,
              aa = oa,
              sa = function (e) {
                wu.lineWidth(e);
              },
              ua = (e) => {
                (e = mr.programs[e]),
                  wu.linkProgram(e),
                  (e.uniformLocsById = 0),
                  (e.uniformSizeAndIdsByName = {});
              },
              ca = (e, t, r, n, o, i) => {
                wu.mdibvbi.multiDrawArraysInstancedBaseInstanceWEBGL(
                  e,
                  L,
                  t >> 2,
                  L,
                  r >> 2,
                  L,
                  n >> 2,
                  R,
                  o >> 2,
                  i
                );
              },
              la = (e, t, r, n, o, i, a, s) => {
                wu.mdibvbi.multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL(
                  e,
                  L,
                  t >> 2,
                  r,
                  L,
                  n >> 2,
                  L,
                  o >> 2,
                  L,
                  i >> 2,
                  R,
                  a >> 2,
                  s
                );
              },
              da = function () {
                wu.pauseTransformFeedback();
              },
              ha = (e, t) => {
                3317 == e && (mr.unpackAlignment = t), wu.pixelStorei(e, t);
              },
              fa = function (e, t) {
                wu.polygonOffset(e, t);
              },
              pa = (e, t, r, n) => {
                mr.recordError(1280);
              },
              ma = (e, t, r) => {
                mr.recordError(1280);
              },
              ga = (e, t) => {
                wu.disjointTimerQueryExt.queryCounterEXT(mr.queries[e], t);
              },
              va = function (e) {
                wu.readBuffer(e);
              },
              ya = (e) =>
                0 == (e -= 5120)
                  ? T
                  : 1 == e
                  ? A
                  : 2 == e
                  ? P
                  : 4 == e
                  ? L
                  : 6 == e
                  ? B
                  : 5 == e ||
                    28922 == e ||
                    28520 == e ||
                    30779 == e ||
                    30782 == e
                  ? R
                  : F,
              ba = (e) => 31 - Math.clz32(e.BYTES_PER_ELEMENT),
              wa = (e, t, r, n, o, i) => {
                var a = ya(e),
                  s = ba(a),
                  u = 1 << s,
                  c =
                    ((e) =>
                      ({
                        5: 3,
                        6: 4,
                        8: 2,
                        29502: 3,
                        29504: 4,
                        26917: 2,
                        26918: 2,
                        29846: 3,
                        29847: 4,
                      }[e - 6402] || 1))(t) * u,
                  l = ((e, t, r, n) => {
                    var o;
                    return t * ((e * r + (o = n) - 1) & -o);
                  })(r, n, c, mr.unpackAlignment);
                return a.subarray(o >> s, (o + l) >> s);
              },
              _a = (e, t, r, n, o, i, a) => {
                if (mr.currentContext.version >= 2)
                  if (wu.currentPixelPackBufferBinding)
                    wu.readPixels(e, t, r, n, o, i, a);
                  else {
                    var s = ya(i);
                    wu.readPixels(e, t, r, n, o, i, s, a >> ba(s));
                  }
                else {
                  var u = wa(i, o, r, n, a);
                  u ? wu.readPixels(e, t, r, n, o, i, u) : mr.recordError(1280);
                }
              },
              Ea = () => {},
              Ca = function (e, t, r, n) {
                wu.renderbufferStorage(e, t, r, n);
              },
              Sa = function (e, t, r, n, o) {
                wu.renderbufferStorageMultisample(e, t, r, n, o);
              },
              ka = function () {
                wu.resumeTransformFeedback();
              },
              xa = (e, t) => {
                wu.sampleCoverage(e, !!t);
              },
              Ta = (e, t, r) => {
                wu.samplerParameterf(mr.samplers[e], t, r);
              },
              Aa = (e, t, r) => {
                var n = B[r >> 2];
                wu.samplerParameterf(mr.samplers[e], t, n);
              },
              Pa = (e, t, r) => {
                wu.samplerParameteri(mr.samplers[e], t, r);
              },
              Fa = (e, t, r) => {
                var n = L[r >> 2];
                wu.samplerParameteri(mr.samplers[e], t, n);
              },
              La = function (e, t, r, n) {
                wu.scissor(e, t, r, n);
              },
              Ra = (e, t, r, n, o) => {
                mr.recordError(1280);
              },
              Ba = (e, t, r, n) => {
                var o = mr.getSource(e, t, r, n);
                if (
                  mr.currentContext.version >= 2 &&
                  o.includes("#version 100")
                ) {
                  var i = "";
                  (o = (o = o.replace(
                    /#extension GL_OES_standard_derivatives : enable/g,
                    ""
                  )).replace(
                    /#extension GL_EXT_shader_texture_lod : enable/g,
                    ""
                  )).includes("gl_FragColor") &&
                    ((i += "out mediump vec4 GL_FragColor;\n"),
                    (o = o.replace(/gl_FragColor/g, "GL_FragColor"))),
                    (o = (o = (o = (o = (o = (o = (o = (o = (o = (o = (o = (o =
                      o.includes("attribute")
                        ? (o = o.replace(/attribute/g, "in")).replace(
                            /varying/g,
                            "out"
                          )
                        : o.replace(/varying/g, "in")).replace(
                      /textureCubeLodEXT/g,
                      "textureCubeLod"
                    )).replace(/texture2DLodEXT/g, "texture2DLod")).replace(
                      /texture2DProjLodEXT/g,
                      "texture2DProjLod"
                    )).replace(/texture2DGradEXT/g, "texture2DGrad")).replace(
                      /texture2DProjGradEXT/g,
                      "texture2DProjGrad"
                    )).replace(
                      /textureCubeGradEXT/g,
                      "textureCubeGrad"
                    )).replace(/textureCube/g, "texture")).replace(
                      /texture1D/g,
                      "texture"
                    )).replace(/texture2D/g, "texture")).replace(
                      /texture3D/g,
                      "texture"
                    )).replace(/#version 100/g, "#version 300 es\n" + i));
                }
                wu.shaderSource(mr.shaders[e], o);
              },
              Da = function (e, t, r) {
                wu.stencilFunc(e, t, r);
              },
              Ma = function (e, t, r, n) {
                wu.stencilFuncSeparate(e, t, r, n);
              },
              Oa = function (e) {
                wu.stencilMask(e);
              },
              Ia = function (e, t) {
                wu.stencilMaskSeparate(e, t);
              },
              ja = function (e, t, r) {
                wu.stencilOp(e, t, r);
              },
              Ua = function (e, t, r, n) {
                wu.stencilOpSeparate(e, t, r, n);
              },
              $a = (e, t, r, n, o, i, a, s, u) => {
                if (
                  (mr.currentContext.version >= 2 &&
                    (6402 == a && 6402 == r && 5125 == s && (r = 33190),
                    36193 == s &&
                      ((s = 5131), 6408 == a && 6408 == r && (r = 34842)),
                    34041 == r && (r = 35056)),
                  mr.currentContext.version >= 2)
                )
                  if (wu.currentPixelUnpackBufferBinding)
                    wu.texImage2D(e, t, r, n, o, i, a, s, u);
                  else if (u) {
                    var c = ya(s);
                    wu.texImage2D(e, t, r, n, o, i, a, s, c, u >> ba(c));
                  } else wu.texImage2D(e, t, r, n, o, i, a, s, null);
                else
                  wu.texImage2D(
                    e,
                    t,
                    r,
                    n,
                    o,
                    i,
                    a,
                    s,
                    u ? wa(s, a, n, o, u) : null
                  );
              },
              qa = (e, t, r, n, o, i, a, s, u, c) => {
                if (wu.currentPixelUnpackBufferBinding)
                  wu.texImage3D(e, t, r, n, o, i, a, s, u, c);
                else if (c) {
                  var l = ya(u);
                  wu.texImage3D(e, t, r, n, o, i, a, s, u, l, c >> ba(l));
                } else wu.texImage3D(e, t, r, n, o, i, a, s, u, null);
              },
              Ha = function (e, t, r) {
                wu.texParameterf(e, t, r);
              },
              Na = (e, t, r) => {
                var n = B[r >> 2];
                wu.texParameterf(e, t, n);
              },
              Va = function (e, t, r) {
                wu.texParameteri(e, t, r);
              },
              za = (e, t, r) => {
                var n = L[r >> 2];
                wu.texParameteri(e, t, n);
              },
              Wa = function (e, t, r, n, o) {
                wu.texStorage2D(e, t, r, n, o);
              },
              Ga = function (e, t, r, n, o, i) {
                wu.texStorage3D(e, t, r, n, o, i);
              },
              Xa = (e, t, r, n, o, i, a, s, u) => {
                if (
                  (mr.currentContext.version >= 2 && 36193 == s && (s = 5131),
                  mr.currentContext.version >= 2)
                )
                  if (wu.currentPixelUnpackBufferBinding)
                    wu.texSubImage2D(e, t, r, n, o, i, a, s, u);
                  else if (u) {
                    var c = ya(s);
                    wu.texSubImage2D(e, t, r, n, o, i, a, s, c, u >> ba(c));
                  } else wu.texSubImage2D(e, t, r, n, o, i, a, s, null);
                else {
                  var l = null;
                  u && (l = wa(s, a, o, i, u)),
                    wu.texSubImage2D(e, t, r, n, o, i, a, s, l);
                }
              },
              Ya = (e, t, r, n, o, i, a, s, u, c, l) => {
                if (wu.currentPixelUnpackBufferBinding)
                  wu.texSubImage3D(e, t, r, n, o, i, a, s, u, c, l);
                else if (l) {
                  var d = ya(c);
                  wu.texSubImage3D(e, t, r, n, o, i, a, s, u, c, d, l >> ba(d));
                } else wu.texSubImage3D(e, t, r, n, o, i, a, s, u, c, null);
              },
              Ka = (e, t, r, n) => {
                e = mr.programs[e];
                for (var o = [], i = 0; i < t; i++)
                  o.push(ke(L[(r + 4 * i) >> 2]));
                wu.transformFeedbackVaryings(e, o, n);
              },
              Za = (e, t) => {
                wu.uniform1f(Li(e), t);
              },
              Qa = [],
              Ja = (e, t, r) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniform1fv(Li(e), B, r >> 2, t);
                else {
                  if (t <= 288)
                    for (var n = Qa[t - 1], o = 0; o < t; ++o)
                      n[o] = B[(r + 4 * o) >> 2];
                  else n = B.subarray(r >> 2, (r + 4 * t) >> 2);
                  wu.uniform1fv(Li(e), n);
                }
              },
              es = (e, t) => {
                wu.uniform1i(Li(e), t);
              },
              ts = [],
              rs = (e, t, r) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniform1iv(Li(e), L, r >> 2, t);
                else {
                  if (t <= 288)
                    for (var n = ts[t - 1], o = 0; o < t; ++o)
                      n[o] = L[(r + 4 * o) >> 2];
                  else n = L.subarray(r >> 2, (r + 4 * t) >> 2);
                  wu.uniform1iv(Li(e), n);
                }
              },
              ns = (e, t) => {
                wu.uniform1ui(Li(e), t);
              },
              os = (e, t, r) => {
                t && wu.uniform1uiv(Li(e), R, r >> 2, t);
              },
              is = (e, t, r) => {
                wu.uniform2f(Li(e), t, r);
              },
              as = (e, t, r) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniform2fv(Li(e), B, r >> 2, 2 * t);
                else {
                  if (t <= 144)
                    for (var n = Qa[2 * t - 1], o = 0; o < 2 * t; o += 2)
                      (n[o] = B[(r + 4 * o) >> 2]),
                        (n[o + 1] = B[(r + (4 * o + 4)) >> 2]);
                  else n = B.subarray(r >> 2, (r + 8 * t) >> 2);
                  wu.uniform2fv(Li(e), n);
                }
              },
              ss = (e, t, r) => {
                wu.uniform2i(Li(e), t, r);
              },
              us = (e, t, r) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniform2iv(Li(e), L, r >> 2, 2 * t);
                else {
                  if (t <= 144)
                    for (var n = ts[2 * t - 1], o = 0; o < 2 * t; o += 2)
                      (n[o] = L[(r + 4 * o) >> 2]),
                        (n[o + 1] = L[(r + (4 * o + 4)) >> 2]);
                  else n = L.subarray(r >> 2, (r + 8 * t) >> 2);
                  wu.uniform2iv(Li(e), n);
                }
              },
              cs = (e, t, r) => {
                wu.uniform2ui(Li(e), t, r);
              },
              ls = (e, t, r) => {
                t && wu.uniform2uiv(Li(e), R, r >> 2, 2 * t);
              },
              ds = (e, t, r, n) => {
                wu.uniform3f(Li(e), t, r, n);
              },
              hs = (e, t, r) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniform3fv(Li(e), B, r >> 2, 3 * t);
                else {
                  if (t <= 96)
                    for (var n = Qa[3 * t - 1], o = 0; o < 3 * t; o += 3)
                      (n[o] = B[(r + 4 * o) >> 2]),
                        (n[o + 1] = B[(r + (4 * o + 4)) >> 2]),
                        (n[o + 2] = B[(r + (4 * o + 8)) >> 2]);
                  else n = B.subarray(r >> 2, (r + 12 * t) >> 2);
                  wu.uniform3fv(Li(e), n);
                }
              },
              fs = (e, t, r, n) => {
                wu.uniform3i(Li(e), t, r, n);
              },
              ps = (e, t, r) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniform3iv(Li(e), L, r >> 2, 3 * t);
                else {
                  if (t <= 96)
                    for (var n = ts[3 * t - 1], o = 0; o < 3 * t; o += 3)
                      (n[o] = L[(r + 4 * o) >> 2]),
                        (n[o + 1] = L[(r + (4 * o + 4)) >> 2]),
                        (n[o + 2] = L[(r + (4 * o + 8)) >> 2]);
                  else n = L.subarray(r >> 2, (r + 12 * t) >> 2);
                  wu.uniform3iv(Li(e), n);
                }
              },
              ms = (e, t, r, n) => {
                wu.uniform3ui(Li(e), t, r, n);
              },
              gs = (e, t, r) => {
                t && wu.uniform3uiv(Li(e), R, r >> 2, 3 * t);
              },
              vs = (e, t, r, n, o) => {
                wu.uniform4f(Li(e), t, r, n, o);
              },
              ys = (e, t, r) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniform4fv(Li(e), B, r >> 2, 4 * t);
                else {
                  if (t <= 72) {
                    var n = Qa[4 * t - 1],
                      o = B;
                    r >>= 2;
                    for (var i = 0; i < 4 * t; i += 4) {
                      var a = r + i;
                      (n[i] = o[a]),
                        (n[i + 1] = o[a + 1]),
                        (n[i + 2] = o[a + 2]),
                        (n[i + 3] = o[a + 3]);
                    }
                  } else n = B.subarray(r >> 2, (r + 16 * t) >> 2);
                  wu.uniform4fv(Li(e), n);
                }
              },
              bs = (e, t, r, n, o) => {
                wu.uniform4i(Li(e), t, r, n, o);
              },
              ws = (e, t, r) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniform4iv(Li(e), L, r >> 2, 4 * t);
                else {
                  if (t <= 72)
                    for (var n = ts[4 * t - 1], o = 0; o < 4 * t; o += 4)
                      (n[o] = L[(r + 4 * o) >> 2]),
                        (n[o + 1] = L[(r + (4 * o + 4)) >> 2]),
                        (n[o + 2] = L[(r + (4 * o + 8)) >> 2]),
                        (n[o + 3] = L[(r + (4 * o + 12)) >> 2]);
                  else n = L.subarray(r >> 2, (r + 16 * t) >> 2);
                  wu.uniform4iv(Li(e), n);
                }
              },
              _s = (e, t, r, n, o) => {
                wu.uniform4ui(Li(e), t, r, n, o);
              },
              Es = (e, t, r) => {
                t && wu.uniform4uiv(Li(e), R, r >> 2, 4 * t);
              },
              Cs = (e, t, r) => {
                (e = mr.programs[e]), wu.uniformBlockBinding(e, t, r);
              },
              Ss = (e, t, r, n) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniformMatrix2fv(Li(e), !!r, B, n >> 2, 4 * t);
                else {
                  if (t <= 72)
                    for (var o = Qa[4 * t - 1], i = 0; i < 4 * t; i += 4)
                      (o[i] = B[(n + 4 * i) >> 2]),
                        (o[i + 1] = B[(n + (4 * i + 4)) >> 2]),
                        (o[i + 2] = B[(n + (4 * i + 8)) >> 2]),
                        (o[i + 3] = B[(n + (4 * i + 12)) >> 2]);
                  else o = B.subarray(n >> 2, (n + 16 * t) >> 2);
                  wu.uniformMatrix2fv(Li(e), !!r, o);
                }
              },
              ks = (e, t, r, n) => {
                t && wu.uniformMatrix2x3fv(Li(e), !!r, B, n >> 2, 6 * t);
              },
              xs = (e, t, r, n) => {
                t && wu.uniformMatrix2x4fv(Li(e), !!r, B, n >> 2, 8 * t);
              },
              Ts = (e, t, r, n) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniformMatrix3fv(Li(e), !!r, B, n >> 2, 9 * t);
                else {
                  if (t <= 32)
                    for (var o = Qa[9 * t - 1], i = 0; i < 9 * t; i += 9)
                      (o[i] = B[(n + 4 * i) >> 2]),
                        (o[i + 1] = B[(n + (4 * i + 4)) >> 2]),
                        (o[i + 2] = B[(n + (4 * i + 8)) >> 2]),
                        (o[i + 3] = B[(n + (4 * i + 12)) >> 2]),
                        (o[i + 4] = B[(n + (4 * i + 16)) >> 2]),
                        (o[i + 5] = B[(n + (4 * i + 20)) >> 2]),
                        (o[i + 6] = B[(n + (4 * i + 24)) >> 2]),
                        (o[i + 7] = B[(n + (4 * i + 28)) >> 2]),
                        (o[i + 8] = B[(n + (4 * i + 32)) >> 2]);
                  else o = B.subarray(n >> 2, (n + 36 * t) >> 2);
                  wu.uniformMatrix3fv(Li(e), !!r, o);
                }
              },
              As = (e, t, r, n) => {
                t && wu.uniformMatrix3x2fv(Li(e), !!r, B, n >> 2, 6 * t);
              },
              Ps = (e, t, r, n) => {
                t && wu.uniformMatrix3x4fv(Li(e), !!r, B, n >> 2, 12 * t);
              },
              Fs = (e, t, r, n) => {
                if (mr.currentContext.version >= 2)
                  t && wu.uniformMatrix4fv(Li(e), !!r, B, n >> 2, 16 * t);
                else {
                  if (t <= 18) {
                    var o = Qa[16 * t - 1],
                      i = B;
                    n >>= 2;
                    for (var a = 0; a < 16 * t; a += 16) {
                      var s = n + a;
                      (o[a] = i[s]),
                        (o[a + 1] = i[s + 1]),
                        (o[a + 2] = i[s + 2]),
                        (o[a + 3] = i[s + 3]),
                        (o[a + 4] = i[s + 4]),
                        (o[a + 5] = i[s + 5]),
                        (o[a + 6] = i[s + 6]),
                        (o[a + 7] = i[s + 7]),
                        (o[a + 8] = i[s + 8]),
                        (o[a + 9] = i[s + 9]),
                        (o[a + 10] = i[s + 10]),
                        (o[a + 11] = i[s + 11]),
                        (o[a + 12] = i[s + 12]),
                        (o[a + 13] = i[s + 13]),
                        (o[a + 14] = i[s + 14]),
                        (o[a + 15] = i[s + 15]);
                    }
                  } else o = B.subarray(n >> 2, (n + 64 * t) >> 2);
                  wu.uniformMatrix4fv(Li(e), !!r, o);
                }
              },
              Ls = (e, t, r, n) => {
                t && wu.uniformMatrix4x2fv(Li(e), !!r, B, n >> 2, 8 * t);
              },
              Rs = (e, t, r, n) => {
                t && wu.uniformMatrix4x3fv(Li(e), !!r, B, n >> 2, 12 * t);
              },
              Bs = (e) => {
                (e = mr.programs[e]), wu.useProgram(e), (wu.currentProgram = e);
              },
              Ds = (e) => {
                wu.validateProgram(mr.programs[e]);
              },
              Ms = function (e, t) {
                wu.vertexAttrib1f(e, t);
              },
              Os = (e, t) => {
                wu.vertexAttrib1f(e, B[t >> 2]);
              },
              Is = function (e, t, r) {
                wu.vertexAttrib2f(e, t, r);
              },
              js = (e, t) => {
                wu.vertexAttrib2f(e, B[t >> 2], B[(t + 4) >> 2]);
              },
              Us = function (e, t, r, n) {
                wu.vertexAttrib3f(e, t, r, n);
              },
              $s = (e, t) => {
                wu.vertexAttrib3f(
                  e,
                  B[t >> 2],
                  B[(t + 4) >> 2],
                  B[(t + 8) >> 2]
                );
              },
              qs = function (e, t, r, n, o) {
                wu.vertexAttrib4f(e, t, r, n, o);
              },
              Hs = (e, t) => {
                wu.vertexAttrib4f(
                  e,
                  B[t >> 2],
                  B[(t + 4) >> 2],
                  B[(t + 8) >> 2],
                  B[(t + 12) >> 2]
                );
              },
              Ns = (e, t) => {
                wu.vertexAttribDivisor(e, t);
              },
              Vs = Ns,
              zs = Ns,
              Ws = Ns,
              Gs = Ns,
              Xs = Ns,
              Ys = function (e, t, r, n, o) {
                wu.vertexAttribI4i(e, t, r, n, o);
              },
              Ks = (e, t) => {
                wu.vertexAttribI4i(
                  e,
                  L[t >> 2],
                  L[(t + 4) >> 2],
                  L[(t + 8) >> 2],
                  L[(t + 12) >> 2]
                );
              },
              Zs = function (e, t, r, n, o) {
                wu.vertexAttribI4ui(e, t, r, n, o);
              },
              Qs = (e, t) => {
                wu.vertexAttribI4ui(
                  e,
                  R[t >> 2],
                  R[(t + 4) >> 2],
                  R[(t + 8) >> 2],
                  R[(t + 12) >> 2]
                );
              },
              Js = (e, t, r, n, o) => {
                wu.vertexAttribIPointer(e, t, r, n, o);
              },
              eu = (e, t, r, n, o, i) => {
                wu.vertexAttribPointer(e, t, r, !!n, o, i);
              },
              tu = function (e, t, r, n) {
                wu.viewport(e, t, r, n);
              },
              ru = (e, t, r) => {
                (r = Number(r)), wu.waitSync(mr.syncs[e], t, r);
              },
              nu = (e) => {
                var t = (e - C.buffer.byteLength + 65535) / 65536;
                try {
                  return C.grow(t), U(), 1;
                } catch (e) {}
              },
              ou = {
                removeAllEventListeners() {
                  for (; ou.eventHandlers.length; )
                    ou._removeHandler(ou.eventHandlers.length - 1);
                  ou.deferredCalls = [];
                },
                inEventHandler: 0,
                deferredCalls: [],
                deferCall(e, t, r) {
                  function n(e, t) {
                    if (e.length != t.length) return !1;
                    for (var r in e) if (e[r] != t[r]) return !1;
                    return !0;
                  }
                  for (var o in ou.deferredCalls) {
                    var i = ou.deferredCalls[o];
                    if (i.targetFunction == e && n(i.argsList, r)) return;
                  }
                  ou.deferredCalls.push({
                    targetFunction: e,
                    precedence: t,
                    argsList: r,
                  }),
                    ou.deferredCalls.sort(
                      (e, t) => e.precedence < t.precedence
                    );
                },
                removeDeferredCalls(e) {
                  for (var t = 0; t < ou.deferredCalls.length; ++t)
                    ou.deferredCalls[t].targetFunction == e &&
                      (ou.deferredCalls.splice(t, 1), --t);
                },
                canPerformEventHandlerRequests: () =>
                  navigator.userActivation
                    ? navigator.userActivation.isActive
                    : ou.inEventHandler &&
                      ou.currentEventHandler.allowsDeferredCalls,
                runDeferredCalls() {
                  if (ou.canPerformEventHandlerRequests())
                    for (var e = 0; e < ou.deferredCalls.length; ++e) {
                      var t = ou.deferredCalls[e];
                      ou.deferredCalls.splice(e, 1),
                        --e,
                        t.targetFunction.apply(null, t.argsList);
                    }
                },
                eventHandlers: [],
                removeAllHandlersOnTarget: (e, t) => {
                  for (var r = 0; r < ou.eventHandlers.length; ++r)
                    ou.eventHandlers[r].target != e ||
                      (t && t != ou.eventHandlers[r].eventTypeString) ||
                      ou._removeHandler(r--);
                },
                _removeHandler(e) {
                  var t = ou.eventHandlers[e];
                  t.target.removeEventListener(
                    t.eventTypeString,
                    t.eventListenerFunc,
                    t.useCapture
                  ),
                    ou.eventHandlers.splice(e, 1);
                },
                registerOrRemoveHandler(e) {
                  if (!e.target) return -4;
                  if (e.callbackfunc)
                    (e.eventListenerFunc = function (t) {
                      ++ou.inEventHandler,
                        (ou.currentEventHandler = e),
                        ou.runDeferredCalls(),
                        e.handlerFunc(t),
                        ou.runDeferredCalls(),
                        --ou.inEventHandler;
                    }),
                      e.target.addEventListener(
                        e.eventTypeString,
                        e.eventListenerFunc,
                        e.useCapture
                      ),
                      ou.eventHandlers.push(e);
                  else
                    for (var t = 0; t < ou.eventHandlers.length; ++t)
                      ou.eventHandlers[t].target == e.target &&
                        ou.eventHandlers[t].eventTypeString ==
                          e.eventTypeString &&
                        ou._removeHandler(t--);
                  return 0;
                },
                getNodeNameForTarget: (e) =>
                  e
                    ? e == window
                      ? "#window"
                      : e == screen
                      ? "#screen"
                      : e?.nodeName || ""
                    : "",
                fullscreenEnabled: () =>
                  document.fullscreenEnabled ||
                  document.webkitFullscreenEnabled,
              },
              iu = ["default", "low-power", "high-performance"],
              au = [
                0,
                "undefined" != typeof document ? document : 0,
                "undefined" != typeof window ? window : 0,
              ],
              su = (e) => {
                var t;
                return (
                  (e = (t = e) > 2 ? ke(t) : t),
                  au[e] ||
                    ("undefined" != typeof document
                      ? document.querySelector(e)
                      : void 0)
                );
              },
              uu = (e, t) => {
                var r = t >> 2,
                  n = L[r + 6],
                  o = {
                    alpha: !!L[r + 0],
                    depth: !!L[r + 1],
                    stencil: !!L[r + 2],
                    antialias: !!L[r + 3],
                    premultipliedAlpha: !!L[r + 4],
                    preserveDrawingBuffer: !!L[r + 5],
                    powerPreference: iu[n],
                    failIfMajorPerformanceCaveat: !!L[r + 7],
                    majorVersion: L[r + 8],
                    minorVersion: L[r + 9],
                    enableExtensionsByDefault: L[r + 10],
                    explicitSwapControl: L[r + 11],
                    proxyContextToMainThread: L[r + 12],
                    renderViaOffscreenBackBuffer: L[r + 13],
                  },
                  i = su(e);
                return i
                  ? o.explicitSwapControl
                    ? 0
                    : mr.createContext(i, o)
                  : 0;
              },
              cu = {},
              lu = () => {
                if (!lu.strings) {
                  var e = {
                    USER: "web_user",
                    LOGNAME: "web_user",
                    PATH: "/",
                    PWD: "/",
                    HOME: "/home/web_user",
                    LANG:
                      (
                        ("object" == typeof navigator &&
                          navigator.languages &&
                          navigator.languages[0]) ||
                        "C"
                      ).replace("-", "_") + ".UTF-8",
                    _: p || "./this.program",
                  };
                  for (var t in cu)
                    void 0 === cu[t] ? delete e[t] : (e[t] = cu[t]);
                  var r = [];
                  for (var t in e) r.push(`${t}=${e[t]}`);
                  lu.strings = r;
                }
                return lu.strings;
              },
              du = (e, t, r, n) => {
                for (var o = 0, i = 0; i < r; i++) {
                  var a = R[t >> 2],
                    s = R[(t + 4) >> 2];
                  t += 8;
                  var u = Se.read(e, T, a, s, n);
                  if (u < 0) return -1;
                  if (((o += u), u < s)) break;
                  void 0 !== n && (n += u);
                }
                return o;
              },
              hu = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
              fu = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
              pu = (e, t) => {
                T.set(e, t);
              },
              mu = (e, t, r, n) => {
                var o = R[(n + 40) >> 2],
                  i = {
                    tm_sec: L[n >> 2],
                    tm_min: L[(n + 4) >> 2],
                    tm_hour: L[(n + 8) >> 2],
                    tm_mday: L[(n + 12) >> 2],
                    tm_mon: L[(n + 16) >> 2],
                    tm_year: L[(n + 20) >> 2],
                    tm_wday: L[(n + 24) >> 2],
                    tm_yday: L[(n + 28) >> 2],
                    tm_isdst: L[(n + 32) >> 2],
                    tm_gmtoff: L[(n + 36) >> 2],
                    tm_zone: o ? ke(o) : "",
                  },
                  a = ke(r),
                  s = {
                    "%c": "%a %b %d %H:%M:%S %Y",
                    "%D": "%m/%d/%y",
                    "%F": "%Y-%m-%d",
                    "%h": "%b",
                    "%r": "%I:%M:%S %p",
                    "%R": "%H:%M",
                    "%T": "%H:%M:%S",
                    "%x": "%m/%d/%y",
                    "%X": "%H:%M:%S",
                    "%Ec": "%c",
                    "%EC": "%C",
                    "%Ex": "%m/%d/%y",
                    "%EX": "%H:%M:%S",
                    "%Ey": "%y",
                    "%EY": "%Y",
                    "%Od": "%d",
                    "%Oe": "%e",
                    "%OH": "%H",
                    "%OI": "%I",
                    "%Om": "%m",
                    "%OM": "%M",
                    "%OS": "%S",
                    "%Ou": "%u",
                    "%OU": "%U",
                    "%OV": "%V",
                    "%Ow": "%w",
                    "%OW": "%W",
                    "%Oy": "%y",
                  };
                for (var u in s) a = a.replace(new RegExp(u, "g"), s[u]);
                var c = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  l = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ];
                function d(e, t, r) {
                  for (
                    var n = "number" == typeof e ? e.toString() : e || "";
                    n.length < t;

                  )
                    n = r[0] + n;
                  return n;
                }
                function h(e, t) {
                  return d(e, t, "0");
                }
                function f(e, t) {
                  function r(e) {
                    return e < 0 ? -1 : e > 0 ? 1 : 0;
                  }
                  var n;
                  return (
                    0 === (n = r(e.getFullYear() - t.getFullYear())) &&
                      0 === (n = r(e.getMonth() - t.getMonth())) &&
                      (n = r(e.getDate() - t.getDate())),
                    n
                  );
                }
                function p(e) {
                  switch (e.getDay()) {
                    case 0:
                      return new Date(e.getFullYear() - 1, 11, 29);
                    case 1:
                      return e;
                    case 2:
                      return new Date(e.getFullYear(), 0, 3);
                    case 3:
                      return new Date(e.getFullYear(), 0, 2);
                    case 4:
                      return new Date(e.getFullYear(), 0, 1);
                    case 5:
                      return new Date(e.getFullYear() - 1, 11, 31);
                    case 6:
                      return new Date(e.getFullYear() - 1, 11, 30);
                  }
                }
                function m(e) {
                  var t = ((e, t) => {
                      for (var r = new Date(e.getTime()); t > 0; ) {
                        var n = tr(r.getFullYear()),
                          o = r.getMonth(),
                          i = (n ? hu : fu)[o];
                        if (!(t > i - r.getDate()))
                          return r.setDate(r.getDate() + t), r;
                        (t -= i - r.getDate() + 1),
                          r.setDate(1),
                          o < 11
                            ? r.setMonth(o + 1)
                            : (r.setMonth(0),
                              r.setFullYear(r.getFullYear() + 1));
                      }
                      return r;
                    })(new Date(e.tm_year + 1900, 0, 1), e.tm_yday),
                    r = new Date(t.getFullYear(), 0, 4),
                    n = new Date(t.getFullYear() + 1, 0, 4),
                    o = p(r),
                    i = p(n);
                  return f(o, t) <= 0
                    ? f(i, t) <= 0
                      ? t.getFullYear() + 1
                      : t.getFullYear()
                    : t.getFullYear() - 1;
                }
                var g = {
                  "%a": (e) => c[e.tm_wday].substring(0, 3),
                  "%A": (e) => c[e.tm_wday],
                  "%b": (e) => l[e.tm_mon].substring(0, 3),
                  "%B": (e) => l[e.tm_mon],
                  "%C": (e) => h(((e.tm_year + 1900) / 100) | 0, 2),
                  "%d": (e) => h(e.tm_mday, 2),
                  "%e": (e) => d(e.tm_mday, 2, " "),
                  "%g": (e) => m(e).toString().substring(2),
                  "%G": m,
                  "%H": (e) => h(e.tm_hour, 2),
                  "%I": (e) => {
                    var t = e.tm_hour;
                    return 0 == t ? (t = 12) : t > 12 && (t -= 12), h(t, 2);
                  },
                  "%j": (e) =>
                    h(
                      e.tm_mday +
                        ((e, t) => {
                          for (var r = 0, n = 0; n <= t; r += e[n++]);
                          return r;
                        })(tr(e.tm_year + 1900) ? hu : fu, e.tm_mon - 1),
                      3
                    ),
                  "%m": (e) => h(e.tm_mon + 1, 2),
                  "%M": (e) => h(e.tm_min, 2),
                  "%n": () => "\n",
                  "%p": (e) => (e.tm_hour >= 0 && e.tm_hour < 12 ? "AM" : "PM"),
                  "%S": (e) => h(e.tm_sec, 2),
                  "%t": () => "\t",
                  "%u": (e) => e.tm_wday || 7,
                  "%U": (e) => {
                    var t = e.tm_yday + 7 - e.tm_wday;
                    return h(Math.floor(t / 7), 2);
                  },
                  "%V": (e) => {
                    var t = Math.floor(
                      (e.tm_yday + 7 - ((e.tm_wday + 6) % 7)) / 7
                    );
                    if (
                      ((e.tm_wday + 371 - e.tm_yday - 2) % 7 <= 2 && t++, t)
                    ) {
                      if (53 == t) {
                        var r = (e.tm_wday + 371 - e.tm_yday) % 7;
                        4 == r || (3 == r && tr(e.tm_year)) || (t = 1);
                      }
                    } else {
                      t = 52;
                      var n = (e.tm_wday + 7 - e.tm_yday - 1) % 7;
                      (4 == n || (5 == n && tr((e.tm_year % 400) - 1))) && t++;
                    }
                    return h(t, 2);
                  },
                  "%w": (e) => e.tm_wday,
                  "%W": (e) => {
                    var t = e.tm_yday + 7 - ((e.tm_wday + 6) % 7);
                    return h(Math.floor(t / 7), 2);
                  },
                  "%y": (e) => (e.tm_year + 1900).toString().substring(2),
                  "%Y": (e) => e.tm_year + 1900,
                  "%z": (e) => {
                    var t = e.tm_gmtoff,
                      r = t >= 0;
                    return (
                      (t = ((t = Math.abs(t) / 60) / 60) * 100 + (t % 60)),
                      (r ? "+" : "-") + String("0000" + t).slice(-4)
                    );
                  },
                  "%Z": (e) => e.tm_zone,
                  "%%": () => "%",
                };
                for (var u in ((a = a.replace(/%%/g, "\0\0")), g))
                  a.includes(u) && (a = a.replace(new RegExp(u, "g"), g[u](i)));
                var v = ye((a = a.replace(/\0\0/g, "%")), !1);
                return v.length > t ? 0 : (pu(v, e), v.length - 1);
              },
              gu = (e) => {
                var t = ge(e) + 1,
                  r = $u(t);
                return $t(e, r, t), r;
              },
              vu = function (e, t, r, n) {
                e || (e = this),
                  (this.parent = e),
                  (this.mount = e.mount),
                  (this.mounted = null),
                  (this.id = Se.nextInode++),
                  (this.name = t),
                  (this.mode = r),
                  (this.node_ops = {}),
                  (this.stream_ops = {}),
                  (this.rdev = n);
              },
              yu = 365,
              bu = 146;
            Object.defineProperties(vu.prototype, {
              read: {
                get: function () {
                  return (this.mode & yu) === yu;
                },
                set: function (e) {
                  e ? (this.mode |= yu) : (this.mode &= -366);
                },
              },
              write: {
                get: function () {
                  return (this.mode & bu) === bu;
                },
                set: function (e) {
                  e ? (this.mode |= bu) : (this.mode &= -147);
                },
              },
              isFolder: {
                get: function () {
                  return Se.isDir(this.mode);
                },
              },
              isDevice: {
                get: function () {
                  return Se.isChrdev(this.mode);
                },
              },
            }),
              (Se.FSNode = vu),
              (Se.createPreloadedFile = (e, t, r, n, o, i, a, s, u, c) => {
                var d = t ? he.resolve(le.join2(e, t)) : e;
                function h(r) {
                  function l(r) {
                    c?.(),
                      s ||
                        ((e, t, r, n, o, i) => {
                          Se.createDataFile(e, t, r, n, o, i);
                        })(e, t, r, n, o, u),
                      i?.(),
                      Y();
                  }
                  ((e, t, r, n) => {
                    void 0 !== fr && fr.init();
                    var o = !1;
                    return (
                      Ee.forEach((i) => {
                        o ||
                          (i.canHandle(t) && (i.handle(e, t, r, n), (o = !0)));
                      }),
                      o
                    );
                  })(r, d, l, () => {
                    a?.(), Y();
                  }) || l(r);
                }
                X(),
                  "string" == typeof r
                    ? ((e, t, r, n) => {
                        var o = n ? "" : `al ${e}`;
                        l(
                          e,
                          (e) => {
                            t(new Uint8Array(e)), o && Y();
                          },
                          (t) => {
                            if (!r) throw `Loading data file "${e}" failed.`;
                            r();
                          }
                        ),
                          o && X();
                      })(r, h, a)
                    : h(r);
              }),
              Se.staticInit(),
              (u.FS_createPath = Se.createPath),
              (u.FS_createDataFile = Se.createDataFile),
              (u.FS_createPreloadedFile = Se.createPreloadedFile),
              (u.FS_unlink = Se.unlink),
              (u.FS_createLazyFile = Se.createLazyFile),
              (u.FS_createDevice = Se.createDevice),
              (Fe = u.InternalError =
                class InternalError extends Error {
                  constructor(e) {
                    super(e), (this.name = "InternalError");
                  }
                }),
              (() => {
                for (var e = new Array(256), t = 0; t < 256; ++t)
                  e[t] = String.fromCharCode(t);
                Le = e;
              })(),
              (Re = u.BindingError =
                class BindingError extends Error {
                  constructor(e) {
                    super(e), (this.name = "BindingError");
                  }
                }),
              Object.assign(ut.prototype, {
                isAliasOf(e) {
                  if (!(this instanceof ut)) return !1;
                  if (!(e instanceof ut)) return !1;
                  var t = this.$$.ptrType.registeredClass,
                    r = this.$$.ptr;
                  e.$$ = e.$$;
                  for (
                    var n = e.$$.ptrType.registeredClass, o = e.$$.ptr;
                    t.baseClass;

                  )
                    (r = t.upcast(r)), (t = t.baseClass);
                  for (; n.baseClass; ) (o = n.upcast(o)), (n = n.baseClass);
                  return t === n && r === o;
                },
                clone() {
                  if (
                    (this.$$.ptr || We(this), this.$$.preservePointerOnDelete)
                  )
                    return (this.$$.count.value += 1), this;
                  var e,
                    t = st(
                      Object.create(Object.getPrototypeOf(this), {
                        $$: {
                          value:
                            ((e = this.$$),
                            {
                              count: e.count,
                              deleteScheduled: e.deleteScheduled,
                              preservePointerOnDelete:
                                e.preservePointerOnDelete,
                              ptr: e.ptr,
                              ptrType: e.ptrType,
                              smartPtr: e.smartPtr,
                              smartPtrType: e.smartPtrType,
                            }),
                        },
                      })
                    );
                  return (
                    (t.$$.count.value += 1), (t.$$.deleteScheduled = !1), t
                  );
                },
                delete() {
                  this.$$.ptr || We(this),
                    this.$$.deleteScheduled &&
                      !this.$$.preservePointerOnDelete &&
                      qe("Object already scheduled for deletion"),
                    Xe(this),
                    Ye(this.$$),
                    this.$$.preservePointerOnDelete ||
                      ((this.$$.smartPtr = void 0), (this.$$.ptr = void 0));
                },
                isDeleted() {
                  return !this.$$.ptr;
                },
                deleteLater() {
                  return (
                    this.$$.ptr || We(this),
                    this.$$.deleteScheduled &&
                      !this.$$.preservePointerOnDelete &&
                      qe("Object already scheduled for deletion"),
                    et.push(this),
                    1 === et.length && Ne && Ne(tt),
                    (this.$$.deleteScheduled = !0),
                    this
                  );
                },
              }),
              (u.getInheritedInstanceCount = Qe),
              (u.getLiveInheritedInstances = Je),
              (u.flushPendingDeletes = tt),
              (u.setDelayFunction = rt),
              Object.assign(yt.prototype, {
                getPointee(e) {
                  return this.rawGetPointee && (e = this.rawGetPointee(e)), e;
                },
                destructor(e) {
                  this.rawDestructor?.(e);
                },
                argPackAdvance: ze,
                readValueFromPointer: vt,
                fromWireType: at,
              }),
              (_t = u.UnboundTypeError =
                ((ko = Error),
                ((To = ct((xo = "UnboundTypeError"), function (e) {
                  (this.name = xo), (this.message = e);
                  var t = new Error(e).stack;
                  void 0 !== t &&
                    (this.stack =
                      this.toString() +
                      "\n" +
                      t.replace(/^Error(:[^\n]*)?\n/, ""));
                })).prototype = Object.create(ko.prototype)),
                (To.prototype.constructor = To),
                (To.prototype.toString = function () {
                  return void 0 === this.message
                    ? this.name
                    : `${this.name}: ${this.message}`;
                }),
                To)),
              Rt.allocated.push(
                { value: void 0 },
                { value: null },
                { value: !0 },
                { value: !1 }
              ),
              Object.assign(Rt, { reserved: Rt.allocated.length }),
              (u.count_emval_handles = Dt),
              (u.requestFullscreen = fr.requestFullscreen),
              (u.requestAnimationFrame = fr.requestAnimationFrame),
              (u.setCanvasSize = fr.setCanvasSize),
              (u.pauseMainLoop = fr.mainLoop.pause),
              (u.resumeMainLoop = fr.mainLoop.resume),
              (u.getUserMedia = fr.getUserMedia),
              (u.createContext = fr.createContext);
            for (var wu, _u = {}, Eu = {}, Cu = 0; Cu < 32; ++Cu)
              qn.push(new Array(Cu));
            var Su = new Float32Array(288);
            for (Cu = 0; Cu < 288; ++Cu) Qa[Cu] = Su.subarray(0, Cu + 1);
            var ku = new Int32Array(288);
            for (Cu = 0; Cu < 288; ++Cu) ts[Cu] = ku.subarray(0, Cu + 1);
            var xu,
              Tu = {
                Qa: (e) => {
                  var t = new ExceptionInfo(e);
                  return (
                    t.get_caught() || t.set_caught(!0),
                    t.set_rethrown(!1),
                    se.push(t),
                    Hu(t.excPtr),
                    t.get_exception_ptr()
                  );
                },
                Pa: () => {
                  Iu(0, 0);
                  var e = se.pop();
                  qu(e.excPtr), (ue = 0);
                },
                o: () => ce([]),
                ca: (e) => ce([e]),
                l: (e, t, r) => {
                  throw (new ExceptionInfo(e).init(t, r), (ue = e));
                },
                O: (e) => {
                  throw (ue || (ue = e), ue);
                },
                Ib: function (e, t) {
                  try {
                    return (e = xe.getStr(e)), Se.chmod(e, t), 0;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                Jb: function (e, t) {
                  try {
                    return Se.fchmod(e, t), 0;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                ia: function (e, t, r) {
                  xe.varargs = r;
                  try {
                    var n = xe.getStreamFromFD(e);
                    switch (t) {
                      case 0:
                        if ((o = xe.get()) < 0) return -28;
                        for (; Se.streams[o]; ) o++;
                        return Se.createStream(n, o).fd;
                      case 1:
                      case 2:
                      case 13:
                      case 14:
                        return 0;
                      case 3:
                        return n.flags;
                      case 4:
                        var o = xe.get();
                        return (n.flags |= o), 0;
                      case 12:
                        return (o = xe.getp()), (P[(o + 0) >> 1] = 2), 0;
                    }
                    return -28;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                Hb: function (e, t) {
                  try {
                    var r = xe.getStreamFromFD(e);
                    return xe.doStat(Se.stat, r.path, t);
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                Mb: function (e, t, r) {
                  xe.varargs = r;
                  try {
                    var n = xe.getStreamFromFD(e);
                    switch (t) {
                      case 21509:
                      case 21510:
                      case 21511:
                      case 21512:
                      case 21524:
                      case 21515:
                        return n.tty ? 0 : -59;
                      case 21505:
                        if (!n.tty) return -59;
                        if (n.tty.ops.ioctl_tcgets) {
                          var o = n.tty.ops.ioctl_tcgets(n),
                            i = xe.getp();
                          (L[i >> 2] = o.c_iflag || 0),
                            (L[(i + 4) >> 2] = o.c_oflag || 0),
                            (L[(i + 8) >> 2] = o.c_cflag || 0),
                            (L[(i + 12) >> 2] = o.c_lflag || 0);
                          for (var a = 0; a < 32; a++)
                            T[(i + a + 17) >> 0] = o.c_cc[a] || 0;
                          return 0;
                        }
                        return 0;
                      case 21506:
                      case 21507:
                      case 21508:
                        if (!n.tty) return -59;
                        if (n.tty.ops.ioctl_tcsets) {
                          i = xe.getp();
                          var s = L[i >> 2],
                            u = L[(i + 4) >> 2],
                            c = L[(i + 8) >> 2],
                            l = L[(i + 12) >> 2],
                            d = [];
                          for (a = 0; a < 32; a++) d.push(T[(i + a + 17) >> 0]);
                          return n.tty.ops.ioctl_tcsets(n.tty, t, {
                            c_iflag: s,
                            c_oflag: u,
                            c_cflag: c,
                            c_lflag: l,
                            c_cc: d,
                          });
                        }
                        return 0;
                      case 21519:
                        return n.tty
                          ? ((i = xe.getp()), (L[i >> 2] = 0), 0)
                          : -59;
                      case 21520:
                        return n.tty ? -28 : -59;
                      case 21531:
                        return (i = xe.getp()), Se.ioctl(n, t, i);
                      case 21523:
                        if (!n.tty) return -59;
                        if (n.tty.ops.ioctl_tiocgwinsz) {
                          var h = n.tty.ops.ioctl_tiocgwinsz(n.tty);
                          (i = xe.getp()),
                            (P[i >> 1] = h[0]),
                            (P[(i + 2) >> 1] = h[1]);
                        }
                        return 0;
                      default:
                        return -28;
                    }
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                Fb: function (e, t) {
                  try {
                    return (e = xe.getStr(e)), xe.doStat(Se.lstat, e, t);
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                Db: function (e, t, r, n) {
                  try {
                    t = xe.getStr(t);
                    var o = 256 & n,
                      i = 4096 & n;
                    return (
                      (n &= -6401),
                      (t = xe.calculateAt(e, t, i)),
                      xe.doStat(o ? Se.lstat : Se.stat, t, r)
                    );
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                va: function (e, t, r, n) {
                  xe.varargs = n;
                  try {
                    (t = xe.getStr(t)), (t = xe.calculateAt(e, t));
                    var o = n ? xe.get() : 0;
                    return Se.open(t, r, o).fd;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                rb: function (e, t, r, n) {
                  try {
                    return (
                      (t = xe.getStr(t)),
                      (n = xe.getStr(n)),
                      (t = xe.calculateAt(e, t)),
                      (n = xe.calculateAt(r, n)),
                      Se.rename(t, n),
                      0
                    );
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                sb: function (e) {
                  try {
                    return (e = xe.getStr(e)), Se.rmdir(e), 0;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                Gb: function (e, t) {
                  try {
                    return (e = xe.getStr(e)), xe.doStat(Se.stat, e, t);
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                tb: function (e, t, r) {
                  try {
                    return (
                      (t = xe.getStr(t)),
                      (t = xe.calculateAt(e, t)),
                      0 === r
                        ? Se.unlink(t)
                        : 512 === r
                        ? Se.rmdir(t)
                        : K("Invalid flags passed to unlinkat"),
                      0
                    );
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                Ba: (e) => {
                  var t = Te[e];
                  delete Te[e];
                  var r = t.elements,
                    n = r.length,
                    o = r
                      .map((e) => e.getterReturnType)
                      .concat(r.map((e) => e.setterArgumentType)),
                    i = t.rawConstructor,
                    a = t.rawDestructor;
                  Ie([e], o, function (e) {
                    return (
                      r.forEach((t, r) => {
                        var o = e[r],
                          i = t.getter,
                          a = t.getterContext,
                          s = e[r + n],
                          u = t.setter,
                          c = t.setterContext;
                        (t.read = (e) => o.fromWireType(i(a, e))),
                          (t.write = (e, t) => {
                            var r = [];
                            u(c, e, s.toWireType(r, t)), Ae(r);
                          });
                      }),
                      [
                        {
                          name: t.name,
                          fromWireType: (e) => {
                            for (var t = new Array(n), o = 0; o < n; ++o)
                              t[o] = r[o].read(e);
                            return a(e), t;
                          },
                          toWireType: (e, o) => {
                            if (n !== o.length)
                              throw new TypeError(
                                `Incorrect number of tuple elements for ${t.name}: expected=${n}, actual=${o.length}`
                              );
                            for (var s = i(), u = 0; u < n; ++u)
                              r[u].write(s, o[u]);
                            return null !== e && e.push(a, s), s;
                          },
                          argPackAdvance: ze,
                          readValueFromPointer: Pe,
                          destructorFunction: a,
                        },
                      ]
                    );
                  });
                },
                A: (e) => {
                  var t = je[e];
                  delete je[e];
                  var r = t.rawConstructor,
                    n = t.rawDestructor,
                    o = t.fields,
                    i = o
                      .map((e) => e.getterReturnType)
                      .concat(o.map((e) => e.setterArgumentType));
                  Ie([e], i, (e) => {
                    var i = {};
                    return (
                      o.forEach((t, r) => {
                        var n = t.fieldName,
                          a = e[r],
                          s = t.getter,
                          u = t.getterContext,
                          c = e[r + o.length],
                          l = t.setter,
                          d = t.setterContext;
                        i[n] = {
                          read: (e) => a.fromWireType(s(u, e)),
                          write: (e, t) => {
                            var r = [];
                            l(d, e, c.toWireType(r, t)), Ae(r);
                          },
                        };
                      }),
                      [
                        {
                          name: t.name,
                          fromWireType: (e) => {
                            var t = {};
                            for (var r in i) t[r] = i[r].read(e);
                            return n(e), t;
                          },
                          toWireType: (e, t) => {
                            for (var o in i)
                              if (!(o in t))
                                throw new TypeError(`Missing field: "${o}"`);
                            var a = r();
                            for (o in i) i[o].write(a, t[o]);
                            return null !== e && e.push(n, a), a;
                          },
                          argPackAdvance: ze,
                          readValueFromPointer: Pe,
                          destructorFunction: n,
                        },
                      ]
                    );
                  });
                },
                Ea: (e, t, r, n, o) => {
                  var i = -1 != (t = $e(t)).indexOf("u");
                  He(e, {
                    name: t,
                    fromWireType: (e) => e,
                    toWireType: function (e, t) {
                      if ("bigint" != typeof t && "number" != typeof t)
                        throw new TypeError(
                          `Cannot convert "${Ue(t)}" to ${this.name}`
                        );
                      return "number" == typeof t && (t = BigInt(t)), t;
                    },
                    argPackAdvance: ze,
                    readValueFromPointer: Ve(t, r, !i),
                    destructorFunction: null,
                  });
                },
                ue: (e, t, r, n) => {
                  He(e, {
                    name: (t = $e(t)),
                    fromWireType: function (e) {
                      return !!e;
                    },
                    toWireType: function (e, t) {
                      return t ? r : n;
                    },
                    argPackAdvance: ze,
                    readValueFromPointer: function (e) {
                      return this.fromWireType(A[e]);
                    },
                    destructorFunction: null,
                  });
                },
                v: (e, t, r, n, o, i, a, s, u, c, l, d, h) => {
                  (l = $e(l)),
                    (i = kt(o, i)),
                    (s &&= kt(a, s)),
                    (c &&= kt(u, c)),
                    (h = kt(d, h));
                  var f = ((e) => {
                    if (void 0 === e) return "_unknown";
                    var t = (e = e.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(
                      0
                    );
                    return t >= 48 && t <= 57 ? `_${e}` : e;
                  })(l);
                  dt(f, function () {
                    Tt(`Cannot construct ${l} due to unbound types`, [n]);
                  }),
                    Ie([e, t, r], n ? [n] : [], function (t) {
                      var r, o;
                      (t = t[0]),
                        (o = n
                          ? (r = t.registeredClass).instancePrototype
                          : ut.prototype);
                      var a = ct(l, function () {
                          if (Object.getPrototypeOf(this) !== u)
                            throw new Re("Use 'new' to construct " + l);
                          if (void 0 === d.constructor_body)
                            throw new Re(l + " has no accessible constructor");
                          var e = d.constructor_body[arguments.length];
                          if (void 0 === e)
                            throw new Re(
                              `Tried to invoke ctor of ${l} with invalid number of parameters (${
                                arguments.length
                              }) - expected (${Object.keys(
                                d.constructor_body
                              ).toString()}) parameters instead!`
                            );
                          return e.apply(this, arguments);
                        }),
                        u = Object.create(o, { constructor: { value: a } });
                      a.prototype = u;
                      var d = new ht(l, a, u, h, r, i, s, c);
                      d.baseClass &&
                        ((d.baseClass.__derivedClasses ??= []),
                        d.baseClass.__derivedClasses.push(d));
                      var p = new yt(l, d, !0, !1, !1),
                        m = new yt(l + "*", d, !1, !1, !1),
                        g = new yt(l + " const*", d, !1, !0, !1);
                      return (
                        (Ze[e] = { pointerType: m, constPointerType: g }),
                        Et(f, a),
                        [p, m, g]
                      );
                    });
                },
                x: (e, t, r, n, o, i) => {
                  var a = At(t, r);
                  (o = kt(n, o)),
                    Ie([], [e], function (e) {
                      var r = `constructor ${(e = e[0]).name}`;
                      if (
                        (void 0 === e.registeredClass.constructor_body &&
                          (e.registeredClass.constructor_body = []),
                        void 0 !== e.registeredClass.constructor_body[t - 1])
                      )
                        throw new Re(
                          `Cannot register multiple constructors with identical number of parameters (${
                            t - 1
                          }) for class '${
                            e.name
                          }'! Overload resolution is currently only performed using the parameter count, not actual type info!`
                        );
                      return (
                        (e.registeredClass.constructor_body[t - 1] = () => {
                          Tt(
                            `Cannot construct ${e.name} due to unbound types`,
                            a
                          );
                        }),
                        Ie(
                          [],
                          a,
                          (n) => (
                            n.splice(1, 0, null),
                            (e.registeredClass.constructor_body[t - 1] = Pt(
                              r,
                              n,
                              null,
                              o,
                              i
                            )),
                            []
                          )
                        ),
                        []
                      );
                    });
                },
                d: (e, t, r, n, o, i, a, s, u) => {
                  var c = At(r, n);
                  (t = $e(t)),
                    (t = Lt(t)),
                    (i = kt(o, i)),
                    Ie([], [e], function (e) {
                      var n = `${(e = e[0]).name}.${t}`;
                      function o() {
                        Tt(`Cannot call ${n} due to unbound types`, c);
                      }
                      t.startsWith("@@") && (t = Symbol[t.substring(2)]),
                        s && e.registeredClass.pureVirtualFunctions.push(t);
                      var u = e.registeredClass.instancePrototype,
                        l = u[t];
                      return (
                        void 0 === l ||
                        (void 0 === l.overloadTable &&
                          l.className !== e.name &&
                          l.argCount === r - 2)
                          ? ((o.argCount = r - 2),
                            (o.className = e.name),
                            (u[t] = o))
                          : (lt(u, t, n), (u[t].overloadTable[r - 2] = o)),
                        Ie([], c, function (o) {
                          var s = Pt(n, o, e, i, a);
                          return (
                            void 0 === u[t].overloadTable
                              ? ((s.argCount = r - 2), (u[t] = s))
                              : (u[t].overloadTable[r - 2] = s),
                            []
                          );
                        }),
                        []
                      );
                    });
                },
                te: (e) => He(e, Ot),
                ba: (e, t, r, n) => {
                  function o() {}
                  (t = $e(t)),
                    (o.values = {}),
                    He(e, {
                      name: t,
                      constructor: o,
                      fromWireType: function (e) {
                        return this.constructor.values[e];
                      },
                      toWireType: (e, t) => t.value,
                      argPackAdvance: ze,
                      readValueFromPointer: It(t, r, n),
                      destructorFunction: null,
                    }),
                    dt(t, o);
                },
                I: (e, t, r) => {
                  var n = jt(e, "enum");
                  t = $e(t);
                  var o = n.constructor,
                    i = Object.create(n.constructor.prototype, {
                      value: { value: r },
                      constructor: {
                        value: ct(`${n.name}_${t}`, function () {}),
                      },
                    });
                  (o.values[r] = i), (o[t] = i);
                },
                Da: (e, t, r) => {
                  He(e, {
                    name: (t = $e(t)),
                    fromWireType: (e) => e,
                    toWireType: (e, t) => t,
                    argPackAdvance: ze,
                    readValueFromPointer: Ut(t, r),
                    destructorFunction: null,
                  });
                },
                J: (e, t, r, n, o, i, a) => {
                  var s = At(t, r);
                  (e = $e(e)),
                    (e = Lt(e)),
                    (o = kt(n, o)),
                    dt(
                      e,
                      function () {
                        Tt(`Cannot call ${e} due to unbound types`, s);
                      },
                      t - 1
                    ),
                    Ie([], s, function (r) {
                      var n = [r[0], null].concat(r.slice(1));
                      return Et(e, Pt(e, n, null, o, i), t - 1), [];
                    });
                },
                Q: (e, t, r, n, o) => {
                  (t = $e(t)), -1 === o && (o = 4294967295);
                  var i = (e) => e;
                  if (0 === n) {
                    var a = 32 - 8 * r;
                    i = (e) => (e << a) >>> a;
                  }
                  var s = t.includes("unsigned");
                  He(e, {
                    name: t,
                    fromWireType: i,
                    toWireType: s
                      ? function (e, t) {
                          return this.name, t >>> 0;
                        }
                      : function (e, t) {
                          return this.name, t;
                        },
                    argPackAdvance: ze,
                    readValueFromPointer: Ve(t, r, 0 !== n),
                    destructorFunction: null,
                  });
                },
                E: (e, t, r) => {
                  var n = [
                    Int8Array,
                    Uint8Array,
                    Int16Array,
                    Uint16Array,
                    Int32Array,
                    Uint32Array,
                    Float32Array,
                    Float64Array,
                    BigInt64Array,
                    BigUint64Array,
                  ][t];
                  function o(e) {
                    var t = R[e >> 2],
                      r = R[(e + 4) >> 2];
                    return new n(T.buffer, r, t);
                  }
                  He(
                    e,
                    {
                      name: (r = $e(r)),
                      fromWireType: o,
                      argPackAdvance: ze,
                      readValueFromPointer: o,
                    },
                    { ignoreDuplicateRegistrations: !0 }
                  );
                },
                kf: (e, t, r, n, o, i, a, s, u, c, l, d) => {
                  (r = $e(r)),
                    (i = kt(o, i)),
                    (s = kt(a, s)),
                    (c = kt(u, c)),
                    (d = kt(l, d)),
                    Ie([e], [t], function (e) {
                      return (
                        (e = e[0]),
                        [
                          new yt(
                            r,
                            e.registeredClass,
                            !1,
                            !1,
                            !0,
                            e,
                            n,
                            i,
                            s,
                            c,
                            d
                          ),
                        ]
                      );
                    });
                },
                Fa: (e, t) => {
                  var r = "std::string" === (t = $e(t));
                  He(e, {
                    name: t,
                    fromWireType(e) {
                      var t,
                        n = R[e >> 2],
                        o = e + 4;
                      if (r)
                        for (var i = o, a = 0; a <= n; ++a) {
                          var s = o + a;
                          if (a == n || 0 == A[s]) {
                            var u = ke(i, s - i);
                            void 0 === t
                              ? (t = u)
                              : ((t += String.fromCharCode(0)), (t += u)),
                              (i = s + 1);
                          }
                        }
                      else {
                        var c = new Array(n);
                        for (a = 0; a < n; ++a)
                          c[a] = String.fromCharCode(A[o + a]);
                        t = c.join("");
                      }
                      return Lu(e), t;
                    },
                    toWireType(e, t) {
                      var n;
                      t instanceof ArrayBuffer && (t = new Uint8Array(t));
                      var o = "string" == typeof t;
                      o ||
                        t instanceof Uint8Array ||
                        t instanceof Uint8ClampedArray ||
                        t instanceof Int8Array ||
                        qe("Cannot pass non-string to std::string"),
                        (n = r && o ? ge(t) : t.length);
                      var i = Pu(4 + n + 1),
                        a = i + 4;
                      if (((R[i >> 2] = n), r && o)) $t(t, a, n + 1);
                      else if (o)
                        for (var s = 0; s < n; ++s) {
                          var u = t.charCodeAt(s);
                          u > 255 &&
                            (Lu(a),
                            qe(
                              "String has UTF-16 code units that do not fit in 8 bits"
                            )),
                            (A[a + s] = u);
                        }
                      else for (s = 0; s < n; ++s) A[a + s] = t[s];
                      return null !== e && e.push(Lu, i), i;
                    },
                    argPackAdvance: ze,
                    readValueFromPointer: vt,
                    destructorFunction(e) {
                      Lu(e);
                    },
                  });
                },
                ja: (e, t, r) => {
                  var n, o, i, a, s;
                  (r = $e(r)),
                    2 === t
                      ? ((n = Ht), (o = Nt), (a = Vt), (i = () => F), (s = 1))
                      : 4 === t &&
                        ((n = zt), (o = Wt), (a = Gt), (i = () => R), (s = 2)),
                    He(e, {
                      name: r,
                      fromWireType: (e) => {
                        for (
                          var r, o = R[e >> 2], a = i(), u = e + 4, c = 0;
                          c <= o;
                          ++c
                        ) {
                          var l = e + 4 + c * t;
                          if (c == o || 0 == a[l >> s]) {
                            var d = n(u, l - u);
                            void 0 === r
                              ? (r = d)
                              : ((r += String.fromCharCode(0)), (r += d)),
                              (u = l + t);
                          }
                        }
                        return Lu(e), r;
                      },
                      toWireType: (e, n) => {
                        "string" != typeof n &&
                          qe(`Cannot pass non-string to C++ string type ${r}`);
                        var i = a(n),
                          u = Pu(4 + i + t);
                        return (
                          (R[u >> 2] = i >> s),
                          o(n, u + 4, i + t),
                          null !== e && e.push(Lu, u),
                          u
                        );
                      },
                      argPackAdvance: ze,
                      readValueFromPointer: Pe,
                      destructorFunction(e) {
                        Lu(e);
                      },
                    });
                },
                Ca: (e, t, r, n, o, i) => {
                  Te[e] = {
                    name: $e(t),
                    rawConstructor: kt(r, n),
                    rawDestructor: kt(o, i),
                    elements: [],
                  };
                },
                P: (e, t, r, n, o, i, a, s, u) => {
                  Te[e].elements.push({
                    getterReturnType: t,
                    getter: kt(r, n),
                    getterContext: o,
                    setterArgumentType: i,
                    setter: kt(a, s),
                    setterContext: u,
                  });
                },
                B: (e, t, r, n, o, i) => {
                  je[e] = {
                    name: $e(t),
                    rawConstructor: kt(r, n),
                    rawDestructor: kt(o, i),
                    fields: [],
                  };
                },
                m: (e, t, r, n, o, i, a, s, u, c) => {
                  je[e].fields.push({
                    fieldName: $e(t),
                    getterReturnType: r,
                    getter: kt(n, o),
                    getterContext: i,
                    setterArgumentType: a,
                    setter: kt(s, u),
                    setterContext: c,
                  });
                },
                ve: (e, t) => {
                  He(e, {
                    isVoid: !0,
                    name: (t = $e(t)),
                    argPackAdvance: 0,
                    fromWireType: () => {},
                    toWireType: (e, t) => {},
                  });
                },
                Lb: () => 1,
                mb: () => {
                  throw 1 / 0;
                },
                j: (e, t, r) => (
                  (e = Mt.toValue(e)), (t = jt(t, "emval::as")), Xt(t, r, e)
                ),
                w: (e, t, r, n) => (e = Yt[e])(null, (t = Mt.toValue(t)), r, n),
                K: (e, t, r, n, o) =>
                  (e = Yt[e])((t = Mt.toValue(t)), t[(r = Zt(r))], n, o),
                c: Bt,
                se: (e, t) => (e = Mt.toValue(e)) == (t = Mt.toValue(t)),
                L: (e) =>
                  0 === e
                    ? Mt.toHandle(Qt())
                    : ((e = Zt(e)), Mt.toHandle(Qt()[e])),
                s: (e, t, r) => {
                  var n = ((e, t) => {
                      for (var r = new Array(e), n = 0; n < e; ++n)
                        r[n] = jt(R[(t + 4 * n) >> 2], "parameter " + n);
                      return r;
                    })(e, t),
                    o = n.shift();
                  e--;
                  var i,
                    a,
                    s = new Array(e),
                    u = `methodCaller<(${n.map((e) => e.name).join(", ")}) => ${
                      o.name
                    }>`;
                  return (
                    (i = ct(u, (t, i, a, u) => {
                      for (var c = 0, l = 0; l < e; ++l)
                        (s[l] = n[l].readValueFromPointer(u + c)),
                          (c += n[l].argPackAdvance);
                      var d = 1 === r ? Jt(i, s) : i.apply(t, s);
                      return Xt(o, a, d);
                    })),
                    (a = Yt.length),
                    Yt.push(i),
                    a
                  );
                },
                h: (e, t) => (
                  (e = Mt.toValue(e)), (t = Mt.toValue(t)), Mt.toHandle(e[t])
                ),
                e: (e) => {
                  e > 4 && (Rt.get(e).refcount += 1);
                },
                W: (e, t) => (e = Mt.toValue(e)) instanceof (t = Mt.toValue(t)),
                ma: (e) => "number" == typeof (e = Mt.toValue(e)),
                M: (e) => "string" == typeof (e = Mt.toValue(e)),
                Ka: () => Mt.toHandle([]),
                f: (e) => Mt.toHandle(Zt(e)),
                y: () => Mt.toHandle({}),
                i: (e) => {
                  var t = Mt.toValue(e);
                  Ae(t), Bt(e);
                },
                k: (e, t, r) => {
                  (e = Mt.toValue(e)),
                    (t = Mt.toValue(t)),
                    (r = Mt.toValue(r)),
                    (e[t] = r);
                },
                g: (e, t) => {
                  var r = (e = jt(e, "_emval_take_value")).readValueFromPointer(
                    t
                  );
                  return Mt.toHandle(r);
                },
                vf: (e) => {
                  throw (e = Mt.toValue(e));
                },
                xd: (e) => ((e = Mt.toValue(e)), Mt.toHandle(typeof e)),
                xb: function (e, t) {
                  e = er(e);
                  var r = new Date(1e3 * e);
                  (L[t >> 2] = r.getUTCSeconds()),
                    (L[(t + 4) >> 2] = r.getUTCMinutes()),
                    (L[(t + 8) >> 2] = r.getUTCHours()),
                    (L[(t + 12) >> 2] = r.getUTCDate()),
                    (L[(t + 16) >> 2] = r.getUTCMonth()),
                    (L[(t + 20) >> 2] = r.getUTCFullYear() - 1900),
                    (L[(t + 24) >> 2] = r.getUTCDay());
                  var n = Date.UTC(r.getUTCFullYear(), 0, 1, 0, 0, 0, 0),
                    o = ((r.getTime() - n) / 864e5) | 0;
                  L[(t + 28) >> 2] = o;
                },
                yb: function (e, t) {
                  e = er(e);
                  var r = new Date(1e3 * e);
                  (L[t >> 2] = r.getSeconds()),
                    (L[(t + 4) >> 2] = r.getMinutes()),
                    (L[(t + 8) >> 2] = r.getHours()),
                    (L[(t + 12) >> 2] = r.getDate()),
                    (L[(t + 16) >> 2] = r.getMonth()),
                    (L[(t + 20) >> 2] = r.getFullYear() - 1900),
                    (L[(t + 24) >> 2] = r.getDay());
                  var n = 0 | or(r);
                  (L[(t + 28) >> 2] = n),
                    (L[(t + 36) >> 2] = -60 * r.getTimezoneOffset());
                  var o = new Date(r.getFullYear(), 0, 1),
                    i = new Date(r.getFullYear(), 6, 1).getTimezoneOffset(),
                    a = o.getTimezoneOffset(),
                    s = 0 | (i != a && r.getTimezoneOffset() == Math.min(a, i));
                  L[(t + 32) >> 2] = s;
                },
                zb: function (e) {
                  var t = (() => {
                    var t = new Date(
                        L[(e + 20) >> 2] + 1900,
                        L[(e + 16) >> 2],
                        L[(e + 12) >> 2],
                        L[(e + 8) >> 2],
                        L[(e + 4) >> 2],
                        L[e >> 2],
                        0
                      ),
                      r = L[(e + 32) >> 2],
                      n = t.getTimezoneOffset(),
                      o = new Date(t.getFullYear(), 0, 1),
                      i = new Date(t.getFullYear(), 6, 1).getTimezoneOffset(),
                      a = o.getTimezoneOffset(),
                      s = Math.min(a, i);
                    if (r < 0) L[(e + 32) >> 2] = Number(i != a && s == n);
                    else if (r > 0 != (s == n)) {
                      var u = Math.max(a, i),
                        c = r > 0 ? s : u;
                      t.setTime(t.getTime() + 6e4 * (c - n));
                    }
                    L[(e + 24) >> 2] = t.getDay();
                    var l = 0 | or(t);
                    (L[(e + 28) >> 2] = l),
                      (L[e >> 2] = t.getSeconds()),
                      (L[(e + 4) >> 2] = t.getMinutes()),
                      (L[(e + 8) >> 2] = t.getHours()),
                      (L[(e + 12) >> 2] = t.getDate()),
                      (L[(e + 16) >> 2] = t.getMonth()),
                      (L[(e + 20) >> 2] = t.getYear());
                    var d = t.getTime();
                    return isNaN(d) ? -1 : d / 1e3;
                  })();
                  return BigInt(t);
                },
                vb: function (e, t, r, n, o, i, a) {
                  o = er(o);
                  try {
                    if (isNaN(o)) return 61;
                    var s = xe.getStreamFromFD(n),
                      u = Se.mmap(s, e, o, t, r),
                      c = u.ptr;
                    return (L[i >> 2] = u.allocated), (R[a >> 2] = c), 0;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                wb: function (e, t, r, n, o, i) {
                  i = er(i);
                  try {
                    if (isNaN(i)) return 61;
                    var a = xe.getStreamFromFD(o);
                    2 & r && xe.doMsync(e, a, t, n, i), Se.munmap(a);
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return -e.errno;
                  }
                },
                ob: (e, t, r) => {
                  var n = new Date().getFullYear(),
                    o = new Date(n, 0, 1),
                    i = new Date(n, 6, 1),
                    a = o.getTimezoneOffset(),
                    s = i.getTimezoneOffset(),
                    u = Math.max(a, s);
                  function c(e) {
                    var t = e.toTimeString().match(/\(([A-Za-z ]+)\)$/);
                    return t ? t[1] : "GMT";
                  }
                  (R[e >> 2] = 60 * u), (L[t >> 2] = Number(a != s));
                  var l = c(o),
                    d = c(i),
                    h = ir(l),
                    f = ir(d);
                  s < a
                    ? ((R[r >> 2] = h), (R[(r + 4) >> 2] = f))
                    : ((R[r >> 2] = f), (R[(r + 4) >> 2] = h));
                },
                b: () => {
                  K("");
                },
                ye: function (e) {
                  var t = ke(e);
                  localStorage.removeItem(t);
                },
                ua: (e, t, r, n, o) => pr.chooseConfig(e, t, r, n, o),
                xa: (e, t, r, n) => {
                  if (62e3 != e) return pr.setErrorCode(12296), 0;
                  for (var o = 1; ; ) {
                    var i = L[n >> 2];
                    if (12440 != i) {
                      if (12344 == i) break;
                      return pr.setErrorCode(12292), 0;
                    }
                    (o = L[(n + 4) >> 2]), (n += 8);
                  }
                  return o < 2 || o > 3
                    ? (pr.setErrorCode(12293), 0)
                    : ((pr.contextAttributes.majorVersion = o - 1),
                      (pr.contextAttributes.minorVersion = 0),
                      (pr.context = mr.createContext(
                        u.canvas,
                        pr.contextAttributes
                      )),
                      0 != pr.context
                        ? (pr.setErrorCode(12288),
                          mr.makeContextCurrent(pr.context),
                          (u.useWebGL = !0),
                          fr.moduleContextCreatedCallbacks.forEach(function (
                            e
                          ) {
                            e();
                          }),
                          mr.makeContextCurrent(null),
                          62004)
                        : (pr.setErrorCode(12297), 0));
                },
                eb: (e, t, r, n) =>
                  62e3 != e
                    ? (pr.setErrorCode(12296), 0)
                    : 62002 != t
                    ? (pr.setErrorCode(12293), 0)
                    : (pr.setErrorCode(12288), 62006),
                cd: (e, t) =>
                  62e3 != e
                    ? (pr.setErrorCode(12296), 0)
                    : 62004 != t
                    ? (pr.setErrorCode(12294), 0)
                    : (mr.deleteContext(pr.context),
                      pr.setErrorCode(12288),
                      pr.currentContext == t && (pr.currentContext = 0),
                      1),
                Tc: (e, t) =>
                  62e3 != e
                    ? (pr.setErrorCode(12296), 0)
                    : 62006 != t
                    ? (pr.setErrorCode(12301), 1)
                    : (pr.currentReadSurface == t &&
                        (pr.currentReadSurface = 0),
                      pr.currentDrawSurface == t && (pr.currentDrawSurface = 0),
                      pr.setErrorCode(12288),
                      1),
                T: (e, t, r, n) => {
                  if (62e3 != e) return pr.setErrorCode(12296), 0;
                  if (62002 != t) return pr.setErrorCode(12293), 0;
                  if (!n) return pr.setErrorCode(12300), 0;
                  switch ((pr.setErrorCode(12288), r)) {
                    case 12320:
                      return (
                        (L[n >> 2] = pr.contextAttributes.alpha ? 32 : 24), 1
                      );
                    case 12321:
                      return (
                        (L[n >> 2] = pr.contextAttributes.alpha ? 8 : 0), 1
                      );
                    case 12322:
                    case 12323:
                    case 12324:
                      return (L[n >> 2] = 8), 1;
                    case 12325:
                      return (
                        (L[n >> 2] = pr.contextAttributes.depth ? 24 : 0), 1
                      );
                    case 12326:
                      return (
                        (L[n >> 2] = pr.contextAttributes.stencil ? 8 : 0), 1
                      );
                    case 12327:
                    case 12335:
                    case 12340:
                      return (L[n >> 2] = 12344), 1;
                    case 12328:
                      return (L[n >> 2] = 62002), 1;
                    case 12329:
                    case 12333:
                    case 12334:
                    case 12345:
                    case 12346:
                    case 12347:
                    case 12349:
                    case 12350:
                    case 12354:
                      return (L[n >> 2] = 0), 1;
                    case 12330:
                    case 12332:
                      return (L[n >> 2] = 4096), 1;
                    case 12331:
                      return (L[n >> 2] = 16777216), 1;
                    case 12337:
                      return (
                        (L[n >> 2] = pr.contextAttributes.antialias ? 4 : 0), 1
                      );
                    case 12338:
                      return (
                        (L[n >> 2] = pr.contextAttributes.antialias ? 1 : 0), 1
                      );
                    case 12339:
                    case 12352:
                      return (L[n >> 2] = 4), 1;
                    case 12341:
                    case 12342:
                    case 12343:
                      return (L[n >> 2] = -1), 1;
                    case 12348:
                      return (L[n >> 2] = 1), 1;
                    case 12351:
                      return (L[n >> 2] = 12430), 1;
                    default:
                      return pr.setErrorCode(12292), 0;
                  }
                },
                cc: (e) => (
                  pr.setErrorCode(12288), 0 != e && 1 != e ? 0 : 62e3
                ),
                za: () => pr.errorCode,
                Tb: (e, t, r) =>
                  62e3 != e
                    ? (pr.setErrorCode(12296), 0)
                    : (t && (L[t >> 2] = 1),
                      r && (L[r >> 2] = 4),
                      (pr.defaultDisplayInitialized = !0),
                      pr.setErrorCode(12288),
                      1),
                nc: (e, t, r, n) =>
                  62e3 != e
                    ? (pr.setErrorCode(12296), 0)
                    : 0 != n && 62004 != n
                    ? (pr.setErrorCode(12294), 0)
                    : (0 != r && 62006 != r) || (0 != t && 62006 != t)
                    ? (pr.setErrorCode(12301), 0)
                    : (mr.makeContextCurrent(n ? pr.context : null),
                      (pr.currentContext = n),
                      (pr.currentDrawSurface = t),
                      (pr.currentReadSurface = r),
                      pr.setErrorCode(12288),
                      1),
                Aa: (e, t) => {
                  if (pr.defaultDisplayInitialized)
                    if (u.ctx) {
                      if (!u.ctx.isContextLost())
                        return pr.setErrorCode(12288), 1;
                      pr.setErrorCode(12302);
                    } else pr.setErrorCode(12290);
                  else pr.setErrorCode(12289);
                  return 0;
                },
                Ic: (e) =>
                  62e3 != e
                    ? (pr.setErrorCode(12296), 0)
                    : ((pr.currentContext = 0),
                      (pr.currentReadSurface = 0),
                      (pr.currentDrawSurface = 0),
                      (pr.defaultDisplayInitialized = !1),
                      pr.setErrorCode(12288),
                      1),
                H: (e, t, r) => vr(e, t, r),
                He: (e) => {
                  console.error(ke(e));
                },
                Ie: (e) => {
                  console.log(ke(e));
                },
                pa: (e) => {
                  console.warn(ke(e));
                },
                ga: () => Date.now(),
                xe: function () {},
                pb: () => 2147483648,
                Kb: Ft,
                eg: yr,
                fg: br,
                bd: wr,
                oe: _r,
                Pc: Er,
                gg: Cr,
                hg: Sr,
                Mc: kr,
                Nc: xr,
                ef: Tr,
                ff: Ar,
                Qe: Pr,
                ig: Fr,
                _b: Lr,
                Df: Br,
                Ff: Dr,
                jg: Mr,
                kg: Or,
                be: Ir,
                lg: jr,
                ae: Ur,
                _e: $r,
                mg: qr,
                ng: Hr,
                gf: Nr,
                og: Vr,
                pc: zr,
                qc: Wr,
                sc: Gr,
                rc: Xr,
                pg: Yr,
                $d: Kr,
                qg: Zr,
                Ma: Qr,
                rg: Jr,
                sg: en,
                tg: tn,
                hd: rn,
                ug: nn,
                gd: on,
                Ye: an,
                _d: sn,
                vg: un,
                id: cn,
                wg: ln,
                xg: dn,
                yg: hn,
                zg: fn,
                hf: pn,
                Ag: mn,
                ed: gn,
                qe: vn,
                jf: yn,
                Re: bn,
                Bg: wn,
                Ze: _n,
                Cg: En,
                Zb: Cn,
                Ef: kn,
                Gf: xn,
                Zd: Tn,
                Dg: An,
                Yd: Pn,
                Xd: Fn,
                Eg: Ln,
                Fg: Rn,
                Gg: Bn,
                Bf: Mn,
                ee: On,
                pd: In,
                yf: jn,
                qd: Un,
                Nb: $n,
                wf: Nn,
                ld: Vn,
                fe: zn,
                Hg: Gn,
                Cf: Yn,
                de: Kn,
                md: Zn,
                zf: Qn,
                nd: Jn,
                od: eo,
                pf: to,
                Ig: ro,
                Jg: no,
                ad: oo,
                ne: io,
                Oc: ao,
                We: so,
                Kg: uo,
                Lg: co,
                lf: lo,
                mf: ho,
                Sc: fo,
                Mg: po,
                Ng: go,
                nf: vo,
                fd: yo,
                re: bo,
                of: wo,
                Se: _o,
                Og: Eo,
                Yb: Co,
                Af: Ao,
                Hf: Po,
                af: Fo,
                Wd: Ro,
                Vd: Bo,
                jc: Do,
                kc: Mo,
                mc: Oo,
                Ud: Io,
                Td: jo,
                Sd: Ho,
                ec: No,
                Pg: Vo,
                Qg: zo,
                Rg: Wo,
                Bc: Go,
                bf: Xo,
                fc: Ko,
                hc: Zo,
                Qc: Qo,
                qh: Jo,
                Pb: ei,
                Ub: ti,
                Sg: ri,
                Tg: ni,
                ie: ii,
                ke: si,
                he: ui,
                _c: ci,
                je: li,
                $c: di,
                le: hi,
                cf: fi,
                $b: pi,
                ac: mi,
                Ug: gi,
                Ne: vi,
                Rd: yi,
                Vg: bi,
                La: wi,
                rh: _i,
                gc: Ei,
                Qd: Ci,
                Pd: Si,
                Kc: ki,
                lc: xi,
                oc: Ti,
                Wg: Fi,
                Od: Bi,
                Nd: Di,
                Cc: Mi,
                Jc: ji,
                Hc: Ui,
                Kd: $i,
                Md: qi,
                Ld: Hi,
                Jd: Ni,
                Oe: Vi,
                Pe: zi,
                Id: Wi,
                Hd: Gi,
                Gd: Xi,
                Fd: Yi,
                dd: Ki,
                pe: Zi,
                Ed: Qi,
                dc: Ji,
                Dd: ea,
                Xe: ta,
                Xg: ra,
                Xb: na,
                Rc: ia,
                ge: aa,
                Yg: sa,
                Zg: ua,
                tf: ca,
                uf: la,
                Wb: da,
                _g: ha,
                Cd: fa,
                Sb: pa,
                Rb: ma,
                me: ga,
                xf: va,
                $g: _a,
                Bd: Ea,
                df: Ca,
                $e: Sa,
                Vb: ka,
                Ad: xa,
                Te: Ta,
                bc: Aa,
                Ue: Pa,
                Ve: Fa,
                ah: La,
                zd: Ra,
                bh: Ba,
                ch: Da,
                dh: Ma,
                eh: Oa,
                fh: Ia,
                gh: ja,
                hh: Ua,
                ih: $a,
                kd: qa,
                jh: Ha,
                kh: Na,
                lh: Va,
                mh: za,
                qf: Wa,
                Qb: Ga,
                nh: Xa,
                jd: Ya,
                Lc: Ka,
                oh: Za,
                ph: Ja,
                ag: es,
                bg: rs,
                Ac: ns,
                wc: os,
                cg: is,
                dg: as,
                $f: ss,
                _f: us,
                zc: cs,
                vc: ls,
                Zf: ds,
                Yf: hs,
                Xf: fs,
                Wf: ps,
                yc: ms,
                uc: gs,
                Vf: vs,
                Uf: ys,
                If: bs,
                Jf: ws,
                xc: _s,
                tc: Es,
                ic: Cs,
                Kf: Ss,
                Zc: ks,
                Xc: xs,
                Lf: Ts,
                Yc: As,
                Vc: Ps,
                Mf: Fs,
                Wc: Ls,
                Uc: Rs,
                Nf: Bs,
                yd: Ds,
                Of: Ms,
                wd: Os,
                vd: Is,
                Pf: js,
                ud: Us,
                Qf: $s,
                td: qs,
                Rf: Hs,
                rf: Vs,
                ce: zs,
                rd: Ws,
                sd: Gs,
                Ob: Xs,
                Gc: Ys,
                Ec: Ks,
                Fc: Zs,
                Dc: Qs,
                sf: Js,
                Sf: eu,
                Tf: tu,
                Na: ru,
                qb: (e) => {
                  var t = A.length,
                    r = 2147483648;
                  if ((e >>>= 0) > r) return !1;
                  for (var n, o, i = 1; i <= 4; i *= 2) {
                    var a = t * (1 + 0.2 / i);
                    a = Math.min(a, e + 100663296);
                    var s = Math.min(
                      r,
                      (n = Math.max(e, a)) + (((o = 65536) - (n % o)) % o)
                    );
                    if (nu(s)) return !0;
                  }
                  return !1;
                },
                ab: function (e, t, r, n, o, i, a, s, c) {
                  const l = u.UTF8ToString(e, e + t),
                    d = u.HEAPU8.subarray(o, o + i),
                    h = u.emscripten_ubq_codec_audioDecoderNextHandle++,
                    f = {
                      codec: l,
                      sampleRate: r,
                      numberOfChannels: n,
                      description: d,
                    };
                  try {
                    const e = u.emscripten_ubq_codec_createAudioDecoder(
                      a,
                      s,
                      c
                    );
                    AudioDecoder.isConfigSupported(f).then(
                      (t) => {
                        e.configUnsupported = !t;
                      },
                      () => {
                        e.configUnsupported = !0;
                      }
                    ),
                      e.configure(f),
                      u.emscripten_ubq_codec_audioDecoders.set(h, {
                        audioDecoder: e,
                        decoderConfig: f,
                        leftBufferPtr: a,
                        rightBufferPtr: s,
                        bufferLength: c,
                      });
                  } catch (e) {
                    return u.emscripten_ubq_codec_createNativeResult({
                      error: e,
                    });
                  }
                  return u.emscripten_ubq_codec_createNativeResult({
                    handle: h,
                  });
                },
                Wa: function (e, t, r, n, o, i) {
                  const a = u.UTF8ToString(e, e + t),
                    s = u.emscripten_ubq_codec_audioEncoderNextHandle++,
                    c = {
                      codec: a,
                      sampleRate: r,
                      numberOfChannels: n,
                      bitrate: o,
                    };
                  try {
                    const e = new AudioEncoder({
                      output: (e) => {
                        const t = u._malloc(e.byteLength),
                          r = u.HEAPU8.subarray(t, t + e.byteLength);
                        e.copyTo(r),
                          u.emscripten_ubq_codec_onOutputEncodedAudioChunk(
                            s,
                            t,
                            e.byteLength,
                            i
                          ),
                          u._free(t);
                      },
                      error: (e) => console.error(e),
                    });
                    e.configure(c),
                      u.emscripten_ubq_codec_audioEncoders.set(s, {
                        audioEncoder: e,
                        audioEncoderConfig: c,
                        frameIndex: 0,
                      });
                  } catch (e) {
                    return (
                      (e += ' Requested codec: "' + a + '"'),
                      (e += "; sample rate: " + r),
                      (e += "; channels: " + n),
                      (e += "; bit rate: " + o),
                      u.emscripten_ubq_codec_createNativeResult({ error: e })
                    );
                  }
                  return u.emscripten_ubq_codec_createNativeResult({
                    handle: s,
                  });
                },
                db: function (e, t, r, n, o, i, a) {
                  const s = u.UTF8ToString(e, e + t),
                    c = u.HEAPU8.subarray(o, o + i),
                    l = u.emscripten_ubq_codec_videoDecoderNextHandle++,
                    d = {
                      codec: s,
                      codedWidth: r,
                      codedHeight: n,
                      description: c,
                      optimizeForLatency: !0,
                    };
                  try {
                    const e = u.emscripten_ubq_codec_createVideoDecoder(l, a);
                    VideoDecoder.isConfigSupported(d).then(
                      (t) => {
                        e.configUnsupported = !t;
                      },
                      () => {
                        e.configUnsupported = !0;
                      }
                    ),
                      e.configure(d),
                      u.emscripten_ubq_codec_videoDecoders.set(l, {
                        videoDecoder: e,
                        decoderConfig: d,
                        codecServicePtr: a,
                      });
                  } catch (e) {
                    return u.emscripten_ubq_codec_createNativeResult({
                      error: e,
                    });
                  }
                  return u.emscripten_ubq_codec_createNativeResult({
                    handle: l,
                  });
                },
                Za: function (e, t, r, n, o, i, a) {
                  const s = u.UTF8ToString(e, e + t),
                    c = u.emscripten_ubq_codec_videoEncoderNextHandle++,
                    l = u.specialHTMLTargets["!canvas"];
                  (l.width = r), (l.height = n);
                  const d = {
                    codec: s,
                    width: r,
                    height: n,
                    avc: { format: "annexb" },
                    framerate: o,
                  };
                  i > 0 && (d.bitrate = i);
                  try {
                    const e = new VideoEncoder({
                      output: (e) => {
                        const t = u._malloc(e.byteLength),
                          r = u.HEAPU8.subarray(t, t + e.byteLength);
                        e.copyTo(r),
                          u.emscripten_ubq_codec_onOutputEncodedVideoChunk(
                            c,
                            t,
                            e.byteLength,
                            a
                          ),
                          u._free(t);
                      },
                      error: (e) => console.error(e),
                    });
                    VideoEncoder.isConfigSupported(d).then(
                      (t) => {
                        e.configUnsupported = !t;
                      },
                      () => {
                        e.configUnsupported = !0;
                      }
                    ),
                      e.configure(d),
                      u.emscripten_ubq_codec_videoEncoders.set(c, {
                        videoEncoder: e,
                        encoderConfig: d,
                        groupOfPictures: 150,
                        frameIndex: 0,
                      });
                  } catch (e) {
                    return (
                      (e += ' Requested codec: "' + s + '"'),
                      (e += "; resolution: " + r + "x" + n),
                      u.emscripten_ubq_codec_createNativeResult({ error: e })
                    );
                  }
                  return u.emscripten_ubq_codec_createNativeResult({
                    handle: c,
                  });
                },
                Ra: function (e, t, r, n, o, i) {
                  const a = u.emscripten_ubq_codec_audioDecoders.get(e);
                  if (a.audioDecoder.unexpectedError)
                    return u.emscripten_ubq_codec_createNativeResult({
                      code: 2,
                      error: a.audioDecoder.unexpectedError,
                    });
                  "closed" === a.audioDecoder.state &&
                    ((a.audioDecoder =
                      u.emscripten_ubq_codec_createAudioDecoder(
                        a.leftBufferPtr,
                        a.rightBufferPtr,
                        a.bufferLength
                      )),
                    a.audioDecoder.configure(a.decoderConfig));
                  const s = a.audioDecoder,
                    c = u.HEAPU8.subarray(o, o + i),
                    l = new EncodedAudioChunk({
                      type: t ? "key" : "delta",
                      timestamp: r,
                      duration: n,
                      data: c,
                    });
                  try {
                    s.decode(l);
                  } catch (e) {
                    return s.configUnsupported
                      ? u.emscripten_ubq_codec_createNativeResult({
                          code: 2,
                          error: e,
                        })
                      : u.emscripten_ubq_codec_createNativeResult({
                          code: 1,
                          error: e,
                        });
                  }
                  return u.emscripten_ubq_codec_createNativeResult({ code: 0 });
                },
                Sa: function (e, t, r, n, o, i) {
                  const a = u.emscripten_ubq_codec_videoDecoders.get(e);
                  if (a.videoDecoder.unexpectedError)
                    return u.emscripten_ubq_codec_createNativeResult({
                      code: 2,
                      error: a.videoDecoder.unexpectedError,
                    });
                  if ("closed" === a.videoDecoder.state) {
                    const t = a.videoDecoder.textures;
                    return (
                      (a.videoDecoder =
                        u.emscripten_ubq_codec_createVideoDecoder(
                          e,
                          a.codecServicePtr
                        )),
                      (a.videoDecoder.textures = t),
                      a.videoDecoder.configure(a.decoderConfig),
                      u.emscripten_ubq_codec_createNativeResult({
                        code: 1,
                        error: "VideoDecoder was closed",
                      })
                    );
                  }
                  const s = a.videoDecoder,
                    c = u.HEAPU8.subarray(o, o + i),
                    l = new EncodedVideoChunk({
                      type: t ? "key" : "delta",
                      timestamp: r,
                      duration: n,
                      data: c,
                    });
                  try {
                    s.decode(l);
                  } catch (e) {
                    return s.configUnsupported
                      ? u.emscripten_ubq_codec_createNativeResult({
                          code: 2,
                          error: e,
                        })
                      : u.emscripten_ubq_codec_createNativeResult({
                          code: 1,
                          error: e,
                        });
                  }
                  return u.emscripten_ubq_codec_createNativeResult({ code: 0 });
                },
                S: function (e) {
                  if (u.emscripten_ubq_codec_audioDecoders.has(e)) {
                    const t = u.emscripten_ubq_codec_audioDecoders.get(e);
                    "closed" !== t.audioDecoder.state && t.audioDecoder.close(),
                      u.emscripten_ubq_codec_audioDecoders.delete(e);
                  }
                },
                da: function (e) {
                  const t = u.emscripten_ubq_codec_audioEncoders.get(e);
                  "closed" !== t.audioEncoder.state && t.audioEncoder.close(),
                    u.emscripten_ubq_codec_audioEncoders.delete(e);
                },
                fa: function (e) {
                  if (u.emscripten_ubq_codec_videoDecoders.has(e)) {
                    const t = u.emscripten_ubq_codec_videoDecoders.get(e);
                    "closed" !== t.videoDecoder.state && t.videoDecoder.close(),
                      u.emscripten_ubq_codec_videoDecoders.delete(e);
                  }
                },
                ea: function (e) {
                  const t = u.emscripten_ubq_codec_videoEncoders.get(e);
                  "closed" !== t.videoEncoder.state && t.videoEncoder.close(),
                    u.emscripten_ubq_codec_videoEncoders.delete(e);
                },
                Va: function (e, t, r) {
                  const n = 1e6,
                    o = u.emscripten_ubq_codec_audioEncoders.get(e),
                    i = o.audioEncoderConfig.sampleRate,
                    a = o.audioEncoderConfig.numberOfChannels,
                    s = r / a,
                    c = Math.round(n * ((o.frameIndex * s) / i)),
                    l = Math.round(n * (s / i)),
                    d = u.HEAPF32.subarray(t / 4, t / 4 + r),
                    h = new AudioData({
                      format: "f32",
                      sampleRate: i,
                      numberOfFrames: s,
                      numberOfChannels: a,
                      duration: l,
                      timestamp: c,
                      data: d,
                    });
                  o.audioEncoder.encode(h), o.frameIndex++, h.close();
                },
                Ya: function (e, t, r) {
                  const n = 1e6,
                    o = u.emscripten_ubq_codec_videoEncoders.get(e),
                    i = Math.round(
                      n * (o.frameIndex / o.encoderConfig.framerate)
                    ),
                    a = o.frameIndex % o.groupOfPictures == 0,
                    s = Math.round(n / o.encoderConfig.framerate),
                    c = u.specialHTMLTargets["!canvas"],
                    l = new VideoFrame(c, { timestamp: i, duration: s });
                  o.videoEncoder.encode(l, { keyFrame: a }),
                    l.close(),
                    o.frameIndex++;
                },
                Ua: async function (e, t) {
                  const r = u.emscripten_ubq_codec_audioEncoders.get(e);
                  await r.audioEncoder.flush(),
                    u.emscripten_ubq_codec_onFinalizedAudioEncoding(e, t);
                },
                Xa: async function (e, t) {
                  const r = u.emscripten_ubq_codec_videoEncoders.get(e);
                  await r.videoEncoder.flush(),
                    u.emscripten_ubq_codec_onFinalizedVideoEncoding(e, t);
                },
                $a: async function (e, t) {
                  const r =
                    u.emscripten_ubq_codec_audioDecoders.get(e).audioDecoder;
                  r.flushing = !0;
                  try {
                    await r.flush();
                  } catch {}
                  (r.flushing = !1), (r.writtenFrames = t);
                },
                Y: async function (e, t, r) {
                  const n =
                    u.emscripten_ubq_codec_videoDecoders.get(e).videoDecoder;
                  (n.shouldDropFrames = r), (n.flushing = !0);
                  try {
                    await n.flush();
                  } catch {}
                  (n.flushing = !1),
                    (n.shouldDropFrames = !1),
                    (n.decodedFrames = t);
                },
                ra: function (e) {
                  return u.emscripten_ubq_codec_audioDecoders.get(e)
                    .audioDecoder.decodeQueueSize;
                },
                sa: function (e) {
                  return u.emscripten_ubq_codec_videoDecoders.get(e)
                    .videoDecoder.decodedFrames;
                },
                X: function (e) {
                  return u.emscripten_ubq_codec_audioDecoders.get(e)
                    .audioDecoder.writtenFrames;
                },
                _a: function (e) {
                  return u.emscripten_ubq_codec_audioDecoders.get(e)
                    .audioDecoder.flushing;
                },
                cb: function (e) {
                  return u.emscripten_ubq_codec_videoDecoders.get(e)
                    .videoDecoder.flushing;
                },
                Z: function () {
                  return (
                    "undefined" != typeof VideoFrame &&
                    "undefined" != typeof VideoDecoder &&
                    "undefined" != typeof VideoEncoder &&
                    "undefined" != typeof AudioDecoder &&
                    "undefined" != typeof AudioEncoder
                  );
                },
                bb: function (e, t) {
                  u.emscripten_ubq_codec_videoDecoders.get(
                    e
                  ).videoDecoder.requestedFrame = t;
                },
                Ta: function (e, t, r) {
                  const n = u.emscripten_ubq_codec_videoDecoders.get(e),
                    o = u.HEAPU32.subarray(t / 4, t / 4 + r);
                  n.videoDecoder.textures = [];
                  for (let e = 0; e < r; e++)
                    n.videoDecoder.textures[e] = mr.textures[o[e]];
                },
                Ce: function (e) {
                  const t = u.emscripten_ubq_asyncFetchManager.getProcess(e);
                  return !!(null == t ? void 0 : t.allocate());
                },
                oa: function () {
                  u.emscripten_ubq_asyncFetchManager.clear();
                },
                na: function (e, t, r, n) {
                  return u.emscripten_ubq_asyncFetchManager.createHeader(
                    e,
                    t,
                    r,
                    n
                  );
                },
                Fe: function (e) {
                  u.emscripten_ubq_asyncFetchManager.deleteHeader(e);
                },
                Ge: function (e, t, r, n, o, i, a, s, c) {
                  return u.emscripten_ubq_asyncFetchManager.fetch(
                    e,
                    t,
                    r,
                    n,
                    o,
                    i,
                    a,
                    s,
                    c
                  ).handle;
                },
                aa: function (e) {
                  return u.emscripten_ubq_asyncFetchManager.deleteProcess(e);
                },
                Ee: function (e) {
                  var t, r;
                  return null !==
                    (r =
                      null ===
                        (t =
                          u.emscripten_ubq_asyncFetchManager.getProcess(e)) ||
                      void 0 === t
                        ? void 0
                        : t.receivedLength) && void 0 !== r
                    ? r
                    : 0;
                },
                Be: function (e) {
                  const t = u.emscripten_ubq_asyncFetchManager.getProcess(e);
                  return (null == t ? void 0 : t.isAllocated())
                    ? t.resultAddress
                    : -1;
                },
                Ae: function (e) {
                  const t = u.emscripten_ubq_asyncFetchManager.getProcess(e);
                  return (null == t ? void 0 : t.isAllocated())
                    ? t.resultLength
                    : -1;
                },
                la: function (e) {
                  var t, r;
                  return null !==
                    (r =
                      null ===
                        (t =
                          u.emscripten_ubq_asyncFetchManager.getProcess(e)) ||
                      void 0 === t
                        ? void 0
                        : t.state) && void 0 !== r
                    ? r
                    : -1;
                },
                De: function (e) {
                  var t, r;
                  return null !==
                    (r =
                      null ===
                        (t =
                          u.emscripten_ubq_asyncFetchManager.getProcess(e)) ||
                      void 0 === t
                        ? void 0
                        : t.totalBytes) && void 0 !== r
                    ? r
                    : 0;
                },
                fb: function () {
                  return !!u.emscripten_ubq_settings_forceWebGL1;
                },
                ta: uu,
                _: (e) => {
                  mr.currentContext == e && (mr.currentContext = 0),
                    mr.deleteContext(e);
                },
                jb: (e) =>
                  ((e) => {
                    var t = e.getExtension("OES_vertex_array_object");
                    if (t)
                      return (
                        (e.createVertexArray = () => t.createVertexArrayOES()),
                        (e.deleteVertexArray = (e) =>
                          t.deleteVertexArrayOES(e)),
                        (e.bindVertexArray = (e) => t.bindVertexArrayOES(e)),
                        (e.isVertexArray = (e) => t.isVertexArrayOES(e)),
                        1
                      );
                  })(mr.contexts[e].GLctx),
                ib: (e) =>
                  ((e) => {
                    var t = e.getExtension("WEBGL_draw_buffers");
                    if (t)
                      return (
                        (e.drawBuffers = (e, r) => t.drawBuffersWEBGL(e, r)), 1
                      );
                  })(mr.contexts[e].GLctx),
                hb: (e) =>
                  ((e) =>
                    !!(e.multiDrawWebgl = e.getExtension("WEBGL_multi_draw")))(
                    mr.contexts[e].GLctx
                  ),
                $: (e, t) => {
                  var r = mr.getContext(e),
                    n = ke(t);
                  return (
                    n.startsWith("GL_") && (n = n.substr(3)),
                    !!r.GLctx.getExtension(n)
                  );
                },
                gb: (e, t) => {
                  if (!t) return -5;
                  if (!(e = mr.contexts[e])) return -3;
                  var r = e.GLctx;
                  if (!r) return -3;
                  (r = r.getContextAttributes()),
                    (L[t >> 2] = r.alpha),
                    (L[(t + 4) >> 2] = r.depth),
                    (L[(t + 8) >> 2] = r.stencil),
                    (L[(t + 12) >> 2] = r.antialias),
                    (L[(t + 16) >> 2] = r.premultipliedAlpha),
                    (L[(t + 20) >> 2] = r.preserveDrawingBuffer);
                  var n = r.powerPreference && iu.indexOf(r.powerPreference);
                  return (
                    (L[(t + 24) >> 2] = n),
                    (L[(t + 28) >> 2] = r.failIfMajorPerformanceCaveat),
                    (L[(t + 32) >> 2] = e.version),
                    (L[(t + 36) >> 2] = 0),
                    0
                  );
                },
                Eb: (e) => (mr.makeContextCurrent(e) ? 0 : -5),
                Bb: (e, t) => {
                  var r = 0;
                  return (
                    lu().forEach((n, o) => {
                      var i = t + r;
                      (R[(e + 4 * o) >> 2] = i),
                        ((e, t) => {
                          for (var r = 0; r < e.length; ++r)
                            T[t++ >> 0] = e.charCodeAt(r);
                          T[t >> 0] = 0;
                        })(n, i),
                        (r += n.length + 1);
                    }),
                    0
                  );
                },
                Cb: (e, t) => {
                  var r = lu();
                  R[e >> 2] = r.length;
                  var n = 0;
                  return (
                    r.forEach((e) => (n += e.length + 1)), (R[t >> 2] = n), 0
                  );
                },
                Ha: lr,
                ha: function (e) {
                  try {
                    var t = xe.getStreamFromFD(e);
                    return Se.close(t), 0;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return e.errno;
                  }
                },
                nb: function (e, t) {
                  try {
                    var r = xe.getStreamFromFD(e),
                      n = r.tty
                        ? 2
                        : Se.isDir(r.mode)
                        ? 3
                        : Se.isLink(r.mode)
                        ? 7
                        : 4;
                    return (
                      (T[t >> 0] = n),
                      (P[(t + 2) >> 1] = 0),
                      (D[(t + 8) >> 3] = BigInt(0)),
                      (D[(t + 16) >> 3] = BigInt(0)),
                      0
                    );
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return e.errno;
                  }
                },
                ub: function (e, t, r, n, o) {
                  n = er(n);
                  try {
                    if (isNaN(n)) return 61;
                    var i = xe.getStreamFromFD(e),
                      a = du(i, t, r, n);
                    return (R[o >> 2] = a), 0;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return e.errno;
                  }
                },
                ya: function (e, t, r, n) {
                  try {
                    var o = xe.getStreamFromFD(e),
                      i = du(o, t, r);
                    return (R[n >> 2] = i), 0;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return e.errno;
                  }
                },
                Ab: function (e, t, r, n) {
                  t = er(t);
                  try {
                    if (isNaN(t)) return 61;
                    var o = xe.getStreamFromFD(e);
                    return (
                      Se.llseek(o, t, r),
                      (D[n >> 3] = BigInt(o.position)),
                      o.getdents && 0 === t && 0 === r && (o.getdents = null),
                      0
                    );
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return e.errno;
                  }
                },
                wa: function (e, t, r, n) {
                  try {
                    var o = ((e, t, r, n) => {
                      for (var o = 0, i = 0; i < r; i++) {
                        var a = R[t >> 2],
                          s = R[(t + 4) >> 2];
                        t += 8;
                        var u = Se.write(e, T, a, s, n);
                        if (u < 0) return -1;
                        (o += u), void 0 !== n && (n += u);
                      }
                      return o;
                    })(xe.getStreamFromFD(e), t, r);
                    return (R[n >> 2] = o), 0;
                  } catch (e) {
                    if (void 0 === Se || "ErrnoError" !== e.name) throw e;
                    return e.errno;
                  }
                },
                ze: function (e) {
                  var t = ke(e),
                    r = localStorage.getItem(t);
                  return null == r ? null : ir(r);
                },
                we: function () {
                  return "undefined" != typeof window
                    ? ir(window.location.hostname)
                    : ir("");
                },
                kb: (e, t) => (de(A.subarray(e, e + t)), 0),
                z: function (e, t, r) {
                  var n = ju();
                  try {
                    return St(e)(t, r);
                  } catch (e) {
                    if ((Uu(n), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                N: function (e, t) {
                  var r = ju();
                  try {
                    return St(e)(t);
                  } catch (e) {
                    if ((Uu(r), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                G: function (e, t, r) {
                  var n = ju();
                  try {
                    return St(e)(t, r);
                  } catch (e) {
                    if ((Uu(n), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                n: function (e, t, r, n) {
                  var o = ju();
                  try {
                    return St(e)(t, r, n);
                  } catch (e) {
                    if ((Uu(o), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                th: function (e) {
                  var t = ju();
                  try {
                    return St(e)();
                  } catch (e) {
                    if ((Uu(t), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                Oa: function (e, t, r) {
                  var n = ju();
                  try {
                    return St(e)(t, r);
                  } catch (e) {
                    if ((Uu(n), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                r: function (e, t) {
                  var r = ju();
                  try {
                    return St(e)(t);
                  } catch (e) {
                    if ((Uu(r), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                V: function (e, t, r, n, o, i, a, s, u, c, l, d, h, f, p, m) {
                  var g = ju();
                  try {
                    return St(e)(t, r, n, o, i, a, s, u, c, l, d, h, f, p, m);
                  } catch (e) {
                    if ((Uu(g), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                q: function (e, t, r) {
                  var n = ju();
                  try {
                    return St(e)(t, r);
                  } catch (e) {
                    if ((Uu(n), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                t: function (e, t, r, n) {
                  var o = ju();
                  try {
                    return St(e)(t, r, n);
                  } catch (e) {
                    if ((Uu(o), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                U: function (e, t, r, n, o) {
                  var i = ju();
                  try {
                    return St(e)(t, r, n, o);
                  } catch (e) {
                    if ((Uu(i), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                Me: function (e, t, r, n, o, i) {
                  var a = ju();
                  try {
                    return St(e)(t, r, n, o, i);
                  } catch (e) {
                    if ((Uu(a), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                Ja: function (e, t, r, n, o, i, a) {
                  var s = ju();
                  try {
                    return St(e)(t, r, n, o, i, a);
                  } catch (e) {
                    if ((Uu(s), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                Ia: function (e, t, r, n, o, i, a, s, u, c) {
                  var l = ju();
                  try {
                    return St(e)(t, r, n, o, i, a, s, u, c);
                  } catch (e) {
                    if ((Uu(l), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                R: function (e) {
                  var t = ju();
                  try {
                    St(e)();
                  } catch (e) {
                    if ((Uu(t), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                u: function (e, t) {
                  var r = ju();
                  try {
                    St(e)(t);
                  } catch (e) {
                    if ((Uu(r), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                C: function (e, t, r, n) {
                  var o = ju();
                  try {
                    St(e)(t, r, n);
                  } catch (e) {
                    if ((Uu(o), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                F: function (e, t, r) {
                  var n = ju();
                  try {
                    St(e)(t, r);
                  } catch (e) {
                    if ((Uu(n), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                p: function (e, t, r, n) {
                  var o = ju();
                  try {
                    St(e)(t, r, n);
                  } catch (e) {
                    if ((Uu(o), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                D: function (e, t, r, n, o) {
                  var i = ju();
                  try {
                    St(e)(t, r, n, o);
                  } catch (e) {
                    if ((Uu(i), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                Le: function (e, t, r, n, o, i) {
                  var a = ju();
                  try {
                    St(e)(t, r, n, o, i);
                  } catch (e) {
                    if ((Uu(a), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                Je: function (e, t, r, n, o, i, a) {
                  var s = ju();
                  try {
                    St(e)(t, r, n, o, i, a);
                  } catch (e) {
                    if ((Uu(s), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                sh: function (e, t, r, n, o, i, a, s) {
                  var u = ju();
                  try {
                    St(e)(t, r, n, o, i, a, s);
                  } catch (e) {
                    if ((Uu(u), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                Ke: function (e, t, r, n, o, i, a, s, u, c) {
                  var l = ju();
                  try {
                    St(e)(t, r, n, o, i, a, s, u, c);
                  } catch (e) {
                    if ((Uu(l), e !== e + 0)) throw e;
                    Iu(1, 0);
                  }
                },
                ka: function () {
                  return "undefined" != typeof localStorage;
                },
                qa: function (e, t) {
                  const r = Mt.toValue(t),
                    n = u.ctx;
                  n.bindTexture(n.TEXTURE_2D, mr.textures[e]),
                    n.texImage2D(
                      n.TEXTURE_2D,
                      0,
                      n.RGBA,
                      n.RGBA,
                      n.UNSIGNED_BYTE,
                      r
                    );
                },
                a: C,
                Ga: function (e, t) {
                  var r = ke(e),
                    n = ke(t);
                  localStorage.setItem(r, n);
                },
                lb: (e, t, r, n, o) => mu(e, t, r, n),
              },
              Au = (function () {
                var e,
                  t,
                  r,
                  o,
                  i = { a: Tu };
                function a(e, t) {
                  var r;
                  return (
                    (Au = e.exports),
                    (bt = Au.yh),
                    (r = Au.uh),
                    H.unshift(r),
                    Y(),
                    Au
                  );
                }
                if ((X(), u.instantiateWasm))
                  try {
                    return u.instantiateWasm(i, a);
                  } catch (e) {
                    k(
                      `Module.instantiateWasm callback failed with error: ${e}`
                    ),
                      n(e);
                  }
                return (
                  ((e = E),
                  (t = Z),
                  (r = i),
                  (o = function (e) {
                    a(e.instance);
                  }),
                  e ||
                  "function" != typeof WebAssembly.instantiateStreaming ||
                  J(t) ||
                  y ||
                  "function" != typeof fetch
                    ? re(t, r, o)
                    : fetch(t, { credentials: "same-origin" }).then((e) =>
                        WebAssembly.instantiateStreaming(e, r).then(
                          o,
                          function (e) {
                            return (
                              k(`wasm streaming compile failed: ${e}`),
                              k("falling back to ArrayBuffer instantiation"),
                              re(t, r, o)
                            );
                          }
                        )
                      )).catch(n),
                  {}
                );
              })(),
              Pu = (u._malloc = (e) => (Pu = u._malloc = Au.vh)(e)),
              Fu = (u._main = (e, t) => (Fu = u._main = Au.wh)(e, t)),
              Lu = (u._free = (e) => (Lu = u._free = Au.xh)(e)),
              Ru =
                ((u._ma_malloc_emscripten = (e, t) =>
                  (u._ma_malloc_emscripten = Au.zh)(e, t)),
                (u._ma_free_emscripten = (e, t) =>
                  (u._ma_free_emscripten = Au.Ah)(e, t)),
                (u._ma_device_process_pcm_frames_capture__webaudio = (
                  e,
                  t,
                  r
                ) =>
                  (Ru = u._ma_device_process_pcm_frames_capture__webaudio =
                    Au.Bh)(e, t, r))),
              Bu = (u._ma_device_process_pcm_frames_playback__webaudio = (
                e,
                t,
                r
              ) =>
                (Bu = u._ma_device_process_pcm_frames_playback__webaudio =
                  Au.Ch)(e, t, r)),
              Du = (e) => (Du = Au.Dh)(e),
              Mu = (e) => (Mu = Au.Eh)(e),
              Ou = (e, t) => (Ou = Au.Fh)(e, t),
              Iu = (e, t) => (Iu = Au.Gh)(e, t),
              ju = () => (ju = Au.Hh)(),
              Uu = (e) => (Uu = Au.Ih)(e),
              $u = (e) => ($u = Au.Jh)(e),
              qu = (e) => (qu = Au.Kh)(e),
              Hu = (e) => (Hu = Au.Lh)(e),
              Nu = (e, t, r) => (Nu = Au.Mh)(e, t, r),
              Vu = (e) => (Vu = Au.Nh)(e);
            function zu(e = f) {
              function r() {
                xu ||
                  ((xu = !0),
                  (u.calledRun = !0),
                  I ||
                    (u.noFSInit || Se.init.initialized || Se.init(),
                    (Se.ignorePermissions = !1),
                    be.init(),
                    ie(H),
                    ie(N),
                    t(u),
                    u.onRuntimeInitialized && u.onRuntimeInitialized(),
                    Wu &&
                      (function (e = []) {
                        var t = Fu;
                        e.unshift(p);
                        var r = e.length,
                          n = $u(4 * (r + 1)),
                          o = n;
                        e.forEach((e) => {
                          (R[o >> 2] = gu(e)), (o += 4);
                        }),
                          (R[o >> 2] = 0);
                        try {
                          var i = t(r, n);
                          return cr(i, !0), i;
                        } catch (e) {
                          return sr(e);
                        }
                      })(e),
                    (function () {
                      if (u.postRun)
                        for (
                          "function" == typeof u.postRun &&
                          (u.postRun = [u.postRun]);
                          u.postRun.length;

                        )
                          (e = u.postRun.shift()), V.unshift(e);
                      var e;
                      ie(V);
                    })()));
              }
              z > 0 ||
                ((function () {
                  if (u.preRun)
                    for (
                      "function" == typeof u.preRun && (u.preRun = [u.preRun]);
                      u.preRun.length;

                    )
                      (e = u.preRun.shift()), q.unshift(e);
                  var e;
                  ie(q);
                })(),
                z > 0 ||
                  (u.setStatus
                    ? (u.setStatus("Running..."),
                      setTimeout(function () {
                        setTimeout(function () {
                          u.setStatus("");
                        }, 1),
                          r();
                      }, 1))
                    : r()));
            }
            if (
              ((u.___start_em_js = 2489223),
              (u.___stop_em_js = 2490058),
              (u.addRunDependency = X),
              (u.removeRunDependency = Y),
              (u.FS_createPath = Se.createPath),
              (u.FS_createLazyFile = Se.createLazyFile),
              (u.FS_createDevice = Se.createDevice),
              (u.ccall = (e, t, r, n, o) => {
                var i = {
                    string: (e) => {
                      var t = 0;
                      return null != e && 0 !== e && (t = gu(e)), t;
                    },
                    array: (e) => {
                      var t = $u(e.length);
                      return pu(e, t), t;
                    },
                  },
                  a = ((e) => u["_" + e])(e),
                  s = [],
                  c = 0;
                if (n)
                  for (var l = 0; l < n.length; l++) {
                    var d = i[r[l]];
                    d
                      ? (0 === c && (c = ju()), (s[l] = d(n[l])))
                      : (s[l] = n[l]);
                  }
                var h,
                  f = a.apply(null, s);
                return (
                  (h = f),
                  0 !== c && Uu(c),
                  (f = (function (e) {
                    return "string" === t
                      ? ke(e)
                      : "boolean" === t
                      ? Boolean(e)
                      : e;
                  })(h)),
                  f
                );
              }),
              (u.getValue = function (e, t = "i8") {
                switch ((t.endsWith("*") && (t = "*"), t)) {
                  case "i1":
                  case "i8":
                    return T[e >> 0];
                  case "i16":
                    return P[e >> 1];
                  case "i32":
                    return L[e >> 2];
                  case "i64":
                    return D[e >> 3];
                  case "float":
                    return B[e >> 2];
                  case "double":
                    return O[e >> 3];
                  case "*":
                    return R[e >> 2];
                  default:
                    K(`invalid type for getValue: ${t}`);
                }
              }),
              (u.UTF8ToString = ke),
              (u.specialHTMLTargets = au),
              (u.FS_createPreloadedFile = Se.createPreloadedFile),
              (u.FS_createDataFile = Se.createDataFile),
              (u.FS_unlink = Se.unlink),
              (G = function e() {
                xu || zu(), xu || (G = e);
              }),
              u.preInit)
            )
              for (
                "function" == typeof u.preInit && (u.preInit = [u.preInit]);
                u.preInit.length > 0;

              )
                u.preInit.pop()();
            var Wu = !0;
            return u.noInitialRun && (Wu = !1), zu(), e.ready;
          });
      "object" == typeof e && "object" == typeof t
        ? (t.exports = n)
        : "function" == typeof define && define.amd && define([], () => n);
    },
  }),
  cloneLoadashDebounce = cloneWithPrototypeAndProperties(lodashDebounce()),
  cloneLodashIsEqual = cloneWithPrototypeAndProperties(lodashIsEqual());
