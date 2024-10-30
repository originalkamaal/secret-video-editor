export class TypefaceMigration {
  static APIFALLBACK_TYPEFACES_SOURCE_ID = "apiFallbackTypefaces";
  static defaultTypefaceLibraries = ["ly.img.typeface"];
  migrateConfigObject(config) {
    return "typefaces" in (config.presets ?? {})
      ? {
          ...config,
          ui: {
            ...config.ui,
            typefaceLibraries: [
              ...(config.ui?.typefaceLibraries ??
                TypefaceMigration.defaultTypefaceLibraries),
              TypefaceMigration.APIFALLBACK_TYPEFACES_SOURCE_ID,
            ],
          },
        }
      : config;
  }
}
