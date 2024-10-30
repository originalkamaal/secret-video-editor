import { AnimationType } from '@cesdk/engine';
import { AnimationTypeLonghand } from '@cesdk/engine';
import { AnimationTypeShorthand } from '@cesdk/engine';
import { Asset } from '@cesdk/engine';
import { AssetAPI } from '@cesdk/engine';
import { AssetBooleanProperty } from '@cesdk/engine';
import { AssetCMYKColor } from '@cesdk/engine';
import { AssetColor } from '@cesdk/engine';
import { AssetColorProperty } from '@cesdk/engine';
import { AssetDefinition } from '@cesdk/engine';
import { AssetEnumProperty } from '@cesdk/engine';
import { AssetGroups } from '@cesdk/engine';
import { AssetMetaData } from '@cesdk/engine';
import { AssetNumberProperty } from '@cesdk/engine';
import { AssetPayload } from '@cesdk/engine';
import { AssetProperty } from '@cesdk/engine';
import { AssetQueryData } from '@cesdk/engine';
import { AssetResult } from '@cesdk/engine';
import { AssetRGBColor } from '@cesdk/engine';
import { AssetSource } from '@cesdk/engine';
import { AssetSpotColor } from '@cesdk/engine';
import { AssetsQueryResult } from '@cesdk/engine';
import { AssetStringProperty } from '@cesdk/engine';
import { AudioExportOptions } from '@cesdk/engine';
import { BlendMode } from '@cesdk/engine';
import { BlockAPI } from '@cesdk/engine';
import { BlockEvent } from '@cesdk/engine';
import { BlockState } from '@cesdk/engine';
import { BlurType } from '@cesdk/engine';
import { BlurTypeLonghand } from '@cesdk/engine';
import { BlurTypeShorthand } from '@cesdk/engine';
import { BooleanOperation } from '@cesdk/engine';
import { Buffer } from '@cesdk/engine';
import { Canvas } from '@cesdk/engine';
import { CMYK } from '@cesdk/engine';
import { CMYKColor } from '@cesdk/engine';
import type { Color } from '@cesdk/engine';
import { ColorSpace } from '@cesdk/engine';
import { CompleteAssetResult } from '@cesdk/engine';
import { ContentFillMode } from '@cesdk/engine';
import { default as CreativeEngine } from '@cesdk/engine';
import { default as CreativeEngine_2 } from '@cesdk/engine';
import { CutoutOperation } from '@cesdk/engine';
import { CutoutType } from '@cesdk/engine';
import { DefaultAssetSourceId } from '@cesdk/engine';
import { DemoAssetSourceId } from '@cesdk/engine';
import { DesignBlockId } from '@cesdk/engine';
import { DesignBlockType } from '@cesdk/engine';
import { DesignBlockTypeLonghand } from '@cesdk/engine';
import { DesignBlockTypeShorthand } from '@cesdk/engine';
import { DesignUnit } from '@cesdk/engine';
import { EditMode } from '@cesdk/engine';
import { EditorAPI } from '@cesdk/engine';
import { EffectType } from '@cesdk/engine';
import { EffectTypeLonghand } from '@cesdk/engine';
import { EffectTypeShorthand } from '@cesdk/engine';
import { Configuration as _EngineConfiguration } from '@cesdk/engine';
import { ExportOptions as EngineExportOptions } from '@cesdk/engine';
import { EnginePlugin } from '@cesdk/engine';
import { EnginePluginContext } from '@cesdk/engine';
import { EventAPI } from '@cesdk/engine';
import { FillType } from '@cesdk/engine';
import { FillTypeLonghand } from '@cesdk/engine';
import { FillTypeShorthand } from '@cesdk/engine';
import { Font } from '@cesdk/engine';
import { FontStyle } from '@cesdk/engine';
import { FontWeight } from '@cesdk/engine';
import { GradientColorStop } from '@cesdk/engine';
import { GradientstopRGBA } from '@cesdk/engine';
import { HexColorString } from '@cesdk/engine';
import { HistoryId } from '@cesdk/engine';
import { HorizontalBlockAlignment } from '@cesdk/engine';
import { HTMLCreativeEngineCanvasElement } from '@cesdk/engine';
import { Logger } from '@cesdk/engine';
import { LogLevel } from '@cesdk/engine';
import { MimeType as MimeType_2 } from '@cesdk/engine';
import { ObjectType } from '@cesdk/engine';
import { ObjectTypeLonghand } from '@cesdk/engine';
import { ObjectTypeShorthand } from '@cesdk/engine';
import { OffscreenCanvas as OffscreenCanvas_2 } from '@cesdk/engine';
import { PaletteColor } from '@cesdk/engine';
import { PositionMode } from '@cesdk/engine';
import { PropertyType } from '@cesdk/engine';
import { Range as Range_2 } from '@cesdk/engine';
import { RGBA } from '@cesdk/engine';
import { RGBAColor } from '@cesdk/engine';
import { RGBColor } from '@cesdk/engine';
import { RoleString } from '@cesdk/engine';
import { SceneAPI } from '@cesdk/engine';
import { SceneLayout } from '@cesdk/engine';
import { SceneMode } from '@cesdk/engine';
import { Scope } from '@cesdk/engine';
import { SettingsBool } from '@cesdk/engine';
import { SettingsBoolInternal } from '@cesdk/engine';
import { SettingsColor } from '@cesdk/engine';
import { SettingsColorRGBA } from '@cesdk/engine';
import { SettingsEnum } from '@cesdk/engine';
import { SettingsEnumInternal } from '@cesdk/engine';
import { SettingsFloat } from '@cesdk/engine';
import { SettingsString } from '@cesdk/engine';
import { SettingType } from '@cesdk/engine';
import { ShapeType } from '@cesdk/engine';
import { ShapeTypeLonghand } from '@cesdk/engine';
import { ShapeTypeShorthand } from '@cesdk/engine';
import { SizeMode } from '@cesdk/engine';
import { SortingOrder } from '@cesdk/engine';
import { Source } from '@cesdk/engine';
import { SpotColor } from '@cesdk/engine';
import { StrokeCornerGeometry } from '@cesdk/engine';
import { StrokePosition } from '@cesdk/engine';
import { StrokeStyle } from '@cesdk/engine';
import { supportsBrowser } from '@cesdk/engine';
import { supportsVideo } from '@cesdk/engine';
import { supportsVideoExport } from '@cesdk/engine';
import { supportsWasm } from '@cesdk/engine';
import { TextCase } from '@cesdk/engine';
import { TransientResource } from '@cesdk/engine';
import { Typeface } from '@cesdk/engine';
import { TypefaceDefinition } from '@cesdk/engine';
import { VariableAPI } from '@cesdk/engine';
import { VerticalBlockAlignment } from '@cesdk/engine';
import { XYWH } from '@cesdk/engine';
import { ZoomAutoFitAxis } from '@cesdk/engine';

/**
 * A11 Settings
 * @public
 */
declare type A11y = {
    /**
     * The option define a level of heading to start from (in a range 1-6)
     */
    headingsHierarchyStart: 1 | 2 | 3 | 4 | 5 | 6;
};

export { AnimationType }

export { AnimationTypeLonghand }

export { AnimationTypeShorthand }

export { Asset }

export { AssetAPI }

export { AssetBooleanProperty }

export { AssetCMYKColor }

export { AssetColor }

export { AssetColorProperty }

export { AssetDefinition }

export { AssetEnumProperty }

export { AssetGroups }

declare type AssetLibraryDockComponent = {
    id: 'ly.img.assetLibrary.dock';
    key?: string;
    label?: string;
    icon?: string;
    entries: string[];
};

/** @public */
declare type AssetLibraryEntries = AssetLibraryEntry[] | ((currentAssetLibraryEntries: AssetLibraryEntry[], context: {
    selectedBlocks: {
        id: DesignBlockId;
        blockType: DesignBlockTypeLonghand;
        fillType?: FillTypeLonghand;
    }[];
}) => AssetLibraryEntry[]);

/** @public */
declare interface AssetLibraryEntry extends AssetLibraryEntryData, AssetLibraryEntryView {
}

/** @public */
declare interface AssetLibraryEntryData {
    id: string;
    sourceIds: string[];
    /**
     * Marks for what scene mode this entry is fitting. Not setting this
     * will make the entry available for all scene modes.
     */
    sceneMode?: SceneMode;
    excludeGroups?: string[];
    includeGroups?: string[];
    title?: string | ((options: {
        group?: string;
        sourceId?: string;
    }) => string | undefined);
    /**
     * If `true` an upload button will be shown and the uploaded file will be
     * added to the source.
     *
     * If a function is used it will be called with the current asset source id.
     *
     * The asset source needs to support `addAsset`.
     */
    canAdd?: boolean | ((sourceId: string) => boolean);
    /**
     * If `true` the asset can be removed from the asset source.
     *
     * If a function is used it will be called with the current asset source id.
     *
     * The asset source needs to support `removeAsset`.
     */
    canRemove?: boolean | ((sourceId: string) => boolean);
}

