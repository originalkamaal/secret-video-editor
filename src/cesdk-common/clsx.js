import { createLazyModule } from "./others/createLazyModule";

export var clsx = createLazyModule({
  "../../node_modules/clsx/dist/clsx.js"(e, t) {
    function n(e) {
      var t, s, i = "";
      if ("string" == typeof e || "number" == typeof e) i += e;
      else if ("object" == typeof e)
        if (Array.isArray(e))
          for (t = 0; t < e.length; t++)
            e[t] && (s = n(e[t])) && (i && (i += " "), (i += s));
        else for (t in e) e[t] && (i && (i += " "), (i += t));
      return i;
    }
    function s() {
      for (var e, t, s = 0, i = ""; s < arguments.length;)
        (e = arguments[s++]) && (t = n(e)) && (i && (i += " "), (i += t));
      return i;
    }
    (t.exports = s), (t.exports.clsx = s);
  },
});
