import { base64JsIndex } from "./base64-js";
import { createLazyModule } from "./others/createLazyModule";
import { ieee754Index } from "./ieee754Index";

export var bufferIndex = createLazyModule({
  "../../../node_modules/buffer/index.js"(e) {
    var t = base64JsIndex(), r = ieee754Index(), n = "function" == typeof Symbol && "function" == typeof Symbol.for
      ? Symbol.for("nodejs.util.inspect.custom")
      : null;
    (e.Buffer = a),
      (e.SlowBuffer = function (e) {
        +e != e && (e = 0);
        return a.alloc(+e);
      }),
      (e.INSPECT_MAX_BYTES = 50);
    var o = 2147483647;
    function i(e) {
      if (e > o)
        throw new RangeError(
          'The value "' + e + '" is invalid for option "size"'
        );
      var t = new Uint8Array(e);
      return Object.setPrototypeOf(t, a.prototype), t;
    }
    function a(e, t, r) {
      if ("number" == typeof e) {
        if ("string" == typeof t)
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        return c(e);
      }
      return s(e, t, r);
    }
    function s(e, t, r) {
      if ("string" == typeof e)
        return (function (e, t) {
          ("string" == typeof t && "" !== t) || (t = "utf8");
          if (!a.isEncoding(t)) throw new TypeError("Unknown encoding: " + t);
          var r = 0 | f(e, t), n = i(r), o = n.write(e, t);
          o !== r && (n = n.slice(0, o));
          return n;
        })(e, t);
      if (ArrayBuffer.isView(e))
        return (function (e) {
          if (U(e, Uint8Array)) {
            var t = new Uint8Array(e);
            return d(t.buffer, t.byteOffset, t.byteLength);
          }
          return l(e);
        })(e);
      if (null == e)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof e
        );
      if (U(e, ArrayBuffer) || (e && U(e.buffer, ArrayBuffer)))
        return d(e, t, r);
      if ("undefined" != typeof SharedArrayBuffer &&
        (U(e, SharedArrayBuffer) || (e && U(e.buffer, SharedArrayBuffer))))
        return d(e, t, r);
      if ("number" == typeof e)
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      var n = e.valueOf && e.valueOf();
      if (null != n && n !== e) return a.from(n, t, r);
      var o = (function (e) {
        if (a.isBuffer(e)) {
          var t = 0 | h(e.length), r = i(t);
          return 0 === r.length || e.copy(r, 0, 0, t), r;
        }
        if (void 0 !== e.length)
          return "number" != typeof e.length || $(e.length) ? i(0) : l(e);
        if ("Buffer" === e.type && Array.isArray(e.data)) return l(e.data);
      })(e);
      if (o) return o;
      if ("undefined" != typeof Symbol &&
        null != Symbol.toPrimitive &&
        "function" == typeof e[Symbol.toPrimitive])
        return a.from(e[Symbol.toPrimitive]("string"), t, r);
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
        typeof e
      );
    }
    function u(e) {
      if ("number" != typeof e)
        throw new TypeError('"size" argument must be of type number');
      if (e < 0)
        throw new RangeError(
          'The value "' + e + '" is invalid for option "size"'
        );
    }
    function c(e) {
      return u(e), i(e < 0 ? 0 : 0 | h(e));
    }
    function l(e) {
      for (var t = e.length < 0 ? 0 : 0 | h(e.length), r = i(t), n = 0; n < t; n += 1)
        r[n] = 255 & e[n];
      return r;
    }
    function d(e, t, r) {
      if (t < 0 || e.byteLength < t)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (e.byteLength < t + (r || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      var n;
      return (
        (n =
          void 0 === t && void 0 === r
            ? new Uint8Array(e)
            : void 0 === r
              ? new Uint8Array(e, t)
              : new Uint8Array(e, t, r)),
        Object.setPrototypeOf(n, a.prototype),
        n
      );
    }
    function h(e) {
      if (e >= o)
        throw new RangeError(
          "Attempt to allocate Buffer larger than maximum size: 0x" +
          o.toString(16) +
          " bytes"
        );
      return 0 | e;
    }
    function f(e, t) {
      if (a.isBuffer(e)) return e.length;
      if (ArrayBuffer.isView(e) || U(e, ArrayBuffer)) return e.byteLength;
      if ("string" != typeof e)
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
          typeof e
        );
      var r = e.length, n = arguments.length > 2 && !0 === arguments[2];
      if (!n && 0 === r) return 0;
      for (var o = !1; ;)
        switch (t) {
          case "ascii":
          case "latin1":
          case "binary":
            return r;
          case "utf8":
          case "utf-8":
            return O(e).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return 2 * r;
          case "hex":
            return r >>> 1;
          case "base64":
            return I(e).length;
          default:
            if (o) return n ? -1 : O(e).length;
            (t = ("" + t).toLowerCase()), (o = !0);
        }
    }
    function p(e, t, r) {
      var n = !1;
      if (((void 0 === t || t < 0) && (t = 0), t > this.length)) return "";
      if (((void 0 === r || r > this.length) && (r = this.length), r <= 0))
        return "";
      if ((r >>>= 0) <= (t >>>= 0)) return "";
      for (e || (e = "utf8"); ;)
        switch (e) {
          case "hex":
            return A(this, t, r);
          case "utf8":
          case "utf-8":
            return S(this, t, r);
          case "ascii":
            return x(this, t, r);
          case "latin1":
          case "binary":
            return T(this, t, r);
          case "base64":
            return C(this, t, r);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return P(this, t, r);
          default:
            if (n) throw new TypeError("Unknown encoding: " + e);
            (e = (e + "").toLowerCase()), (n = !0);
        }
    }
    function m(e, t, r) {
      var n = e[t];
      (e[t] = e[r]), (e[r] = n);
    }
    function g(e, t, r, n, o) {
      if (0 === e.length) return -1;
      if (("string" == typeof r
        ? ((n = r), (r = 0))
        : r > 2147483647
          ? (r = 2147483647)
          : r < -2147483648 && (r = -2147483648),
        $((r = +r)) && (r = o ? 0 : e.length - 1),
        r < 0 && (r = e.length + r),
        r >= e.length)) {
        if (o) return -1;
        r = e.length - 1;
      } else if (r < 0) {
        if (!o) return -1;
        r = 0;
      }
      if (("string" == typeof t && (t = a.from(t, n)), a.isBuffer(t)))
        return 0 === t.length ? -1 : v(e, t, r, n, o);
      if ("number" == typeof t)
        return (
          (t &= 255),
          "function" == typeof Uint8Array.prototype.indexOf
            ? o
              ? Uint8Array.prototype.indexOf.call(e, t, r)
              : Uint8Array.prototype.lastIndexOf.call(e, t, r)
            : v(e, [t], r, n, o)
        );
      throw new TypeError("val must be string, number or Buffer");
    }
    function v(e, t, r, n, o) {
      var i, a = 1, s = e.length, u = t.length;
      if (void 0 !== n &&
        ("ucs2" === (n = String(n).toLowerCase()) ||
          "ucs-2" === n ||
          "utf16le" === n ||
          "utf-16le" === n)) {
        if (e.length < 2 || t.length < 2) return -1;
        (a = 2), (s /= 2), (u /= 2), (r /= 2);
      }
      function c(e, t) {
        return 1 === a ? e[t] : e.readUInt16BE(t * a);
      }
      if (o) {
        var l = -1;
        for (i = r; i < s; i++)
          if (c(e, i) === c(t, -1 === l ? 0 : i - l)) {
            if ((-1 === l && (l = i), i - l + 1 === u)) return l * a;
          } else -1 !== l && (i -= i - l), (l = -1);
      }
      else
        for (r + u > s && (r = s - u), i = r; i >= 0; i--) {
          for (var d = !0, h = 0; h < u; h++)
            if (c(e, i + h) !== c(t, h)) {
              d = !1;
              break;
            }
          if (d) return i;
        }
      return -1;
    }
    function y(e, t, r, n) {
      r = Number(r) || 0;
      var o = e.length - r;
      n ? (n = Number(n)) > o && (n = o) : (n = o);
      var i = t.length;
      n > i / 2 && (n = i / 2);
      for (var a = 0; a < n; ++a) {
        var s = parseInt(t.substr(2 * a, 2), 16);
        if ($(s)) return a;
        e[r + a] = s;
      }
      return a;
    }
    function b(e, t, r, n) {
      return j(O(t, e.length - r), e, r, n);
    }
    function w(e, t, r, n) {
      return j(
        (function (e) {
          for (var t = [], r = 0; r < e.length; ++r)
            t.push(255 & e.charCodeAt(r));
          return t;
        })(t),
        e,
        r,
        n
      );
    }
    function _(e, t, r, n) {
      return j(I(t), e, r, n);
    }
    function E(e, t, r, n) {
      return j(
        (function (e, t) {
          for (var r, n, o, i = [], a = 0; a < e.length && !((t -= 2) < 0); ++a)
            (n = (r = e.charCodeAt(a)) >> 8),
              (o = r % 256),
              i.push(o),
              i.push(n);
          return i;
        })(t, e.length - r),
        e,
        r,
        n
      );
    }
    function C(e, r, n) {
      return 0 === r && n === e.length
        ? t.fromByteArray(e)
        : t.fromByteArray(e.slice(r, n));
    }
    function S(e, t, r) {
      r = Math.min(e.length, r);
      for (var n = [], o = t; o < r;) {
        var i, a, s, u, c = e[o], l = null, d = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
        if (o + d <= r)
          switch (d) {
            case 1:
              c < 128 && (l = c);
              break;
            case 2:
              128 == (192 & (i = e[o + 1])) &&
                (u = ((31 & c) << 6) | (63 & i)) > 127 &&
                (l = u);
              break;
            case 3:
              (i = e[o + 1]),
                (a = e[o + 2]),
                128 == (192 & i) &&
                128 == (192 & a) &&
                (u = ((15 & c) << 12) | ((63 & i) << 6) | (63 & a)) > 2047 &&
                (u < 55296 || u > 57343) &&
                (l = u);
              break;
            case 4:
              (i = e[o + 1]),
                (a = e[o + 2]),
                (s = e[o + 3]),
                128 == (192 & i) &&
                128 == (192 & a) &&
                128 == (192 & s) &&
                (u =
                  ((15 & c) << 18) |
                  ((63 & i) << 12) |
                  ((63 & a) << 6) |
                  (63 & s)) > 65535 &&
                u < 1114112 &&
                (l = u);
          }
        null === l
          ? ((l = 65533), (d = 1))
          : l > 65535 &&
          ((l -= 65536),
            n.push(((l >>> 10) & 1023) | 55296),
            (l = 56320 | (1023 & l))),
          n.push(l),
          (o += d);
      }
      return (function (e) {
        var t = e.length;
        if (t <= k) return String.fromCharCode.apply(String, e);
        var r = "", n = 0;
        for (; n < t;)
          r += String.fromCharCode.apply(String, e.slice(n, (n += k)));
        return r;
      })(n);
    }
    (e.kMaxLength = o),
      (a.TYPED_ARRAY_SUPPORT = (function () {
        try {
          var e = new Uint8Array(1), t = {
            foo: function () {
              return 42;
            },
          };
          return (
            Object.setPrototypeOf(t, Uint8Array.prototype),
            Object.setPrototypeOf(e, t),
            42 === e.foo()
          );
        } catch (e) {
          return !1;
        }
      })()),
      a.TYPED_ARRAY_SUPPORT ||
      "undefined" == typeof console ||
      "function" != typeof console.error ||
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      ),
      Object.defineProperty(a.prototype, "parent", {
        enumerable: !0,
        get: function () {
          if (a.isBuffer(this)) return this.buffer;
        },
      }),
      Object.defineProperty(a.prototype, "offset", {
        enumerable: !0,
        get: function () {
          if (a.isBuffer(this)) return this.byteOffset;
        },
      }),
      (a.poolSize = 8192),
      (a.from = function (e, t, r) {
        return s(e, t, r);
      }),
      Object.setPrototypeOf(a.prototype, Uint8Array.prototype),
      Object.setPrototypeOf(a, Uint8Array),
      (a.alloc = function (e, t, r) {
        return (function (e, t, r) {
          return (
            u(e),
            e <= 0
              ? i(e)
              : void 0 !== t
                ? "string" == typeof r
                  ? i(e).fill(t, r)
                  : i(e).fill(t)
                : i(e)
          );
        })(e, t, r);
      }),
      (a.allocUnsafe = function (e) {
        return c(e);
      }),
      (a.allocUnsafeSlow = function (e) {
        return c(e);
      }),
      (a.isBuffer = function (e) {
        return null != e && !0 === e._isBuffer && e !== a.prototype;
      }),
      (a.compare = function (e, t) {
        if ((U(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)),
          U(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)),
          !a.isBuffer(e) || !a.isBuffer(t)))
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        if (e === t) return 0;
        for (var r = e.length, n = t.length, o = 0, i = Math.min(r, n); o < i; ++o)
          if (e[o] !== t[o]) {
            (r = e[o]), (n = t[o]);
            break;
          }
        return r < n ? -1 : n < r ? 1 : 0;
      }),
      (a.isEncoding = function (e) {
        switch (String(e).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return !0;
          default:
            return !1;
        }
      }),
      (a.concat = function (e, t) {
        if (!Array.isArray(e))
          throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === e.length) return a.alloc(0);
        var r;
        if (void 0 === t)
          for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
        var n = a.allocUnsafe(t), o = 0;
        for (r = 0; r < e.length; ++r) {
          var i = e[r];
          if (U(i, Uint8Array))
            o + i.length > n.length
              ? a.from(i).copy(n, o)
              : Uint8Array.prototype.set.call(n, i, o);
          else {
            if (!a.isBuffer(i))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            i.copy(n, o);
          }
          o += i.length;
        }
        return n;
      }),
      (a.byteLength = f),
      (a.prototype._isBuffer = !0),
      (a.prototype.swap16 = function () {
        var e = this.length;
        if (e % 2 != 0)
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var t = 0; t < e; t += 2) m(this, t, t + 1);
        return this;
      }),
      (a.prototype.swap32 = function () {
        var e = this.length;
        if (e % 4 != 0)
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var t = 0; t < e; t += 4) m(this, t, t + 3), m(this, t + 1, t + 2);
        return this;
      }),
      (a.prototype.swap64 = function () {
        var e = this.length;
        if (e % 8 != 0)
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var t = 0; t < e; t += 8)
          m(this, t, t + 7),
            m(this, t + 1, t + 6),
            m(this, t + 2, t + 5),
            m(this, t + 3, t + 4);
        return this;
      }),
      (a.prototype.toString = function () {
        var e = this.length;
        return 0 === e
          ? ""
          : 0 === arguments.length
            ? S(this, 0, e)
            : p.apply(this, arguments);
      }),
      (a.prototype.toLocaleString = a.prototype.toString),
      (a.prototype.equals = function (e) {
        if (!a.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
        return this === e || 0 === a.compare(this, e);
      }),
      (a.prototype.inspect = function () {
        var t = "", r = e.INSPECT_MAX_BYTES;
        return (
          (t = this.toString("hex", 0, r)
            .replace(/(.{2})/g, "$1 ")
            .trim()),
          this.length > r && (t += " ... "),
          "<Buffer " + t + ">"
        );
      }),
      n && (a.prototype[n] = a.prototype.inspect),
      (a.prototype.compare = function (e, t, r, n, o) {
        if ((U(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)),
          !a.isBuffer(e)))
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
            typeof e
          );
        if ((void 0 === t && (t = 0),
          void 0 === r && (r = e ? e.length : 0),
          void 0 === n && (n = 0),
          void 0 === o && (o = this.length),
          t < 0 || r > e.length || n < 0 || o > this.length))
          throw new RangeError("out of range index");
        if (n >= o && t >= r) return 0;
        if (n >= o) return -1;
        if (t >= r) return 1;
        if (this === e) return 0;
        for (var i = (o >>>= 0) - (n >>>= 0), s = (r >>>= 0) - (t >>>= 0), u = Math.min(i, s), c = this.slice(n, o), l = e.slice(t, r), d = 0; d < u; ++d)
          if (c[d] !== l[d]) {
            (i = c[d]), (s = l[d]);
            break;
          }
        return i < s ? -1 : s < i ? 1 : 0;
      }),
      (a.prototype.includes = function (e, t, r) {
        return -1 !== this.indexOf(e, t, r);
      }),
      (a.prototype.indexOf = function (e, t, r) {
        return g(this, e, t, r, !0);
      }),
      (a.prototype.lastIndexOf = function (e, t, r) {
        return g(this, e, t, r, !1);
      }),
      (a.prototype.write = function (e, t, r, n) {
        if (void 0 === t) (n = "utf8"), (r = this.length), (t = 0);
        else if (void 0 === r && "string" == typeof t)
          (n = t), (r = this.length), (t = 0);
        else {
          if (!isFinite(t))
            throw new Error(
              "Buffer.write(string, encoding, offset[, length]) is no longer supported"
            );
          (t >>>= 0),
            isFinite(r)
              ? ((r >>>= 0), void 0 === n && (n = "utf8"))
              : ((n = r), (r = void 0));
        }
        var o = this.length - t;
        if (((void 0 === r || r > o) && (r = o),
          (e.length > 0 && (r < 0 || t < 0)) || t > this.length))
          throw new RangeError("Attempt to write outside buffer bounds");
        n || (n = "utf8");
        for (var i = !1; ;)
          switch (n) {
            case "hex":
              return y(this, e, t, r);
            case "utf8":
            case "utf-8":
              return b(this, e, t, r);
            case "ascii":
            case "latin1":
            case "binary":
              return w(this, e, t, r);
            case "base64":
              return _(this, e, t, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return E(this, e, t, r);
            default:
              if (i) throw new TypeError("Unknown encoding: " + n);
              (n = ("" + n).toLowerCase()), (i = !0);
          }
      }),
      (a.prototype.toJSON = function () {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0),
        };
      });
    var k = 4096;
    function x(e, t, r) {
      var n = "";
      r = Math.min(e.length, r);
      for (var o = t; o < r; ++o) n += String.fromCharCode(127 & e[o]);
      return n;
    }
    function T(e, t, r) {
      var n = "";
      r = Math.min(e.length, r);
      for (var o = t; o < r; ++o) n += String.fromCharCode(e[o]);
      return n;
    }
    function A(e, t, r) {
      var n = e.length;
      (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
      for (var o = "", i = t; i < r; ++i) o += q[e[i]];
      return o;
    }
    function P(e, t, r) {
      for (var n = e.slice(t, r), o = "", i = 0; i < n.length - 1; i += 2)
        o += String.fromCharCode(n[i] + 256 * n[i + 1]);
      return o;
    }
    function F(e, t, r) {
      if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
      if (e + t > r)
        throw new RangeError("Trying to access beyond buffer length");
    }
    function L(e, t, r, n, o, i) {
      if (!a.isBuffer(e))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (t > o || t < i)
        throw new RangeError('"value" argument is out of bounds');
      if (r + n > e.length) throw new RangeError("Index out of range");
    }
    function R(e, t, r, n, o, i) {
      if (r + n > e.length) throw new RangeError("Index out of range");
      if (r < 0) throw new RangeError("Index out of range");
    }
    function B(e, t, n, o, i) {
      return (
        (t = +t),
        (n >>>= 0),
        i || R(e, 0, n, 4),
        r.write(e, t, n, o, 23, 4),
        n + 4
      );
    }
    function D(e, t, n, o, i) {
      return (
        (t = +t),
        (n >>>= 0),
        i || R(e, 0, n, 8),
        r.write(e, t, n, o, 52, 8),
        n + 8
      );
    }
    (a.prototype.slice = function (e, t) {
      var r = this.length;
      (e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
        (t = void 0 === t ? r : ~~t) < 0
          ? (t += r) < 0 && (t = 0)
          : t > r && (t = r),
        t < e && (t = e);
      var n = this.subarray(e, t);
      return Object.setPrototypeOf(n, a.prototype), n;
    }),
      (a.prototype.readUintLE = a.prototype.readUIntLE =
        function (e, t, r) {
          (e >>>= 0), (t >>>= 0), r || F(e, t, this.length);
          for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);)
            n += this[e + i] * o;
          return n;
        }),
      (a.prototype.readUintBE = a.prototype.readUIntBE =
        function (e, t, r) {
          (e >>>= 0), (t >>>= 0), r || F(e, t, this.length);
          for (var n = this[e + --t], o = 1; t > 0 && (o *= 256);)
            n += this[e + --t] * o;
          return n;
        }),
      (a.prototype.readUint8 = a.prototype.readUInt8 =
        function (e, t) {
          return (e >>>= 0), t || F(e, 1, this.length), this[e];
        }),
      (a.prototype.readUint16LE = a.prototype.readUInt16LE =
        function (e, t) {
          return (
            (e >>>= 0), t || F(e, 2, this.length), this[e] | (this[e + 1] << 8)
          );
        }),
      (a.prototype.readUint16BE = a.prototype.readUInt16BE =
        function (e, t) {
          return (
            (e >>>= 0), t || F(e, 2, this.length), (this[e] << 8) | this[e + 1]
          );
        }),
      (a.prototype.readUint32LE = a.prototype.readUInt32LE =
        function (e, t) {
          return (
            (e >>>= 0),
            t || F(e, 4, this.length),
            (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
            16777216 * this[e + 3]
          );
        }),
      (a.prototype.readUint32BE = a.prototype.readUInt32BE =
        function (e, t) {
          return (
            (e >>>= 0),
            t || F(e, 4, this.length),
            16777216 * this[e] +
            ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
          );
        }),
      (a.prototype.readIntLE = function (e, t, r) {
        (e >>>= 0), (t >>>= 0), r || F(e, t, this.length);
        for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);)
          n += this[e + i] * o;
        return n >= (o *= 128) && (n -= Math.pow(2, 8 * t)), n;
      }),
      (a.prototype.readIntBE = function (e, t, r) {
        (e >>>= 0), (t >>>= 0), r || F(e, t, this.length);
        for (var n = t, o = 1, i = this[e + --n]; n > 0 && (o *= 256);)
          i += this[e + --n] * o;
        return i >= (o *= 128) && (i -= Math.pow(2, 8 * t)), i;
      }),
      (a.prototype.readInt8 = function (e, t) {
        return (
          (e >>>= 0),
          t || F(e, 1, this.length),
          128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
        );
      }),
      (a.prototype.readInt16LE = function (e, t) {
        (e >>>= 0), t || F(e, 2, this.length);
        var r = this[e] | (this[e + 1] << 8);
        return 32768 & r ? 4294901760 | r : r;
      }),
      (a.prototype.readInt16BE = function (e, t) {
        (e >>>= 0), t || F(e, 2, this.length);
        var r = this[e + 1] | (this[e] << 8);
        return 32768 & r ? 4294901760 | r : r;
      }),
      (a.prototype.readInt32LE = function (e, t) {
        return (
          (e >>>= 0),
          t || F(e, 4, this.length),
          this[e] |
          (this[e + 1] << 8) |
          (this[e + 2] << 16) |
          (this[e + 3] << 24)
        );
      }),
      (a.prototype.readInt32BE = function (e, t) {
        return (
          (e >>>= 0),
          t || F(e, 4, this.length),
          (this[e] << 24) |
          (this[e + 1] << 16) |
          (this[e + 2] << 8) |
          this[e + 3]
        );
      }),
      (a.prototype.readFloatLE = function (e, t) {
        return (
          (e >>>= 0), t || F(e, 4, this.length), r.read(this, e, !0, 23, 4)
        );
      }),
      (a.prototype.readFloatBE = function (e, t) {
        return (
          (e >>>= 0), t || F(e, 4, this.length), r.read(this, e, !1, 23, 4)
        );
      }),
      (a.prototype.readDoubleLE = function (e, t) {
        return (
          (e >>>= 0), t || F(e, 8, this.length), r.read(this, e, !0, 52, 8)
        );
      }),
      (a.prototype.readDoubleBE = function (e, t) {
        return (
          (e >>>= 0), t || F(e, 8, this.length), r.read(this, e, !1, 52, 8)
        );
      }),
      (a.prototype.writeUintLE = a.prototype.writeUIntLE =
        function (e, t, r, n) {
          ((e = +e), (t >>>= 0), (r >>>= 0), n) ||
            L(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
          var o = 1, i = 0;
          for (this[t] = 255 & e; ++i < r && (o *= 256);)
            this[t + i] = (e / o) & 255;
          return t + r;
        }),
      (a.prototype.writeUintBE = a.prototype.writeUIntBE =
        function (e, t, r, n) {
          ((e = +e), (t >>>= 0), (r >>>= 0), n) ||
            L(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
          var o = r - 1, i = 1;
          for (this[t + o] = 255 & e; --o >= 0 && (i *= 256);)
            this[t + o] = (e / i) & 255;
          return t + r;
        }),
      (a.prototype.writeUint8 = a.prototype.writeUInt8 =
        function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || L(this, e, t, 1, 255, 0),
            (this[t] = 255 & e),
            t + 1
          );
        }),
      (a.prototype.writeUint16LE = a.prototype.writeUInt16LE =
        function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || L(this, e, t, 2, 65535, 0),
            (this[t] = 255 & e),
            (this[t + 1] = e >>> 8),
            t + 2
          );
        }),
      (a.prototype.writeUint16BE = a.prototype.writeUInt16BE =
        function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || L(this, e, t, 2, 65535, 0),
            (this[t] = e >>> 8),
            (this[t + 1] = 255 & e),
            t + 2
          );
        }),
      (a.prototype.writeUint32LE = a.prototype.writeUInt32LE =
        function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || L(this, e, t, 4, 4294967295, 0),
            (this[t + 3] = e >>> 24),
            (this[t + 2] = e >>> 16),
            (this[t + 1] = e >>> 8),
            (this[t] = 255 & e),
            t + 4
          );
        }),
      (a.prototype.writeUint32BE = a.prototype.writeUInt32BE =
        function (e, t, r) {
          return (
            (e = +e),
            (t >>>= 0),
            r || L(this, e, t, 4, 4294967295, 0),
            (this[t] = e >>> 24),
            (this[t + 1] = e >>> 16),
            (this[t + 2] = e >>> 8),
            (this[t + 3] = 255 & e),
            t + 4
          );
        }),
      (a.prototype.writeIntLE = function (e, t, r, n) {
        if (((e = +e), (t >>>= 0), !n)) {
          var o = Math.pow(2, 8 * r - 1);
          L(this, e, t, r, o - 1, -o);
        }
        var i = 0, a = 1, s = 0;
        for (this[t] = 255 & e; ++i < r && (a *= 256);)
          e < 0 && 0 === s && 0 !== this[t + i - 1] && (s = 1),
            (this[t + i] = (((e / a) >> 0) - s) & 255);
        return t + r;
      }),
      (a.prototype.writeIntBE = function (e, t, r, n) {
        if (((e = +e), (t >>>= 0), !n)) {
          var o = Math.pow(2, 8 * r - 1);
          L(this, e, t, r, o - 1, -o);
        }
        var i = r - 1, a = 1, s = 0;
        for (this[t + i] = 255 & e; --i >= 0 && (a *= 256);)
          e < 0 && 0 === s && 0 !== this[t + i + 1] && (s = 1),
            (this[t + i] = (((e / a) >> 0) - s) & 255);
        return t + r;
      }),
      (a.prototype.writeInt8 = function (e, t, r) {
        return (
          (e = +e),
          (t >>>= 0),
          r || L(this, e, t, 1, 127, -128),
          e < 0 && (e = 255 + e + 1),
          (this[t] = 255 & e),
          t + 1
        );
      }),
      (a.prototype.writeInt16LE = function (e, t, r) {
        return (
          (e = +e),
          (t >>>= 0),
          r || L(this, e, t, 2, 32767, -32768),
          (this[t] = 255 & e),
          (this[t + 1] = e >>> 8),
          t + 2
        );
      }),
      (a.prototype.writeInt16BE = function (e, t, r) {
        return (
          (e = +e),
          (t >>>= 0),
          r || L(this, e, t, 2, 32767, -32768),
          (this[t] = e >>> 8),
          (this[t + 1] = 255 & e),
          t + 2
        );
      }),
      (a.prototype.writeInt32LE = function (e, t, r) {
        return (
          (e = +e),
          (t >>>= 0),
          r || L(this, e, t, 4, 2147483647, -2147483648),
          (this[t] = 255 & e),
          (this[t + 1] = e >>> 8),
          (this[t + 2] = e >>> 16),
          (this[t + 3] = e >>> 24),
          t + 4
        );
      }),
      (a.prototype.writeInt32BE = function (e, t, r) {
        return (
          (e = +e),
          (t >>>= 0),
          r || L(this, e, t, 4, 2147483647, -2147483648),
          e < 0 && (e = 4294967295 + e + 1),
          (this[t] = e >>> 24),
          (this[t + 1] = e >>> 16),
          (this[t + 2] = e >>> 8),
          (this[t + 3] = 255 & e),
          t + 4
        );
      }),
      (a.prototype.writeFloatLE = function (e, t, r) {
        return B(this, e, t, !0, r);
      }),
      (a.prototype.writeFloatBE = function (e, t, r) {
        return B(this, e, t, !1, r);
      }),
      (a.prototype.writeDoubleLE = function (e, t, r) {
        return D(this, e, t, !0, r);
      }),
      (a.prototype.writeDoubleBE = function (e, t, r) {
        return D(this, e, t, !1, r);
      }),
      (a.prototype.copy = function (e, t, r, n) {
        if (!a.isBuffer(e)) throw new TypeError("argument should be a Buffer");
        if ((r || (r = 0),
          n || 0 === n || (n = this.length),
          t >= e.length && (t = e.length),
          t || (t = 0),
          n > 0 && n < r && (n = r),
          n === r))
          return 0;
        if (0 === e.length || 0 === this.length) return 0;
        if (t < 0) throw new RangeError("targetStart out of bounds");
        if (r < 0 || r >= this.length)
          throw new RangeError("Index out of range");
        if (n < 0) throw new RangeError("sourceEnd out of bounds");
        n > this.length && (n = this.length),
          e.length - t < n - r && (n = e.length - t + r);
        var o = n - r;
        return (
          this === e && "function" == typeof Uint8Array.prototype.copyWithin
            ? this.copyWithin(t, r, n)
            : Uint8Array.prototype.set.call(e, this.subarray(r, n), t),
          o
        );
      }),
      (a.prototype.fill = function (e, t, r, n) {
        if ("string" == typeof e) {
          if (("string" == typeof t
            ? ((n = t), (t = 0), (r = this.length))
            : "string" == typeof r && ((n = r), (r = this.length)),
            void 0 !== n && "string" != typeof n))
            throw new TypeError("encoding must be a string");
          if ("string" == typeof n && !a.isEncoding(n))
            throw new TypeError("Unknown encoding: " + n);
          if (1 === e.length) {
            var o = e.charCodeAt(0);
            (("utf8" === n && o < 128) || "latin1" === n) && (e = o);
          }
        }
        else
          "number" == typeof e
            ? (e &= 255)
            : "boolean" == typeof e && (e = Number(e));
        if (t < 0 || this.length < t || this.length < r)
          throw new RangeError("Out of range index");
        if (r <= t) return this;
        var i;
        if (((t >>>= 0),
          (r = void 0 === r ? this.length : r >>> 0),
          e || (e = 0),
          "number" == typeof e))
          for (i = t; i < r; ++i) this[i] = e;
        else {
          var s = a.isBuffer(e) ? e : a.from(e, n), u = s.length;
          if (0 === u)
            throw new TypeError(
              'The value "' + e + '" is invalid for argument "value"'
            );
          for (i = 0; i < r - t; ++i) this[i + t] = s[i % u];
        }
        return this;
      });
    var M = /[^+/0-9A-Za-z-_]/g;
    function O(e, t) {
      var r;
      t = t || 1 / 0;
      for (var n = e.length, o = null, i = [], a = 0; a < n; ++a) {
        if ((r = e.charCodeAt(a)) > 55295 && r < 57344) {
          if (!o) {
            if (r > 56319) {
              (t -= 3) > -1 && i.push(239, 191, 189);
              continue;
            }
            if (a + 1 === n) {
              (t -= 3) > -1 && i.push(239, 191, 189);
              continue;
            }
            o = r;
            continue;
          }
          if (r < 56320) {
            (t -= 3) > -1 && i.push(239, 191, 189), (o = r);
            continue;
          }
          r = 65536 + (((o - 55296) << 10) | (r - 56320));
        } else o && (t -= 3) > -1 && i.push(239, 191, 189);
        if (((o = null), r < 128)) {
          if ((t -= 1) < 0) break;
          i.push(r);
        } else if (r < 2048) {
          if ((t -= 2) < 0) break;
          i.push((r >> 6) | 192, (63 & r) | 128);
        } else if (r < 65536) {
          if ((t -= 3) < 0) break;
          i.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
        } else {
          if (!(r < 1114112)) throw new Error("Invalid code point");
          if ((t -= 4) < 0) break;
          i.push(
            (r >> 18) | 240,
            ((r >> 12) & 63) | 128,
            ((r >> 6) & 63) | 128,
            (63 & r) | 128
          );
        }
      }
      return i;
    }
    function I(e) {
      return t.toByteArray(
        (function (e) {
          if ((e = (e = e.split("=")[0]).trim().replace(M, "")).length < 2)
            return "";
          for (; e.length % 4 != 0;) e += "=";
          return e;
        })(e)
      );
    }
    function j(e, t, r, n) {
      for (var o = 0; o < n && !(o + r >= t.length || o >= e.length); ++o)
        t[o + r] = e[o];
      return o;
    }
    function U(e, t) {
      return (
        e instanceof t ||
        (null != e &&
          null != e.constructor &&
          null != e.constructor.name &&
          e.constructor.name === t.name)
      );
    }
    function $(e) {
      return e != e;
    }
    var q = (function () {
      for (var e = "0123456789abcdef", t = new Array(256), r = 0; r < 16; ++r)
        for (var n = 16 * r, o = 0; o < 16; ++o) t[n + o] = e[r] + e[o];
      return t;
    })();
  },
});
