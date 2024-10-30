import { ELEMENT_TYPES } from "./constants/constants";

export function isValidElementType(element) {
  return (
    "string" == typeof element &&
    !element.includes("-") &&
    !!(ELEMENT_TYPES.indexOf(element) > -1 || /[A-Z]/.test(element))
  );
}
