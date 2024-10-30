import { createLazyModule } from "./others/createLazyModule";

export var ieee754Index = createLazyModule({
  "../../../node_modules/ieee754/index.js"(e) {
    (e.read = function (e, t, r, n, o) {
      var i, a, s = 8 * o - n - 1, u = (1 << s) - 1, c = u >> 1, l = -7, d = r ? o - 1 : 0, h = r ? -1 : 1, f = e[t + d];
      for (d += h, i = f & ((1 << -l) - 1), f >>= -l, l += s; l > 0; i = 256 * i + e[t + d], d += h, l -= 8);
      for (a = i & ((1 << -l) - 1), i >>= -l, l += n; l > 0; a = 256 * a + e[t + d], d += h, l -= 8);
      if (0 === i) i = 1 - c;
      else {
        if (i === u) return a ? NaN : (1 / 0) * (f ? -1 : 1);
        (a += Math.pow(2, n)), (i -= c);
      }
      return (f ? -1 : 1) * a * Math.pow(2, i - n);
    }),
      (e.write = function (e, t, r, n, o, i) {
        var a, s, u, c = 8 * i - o - 1, l = (1 << c) - 1, d = l >> 1, h = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, f = n ? 0 : i - 1, p = n ? 1 : -1, m = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
        for (t = Math.abs(t),
          isNaN(t) || t === 1 / 0
            ? ((s = isNaN(t) ? 1 : 0), (a = l))
            : ((a = Math.floor(Math.log(t) / Math.LN2)),
              t * (u = Math.pow(2, -a)) < 1 && (a--, (u *= 2)),
              (t += a + d >= 1 ? h / u : h * Math.pow(2, 1 - d)) * u >= 2 &&
              (a++, (u /= 2)),
              a + d >= l
                ? ((s = 0), (a = l))
                : a + d >= 1
                  ? ((s = (t * u - 1) * Math.pow(2, o)), (a += d))
                  : ((s = t * Math.pow(2, d - 1) * Math.pow(2, o)), (a = 0))); o >= 8; e[r + f] = 255 & s, f += p, s /= 256, o -= 8);
        for (a = (a << o) | s, c += o; c > 0; e[r + f] = 255 & a, f += p, a /= 256, c -= 8);
        e[r + f - p] |= 128 * m;
      });
  },
});
