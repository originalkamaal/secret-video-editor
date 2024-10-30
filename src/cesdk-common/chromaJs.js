import { createLazyModule } from "./others/createLazyModule";

export var chromaJs = createLazyModule({
  "../../node_modules/chroma-js/chroma.js"(e, t) {
    var n, s;
    (n = e),
      (s = function () {
        for (var e = function (e, t, n) {
          return (
            void 0 === t && (t = 0),
            void 0 === n && (n = 1),
            e < t ? t : e > n ? n : e
          );
        }, t = {}, n = 0, s = [
          "Boolean",
          "Number",
          "String",
          "Function",
          "Array",
          "Date",
          "RegExp",
          "Undefined",
          "Null",
        ]; n < s.length; n += 1) {
          var i = s[n];
          t["[object " + i + "]"] = i.toLowerCase();
        }
        var o = function (e) {
          return t[Object.prototype.toString.call(e)] || "object";
        }, r = Math.PI, a = {
          clip_rgb: function (t) {
            (t._clipped = !1), (t._unclipped = t.slice(0));
            for (var n = 0; n <= 3; n++)
              n < 3
                ? ((t[n] < 0 || t[n] > 255) && (t._clipped = !0),
                  (t[n] = e(t[n], 0, 255)))
                : 3 === n && (t[n] = e(t[n], 0, 1));
            return t;
          },
          limit: e,
          type: o,
          unpack: function (e, t) {
            return (
              void 0 === t && (t = null),
              e.length >= 3
                ? Array.prototype.slice.call(e)
                : "object" == o(e[0]) && t
                  ? t
                    .split("")
                    .filter(function (t) {
                      return void 0 !== e[0][t];
                    })
                    .map(function (t) {
                      return e[0][t];
                    })
                  : e[0]
            );
          },
          last: function (e) {
            if (e.length < 2) return null;
            var t = e.length - 1;
            return "string" == o(e[t]) ? e[t].toLowerCase() : null;
          },
          PI: r,
          TWOPI: 2 * r,
          PITHIRD: r / 3,
          DEG2RAD: r / 180,
          RAD2DEG: 180 / r,
        }, l = { format: {}, autodetect: [] }, c = a.last, u = a.clip_rgb, d = a.type, p = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n = this;
          if ("object" === d(e[0]) &&
            e[0].constructor &&
            e[0].constructor === this.constructor)
            return e[0];
          var s = c(e), i = !1;
          if (!s) {
            (i = !0),
              l.sorted ||
              ((l.autodetect = l.autodetect.sort(function (e, t) {
                return t.p - e.p;
              })),
                (l.sorted = !0));
            for (var o = 0, r = l.autodetect; o < r.length; o += 1) {
              var a = r[o];
              if ((s = a.test.apply(a, e))) break;
            }
          }
          if (!l.format[s]) throw new Error("unknown format: " + e);
          var p = l.format[s].apply(null, i ? e : e.slice(0, -1));
          (n._rgb = u(p)), 3 === n._rgb.length && n._rgb.push(1);
        };
        p.prototype.toString = function () {
          return "function" == d(this.hex)
            ? this.hex()
            : "[" + this._rgb.join(",") + "]";
        };
        var f = p, h = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          return new (Function.prototype.bind.apply(
            h.Color,
            [null].concat(e)
          ))();
        };
        (h.Color = f), (h.version = "2.1.2");
        var m = h, g = a.unpack, x = Math.max, b = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n = g(e, "rgb"), s = n[0], i = n[1], o = n[2], r = 1 - x((s /= 255), x((i /= 255), (o /= 255))), a = r < 1 ? 1 / (1 - r) : 0;
          return [(1 - s - r) * a, (1 - i - r) * a, (1 - o - r) * a, r];
        }, y = a.unpack, v = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n = (e = y(e, "cmyk"))[0], s = e[1], i = e[2], o = e[3], r = e.length > 4 ? e[4] : 1;
          return 1 === o
            ? [0, 0, 0, r]
            : [
              n >= 1 ? 0 : 255 * (1 - n) * (1 - o),
              s >= 1 ? 0 : 255 * (1 - s) * (1 - o),
              i >= 1 ? 0 : 255 * (1 - i) * (1 - o),
              r,
            ];
        }, w = a.unpack, k = a.type;
        (f.prototype.cmyk = function () {
          return b(this._rgb);
        }),
          (m.cmyk = function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            return new (Function.prototype.bind.apply(
              f,
              [null].concat(e, ["cmyk"])
            ))();
          }),
          (l.format.cmyk = v),
          l.autodetect.push({
            p: 2,
            test: function () {
              for (var e = [], t = arguments.length; t--;)
                e[t] = arguments[t];
              if (((e = w(e, "cmyk")), "array" === k(e) && 4 === e.length))
                return "cmyk";
            },
          });
        var C = a.unpack, j = a.last, S = function (e) {
          return Math.round(100 * e) / 100;
        }, _ = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n = C(e, "hsla"), s = j(e) || "lsa";
          return (
            (n[0] = S(n[0] || 0)),
            (n[1] = S(100 * n[1]) + "%"),
            (n[2] = S(100 * n[2]) + "%"),
            "hsla" === s || (n.length > 3 && n[3] < 1)
              ? ((n[3] = n.length > 3 ? n[3] : 1), (s = "hsla"))
              : (n.length = 3),
            s + "(" + n.join(",") + ")"
          );
        }, E = a.unpack, L = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n = (e = E(e, "rgba"))[0], s = e[1], i = e[2];
          (n /= 255), (s /= 255), (i /= 255);
          var o, r, a = Math.min(n, s, i), l = Math.max(n, s, i), c = (l + a) / 2;
          return (
            l === a
              ? ((o = 0), (r = Number.NaN))
              : (o = c < 0.5 ? (l - a) / (l + a) : (l - a) / (2 - l - a)),
            n == l
              ? (r = (s - i) / (l - a))
              : s == l
                ? (r = 2 + (i - n) / (l - a))
                : i == l && (r = 4 + (n - s) / (l - a)),
            (r *= 60) < 0 && (r += 360),
            e.length > 3 && void 0 !== e[3] ? [r, o, c, e[3]] : [r, o, c]
          );
        }, P = a.unpack, A = a.last, B = Math.round, T = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n = P(e, "rgba"), s = A(e) || "rgb";
          return "hsl" == s.substr(0, 3)
            ? _(L(n), s)
            : ((n[0] = B(n[0])),
              (n[1] = B(n[1])),
              (n[2] = B(n[2])),
              ("rgba" === s || (n.length > 3 && n[3] < 1)) &&
              ((n[3] = n.length > 3 ? n[3] : 1), (s = "rgba")),
              s + "(" + n.slice(0, "rgb" === s ? 3 : 4).join(",") + ")");
        }, M = a.unpack, O = Math.round, R = function () {
          for (var e, t = [], n = arguments.length; n--;)
            t[n] = arguments[n];
          var s, i, o, r = (t = M(t, "hsl"))[0], a = t[1], l = t[2];
          if (0 === a) s = i = o = 255 * l;
          else {
            var c = [0, 0, 0], u = [0, 0, 0], d = l < 0.5 ? l * (1 + a) : l + a - l * a, p = 2 * l - d, f = r / 360;
            (c[0] = f + 1 / 3), (c[1] = f), (c[2] = f - 1 / 3);
            for (var h = 0; h < 3; h++)
              c[h] < 0 && (c[h] += 1),
                c[h] > 1 && (c[h] -= 1),
                6 * c[h] < 1
                  ? (u[h] = p + 6 * (d - p) * c[h])
                  : 2 * c[h] < 1
                    ? (u[h] = d)
                    : 3 * c[h] < 2
                      ? (u[h] = p + (d - p) * (2 / 3 - c[h]) * 6)
                      : (u[h] = p);
            (s = (e = [O(255 * u[0]), O(255 * u[1]), O(255 * u[2])])[0]),
              (i = e[1]),
              (o = e[2]);
          }
          return t.length > 3 ? [s, i, o, t[3]] : [s, i, o, 1];
        }, V = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/, D = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/, F = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/, I = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/, H = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/, N = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/, U = Math.round, z = function (e) {
          var t;
          if (((e = e.toLowerCase().trim()), l.format.named))
            try {
              return l.format.named(e);
            } catch (e) { }
          if ((t = e.match(V))) {
            for (var n = t.slice(1, 4), s = 0; s < 3; s++) n[s] = +n[s];
            return (n[3] = 1), n;
          }
          if ((t = e.match(D))) {
            for (var i = t.slice(1, 5), o = 0; o < 4; o++) i[o] = +i[o];
            return i;
          }
          if ((t = e.match(F))) {
            for (var r = t.slice(1, 4), a = 0; a < 3; a++)
              r[a] = U(2.55 * r[a]);
            return (r[3] = 1), r;
          }
          if ((t = e.match(I))) {
            for (var c = t.slice(1, 5), u = 0; u < 3; u++)
              c[u] = U(2.55 * c[u]);
            return (c[3] = +c[3]), c;
          }
          if ((t = e.match(H))) {
            var d = t.slice(1, 4);
            (d[1] *= 0.01), (d[2] *= 0.01);
            var p = R(d);
            return (p[3] = 1), p;
          }
          if ((t = e.match(N))) {
            var f = t.slice(1, 4);
            (f[1] *= 0.01), (f[2] *= 0.01);
            var h = R(f);
            return (h[3] = +t[4]), h;
          }
        };
        z.test = function (e) {
          return (
            V.test(e) ||
            D.test(e) ||
            F.test(e) ||
            I.test(e) ||
            H.test(e) ||
            N.test(e)
          );
        };
        var $ = z, q = a.type;
        (f.prototype.css = function (e) {
          return T(this._rgb, e);
        }),
          (m.css = function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            return new (Function.prototype.bind.apply(
              f,
              [null].concat(e, ["css"])
            ))();
          }),
          (l.format.css = $),
          l.autodetect.push({
            p: 5,
            test: function (e) {
              for (var t = [], n = arguments.length - 1; n-- > 0;)
                t[n] = arguments[n + 1];
              if (!t.length && "string" === q(e) && $.test(e)) return "css";
            },
          });
        var Q = a.unpack;
        (l.format.gl = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n = Q(e, "rgba");
          return (n[0] *= 255), (n[1] *= 255), (n[2] *= 255), n;
        }),
          (m.gl = function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            return new (Function.prototype.bind.apply(
              f,
              [null].concat(e, ["gl"])
            ))();
          }),
          (f.prototype.gl = function () {
            var e = this._rgb;
            return [e[0] / 255, e[1] / 255, e[2] / 255, e[3]];
          });
        var G = a.unpack, Z = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n, s = G(e, "rgb"), i = s[0], o = s[1], r = s[2], a = Math.min(i, o, r), l = Math.max(i, o, r), c = l - a, u = (100 * c) / 255, d = (a / (255 - c)) * 100;
          return (
            0 === c
              ? (n = Number.NaN)
              : (i === l && (n = (o - r) / c),
                o === l && (n = 2 + (r - i) / c),
                r === l && (n = 4 + (i - o) / c),
                (n *= 60) < 0 && (n += 360)),
            [n, u, d]
          );
        }, W = a.unpack, K = Math.floor, Y = function () {
          for (var e, t, n, s, i, o, r = [], a = arguments.length; a--;)
            r[a] = arguments[a];
          var l, c, u, d = (r = W(r, "hcg"))[0], p = r[1], f = r[2];
          f *= 255;
          var h = 255 * p;
          if (0 === p) l = c = u = f;
          else {
            360 === d && (d = 0),
              d > 360 && (d -= 360),
              d < 0 && (d += 360);
            var m = K((d /= 60)), g = d - m, x = f * (1 - p), b = x + h * (1 - g), y = x + h * g, v = x + h;
            switch (m) {
              case 0:
                (l = (e = [v, y, x])[0]), (c = e[1]), (u = e[2]);
                break;
              case 1:
                (l = (t = [b, v, x])[0]), (c = t[1]), (u = t[2]);
                break;
              case 2:
                (l = (n = [x, v, y])[0]), (c = n[1]), (u = n[2]);
                break;
              case 3:
                (l = (s = [x, b, v])[0]), (c = s[1]), (u = s[2]);
                break;
              case 4:
                (l = (i = [y, x, v])[0]), (c = i[1]), (u = i[2]);
                break;
              case 5:
                (l = (o = [v, x, b])[0]), (c = o[1]), (u = o[2]);
            }
          }
          return [l, c, u, r.length > 3 ? r[3] : 1];
        }, X = a.unpack, J = a.type;
        (f.prototype.hcg = function () {
          return Z(this._rgb);
        }),
          (m.hcg = function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            return new (Function.prototype.bind.apply(
              f,
              [null].concat(e, ["hcg"])
            ))();
          }),
          (l.format.hcg = Y),
          l.autodetect.push({
            p: 1,
            test: function () {
              for (var e = [], t = arguments.length; t--;)
                e[t] = arguments[t];
              if (((e = X(e, "hcg")), "array" === J(e) && 3 === e.length))
                return "hcg";
            },
          });
        var ee = a.unpack, te = a.last, ne = Math.round, se = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n = ee(e, "rgba"), s = n[0], i = n[1], o = n[2], r = n[3], a = te(e) || "auto";
          void 0 === r && (r = 1),
            "auto" === a && (a = r < 1 ? "rgba" : "rgb");
          var l = "000000" +
            (
              ((s = ne(s)) << 16) |
              ((i = ne(i)) << 8) |
              (o = ne(o))
            ).toString(16);
          l = l.substr(l.length - 6);
          var c = "0" + ne(255 * r).toString(16);
          switch (((c = c.substr(c.length - 2)), a.toLowerCase())) {
            case "rgba":
              return "#" + l + c;
            case "argb":
              return "#" + c + l;
            default:
              return "#" + l;
          }
        }, ie = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, oe = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/, re = function (e) {
          if (e.match(ie)) {
            (4 !== e.length && 7 !== e.length) || (e = e.substr(1)),
              3 === e.length &&
              (e =
                (e = e.split(""))[0] + e[0] + e[1] + e[1] + e[2] + e[2]);
            var t = parseInt(e, 16);
            return [t >> 16, (t >> 8) & 255, 255 & t, 1];
          }
          if (e.match(oe)) {
            (5 !== e.length && 9 !== e.length) || (e = e.substr(1)),
              4 === e.length &&
              (e =
                (e = e.split(""))[0] +
                e[0] +
                e[1] +
                e[1] +
                e[2] +
                e[2] +
                e[3] +
                e[3]);
            var n = parseInt(e, 16);
            return [
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              Math.round(((255 & n) / 255) * 100) / 100,
            ];
          }
          throw new Error("unknown hex color: " + e);
        }, ae = a.type;
        (f.prototype.hex = function (e) {
          return se(this._rgb, e);
        }),
          (m.hex = function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            return new (Function.prototype.bind.apply(
              f,
              [null].concat(e, ["hex"])
            ))();
          }),
          (l.format.hex = re),
          l.autodetect.push({
            p: 4,
            test: function (e) {
              for (var t = [], n = arguments.length - 1; n-- > 0;)
                t[n] = arguments[n + 1];
              if (!t.length &&
                "string" === ae(e) &&
                [3, 4, 5, 6, 7, 8, 9].indexOf(e.length) >= 0)
                return "hex";
            },
          });
        var le = a.unpack, ce = a.TWOPI, ue = Math.min, de = Math.sqrt, pe = Math.acos, fe = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n, s = le(e, "rgb"), i = s[0], o = s[1], r = s[2], a = ue((i /= 255), (o /= 255), (r /= 255)), l = (i + o + r) / 3, c = l > 0 ? 1 - a / l : 0;
          return (
            0 === c
              ? (n = NaN)
              : ((n = (i - o + (i - r)) / 2),
                (n /= de((i - o) * (i - o) + (i - r) * (o - r))),
                (n = pe(n)),
                r > o && (n = ce - n),
                (n /= ce)),
            [360 * n, c, l]
          );
        }, he = a.unpack, me = a.limit, ge = a.TWOPI, xe = a.PITHIRD, be = Math.cos, ye = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n, s, i, o = (e = he(e, "hsi"))[0], r = e[1], a = e[2];
          return (
            isNaN(o) && (o = 0),
            isNaN(r) && (r = 0),
            o > 360 && (o -= 360),
            o < 0 && (o += 360),
            (o /= 360) < 1 / 3
              ? (s =
                1 -
                ((i = (1 - r) / 3) +
                  (n = (1 + (r * be(ge * o)) / be(xe - ge * o)) / 3)))
              : o < 2 / 3
                ? (i =
                  1 -
                  ((n = (1 - r) / 3) +
                    (s =
                      (1 + (r * be(ge * (o -= 1 / 3))) / be(xe - ge * o)) /
                      3)))
                : (n =
                  1 -
                  ((s = (1 - r) / 3) +
                    (i =
                      (1 + (r * be(ge * (o -= 2 / 3))) / be(xe - ge * o)) /
                      3))),
            [
              255 * (n = me(a * n * 3)),
              255 * (s = me(a * s * 3)),
              255 * (i = me(a * i * 3)),
              e.length > 3 ? e[3] : 1,
            ]
          );
        }, ve = a.unpack, we = a.type;
        (f.prototype.hsi = function () {
          return fe(this._rgb);
        }),
          (m.hsi = function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            return new (Function.prototype.bind.apply(
              f,
              [null].concat(e, ["hsi"])
            ))();
          }),
          (l.format.hsi = ye),
          l.autodetect.push({
            p: 2,
            test: function () {
              for (var e = [], t = arguments.length; t--;)
                e[t] = arguments[t];
              if (((e = ve(e, "hsi")), "array" === we(e) && 3 === e.length))
                return "hsi";
            },
          });
        var ke = a.unpack, Ce = a.type;
        (f.prototype.hsl = function () {
          return L(this._rgb);
        }),
          (m.hsl = function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            return new (Function.prototype.bind.apply(
              f,
              [null].concat(e, ["hsl"])
            ))();
          }),
          (l.format.hsl = R),
          l.autodetect.push({
            p: 2,
            test: function () {
              for (var e = [], t = arguments.length; t--;)
                e[t] = arguments[t];
              if (((e = ke(e, "hsl")), "array" === Ce(e) && 3 === e.length))
                return "hsl";
            },
          });
        var je = a.unpack, Se = Math.min, _e = Math.max, Ee = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n, s, i, o = (e = je(e, "rgb"))[0], r = e[1], a = e[2], l = Se(o, r, a), c = _e(o, r, a), u = c - l;
          return (
            (i = c / 255),
            0 === c
              ? ((n = Number.NaN), (s = 0))
              : ((s = u / c),
                o === c && (n = (r - a) / u),
                r === c && (n = 2 + (a - o) / u),
                a === c && (n = 4 + (o - r) / u),
                (n *= 60) < 0 && (n += 360)),
            [n, s, i]
          );
        }, Le = a.unpack, Pe = Math.floor, Ae = function () {
          for (var e, t, n, s, i, o, r = [], a = arguments.length; a--;)
            r[a] = arguments[a];
          var l, c, u, d = (r = Le(r, "hsv"))[0], p = r[1], f = r[2];
          if (((f *= 255), 0 === p)) l = c = u = f;
          else {
            360 === d && (d = 0),
              d > 360 && (d -= 360),
              d < 0 && (d += 360);
            var h = Pe((d /= 60)), m = d - h, g = f * (1 - p), x = f * (1 - p * m), b = f * (1 - p * (1 - m));
            switch (h) {
              case 0:
                (l = (e = [f, b, g])[0]), (c = e[1]), (u = e[2]);
                break;
              case 1:
                (l = (t = [x, f, g])[0]), (c = t[1]), (u = t[2]);
                break;
              case 2:
                (l = (n = [g, f, b])[0]), (c = n[1]), (u = n[2]);
                break;
              case 3:
                (l = (s = [g, x, f])[0]), (c = s[1]), (u = s[2]);
                break;
              case 4:
                (l = (i = [b, g, f])[0]), (c = i[1]), (u = i[2]);
                break;
              case 5:
                (l = (o = [f, g, x])[0]), (c = o[1]), (u = o[2]);
            }
          }
          return [l, c, u, r.length > 3 ? r[3] : 1];
        }, Be = a.unpack, Te = a.type;
        (f.prototype.hsv = function () {
          return Ee(this._rgb);
        }),
          (m.hsv = function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            return new (Function.prototype.bind.apply(
              f,
              [null].concat(e, ["hsv"])
            ))();
          }),
          (l.format.hsv = Ae),
          l.autodetect.push({
            p: 2,
            test: function () {
              for (var e = [], t = arguments.length; t--;)
                e[t] = arguments[t];
              if (((e = Be(e, "hsv")), "array" === Te(e) && 3 === e.length))
                return "hsv";
            },
          });
        var Me = 18, Oe = 0.95047, Re = 1, Ve = 1.08883, De = 0.137931034, Fe = 0.206896552, Ie = 0.12841855, He = 0.008856452, Ne = a.unpack, Ue = Math.pow, ze = function (e) {
          return (e /= 255) <= 0.04045
            ? e / 12.92
            : Ue((e + 0.055) / 1.055, 2.4);
        }, $e = function (e) {
          return e > He ? Ue(e, 1 / 3) : e / Ie + De;
        }, qe = function (e, t, n) {
          return (
            (e = ze(e)),
            (t = ze(t)),
            (n = ze(n)),
            [
              $e((0.4124564 * e + 0.3575761 * t + 0.1804375 * n) / Oe),
              $e((0.2126729 * e + 0.7151522 * t + 0.072175 * n) / Re),
              $e((0.0193339 * e + 0.119192 * t + 0.9503041 * n) / Ve),
            ]
          );
        }, Qe = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n = Ne(e, "rgb"), s = n[0], i = n[1], o = n[2], r = qe(s, i, o), a = r[0], l = r[1], c = 116 * l - 16;
          return [c < 0 ? 0 : c, 500 * (a - l), 200 * (l - r[2])];
        }, Ge = a.unpack, Ze = Math.pow, We = function (e) {
          return (
            255 *
            (e <= 0.00304 ? 12.92 * e : 1.055 * Ze(e, 1 / 2.4) - 0.055)
          );
        }, Ke = function (e) {
          return e > Fe ? e * e * e : Ie * (e - De);
        }, Ye = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n, s, i, o = (e = Ge(e, "lab"))[0], r = e[1], a = e[2];
          return (
            (s = (o + 16) / 116),
            (n = isNaN(r) ? s : s + r / 500),
            (i = isNaN(a) ? s : s - a / 200),
            (s = Re * Ke(s)),
            (n = Oe * Ke(n)),
            (i = Ve * Ke(i)),
            [
              We(3.2404542 * n - 1.5371385 * s - 0.4985314 * i),
              We(-0.969266 * n + 1.8760108 * s + 0.041556 * i),
              We(0.0556434 * n - 0.2040259 * s + 1.0572252 * i),
              e.length > 3 ? e[3] : 1,
            ]
          );
        }, Xe = a.unpack, Je = a.type;
        (f.prototype.lab = function () {
          return Qe(this._rgb);
        }),
          (m.lab = function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            return new (Function.prototype.bind.apply(
              f,
              [null].concat(e, ["lab"])
            ))();
          }),
          (l.format.lab = Ye),
          l.autodetect.push({
            p: 2,
            test: function () {
              for (var e = [], t = arguments.length; t--;)
                e[t] = arguments[t];
              if (((e = Xe(e, "lab")), "array" === Je(e) && 3 === e.length))
                return "lab";
            },
          });
        var et = a.unpack, tt = a.RAD2DEG, nt = Math.sqrt, st = Math.atan2, it = Math.round, ot = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n = et(e, "lab"), s = n[0], i = n[1], o = n[2], r = nt(i * i + o * o), a = (st(o, i) * tt + 360) % 360;
          return 0 === it(1e4 * r) && (a = Number.NaN), [s, r, a];
        }, rt = a.unpack, at = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n = rt(e, "rgb"), s = n[0], i = n[1], o = n[2], r = Qe(s, i, o), a = r[0], l = r[1], c = r[2];
          return ot(a, l, c);
        }, lt = a.unpack, ct = a.DEG2RAD, ut = Math.sin, dt = Math.cos, pt = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n = lt(e, "lch"), s = n[0], i = n[1], o = n[2];
          return isNaN(o) && (o = 0), [s, dt((o *= ct)) * i, ut(o) * i];
        }, ft = a.unpack, ht = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n = (e = ft(e, "lch"))[0], s = e[1], i = e[2], o = pt(n, s, i), r = o[0], a = o[1], l = o[2], c = Ye(r, a, l);
          return [c[0], c[1], c[2], e.length > 3 ? e[3] : 1];
        }, mt = a.unpack, gt = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n = mt(e, "hcl").reverse();
          return ht.apply(void 0, n);
        }, xt = a.unpack, bt = a.type;
        (f.prototype.lch = function () {
          return at(this._rgb);
        }),
          (f.prototype.hcl = function () {
            return at(this._rgb).reverse();
          }),
          (m.lch = function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            return new (Function.prototype.bind.apply(
              f,
              [null].concat(e, ["lch"])
            ))();
          }),
          (m.hcl = function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            return new (Function.prototype.bind.apply(
              f,
              [null].concat(e, ["hcl"])
            ))();
          }),
          (l.format.lch = ht),
          (l.format.hcl = gt),
          ["lch", "hcl"].forEach(function (e) {
            return l.autodetect.push({
              p: 2,
              test: function () {
                for (var t = [], n = arguments.length; n--;)
                  t[n] = arguments[n];
                if (((t = xt(t, e)), "array" === bt(t) && 3 === t.length))
                  return e;
              },
            });
          });
        var yt = {
          aliceblue: "#f0f8ff",
          antiquewhite: "#faebd7",
          aqua: "#00ffff",
          aquamarine: "#7fffd4",
          azure: "#f0ffff",
          beige: "#f5f5dc",
          bisque: "#ffe4c4",
          black: "#000000",
          blanchedalmond: "#ffebcd",
          blue: "#0000ff",
          blueviolet: "#8a2be2",
          brown: "#a52a2a",
          burlywood: "#deb887",
          cadetblue: "#5f9ea0",
          chartreuse: "#7fff00",
          chocolate: "#d2691e",
          coral: "#ff7f50",
          cornflower: "#6495ed",
          cornflowerblue: "#6495ed",
          cornsilk: "#fff8dc",
          crimson: "#dc143c",
          cyan: "#00ffff",
          darkblue: "#00008b",
          darkcyan: "#008b8b",
          darkgoldenrod: "#b8860b",
          darkgray: "#a9a9a9",
          darkgreen: "#006400",
          darkgrey: "#a9a9a9",
          darkkhaki: "#bdb76b",
          darkmagenta: "#8b008b",
          darkolivegreen: "#556b2f",
          darkorange: "#ff8c00",
          darkorchid: "#9932cc",
          darkred: "#8b0000",
          darksalmon: "#e9967a",
          darkseagreen: "#8fbc8f",
          darkslateblue: "#483d8b",
          darkslategray: "#2f4f4f",
          darkslategrey: "#2f4f4f",
          darkturquoise: "#00ced1",
          darkviolet: "#9400d3",
          deeppink: "#ff1493",
          deepskyblue: "#00bfff",
          dimgray: "#696969",
          dimgrey: "#696969",
          dodgerblue: "#1e90ff",
          firebrick: "#b22222",
          floralwhite: "#fffaf0",
          forestgreen: "#228b22",
          fuchsia: "#ff00ff",
          gainsboro: "#dcdcdc",
          ghostwhite: "#f8f8ff",
          gold: "#ffd700",
          goldenrod: "#daa520",
          gray: "#808080",
          green: "#008000",
          greenyellow: "#adff2f",
          grey: "#808080",
          honeydew: "#f0fff0",
          hotpink: "#ff69b4",
          indianred: "#cd5c5c",
          indigo: "#4b0082",
          ivory: "#fffff0",
          khaki: "#f0e68c",
          laserlemon: "#ffff54",
          lavender: "#e6e6fa",
          lavenderblush: "#fff0f5",
          lawngreen: "#7cfc00",
          lemonchiffon: "#fffacd",
          lightblue: "#add8e6",
          lightcoral: "#f08080",
          lightcyan: "#e0ffff",
          lightgoldenrod: "#fafad2",
          lightgoldenrodyellow: "#fafad2",
          lightgray: "#d3d3d3",
          lightgreen: "#90ee90",
          lightgrey: "#d3d3d3",
          lightpink: "#ffb6c1",
          lightsalmon: "#ffa07a",
          lightseagreen: "#20b2aa",
          lightskyblue: "#87cefa",
          lightslategray: "#778899",
          lightslategrey: "#778899",
          lightsteelblue: "#b0c4de",
          lightyellow: "#ffffe0",
          lime: "#00ff00",
          limegreen: "#32cd32",
          linen: "#faf0e6",
          magenta: "#ff00ff",
          maroon: "#800000",
          maroon2: "#7f0000",
          maroon3: "#b03060",
          mediumaquamarine: "#66cdaa",
          mediumblue: "#0000cd",
          mediumorchid: "#ba55d3",
          mediumpurple: "#9370db",
          mediumseagreen: "#3cb371",
          mediumslateblue: "#7b68ee",
          mediumspringgreen: "#00fa9a",
          mediumturquoise: "#48d1cc",
          mediumvioletred: "#c71585",
          midnightblue: "#191970",
          mintcream: "#f5fffa",
          mistyrose: "#ffe4e1",
          moccasin: "#ffe4b5",
          navajowhite: "#ffdead",
          navy: "#000080",
          oldlace: "#fdf5e6",
          olive: "#808000",
          olivedrab: "#6b8e23",
          orange: "#ffa500",
          orangered: "#ff4500",
          orchid: "#da70d6",
          palegoldenrod: "#eee8aa",
          palegreen: "#98fb98",
          paleturquoise: "#afeeee",
          palevioletred: "#db7093",
          papayawhip: "#ffefd5",
          peachpuff: "#ffdab9",
          peru: "#cd853f",
          pink: "#ffc0cb",
          plum: "#dda0dd",
          powderblue: "#b0e0e6",
          purple: "#800080",
          purple2: "#7f007f",
          purple3: "#a020f0",
          rebeccapurple: "#663399",
          red: "#ff0000",
          rosybrown: "#bc8f8f",
          royalblue: "#4169e1",
          saddlebrown: "#8b4513",
          salmon: "#fa8072",
          sandybrown: "#f4a460",
          seagreen: "#2e8b57",
          seashell: "#fff5ee",
          sienna: "#a0522d",
          silver: "#c0c0c0",
          skyblue: "#87ceeb",
          slateblue: "#6a5acd",
          slategray: "#708090",
          slategrey: "#708090",
          snow: "#fffafa",
          springgreen: "#00ff7f",
          steelblue: "#4682b4",
          tan: "#d2b48c",
          teal: "#008080",
          thistle: "#d8bfd8",
          tomato: "#ff6347",
          turquoise: "#40e0d0",
          violet: "#ee82ee",
          wheat: "#f5deb3",
          white: "#ffffff",
          whitesmoke: "#f5f5f5",
          yellow: "#ffff00",
          yellowgreen: "#9acd32",
        }, vt = a.type;
        (f.prototype.name = function () {
          for (var e = se(this._rgb, "rgb"), t = 0, n = Object.keys(yt); t < n.length; t += 1) {
            var s = n[t];
            if (yt[s] === e) return s.toLowerCase();
          }
          return e;
        }),
          (l.format.named = function (e) {
            if (((e = e.toLowerCase()), yt[e])) return re(yt[e]);
            throw new Error("unknown color name: " + e);
          }),
          l.autodetect.push({
            p: 5,
            test: function (e) {
              for (var t = [], n = arguments.length - 1; n-- > 0;)
                t[n] = arguments[n + 1];
              if (!t.length && "string" === vt(e) && yt[e.toLowerCase()])
                return "named";
            },
          });
        var wt = a.unpack, kt = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          var n = wt(e, "rgb");
          return (n[0] << 16) + (n[1] << 8) + n[2];
        }, Ct = a.type, jt = function (e) {
          if ("number" == Ct(e) && e >= 0 && e <= 16777215)
            return [e >> 16, (e >> 8) & 255, 255 & e, 1];
          throw new Error("unknown num color: " + e);
        }, St = a.type;
        (f.prototype.num = function () {
          return kt(this._rgb);
        }),
          (m.num = function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            return new (Function.prototype.bind.apply(
              f,
              [null].concat(e, ["num"])
            ))();
          }),
          (l.format.num = jt),
          l.autodetect.push({
            p: 5,
            test: function () {
              for (var e = [], t = arguments.length; t--;)
                e[t] = arguments[t];
              if (1 === e.length &&
                "number" === St(e[0]) &&
                e[0] >= 0 &&
                e[0] <= 16777215)
                return "num";
            },
          });
        var _t = a.unpack, Et = a.type, Lt = Math.round;
        (f.prototype.rgb = function (e) {
          return (
            void 0 === e && (e = !0),
            !1 === e ? this._rgb.slice(0, 3) : this._rgb.slice(0, 3).map(Lt)
          );
        }),
          (f.prototype.rgba = function (e) {
            return (
              void 0 === e && (e = !0),
              this._rgb.slice(0, 4).map(function (t, n) {
                return n < 3 ? (!1 === e ? t : Lt(t)) : t;
              })
            );
          }),
          (m.rgb = function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            return new (Function.prototype.bind.apply(
              f,
              [null].concat(e, ["rgb"])
            ))();
          }),
          (l.format.rgb = function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            var n = _t(e, "rgba");
            return void 0 === n[3] && (n[3] = 1), n;
          }),
          l.autodetect.push({
            p: 3,
            test: function () {
              for (var e = [], t = arguments.length; t--;)
                e[t] = arguments[t];
              if (((e = _t(e, "rgba")),
                "array" === Et(e) &&
                (3 === e.length ||
                  (4 === e.length &&
                    "number" == Et(e[3]) &&
                    e[3] >= 0 &&
                    e[3] <= 1))))
                return "rgb";
            },
          });
        var Pt = Math.log, At = function (e) {
          var t, n, s, i = e / 100;
          return (
            i < 66
              ? ((t = 255),
                (n =
                  -155.25485562709179 -
                  0.44596950469579133 * (n = i - 2) +
                  104.49216199393888 * Pt(n)),
                (s =
                  i < 20
                    ? 0
                    : 0.8274096064007395 * (s = i - 10) -
                    254.76935184120902 +
                    115.67994401066147 * Pt(s)))
              : ((t =
                351.97690566805693 +
                0.114206453784165 * (t = i - 55) -
                40.25366309332127 * Pt(t)),
                (n =
                  325.4494125711974 +
                  0.07943456536662342 * (n = i - 50) -
                  28.0852963507957 * Pt(n)),
                (s = 255)),
            [t, n, s, 1]
          );
        }, Bt = a.unpack, Tt = Math.round, Mt = function () {
          for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
          for (var n, s = Bt(e, "rgb"), i = s[0], o = s[2], r = 1e3, a = 4e4; a - r > 0.4;) {
            var l = At((n = 0.5 * (a + r)));
            l[2] / l[0] >= o / i ? (a = n) : (r = n);
          }
          return Tt(n);
        };
        (f.prototype.temp =
          f.prototype.kelvin =
          f.prototype.temperature =
          function () {
            return Mt(this._rgb);
          }),
          (m.temp =
            m.kelvin =
            m.temperature =
            function () {
              for (var e = [], t = arguments.length; t--;)
                e[t] = arguments[t];
              return new (Function.prototype.bind.apply(
                f,
                [null].concat(e, ["temp"])
              ))();
            }),
          (l.format.temp = l.format.kelvin = l.format.temperature = At);
        var Ot = a.type;
        (f.prototype.alpha = function (e, t) {
          return (
            void 0 === t && (t = !1),
            void 0 !== e && "number" === Ot(e)
              ? t
                ? ((this._rgb[3] = e), this)
                : new f([this._rgb[0], this._rgb[1], this._rgb[2], e], "rgb")
              : this._rgb[3]
          );
        }),
          (f.prototype.clipped = function () {
            return this._rgb._clipped || !1;
          }),
          (f.prototype.darken = function (e) {
            void 0 === e && (e = 1);
            var t = this.lab();
            return (t[0] -= Me * e), new f(t, "lab").alpha(this.alpha(), !0);
          }),
          (f.prototype.brighten = function (e) {
            return void 0 === e && (e = 1), this.darken(-e);
          }),
          (f.prototype.darker = f.prototype.darken),
          (f.prototype.brighter = f.prototype.brighten),
          (f.prototype.get = function (e) {
            var t = e.split("."), n = t[0], s = t[1], i = this[n]();
            if (s) {
              var o = n.indexOf(s);
              if (o > -1) return i[o];
              throw new Error("unknown channel " + s + " in mode " + n);
            }
            return i;
          });
        var Rt = a.type, Vt = Math.pow;
        f.prototype.luminance = function (e) {
          if (void 0 !== e && "number" === Rt(e)) {
            if (0 === e) return new f([0, 0, 0, this._rgb[3]], "rgb");
            if (1 === e) return new f([255, 255, 255, this._rgb[3]], "rgb");
            var t = this.luminance(), n = 20, s = function (t, i) {
              var o = t.interpolate(i, 0.5, "rgb"), r = o.luminance();
              return Math.abs(e - r) < 1e-7 || !n--
                ? o
                : r > e
                  ? s(t, o)
                  : s(o, i);
            }, i = (
              t > e
                ? s(new f([0, 0, 0]), this)
                : s(this, new f([255, 255, 255]))
            ).rgb();
            return new f(i.concat([this._rgb[3]]));
          }
          return Dt.apply(void 0, this._rgb.slice(0, 3));
        };
        var Dt = function (e, t, n) {
          return (
            0.2126 * (e = Ft(e)) +
            0.7152 * (t = Ft(t)) +
            0.0722 * (n = Ft(n))
          );
        }, Ft = function (e) {
          return (e /= 255) <= 0.03928
            ? e / 12.92
            : Vt((e + 0.055) / 1.055, 2.4);
        }, It = {}, Ht = a.type, Nt = function (e, t, n) {
          void 0 === n && (n = 0.5);
          for (var s = [], i = arguments.length - 3; i-- > 0;)
            s[i] = arguments[i + 3];
          var o = s[0] || "lrgb";
          if ((It[o] || s.length || (o = Object.keys(It)[0]), !It[o]))
            throw new Error("interpolation mode " + o + " is not defined");
          return (
            "object" !== Ht(e) && (e = new f(e)),
            "object" !== Ht(t) && (t = new f(t)),
            It[o](e, t, n).alpha(e.alpha() + n * (t.alpha() - e.alpha()))
          );
        };
        (f.prototype.mix = f.prototype.interpolate =
          function (e, t) {
            void 0 === t && (t = 0.5);
            for (var n = [], s = arguments.length - 2; s-- > 0;)
              n[s] = arguments[s + 2];
            return Nt.apply(void 0, [this, e, t].concat(n));
          }),
          (f.prototype.premultiply = function (e) {
            void 0 === e && (e = !1);
            var t = this._rgb, n = t[3];
            return e
              ? ((this._rgb = [t[0] * n, t[1] * n, t[2] * n, n]), this)
              : new f([t[0] * n, t[1] * n, t[2] * n, n], "rgb");
          }),
          (f.prototype.saturate = function (e) {
            void 0 === e && (e = 1);
            var t = this.lch();
            return (
              (t[1] += Me * e),
              t[1] < 0 && (t[1] = 0),
              new f(t, "lch").alpha(this.alpha(), !0)
            );
          }),
          (f.prototype.desaturate = function (e) {
            return void 0 === e && (e = 1), this.saturate(-e);
          });
        var Ut = a.type;
        (f.prototype.set = function (e, t, n) {
          void 0 === n && (n = !1);
          var s = e.split("."), i = s[0], o = s[1], r = this[i]();
          if (o) {
            var a = i.indexOf(o);
            if (a > -1) {
              if ("string" == Ut(t))
                switch (t.charAt(0)) {
                  case "+":
                  case "-":
                    r[a] += +t;
                    break;
                  case "*":
                    r[a] *= +t.substr(1);
                    break;
                  case "/":
                    r[a] /= +t.substr(1);
                    break;
                  default:
                    r[a] = +t;
                }
              else {
                if ("number" !== Ut(t))
                  throw new Error("unsupported value for Color.set");
                r[a] = t;
              }
              var l = new f(r, i);
              return n ? ((this._rgb = l._rgb), this) : l;
            }
            throw new Error("unknown channel " + o + " in mode " + i);
          }
          return r;
        }),
          (It.rgb = function (e, t, n) {
            var s = e._rgb, i = t._rgb;
            return new f(
              s[0] + n * (i[0] - s[0]),
              s[1] + n * (i[1] - s[1]),
              s[2] + n * (i[2] - s[2]),
              "rgb"
            );
          });
        var zt = Math.sqrt, $t = Math.pow;
        (It.lrgb = function (e, t, n) {
          var s = e._rgb, i = s[0], o = s[1], r = s[2], a = t._rgb, l = a[0], c = a[1], u = a[2];
          return new f(
            zt($t(i, 2) * (1 - n) + $t(l, 2) * n),
            zt($t(o, 2) * (1 - n) + $t(c, 2) * n),
            zt($t(r, 2) * (1 - n) + $t(u, 2) * n),
            "rgb"
          );
        }),
          (It.lab = function (e, t, n) {
            var s = e.lab(), i = t.lab();
            return new f(
              s[0] + n * (i[0] - s[0]),
              s[1] + n * (i[1] - s[1]),
              s[2] + n * (i[2] - s[2]),
              "lab"
            );
          });
        var qt = function (e, t, n, s) {
          var i, o, r, a, l, c, u, d, p, h, m, g;
          return (
            "hsl" === s
              ? ((r = e.hsl()), (a = t.hsl()))
              : "hsv" === s
                ? ((r = e.hsv()), (a = t.hsv()))
                : "hcg" === s
                  ? ((r = e.hcg()), (a = t.hcg()))
                  : "hsi" === s
                    ? ((r = e.hsi()), (a = t.hsi()))
                    : ("lch" !== s && "hcl" !== s) ||
                    ((s = "hcl"), (r = e.hcl()), (a = t.hcl())),
            "h" === s.substr(0, 1) &&
            ((l = (i = r)[0]),
              (u = i[1]),
              (p = i[2]),
              (c = (o = a)[0]),
              (d = o[1]),
              (h = o[2])),
            isNaN(l) || isNaN(c)
              ? isNaN(l)
                ? isNaN(c)
                  ? (g = Number.NaN)
                  : ((g = c), (1 != p && 0 != p) || "hsv" == s || (m = d))
                : ((g = l), (1 != h && 0 != h) || "hsv" == s || (m = u))
              : (g =
                l +
                n *
                (c > l && c - l > 180
                  ? c - (l + 360)
                  : c < l && l - c > 180
                    ? c + 360 - l
                    : c - l)),
            void 0 === m && (m = u + n * (d - u)),
            new f([g, m, p + n * (h - p)], s)
          );
        }, Qt = function (e, t, n) {
          return qt(e, t, n, "lch");
        };
        (It.lch = Qt),
          (It.hcl = Qt),
          (It.num = function (e, t, n) {
            var s = e.num(), i = t.num();
            return new f(s + n * (i - s), "num");
          }),
          (It.hcg = function (e, t, n) {
            return qt(e, t, n, "hcg");
          }),
          (It.hsi = function (e, t, n) {
            return qt(e, t, n, "hsi");
          }),
          (It.hsl = function (e, t, n) {
            return qt(e, t, n, "hsl");
          }),
          (It.hsv = function (e, t, n) {
            return qt(e, t, n, "hsv");
          });
        var Gt = a.clip_rgb, Zt = Math.pow, Wt = Math.sqrt, Kt = Math.PI, Yt = Math.cos, Xt = Math.sin, Jt = Math.atan2, en = function (e, t) {
          for (var n = e.length, s = [0, 0, 0, 0], i = 0; i < e.length; i++) {
            var o = e[i], r = t[i] / n, a = o._rgb;
            (s[0] += Zt(a[0], 2) * r),
              (s[1] += Zt(a[1], 2) * r),
              (s[2] += Zt(a[2], 2) * r),
              (s[3] += a[3] * r);
          }
          return (
            (s[0] = Wt(s[0])),
            (s[1] = Wt(s[1])),
            (s[2] = Wt(s[2])),
            s[3] > 0.9999999 && (s[3] = 1),
            new f(Gt(s))
          );
        }, tn = a.type, nn = Math.pow, sn = function (e) {
          var t = "rgb", n = m("#ccc"), s = 0, i = [0, 1], o = [], r = [0, 0], a = !1, l = [], c = !1, u = 0, d = 1, p = !1, f = {}, h = !0, g = 1, x = function (e) {
            if (((e = e || ["#fff", "#000"]) &&
              "string" === tn(e) &&
              m.brewer &&
              m.brewer[e.toLowerCase()] &&
              (e = m.brewer[e.toLowerCase()]),
              "array" === tn(e))) {
              1 === e.length && (e = [e[0], e[0]]), (e = e.slice(0));
              for (var t = 0; t < e.length; t++) e[t] = m(e[t]);
              o.length = 0;
              for (var n = 0; n < e.length; n++)
                o.push(n / (e.length - 1));
            }
            return w(), (l = e);
          }, b = function (e) {
            return e;
          }, y = function (e) {
            return e;
          }, v = function (e, s) {
            var i, c;
            if ((null == s && (s = !1), isNaN(e) || null === e)) return n;
            if (s) c = e;
            else if (a && a.length > 2) {
              var p = (function (e) {
                if (null != a) {
                  for (var t = a.length - 1, n = 0; n < t && e >= a[n];)
                    n++;
                  return n - 1;
                }
                return 0;
              })(e);
              c = p / (a.length - 2);
            } else c = d !== u ? (e - u) / (d - u) : 1;
            (c = y(c)),
              s || (c = b(c)),
              1 !== g && (c = nn(c, g)),
              (c = r[0] + c * (1 - r[0] - r[1])),
              (c = Math.min(1, Math.max(0, c)));
            var x = Math.floor(1e4 * c);
            if (h && f[x]) i = f[x];
            else {
              if ("array" === tn(l))
                for (var v = 0; v < o.length; v++) {
                  var w = o[v];
                  if (c <= w) {
                    i = l[v];
                    break;
                  }
                  if (c >= w && v === o.length - 1) {
                    i = l[v];
                    break;
                  }
                  if (c > w && c < o[v + 1]) {
                    (c = (c - w) / (o[v + 1] - w)),
                      (i = m.interpolate(l[v], l[v + 1], c, t));
                    break;
                  }
                }
              else "function" === tn(l) && (i = l(c));
              h && (f[x] = i);
            }
            return i;
          }, w = function () {
            return (f = {});
          };
          x(e);
          var k = function (e) {
            var t = m(v(e));
            return c && t[c] ? t[c]() : t;
          };
          return (
            (k.classes = function (e) {
              if (null != e) {
                if ("array" === tn(e))
                  (a = e), (i = [e[0], e[e.length - 1]]);
                else {
                  var t = m.analyze(i);
                  a = 0 === e ? [t.min, t.max] : m.limits(t, "e", e);
                }
                return k;
              }
              return a;
            }),
            (k.domain = function (e) {
              if (!arguments.length) return i;
              (u = e[0]), (d = e[e.length - 1]), (o = []);
              var t = l.length;
              if (e.length === t && u !== d)
                for (var n = 0, s = Array.from(e); n < s.length; n += 1) {
                  var r = s[n];
                  o.push((r - u) / (d - u));
                }
              else {
                for (var a = 0; a < t; a++) o.push(a / (t - 1));
                if (e.length > 2) {
                  var c = e.map(function (t, n) {
                    return n / (e.length - 1);
                  }), p = e.map(function (e) {
                    return (e - u) / (d - u);
                  });
                  p.every(function (e, t) {
                    return c[t] === e;
                  }) ||
                    (y = function (e) {
                      if (e <= 0 || e >= 1) return e;
                      for (var t = 0; e >= p[t + 1];) t++;
                      var n = (e - p[t]) / (p[t + 1] - p[t]);
                      return c[t] + n * (c[t + 1] - c[t]);
                    });
                }
              }
              return (i = [u, d]), k;
            }),
            (k.mode = function (e) {
              return arguments.length ? ((t = e), w(), k) : t;
            }),
            (k.range = function (e, t) {
              return x(e), k;
            }),
            (k.out = function (e) {
              return (c = e), k;
            }),
            (k.spread = function (e) {
              return arguments.length ? ((s = e), k) : s;
            }),
            (k.correctLightness = function (e) {
              return (
                null == e && (e = !0),
                (p = e),
                w(),
                (b = p
                  ? function (e) {
                    for (var t = v(0, !0).lab()[0], n = v(1, !0).lab()[0], s = t > n, i = v(e, !0).lab()[0], o = t + (n - t) * e, r = i - o, a = 0, l = 1, c = 20; Math.abs(r) > 0.01 && c-- > 0;)
                      s && (r *= -1),
                        r < 0
                          ? ((a = e), (e += 0.5 * (l - e)))
                          : ((l = e), (e += 0.5 * (a - e))),
                        (i = v(e, !0).lab()[0]),
                        (r = i - o);
                    return e;
                  }
                  : function (e) {
                    return e;
                  }),
                k
              );
            }),
            (k.padding = function (e) {
              return null != e
                ? ("number" === tn(e) && (e = [e, e]), (r = e), k)
                : r;
            }),
            (k.colors = function (t, n) {
              arguments.length < 2 && (n = "hex");
              var s = [];
              if (0 === arguments.length) s = l.slice(0);
              else if (1 === t) s = [k(0.5)];
              else if (t > 1) {
                var o = i[0], r = i[1] - o;
                s = (function (e, t, n) {
                  for (var s = [], i = e < t, o = n ? (i ? t + 1 : t - 1) : t, r = e; i ? r < o : r > o; i ? r++ : r--)
                    s.push(r);
                  return s;
                })(0, t, !1).map(function (e) {
                  return k(o + (e / (t - 1)) * r);
                });
              } else {
                e = [];
                var c = [];
                if (a && a.length > 2)
                  for (var u = 1, d = a.length, p = 1 <= d; p ? u < d : u > d; p ? u++ : u--)
                    c.push(0.5 * (a[u - 1] + a[u]));
                else c = i;
                s = c.map(function (e) {
                  return k(e);
                });
              }
              return (
                m[n] &&
                (s = s.map(function (e) {
                  return e[n]();
                })),
                s
              );
            }),
            (k.cache = function (e) {
              return null != e ? ((h = e), k) : h;
            }),
            (k.gamma = function (e) {
              return null != e ? ((g = e), k) : g;
            }),
            (k.nodata = function (e) {
              return null != e ? ((n = m(e)), k) : n;
            }),
            k
          );
        }, on = function (e) {
          var t, n, s, i, o, r, a;
          if (2 ===
            (e = e.map(function (e) {
              return new f(e);
            })).length)
            (t = e.map(function (e) {
              return e.lab();
            })),
              (o = t[0]),
              (r = t[1]),
              (i = function (e) {
                var t = [0, 1, 2].map(function (t) {
                  return o[t] + e * (r[t] - o[t]);
                });
                return new f(t, "lab");
              });
          else if (3 === e.length)
            (n = e.map(function (e) {
              return e.lab();
            })),
              (o = n[0]),
              (r = n[1]),
              (a = n[2]),
              (i = function (e) {
                var t = [0, 1, 2].map(function (t) {
                  return (
                    (1 - e) * (1 - e) * o[t] +
                    2 * (1 - e) * e * r[t] +
                    e * e * a[t]
                  );
                });
                return new f(t, "lab");
              });
          else if (4 === e.length) {
            var l;
            (s = e.map(function (e) {
              return e.lab();
            })),
              (o = s[0]),
              (r = s[1]),
              (a = s[2]),
              (l = s[3]),
              (i = function (e) {
                var t = [0, 1, 2].map(function (t) {
                  return (
                    (1 - e) * (1 - e) * (1 - e) * o[t] +
                    3 * (1 - e) * (1 - e) * e * r[t] +
                    3 * (1 - e) * e * e * a[t] +
                    e * e * e * l[t]
                  );
                });
                return new f(t, "lab");
              });
          } else if (5 === e.length) {
            var c = on(e.slice(0, 3)), u = on(e.slice(2, 5));
            i = function (e) {
              return e < 0.5 ? c(2 * e) : u(2 * (e - 0.5));
            };
          }
          return i;
        }, rn = function (e, t, n) {
          if (!rn[n]) throw new Error("unknown blend mode " + n);
          return rn[n](e, t);
        }, an = function (e) {
          return function (t, n) {
            var s = m(n).rgb(), i = m(t).rgb();
            return m.rgb(e(s, i));
          };
        }, ln = function (e) {
          return function (t, n) {
            var s = [];
            return (
              (s[0] = e(t[0], n[0])),
              (s[1] = e(t[1], n[1])),
              (s[2] = e(t[2], n[2])),
              s
            );
          };
        };
        (rn.normal = an(
          ln(function (e) {
            return e;
          })
        )),
          (rn.multiply = an(
            ln(function (e, t) {
              return (e * t) / 255;
            })
          )),
          (rn.screen = an(
            ln(function (e, t) {
              return 255 * (1 - (1 - e / 255) * (1 - t / 255));
            })
          )),
          (rn.overlay = an(
            ln(function (e, t) {
              return t < 128
                ? (2 * e * t) / 255
                : 255 * (1 - 2 * (1 - e / 255) * (1 - t / 255));
            })
          )),
          (rn.darken = an(
            ln(function (e, t) {
              return e > t ? t : e;
            })
          )),
          (rn.lighten = an(
            ln(function (e, t) {
              return e > t ? e : t;
            })
          )),
          (rn.dodge = an(
            ln(function (e, t) {
              return 255 === e ||
                (e = ((t / 255) * 255) / (1 - e / 255)) > 255
                ? 255
                : e;
            })
          )),
          (rn.burn = an(
            ln(function (e, t) {
              return 255 * (1 - (1 - t / 255) / (e / 255));
            })
          ));
        for (var cn = rn, un = a.type, dn = a.clip_rgb, pn = a.TWOPI, fn = Math.pow, hn = Math.sin, mn = Math.cos, gn = Math.floor, xn = Math.random, bn = Math.log, yn = Math.pow, vn = Math.floor, wn = Math.abs, kn = function (e, t) {
          void 0 === t && (t = null);
          var n = {
            min: Number.MAX_VALUE,
            max: -1 * Number.MAX_VALUE,
            sum: 0,
            values: [],
            count: 0,
          };
          return (
            "object" === o(e) && (e = Object.values(e)),
            e.forEach(function (e) {
              t && "object" === o(e) && (e = e[t]),
                null == e ||
                isNaN(e) ||
                (n.values.push(e),
                  (n.sum += e),
                  e < n.min && (n.min = e),
                  e > n.max && (n.max = e),
                  (n.count += 1));
            }),
            (n.domain = [n.min, n.max]),
            (n.limits = function (e, t) {
              return Cn(n, e, t);
            }),
            n
          );
        }, Cn = function (e, t, n) {
          void 0 === t && (t = "equal"),
            void 0 === n && (n = 7),
            "array" == o(e) && (e = kn(e));
          var s = e.min, i = e.max, r = e.values.sort(function (e, t) {
            return e - t;
          });
          if (1 === n) return [s, i];
          var a = [];
          if (("c" === t.substr(0, 1) && (a.push(s), a.push(i)),
            "e" === t.substr(0, 1))) {
            a.push(s);
            for (var l = 1; l < n; l++) a.push(s + (l / n) * (i - s));
            a.push(i);
          } else if ("l" === t.substr(0, 1)) {
            if (s <= 0)
              throw new Error(
                "Logarithmic scales are only possible for values > 0"
              );
            var c = Math.LOG10E * bn(s), u = Math.LOG10E * bn(i);
            a.push(s);
            for (var d = 1; d < n; d++)
              a.push(yn(10, c + (d / n) * (u - c)));
            a.push(i);
          } else if ("q" === t.substr(0, 1)) {
            a.push(s);
            for (var p = 1; p < n; p++) {
              var f = ((r.length - 1) * p) / n, h = vn(f);
              if (h === f) a.push(r[h]);
              else {
                var m = f - h;
                a.push(r[h] * (1 - m) + r[h + 1] * m);
              }
            }
            a.push(i);
          } else if ("k" === t.substr(0, 1)) {
            var g, x = r.length, b = new Array(x), y = new Array(n), v = !0, w = 0, k = null;
            (k = []).push(s);
            for (var C = 1; C < n; C++) k.push(s + (C / n) * (i - s));
            for (k.push(i); v;) {
              for (var j = 0; j < n; j++) y[j] = 0;
              for (var S = 0; S < x; S++)
                for (var _ = r[S], E = Number.MAX_VALUE, L = void 0, P = 0; P < n; P++) {
                  var A = wn(k[P] - _);
                  A < E && ((E = A), (L = P)), y[L]++, (b[S] = L);
                }
              for (var B = new Array(n), T = 0; T < n; T++) B[T] = null;
              for (var M = 0; M < x; M++)
                null === B[(g = b[M])] ? (B[g] = r[M]) : (B[g] += r[M]);
              for (var O = 0; O < n; O++) B[O] *= 1 / y[O];
              v = !1;
              for (var R = 0; R < n; R++)
                if (B[R] !== k[R]) {
                  v = !0;
                  break;
                }
              (k = B), ++w > 200 && (v = !1);
            }
            for (var V = {}, D = 0; D < n; D++) V[D] = [];
            for (var F = 0; F < x; F++) V[(g = b[F])].push(r[F]);
            for (var I = [], H = 0; H < n; H++)
              I.push(V[H][0]), I.push(V[H][V[H].length - 1]);
            (I = I.sort(function (e, t) {
              return e - t;
            })),
              a.push(I[0]);
            for (var N = 1; N < I.length; N += 2) {
              var U = I[N];
              isNaN(U) || -1 !== a.indexOf(U) || a.push(U);
            }
          }
          return a;
        }, jn = { analyze: kn, limits: Cn }, Sn = Math.sqrt, _n = Math.atan2, En = Math.abs, Ln = Math.cos, Pn = Math.PI, An = {
          cool: function () {
            return sn([m.hsl(180, 1, 0.9), m.hsl(250, 0.7, 0.4)]);
          },
          hot: function () {
            return sn(["#000", "#f00", "#ff0", "#fff"]).mode("rgb");
          },
        }, Bn = {
          OrRd: [
            "#fff7ec",
            "#fee8c8",
            "#fdd49e",
            "#fdbb84",
            "#fc8d59",
            "#ef6548",
            "#d7301f",
            "#b30000",
            "#7f0000",
          ],
          PuBu: [
            "#fff7fb",
            "#ece7f2",
            "#d0d1e6",
            "#a6bddb",
            "#74a9cf",
            "#3690c0",
            "#0570b0",
            "#045a8d",
            "#023858",
          ],
          BuPu: [
            "#f7fcfd",
            "#e0ecf4",
            "#bfd3e6",
            "#9ebcda",
            "#8c96c6",
            "#8c6bb1",
            "#88419d",
            "#810f7c",
            "#4d004b",
          ],
          Oranges: [
            "#fff5eb",
            "#fee6ce",
            "#fdd0a2",
            "#fdae6b",
            "#fd8d3c",
            "#f16913",
            "#d94801",
            "#a63603",
            "#7f2704",
          ],
          BuGn: [
            "#f7fcfd",
            "#e5f5f9",
            "#ccece6",
            "#99d8c9",
            "#66c2a4",
            "#41ae76",
            "#238b45",
            "#006d2c",
            "#00441b",
          ],
          YlOrBr: [
            "#ffffe5",
            "#fff7bc",
            "#fee391",
            "#fec44f",
            "#fe9929",
            "#ec7014",
            "#cc4c02",
            "#993404",
            "#662506",
          ],
          YlGn: [
            "#ffffe5",
            "#f7fcb9",
            "#d9f0a3",
            "#addd8e",
            "#78c679",
            "#41ab5d",
            "#238443",
            "#006837",
            "#004529",
          ],
          Reds: [
            "#fff5f0",
            "#fee0d2",
            "#fcbba1",
            "#fc9272",
            "#fb6a4a",
            "#ef3b2c",
            "#cb181d",
            "#a50f15",
            "#67000d",
          ],
          RdPu: [
            "#fff7f3",
            "#fde0dd",
            "#fcc5c0",
            "#fa9fb5",
            "#f768a1",
            "#dd3497",
            "#ae017e",
            "#7a0177",
            "#49006a",
          ],
          Greens: [
            "#f7fcf5",
            "#e5f5e0",
            "#c7e9c0",
            "#a1d99b",
            "#74c476",
            "#41ab5d",
            "#238b45",
            "#006d2c",
            "#00441b",
          ],
          YlGnBu: [
            "#ffffd9",
            "#edf8b1",
            "#c7e9b4",
            "#7fcdbb",
            "#41b6c4",
            "#1d91c0",
            "#225ea8",
            "#253494",
            "#081d58",
          ],
          Purples: [
            "#fcfbfd",
            "#efedf5",
            "#dadaeb",
            "#bcbddc",
            "#9e9ac8",
            "#807dba",
            "#6a51a3",
            "#54278f",
            "#3f007d",
          ],
          GnBu: [
            "#f7fcf0",
            "#e0f3db",
            "#ccebc5",
            "#a8ddb5",
            "#7bccc4",
            "#4eb3d3",
            "#2b8cbe",
            "#0868ac",
            "#084081",
          ],
          Greys: [
            "#ffffff",
            "#f0f0f0",
            "#d9d9d9",
            "#bdbdbd",
            "#969696",
            "#737373",
            "#525252",
            "#252525",
            "#000000",
          ],
          YlOrRd: [
            "#ffffcc",
            "#ffeda0",
            "#fed976",
            "#feb24c",
            "#fd8d3c",
            "#fc4e2a",
            "#e31a1c",
            "#bd0026",
            "#800026",
          ],
          PuRd: [
            "#f7f4f9",
            "#e7e1ef",
            "#d4b9da",
            "#c994c7",
            "#df65b0",
            "#e7298a",
            "#ce1256",
            "#980043",
            "#67001f",
          ],
          Blues: [
            "#f7fbff",
            "#deebf7",
            "#c6dbef",
            "#9ecae1",
            "#6baed6",
            "#4292c6",
            "#2171b5",
            "#08519c",
            "#08306b",
          ],
          PuBuGn: [
            "#fff7fb",
            "#ece2f0",
            "#d0d1e6",
            "#a6bddb",
            "#67a9cf",
            "#3690c0",
            "#02818a",
            "#016c59",
            "#014636",
          ],
          Viridis: [
            "#440154",
            "#482777",
            "#3f4a8a",
            "#31678e",
            "#26838f",
            "#1f9d8a",
            "#6cce5a",
            "#b6de2b",
            "#fee825",
          ],
          Spectral: [
            "#9e0142",
            "#d53e4f",
            "#f46d43",
            "#fdae61",
            "#fee08b",
            "#ffffbf",
            "#e6f598",
            "#abdda4",
            "#66c2a5",
            "#3288bd",
            "#5e4fa2",
          ],
          RdYlGn: [
            "#a50026",
            "#d73027",
            "#f46d43",
            "#fdae61",
            "#fee08b",
            "#ffffbf",
            "#d9ef8b",
            "#a6d96a",
            "#66bd63",
            "#1a9850",
            "#006837",
          ],
          RdBu: [
            "#67001f",
            "#b2182b",
            "#d6604d",
            "#f4a582",
            "#fddbc7",
            "#f7f7f7",
            "#d1e5f0",
            "#92c5de",
            "#4393c3",
            "#2166ac",
            "#053061",
          ],
          PiYG: [
            "#8e0152",
            "#c51b7d",
            "#de77ae",
            "#f1b6da",
            "#fde0ef",
            "#f7f7f7",
            "#e6f5d0",
            "#b8e186",
            "#7fbc41",
            "#4d9221",
            "#276419",
          ],
          PRGn: [
            "#40004b",
            "#762a83",
            "#9970ab",
            "#c2a5cf",
            "#e7d4e8",
            "#f7f7f7",
            "#d9f0d3",
            "#a6dba0",
            "#5aae61",
            "#1b7837",
            "#00441b",
          ],
          RdYlBu: [
            "#a50026",
            "#d73027",
            "#f46d43",
            "#fdae61",
            "#fee090",
            "#ffffbf",
            "#e0f3f8",
            "#abd9e9",
            "#74add1",
            "#4575b4",
            "#313695",
          ],
          BrBG: [
            "#543005",
            "#8c510a",
            "#bf812d",
            "#dfc27d",
            "#f6e8c3",
            "#f5f5f5",
            "#c7eae5",
            "#80cdc1",
            "#35978f",
            "#01665e",
            "#003c30",
          ],
          RdGy: [
            "#67001f",
            "#b2182b",
            "#d6604d",
            "#f4a582",
            "#fddbc7",
            "#ffffff",
            "#e0e0e0",
            "#bababa",
            "#878787",
            "#4d4d4d",
            "#1a1a1a",
          ],
          PuOr: [
            "#7f3b08",
            "#b35806",
            "#e08214",
            "#fdb863",
            "#fee0b6",
            "#f7f7f7",
            "#d8daeb",
            "#b2abd2",
            "#8073ac",
            "#542788",
            "#2d004b",
          ],
          Set2: [
            "#66c2a5",
            "#fc8d62",
            "#8da0cb",
            "#e78ac3",
            "#a6d854",
            "#ffd92f",
            "#e5c494",
            "#b3b3b3",
          ],
          Accent: [
            "#7fc97f",
            "#beaed4",
            "#fdc086",
            "#ffff99",
            "#386cb0",
            "#f0027f",
            "#bf5b17",
            "#666666",
          ],
          Set1: [
            "#e41a1c",
            "#377eb8",
            "#4daf4a",
            "#984ea3",
            "#ff7f00",
            "#ffff33",
            "#a65628",
            "#f781bf",
            "#999999",
          ],
          Set3: [
            "#8dd3c7",
            "#ffffb3",
            "#bebada",
            "#fb8072",
            "#80b1d3",
            "#fdb462",
            "#b3de69",
            "#fccde5",
            "#d9d9d9",
            "#bc80bd",
            "#ccebc5",
            "#ffed6f",
          ],
          Dark2: [
            "#1b9e77",
            "#d95f02",
            "#7570b3",
            "#e7298a",
            "#66a61e",
            "#e6ab02",
            "#a6761d",
            "#666666",
          ],
          Paired: [
            "#a6cee3",
            "#1f78b4",
            "#b2df8a",
            "#33a02c",
            "#fb9a99",
            "#e31a1c",
            "#fdbf6f",
            "#ff7f00",
            "#cab2d6",
            "#6a3d9a",
            "#ffff99",
            "#b15928",
          ],
          Pastel2: [
            "#b3e2cd",
            "#fdcdac",
            "#cbd5e8",
            "#f4cae4",
            "#e6f5c9",
            "#fff2ae",
            "#f1e2cc",
            "#cccccc",
          ],
          Pastel1: [
            "#fbb4ae",
            "#b3cde3",
            "#ccebc5",
            "#decbe4",
            "#fed9a6",
            "#ffffcc",
            "#e5d8bd",
            "#fddaec",
            "#f2f2f2",
          ],
        }, Tn = 0, Mn = Object.keys(Bn); Tn < Mn.length; Tn += 1) {
          var On = Mn[Tn];
          Bn[On.toLowerCase()] = Bn[On];
        }
        var Rn = Bn;
        return (
          (m.average = function (e, t, n) {
            void 0 === t && (t = "lrgb"), void 0 === n && (n = null);
            var s = e.length;
            n ||
              (n = Array.from(new Array(s)).map(function () {
                return 1;
              }));
            var i = s /
              n.reduce(function (e, t) {
                return e + t;
              });
            if ((n.forEach(function (e, t) {
              n[t] *= i;
            }),
              (e = e.map(function (e) {
                return new f(e);
              })),
              "lrgb" === t))
              return en(e, n);
            for (var o = e.shift(), r = o.get(t), a = [], l = 0, c = 0, u = 0; u < r.length; u++)
              if (((r[u] = (r[u] || 0) * n[0]),
                a.push(isNaN(r[u]) ? 0 : n[0]),
                "h" === t.charAt(u) && !isNaN(r[u]))) {
                var d = (r[u] / 180) * Kt;
                (l += Yt(d) * n[0]), (c += Xt(d) * n[0]);
              }
            var p = o.alpha() * n[0];
            e.forEach(function (e, s) {
              var i = e.get(t);
              p += e.alpha() * n[s + 1];
              for (var o = 0; o < r.length; o++)
                if (!isNaN(i[o]))
                  if (((a[o] += n[s + 1]), "h" === t.charAt(o))) {
                    var u = (i[o] / 180) * Kt;
                    (l += Yt(u) * n[s + 1]), (c += Xt(u) * n[s + 1]);
                  } else r[o] += i[o] * n[s + 1];
            });
            for (var h = 0; h < r.length; h++)
              if ("h" === t.charAt(h)) {
                for (var m = (Jt(c / a[h], l / a[h]) / Kt) * 180; m < 0;)
                  m += 360;
                for (; m >= 360;) m -= 360;
                r[h] = m;
              } else r[h] = r[h] / a[h];
            return (p /= s), new f(r, t).alpha(p > 0.99999 ? 1 : p, !0);
          }),
          (m.bezier = function (e) {
            var t = on(e);
            return (
              (t.scale = function () {
                return sn(t);
              }),
              t
            );
          }),
          (m.blend = cn),
          (m.cubehelix = function (e, t, n, s, i) {
            void 0 === e && (e = 300),
              void 0 === t && (t = -1.5),
              void 0 === n && (n = 1),
              void 0 === s && (s = 1),
              void 0 === i && (i = [0, 1]);
            var o, r = 0;
            "array" === un(i) ? (o = i[1] - i[0]) : ((o = 0), (i = [i, i]));
            var a = function (a) {
              var l = pn * ((e + 120) / 360 + t * a), c = fn(i[0] + o * a, s), u = ((0 !== r ? n[0] + a * r : n) * c * (1 - c)) / 2, d = mn(l), p = hn(l);
              return m(
                dn([
                  255 * (c + u * (-0.14861 * d + 1.78277 * p)),
                  255 * (c + u * (-0.29227 * d - 0.90649 * p)),
                  255 * (c + u * (1.97294 * d)),
                  1,
                ])
              );
            };
            return (
              (a.start = function (t) {
                return null == t ? e : ((e = t), a);
              }),
              (a.rotations = function (e) {
                return null == e ? t : ((t = e), a);
              }),
              (a.gamma = function (e) {
                return null == e ? s : ((s = e), a);
              }),
              (a.hue = function (e) {
                return null == e
                  ? n
                  : ("array" === un((n = e))
                    ? 0 == (r = n[1] - n[0]) && (n = n[1])
                    : (r = 0),
                    a);
              }),
              (a.lightness = function (e) {
                return null == e
                  ? i
                  : ("array" === un(e)
                    ? ((i = e), (o = e[1] - e[0]))
                    : ((i = [e, e]), (o = 0)),
                    a);
              }),
              (a.scale = function () {
                return m.scale(a);
              }),
              a.hue(n),
              a
            );
          }),
          (m.mix = m.interpolate = Nt),
          (m.random = function () {
            for (var e = "#", t = 0; t < 6; t++)
              e += "0123456789abcdef".charAt(gn(16 * xn()));
            return new f(e, "hex");
          }),
          (m.scale = sn),
          (m.analyze = jn.analyze),
          (m.contrast = function (e, t) {
            (e = new f(e)), (t = new f(t));
            var n = e.luminance(), s = t.luminance();
            return n > s ? (n + 0.05) / (s + 0.05) : (s + 0.05) / (n + 0.05);
          }),
          (m.deltaE = function (e, t, n, s) {
            void 0 === n && (n = 1),
              void 0 === s && (s = 1),
              (e = new f(e)),
              (t = new f(t));
            for (var i = Array.from(e.lab()), o = i[0], r = i[1], a = i[2], l = Array.from(t.lab()), c = l[0], u = l[1], d = l[2], p = Sn(r * r + a * a), h = Sn(u * u + d * d), m = o < 16 ? 0.511 : (0.040975 * o) / (1 + 0.01765 * o), g = (0.0638 * p) / (1 + 0.0131 * p) + 0.638, x = p < 1e-6 ? 0 : (180 * _n(a, r)) / Pn; x < 0;)
              x += 360;
            for (; x >= 360;) x -= 360;
            var b = x >= 164 && x <= 345
              ? 0.56 + En(0.2 * Ln((Pn * (x + 168)) / 180))
              : 0.36 + En(0.4 * Ln((Pn * (x + 35)) / 180)), y = p * p * p * p, v = Sn(y / (y + 1900)), w = g * (v * b + 1 - v), k = p - h, C = r - u, j = a - d, S = (o - c) / (n * m), _ = k / (s * g);
            return Sn(S * S + _ * _ + (C * C + j * j - k * k) / (w * w));
          }),
          (m.distance = function (e, t, n) {
            void 0 === n && (n = "lab"), (e = new f(e)), (t = new f(t));
            var s = e.get(n), i = t.get(n), o = 0;
            for (var r in s) {
              var a = (s[r] || 0) - (i[r] || 0);
              o += a * a;
            }
            return Math.sqrt(o);
          }),
          (m.limits = jn.limits),
          (m.valid = function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            try {
              return (
                new (Function.prototype.bind.apply(f, [null].concat(e)))(), !0
              );
            } catch (e) {
              return !1;
            }
          }),
          (m.scales = An),
          (m.colors = yt),
          (m.brewer = Rn),
          m
        );
      }),
      "object" == typeof e && void 0 !== t
        ? (t.exports = s())
        : "function" == typeof define && define.amd
          ? define(s)
          : (n.chroma = s());
  },
});
