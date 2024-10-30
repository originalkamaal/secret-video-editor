import { context1 } from "./reacts";
import { react8 } from "./reacts";
import { hasAnimationProperties, isStringOrArray, formatArray } from "./utils";

export function extractInitialAndAnimateProps(element) {
  const { initial, animate } = (function (element, defaultProps) {
    if (hasAnimationProperties(element)) {
      const { initial, animate } = element;
      return {
        initial:
          false === initial || isStringOrArray(initial) ? initial : undefined,
        animate: isStringOrArray(animate) ? animate : undefined,
      };
    }
    return false !== element.inherit ? defaultProps : {};
  })(element, (0, react8.useContext)(context1));
  return (0, react8.useMemo)(
    () => ({ initial, animate }),
    [formatArray(initial), formatArray(animate)]
  );
}
