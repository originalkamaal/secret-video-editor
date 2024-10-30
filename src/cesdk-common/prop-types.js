import { createLazyModule } from "./others/createLazyModule";

export var ReactPropTypesSecret = createLazyModule({
    "../../node_modules/prop-types/lib/ReactPropTypesSecret.js"(e, t) {
      t.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    },
  }),
  factoryWithThrowingShims = createLazyModule({
    "../../node_modules/prop-types/factoryWithThrowingShims.js"(e, t) {
      var n = ReactPropTypesSecret();
      function s() {}
      function i() {}
      (i.resetWarningCache = s),
        (t.exports = function () {
          function e(e, t, s, i, o, r) {
            if (r !== n) {
              var a = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
              );
              throw ((a.name = "Invariant Violation"), a);
            }
          }
          function t() {
            return e;
          }
          e.isRequired = e;
          var o = {
            array: e,
            bool: e,
            func: e,
            number: e,
            object: e,
            string: e,
            symbol: e,
            any: e,
            arrayOf: t,
            element: e,
            elementType: e,
            instanceOf: t,
            node: e,
            objectOf: t,
            oneOf: t,
            oneOfType: t,
            shape: t,
            exact: t,
            checkPropTypes: i,
            resetWarningCache: s,
          };
          return (o.PropTypes = o), o;
        });
    },
  }),
  proptypes = createLazyModule({
    "../../node_modules/prop-types/index.js"(e, t) {
      t.exports = factoryWithThrowingShims()();
    },
  });
