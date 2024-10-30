import { createLazyModule } from "./others/createLazyModule";

export var reactFastCompare = createLazyModule({
  "../../node_modules/react-fast-compare/index.js"(e, t) {
    var n = "undefined" != typeof Element, s = "function" == typeof Map, i = "function" == typeof Set, o = "function" == typeof ArrayBuffer && !!ArrayBuffer.isView;
    function r(e, t) {
      if (e === t) return !0;
      if (e && t && "object" == typeof e && "object" == typeof t) {
        if (e.constructor !== t.constructor) return !1;
        var a, l, c, u;
        if (Array.isArray(e)) {
          if ((a = e.length) != t.length) return !1;
          for (l = a; 0 != l--;) if (!r(e[l], t[l])) return !1;
          return !0;
        }
        if (s && e instanceof Map && t instanceof Map) {
          if (e.size !== t.size) return !1;
          for (u = e.entries(); !(l = u.next()).done;)
            if (!t.has(l.value[0])) return !1;
          for (u = e.entries(); !(l = u.next()).done;)
            if (!r(l.value[1], t.get(l.value[0]))) return !1;
          return !0;
        }
        if (i && e instanceof Set && t instanceof Set) {
          if (e.size !== t.size) return !1;
          for (u = e.entries(); !(l = u.next()).done;)
            if (!t.has(l.value[0])) return !1;
          return !0;
        }
        if (o && ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
          if ((a = e.length) != t.length) return !1;
          for (l = a; 0 != l--;) if (e[l] !== t[l]) return !1;
          return !0;
        }
        if (e.constructor === RegExp)
          return e.source === t.source && e.flags === t.flags;
        if (e.valueOf !== Object.prototype.valueOf)
          return e.valueOf() === t.valueOf();
        if (e.toString !== Object.prototype.toString)
          return e.toString() === t.toString();
        if ((a = (c = Object.keys(e)).length) !== Object.keys(t).length)
          return !1;
        for (l = a; 0 != l--;)
          if (!Object.prototype.hasOwnProperty.call(t, c[l])) return !1;
        if (n && e instanceof Element) return !1;
        for (l = a; 0 != l--;)
          if ((("_owner" !== c[l] && "__v" !== c[l] && "__o" !== c[l]) ||
            !e.$$typeof) &&
            !r(e[c[l]], t[c[l]]))
            return !1;
        return !0;
      }
      return e != e && t != t;
    }
    t.exports = function (e, t) {
      try {
        return r(e, t);
      } catch (e) {
        if ((e.message || "").match(/stack|recursion/i))
          return (
            console.warn("react-fast-compare cannot handle circular refs"), !1
          );
        throw e;
      }
    };
  },
});