/** @public */
declare interface AssetLibraryEntryView {
    showGroupOverview?: boolean;
    /**
     * Wether or not we need to show a confirmation dialog when an asset is selected.
     *
     * accepted values:
     * - `true`: Show a confirmation dialog for all assets
     * - `false`: Never show a confirmation dialog
     * - `{ show: true, sourceIds: ['sourceId1', 'sourceId2'] }`: Show a confirmation dialog for the given sourceIds
     *
     * The content of the dialog should be defined in the translation files using the following keys:
     * - Headline: `libraries.[your_source_id].confirmation.headline`
     * - Body: `libraries.[your_source_id].confirmation.body`
     * - Confirm: `libraries.[your_source_id].confirmation.confirm`
     * - Abort: `libraries.[your_source_id].confirmation.abort`
     */
    promptBeforeApply?: boolean | {
        show: boolean;
        sourceIds?: string[];
    };
    icon?: CustomIcon;
    /**
     * Determines how many asset results will be show in an overview or
     * section overview.
     */
    previewLength?: number;
    /**
     * Determines if the thumbUri is set as a background that will be
     * contained or covered by the card in an overview or section overview.
     */
    previewBackgroundType?: 'cover' | 'contain';
    /**
     * Determines if the thumbUri is set as a background that will be
     * contained or covered by the card in the grid view
     */
    gridBackgroundType?: 'cover' | 'contain';
    /**
     * Number of columns in the grid view
     */
    gridColumns?: number;
    /**
     * Determines the height of an item in the grid view.
     *
     * - `auto` automatically determine height yielding a masonry-like grid view
     * - `square` every card will have the same square size
     */
    gridItemHeight?: 'auto' | 'square';
    /**
     * Determines what will be used as the card background from the asset and in
     * which priorities.
     *
     * The first preference for which the `path` returns a value will be used to
     * decide what and how the background will be rendered.
     *
     * E.g. a path of `meta.thumbUri` will look inside the asset for a value
     * `asset.meta.thumbUri`. This non-null value will be used.
     *
     * The type of the preference decides how the card will render the background.
     *
     * - `svgVectorPath` - creates a <svg> element with the given vector path.
     *                     Adapts the color depending on the theme
     * - `image` - use a CSS background image
     *
     * Example of the default:
     *
     * ```
     * [
     *  { path: 'meta.vectorPath', type: 'svgVectorPath' },
     *  { path: 'meta.thumbUri', type: 'image' }
     * ]
     * ```
     *
     * This will look if the asset has a value in `meta.vectorPath` and will use
     * this value to render a SVG as background. If `meta.vectorPath` has no
     * value, it will use `meta.thumbUri` instead as a background image.
     * Otherwise it will render nothing
     */
    cardBackgroundPreferences?: CardBackground[] | ((asset: AssetResult) => CustomCardBackground);
    /**
     * Draws a border around the card if set to true
     */
    cardBorder?: boolean;
    /**
     * Overwrite the label of a card for a specific asset result
     */
    cardLabel?: (assetResult: AssetResult) => string | undefined;
    /**
     * Add custom styles to a card for a specific asset result
     */
    cardStyle?: (assetResult: AssetResult) => Record<string, string | undefined>;
    /**
     * Add custom styles to a label for a specific asset result
     */
    cardLabelStyle?: (assetResult: AssetResult) => Record<string, string | undefined>;
    /**
     * Position the label inside or below the card.
     * Defaults to 'inside'.
     */
    cardLabelPosition?: (assetResult: AssetResult) => 'inside' | 'below';
    /**
     * Control label truncation to occur at end of first line ('single'), or at end of second line ('multi').
     * Defaults to 'multi'.
     */
    cardLabelTruncateLines?: (assetResult: AssetResult) => 'single' | 'multi';
}

declare type AssetLibraryPanelPayload = {
    title?: string | string[];
    entries?: string[];
};

export { AssetMetaData }

export { AssetNumberProperty }

export { AssetPayload }

export { AssetProperty }

export { AssetQueryData }

export { AssetResult }

export { AssetRGBColor }

export { AssetSource }

export { AssetSpotColor }

export { AssetsQueryResult }

export { AssetStringProperty }

export { AudioExportOptions }

/**
 * Bleed margin configuration options for a single design unit type.
 * @public
 */
declare interface BleedMarginOptions {
    /**
     * The bleed margin options that can be selected from a dropdown in the UI.
     * Other bleed margin values can be entered directly using the input field.
     */
    dropdownOptions: number[];
    /**
     * The default bleed margin value.
     */
    defaultBleedMargin: number;
}

export { BlendMode }

export { BlockAPI }

export { BlockEvent }

export { BlockState }

export { BlurType }

export { BlurTypeLonghand }

export { BlurTypeShorthand }

export { BooleanOperation }

export { Buffer }

/**
 * Interface for all available builder. Depending on the context different
 * implementation might be used. A "Button" in the canvas menu might render
 * different component than a button in the topbar or a panel.
 */
declare interface Builder {
    Button: (id: string, options: ButtonOptions) => void;
    ButtonGroup: (id: string, options: ButtonGroupOptions) => void;
    Checkbox: (id: string, options: CheckboxOptions) => void;
    Dropdown: (id: string, options: DropdownOptions) => void;
    MediaPreview: (id: string, options: MediaPreviewOptions) => void;
    Section: (id: string, options: SectionOptions) => void;
    Separator: (id: string) => void;
    TextArea: (id: string, options: TextAreaOptions) => void;
    TextInput: (id: string, options: TextInputOptions) => void;
    NumberInput: (id: string, options: NumberInputOptions) => void;
    ColorInput: (id: string, options: ColorInputOptions) => void;
    Slider: (id: string, options: SliderOptions) => void;
    Library: (id: string, options: LibraryOptions) => void;
    Heading: (id: string, options: HeadingOptions) => void;
    Text: (id: string, options: TextOptions) => void;
    Select: (id: string, options: SelectOptions) => void;
}

/**
 * Function that defines a component with the help of the passed builder object.
 */
declare type BuilderRenderFunction<P = {}> = (context: BuilderRenderFunctionContext<P>) => void;

declare interface BuilderRenderFunctionContext<P> {
    builder: Builder;
    engine: CreativeEngine_2;
    /**
     * State object that can be used to store and retrieve local values.
     *
     * It will take a unique identifier for this state that can be used
     * to access this store later.
     *
     * ```
     * const { value, setValue } = state('unique-id', 'default-value');
     * ```
     *
     * If no default value is set, the `value` property may be undefined
     * if no value was set before:
     *
     * ```
     * const { value, setValue } = state('unique-id', 'default-value');
     * ```
     *
     * @param id - The unique identifier for the state.
     * @param defaultValue - The default value for the state.
     */
    state: {
        /**
         * State object that can be used to store and retrieve a value. If
         * no values are stored, the default value will be returned.
         *
         * @param id - The unique identifier for the state.
         * @param defaultValue - The default value for the state.
         */
        <T>(id: string, defaultValue: T): {
            /**
             * The current value of this state. If no value was set, the default
             * value will be returned.
             *
             * @returns The new value or the default value.
             */
            value: T;
            /**
             * Setting the value of this state. Subsequent calls to `value` will return
             * this value. This will also cause the render function to rerender if the
             * `value` was used.
             *
             * @param value - The new value to set.
             */
            setValue: (value: T) => void;
        };
        /**
         * State object that can be used to store and retrieve a value.
         * If no value was set, the value will be `undefined`.
         *
         * @param id - The unique identifier for the state.
         */
        <T>(id: string): {
            value: T | undefined;
            /**
             * Setting the value of this state. Subsequent calls to `value` will return
             * this value. This will also cause the render function to rerender if the
             * `value` was used.
             *
             * @param value - The new value to set.
             */
            setValue: (value: T) => void;
        };
    };
    payload?: P;
    renderOptimizedSmallViewport: boolean;
}

declare interface ButtonGroupOptions {
    inputLabel?: string | string[];
    inputLabelPosition?: 'top' | 'left';
    children?: () => void;
}

declare interface ButtonOptions {
    inputLabel?: string | string[];
    inputLabelPosition?: 'top' | 'left';
    label?: string | string[];
    tooltip?: string | string[];
    onClick?: () => void;
    variant?: 'regular' | 'plain';
    color?: 'accent' | 'danger';
    size?: 'normal' | 'large';
    icon?: CustomIcon;
    isActive?: boolean;
    isSelected?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    loadingProgress?: number;
}

