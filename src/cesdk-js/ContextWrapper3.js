import { FF, DF } from "./working";
import { RF } from "./reacts";

export var ContextWrapper3 = function (e) {
  var t = e.client, n = e.contextSharing, s = undefined !== n && n, i = e.children;
  RF.default.useEffect(
    function () {
      return (
        t.mount(),
        function () {
          t.unmount();
        }
      );
    },
    [t]
  );
  var o = FF(s);
  return RF.default.createElement(
    DF.Provider,
    { value: s },
    RF.default.createElement(o.Provider, { value: t }, i)
  );
};
