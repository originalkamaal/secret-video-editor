export class ColorPaletteMigration {
  warnKeys(config) {
    if (config.ui?.colorPalette)
      return "ui.colorPalette is deprecated. Please use ui.colorLibraries instead.";
  }
  migrateConfigObject(config) {
    return config.ui?.colorPalette
      ? config.ui.colorLibraries
        ? config
        : {
            ...config,
            ui: {
              ...config.ui,
              colorLibraries: [
                ...(config.ui?.colorLibraries ?? KM.colorLibraries),
              ],
            },
          }
      : config;
  }
  applyFallback(config, editor) {
    config?.ui?.colorPalette &&
      this.addDefaultColorPalettes(config.ui.colorPalette, editor);
  }
  getDefaultColorPaletteSourceId() {
    return (
      KM.colorLibraries?.find((e) => !e.match(/documentColors/)) ??
      "ly.img.colors.defaultPalette"
    );
  }
  addDefaultColorPalettes(colors, editor) {
    const defaultSourceId = this.getDefaultColorPaletteSourceId();
    editor.asset.addLocalSource(defaultSourceId),
      colors?.forEach((color) => {
        let processedColor;
        processedColor =
          "string" == typeof color
            ? kb(color)
            : "r" in color && "g" in color && "b" in color
            ? { ...color, a: "a" in color ? color.a : 1 }
            : editor.editor.convertColorToColorSpace(color, "sRGB");
        const i = gO(processedColor);
        editor.asset.addAssetToSource(defaultSourceId, {
          id: i.name,
          label: { en: wb(processedColor) },
          tags: { en: [i.name] },
          payload: { color: { colorSpace: "sRGB", ...processedColor } },
        });
      });
  }
}