/** @public */
declare type Callbacks = {
    onBack?: () => void | Promise<void>;
    onClose?: () => void | Promise<void>;
    onShare?: (s: string) => void | Promise<void>;
    onSave?: (s: string) => void | Promise<void>;
    onLoad?: (() => Promise<string>) | 'upload';
    onLoadArchive?: (() => Promise<string>) | 'uploadArchive';
    onDownload?: ((s: string) => void | Promise<void>) | 'download';
    onExport?: ((blobs: Blob[], options: ExportOptions) => void | Promise<void>) | 'download';
    onUpload?: OnUploadCallback | 'local' | (Partial<OnUploadOptions> & {
        callback: OnUploadCallback;
    });
    onUnsupportedBrowser?: () => void;
};

export { Canvas }

declare const CANVAS_BAR_ORDER_DEFAULT: readonly ["ly.img.settings.canvasBar", "ly.img.spacer", "ly.img.page.add.canvasBar", "ly.img.spacer"];

declare const CANVAS_MENU_TEXT_ORDER_DEFAULT: readonly ["ly.img.text.color.canvasMenu", "ly.img.separator", "ly.img.text.bold.canvasMenu", "ly.img.text.italic.canvasMenu", "ly.img.separator", "ly.img.text.variables.canvasMenu"];

declare const CANVAS_MENU_TRANSFORM_ORDER_DEFAULT: readonly ["ly.img.group.enter.canvasMenu", "ly.img.group.select.canvasMenu", "ly.img.page.moveUp.canvasMenu", "ly.img.page.moveDown.canvasMenu", "ly.img.separator", "ly.img.text.edit.canvasMenu", "ly.img.replace.canvasMenu", "ly.img.separator", "ly.img.placeholder.canvasMenu", "ly.img.separator", "ly.img.duplicate.canvasMenu", "ly.img.delete.canvasMenu"];

declare type CanvasBarComponentId = 'ly.img.separator' | 'ly.img.spacer' | (typeof CANVAS_BAR_ORDER_DEFAULT)[number] | (string & {});

declare type CanvasMenuComponentId = 'ly.img.separator' | 'ly.img.spacer' | (typeof CANVAS_MENU_TRANSFORM_ORDER_DEFAULT)[number] | (typeof CANVAS_MENU_TEXT_ORDER_DEFAULT)[number] | (string & {});

/** @public */
declare type CardBackground = {
    path: string;
    type: 'svgVectorPath' | 'image';
};

/** @public */
export declare interface CESDKConfiguration {
    locale: string;
    theme: Theme;
    devMode: boolean;
    ui: UserInterface;
    i18n: I18n;
    a11y: A11y;
    callbacks: Callbacks;
    featureFlags?: _EngineConfiguration['featureFlags'];
    logger: _EngineConfiguration['logger'];
}

/** @public */
export declare namespace CESDKConfiguration {
    export type DeprecatedKeys = {
        /**
         * @deprecated This config key is not used anymore and will be removed.
         */
        presets: {
            /**
             * @deprecated The configuration options `presets.typefaces` has been deprecated.
             * Please use the AssetAPI to add typefaces instead and use `ui.typefaceLibraries` to
             * populate the typeface selection dropdown in the UI.
             */
            typefaces?: {
                [id: string]: TypefaceDefinition;
            };
        };
    };
}

declare interface CheckboxOptions extends InputOptions<boolean, 'left' | 'right'> {
    icon?: CustomIcon;
}

export { CMYK }

export { CMYKColor }

declare interface ColorInputOptions extends InputOptions<Color> {
    label?: string | string[];
}

export { ColorSpace }

/** @public */
declare type CombinedConfiguration = CESDKConfiguration & Omit<_EngineConfiguration, 'presets'> & CESDKConfiguration.DeprecatedKeys;

export { CompleteAssetResult }

declare type ComponentId = DockOrderComponentId | CanvasMenuComponentId | NavigationBarComponentId | CanvasBarComponentId | InspectorBarComponentId;

declare interface ComponentPayload {
    [key: string]: unknown;
}

declare namespace ConfigTypes {
    export {
        CombinedConfiguration,
        CESDKConfiguration,
        Theme,
        Scale,
        I18n,
        A11y,
        UploadCallbackContext,
        OnUploadCallback,
        OnUploadOptions,
        Callbacks,
        PageFormatDefinition,
        BleedMarginOptions,
        FontSizeOptions,
        UIOptionsForSingleDesignUnit,
        UIOptionsPerDesignUnit,
        ViewStyle
    }
}
export { ConfigTypes }

/**
 * @public
 *
 * @privateRemarks
 * The config provided by the user has different types regarding what is
 * optional and what mandatory. This is Configuration, but `ui` is recursively
 * optional, and all other props are non-recursively optional
 */
export declare type Configuration = Partial<CombinedConfiguration>;

export { ContentFillMode }

/**
 * @public
 */
declare class CreativeEditorSDK {
    #private;
    engine: CreativeEngine_2;
    ui: UserInterfaceAPI;
    feature: FeatureAPI;
    /**
     * Convenience function that registers a set of asset sources containing our
     * example assets. These are
     *
     * - `'ly.img.sticker'` - Various stickers
     * - `'ly.img.vectorpath'` - Shapes and arrows
     * - `'ly.img.filter.lut'` - LUT effects of various kinds.
     * - `'ly.img.filter.duotone'` - Color effects of various kinds.
     *
     * These assets are parsed from the IMG.LY CDN at \{\{base_url\}\}/<id>/content.json, where
     * `base_url` defaults to 'https://cdn.img.ly/assets/v3'.
     * Each source is created via `addLocalSource` and populated with the parsed assets. To modify the available
     * assets, you may either exclude certain IDs via `excludeAssetSourceIds` or alter the sources after creation.
     *
     * @param baseURL - The source of the asset definitions, must be absolute. Defaults to `'https://cdn.img.ly/assets/v3'`.
     * @param excludeAssetSourceIds - A list of IDs, that will be ignored during load.
     */
    addDefaultAssetSources({ baseURL, excludeAssetSourceIds }?: {
        baseURL?: string;
        excludeAssetSourceIds?: DefaultAssetSourceId[];
    }): Promise<void>;
    /**
     * Convenience function that registers a set of demo asset sources containing our
     * example assets. These are not to meant to be used in your production code.
     *
     * These are
     *
     * - `'ly.img.image'` - Sample images
     * - `'ly.img.image.upload'` - Demo source to upload image assets
     * - `'ly.img.audio'` - Sample audios
     * - `'ly.img.audio.upload'` - Demo source to upload audio assets
     * - `'ly.img.video'` - Sample videos
     * - `'ly.img.video.upload'` - Demo source to upload video assets
     *
     * @param excludeAssetSourceIds - A list of IDs, that will be ignored during load.
     * @param sceneMode - if 'Video' video specific demo asset sources will be loaded as well. Parsed from global configuration if not set.
     */
    addDemoAssetSources({ baseURL, excludeAssetSourceIds, sceneMode }?: {
        baseURL?: string;
        excludeAssetSourceIds?: DemoAssetSourceId[];
        sceneMode?: SceneMode;
    }): Promise<void>;
    /**
     * Exports one or multiple page(s) as an file in the given mimeType
     *
     * Please note: the `onExport` callback provided in the configuration will be
     * not called. This callback is for exports triggered by an user interaction.
     *
     * @param options -  options for the export
     *
     * @returns a promise with an object holding `blobs` of the export pages and the provided `options`.
     */
    export(options: ExportOptions): Promise<{
        blobs: Blob[];
        options: ExportOptions;
    }>;
    /**
     * Create a scene with a single empty page with the given format.
     * @param format - A `PageFormatDefinition` object specifying the page format to use.
     */
    createDesignScene(format?: PageFormatDefinition): Promise<number>;
    /**
     * Create a scene with a single empty page with the given format.
     * @param format - The page format to use. Can be either a string, identifying
     * a page format that has been configured or a `PageFormatDefinition` object.
     */
    createVideoScene(format?: PageFormatDefinition): Promise<number>;
    /**
     *  Load an encoded scene from the provided string.
     * @deprecated Use `loadFromString` instead.
     * @param scene -  A string starting with UBQ1 and containing the encoded scene.
     */
    load(scene: string): Promise<number>;
    /**
     * Load an encoded scene from the provided string.
     * @param scene -  A string starting with UBQ1 and containing the encoded scene.
     * @returns a promise which resolves if the scene was successfully loaded.
     */
    loadFromString(scene: string): Promise<number>;
    /**
     * Load the scene stored in the file at the given URL.
     * @param url - The url to fetch to acquire the scene string.
     * @returns a promise which resolves if the scene was successfully loaded.
     */
    loadFromURL(url: string): Promise<number>;
    /**
     * Create a scene from the provided image.
     * @param url - The url of the image
     * @returns a promise which resolves if the scene was successfully loaded.
     */
    createFromImage(url: string): Promise<number>;
    /**
     * If no scene is available, 2 seconds after `CreativeEditorSDK.create()`,
     * a warning is shown on the console. This method disables this warning.
     * That can be useful in situation where you are waiting for long running
     * async processes to finish before creating the scene.
     */
    disableNoSceneWarning(): void;
    /**
     * Save and return a scene as a base64 encoded string.
     *
     * @returns a promise with the scene as a string
     */
    save(): Promise<string>;
    /**
     * Adds translations to be used by the editor.
     *
     * @param translations - locale to a translation object
     *
     * @example
     * ```
     * setTranslations({
     *  en: {
     *    presets: {
     *      scene: ...
     *    }
     *  }
     * })
     * ```
     */
    setTranslations(definition: {
        [locale: string]: object;
    }): void;
    unstable_switchPage(pageId: number): Promise<void>;
    unstable_getPages(): Promise<number[]>;
    unstable_onActivePageChanged(callback: (id: number) => void): () => void;
    unstable_focusPage(pageId: number): Promise<void>;
    /**
     * Adds and initializes a plugin to the editor.
     */
    addPlugin(plugin: EditorPlugin): void;
    /**
     * Returns true if a upload handler was configured. If mime types are given
     * as an argument, it will return true if the upload handler supports all of
     * the given mime types.
     */
    unstable_supportsUpload(mimeTypes?: string | string[]): boolean;
    /**
     * Uses the configured upload handler to upload the given file.
     *
     * @param file - The file to upload
     * @param onProgress - A callback to track the progress of the upload
     */
    unstable_upload(file: File, onProgress: (progress: number) => void): Promise<AssetDefinition>;
    /**
     * Trigger a refetch of the asset source and update the asset library panel with the new items accordingly.
     *
     * @param sourceId - The ID or IDs of the asset sources to refetch. If not provided, all asset sources will be refetched.
     *
     * @deprecated Please use `cesdk.engine.asset.assetSourceContentsChanged` instead.
     */
    refetchAssetSources(sourceId?: string | string[]): void;
    /**
     * Disposes the editor and engine if no longer needed.
     */
    dispose(): void;
    /**
     * @deprecated After being deprecated for over a year, the `init()` method has been removed.
     * Please use `CreativeEditorSDK.create()` instead. For more information see https://img.ly/docs/cesdk/introduction/migration_1_13/.
     * CreativeEditorSDK will now attempt to pass the configuration to `CreativeEditorSDK.create()` and continue the initialization process.
     */
    private static init;
    /**
     * Creates an editor and renders it for the given container.
     *
     * This method gives you more control over the initialization process of the
     * editor.  After the returned Promise resolves, you can execute configuration
     * commands on the CreativeEditorSDK instance.  Once that is done, you can
     * load or create an initial scene. Until then the CreativeEditorSDK will
     * display a loading spinner
     *
     * @param container -  the container to mount the editor as a HTML element or selector
     * @param config - the initial configuration to create the editor
     *
     * @returns a promise which resolves after the engine is ready to receive further commands on the CreativeEditorSDK instance
     */
    static create(container: HTMLDivElement | string, config?: Configuration): Promise<CreativeEditorSDK>;
}
export default CreativeEditorSDK;

