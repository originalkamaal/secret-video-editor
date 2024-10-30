import { ky } from "../working";
import { cloneWithPrototypeAndProperties } from "@/cesdk-common/others/createLazyModule";
import { range } from "@/cesdk-common/lodash2";
export var lodashRange = cloneWithPrototypeAndProperties(range());

export var EditorModes = ((e) => (
  (e.Advanced = "advanced"), (e.Default = "default"), e
))(EditorModes || {});
export var InspectorPanelConfig = { show: true, position: "left", floating: false };
export var AssetLibraryPanelConfig = { show: true, position: "left" };
export var NavigationPanelConfig = {
  show: true,
  position: "top",
  title: null,
  action: {
    close: { show: false },
    back: { show: false },
    save: { show: false },
    export: {
      show: false,
      format: ["application/pdf", "image/png", "video/mp4"],
    },
    share: { show: false },
    download: { show: false },
    load: { show: false },
    custom: [],
  },
};
export var ImageLibraryConfig = {
  id: "ly.img.image",
  sourceIds: ["ly.img.image.upload", "ly.img.image"],
  canAdd: (e) => "ly.img.image.upload" === e,
  canRemove: (e) => "ly.img.image.upload" === e,
  gridColumns: 2,
  gridItemHeight: "auto",
  previewLength: 3,
  gridBackgroundType: "cover",
};
export var VideoLibraryConfig = {
  id: "ly.img.video",
  sourceIds: ["ly.img.video.upload", "ly.img.video"],
  sceneMode: "Video",
  canAdd: (e) => "ly.img.video.upload" === e,
  canRemove: (e) => "ly.img.video.upload" === e,
  gridColumns: 2,
  gridItemHeight: "auto",
  gridBackgroundType: "cover",
};
export var AudioLibraryConfig = {
  id: "ly.img.audio",
  sourceIds: ["ly.img.audio.upload", "ly.img.audio"],
  sceneMode: "Video",
  canAdd: (e) => "ly.img.audio.upload" === e,
  canRemove: (e) => "ly.img.audio.upload" === e,
  previewLength: 3,
  gridColumns: 3,
  gridItemHeight: "square",
  previewBackgroundType: "cover",
  gridBackgroundType: "cover",
  cardLabel: (e) => e.label,
};
export var HM = [
  "ly.img.image.upload",
  "ly.img.video.upload",
  "ly.img.audio.upload",
];
export var MediaSourceIds = [
  {
    id: "ly.img.template",
    sourceIds: ["ly.img.template"],
    sceneMode: "Design",
    gridColumns: 2,
    gridItemHeight: "auto",
    gridBackgroundType: "contain",
    promptBeforeApply: true,
  },
  {
    id: "ly.img.video.template",
    sourceIds: ["ly.img.video.template"],
    sceneMode: "Video",
    gridColumns: 2,
    gridItemHeight: "auto",
    gridBackgroundType: "contain",
    promptBeforeApply: true,
  },
  {
    id: "ly.img.upload",
    sourceIds: HM,
    canAdd: (e) => HM.some((t) => t === e),
    canRemove: (e) => HM.some((t) => t === e),
    gridColumns: 2,
    gridItemHeight: "auto",
    gridBackgroundType: "cover",
  },
  VideoLibraryConfig,
  AudioLibraryConfig,
  ImageLibraryConfig,
  {
    id: "ly.img.text",
    sourceIds: ["ly.img.text"],
    cardLabel: (e) => e.label,
    cardLabelTruncateLines: () => "single",
    cardLabelStyle: (e) => {
      switch (e.id) {
        case "title":
          return {
            lineHeight: "var(--ubq-typography-headline-l-line_height)",
            letterSpacing: "var(--ubq-typography-headline-l-letter_spacing)",
            fontFamily: "var(--ubq-typography-headline-l-font_family)",
            fontWeight: "var(--ubq-typography-headline-l-weight)",
            fontSize: "24px",
          };
        case "headline":
          return {
            lineHeight: "var(--ubq-typography-headline-m-line_height)",
            letterSpacing: "var(--ubq-typography-headline-m-letter_spacing)",
            fontFamily: "var(--ubq-typography-headline-m-font_family)",
            fontWeight: "var(--ubq-typography-headline-m-weight)",
            fontSize: "16px",
          };
        case "paragraph":
          return {
            lineHeight: "var(--ubq-typography-label-m-line_height)",
            letterSpacing: "var(--ubq-typography-label-m-letter_spacing)",
            fontFamily: "var(--ubq-typography-label-m-font_family)",
            fontWeight: "var(--ubq-typography-label-m-weight)",
            fontSize: "12px",
          };
        default:
          return {};
      }
    },
  },
  {
    id: "ly.img.vectorpath",
    sourceIds: ["ly.img.vectorpath"],
    previewLength: 4,
    title: ({ group: e }) => {
      if (e) {
        const t = e.match(/\/category\/(.*)$/);
        if (t) return `libraries.ly.img.vectorpath.${t[1]}.label`;
      }
      return "libraries.ly.img.vectorpath.label";
    },
  },
  {
    id: "ly.img.sticker",
    sourceIds: ["ly.img.sticker"],
    gridColumns: 3,
    previewLength: 4,
    title: ({ group, sourceId }) => {
      if ("ly.img.sticker" === sourceId && group) {
        const matchingCategory = group.match(/\/category\/(.*)$/);
        if (matchingCategory) return `libraries.${sourceId}.${matchingCategory[1]}.label`;
      }
    },
  },
];
export var DefaultViewMode = "default";
export var EditorLayoutConfig = {
  view: DefaultViewMode,
  panels: {
    inspector: InspectorPanelConfig,
    settings: { show: false, position: "left" },
    assetLibrary: AssetLibraryPanelConfig,
  },
  dock: { show: true, iconSize: "large", hideLabels: false },
  libraries: {
    insert: { autoClose: () => true, floating: false },
    replace: { autoClose: () => true, floating: false },
  },
  navigation: NavigationPanelConfig,
  inspectorBar: { show: true },
  blocks: {
    opacity: true,
    transform: true,
    "//ly.img.ubq/page": {
      format: { show: true },
      manage: { show: true },
      maxDuration: 1800,
      crop: { show: true },
      filters: { show: true },
      adjustments: { show: true },
      effects: { show: true },
      blur: { show: true },
    },
    "//ly.img.ubq/text": { advanced: { show: true }, color: { show: true } },
    "//ly.img.ubq/graphic": {
      adjustments: { show: true },
      effects: { show: true },
      blur: { show: true },
      filters: { show: true },
      crop: { show: true },
    },
  },
};
export var FontSizeOptions = {
  dropdownOptions: [
    6, 8, 10, 14, 16, 18, 21, 24, 28, 32, 36, 48, 54, 64, 72, 90,
  ],
};
export var ResolutionOptions = { dropdownOptions: [72, 150, 300, 600, 1200, 2400] };
export var PlaybackSpeedOptions = { dropdownOptions: [0.5, 1, 1.5, 2, 3, 4] };
export var BleedMarginConfig = {
  mm: {
    bleedMargin: {
      dropdownOptions: (0, lodashRange.default)(11),
      defaultBleedMargin: 3,
    },
  },
  px: {
    bleedMargin: {
      dropdownOptions: (0, lodashRange.default)(51),
      defaultBleedMargin: 8,
    },
  },
  in: {
    bleedMargin: {
      dropdownOptions: (0, lodashRange.default)(0, 10)
        .map((e) => parseFloat(`0.${e}`))
        .concat(1),
      defaultBleedMargin: 0.1181,
    },
  },
};
export var LocalizationConfig = {
  en: {
    variables: {
      company_name: { label: "Company Name" },
      first_name: { label: "First name" },
      last_name: { label: "Last name" },
      address: { label: "Address" },
      city: { label: "City" },
    },
  },
  de: {
    variables: {
      company_name: { label: "Firmenname" },
      first_name: { label: "Vorname" },
      last_name: { label: "Nachname" },
      address: { label: "Adresse" },
      city: { label: "Stadt" },
    },
  },
};
export var HeadingLevelStart = { headingsHierarchyStart: 2 };
export var KM = {
  baseURL: "ui/",
  scale: ky ? "large" : "normal",
  elements: EditorLayoutConfig,
  stylesheets: {
    disableShadowDOM: false,
    disableTagInsertion: false,
    disableFontInsertion: false,
  },
  colorLibraries: [
    "ly.img.colors.documentColors",
    "ly.img.colors.defaultPalette",
  ],
  typefaceLibraries: ["ly.img.typeface"],
};
export var CanvasSizeConfig = {
  "din-a0": { width: 1189, height: 841, unit: "Millimeter" },
  "din-a1": { width: 841, height: 594, unit: "Millimeter" },
  "din-a2": { width: 594, height: 420, unit: "Millimeter" },
  "din-a3": { width: 420, height: 297, unit: "Millimeter" },
  "din-a4": { width: 297, height: 210, unit: "Millimeter" },
  "din-a5": { width: 210, height: 148, unit: "Millimeter" },
  "din-a6": { default: true, width: 148, height: 105, unit: "Millimeter" },
  "din-a65": { width: 210, height: 105, unit: "Millimeter" },
  "din-b5": { width: 250, height: 176, unit: "Millimeter" },
  square: { width: 105, height: 105, unit: "Millimeter" },
  "twitter-profile": { width: 400, height: 400, unit: "Pixel" },
  "twitter-image": {
    width: 1024,
    height: 512,
    unit: "Pixel",
    fixedOrientation: true,
  },
  "twitter-header": {
    width: 1500,
    height: 500,
    unit: "Pixel",
    fixedOrientation: true,
  },
  "instagram-profile": { width: 180, height: 180, unit: "Pixel" },
  "instagram-photo": { width: 1080, height: 1080, unit: "Pixel" },
  "instagram-story": {
    width: 1080,
    height: 1920,
    unit: "Pixel",
    fixedOrientation: true,
  },
  "american-letter": { width: 8.5, height: 11, unit: "Inch" },
  "american-legal": { width: 8.5, height: 14, unit: "Inch" },
  "16:10": {
    width: 1600,
    height: 1e3,
    unit: "Pixel",
    fixedOrientation: true,
  },
  "16:9": { width: 1600, height: 900, unit: "Pixel", fixedOrientation: true },
  "16:10@2400p": {
    width: 3840,
    height: 2400,
    unit: "Pixel",
    fixedOrientation: true,
  },
  "16:9@2160p": {
    width: 3840,
    height: 2160,
    unit: "Pixel",
    fixedOrientation: true,
  },
  "business-card": { width: 85, height: 55, unit: "Millimeter" },
};
export var StandardResolutions = {
  "social-feed": { width: 1080, height: 1080, unit: "Pixel" },
  "social-story": { width: 1080, height: 1920, unit: "Pixel", default: true },
  hd: { width: 1280, height: 720, unit: "Pixel" },
  fullhd: { width: 1920, height: 1080, unit: "Pixel" },
  qhd: { width: 2560, height: 1440, unit: "Pixel" },
  format2k: { width: 2048, height: 1080, unit: "Pixel" },
  format4k: { width: 3840, height: 2160, unit: "Pixel" },
};
export var CDNBaseURL = "https://cdn.img.ly/packages/imgly/cesdk-js/1.37.0/assets/";
