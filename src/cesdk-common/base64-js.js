import { createLazyModule } from "./others/createLazyModule";

export var base64JsIndex = createLazyModule({
  "../../../node_modules/base64-js/index.js"(e) {
    (e.byteLength = function (e) {
      var t = a(e), r = t[0], n = t[1];
      return (3 * (r + n)) / 4 - n;
    }),
      (e.toByteArray = function (e) {
        var t, r, i = a(e), s = i[0], u = i[1], c = new o(
          (function (e, t, r) {
            return (3 * (t + r)) / 4 - r;
          })(0, s, u)
        ), l = 0, d = u > 0 ? s - 4 : s;
        for (r = 0; r < d; r += 4)
          (t =
            (n[e.charCodeAt(r)] << 18) |
            (n[e.charCodeAt(r + 1)] << 12) |
            (n[e.charCodeAt(r + 2)] << 6) |
            n[e.charCodeAt(r + 3)]),
            (c[l++] = (t >> 16) & 255),
            (c[l++] = (t >> 8) & 255),
            (c[l++] = 255 & t);
        2 === u &&
          ((t = (n[e.charCodeAt(r)] << 2) | (n[e.charCodeAt(r + 1)] >> 4)),
            (c[l++] = 255 & t));
        1 === u &&
          ((t =
            (n[e.charCodeAt(r)] << 10) |
            (n[e.charCodeAt(r + 1)] << 4) |
            (n[e.charCodeAt(r + 2)] >> 2)),
            (c[l++] = (t >> 8) & 255),
            (c[l++] = 255 & t));
        return c;
      }),
      (e.fromByteArray = function (e) {
        for (var t, n = e.length, o = n % 3, i = [], a = 16383, u = 0, c = n - o; u < c; u += a)
          i.push(s(e, u, u + a > c ? c : u + a));
        1 === o
          ? ((t = e[n - 1]), i.push(r[t >> 2] + r[(t << 4) & 63] + "=="))
          : 2 === o &&
          ((t = (e[n - 2] << 8) + e[n - 1]),
            i.push(r[t >> 10] + r[(t >> 4) & 63] + r[(t << 2) & 63] + "="));
        return i.join("");
      });
    var t, r = [], n = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (t = 0, 64; t < 64; ++t) (r[t] = i[t]), (n[i.charCodeAt(t)] = t);
    function a(e) {
      var t = e.length;
      if (t % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
      var r = e.indexOf("=");
      return -1 === r && (r = t), [r, r === t ? 0 : 4 - (r % 4)];
    }
    function s(e, t, n) {
      for (var o, i, a = [], s = t; s < n; s += 3)
        (o =
          ((e[s] << 16) & 16711680) +
          ((e[s + 1] << 8) & 65280) +
          (255 & e[s + 2])),
          a.push(
            r[((i = o) >> 18) & 63] +
            r[(i >> 12) & 63] +
            r[(i >> 6) & 63] +
            r[63 & i]
          );
      return a.join("");
    }
    (n["-".charCodeAt(0)] = 62), (n["_".charCodeAt(0)] = 63);
  },
});