export { CreativeEngine }

/** @public */
declare type CustomCardBackground = CustomCardImageBackground | CustomCardSvgVectorPathBackground;

/** @public */
declare type CustomCardImageBackground = {
    url: string;
    type: 'image';
};

/** @public */
declare type CustomCardSvgVectorPathBackground = {
    type: 'svgVectorPath';
    viewBox: string;
    width?: string | number;
    height?: string | number;
    d: string;
    stroke?: string;
    strokeWidth?: number | string;
    strokeLinecap?: 'butt' | 'round' | 'square';
    strokeLinejoin?: 'miter' | 'round' | 'bevel';
    strokeDasharray?: string;
    strokeDashoffset?: number | string;
    opacity?: number | string;
    clipPath?: string;
    fill?: string;
    fillRule?: 'nonzero' | 'evenodd';
    clipRule?: 'nonzero' | 'evenodd';
};

declare interface CustomDockComponent extends ComponentPayload {
    id: ComponentId;
}

/** @public */
declare type CustomIcon = string | (({ theme, iconSize }: {
    theme: string;
    iconSize: 'normal' | 'large';
}) => string);

declare type CustomPanelMountFunction = (domElement: HTMLDivElement) => PanelDisposer;

export { CutoutOperation }

export { CutoutType }

export { DefaultAssetSourceId }

export { DemoAssetSourceId }

export { DesignBlockId }

export { DesignBlockType }

export { DesignBlockTypeLonghand }

export { DesignBlockTypeShorthand }

export { DesignUnit }

declare interface Dialog {
    type?: DialogType;
    size?: DialogSize;
    content: DialogContent;
    progress?: DialogProgress;
    actions?: DialogAction | DialogAction[];
    cancel?: DialogAction;
    onClose?: () => void;
    clickOutsideToClose?: boolean;
}

declare type DialogAction = {
    variant?: 'regular' | 'plain';
    color?: 'accent' | 'danger';
    label: string;
    onClick: (context: {
        id: string;
    }) => void;
};

declare type DialogContent = string | {
    title?: string;
    message: string | string[];
};

declare type DialogProgress = number | 'indeterminate' | {
    value: number;
    max: number;
};

declare type DialogSize = 'regular' | 'large';

declare type DialogType = 'regular' | 'success' | 'error' | 'info' | 'warning' | 'loading';

/**
 * @public
 * @deprecated Please use the AssetLibraryEntry & Dock API to control what is shown in the Dock.
 * */
declare interface DockGroup {
    id: string;
    showOverview?: boolean;
    entryIds?: string[];
}

declare type DockOrderComponent = CustomDockComponent | AssetLibraryDockComponent;

declare type DockOrderComponentId = 'ly.img.separator' | 'ly.img.spacer' | (string & {});

declare interface DropdownChildrenContext {
    close: () => void;
}

declare interface DropdownOptions {
    inputLabel?: string | string[];
    inputLabelPosition?: 'top' | 'left';
    label?: string | string[];
    tooltip?: string | string[];
    variant?: 'regular' | 'plain';
    color?: 'accent' | 'danger';
    size?: 'normal' | 'large';
    icon?: CustomIcon;
    isDisabled?: boolean;
    isLoading?: boolean;
    loadingProgress?: number;
    children?: (context: DropdownChildrenContext) => void;
}

export { EditMode }

export { EditorAPI }

/** @public */
export declare interface EditorPlugin {
    name: string;
    version: string;
    initialize: (context: EditorPluginContext) => void;
}

declare type EditorPluginContext = EnginePluginContext & {
    cesdk?: CreativeEditorSDK;
};

export { EffectType }

export { EffectTypeLonghand }

export { EffectTypeShorthand }

declare type EnableFeatureContext = IsEnabledFeatureContext & {
    isPreviousEnable: () => boolean;
};

export { _EngineConfiguration }

export { EngineExportOptions }

export { EnginePlugin }

export { EnginePluginContext }

export { EventAPI }

/** @public */
declare type ExportFormat = 'image/png' | 'video/mp4' | 'application/pdf';

/** @public */
export declare interface ExportOptions extends Pick<EngineExportOptions, 'pngCompressionLevel' | 'jpegQuality' | 'webpQuality' | 'exportPdfWithHighCompatibility' | 'exportPdfWithUnderlayer' | 'underlayerSpotColorName' | 'underlayerOffset'> {
    /** The mime type of the exported blob */
    mimeType: MimeType_2;
    /** The pages to export with the selected page as the default */
    pages?: number[];
}

/**
 * A public interface for enable/disable features of the Creative Editor SDK
 *
 * @public
 */
declare class FeatureAPI {
    #private;
    /**
     * Enables a feature with the given predicate. The predicate is either a
     * boolean that enforces if the features is enabled or not or a function
     * that takes a context and returns a boolean value.
     *
     * The context contains the `isPreviousEnable` function that can be used to
     * query if a feature was enabled before by other `enable` calls, e.g. the
     * defaults from the CE.SDK editor itself. This can be used to further
     * restrict a feature without re-implementing the existing logic.
     *
     * @param featureId - The feature ID to enable
     * @param predicate - The predicate to enable the feature
     */
    enable(featureId: FeatureId | FeatureId[], predicate: FeaturePredicate): void;
    /**
     * Queries if the feature is currently enabled.
     *
     * @param featureId - The feature ID to query
     * @param context - The context to query, mainly an instance of the engine
     */
    isEnabled(featureId: FeatureId, context: IsEnabledFeatureContext): boolean;
}

/**
 * All built-in CE.SDK Feature Ids.
 *
 * @public
 */
