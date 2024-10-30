import { ColorPaletteMigration } from "@/cesdk-js/classes/ColorPaletteMigration";
import { TypefaceMigration } from "@/cesdk-js/classes/TypefaceMigration";
import { localUploadCallback } from "../../../working";

export var uploadHandler = function (config) {
  const { onUpload: uploadCallback } = config.callbacks;
  return "local" === uploadCallback
    ? { callback: localUploadCallback, options: {} }
    : "function" == typeof uploadCallback
    ? { callback: uploadCallback, options: {} }
    : null != uploadCallback &&
      "object" == typeof uploadCallback &&
      "function" == typeof uploadCallback.callback
    ? {
        callback: uploadCallback.callback,
        options: { supportedMimeTypes: uploadCallback.supportedMimeTypes },
      }
    : { callback: undefined, options: {} };
};

export var isDOMAvailable = !(
  "undefined" == typeof window ||
  !window.document ||
  !window.document.createElement
);
export var configMigrations = [
  new TypefaceMigration(),
  new ColorPaletteMigration(),
];