declare type FeatureId = 'ly.img.navigate.back' | 'ly.img.navigate.close' | 'ly.img.delete' | 'ly.img.duplicate' | 'ly.img.placeholder' | 'ly.img.preview' | 'ly.img.page.move' | 'ly.img.page.add' | 'ly.img.group' | 'ly.img.replace' | 'ly.img.text.edit' | 'ly.img.text.typeface' | 'ly.img.text.fontSize' | 'ly.img.text.fontStyle' | 'ly.img.text.alignment' | 'ly.img.text.advanced' | 'ly.img.adjustment' | 'ly.img.filter' | 'ly.img.effect' | 'ly.img.blur' | 'ly.img.shadow' | 'ly.img.cutout' | 'ly.img.fill' | 'ly.img.shape.options' | 'ly.img.combine' | 'ly.img.trim' | 'ly.img.crop' | 'ly.img.volume' | 'ly.img.stroke' | 'ly.img.position' | 'ly.img.options' | 'ly.img.animations' | (string & {});

declare type FeaturePredicate = boolean | ((context: EnableFeatureContext) => boolean);

export { FillType }

export { FillTypeLonghand }

export { FillTypeShorthand }

export { Font }

/** @public */
declare interface FontSizeOptions {
    /**
     * The font size options that can be selected from a dropdown in the UI.
     * Other font size values can be entered directly using the input field.
     */
    dropdownOptions: number[];
}

export { FontStyle }

export { FontWeight }

export { GradientColorStop }

export { GradientstopRGBA }

declare interface HeadingOptions {
    content: string;
}

export { HexColorString }

export { HistoryId }

export { HorizontalBlockAlignment }

export { HTMLCreativeEngineCanvasElement }

/**
 * I18n Settings
 * Note: this will append keys and not override keys
 * @public
 */
declare type I18n = Record<string, Translations>;

declare interface InputOptions<T, P = 'top' | 'left'> {
    inputLabel?: string | string[];
    inputLabelPosition?: P;
    value: T;
    setValue: (value: T) => void;
    isDisabled?: boolean;
}

declare const INSPECTOR_BAR_CROP_ORDER_DEFAULT: readonly ["ly.img.cropControls.inspectorBar"];

declare const INSPECTOR_BAR_TRANSFORM_ORDER_DEFAULT: readonly ["ly.img.text.typeFace.inspectorBar", "ly.img.text.fontSize.inspectorBar", "ly.img.shape.options.inspectorBar", "ly.img.cutout.type.inspectorBar", "ly.img.cutout.offset.inspectorBar", "ly.img.cutout.smoothing.inspectorBar", "ly.img.group.create.inspectorBar", "ly.img.group.ungroup.inspectorBar", "ly.img.audio.replace.inspectorBar", "ly.img.separator", "ly.img.text.bold.inspectorBar", "ly.img.text.italic.inspectorBar", "ly.img.text.alignHorizontal.inspectorBar", "ly.img.combine.inspectorBar", "ly.img.separator", "ly.img.fill.inspectorBar", "ly.img.trim.inspectorBar", "ly.img.volume.inspectorBar", "ly.img.crop.inspectorBar", "ly.img.separator", "ly.img.stroke.inspectorBar", "ly.img.separator", "ly.img.animations.inspectorBar", "ly.img.separator", "ly.img.adjustment.inspectorBar", "ly.img.filter.inspectorBar", "ly.img.effect.inspectorBar", "ly.img.blur.inspectorBar", "ly.img.separator", "ly.img.shadow.inspectorBar", "ly.img.spacer", "ly.img.separator", "ly.img.position.inspectorBar", "ly.img.separator", "ly.img.options.inspectorBar"];

declare const INSPECTOR_BAR_TRIM_ORDER_DEFAULT: readonly ["ly.img.trimControls.inspectorBar"];

declare type InspectorBarComponentId = 'ly.img.separator' | 'ly.img.spacer' | (typeof INSPECTOR_BAR_TRANSFORM_ORDER_DEFAULT)[number] | (typeof INSPECTOR_BAR_TRIM_ORDER_DEFAULT)[number] | (typeof INSPECTOR_BAR_CROP_ORDER_DEFAULT)[number] | (string & {});

declare type IsEnabledFeatureContext = {
    engine: CreativeEngine_2;
};

declare interface LibraryOptions {
    entries: AssetLibraryEntry[];
    onSelect?: (asset: CompleteAssetResult) => Promise<void>;
    searchable?: boolean;
}

export { Logger }

export { LogLevel }

declare interface MediaPreviewOptions {
    size?: 'small' | 'medium';
    preview?: PreviewType;
    action?: ButtonOptions;
}

export { MimeType_2 as MimeType }

declare const NAVIGATION_BAR_ORDER_DEFAULT: readonly ["ly.img.back.navigationBar", "ly.img.undoRedo.navigationBar", "ly.img.spacer", "ly.img.title.navigationBar", "ly.img.spacer", "ly.img.zoom.navigationBar", "ly.img.preview.navigationBar", "ly.img.actions.navigationBar", "ly.img.close.navigationBar"];

declare type NavigationBarComponentId = 'ly.img.separator' | 'ly.img.spacer' | (typeof NAVIGATION_BAR_ORDER_DEFAULT)[number] | (string & {});

/** @public */
declare enum NavigationPosition {
    Top = "top",
    Bottom = "bottom"
}

declare interface Notification_2 {
    type?: NotificationType;
    message: string;
    duration?: NotificationDuration;
    onDismiss?: () => void;
    action?: {
        label: string;
        onClick: (context: {
            id: string;
        }) => void;
    };
}

declare type NotificationDuration = number | 'infinite' | 'short' | 'medium' | 'long';

declare type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'loading';

declare interface NumberInputOptions extends InputOptions<number> {
    min?: number;
    max?: number;
    step?: number;
}

export { ObjectType }

export { ObjectTypeLonghand }

export { ObjectTypeShorthand }

export { OffscreenCanvas_2 as OffscreenCanvas }

/** @public */
declare type OnUploadCallback = (file: File, onProgress: (progress: number) => void, context?: UploadCallbackContext) => Promise<AssetDefinition>;

/** @public */
declare type OnUploadOptions = {
    supportedMimeTypes?: string[];
};

/**
 * Turn value at K of T into a Partial
 * @public
 */
export declare type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

declare interface OrderComponent<I = ComponentId> extends ComponentPayload {
    id: I;
}

declare interface OrderContext {
    editMode: EditMode;
}

/** @public */
export declare type PageFormatDefinition = {
    default?: boolean;
    width: number;
    height: number;
    unit: DesignUnit;
    fixedOrientation?: boolean;
};

export { PaletteColor }

declare type PanelDisposer = () => void;

declare type PanelId = '//ly.img.panel/assetLibrary' | '//ly.img.panel/assetLibrary.replace' | '//ly.img.panel/settings' | '//ly.img.panel/inspector' | (string & {});

declare type PanelOptions<T extends PanelId> = {
    closableByUser?: boolean;
    position?: PanelPosition;
    floating?: boolean;
    payload?: PanelPayload<T>;
};

declare type PanelPayload<T extends PanelId> = T extends '//ly.img.panel/assetLibrary' ? AssetLibraryPanelPayload : UnknownPanelPayload;

/** @public */
declare enum PanelPosition {
    Left = "left",
    Right = "right"
}

export { PositionMode }

declare type PreviewType = PreviewTypeImage | PreviewTypeColor;

declare type PreviewTypeColor = {
    type: 'color';
    color: string;
};

declare type PreviewTypeImage = {
    type: 'image';
    uri: string;
};

export { PropertyType }

export { Range_2 as Range }

/** @public */
declare interface ReplaceAssetLibraryEntriesContext {
    selectedBlocks: {
        id: DesignBlockId;
        blockType: DesignBlockTypeLonghand;
        fillType?: FillTypeLonghand;
    }[];
    defaultEntryIds: string[];
}

export { RGBA }

export { RGBAColor }

export { RGBColor }

export { RoleString }

/** @public */
declare type Scale = 'normal' | 'large' | (({ containerWidth, isTouch }: {
    containerWidth?: number;
    isTouch?: boolean;
}) => 'normal' | 'large');

export { SceneAPI }

export { SceneLayout }

export { SceneMode }

export { Scope }

declare interface SectionOptions {
    title?: string;
    children?: () => void;
}

declare interface SelectOptions extends InputOptions<SelectValue> {
    icon?: CustomIcon;
    inputLabel?: string | string[];
    tooltip?: string | string[];
    isDisabled?: boolean;
    isLoading?: boolean;
    loadingProgress?: number;
    values: SelectValue[];
}

declare interface SelectValue {
    id: string;
    label: string | string[];
    icon?: CustomIcon;
}

export { SettingsBool }

export { SettingsBoolInternal }

export { SettingsColor }

export { SettingsColorRGBA }

export { SettingsEnum }

export { SettingsEnumInternal }

export { SettingsFloat }

export { SettingsString }

export { SettingType }

export { ShapeType }

export { ShapeTypeLonghand }

export { ShapeTypeShorthand }

export { SizeMode }

declare interface SliderOptions extends InputOptions<number> {
    min: number;
    max: number;
    step?: number;
    centered?: boolean;
}

export { SortingOrder }

export { Source }

export { SpotColor }

export { StrokeCornerGeometry }

export { StrokePosition }

export { StrokeStyle }

export { supportsBrowser }

export { supportsVideo }

export { supportsVideoExport }

export { supportsWasm }

declare interface TextAreaOptions extends InputOptions<string> {
}

export { TextCase }

declare interface TextInputOptions extends InputOptions<string> {
}

declare interface TextOptions {
    content: string;
    align?: 'left' | 'center' | 'right';
}

/** @public */
declare type Theme = 'light' | 'dark';

export { TransientResource }

/** @public */
export declare interface Translations {
    [key: string]: string | Translations;
}

export { Typeface }

export { TypefaceDefinition }

/** @public */
declare interface UIOptionsForSingleDesignUnit {
    bleedMargin: BleedMarginOptions;
}

/** @public */
declare interface UIOptionsPerDesignUnit {
    mm: UIOptionsForSingleDesignUnit;
    px: UIOptionsForSingleDesignUnit;
    in: UIOptionsForSingleDesignUnit;
}

declare type UnknownPanelPayload = {
    [key: string]: unknown;
};

/** @public */
declare interface UploadCallbackContext {
    sourceId: string;
    group?: string;
}

/** @public */
export declare interface UserInterface {
    baseURL?: string;
    scale?: Scale;
    elements?: UserInterfaceElements_2;
    stylesheets?: {
        disableShadowDOM?: boolean;
        disableTagInsertion?: boolean;
        disableFontInsertion?: boolean;
    };
    hide?: boolean;
    smallViewportOptimization?: boolean;
    /**
     * @deprecated The configuration options `ui.colorPalette` has been deprecated. Please use `ui.colorLibraries` and asset sources instead.
     */
    colorPalette?: PaletteColor[];
    colorLibraries?: string[];
    typefaceLibraries?: string[];
    pageFormats?: {
        [id: string]: PageFormatDefinition;
    };
}

/**
 * A public interface for controlling the UI of the Creative Editor SDK
 *
 * @public
 */
declare class UserInterfaceAPI {
    #private;
    /**
     * Opens a panel with the given id if and only if it exists, is not open and
     * currently registered (known to the UI). Otherwise the method does nothing
     * and is a noop.
     *
     * Available panel ids beside custom panel ids:
     * - `//ly.img.panel/inspector`
     *   opening the inspector panel for the current selected block
     * - `//ly.img.panel/assetLibrary.replace`
     *   opening the library with asset to replace the currently selected block.
     *   Beware that the library might show nothing depending on how it configured.
     *
     * @param panelId - The id of the panel to open.
     * @param options - Options to override the position and floating state of the panel.
     */
    openPanel<T extends PanelId>(panelId: T, options?: PanelOptions<T>): void;
    /**
     * Closes a panel with the given id if and only if it exists and is open.
     * Otherwise the method does nothing and is a noop.
     *
     * Available panel ids beside custom panel ids:
     * - `//ly.img.panel/inspector`
     *   closing the inspector panel for the current selected block
     * - `//ly.img.panel/assetLibrary`
     *   closing the currently open library
     * - `//ly.img.panel/assetLibrary.replace`
     *   closing the library with asset to replace the currently selected block.
     *
     * @param panelId - The id of the panel to close.
     */
    closePanel(panelId: string): void;
    /**
     * Returns `true` if and only if a panel with the given id is open.
     *
     * Available panel ids beside custom panel ids:
     * - `//ly.img.panel/inspector`
     *   inspector panel for the current selected block
     * - `//ly.img.panel/assetLibrary`
     *   the asset library
     * - `//ly.img.panel/assetLibrary.replace`
     *   closing the library with asset to replace the currently selected block.
     *
     * @param panelId - The id of a panel that might be open
     * @param options - Check if the panel is open with these specific options
     */
    isPanelOpen<T extends PanelId>(panelId: T, options?: PanelOptions<T>): boolean;
    /**
     * Returns all panel ids. An optional filter can be applied to only
     * return panels that are open or have a specific position.
     *
     * E.g.:
     * ```
     * cesdk.ui.findAllPanels();
     * cesdk.ui.findAllPanels({ open: true, position: 'left' });
     * ```
     *
     * @param options - Return panel ids with these specific options
     * @returns All panel ids (that match the given options if provided)
     */
    findAllPanels<T extends PanelId>(options?: PanelOptions<T> & {
        open?: boolean;
    }): string[];
    /**
     * Set the position of the panel in the editor
     *
     * @param panelId - The id of a panel to set the position
     * @param panelPosition - either `left` or `right`
     */
    setPanelPosition(panelId: string, panelPosition: PanelPosition | (() => PanelPosition)): void;
    /**
     * Returns the position for a panel either `left` or `right`
     *
     * @param panelId - The id of a panel to get the position
     */
    getPanelPosition(panelId: string): PanelPosition;
    /**
     * Set if the panel is floating over the canvas
     *
     * @param panelId - The id of a panel to set the position
     * @param floating - A boolean that determines if the panel is floating over the canvas
     */
    setPanelFloating(panelId: string, floating: boolean | (() => boolean)): void;
    /**
     * Returns if the given panel is floating over the canvas
     *
     * @param panelId - The id of a panel to determine if it is floating
     */
    getPanelFloating(panelId: string): boolean;
    /**
     * Shows a notification to the user. A notification is a non-blocking
     * message that is shown to the user for a certain amount of time.
     * The user can dismiss the notification.
     *
     * @param notification - The notification to show. Can be a string or an notification object.
     * @returns The id of the notification that is shown. Can be used to programmatically update or dismiss the notification.
     */
    showNotification(notification: string | Notification_2): string;
    /**
     * Programmatically dismisses a notification with the given id.
     *
     * @param id - The id of the notification to dismiss.
     */
    dismissNotification(id: string): void;
    /**
     * Programmatically updates a notification with the given id. The
     * notification object will be merged into the existing notification.
     *
     * If the duration is updated, the current timeout will be cleared and set to
     * the new duration. If the notification is already dismissed, the update is
     * a noop.
     *
     * @param id - The id of the notification to dismiss.
     * @param notification - The partial notification object that will be merged into the notification.
     */
    updateNotification(id: string, notification: Partial<Notification_2>): void;
    /**
     * Programmatically show a dialog with the given content. The dialog
     * can be of different types (e.g. `info`, `success`, `warning`, `error`,
     * `loading`) and can have different actions (e.g. `OK`, `Cancel`).
     *
     * @param dialog - The dialog to show. Can be a string or a dialog object.
     * @returns - The id of the dialog. Can be used to programmatically close or update the dialog.
     */
    showDialog(dialog: string | Dialog): string;
    /**
     * Update a dialog with the given id. The dialog will be updated with the
     * given partial dialog object. The dialog will be merged with the existing dialog.
     *
     * @param id - The id of the dialog to update.
     * @param dialog - The partial dialog object that will be merged into the dialog.
     */
    updateDialog(id: string, dialog: Partial<Dialog> | ((dialog: Dialog) => Partial<Dialog>)): void;
    /**
     * Programmatically close a registered dialog with the given id. If the dialog is already closed, the close call is a noop.
     *
     * @param id - The id of the dialog to close.
     */
    closeDialog(id: string): void;
    /**
     * Registeres a custom panel to hook into a dom element and render any
     * custom UI code.
     *
     * The `onMount` function will be called if the panel is opened (e.g. via the `openPanel` API).
     * The returned function of the `onMount` call will be called once the panels closes.
     *
     * Please be aware that this is experimental right now. This API can change or
     * be replaced or even removed completely in future versions.
     */
    unstable_registerCustomPanel(panelId: string, onMount: CustomPanelMountFunction): void;
    /**
     * Registers a panel which content can be rendered with a panel builder,
     * comparable to the way we register custom components.
     *
     * The builder render function will be called with a builder and the engine
     * as arguments. The builder object is used to defined what base components
     * should be rendered (such as a button). The engine can be used to get any
     * state from the engine. The render function will be re-called if anything
     * in the engine changes regarding the made engine calls.
     *
     * @param panelId - The id of the panel that can be used in with the Panel APIs.
     * @param renderPanel - The render function that will be called to render the content of the panel
     */
    registerPanel<P extends ComponentPayload = ComponentPayload>(panelId: string, renderPanel: BuilderRenderFunction<P>): void;
    /**
     * @deprecated Use `registerPanel` instead.
     */
    unstable_registerPanel<P extends ComponentPayload = ComponentPayload>(panelId: string, renderComponent: BuilderRenderFunction<P>): void;
    /**
     * Registers a component that can be used and rendered at different
     * locations in the UI.
     *
     * The builder render function will be called with a builder and the engine
     * as arguments. The builder object is used to defined what base components
     * should be rendered (such as a button). The engine can be used to get any
     * state from the engine. The render function will be re-called if anything
     * in the engine changes regarding the made engine calls.
     *
     * @param id - The id of the component that can be used in the order APIs. Might be an array of ids. In this case the component is registered for all ids.
     * @param renderComponent - The render function that will be called to render the component
     */
    registerComponent<P extends ComponentPayload = ComponentPayload>(ids: string | string[], renderComponent: BuilderRenderFunction<P>): void;
    /**
     * Defines in what order components are rendered in the dock. The
     * id in this order refer to registered default components or custom components
     * registered in `registerComponent`.
     *
     * Different orders can be set depending on different contexts. The context
     * consists of the edit mode (e.g. `Transform` or `Text`) right now. If no
     * context is given, the default order is set for the `Transform` edit mode.
     *
     * @param dockOrder - The order of components in the dock
     * @param orderContext - The context in which the order should be set
     */
    setDockOrder(dockOrder: (DockOrderComponentId | DockOrderComponent)[], orderContext?: OrderContext): void;
    /**
     * Returns the current order of components that are rendered in the dock.
     *
     * The id in this order refer to registered default components or custom components
     * registered in `registerComponent`.
     *
     * Different orders could have been set depending on different contexts.
     * The context consists of the edit mode (e.g. `Transform` or `Text`) right now.
     * If no context is given, the default order (with `Transform` edit mode) is
     * returned.
     *
     * @param orderContext - The context for the requested order
     * @returns The order of components in the dock
     */
    getDockOrder(orderContext?: OrderContext): DockOrderComponent[];
    /**
     * Defines in what order components are rendered in the inspector bar. The
     * id in this order refer to registered default components or custom components
     * registered in `registerComponent`.
     *
     * Different orders can be set depending on different contexts. The context
     * consists of the edit mode (e.g. `Transform` or `Text`) right now. If no
     * context is given, the default order is set for the `Transform` edit mode.
     *
     * @param inspectorBarOrder - The order of components in the inspector bar
     * @param orderContext - The context in which the order should be set
     */
    setInspectorBarOrder(inspectorBarOrder: (InspectorBarComponentId | OrderComponent<InspectorBarComponentId>)[], orderContext?: OrderContext): void;
    /**
     * Returns the current order of components that are rendered in the inspector bar.
     *
     * The id in this order refer to registered default components or custom components
     * registered in `registerComponent`.
     *
     * Different orders could have been set depending on different contexts.
     * The context consists of the edit mode (e.g. `Transform` or `Text`) right now.
     * If no context is given, the default order (with `Transform` edit mode) is
     * returned.
     *
     * @param orderContext - The context for the requested order
     * @returns The order of components in the inspector bar
     */
    getInspectorBarOrder(orderContext?: OrderContext): OrderComponent[];
    /**
     * Defines what in what order components are rendered in the canvas menu. The
     * id in this order refer to registered default components or custom components
     * registered in `registerComponent`.
     *
     * Different orders can be set depending on different contexts. The context
     * consists of the edit mode (e.g. `Transform` or `Text`) right now. If no
     * context is given, the default order is set for the `Transform` edit mode.
     *
     * @param canvasMenuOrder - The order of components in the canvas menu
     * @param orderContext - The context in which the order should be set
     */
    setCanvasMenuOrder(canvasMenuOrder: (CanvasMenuComponentId | OrderComponent<CanvasMenuComponentId>)[], orderContext?: OrderContext): void;
    /**
     * Returns the current order of components that are rendered in the canvas menu.
     *
     * The id in this order refer to registered default components or custom components
     * registered in `registerComponent`.
     *
     * Different orders could have been set depending on different contexts.
     * The context consists of the edit mode (e.g. `Transform` or `Text`) right now.
     * If no context is given, the default order (with `Transform` edit mode) is
     * returned.
     *
     * @param orderContext - The context for the requested order
     * @returns The order of components in the canvas menu
     */
    getCanvasMenuOrder(orderContext?: OrderContext): OrderComponent[];
    /**
     * Defines the order in which components are rendered in the navigation bar. The
     * id in this order refer to registered default components or custom components
     * registered in `registerComponent`.
     *
     * Different orders can be set depending on different contexts. The context
     * consists of the edit mode (e.g. `Transform` or `Text`) right now. If no
     * context is given, the default order is set for the `Transform` edit mode.
     *
     * @param navigationBarOrder - The order of components in the navigation bar
     * @param orderContext - The context in which the order should be set
     */
    setNavigationBarOrder(navigationBarOrder: (NavigationBarComponentId | OrderComponent<NavigationBarComponentId>)[], orderContext?: OrderContext): void;
    /**
     * Returns the current order of components that are rendered in the navigation bar.
     *
     * The id in this order refer to registered default components or custom components
     * registered in `registerComponent`.
     *
     * Different orders could have been set depending on different contexts.
     * The context consists of the edit mode (e.g. `Transform` or `Text`) right now.
     * If no context is given, the default order (with `Transform` edit mode) is
     * returned.
     *
     * @param orderContext - The context for the requested order
     * @returns The order of components in the navigation bar
     */
    getNavigationBarOrder(orderContext?: OrderContext): OrderComponent[];
    /**
     * Defines the order in which components are rendered in the canvas bar. The
     * id in this order refer to registered default components or custom components
     * registered in `registerComponent`.
     *
     * There are two different canvas bar positioned at the top and the bottom
     * of the canvas. The position can be set with the `position` parameter.
     *
     * Different orders can be set depending on different contexts. The context
     * consists of the edit mode (e.g. `Transform` or `Text`) right now. If no
     * context is given, the default order is set for the `Transform` edit mode.
     *
     * @param canvasBarOrder - The order of components in the canvas bar
     * @param position - The position of the canvas bar (`top` or `bottom`)
     * @param orderContext - The context in which the order should be set
     */
    setCanvasBarOrder(canvasBarOrder: (CanvasBarComponentId | OrderComponent<CanvasBarComponentId>)[], position: 'top' | 'bottom', orderContext?: OrderContext): void;
    /**
     * Returns the current order of components that are rendered in the canvas bar at
     * the given position (either `top` or `bottom`).
     *
     * The id in this order refer to registered default components or custom components
     * registered in `registerComponent`.
     *
     * Different orders could have been set depending on different contexts.
     * The context consists of the edit mode (e.g. `Transform` or `Text`) right now.
     * If no context is given, the default order (with `Transform` edit mode) is
     * returned.
     *
     * @param position - The position of the canvas bar (`top` or `bottom`)
     * @param orderContext - The context for the requested order
     */
    getCanvasBarOrder(position: 'top' | 'bottom', orderContext?: OrderContext): OrderComponent[];
    /**
     * Adds a new asset library entry that can be used to be displayed
     * by an asset library. An existing entry view will be replaced.
     *
     * @param AssetLibraryEntry - The asset library entry
     */
    addAssetLibraryEntry(AssetLibraryEntry: AssetLibraryEntry): void;
    /**
     * Updates an asset library entry that can be used to be displayed
     * by an asset library.
     *
     * @param id - The id of the asset library entry to be updated
     * @param AssetLibraryEntry - The asset library entry updates
     */
    updateAssetLibraryEntry(id: string, assetLibraryEntry: Partial<Omit<AssetLibraryEntry, 'id'>>): void;
    /**
     * Removes an asset library entry that can be used to be displayed
     * by an asset library.
     *
     * @param id - The id of the asset library entry to be removed
     */
    removeAssetLibraryEntry(id: string): void;
    /**
     * Returns the current asset library entry that is used to be displayed
     * by an asset library.
     *
     * @param id - The id of the asset library entry
     * @returns The asset library entry
     */
    getAssetLibraryEntry(id: string): AssetLibraryEntry | undefined;
    /**
     * Returns all currently added asset library entries.
     *
     * @returns All asset library entries
     */
    findAllAssetLibraryEntries(): string[];
    /**
     * Sets the asset library entry ids that should be  used for the background track
     *
     * Please note that this has only an effect for video scenes
     *
     * @param backgroundTrackAssetLibraryEntries - The asset library entry ids that should be used for the background track
     */
    setBackgroundTrackAssetLibraryEntries(backgroundTrackAssetLibraryEntries: string[]): void;
    /**
     * Returns the asset library entry ids that should be  used for the background track
     *
     * Please note that this has only an effect for video scenes
     *
     * @returns The asset library entry ids that should be used for the background track
     */
    getBackgroundTrackAssetLibraryEntries(): string[];
    /**
     * Sets the asset library entry ids that should be  used for replacement. It is a function
     * that is called with the current context (e.g. selected blocks, or default entry ids).
     *
     * @returns a function that returns an array of asset library entry ids that should be used for replacement
     */
    setReplaceAssetLibraryEntries(replaceAssetLibraryEntries: (context: ReplaceAssetLibraryEntriesContext) => string[]): void;
    /**
     * Returns the current view of the editor.
     *
     * @returns either `default` or `advanced`
     */
    unstable_getView(): ViewStyle;
    /**
     * Adds an icon set to the editor. The icon set is a string containing a SVG
     * sprite with symbols. The id of each symbol is used to reference the icon
     * in the editor. These ids need to start with a `@` to be recognized in the
     * editor.
     *
     * PLEASE NOTE: The SVG sprite will be injected into the (shadow) DOM without
     * any sanitization. Make sure to only use trusted sources to prevent e.g. XSS
     * attacks. If you are unsure about the source of the sprite, consider using
     * libraries like DOMPurify to sanitize the SVG string before adding it.
     *
     * @param id - The id of the icon set
     * @param svgSprite - The SVG sprite containing symbols for icons.
     */
    addIconSet(id: string, svgSprite: string): void;
}

/** @public */
declare interface UserInterfaceAssetLibrary extends UserInterfaceElement {
    position?: PanelPosition;
}

/** @public */
declare interface UserInterfaceCustomAction {
    callback: () => void | Promise<void>;
    label: string;
    iconName: UserInterfaceCustomActionIconName;
}

/** @public */
declare type UserInterfaceCustomActionIconName = 'default' | 'download' | 'upload' | 'save';

/** @public */
declare interface UserInterfaceElement {
    show?: boolean;
}

declare namespace UserInterfaceElements {
    export {
        PanelPosition,
        NavigationPosition,
        CustomIcon,
        UserInterfaceElement,
        UserInterfaceInspectorBlocks,
        UserInterfaceInspectorBlock,
        UserInterfaceInspectorBlockPage,
        UserInterfaceInspectorBlockText,
        UserInterfaceInspectorBlockImage,
        UserInterfaceInspectorBlockVideoFill,
        UserInterfaceInspectorBlockRectShape,
        UserInterfaceInspectorBlockGraphic,
        UserInterfaceInspectorBlockShape,
        UserInterfaceInspector,
        UserInterfaceSettings,
        UserInterfaceAssetLibrary,
        ExportFormat,
        UserInterfaceExportAction,
        UserInterfaceCustomActionIconName,
        UserInterfaceCustomAction,
        UserInterfaceNavigation,
        DockGroup,
        CardBackground,
        CustomCardImageBackground,
        CustomCardSvgVectorPathBackground,
        CustomCardBackground,
        AssetLibraryEntryView,
        AssetLibraryEntryData,
        AssetLibraryEntry,
        AssetLibraryEntries,
        ReplaceAssetLibraryEntriesContext,
        UserInterfaceElements_2 as UserInterfaceElements
    }
}
export { UserInterfaceElements }

/** @public */
declare interface UserInterfaceElements_2 {
    view?: 'default' | 'advanced';
    panels?: {
        inspector?: UserInterfaceInspector | boolean;
        settings?: UserInterfaceSettings | boolean;
        assetLibrary?: UserInterfaceAssetLibrary | boolean;
    };
    dock?: {
        show?: boolean;
        iconSize?: 'normal' | 'large';
        hideLabels?: boolean;
        /**
         * If groups are used this group will contain all entries that are
         * not included in other groups.
         * @deprecated Please use the AssetLibraryEntry & Dock API to control what is shown in the Dock.
         */
        defaultGroupId?: string;
        /**
         * If set the entries will be grouped by these dock groups
         *
         * @deprecated Please use the AssetLibraryEntry & Dock API to control what is shown in the Dock.
         */
        groups?: DockGroup[] | ((currentDockGroup: DockGroup[]) => DockGroup[]);
    };
    libraries?: {
        insert?: {
            /**
             * @deprecated Please use the AssetLibraryEntry & Dock API to control what is shown in the Dock.
             */
            entries?: AssetLibraryEntries;
            autoClose?: boolean | (() => boolean);
            floating?: boolean;
            backgroundTrackLibraryEntries?: string[] | ((entries: AssetLibraryEntry[]) => string[]);
        };
        replace?: {
            /**
             * @deprecated Please use the AssetLibraryEntry & Dock API to control what is shown in the Dock.
             */
            entries?: AssetLibraryEntries;
            autoClose?: boolean | (() => boolean);
            floating?: boolean;
        };
    };
    blocks?: UserInterfaceInspectorBlocks;
    navigation?: UserInterfaceNavigation;
    inspectorBar?: UserInterfaceElement | boolean;
}

/** @public */
declare interface UserInterfaceExportAction extends UserInterfaceElement {
    format?: ExportFormat[];
}

/** @public */
declare interface UserInterfaceInspector extends UserInterfaceElement {
    position?: PanelPosition;
    floating?: boolean;
}

/** @public */
declare interface UserInterfaceInspectorBlock {
}

/** @public */
declare interface UserInterfaceInspectorBlockGraphic extends UserInterfaceInspectorBlock {
    crop?: UserInterfaceElement | boolean;
    filters?: UserInterfaceElement | boolean;
    adjustments?: UserInterfaceElement | boolean;
    effects?: UserInterfaceElement | boolean;
    blur?: UserInterfaceElement | boolean;
}

/** @public */
declare interface UserInterfaceInspectorBlockImage extends UserInterfaceInspectorBlock {
    crop?: UserInterfaceElement | boolean;
    filters?: UserInterfaceElement | boolean;
    adjustments?: UserInterfaceElement | boolean;
    effects?: UserInterfaceElement | boolean;
    blur?: UserInterfaceElement | boolean;
}

/** @public */
declare interface UserInterfaceInspectorBlockPage extends UserInterfaceInspectorBlock {
    format?: UserInterfaceElement | boolean;
    manage?: UserInterfaceElement | boolean;
    /**
     * Controls the maximum allowed duration of a page, if in video mode.
     */
    maxDuration?: number;
    crop?: UserInterfaceElement | boolean;
    filters?: UserInterfaceElement | boolean;
    adjustments?: UserInterfaceElement | boolean;
    effects?: UserInterfaceElement | boolean;
    blur?: UserInterfaceElement | boolean;
}

/** @public */
declare interface UserInterfaceInspectorBlockRectShape extends UserInterfaceInspectorBlock {
    crop?: UserInterfaceElement | boolean;
    filters?: UserInterfaceElement | boolean;
    adjustments?: UserInterfaceElement | boolean;
    effects?: UserInterfaceElement | boolean;
    blur?: UserInterfaceElement | boolean;
}

/** @public */
declare interface UserInterfaceInspectorBlocks {
    opacity?: UserInterfaceElement | boolean;
    transform?: UserInterfaceElement | boolean;
    trim?: UserInterfaceElement | boolean;
    '//ly.img.ubq/text'?: UserInterfaceInspectorBlockText;
    '//ly.img.ubq/page'?: UserInterfaceInspectorBlockPage;
    '//ly.img.ubq/graphic'?: UserInterfaceInspectorBlockGraphic;
}

/** @public */
declare interface UserInterfaceInspectorBlockShape extends UserInterfaceInspectorBlock {
    crop?: UserInterfaceElement | boolean;
}

/** @public */
declare interface UserInterfaceInspectorBlockText extends UserInterfaceInspectorBlock {
    advanced?: UserInterfaceElement | boolean;
    color?: UserInterfaceElement | boolean;
}

/** @public */
declare interface UserInterfaceInspectorBlockVideoFill extends UserInterfaceInspectorBlock {
    crop?: UserInterfaceElement | boolean;
    filters?: UserInterfaceElement | boolean;
    adjustments?: UserInterfaceElement | boolean;
    effects?: UserInterfaceElement | boolean;
    blur?: UserInterfaceElement | boolean;
}

/** @public */
declare interface UserInterfaceNavigation extends UserInterfaceElement {
    position?: NavigationPosition;
    title?: string | null;
    action?: {
        close?: UserInterfaceElement | boolean;
        back?: UserInterfaceElement | boolean;
        save?: UserInterfaceElement | boolean;
        export?: UserInterfaceExportAction | boolean;
        share?: UserInterfaceElement | boolean;
        load?: UserInterfaceElement | boolean;
        download?: UserInterfaceElement | boolean;
        custom?: UserInterfaceCustomAction[];
    };
}

/** @public */
declare interface UserInterfaceSettings extends UserInterfaceElement {
}

export { VariableAPI }

export { VerticalBlockAlignment }

/** @public */
declare enum ViewStyle {
    Advanced = "advanced",
    Default = "default"
}

export { XYWH }

export { ZoomAutoFitAxis }

export { }
