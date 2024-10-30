/**
 * The block type IDs for the animation blocks. These are the IDs used to create new animations
 * using `cesdk.engine.block.createAnimation(id)`.
 * @public
 */
export declare type AnimationType = AnimationTypeShorthand | AnimationTypeLonghand;

/**
 * The longhand block type IDs for the animation blocks. These are the IDs used to create new animations
 * using `cesdk.engine.block.createAnimation(id)`.
 * @public
 */
export declare type AnimationTypeLonghand = `//ly.img.ubq/animation/${AnimationTypeShorthand}`;

/**
 * The shorthand block type IDs for the animation blocks. These are the IDs used to create new animations
 * using `cesdk.engine.block.createAnimation(id)`.
 * @public
 */
export declare type AnimationTypeShorthand = 'slide' | 'pan' | 'fade' | 'blur' | 'grow' | 'zoom' | 'pop' | 'wipe' | 'baseline' | 'crop_zoom' | 'spin' | 'spin_loop' | 'fade_loop' | 'blur_loop' | 'pulsating_loop' | 'breathing_loop' | 'jump_loop' | 'squeeze_loop' | 'sway_loop';

/**
 * Generic asset information
 * @public
 */
export declare interface Asset {
    /**
     * The unique id of this asset.
     */
    id: string;
    /**  Groups of the asset.  */
    groups?: AssetGroups;
    /** Asset-specific and custom meta information */
    meta?: AssetMetaData;
    /** Structured asset-specific data */
    payload?: AssetPayload;
}

/**
 * @public
 */
export declare class AssetAPI {
    #private;



    /**
     * Adds a custom asset source. Its ID has to be unique.
     * @param source - The asset source.
     */
    addSource(source: AssetSource): void;
    /**
     * Adds a local asset source. Its ID has to be unique.
     * @param source - The asset source.
     * @param supportedMimeTypes - The mime types of assets that are allowed to be added to this local source.
     * @param applyAsset - An optional callback that can be used to override the default behavior of applying a given
     * asset result to the active scene.
     * @param applyAssetToBlock - An optional callback that can be used to override the default behavior of applying
     * an asset result to a given block.
     */
    addLocalSource(id: string, supportedMimeTypes?: string[], applyAsset?: (asset: CompleteAssetResult) => Promise<DesignBlockId | undefined>, applyAssetToBlock?: (asset: CompleteAssetResult, block: DesignBlockId) => Promise<void>): void;
    /**
     * Removes an asset source with the given ID.
     * @param id - The ID to refer to the asset source.
     */
    removeSource(id: string): void;
    /**
     * Finds all registered asset sources.
     * @returns A list with the IDs of all registered asset sources.
     */
    findAllSources(): string[];
    /**
     * Finds assets of a given type in a specific asset source.
     * @param sourceId - The ID of the asset source.
     * @param query - All the options to filter the search results by.
     * @returns The search results.
     */
    findAssets(sourceId: string, query: AssetQueryData): Promise<AssetsQueryResult<CompleteAssetResult>>;
    /**
     * Queries the asset source's groups for a certain asset type.
     * @param id - The ID of the asset source.
     * @returns The asset groups.
     */
    getGroups(id: string): Promise<string[]>;
    /**
     * Queries the list of supported mime types of the specified asset source.
     * An empty result means that all mime types are supported.
     * @param sourceId - The ID of the asset source.
     */
    getSupportedMimeTypes(sourceId: string): string[];
    /**
     * Queries the asset source's credits info.
     * @param sourceId - The ID of the asset source.
     * @returns The asset source's credits info consisting of a name and an optional URL.
     */
    getCredits(sourceId: string): {
        name: string;
        url: string | undefined;
    } | undefined;
    /**
     * Queries the asset source's license info.
     * @param sourceId - The ID of the asset source.
     * @returns The asset source's license info consisting of a name and an optional URL.
     */
    getLicense(sourceId: string): {
        name: string;
        url: string | undefined;
    } | undefined;
    canManageAssets(sourceId: string): boolean;
    /**
     * Adds the given asset to a local asset source.
     * @param sourceId - The local asset source ID that the asset should be added to.
     * @param asset - The asset to be added to the asset source.
     */
    addAssetToSource(sourceId: string, asset: AssetDefinition): void;
    /**
     * Removes the specified asset from its local asset source.
     * @param sourceId - The id of the local asset source that currently contains the asset.
     * @param assetId - The id of the asset to be removed.
     */
    removeAssetFromSource(sourceId: string, assetId: string): void;
    /**
     * Apply an asset result to the active scene.
     * The default behavior will instantiate a block and configure it according to the asset's properties.
     * Note that this can be overridden by providing an `applyAsset` function when adding the asset source.
     * @param sourceId - The ID of the asset source.
     * @param assetResult - A single assetResult of a `findAssets` query.
     */
    apply(sourceId: string, assetResult: AssetResult): Promise<DesignBlockId | undefined>;
    /**
     * Apply an asset result to the given block.
     * @param sourceId - The ID of the asset source.
     * @param assetResult - A single assetResult of a `findAssets` query.
     * @param block - The block the asset should be applied to.
     */
    applyToBlock(sourceId: string, assetResult: AssetResult, block: DesignBlockId): Promise<void>;
    unstable_applyProperty(sourceId: string, assetResult: AssetResult, property: AssetProperty): Promise<void>;
    /**
     * The default implementation for applying an asset to the scene.
     * This implementation is used when no `applyAsset` function is provided to `addSource`.
     * @param assetResult - A single assetResult of a `findAssets` query.
     */
    defaultApplyAsset(assetResult: AssetResult): Promise<DesignBlockId | undefined>;
    /**
     * The default implementation for applying an asset to an existing block.
     * @param assetResult - A single assetResult of a `findAssets` query.
     * @param block - The block to apply the asset result to.
     */
    defaultApplyAssetToBlock(assetResult: AssetResult, block: DesignBlockId): Promise<void>;
    /**
     * Register a callback to be called every time an asset source is added.
     * @param callback - The function that is called whenever an asset source is added.
     * @returns A method to unsubscribe.
     */
    onAssetSourceAdded: (callback: (sourceID: string) => void) => (() => void);
    /**
     * Register a callback to be called every time an asset source is removed.
     * @param callback - The function that is called whenever an asset source is added.
     * @returns A method to unsubscribe.
     */
    onAssetSourceRemoved: (callback: (sourceID: string) => void) => (() => void);
    /**
     * Register a callback to be called every time an asset source's contents are changed.
     * @param callback - The function that is called whenever an asset source is updated.
     * @returns A method to unsubscribe.
     */
    onAssetSourceUpdated: (callback: (sourceID: string) => void) => (() => void);
    /**
     * Notifies the engine that the contents of an asset source changed.
     * @param sourceID - The asset source whose contents changed.
     */
    assetSourceContentsChanged(sourceID: string): void;

}

/**
 * Asset boolean property definition
 * @public
 */
export declare interface AssetBooleanProperty {
    property: string;
    type: 'Boolean';
    value: boolean;
    defaultValue: boolean;
}

/**
 * Asset Color payload CMYK representation
 * @public
 */
export declare interface AssetCMYKColor {
    colorSpace: 'CMYK';
    c: number;
    m: number;
    y: number;
    k: number;
}

/**
 * Asset Color payload
 * @public
 */
export declare type AssetColor = AssetRGBColor | AssetCMYKColor | AssetSpotColor;

/**
 * Asset color property definition
 * @public
 */
export declare interface AssetColorProperty {
    property: string;
    type: 'Color';
    value: AssetColor;
    defaultValue: AssetColor;
}

/**
 * Definition of an asset used if an asset is added to an asset source.
 * @public
 */
export declare interface AssetDefinition extends Asset {
    /**
     * Label used to display in aria-label and as a tooltip.
     * Will be also searched in a query and should be localized
     */
    label?: Record<Locale, string>;
    /**
     * Tags for this asset. Can be used for filtering, but is also useful for
     * free-text search. Since the label is searched as well as used for tooltips
     * you do not want to overdo it, but still add things which are searched.
     * Thus, it should be localized similar to the `label`.
     */
    tags?: Record<Locale, string[]>;
}

/**
 * Asset enum property definition
 * @public
 */
export declare interface AssetEnumProperty {
    property: string;
    type: 'Enum';
    value: string;
    defaultValue: string;
    options: string[];
}

/**
 * An asset can be member of multiple groups. Groups have a semantic meaning
 * used to build and group UIs exploring the assets, e.g.sections in the
 * content library, or for things like topics in Unsplash for instance.
 *
 * Tags in comparison have are more loosely hold meaning used for extended
 * searching/filtering.
 * @public
 */
export declare type AssetGroups = string[];

/**
 * Generic asset information
 * @public
 */
export declare type AssetMetaData = {
    /** The mime type of this asset or the data behind the asset's uri. */
    mimeType?: string;
    /** The type id of the design block that should be created from this asset. */
    blockType?: string;
    fillType?: string;
    shapeType?: string;
    kind?: string;
    uri?: string;
    thumbUri?: string;
    previewUri?: string;
    sourceSet?: Source[];
    filename?: string;
    vectorPath?: string;
    width?: number;
    height?: number;
    duration?: string;
    effectType?: EffectType;
    blurType?: BlurType;
} & Record<string, unknown>;

/**
 * Asset number property definition
 * @public
 */
export declare interface AssetNumberProperty {
    property: string;
    type: 'Int' | 'Float' | 'Double';
    value: number;
    defaultValue: number;
    min: number;
    max: number;
    step: number;
}

/**
 * Asset payload
 * @public
 */
export declare interface AssetPayload {
    color?: AssetColor;
    sourceSet?: Source[];
    typeface?: Typeface;
    properties?: AssetProperty[];
}

/**
 * Asset property for payload
 * @public
 */
export declare type AssetProperty = AssetBooleanProperty | AssetColorProperty | AssetEnumProperty | AssetNumberProperty | AssetStringProperty;

/**
 * Defines a request for querying assets
 * @public
 */
export declare interface AssetQueryData {
    /** A query string used for (fuzzy) searching of labels and tags */
    query?: string;
    /** The current page queried for paginated views. */
    page: number;
    /**
     * Tags are searched with the query parameter, but this search is fuzzy.
     * If one needs to get assets with exactly the tag (from a tag cloud or filter)
     * this query parameter should be used.
     */
    tags?: string | string[];
    /** Query only these groups */
    groups?: AssetGroups;
    /** Filter out assets with this groups */
    excludeGroups?: AssetGroups;
    /** Choose the locale of the labels and tags for localized search and filtering */
    locale?: Locale;
    /**
     * The number of results queried. How many assets shall be returned regardless
     * of the total number of assets available.
     *
     * Together with `page` this can be used for pagination.
     */
    perPage: number;
    /**
     * The order to sort by if the asset source supports sorting.
     * If set to None, the order is the same as the assets were added to the source.
     */
    sortingOrder?: SortingOrder;
    /**
     * The key that identifies the meta data value to sort by or 'id' to sort by the asset ID.
     * If empty, the assets are sorted by the index.
     */
    sortKey?: string;
    /**
     * Sort assets that are marked as active first.
     */
    sortActiveFirst?: boolean;
}

/**
 * Single asset result of a query from the engine.
 * @public
 */
export declare interface AssetResult extends Asset {
    /** The locale of the label and tags */
    locale?: Locale;
    /** The label of the result. Used for description and tooltips. */
    label?: string;
    /** The tags of this asset. Used for filtering and free-text searching. */
    tags?: string[];
    /** If the asset is marked as active, i.e., used in a currently selected element. */
    active?: boolean;
    /** Credits for the artist of the asset */
    credits?: {
        name: string;
        url?: string;
    };
    /** License for this asset. Overwrites the source license if present */
    license?: {
        name: string;
        url?: string;
    };
    /** UTM parameters for the links inside the credits */
    utm?: {
        source?: string;
        medium?: string;
    };
}

/** @public */
declare interface AssetResultCredits {
    name: string;
    url: string;
}

/** @public */
declare interface AssetResultLicense {
    name: string;
    url: string;
}

/**
 * Asset Color payload RGB representation
 * @public
 */
export declare interface AssetRGBColor {
    colorSpace: 'sRGB';
    r: number;
    g: number;
    b: number;
}

/**
 * A source of assets
 * @public
 */
export declare interface AssetSource {
    /** The unique id of the API */
    id: string;
    /** Find all asset for the given type and the provided query data.  */
    findAssets(queryData: AssetQueryData): Promise<AssetsQueryResult | undefined>;
    /** Return every available group */
    getGroups?: () => Promise<string[]>;
    /** Credits for the source/api */
    credits?: {
        name: string;
        url?: string;
    };
    /** General license for all asset from this source */
    license?: {
        name: string;
        url?: string;
    };
    /**
     * Can the source add and remove assets dynamically? If `false`
     * methods like `addAsset` and `removeAsset` will throw an
     * error.
     *
     * @deprecated Will be removed in v1.11. Use `canAdd` and `canRemove` in the asset library configuration
     */
    canManageAssets?: boolean;
    /**
     * Apply the given asset result to the active scene.
     * You can override this with custom behavior.
     * @returns the id of a new block if one was created from the asset.
     */
    applyAsset?: (asset: CompleteAssetResult) => Promise<DesignBlockId | undefined>;
    /**
     * Apply the given asset result to the given block.
     * You can override this with custom behavior.
     */
    applyAssetToBlock?: (asset: CompleteAssetResult, block: DesignBlockId) => Promise<void>;
    /**
     * Adds the given asset to this source. Throws an error if the asset source
     * does not support adding assets.
     */
    addAsset?(asset: AssetDefinition): void;
    /**
     * Removes the given asset from this source.
     */
    removeAsset?(assetId: string): void;
    /**
     * Generates a list of supported mime types for this source.
     *
     * @returns a list of the mime types should be supported by this source
     */
    getSupportedMimeTypes?(): string[] | undefined;
}

/**
 * Asset Color payload SpotColor representation
 * @public
 */
export declare interface AssetSpotColor {
    colorSpace: 'SpotColor';
    name: string;
    externalReference: string;
    representation: AssetRGBColor | AssetCMYKColor;
}

/**
 * Return type of a `findAssets` query.
 * @public
 */
export declare interface AssetsQueryResult<T extends AssetResult = AssetResult> {
    /** The assets in the requested page */
    assets: T[];
    /** The current, requested page */
    currentPage: number;
    /** The next page to query if it exists */
    nextPage?: number;
    /** How many assets are there in total for the current query regardless of the page */
    total: number;
}

/**
 * Asset string property definition
 * @public
 */
export declare interface AssetStringProperty {
    property: string;
    type: 'String';
    value: string;
    defaultValue: string;
}

/**
 * @public
 */
export declare type AudioExportOptions = {
    /**
     * The time offset in seconds relative to the target block.
     *
     * @defaultValue 0
     */
    timeOffset?: number;
    /**
     * The duration in seconds of the final audio.
     *
     * @defaultValue The duration of the block.
     */
    duration?: number;
    /**
     * The sample rate of the exported audio.
     *
     * @defaultValue 48000
     */
    sampleRate?: number;
    /**
     * The number of channels of the exported audio.
     *
     * @defaultValue 2
     */
    numberOfChannels?: number;
};

/**
 * @public
 */
export declare type BlendMode = 'PassThrough' | 'Normal' | 'Darken' | 'Multiply' | 'ColorBurn' | 'Lighten' | 'Screen' | 'ColorDodge' | 'Overlay' | 'SoftLight' | 'HardLight' | 'Difference' | 'Exclusion' | 'Hue' | 'Saturation' | 'Color' | 'Luminosity';

/**
 * @public
 */
export declare class BlockAPI {
    #private;

    /**
     * Exports a design block element as a file of the given mime type.
     * Performs an internal update to resolve the final layout for the blocks.
     * @param handle - The design block element to export.
     * @param mimeType - The mime type of the output file.
     * @param options - The options for exporting the block type
     * @returns A promise that resolves with the exported image or is rejected with an error.
     */
    export(handle: DesignBlockId, mimeType?: MimeType_2, options?: ExportOptions): Promise<Blob>;
    /**
     * Exports a design block element as a file of the given mime type.
     * Performs an internal update to resolve the final layout for the blocks.
     * @param handle - The design block element to export.
     * @param mimeType - The mime type of the output file.
     * @param maskColorR - The red component of the special color mask color.
     * @param maskColorG - The green component of the special color mask color.
     * @param maskColorB - The blue component of the special color mask color.
     * @param options - The options for exporting the block type
     * @returns A promise that resolves with an array of the exported image and mask or is rejected with an error.
     */
    exportWithColorMask(handle: DesignBlockId, mimeType: MimeType_2 | undefined, maskColorR: number, maskColorG: number, maskColorB: number, options?: ExportOptions): Promise<Blob[]>;
    /**
     * Exports a design block as a video file of the given mime type.
     * Note: The export will run across multiple iterations of the update loop. In each iteration a frame is scheduled for encoding.
     * @param handle - The design block element to export. Currently, only page blocks are supported.
     * @param mimeType - The mime type of the output video file.
     * @param progressCallback - A callback which reports on the progress of the export. It informs the receiver of the current frame index, which currently gets exported and the total frame count.
     * @param options - The options for exporting the video.
     * @returns A promise that resolves with a video blob or is rejected with an error.
     */
    exportVideo(handle: DesignBlockId, mimeType: MimeType_2 | undefined, progressCallback: (numberOfRenderedFrames: number, numberOfEncodedFrames: number, totalNumberOfFrames: number) => void, options: VideoExportOptions): Promise<Blob>;
    /**
     * Exports a design block as an audio file of the given mime type.
     * @param handle - The design block element to export. Currently, only audio blocks are supported.
     * @param mimeType - The mime type of the output audio file.
     * @param progressCallback - A callback which reports on the progress of the export.
     * @param options - The options for exporting the audio.
     * @returns A promise that resolves with an audio blob or is rejected with an error.
     */
    unstable_exportAudio(handle: DesignBlockId, mimeType: MimeType_2 | undefined, progressCallback: (numberOfRenderedFrames: number, numberOfEncodedFrames: number, totalNumberOfFrames: number) => void, options: AudioExportOptions): Promise<Blob>;
    /**
     * Loads existing blocks from the given string.
     * The blocks are not attached by default and won't be visible until attached to a page or the scene.
     * The UUID of the loaded blocks is replaced with a new one.
     * @param content - A string representing the given blocks.
     * @returns A promise that resolves with a list of handles representing the found blocks or an error.
     */
    loadFromString(content: string): Promise<DesignBlockId[]>;
    /**
     * Loads existing blocks from the given URL.
     * The blocks are not attached by default and won't be visible until attached to a page or the scene.
     * The UUID of the loaded blocks is replaced with a new one.
     * @param url - The URL to load the blocks from.
     * @returns A promise that resolves with a list of handles representing the found blocks or an error.
     */
    loadFromArchiveURL(url: string): Promise<DesignBlockId[]>;
    /**
     * Saves the given blocks into a string. If given the root of a block hierarchy, e.g. a
     * page with multiple children, the entire hierarchy is saved.
     * @param blocks - The blocks to save
     * @returns A promise that resolves to a string representing the blocks or an error.
     */
    saveToString(blocks: DesignBlockId[], allowedResourceSchemes?: string[]): Promise<string>;
    /**
     * Saves the given blocks and all of their referenced assets into an archive.
     * The archive contains all assets that were accessible when this function was called.
     * Blocks in the archived scene reference assets relative from to the location of the scene
     * file. These references are resolved when loading such a scene via `loadSceneFromURL`.
     * @param blocks - The blocks to save
     * @returns A promise that resolves with a Blob on success or an error on failure.
     */
    saveToArchive(blocks: DesignBlockId[]): Promise<Blob>;
    /**
     * Create a new block, fails if type is unknown.
     * @param type - The type of the block that shall be created.
     * @returns The created blocks handle.
     */
    create(type: DesignBlockType): DesignBlockId;
    /**
     * Create a new fill, fails if type is unknown.
     * @param type - The type of the fill object that shall be created.
     * @returns The created fill's handle.
     */
    createFill(type: FillType): DesignBlockId;
    /**
     * Get the type of the given block, fails if the block is invalid.
     * @param id - The block to query.
     * @returns The blocks type.
     */
    getType(id: DesignBlockId): ObjectTypeLonghand;
    /**
     * Get the kind of the given block, fails if the block is invalid.
     * @param id - The block to query.
     * @returns The block's kind.
     */
    getKind(id: DesignBlockId): string;
    /**
     * Set the kind of the given block, fails if the block is invalid.
     * @param id - The block whose kind should be changed.
     * @param kind - The new kind.
     * @returns The block's kind.
     */
    setKind(id: DesignBlockId, kind: string): void;
    /**
     * Selects the given block and deselects all other blocks.
     * @param id - The block to be selected.
     */
    select(id: DesignBlockId): void;
    /**
     * Update the selection state of a block.
     * Fails for invalid blocks.
     * Required scope: 'editor/select'
     * @param id - The block to query.
     * @param selected - Whether or not the block should be selected.
     */
    setSelected(id: DesignBlockId, selected: boolean): void;
    /**
     * Get the selected state of a block.
     * @param id - The block to query.
     * @returns True if the block is selected, false otherwise.
     */
    isSelected(id: DesignBlockId): boolean;
    /**
     * Get all currently selected blocks.
     * @returns An array of block ids.
     */
    findAllSelected(): DesignBlockId[];
    /**
     * Subscribe to changes in the current set of selected blocks.
     * @param callback - This function is called at the end of the engine update if the selection has changed.
     * @returns A method to unsubscribe.
     */
    onSelectionChanged: (callback: () => void) => (() => void);
    /**
     * Subscribe to block click events.
     * @param callback - This function is called at the end of the engine update if a block has been clicked.
     * @returns A method to unsubscribe.
     */
    onClicked: (callback: (id: DesignBlockId) => void) => (() => void);
    /**
     * Confirms that a given set of blocks can be grouped together.
     * @param ids - An array of block ids.
     * @returns Whether the blocks can be grouped together.
     */
    isGroupable(ids: DesignBlockId[]): boolean;
    /**
     * Group blocks together.
     * @param ids - A non-empty array of block ids.
     * @returns The block id of the created group.
     */
    group(ids: DesignBlockId[]): DesignBlockId;
    /**
     * Ungroups a group.
     * @param id - The group id from a previous call to `group`.
     */
    ungroup(id: DesignBlockId): void;
    /**
     * Changes selection from selected group to a block within that group.
     * Nothing happens if `group` is not a group.
     * Required scope: 'editor/select'
     * @param id - The group id from a previous call to `group`.
     */
    enterGroup(id: DesignBlockId): void;
    /**
     * Changes selection from a group's selected block to that group.
     * Nothing happens if the `id` is not part of a group.
     * Required scope: 'editor/select'
     * @param id - A block id.
     */
    exitGroup(id: DesignBlockId): void;
    /**
     * Checks whether blocks could be combined.
     * Only graphics blocks and text blocks can be combined.
     * All blocks must have the "lifecycle/duplicate" scope enabled.
     * @param ids - An array of block ids.
     * @returns Whether the blocks can be combined.
     */
    isCombinable(ids: DesignBlockId[]): boolean;
    /**
     * Perform a boolean operation on the given blocks.
     * All blocks must be combinable. See `isCombinable`.
     * The parent, fill and  sort order of the new block is that of the prioritized block.
     * When performing a `Union`, `Intersection` or `XOR`, the operation is performed pair-wise starting with the element with the highest sort order.
     * When performing a `Difference`, the operation is performed pair-wise starting with the element with the lowest sort order.
     * Required scopes: 'lifecycle/duplicate', 'lifecycle/destroy'
     * @param ids - The blocks to combine. They will be destroyed if "lifecycle/destroy" scope is enabled.
     * @param op - The boolean operation to perform.
     * @returns The newly created block or an error.
     */
    combine(ids: DesignBlockId[], op: BooleanOperation): DesignBlockId;
    /**
     * Update a block's name.
     * @param id - The block to update.
     * @param name - The name to set.
     */
    setName(id: DesignBlockId, name: string): void;
    /**
     * Get a block's name.
     * @param id - The block to query.
     */
    getName(id: DesignBlockId): string;
    /**
     * Get a block's UUID.
     * @param id - The block to query.
     */
    getUUID(id: DesignBlockId): string;
    /**
     * Finds all blocks with the given name.
     * @param name - The name to search for.
     * @returns A list of block ids.
     */
    findByName(name: string): DesignBlockId[];
    /**
     * Finds all blocks with the given type.
     * @param type - The type to search for.
     * @returns A list of block ids.
     */
    findByType(type: ObjectType): DesignBlockId[];
    /**
     * Finds all blocks with the given kind.
     * @param kind - The kind to search for.
     * @returns A list of block ids.
     */
    findByKind(kind: string): DesignBlockId[];
    /**
     * Return all blocks currently known to the engine.
     * @returns A list of block ids.
     */
    findAll(): DesignBlockId[];
    /**
     * Return all placeholder blocks in the current scene.
     * @returns A list of block ids.
     */
    findAllPlaceholders(): DesignBlockId[];
    /**
     * Create a new shape, fails if type is unknown.
     * @param type - The type of the shape object that shall be created.
     * @returns The created shape's handle.
     */
    createShape(type: ShapeType): DesignBlockId;
    /**
     * Query if the given block has a shape property.
     * @param id - The block to query.
     * @returns true, if the block has a shape property, an error otherwise.
     * @deprecated Use supportsShape instead.
     */
    hasShape(id: DesignBlockId): boolean;
    /**
     * Query if the given block has a shape property.
     * @param id - The block to query.
     * @returns true, if the block has a shape property, an error otherwise.
     */
    supportsShape(id: DesignBlockId): boolean;
    /**
     * Returns the block containing the shape properties of the given block.
     * @param id - The block whose shape block should be returned.
     * @returns The block that currently defines the given block's shape.
     */
    getShape(id: DesignBlockId): DesignBlockId;
    /**
     * Sets the block containing the shape properties of the given block.
     * Note that the previous shape block is not destroyed automatically.
     * The new shape is disconnected from its previously attached block.
     * Required scope: 'shape/change'
     * @param id - The block whose shape should be changed.
     * @param fill - The new shape.
     */
    setShape(id: DesignBlockId, shape: DesignBlockId): void;
    /**
     * Query a block's visibility.
     * @param id - The block to query.
     * @returns True if visible, false otherwise.
     */
    isVisible(id: DesignBlockId): boolean;
    /**
     * Update a block's visibility.
     * Required scope: 'layer/visibility'
     * @param id - The block to update.
     * @param visible - Whether the block shall be visible.
     */
    setVisible(id: DesignBlockId, visible: boolean): void;
    /**
     * Query a block's clipped state. If true, the block should clip
     * its contents to its frame.
     * @param id - The block to query.
     * @returns True if clipped, false otherwise.
     */
    isClipped(id: DesignBlockId): boolean;
    /**
     * Update a block's clipped state.
     * Required scope: 'layer/clipping'
     * @param id - The block to update.
     * @param clipped - Whether the block should clips its contents to its frame.
     */
    setClipped(id: DesignBlockId, clipped: boolean): void;
    /**
     * Query a block's transform locked state. If true, the block's transform can't be changed.
     * @param id - The block to query.
     * @returns True if transform locked, false otherwise.
     */
    isTransformLocked(id: DesignBlockId): boolean;
    /**
     * Update a block's transform locked state.
     * @param id - The block to update.
     * @param locked - Whether the block's transform should be locked.
     */
    setTransformLocked(id: DesignBlockId, locked: boolean): void;
    /**
     * Query a block's x position.
     * @param id - The block to query.
     * @returns The value of the x position.
     */
    getPositionX(id: DesignBlockId): number;
    /**
     * Query a block's mode for its x position.
     * @param id - The block to query.
     * @returns The current mode for the x position: absolute, percent or undefined.
     */
    getPositionXMode(id: DesignBlockId): PositionMode;
    /**
     * Query a block's y position.
     * @param id - The block to query.
     * @returns The value of the y position.
     */
    getPositionY(id: DesignBlockId): number;
    /**
     * Query a block's mode for its y position.
     * @param id - The block to query.
     * @returns The current mode for the y position: absolute, percent or undefined.
     */
    getPositionYMode(id: DesignBlockId): PositionMode;
    /**
     * Update a block's x position.
     * The position refers to the block's local space, relative to its parent with the origin at the top left.
     * Required scope: 'layer/move'
     * @param id - The block to update.
     * @param value - The value of the x position.
     */
    setPositionX(id: DesignBlockId, value: number): void;
    /**
     * Set a block's mode for its x position.
     * Required scope: 'layer/move'
     * @param id - The block to update.
     * @param mode - The x position mode: absolute, percent or undefined.
     */
    setPositionXMode(id: DesignBlockId, mode: PositionMode): void;
    /**
     * Update a block's y position.
     * The position refers to the block's local space, relative to its parent with the origin at the top left.
     * Required scope: 'layer/move'
     * @param id - The block to update.
     * @param value - The value of the y position.
     */
    setPositionY(id: DesignBlockId, value: number): void;
    /**
     * Set a block's mode for its y position.
     * Required scope: 'layer/move'
     * @param id - The block to update.
     * @param mode - The y position mode: absolute, percent or undefined.
     */
    setPositionYMode(id: DesignBlockId, mode: PositionMode): void;
    /**
     * Update the block's always-on-top property. If true, this blocks's global sorting order is automatically
     * adjusted to be higher than all other siblings
     * without this property. If more than one block is set to be always-on-top, the child order decides which is on top.
     *
     * @param id - the block to update.
     * @param enabled - whether the block shall be always-on-top.
     */
    setAlwaysOnTop(id: DesignBlockId, enabled: boolean): void;
    /**
     * Update the block's always-on-bottom property. If true, this blocks's global sorting order is automatically
     * adjusted to be lower than all other siblings without this property. If more than one block is set to be always-on-bottom,
     * the child order decides which is on bottom.
     *
     * @param id - the block to update.
     * @param enabled - whether the block shall always be below its siblings.
     */
    setAlwaysOnBottom(id: DesignBlockId, enabled: boolean): void;
    /**
     * Query a block's always-on-top property.
     *
     * @param id - the block to query.
     * @returns true if the block is set to be always-on-top, false otherwise.
     */
    isAlwaysOnTop(id: DesignBlockId): boolean;
    /**
     * Query a block's always-on-bottom property.
     *
     * @param id - the block to query.
     * @returns true if the block is set to be always-on-bottom, false otherwise.
     */
    isAlwaysOnBottom(id: DesignBlockId): boolean;
    /**
     * Updates the sorting order of this block and all of its manually created siblings
     * so that the given block has the highest sorting order.
     * @param id - The id of the block to be given the highest sorting order among its siblings.
     */
    bringToFront(id: DesignBlockId): void;
    /**
     * Updates the sorting order of this block and all of its manually created siblings
     * so that the given block has the lowest sorting order.
     * @param id - The id of the block to be given the lowest sorting order among its siblings.
     */
    sendToBack(id: DesignBlockId): void;
    /**
     * Updates the sorting order of this block and all of its superjacent siblings
     * so that the given block has a higher sorting order than the next superjacent sibling.
     * @param id - The id of the block to be given a higher sorting than the next superjacent sibling.
     */
    bringForward(id: DesignBlockId): void;
    /**
     * Updates the sorting order of this block and all of its manually created and subjacent siblings
     * so that the given block will have a lower sorting order than the next subjacent sibling.
     * @param id - The id of the block to be given a lower sorting order than the next subjacent sibling.
     */
    sendBackward(id: DesignBlockId): void;
    /**
     * Query a block's rotation in radians.
     * @param id - The block to query.
     * @returns The block's rotation around its center in radians.
     */
    getRotation(id: DesignBlockId): number;
    /**
     * Update a block's rotation.
     * Required scope: 'layer/rotate'
     * @param id - The block to update.
     * @param radians - The new rotation in radians. Rotation is applied around the block's center.
     */
    setRotation(id: DesignBlockId, radians: number): void;
    /**
     * Query a block's horizontal flip state.
     * @param id - The block to query.
     * @returns A boolean indicating for whether the block is flipped in the queried direction
     */
    getFlipHorizontal(id: DesignBlockId): boolean;
    /**
     * Query a block's vertical flip state.
     * @param id - The block to query.
     * @returns A boolean indicating for whether the block is flipped in the queried direction
     */
    getFlipVertical(id: DesignBlockId): boolean;
    /**
     * Update a block's horizontal flip.
     * Required scope: 'layer/flip'
     * @param id - The block to update.
     * @param flip - If the flip should be enabled.
     */
    setFlipHorizontal(id: DesignBlockId, flip: boolean): void;
    /**
     * Update a block's vertical flip.
     * Required scope: 'layer/flip'
     * @param id - The block to update.
     * @param flip - If the flip should be enabled.
     */
    setFlipVertical(id: DesignBlockId, flip: boolean): void;
    /**
     * Query if the given block has a content fill mode.
     * @param id - The block to query.
     * @returns true, if the block has a content fill mode.
     * @deprecated Use supportsContentFillMode instead.
     */
    hasContentFillMode(id: DesignBlockId): boolean;
    /**
     * Query if the given block has a content fill mode.
     * @param id - The block to query.
     * @returns true, if the block has a content fill mode.
     */
    supportsContentFillMode(id: DesignBlockId): boolean;
    /**
     * Query a block's width.
     * @param id - The block to query.
     * @returns The value of the block's width.
     */
    getWidth(id: DesignBlockId): number;
    /**
     * Query a block's mode for its width.
     * @param id - The block to query.
     * @returns The current mode for the width: absolute, percent or auto.
     */
    getWidthMode(id: DesignBlockId): SizeMode;
    /**
     * Query a block's height.
     * @param id - The block to query.
     * @returns The value of the block's height.
     */
    getHeight(id: DesignBlockId): number;
    /**
     * Query a block's mode for its height.
     * @param id - The block to query.
     * @returns The current mode for the height: absolute, percent or auto.
     */
    getHeightMode(id: DesignBlockId): SizeMode;
    /**
     * Update a block's width.
     * Required scope: 'layer/resize'
     * @param id - The block to update.
     * @param value - The new width of the block.
     */
    setWidth(id: DesignBlockId, value: number): void;
    /**
     * Set a block's mode for its width.
     * Required scope: 'layer/resize'
     * @param id - The block to update.
     * @param mode - The width mode: Absolute, Percent or Auto.
     */
    setWidthMode(id: DesignBlockId, mode: SizeMode): void;
    /**
     * Update a block's height.
     * Required scope: 'layer/resize'
     * @param id - The block to update.
     * @param value - The new height of the block.
     */
    setHeight(id: DesignBlockId, value: number): void;
    /**
     * Set a block's mode for its height.
     * Required scope: 'layer/resize'
     * @param id - The block to update.
     * @param mode - The height mode: Absolute, Percent or Auto.
     */
    setHeightMode(id: DesignBlockId, mode: SizeMode): void;
    /**
     * Get a block's layout position on the x-axis. The position is only available after an
     * internal update loop which only occurs if the `features/implicitUpdatesEnabled` setting is set.
     * @param id - The block to query.
     * @returns The layout position on the x-axis.
     */
    getFrameX(id: DesignBlockId): number;
    /**
     * Get a block's layout position on the y-axis. The position is only available after an
     * internal update loop which only occurs if the `features/implicitUpdatesEnabled` setting is set.
     * @param id - The block to query.
     * @returns The layout position on the y-axis.
     */
    getFrameY(id: DesignBlockId): number;
    /**
     * Get a block's layout width. The width is only available after an
     * internal update loop which only occurs if the `features/implicitUpdatesEnabled` setting is set.
     * @param id - The block to query.
     * @returns The layout width.
     */
    getFrameWidth(id: DesignBlockId): number;
    /**
     * Get a block's layout height. The height is only available after an
     * internal update loop which only occurs if the `features/implicitUpdatesEnabled` setting is set.
     * @param id - The block to query.
     * @returns The layout height.
     */
    getFrameHeight(id: DesignBlockId): number;
    /**
     * Set a block's content fill mode.
     * Required scope: 'layer/crop'
     * @param id - The block to update.
     * @param mode - The content fill mode mode: crop, cover or contain.
     */
    setContentFillMode(id: DesignBlockId, mode: ContentFillMode): void;
    /**
     * Query a block's content fill mode.
     * @param id - The block to query.
     * @returns The current mode: crop, cover or contain.
     */
    getContentFillMode(id: DesignBlockId): ContentFillMode;
    /**
     * Duplicates a block including its children.
     * Required scope: 'lifecycle/duplicate'
     * @param id - The block to duplicate.
     * @returns The handle of the duplicate.
     */
    duplicate(id: DesignBlockId): DesignBlockId;
    /**
     * Destroys a block.
     * Required scope: 'lifecycle/destroy'
     * @param id - The block to destroy.
     */
    destroy(id: DesignBlockId): void;
    /**
     * Check if a block is valid. A block becomes invalid once it has been destroyed.
     * @param id - The block to query.
     * @returns True, if the block is valid.
     */
    isValid(id: DesignBlockId): boolean;
    /**
     * Query a block's parent.
     * @param id - The block to query.
     * @returns The parent's handle or null if the block has no parent.
     */
    getParent(id: DesignBlockId): DesignBlockId | null;
    /**
     * Get all children of the given block. Children
     * are sorted in their rendering order: Last child is rendered
     * in front of other children.
     * @param id - The block to query.
     * @returns A list of block ids.
     */
    getChildren(id: DesignBlockId): DesignBlockId[];
    /**
     * Insert a new or existing child at a certain position in the parent's children.
     * Required scope: 'editor/add'
     * @param parent - The block whose children should be updated.
     * @param child - The child to insert. Can be an existing child of `parent`.
     * @param index - The index to insert or move to.
     */
    insertChild(parent: DesignBlockId, child: DesignBlockId, index: number): void;
    /**
     * Appends a new or existing child to a block's children.
     * Required scope: 'editor/add'
     * @param parent - The block whose children should be updated.
     * @param child - The child to insert. Can be an existing child of `parent`.
     */
    appendChild(parent: DesignBlockId, child: DesignBlockId): void;
    /** Checks whether the given block references any variables. Doesn't check the block's children.
     *
     * @param id - The block to inspect.
     * @returns true if the block references variables and false otherwise.
     */
    referencesAnyVariables(id: DesignBlockId): boolean;
    /**
     * Get the x position of the block's axis-aligned bounding box in the scene's global coordinate space.
     * The scene's global coordinate space has its origin at the top left.
     * @param id - The block whose bounding box should be calculated.
     * @returns float The x coordinate of the position of the axis-aligned bounding box.
     */
    getGlobalBoundingBoxX(id: DesignBlockId): number;
    /**
     * Get the y position of the block's axis-aligned bounding box in the scene's global coordinate space.
     * The scene's global coordinate space has its origin at the top left.
     * @param id - The block whose bounding box should be calculated.
     * @returns float The y coordinate of the position of the axis-aligned bounding box.
     */
    getGlobalBoundingBoxY(id: DesignBlockId): number;
    /**
     * Get the width of the block's axis-aligned bounding box in the scene's global coordinate space.
     * The scene's global coordinate space has its origin at the top left.
     * @param id - The block whose bounding box should be calculated.
     * @returns float The width of the axis-aligned bounding box.
     */
    getGlobalBoundingBoxWidth(id: DesignBlockId): number;
    /**
     * Get the height of the block's axis-aligned bounding box in the scene's global coordinate space.
     * The scene's global coordinate space has its origin at the top left.
     * @param id - The block whose bounding box should be calculated.
     * @returns float The height of the axis-aligned bounding box.
     */
    getGlobalBoundingBoxHeight(id: DesignBlockId): number;
    /**
     * Get the position and size of the axis-aligned bounding box for the given blocks in screen space.
     * @param ids - The block to query.
     * @returns The position and size of the bounding box.
     */
    getScreenSpaceBoundingBoxXYWH(ids: DesignBlockId[]): XYWH;
    /**
     * Align multiple blocks horizontally within their bounding box or a single block to its parent.
     * Required scope: 'layer/move'
     * @param ids - A non-empty array of block ids.
     * @param alignment - How they should be aligned: left, right, or center
     */
    alignHorizontally(ids: DesignBlockId[], horizontalBlockAlignment: HorizontalBlockAlignment): void;
    /**
     * Align multiple blocks vertically within their bounding box or a single block to its parent.
     * Required scope: 'layer/move'
     * @param ids - A non-empty array of block ids.
     * @param alignment - How they should be aligned: top, bottom, or center
     */
    alignVertically(ids: DesignBlockId[], verticalBlockAlignment: VerticalBlockAlignment): void;
    /**
     * Confirms that a given set of blocks can be aligned.
     * @param ids - An array of block ids.
     * @returns Whether the blocks can be aligned.
     */
    isAlignable(ids: DesignBlockId[]): boolean;
    /**
     * Distribute multiple blocks horizontally within their bounding box so that the space between them is even.
     * Required scope: 'layer/move'
     * @param ids - A non-empty array of block ids.
     */
    distributeHorizontally(ids: DesignBlockId[]): void;
    /**
     * Distribute multiple blocks vertically within their bounding box so that the space between them is even.
     * Required scope: 'layer/move'
     * @param ids - A non-empty array of block ids.
     */
    distributeVertically(ids: DesignBlockId[]): void;
    /**
     * Confirms that a given set of blocks can be distributed.
     * @param ids - An array of block ids.
     * @returns Whether the blocks can be distributed.
     */
    isDistributable(ids: DesignBlockId[]): boolean;
    /**
     * Resize and position a block to entirely fill its parent block.
     * Required scope: 'layer/move'
     * - 'layer/resize'
     * @param id - The block that should fill its parent.
     */
    fillParent(id: DesignBlockId): void;
    /**
     * Resize all blocks to the given size. The content of the blocks is automatically adjusted
     * to fit the new dimensions.
     * Required scope: 'layer/resize'
     * @param ids - The blocks to resize.
     * @param width - The new width of the blocks.
     * @param height - The new height of the blocks.
     */
    resizeContentAware(ids: DesignBlockId[], width: number, height: number): void;
    /**
     * Scales the block and all of its children proportionally around the specified
     * relative anchor point.
     *
     * This updates the position, size and style properties (e.g. stroke width) of
     * the block and its children.
     *
     * Required scope: 'layer/resize'
     * @param id - The block that should be scaled.
     * @param scale - The scale factor to be applied to the current properties of the block.
     * @param anchorX - The relative position along the width of the block around which the
     * scaling should occur. (0 = left edge, 0.5 = center, 1 = right edge)
     * @param anchorY - The relative position along the height of the block around which the
     * scaling should occur. (0 = top edge, 0.5 = center, 1 = bottom edge)
     */
    scale(id: DesignBlockId, scale: number, anchorX?: number, anchorY?: number): void;
    /**
     * Get all available properties of a block.
     * @param id - The block whose properties should be queried.
     * @returns A list of the property names.
     */
    findAllProperties(id: DesignBlockId): string[];
    /**
     * Check if a property with a given name is readable
     * @param property - The name of the property whose type should be queried.
     * @returns Whether the property is readable or not. Will return false for unknown properties
     */
    isPropertyReadable(property: string): boolean;
    /**
     * Check if a property with a given name is writable
     * @param property - The name of the property whose type should be queried.
     * @returns Whether the property is writable or not. Will return false for unknown properties
     */
    isPropertyWritable(property: string): boolean;
    /**
     * Get the type of a property given its name.
     * @param property - The name of the property whose type should be queried.
     * @returns The property type.
     */
    getPropertyType(property: string): PropertyType;
    /**
     * Get all the possible values of an enum given an enum property.
     * @param enumProperty - The name of the property whose enum values should be queried.
     * @returns A list of the enum value names as string.
     */
    getEnumValues<T = string>(enumProperty: string): T[];
    /**
     * Set a bool property of the given design block to the given value.
     * @param id - The block whose property should be set.
     * @param property - The name of the property to set.
     * @param value - The value to set.
     */
    setBool(id: DesignBlockId, property: string, value: boolean): void;
    /**
     * Get the value of a bool property of the given design block.
     * @param id - The block whose property should be queried.
     * @param property - The name of the property to query.
     * @returns The value of the property.
     */
    getBool(id: DesignBlockId, property: string): boolean;
    /**
     * Set an int property of the given design block to the given value.
     * @param id - The block whose property should be set.
     * @param property - The name of the property to set.
     * @param value - The value to set.
     */
    setInt(id: DesignBlockId, property: string, value: number): void;
    /**
     * Get the value of an int property of the given design block.
     * @param id - The block whose property should be queried.
     * @param property - The name of the property to query.
     * @returns The value of the property.
     */
    getInt(id: DesignBlockId, property: string): number;
    /**
     * Set a float property of the given design block to the given value.
     * @param id - The block whose property should be set.
     * @param property - The name of the property to set.
     * @param value - The value to set.
     */
    setFloat(id: DesignBlockId, property: string, value: number): void;
    /**
     * Get the value of a float property of the given design block.
     * @param id - The block whose property should be queried.
     * @param property - The name of the property to query.
     * @returns The value of the property.
     */
    getFloat(id: DesignBlockId, property: string): number;
    /**
     * Set a double property of the given design block to the given value.
     * @param id - The block whose property should be set.
     * @param property - The name of the property to set.
     * @param value - The value to set.
     */
    setDouble(id: DesignBlockId, property: string, value: number): void;
    /**
     * Get the value of a double property of the given design block.
     * @param id - The block whose property should be queried.
     * @param property - The name of the property to query.
     * @returns The value of the property.
     */
    getDouble(id: DesignBlockId, property: string): number;
    /**
     * Set a string property of the given design block to the given value.
     * @param id - The block whose property should be set.
     * @param property - The name of the property to set.
     * @param value - The value to set.
     */
    setString(id: DesignBlockId, property: string, value: string): void;
    /**
     * Get the value of a string property of the given design block.
     * @param id - The block whose property should be queried.
     * @param property - The name of the property to query.
     * @returns The value of the property.
     */
    getString(id: DesignBlockId, property: string): string;
    /**
     * Set a color property of the given design block to the given value.
     * @param id - The block whose property should be set.
     * @param property - The name of the property to set.
     * @param value - The value to set.
     */
    setColor(id: DesignBlockId, property: string, value: Color): void;
    /**
     * Get the value of a color property of the given design block.
     * @param id - The block whose property should be queried.
     * @param property - The name of the property to query.
     * @returns The value of the property.
     */
    getColor(id: DesignBlockId, property: string): Color;
    /**
     * Set a color property of the given design block to the given value.
     * @param id - The block whose property should be set.
     * @param property - The name of the property to set.
     * @param r - The red color component in the range of 0 to 1.
     * @param g - The green color component in the range of 0 to 1.
     * @param b - The blue color component in the range of 0 to 1.
     * @param a - The alpha color component in the range of 0 to 1.
     * @deprecated Use setColor() instead.
     */
    setColorRGBA(id: DesignBlockId, property: string, r: number, g: number, b: number, a?: number): void;
    /**
     * Get the value of a string property of the given design block.
     * @param id - The block whose property should be queried.
     * @param property - The name of the property to query.
     * @returns A tuple of channels red, green, blue and alpha in the range of 0 to 1.
     * @deprecated Use getColor() instead.
     */
    getColorRGBA(id: DesignBlockId, property: string): RGBA;
    /**
     * Set a color property of the given design block to the given value.
     * @param id - The block whose property should be set.
     * @param property - The name of the property to set.
     * @param name - The name of the spot color.
     * @param tint - The tint factor in the range of 0 to 1.
     * @deprecated Use setColor() instead.
     */
    setColorSpot(id: DesignBlockId, property: string, name: string, tint?: number): void;
    /**
     * Get the spot color name of a color property of the given design block.
     * @param id - The block whose property should be queried.
     * @param property - The name of the property to query.
     * @returns The name of the spot color.
     * @deprecated Use getColor() instead.
     */
    getColorSpotName(id: DesignBlockId, property: string): string;
    /**
     * Get the spot color tint factor of a color property of the given design block.
     * @param id - The block whose property should be queried.
     * @param property - The name of the property to query.
     * @returns The tint factor of the spot color.
     * @deprecated Use getColor() instead.
     */
    getColorSpotTint(id: DesignBlockId, property: string): number;
    /**
     * Set a gradient color stops property of the given design block.
     * @param id - The block whose property should be set.
     * @param property - The name of the property to set.
     */
    setGradientColorStops(id: DesignBlockId, property: string, colors: GradientColorStop[]): void;
    /**
     * Get the gradient color stops property of the given design block.
     * @param id - The block whose property should be queried.
     * @param property - The name of the property to query.
     * @returns The gradient colors.
     */
    getGradientColorStops(id: DesignBlockId, property: string): GradientColorStop[];
    /**
     * Get the source set value of the given property.
     * @param id - The block that should be queried.
     * @param property - The name of the property to query.
     * @returns The block's source set.
     */
    getSourceSet(id: DesignBlockId, property: string): Source[];
    /**
     * Set the property of the given block.
     * @param id - The block whose property should be set.
     * @param property - The name of the property to set.
     * @param sourceSet - The block's new source set.
     */
    setSourceSet(id: DesignBlockId, property: string, sourceSet: Source[]): void;
    /**
     * Add a source to the `sourceSet` property of the given block.
     * If there already exists in source set an image with the same width, that existing image will be replaced.
     * @param id - The block to update.
     * @param property - The name of the property to modify.
     * @param uri - The source to add to the source set.
     */
    addImageFileURIToSourceSet(id: DesignBlockId, property: string, uri: string): Promise<void>;
    /**
     * Set an enum property of the given design block to the given value.
     * @param id - The block whose property should be set.
     * @param property - The name of the property to set.
     * @param value - The enum value as string.
     */
    setEnum<T extends string = string>(id: DesignBlockId, property: string, value: T): void;
    /**
     * Get the value of an enum property of the given design block.
     * @param id - The block whose property should be queried.
     * @param property - The name of the property to query.
     * @returns The value as string.
     */
    getEnum<T extends string = string>(id: DesignBlockId, property: string): T;
    /**
     * Query if the given block has crop properties.
     * @param id - The block to query.
     * @returns true, if the block has crop properties.
     * @deprecated Use supportsCrop() instead.
     */
    hasCrop(id: DesignBlockId): boolean;
    /**
     * Query if the given block has crop properties.
     * @param id - The block to query.
     * @returns true, if the block has crop properties.
     */
    supportsCrop(id: DesignBlockId): boolean;
    /**
     * Set the crop scale in x direction of the given design block.
     * Required scope: 'layer/crop'
     * @param id - The block whose crop should be set.
     * @param scaleX - The scale in x direction.
     */
    setCropScaleX(id: DesignBlockId, scaleX: number): void;
    /**
     * Set the crop scale in y direction of the given design block.
     * Required scope: 'layer/crop'
     * @param id - The block whose crop should be set.
     * @param scaleY - The scale in y direction.
     */
    setCropScaleY(id: DesignBlockId, scaleY: number): void;
    /**
     * Set the crop rotation of the given design block.
     * Required scope: 'layer/crop'
     * @param id - The block whose crop should be set.
     * @param rotation - The rotation in radians.
     */
    setCropRotation(id: DesignBlockId, rotation: number): void;
    /**
     * Set the crop scale ratio of the given design block.
     * This will uniformly scale the content up or down. The center of the
     * scale operation is the center of the crop frame.
     * Required scope: 'layer/crop'
     * @param id - The block whose crop should be set.
     * @param scaleRatio - The crop scale ratio.
     */
    setCropScaleRatio(id: DesignBlockId, scaleRatio: number): void;
    /**
     * Set the crop translation in x direction of the given design block.
     * Required scope: 'layer/crop'
     * @param id - The block whose crop should be set.
     * @param translationY - The translation in y direction.
     */
    setCropTranslationX(id: DesignBlockId, translationX: number): void;
    /**
     * Set the crop translation in y direction of the given design block.
     * Required scope: 'layer/crop'
     * @param id - The block whose crop should be set.
     * @param translationY - The translation in y direction.
     */
    setCropTranslationY(id: DesignBlockId, translationY: number): void;
    /**
     * Resets the manually set crop of the given design block.
     * The block's content fill mode is set to 'cover'.
     * Required scope: 'layer/crop'
     * @param id - The block whose crop should be reset.
     */
    resetCrop(id: DesignBlockId): void;
    /**
     * Get the crop scale on the x axis of the given design block.
     * @param id - The block whose scale should be queried.
     * @returns The scale on the x axis.
     */
    getCropScaleX(id: DesignBlockId): number;
    /**
     * Get the crop scale on the y axis of the given design block.
     * @param id - The block whose scale should be queried.
     * @returns The scale on the y axis.
     */
    getCropScaleY(id: DesignBlockId): number;
    /**
     * Get the crop rotation of the given design block.
     * @param id - The block whose crop rotation should be queried.
     * @returns The crop rotation.
     */
    getCropRotation(id: DesignBlockId): number;
    /**
     * Get the crop scale ratio of the given design block.
     * @param id - The block whose crop scale ratio should be queried.
     * @returns The crop scale ratio.
     */
    getCropScaleRatio(id: DesignBlockId): number;
    /**
     * Get the crop translation on the x axis of the given design block.
     * @param id - The block whose translation should be queried.
     * @returns The translation on the x axis.
     */
    getCropTranslationX(id: DesignBlockId): number;
    /**
     * Get the crop translation on the y axis of the given design block.
     * @param id - The block whose translation should be queried.
     * @returns The translation on the y axis.
     */
    getCropTranslationY(id: DesignBlockId): number;
    /**
     * Adjust the crop position/scale to at least fill the crop frame.
     * @param id - The block whose crop scale ratio should be queried.
     * @param minScaleRatio - The minimal crop scale ratio to go down to.
     */
    adjustCropToFillFrame(id: DesignBlockId, minScaleRatio: number): number;
    /**
     * Adjusts the crop in order to flip the content along its own horizontal axis.
     * @param block - The block whose crop should be updated.
     */
    flipCropHorizontal(id: DesignBlockId): void;
    /**
     * Adjusts the crop in order to flip the content along its own vertical axis.
     * @param block - The block whose crop should be updated.
     */
    flipCropVertical(id: DesignBlockId): void;
    /**
     * Query if the given block has an opacity.
     * @param id - The block to query.
     * @returns true, if the block has an opacity.
     * @deprecated Use supportsOpacity() instead.
     */
    hasOpacity(id: DesignBlockId): boolean;
    /**
     * Query if the given block has an opacity.
     * @param id - The block to query.
     * @returns true, if the block has an opacity.
     */
    supportsOpacity(id: DesignBlockId): boolean;
    /**
     * Set the opacity of the given design block.
     * Required scope: 'layer/opacity'
     * @param id - The block whose opacity should be set.
     * @param opacity - The opacity to be set. The valid range is 0 to 1.
     */
    setOpacity(id: DesignBlockId, opacity: number): void;
    /**
     * Get the opacity of the given design block.
     * @param id - The block whose opacity should be queried.
     * @returns The opacity.
     */
    getOpacity(id: DesignBlockId): number;
    /**
     * Query if the given block has a blend mode.
     * @param id - The block to query.
     * @returns true, if the block has a blend mode.
     * @deprecated Use supportsBlendMode() instead.
     */
    hasBlendMode(id: DesignBlockId): boolean;
    /**
     * Query if the given block has a blend mode.
     * @param id - The block to query.
     * @returns true, if the block has a blend mode.
     */
    supportsBlendMode(id: DesignBlockId): boolean;
    /**
     * Set the blend mode of the given design block.
     * Required scope: 'layer/blendMode'
     * @param id - The block whose blend mode should be set.
     * @param blendMode - The blend mode to be set.
     * @returns
     */
    setBlendMode(id: DesignBlockId, blendMode: BlendMode): void;
    /**
     * Get the blend mode of the given design block.
     * @param id - The block whose blend mode should be queried.
     * @returns The blend mode.
     */
    getBlendMode(id: DesignBlockId): BlendMode;
    /**
     * Query if the given block has fill color properties.
     * @param id - The block to query.
     * @returns true, if the block has fill color properties.
     * @deprecated Query the fills type using getFill() and getType() instead.
     */
    hasFillColor(id: DesignBlockId): boolean;
    /**
     * Query if the given block is included on the exported result.
     * @param id - The block to query.
     * @returns true, if the block is included on the exported result, false otherwise
     */
    isIncludedInExport(id: DesignBlockId): boolean;
    /**
     * Set if you want the given design block to be included in exported result.
     * @param id - The block whose exportable state should be set.
     * @param enabled - If true, the block will be included on the exported result.
     */
    setIncludedInExport(id: DesignBlockId, enabled: boolean): void;
    /**
     * Set the fill color of the given design block.
     * @param id - The block whose fill color should be set.
     * @param color - The fill color to be set, a tuple of
     * @param r - The red color component in the range of 0 to 1.
     * @param g - The green color component in the range of 0 to 1.
     * @param b - The blue color component in the range of 0 to 1.
     * @param a - The alpha color component in the range of 0 to 1.
     * @deprecated Use setFillSolidColor() instead.
     */
    setFillColorRGBA(id: DesignBlockId, r: number, g: number, b: number, a?: number): void;
    /**
     * Get the fill color of the given design block.
     * @param id - The block whose fill color should be queried.
     * @returns The fill color.
     * @deprecated Use getFillSolidColor() instead.
     */
    getFillColorRGBA(id: DesignBlockId): RGBA;
    /**
     * Enable or disable the fill of the given design block.
     * @param id - The block whose fill should be enabled or disabled.
     * @param enabled - If true, the fill will be enabled.
     * @deprecated Use setFillEnabled() instead.
     */
    setFillColorEnabled(id: DesignBlockId, enabled: boolean): void;
    /**
     * Query if the fill of the given design block is enabled.
     * @param id - The block whose fill state should be queried.
     * @returns True, if fill is enabled.
     * @deprecated Use isFillEnabled() instead."
     */
    isFillColorEnabled(id: DesignBlockId): boolean;
    /**
     * Create a new effect block, fails if type is unknown or not a valid effect block type.
     * @param type - The type id of the effect.
     * @returns The created effects handle.
     */
    createEffect(type: EffectType): DesignBlockId;
    /**
     * Queries whether the block supports effects.
     * @param id - The block to query.
     * @returns True, if the block can render effects, false otherwise.
     * @deprecated Use supportsEffects instead.
     */
    hasEffects(id: DesignBlockId): boolean;
    /**
     * Queries whether the block supports effects.
     * @param id - The block to query.
     * @returns True, if the block can render effects, false otherwise.
     */
    supportsEffects(id: DesignBlockId): boolean;
    /**
     * Get a list of all effects attached to this block
     * @param id - The block to query.
     * @returns A list of effects or an error, if the block doesn't support effects.
     */
    getEffects(id: DesignBlockId): DesignBlockId[];
    /**
     * Inserts an effect at the given index into the list of effects of the given block.
     * The same effect can appear multiple times in the list and won't be removed if appended again.
     * Required scope: 'appearance/effect'
     * @param id - The block to update.
     * @param effectId - The effect to insert
     * @param index - The index at which the effect shall be inserted.
     */
    insertEffect(id: DesignBlockId, effectId: DesignBlockId, index: number): void;
    /**
     * Inserts an effect at the end of the list of effects
     * The same effect can appear multiple times in the list and won't be removed if appended again.
     * Required scope: 'appearance/effect'
     * @param id - The block to append the effect to.
     * @param effectId - The effect to append.
     */
    appendEffect(id: DesignBlockId, effectId: DesignBlockId): void;
    /**
     * Removes the effect at the given index.
     * Required scope: 'appearance/effect'
     * @param id - The block to remove the effect from.
     * @param index - The index where the effect is stored.
     */
    removeEffect(id: DesignBlockId, index: number): void;
    /**
     * Checks whether an 'effect' block may be enabled and disabled.
     * @param effectId - The 'effect' block to query.
     * @returns True, if the block supports enabling and disabling, false otherwise.
     * @deprecated Calls to this function can be removed. All effects can be enabled and disabled.
     */
    hasEffectEnabled(effectId: DesignBlockId): boolean;
    /**
     * Sets the enabled state of an 'effect' block.
     * @param effectId - The 'effect' block to update.
     * @param enabled - The new state.
     */
    setEffectEnabled(effectId: DesignBlockId, enabled: boolean): void;
    /**
     * Queries whether an 'effect' block is enabled and therefore applies its effect.
     * @param effectId - The 'effect' block to query.
     * @returns True, if the effect is enabled. False otherwise.
     */
    isEffectEnabled(effectId: DesignBlockId): boolean;
    /**
     * Create a new blur, fails if type is unknown or not a valid blur type.
     * @param type - The type id of the block.
     * @returns The handle of the newly created blur.
     */
    createBlur(type: BlurType): DesignBlockId;
    /**
     * Checks whether the block supports blur.
     * @param id - The block to query.
     * @returns True, if the block supports blur.
     * @deprecated Use supportsBlur instead.
     */
    hasBlur(id: DesignBlockId): boolean;
    /**
     * Checks whether the block supports blur.
     * @param id - The block to query.
     * @returns True, if the block supports blur.
     */
    supportsBlur(id: DesignBlockId): boolean;
    /**
     * Connects `block`'s blur to the given `blur` block.
     * Required scope: 'appearance/blur'
     * @param id - The block to update.
     * @param blurId - A 'blur' block.
     */
    setBlur(id: DesignBlockId, blurId: DesignBlockId): void;
    /**
     * Get the 'blur' block of the given design block.
     * @param id - The block to query.
     * @returns The 'blur' block.
     */
    getBlur(id: DesignBlockId): DesignBlockId;
    /**
     * Enable or disable the blur of the given design block.
     * @param id - The block to update.
     * @param enabled - The new enabled value.
     */
    setBlurEnabled(id: DesignBlockId, enabled: boolean): void;
    /**
     * Query if blur is enabled for the given block.
     * @param id - The block to query.
     * @returns True, if the blur is enabled. False otherwise.
     */
    isBlurEnabled(id: DesignBlockId): boolean;
    /**
     * Query if the given block has background color properties.
     * @param id - The block to query.
     * @returns true, if the block has background color properties.
     * @deprecated Use supportsBackgroundColor() instead.
     */
    hasBackgroundColor(id: DesignBlockId): boolean;
    /**
     * Query if the given block has background color properties.
     * @param id - The block to query.
     * @returns true, if the block has background color properties.
     */
    supportsBackgroundColor(id: DesignBlockId): boolean;
    /**
     * Set the background color of the given design block.
     * Required scope: 'fill/change'
     * @param id - The block whose background color should be set.
     * @param color - The background color to be set, a tuple of
     * @param r - The red color component in the range of 0 to 1.
     * @param g - The green color component in the range of 0 to 1.
     * @param b - The blue color component in the range of 0 to 1.
     * @param a - The alpha color component in the range of 0 to 1.
     * @deprecated Use `Use setColor() with the key path 'backgroundColor/color' instead.`.
     */
    setBackgroundColorRGBA(id: DesignBlockId, r: number, g: number, b: number, a?: number): void;
    /**
     * Get the background color of the given design block.
     * @param id - The block whose background color should be queried.
     * @returns The background color.
     * @deprecated Use `Use getColor() with the key path 'backgroundColor/color' instead.`.
     */
    getBackgroundColorRGBA(id: DesignBlockId): RGBA;
    /**
     * Enable or disable the background of the given design block.
     * Required scope: 'fill/change'
     * @param id - The block whose background should be enabled or disabled.
     * @param enabled - If true, the background will be enabled.
     */
    setBackgroundColorEnabled(id: DesignBlockId, enabled: boolean): void;
    /**
     * Query if the background of the given design block is enabled.
     * @param id - The block whose background state should be queried.
     * @returns True, if background is enabled.
     */
    isBackgroundColorEnabled(id: DesignBlockId): boolean;
    /**
     * Query if the given block has a stroke property.
     * @param id - The block to query.
     * @returns True if the block has a stroke property.
     * @deprecated Use supportsStroke() instead.
     */
    hasStroke(id: DesignBlockId): boolean;
    /**
     * Query if the given block has a stroke property.
     * @param id - The block to query.
     * @returns True if the block has a stroke property.
     */
    supportsStroke(id: DesignBlockId): boolean;
    /**
     * Enable or disable the stroke of the given design block.
     * Required scope: 'stroke/change'
     * @param id - The block whose stroke should be enabled or disabled.
     * @param enabled - If true, the stroke will be enabled.
     */
    setStrokeEnabled(id: DesignBlockId, enabled: boolean): void;
    /**
     * Query if the stroke of the given design block is enabled.
     * @param id - The block whose stroke state should be queried.
     * @returns True if the block's stroke is enabled.
     */
    isStrokeEnabled(id: DesignBlockId): boolean;
    /**
     * Set the stroke color of the given design block.
     * Required scope: 'stroke/change'
     * @param id - The block whose stroke color should be set.
     * @param r - The red color component in the range of 0 to 1.
     * @param g - The green color component in the range of 0 to 1.
     * @param b - The blue color component in the range of 0 to 1.
     * @param a - The alpha color component in the range of 0 to 1.
     * @deprecated Use setStrokeColor() instead.
     */
    setStrokeColorRGBA(id: DesignBlockId, r: number, g: number, b: number, a?: number): void;
    /**
     * Set the stroke color of the given design block.
     * Required scope: 'stroke/change'
     * @param id - The block whose stroke color should be set.
     * @param color - The color to set.
     */
    setStrokeColor(id: DesignBlockId, color: Color): void;
    /**
     * Get the stroke color of the given design block.
     * @param id - The block whose stroke color should be queried.
     * @returns The stroke color.
     * @deprecated Use getStrokeColor() instead.
     */
    getStrokeColorRGBA(id: DesignBlockId): RGBA;
    /**
     * Get the stroke color of the given design block.
     * @param id - The block whose stroke color should be queried.
     * @returns The stroke color.
     */
    getStrokeColor(id: DesignBlockId): Color;
    /**
     * Set the stroke width of the given design block.
     * Required scope: 'stroke/change'
     * @param id - The block whose stroke width should be set.
     * @param width - The stroke width to be set.
     */
    setStrokeWidth(id: DesignBlockId, width: number): void;
    /**
     * Get the stroke width of the given design block.
     * @param id - The block whose stroke width should be queried.
     * @returns The stroke's width.
     */
    getStrokeWidth(id: DesignBlockId): number;
    /**
     * Set the stroke style of the given design block.
     * Required scope: 'stroke/change'
     * @param id - The block whose stroke style should be set.
     * @param style - The stroke style to be set.
     */
    setStrokeStyle(id: DesignBlockId, style: StrokeStyle): void;
    /**
     * Get the stroke style of the given design block.
     * @param id - The block whose stroke style should be queried.
     * @returns The stroke's style.
     */
    getStrokeStyle(id: DesignBlockId): StrokeStyle;
    /**
     * Set the stroke position of the given design block.
     * Required scope: 'stroke/change'
     * @param id - The block whose stroke position should be set.
     * @param position - The stroke position to be set.
     */
    setStrokePosition(id: DesignBlockId, position: StrokePosition): void;
    /**
     * Get the stroke position of the given design block.
     * @param id - The block whose stroke position should be queried.
     * @returns The stroke position.
     */
    getStrokePosition(id: DesignBlockId): StrokePosition;
    /**
     * Set the stroke corner geometry of the given design block.
     * Required scope: 'stroke/change'
     * @param id - The block whose stroke join geometry should be set.
     * @param cornerGeometry - The stroke join geometry to be set.
     */
    setStrokeCornerGeometry(id: DesignBlockId, cornerGeometry: StrokeCornerGeometry): void;
    /**
     * Get the stroke corner geometry of the given design block.
     * @param id - The block whose stroke join geometry should be queried.
     * @returns The stroke join geometry.
     */
    getStrokeCornerGeometry(id: DesignBlockId): StrokeCornerGeometry;
    /**
     * Query if the given block has a drop shadow property.
     * @param id - The block to query.
     * @returns True if the block has a drop shadow property.
     * @deprecated Use supportsDropShadow() instead.
     */
    hasDropShadow(id: DesignBlockId): boolean;
    /**
     * Query if the given block has a drop shadow property.
     * @param id - The block to query.
     * @returns True if the block has a drop shadow property.
     */
    supportsDropShadow(id: DesignBlockId): boolean;
    /**
     * Enable or disable the drop shadow of the given design block.
     * Required scope: 'appearance/shadow'
     * @param id - The block whose drop shadow should be enabled or disabled.
     * @param enabled - If true, the drop shadow will be enabled.
     */
    setDropShadowEnabled(id: DesignBlockId, enabled: boolean): void;
    /**
     * Query if the drop shadow of the given design block is enabled.
     * @param id - The block whose drop shadow state should be queried.
     * @returns True if the block's drop shadow is enabled.
     */
    isDropShadowEnabled(id: DesignBlockId): boolean;
    /**
     * Set the drop shadow color of the given design block.
     * Required scope: 'appearance/shadow'
     * @param id - The block whose drop shadow color should be set.
     * @param r - The red color component in the range of 0 to 1.
     * @param g - The green color component in the range of 0 to 1.
     * @param b - The blue color component in the range of 0 to 1.
     * @param a - The alpha color component in the range of 0 to 1.
     * @deprecated Use setDropShadowColor() instead.
     */
    setDropShadowColorRGBA(id: DesignBlockId, r: number, g: number, b: number, a?: number): void;
    /**
     * Set the drop shadow color of the given design block.
     * Required scope: 'appearance/shadow'
     * @param id - The block whose drop shadow color should be set.
     * @param color - The color to set.
     */
    setDropShadowColor(id: DesignBlockId, color: Color): void;
    /**
     * Get the  drop shadow color of the given design block.
     * @param id - The block whose drop shadow color should be queried.
     * @returns The drop shadow color.
     * @deprecated Use getDropShadowColor instead.
     */
    getDropShadowColorRGBA(id: DesignBlockId): RGBA;
    /**
     * Get the  drop shadow color of the given design block.
     * @param id - The block whose drop shadow color should be queried.
     * @returns The drop shadow color.
     */
    getDropShadowColor(id: DesignBlockId): Color;
    /**
     * Set the drop shadow's X offset of the given design block.
     * Required scope: 'appearance/shadow'
     * @param id - The block whose drop shadow's X offset should be set.
     * @param offsetX - The X offset to be set.
     */
    setDropShadowOffsetX(id: DesignBlockId, offsetX: number): void;
    /**
     * Get the drop shadow's X offset of the given design block.
     * @param id - The block whose drop shadow's X offset should be queried.
     * @returns The offset.
     */
    getDropShadowOffsetX(id: DesignBlockId): number;
    /**
     * Set the drop shadow's Y offset of the given design block.
     * Required scope: 'appearance/shadow'
     * @param id - The block whose drop shadow's Y offset should be set.
     * @param offsetY - The X offset to be set.
     */
    setDropShadowOffsetY(id: DesignBlockId, offsetY: number): void;
    /**
     * Get the drop shadow's Y offset of the given design block.
     * @param id - The block whose drop shadow's Y offset should be queried.
     * @returns The offset.
     */
    getDropShadowOffsetY(id: DesignBlockId): number;
    /**
     * Set the drop shadow's blur radius on the X axis of the given design block.
     * Required scope: 'appearance/shadow'
     * @param id - The block whose drop shadow's blur radius should be set.
     * @param blurRadiusX - The blur radius to be set.
     */
    setDropShadowBlurRadiusX(id: DesignBlockId, blurRadiusX: number): void;
    /**
     * Get the drop shadow's blur radius on the X axis of the given design block.
     * @param id - The block whose drop shadow's blur radius should be queried.
     * @returns The blur radius.
     */
    getDropShadowBlurRadiusX(id: DesignBlockId): number;
    /**
     * Set the drop shadow's blur radius on the Y axis of the given design block.
     * Required scope: 'appearance/shadow'
     * @param id - The block whose drop shadow's blur radius should be set.
     * @param blurRadiusY - The blur radius to be set.
     */
    setDropShadowBlurRadiusY(id: DesignBlockId, blurRadiusY: number): void;
    /**
     * Get the drop shadow's blur radius on the Y axis of the given design block.
     * @param id - The block whose drop shadow's blur radius should be queried.
     * @returns The blur radius.
     */
    getDropShadowBlurRadiusY(id: DesignBlockId): number;
    /**
     * Set the drop shadow's clipping of the given design block. (Only applies to shapes.)
     * @param id - The block whose drop shadow's clip should be set.
     * @param clip - The drop shadow's clip to be set.
     */
    setDropShadowClip(id: DesignBlockId, clip: boolean): void;
    /**
     * Get the drop shadow's clipping of the given design block.
     * @param id - The block whose drop shadow's clipping should be queried.
     * @returns The drop shadow's clipping.
     */
    getDropShadowClip(id: DesignBlockId): boolean;
    /**
     * Creates a cutout whose path will be the contour of the given blocks.
     * The cutout path for each element is derived from one two ways:
     *   - Blocks that have already have a vector path (shapes, SVG-based text or stickers).
     *   - Blocks that don't have a vector path are vectorized and then, optionally, simplified to eliminate jaggedness
     *   (images).
     * @param blocks - The blocks whose shape will serve as the basis for the cutout's path.
     * @param vectorizeDistanceThreshold - The maximum number of pixels by which the cutout's path can deviate from the
     * original contour.
     * @param simplifyDistanceThreshold - The maximum number of pixels by which the simplified cutout path can deviate from
     * the cutout contour. If 0, no simplification step is performed.
     * @returns The newly created block or an error.
     */
    createCutoutFromBlocks(ids: DesignBlockId[], vectorizeDistanceThreshold?: number, simplifyDistanceThreshold?: number): DesignBlockId;
    /**
     * Create a Cutout block.
     * @param path - An SVG string describing a path.
     * @returns The newly created block or an error.
     */
    createCutoutFromPath(path: string): DesignBlockId;
    /** Perform a boolean operation on the given Cutout blocks.
     * The cutout offset of the new block is 0.
     * The cutout type of the new block is that of the first block.
     * When performing a `Difference` operation, the first block is the block subtracted from.
     * @param blocks - The blocks with which to perform to the operation.
     * @param op - The boolean operation to perform.
     * @returns The newly created block or an error.
     */
    createCutoutFromOperation(ids: DesignBlockId[], op: CutoutOperation): DesignBlockId;
    /**
     * Inserts the given text into the selected range of the text block.
     * Required scope: 'text/edit'
     * @param block - The text block into which to insert the given text.
     * @param text - The text which should replace the selected range in the block.
     * @param from - The start index of the UTF-16 range that should be replaced.
     * If the value is negative, this will fall back to the start of the entire text range.
     * @param to - The UTF-16 index after the last grapheme that should be replaced by the inserted text.
     *   If `from` and `to` are negative, a this will fall back to the end of the entire text range, so the entire text will be replaced.
     *   If `to` is negative but `from` is greater than or equal to 0, the text will be inserted at the index defined by `from`.
     */
    replaceText(id: DesignBlockId, text: string, from?: number, to?: number): void;
    /**
     * Removes selected range of text of the given text block.
     * Required scope: 'text/edit'
     * @param block - The text block from which the selected text should be removed.
     * @param from - The start index of the UTF-16 range that should be removed.
     * If the value is negative, this will fall back to the start of the entire text range.
     * @param to - The UTF-16 index after the last grapheme that should be removed.
     * If the value is negative, this will fall back to the end of the entire text range.
     */
    removeText(id: DesignBlockId, from?: number, to?: number): void;
    /**
     * Changes the color of the text in the selected range to the given color.
     * Required scope: 'text/edit'
     * @param block - The text block whose color should be changed.
     * @param color - The new color of the selected text range.
     * @param from - The start index of the UTF-16 range whose color should be changed.
     *   If the value is negative and the block is currently being edited, this will fall back to the start of the current cursor index / selected grapheme range.
     *   If the value is negative and the block is not being edited, this will fall back to the start of the entire text range.
     * @param to - The UTF-16 index after the last grapheme whose color should be changed.
     *   If the value is negative and the block is currently being edited, this will fall back to the end of the current cursor index / selected grapheme range.
     *   If the value is negative and the block is not being edited, this will fall back to the end of the entire text range.
     */
    setTextColor(id: DesignBlockId, color: Color, from?: number, to?: number): void;
    /**
     * Returns the ordered unique list of colors of the text in the selected range.
     * @param block - The text block whose colors should be returned.
     * @param from - The start index of the UTF-16 range whose colors should be returned.
     *   If the value is negative and the block is currently being edited, this will fall back to the start of the current cursor index / selected grapheme range.
     *   If the value is negative and the block is not being edited, this will fall back to the start of the entire text range.
     * @param to - The UTF-16 index after the last grapheme whose colors should be returned.
     *   If the value is negative and the block is currently being edited, this will fall back to the end of the current cursor index / selected grapheme range.
     *   If the value is negative and the block is not being edited, this will fall back to the end of the entire text range.
     */
    getTextColors(id: DesignBlockId, from?: number, to?: number): Array<Color>;
    /**
     * Returns the ordered unique list of font weights of the text in the selected range.
     * @param block - The text block whose font weights should be returned.
     * @param from - The start index of the UTF-16 range whose font weights should be returned.
     *   If the value is negative and the block is currently being edited, this will fall back to the start of the current cursor index / selected grapheme range.
     *   If the value is negative and the block is not being edited, this will fall back to the start of the entire text range.
     * @param to - The UTF-16 index after the last grapheme whose font weights should be returned.
     *   If the value is negative and the block is currently being edited, this will fall back to the end of the current cursor index / selected grapheme range.
     *   If the value is negative and the block is not being edited, this will fall back to the end of the entire text range.
     */
    getTextFontWeights(id: DesignBlockId, from?: number, to?: number): FontWeight[];
    /**
     * Returns the ordered unique list of font styles of the text in the selected range.
     * @param block - The text block whose font styles should be returned.
     * @param from - The start index of the UTF-16 range whose font weights should be returned.
     *   If the value is negative and the block is currently being edited, this will fall back to the start of the current cursor index / selected grapheme range.
     *   If the value is negative and the block is not being edited, this will fall back to the start of the entire text range.
     * @param to - The UTF-16 index after the last grapheme whose font styles should be returned.
     *   If the value is negative and the block is currently being edited, this will fall back to the end of the current cursor index / selected grapheme range.
     *   If the value is negative and the block is not being edited, this will fall back to the end of the entire text range.
     */
    getTextFontStyles(id: DesignBlockId, from?: number, to?: number): FontStyle[];
    /**
     * Returns the ordered list of text cases of the text in the selected range.
     * @param block - The text block whose text cases should be returned.
     * @param from - The start index of the UTF-16 range whose text cases should be returned.
     *   If the value is negative and the block is currently being edited, this will fall back to the start of the current cursor index / selected grapheme range.
     *   If the value is negative and the block is not being edited, this will fall back to the start of the entire text range.
     * @param to - The UTF-16 index after the last grapheme whose text cases should be returned.
     *   If the value is negative and the block is currently being edited, this will fall back to the end of the current cursor index / selected grapheme range.
     *   If the value is negative and the block is not being edited, this will fall back to the end of the entire text range.
     */
    getTextCases(id: DesignBlockId, from?: number, to?: number): TextCase[];
    /**
     * Sets the given text case for the selected range of text.
     * Required scope: 'text/edit'
     * @param id - The text block whose text case should be changed.
     * @param textCase - The new text case value.
     * @param from - The start index of the UTF-16 range whose text cases should be returned.
     *   If the value is negative and the block is currently being edited, this will fall back to the start of the current cursor index / selected grapheme range.
     *   If the value is negative and the block is not being edited, this will fall back to the start of the entire text range.
     * @param to - The UTF-16 index after the last grapheme whose text cases should be returned.
     *   If the value is negative and the block is currently being edited, this will fall back to the end of the current cursor index / selected grapheme range.
     *   If the value is negative and the block is not being edited, this will fall back to the end of the entire text range.
     */
    setTextCase(id: DesignBlockId, textCase: TextCase, from?: number, to?: number): void;
    /**
     *  Returns whether the font weight of the given text block can be toggled between bold and normal.
     * If any part of the selected range is not already bold and the necessary bold font is available, then this function returns true.
     * @param id - The text block whose font weight should be toggled.
     * @param from - The start index of the UTF-16 range whose font weight should be toggled.
     *   If the value is negative and the block is currently being edited, this will fall back to the start of the current cursor index / selected grapheme range.
     *   If the value is negative and the block is not being edited, this will fall back to the start of the entire text range.
     * @param to - The UTF-16 index after the last grapheme whose font weight should be toggled.
     *   If the value is negative and the block is currently being edited, this will fall back to the end of the current cursor index / selected grapheme range.
     *   If the value is negative and the block is not being edited, this will fall back to the end of the entire text range.
     * @returns Whether the font weight of the given block can be toggled between bold and normal.
     */
    canToggleBoldFont(id: DesignBlockId, from?: number, to?: number): boolean;
    /**
     * Toggles the bold font style of the given text block.
     * If any part of the selected range is not already italic and the necessary italic font is available, then this function returns true.
     * @param id - The text block whose font style should be toggled.
     * @param from - The start index of the UTF-16 range whose font style should be toggled.
     *   If the value is negative and the block is currently being edited, this will fall back to the start of the current cursor index / selected grapheme range.
     *   If the value is negative and the block is not being edited, this will fall back to the start of the entire text range.
     * @param to - The UTF-16 index after the last grapheme whose font style should be toggled.
     *   If the value is negative and the block is currently being edited, this will fall back to the end of the current cursor index / selected grapheme range.
     *   If the value is negative and the block is not being edited, this will fall back to the end of the entire text range.
     * @returns Whether the font style of the given block can be toggled between italic and normal.
     */
    canToggleItalicFont(id: DesignBlockId, from?: number, to?: number): boolean;
    /**
     * Toggles the font weight of the given text block between bold and normal.
     * If any part of the selected range is not already bold, all of the selected range will become bold. Only if the entire range is already bold will this function toggle it all back to normal.
     * @param id - The text block whose font weight should be toggled.
     * @param from - The start index of the UTF-16 range whose font weight should be toggled.
     *   If the value is negative and the block is currently being edited, this will fall back to the start of the current cursor index / selected grapheme range.
     *   If the value is negative and the block is not being edited, this will fall back to the start of the entire text range.
     * @param to - The UTF-16 index after the last grapheme whose font weight should be toggled.
     *   If the value is negative and the block is currently being edited, this will fall back to the end of the current cursor index / selected grapheme range.
     *   If the value is negative and the block is not being edited, this will fall back to the end of the entire text range.
     */
    toggleBoldFont(id: DesignBlockId, from?: number, to?: number): void;
    /**
     * Toggles the font style of the given text block between italic and normal.
     * If any part of the selected range is not already italic, all of the selected range will become italic. Only if the entire range is already italic will this function toggle it all back to normal.
     * @param id - The text block whose font style should be toggled.
     * @param from - The start index of the UTF-16 range whose font style should be toggled.
     *  If the value is negative and the block is currently being edited, this will fall back to the start of the current cursor index / selected grapheme range.
     *  If the value is negative and the block is not being edited, this will fall back to the start of the entire text range.
     * @param to - The UTF-16 index after the last grapheme whose font style should be toggled.
     *  If the value is negative and the block is currently being edited, this will fall back to the end of the current cursor index / selected grapheme range.
     *  If the value is negative and the block is not being edited, this will fall back to the end of the entire text range.
     */
    toggleItalicFont(id: DesignBlockId, from?: number, to?: number): void;
    /**
     * Sets the given font and typeface for the text block.
     * Existing formatting is reset.
     * @param id - The text block whose font should be changed.
     * @param fontFileUri - The URI of the new font file.
     * @param typeface - The typeface of the new font.
     */
    setFont(id: DesignBlockId, fontFileUri: string, typeface: Typeface): void;
    /**
     * Sets the given typeface for the text block.
     * The current formatting, e.g., bold or italic, is retained as far as possible. Some formatting might change if the
     * new typeface does not support it, e.g. thin might change to light, bold to normal, and/or italic to non-italic.
     * @param id - The text block whose font should be changed.
     * @param fallbackFontFileUri - The URI of the fallback font file.
     * @param typeface - The new typeface.
     */
    setTypeface(id: DesignBlockId, fallbackFontFileUri: string, typeface: Typeface): void;
    /**
     * Returns the current typeface of the given text block.
     * @param id - The text block whose typeface should be queried.
     * @returns The typeface of the text block.
     * @throws An error if the block does not have a valid typeface.
     */
    getTypeface(id: DesignBlockId): Typeface;
    /**
     * Returns the UTF-16 indices of the selected range of the text block that is currently being edited.
     * If both the start and end index of the returned range have the same value, then the text cursor is positioned at that index.
     * @returns The selected UTF-16 range or \{ from: -1, to: -1 \} if no text block is currently being edited.
     */
    getTextCursorRange(): Range_2;
    /**
     * Query if the given block has fill color properties.
     * @param id - The block to query.
     * @returns true, if the block has fill color properties, an error otherwise.
     * @deprecated Use supportsFill instead.
     */
    hasFill(id: DesignBlockId): boolean;
    /**
     * Query if the given block has fill color properties.
     * @param id - The block to query.
     * @returns true, if the block has fill color properties, an error otherwise.
     */
    supportsFill(id: DesignBlockId): boolean;
    /**
     * Query if the fill of the given design block is enabled.
     * @param id - The block whose fill state should be queried.
     * @returns A result holding the fill state or an error.
     */
    isFillEnabled(id: DesignBlockId): boolean;
    /**
     * Enable or disable the fill of the given design block.
     * Required scope: 'fill/change'
     * @param id - The block whose fill should be enabled or disabled.
     * @param enabled - If true, the fill will be enabled.
     * @returns An empty result on success, an error otherwise.
     */
    setFillEnabled(id: DesignBlockId, enabled: boolean): void;
    /**
     * Returns the block containing the fill properties of the given block.
     * @param id - The block whose fill block should be returned.
     * @returns The block that currently defines the given block's fill.
     */
    getFill(id: DesignBlockId): DesignBlockId;
    /**
     * Sets the block containing the fill properties of the given block.
     * Note that the previous fill block is not destroyed automatically.
     * Required scopes: 'fill/change', 'fill/changeType'
     * @param id - The block whose fill should be changed.
     * @param fill - The new fill.
     */
    setFill(id: DesignBlockId, fill: DesignBlockId): void;
    /**
     * Set the fill color of the given design block.
     * Required scope: 'fill/change'
     * @param id - The block whose fill color should be set.
     * @param r - The red color component in the range of 0 to 1.
     * @param g - The green color component in the range of 0 to 1.
     * @param b - The blue color component in the range of 0 to 1.
     * @param a - The alpha color component in the range of 0 to 1.
     * @returns An empty result on success, an error otherwise.
     */
    setFillSolidColor(id: DesignBlockId, r: number, g: number, b: number, a?: number): void;
    /**
     * Get the fill color of the given design block.
     * @param id - The block whose fill color should be queried.
     * @returns A result holding the fill color or an error.
     */
    getFillSolidColor(id: DesignBlockId): RGBA;
    /**
     * Enable or disable the placeholder function for a block.
     * @param id - The block whose placeholder function should be enabled or disabled.
     * @param enabled - Whether the function should be enabled or disabled.
     */
    setPlaceholderEnabled(id: DesignBlockId, enabled: boolean): void;
    /**
     * Query whether the placeholder function for a block is enabled.
     * @param id - The block whose placeholder function state should be queried.
     * @returns the enabled state of the placeholder function.
     */
    isPlaceholderEnabled(id: DesignBlockId): boolean;
    /**
     * Checks whether the block supports placeholder behavior.
     * @param block - The block to query.
     * @returns True, if the block supports placeholder behavior.
     * @deprecated Use supportsPlaceholderBehavior instead.
     */
    hasPlaceholderBehavior(id: DesignBlockId): boolean;
    /**
     * Checks whether the block supports placeholder behavior.
     * @param block - The block to query.
     * @returns True, if the block supports placeholder behavior.
     */
    supportsPlaceholderBehavior(id: DesignBlockId): boolean;
    /**
     * Enable or disable the placeholder behavior for a block.
     * @param id - The block whose placeholder behavior should be enabled or disabled.
     * @param enabled - Whether the placeholder behavior should be enabled or disabled.
     */
    setPlaceholderBehaviorEnabled(id: DesignBlockId, enabled: boolean): void;
    /**
     * Query whether the placeholder behavior for a block is enabled.
     * @param id - The block whose placeholder behavior state should be queried.
     * @returns the enabled state of the placeholder behavior.
     */
    isPlaceholderBehaviorEnabled(id: DesignBlockId): boolean;
    /**
     * Checks whether the block supports placeholder controls.
     * @param block - The block to query.
     * @returns True, if the block supports placeholder controls.
     * @deprecated Use supportsPlaceholderControls instead.
     */
    hasPlaceholderControls(id: DesignBlockId): boolean;
    /**
     * Checks whether the block supports placeholder controls.
     * @param block - The block to query.
     * @returns True, if the block supports placeholder controls.
     */
    supportsPlaceholderControls(id: DesignBlockId): boolean;
    /**
     * Enable or disable the visibility of the placeholder overlay pattern for a block.
     * @param block - The block whose placeholder overlay should be enabled or disabled.
     * @param enabled - Whether the placeholder overlay should be shown or not.
     * @returns An empty result on success, an error otherwise.
     */
    setPlaceholderControlsOverlayEnabled(id: DesignBlockId, enabled: boolean): void;
    /**
     * Query whether the placeholder overlay pattern for a block is shown.
     * @param block - The block whose placeholder overlay visibility state should be queried.
     * @returns An error if the block was invalid, otherwise the visibility state of the block's placeholder overlay pattern.
     */
    isPlaceholderControlsOverlayEnabled(id: DesignBlockId): boolean;
    /** Enable or disable the visibility of the placeholder button for a block.
     * @param block - The block whose placeholder button should be shown or not.
     * @param enabled - Whether the placeholder button should be shown or not.
     * @returns An empty result on success, an error otherwise.
     */
    setPlaceholderControlsButtonEnabled(id: DesignBlockId, enabled: boolean): void;
    /** Query whether the placeholder button for a block is shown.
     * @param block - The block whose placeholder button visibility state should be queried.
     * @returns An error if the block was invalid, otherwise
     */
    isPlaceholderControlsButtonEnabled(id: DesignBlockId): boolean;
    /**
     * Set a metadata value of a block identified by a key.
     * If the key does not exist, yet, it will be added.
     * @param id - The block whose metadata will be accessed.
     * @param key - The key used to identify the desired piece of metadata.
     * @param value - The value to set.
     */
    setMetadata(id: DesignBlockId, key: string, value: string): void;
    /**
     * Get a metadata value of a block identified by a key.
     * If the key does not exist, yet, this method will fail.
     * @param id - The block whose metadata will be accessed.
     * @param key - The key used to identify the desired piece of metadata.
     * @returns the value associated with the key.
     */
    getMetadata(id: DesignBlockId, key: string): string;
    /**
     * Check if the block has metadata associated with the key.
     * @param id - The block whose metadata will be accessed.
     * @param key - The key used to identify the desired piece of metadata.
     * @returns whether the key exists.
     */
    hasMetadata(id: DesignBlockId, key: string): boolean;
    /**
     * Query all metadata keys that exist on this block.
     * @param id - The block whose metadata will be accessed.
     * @returns A list of all metadata keys on this block or an error,
     * if the block is invalid.
     */
    findAllMetadata(id: DesignBlockId): string[];
    /**
     * Remove metadata associated with the key from the given block.
     * If the key does not exist, this method will fail.
     * @param id - The block whose metadata will be accessed.
     * @param key - The key used to identify the desired piece of metadata.
     */
    removeMetadata(id: DesignBlockId, key: string): void;
    /**
     * Enable or disable a scope for a given block.
     * @param id - The block whose scope should be enabled or disabled.
     * @param key - The scope to enable or disable.
     * @param enabled - Whether the scope should be enabled or disabled.
     */
    setScopeEnabled(id: DesignBlockId, key: Scope, enabled: boolean): void;
    /**
     * Query whether a scope is enabled for a given block.
     * @param id - The block whose scope state should be queried.
     * @param key - The scope to query.
     * @returns the enabled state of the scope for the given block.
     */
    isScopeEnabled(id: DesignBlockId, key: Scope): boolean;
    /**
     * Check if a scope is allowed for a given block.
     * @param id - The block to check.
     * @param key - The scope to check.
     * @returns whether the scope is allowed for the given block.
     */
    isAllowedByScope(id: DesignBlockId, key: Scope): boolean;
    /**
     * Returns whether the block has a duration property.
     * @param id - The block to query.
     * @returns true if the block has a duration property.
     * @deprecated Use supportsDuration instead.
     */
    hasDuration(id: DesignBlockId): boolean;
    /**
     * Returns whether the block has a duration property.
     * @param id - The block to query.
     * @returns true if the block has a duration property.
     */
    supportsDuration(id: DesignBlockId): boolean;
    /**
     * Set the playback duration of the given block in seconds.
     * The duration defines for how long the block is active in the scene during playback.
     * The duration is ignored when the scene is not in "Video" mode.
     * @param id - The block whose duration should be changed.
     * @param duration - The new duration in seconds.
     */
    setDuration(id: DesignBlockId, duration: number): void;
    /**
     * Get the playback duration of the given block in seconds.
     * @param id - The block whose duration should be returned.
     * @returns The block's duration.
     */
    getDuration(id: DesignBlockId): number;
    /**
     * Returns whether the block has a time offset property.
     * @param id - The block to query.
     * @returns true, if the block has a time offset property.
     * @deprecated Use supportsTimeOffset instead.
     */
    hasTimeOffset(id: DesignBlockId): boolean;
    /**
     * Returns whether the block has a time offset property.
     * @param id - The block to query.
     * @returns true, if the block has a time offset property.
     */
    supportsTimeOffset(id: DesignBlockId): boolean;
    /**
     * Set the time offset of the given block relative to its parent.
     * The time offset controls when the block is first active in the timeline.
     * The time offset is not supported by the page block.
     * @param id - The block whose time offset should be changed.
     * @param offset - The new time offset in seconds.
     */
    setTimeOffset(id: DesignBlockId, offset: number): void;
    /**
     * Get the time offset of the given block relative to its parent.
     * @param id - The block whose time offset should be queried.
     * @returns the time offset of the block.
     */
    getTimeOffset(id: DesignBlockId): number;
    /**
     * Returns whether the block has trim properties.
     * @param id - The block to query.
     * @returns true, if the block has trim properties.
     * @deprecated Use supportsTrim instead.
     */
    hasTrim(id: DesignBlockId): boolean;
    /**
     * Returns whether the block has trim properties.
     * @param id - The block to query.
     * @returns true, if the block has trim properties.
     */
    supportsTrim(id: DesignBlockId): boolean;
    /**
     * Set the trim offset of the given block or fill.
     * Sets the time in seconds within the fill at which playback of the audio or video clip should begin.
     * This requires the video or audio clip to be loaded.
     * @param id - The block whose trim should be updated.
     * @param offset - The new trim offset.
     */
    setTrimOffset(id: DesignBlockId, offset: number): void;
    /**
     * Get the trim offset of this block.
     * * This requires the video or audio clip to be loaded.
     * @param id - The block whose trim offset should be queried.
     * @returns the trim offset in seconds.
     */
    getTrimOffset(id: DesignBlockId): number;
    /**
     * Set the trim length of the given block or fill.
     * The trim length is the duration of the audio or video clip that should be used for playback.
     * After reaching this value during playback, the trim region will loop.
     * This requires the video or audio clip to be loaded.
     * @param id - The object whose trim length should be updated.
     * @param length - The new trim length in seconds.
     */
    setTrimLength(id: DesignBlockId, length: number): void;
    /**
     * Get the trim length of the given block or fill.
     * @param id - The object whose trim length should be queried.
     * @returns the trim length of the object.
     */
    getTrimLength(id: DesignBlockId): number;
    /**
     * Returns the total duration (in seconds) of a scene in video mode.
     * The duration is defined by all blocks in the scene.
     * @param scene - The scene whose duration is being queried.
     * @returns the total scene duration.
     * @deprecated Use `getDuration` and pass a page block.
     */
    getTotalSceneDuration(scene: DesignBlockId): number;
    /**
     * Set whether the block should be playing during active playback.
     * @param id - The block that should be updated.
     * @param enabled - Whether the block should be playing its contents.
     */
    setPlaying(id: DesignBlockId, enabled: boolean): void;
    /**
     * Returns whether the block is playing during active playback.
     * @param id - The block to query.
     * @returns whether the block is playing during playback.
     */
    isPlaying(id: DesignBlockId): boolean;
    /**
     * Returns whether the block has a playback time property.
     * @param id - The block to query.
     * @returns whether the block has a playback time property.
     * @deprecated Use supportsPlaybackTime instead.
     */
    hasPlaybackTime(id: DesignBlockId): boolean;
    /**
     * Returns whether the block has a playback time property.
     * @param id - The block to query.
     * @returns whether the block has a playback time property.
     */
    supportsPlaybackTime(id: DesignBlockId): boolean;
    /**
     * Set the playback time of the given block.
     * @param id - The block whose playback time should be updated.
     * @param time - The new playback time of the block in seconds.
     */
    setPlaybackTime(id: DesignBlockId, time: number): void;
    /**
     * Get the playback time of the given block.
     * @param id - The block to query.
     * @returns the playback time of the block in seconds.
     */
    getPlaybackTime(id: DesignBlockId): number;
    /**
     * Returns whether the block should be visible on the canvas at the current playback time.
     * @param id - The block to query.
     * @returns Whether the block should be visible on the canvas at the current playback time.
     */
    isVisibleAtCurrentPlaybackTime(id: DesignBlockId): boolean;
    /**
     * Set whether the given block or fill should play
     * its contents while the rest of the scene remains paused.
     * Setting this to true for one block will automatically set
     * it to false on all other blocks.
     * @param id - The block or fill to update.
     * @param enabled - Whether the block's playback should progress as time moves on.
     */
    setSoloPlaybackEnabled(id: DesignBlockId, enabled: boolean): void;
    /**
     * Return whether the given block or fill is currently set to play
     * its contents while the rest of the scene remains paused.
     * @param id - The block or fill to query.
     * @returns Whether solo playback is enabled for this block.
     */
    isSoloPlaybackEnabled(id: DesignBlockId): boolean;
    /**
     * Returns whether the block supports a playback control.
     * @param block - The block to query.
     * @returns Whether the block has playback control.
     * @deprecated Use supportsPlaybackControl instead
     */
    hasPlaybackControl(id: DesignBlockId): boolean;
    /**
     * Returns whether the block supports a playback control.
     * @param block - The block to query.
     * @returns Whether the block has playback control.
     */
    supportsPlaybackControl(id: DesignBlockId): boolean;
    /**
     * Set whether the block should restart from the beginning again or stop.
     * @param block - The block or video fill to update.
     * @param looping - Whether the block should loop to the beginning or stop.
     */
    setLooping(id: DesignBlockId, looping: boolean): void;
    /**
     * Query whether the block is looping.
     * @param block - The block to query.
     * @returns Whether the block is looping.
     */
    isLooping(id: DesignBlockId): boolean;
    /**
     * Set whether the audio of the block is muted.
     * @param block - The block or video fill to update.
     * @param muted - Whether the audio should be muted.
     */
    setMuted(id: DesignBlockId, muted: boolean): void;
    /**
     * Query whether the block is muted.
     * @param block - The block to query.
     * @returns Whether the block is muted.
     */
    isMuted(id: DesignBlockId): boolean;
    /**
     * Set the audio volume of the given block.
     * @param block - The block or video fill to update.
     * @param volume - The desired volume with a range of [0, 1].
     */
    setVolume(id: DesignBlockId, volume: number): void;
    /**
     * Get the audio volume of the given block.
     * @param block - The block to query.
     * @returns The volume with a range of [0, 1].
     */
    getVolume(id: DesignBlockId): number;
    /**
     * Begins loading the required audio and video resource for the given video fill or audio block.
     * @param id - The video fill or audio block whose resource should be loaded.
     * @returns A Promise that resolves once the resource has finished loading.
     */
    forceLoadAVResource(id: DesignBlockId): Promise<void>;
    /**
     * Returns whether the audio and video resource for the given video fill or audio block is loaded.
     * @param id - The video fill or audio block.
     * @returns The loading state of the resource.
     */
    unstable_isAVResourceLoaded(id: DesignBlockId): boolean;
    /**
     * Get the duration in seconds of the video or audio resource that is attached to the given block.
     * @param id - The video fill or audio block.
     * @returns The video or audio file duration.
     */
    getAVResourceTotalDuration(id: DesignBlockId): number;
    /**
     * Get the video width in pixels of the video resource that is attached to the given block.
     * @param block - The video fill.
     * @returns The video width in pixels or an error.
     */
    getVideoWidth(id: DesignBlockId): number;
    /**
     * Get the video height in pixels of the video resource that is attached to the given block.
     * @param block - The video fill.
     * @returns The video height in pixels or an error.
     */
    getVideoHeight(id: DesignBlockId): number;
    /**
     * Generate a sequence of thumbnails for the given video fill or design block.
     * Note: there can only be one thumbnail generation request in progress for a given block.
     * @param id - The video fill or design block.
     * @param thumbnailHeight - The height of a thumbnail. The width will be calculated from the video aspect ratio.
     * @param timeBegin - The time in seconds relative to the time offset of the design block at which the thumbnail sequence should start.
     * @param timeEnd - The time in seconds relative to the time offset of the design block  at which the thumbnail sequence should end.
     * @param numberOfFrames - The number of frames to generate.
     * @param onFrame - Gets passed the frame index and RGBA image data.
     * @returns A method that will cancel any thumbnail generation request in progress for this block.
     */
    generateVideoThumbnailSequence(id: DesignBlockId, thumbnailHeight: number, timeBegin: number, timeEnd: number, numberOfFrames: number, onFrame: (frameIndex: number, result: ImageData | Error) => void): () => void;
    /**
     * Generate a thumbnail sequence for the given audio block or video fill.
     * A thumbnail in this case is a chunk of samples in the range of 0 to 1.
     * In case stereo data is requested, the samples are interleaved, starting with the left channel.
     * @param id - The audio block or video fill.
     * @param samplesPerChunk - The number of samples per chunk. `onChunk` is called when this many samples are ready.
     * @param timeBegin - The time in seconds at which the thumbnail sequence should start.
     * @param timeEnd - The time in seconds at which the thumbnail sequence should end.
     * @param numberOfSamples - The total number of samples to generate.
     * @param numberOfChannels - The number of channels in the output. 1 for mono, 2 for stereo.
     * @param onChunk - This gets passed an index and a chunk of samples whenever it's ready, or an error.
     */
    generateAudioThumbnailSequence(id: DesignBlockId, samplesPerChunk: number, timeBegin: number, timeEnd: number, numberOfSamples: number, numberOfChannels: number, onChunk: (chunkIndex: number, result: Float32Array | Error) => void): () => void;
    /**
     * Generate a thumbnail for the given video fill.
     * @param id - The video fill.
     * @param thumbnailHeight - The height of a thumbnail. The width will be calculated from the video aspect ratio.
     * @returns A thumbnail encoded as JPEG.
     * @deprecated Use `generateVideoThumbnailSequence` instead.
     */
    getVideoFillThumbnail(id: DesignBlockId, thumbnailHeight: number): Promise<Blob>;
    /**
     * Generate a thumbnail atlas for the given video fill.
     * @param id - The video fill.
     * @param numberOfColumns - The number of columns to generate.
     * @param numberOfRows - The number of rows to generate.
     * @param thumbnailHeight - The height of a thumbnail. The width will be calculated from the video aspect ratio.
     * @returns A thumbnail atlas of the video as JPEG.
     * @deprecated Use `generateVideoThumbnailSequence` instead.
     */
    getVideoFillThumbnailAtlas(id: DesignBlockId, numberOfColumns: number, numberOfRows: number, thumbnailHeight: number): Promise<Blob>;
    /**
     * Generate a thumbnail atlas for the given page.
     * @param id - The page.
     * @param numberOfColumns - The number of columns to generate.
     * @param numberOfRows - The number of rows to generate.
     * @param thumbnailHeight - The height of a thumbnail. The width will be calculated from the page aspect ratio.
     * @returns A thumbnail atlas of the composition as JPEG.
     * @deprecated Use `generateVideoThumbnailSequence` instead.
     */
    getPageThumbnailAtlas(id: DesignBlockId, numberOfColumns: number, numberOfRows: number, thumbnailHeight: number): Promise<Blob>;
    /**
     * Creates a new animation, fails if type is unknown.
     * @param type - The type of animation to create.
     * @returns The handle of the new animation instance.
     */
    createAnimation(type: AnimationType): DesignBlockId;
    /**
     * Returns whether the block supports animation.
     * @param block - The block to query.
     * @returns Whether the block supports animation.
     */
    supportsAnimation(id: DesignBlockId): boolean;
    /**
     * Set the "in" animation of the given block.
     * @param id - The block whose "in" animation should be set.
     * @param animation - The animation to set.
     */
    setInAnimation(id: DesignBlockId, animation: DesignBlockId): void;
    /**
     * Set the "loop" animation of the given block.
     * @param id - The block whose "loop" animation should be set.
     * @param animation - The animation to set.
     */
    setLoopAnimation(id: DesignBlockId, animation: DesignBlockId): void;
    /**
     * Set the "out" animation of the given block.
     * @param id - The block whose "out" animation should be set.
     * @param animation - The animation to set.
     */
    setOutAnimation(id: DesignBlockId, animation: DesignBlockId): void;
    /**
     * Get the "in" animation of the given block.
     * @param id - The block whose "in" animation should be queried.
     * @returns The "in" animation of the block.
     */
    getInAnimation(id: DesignBlockId): DesignBlockId;
    /**
     * Get the "loop" animation of the given block.
     * @param id - The block whose "loop" animation should be queried.
     * @returns The "loop" animation of the block.
     */
    getLoopAnimation(id: DesignBlockId): DesignBlockId;
    /**
     * Get the "out" animation of the given block.
     * @param id - The block whose "out" animation should be queried.
     * @returns The "out" animation of the block.
     */
    getOutAnimation(id: DesignBlockId): DesignBlockId;
    /**
     * Update the pixels of the given pixel stream fill block.
     * @param id - The pixel stream fill block.
     * @param buffer - Use pixel data from a canvas or a video element.
     */
    setNativePixelBuffer(id: number, buffer: HTMLCanvasElement | HTMLVideoElement): void;
    /**
     * Returns the block's state.
     * If this block is in error state or this block has a `Shape` block, `Fill` block or `Effect` block(s), that
     * is in error state, the returned state will be `Error`.
     * Else, if this block is in pending state or this block has a `Shape` block, `Fill` block or `Effect` block(s), that
     * is in pending state, the returned state will be `Pending`.
     * Else, the returned state will be `Ready`.
     * @param id - The block to query.
     * @returns The block's state.
     */
    getState(id: DesignBlockId): BlockState;
    /**
     * Set the state of a block.
     * @param id - The block whose state should be set.
     * @param state - The new state to set.
     */
    setState(id: DesignBlockId, state: BlockState): void;
    /**
     * Subscribe to changes to the state of a block.
     * Like `getState`, the state of a block is determined by the state of itself and its `Shape`, `Fill` and
     * `Effect` block(s).
     * @param blocks - A list of blocks to filter events by. If the list is empty, events for every block are sent.
     * @param callback - The event callback.
     * @returns Subscription A handle to the subscription. Use it to unsubscribe when done.
     */
    onStateChanged: (ids: DesignBlockId[], callback: (ids: DesignBlockId[]) => void) => (() => void);
    /**
     * Begins loading the resources of the given blocks and their children.
     * This function is useful for preloading resources before they are needed.
     * @param ids - The blocks whose resources should be loaded. The given blocks don't require to have resources and
     * can have children blocks (e.g. a scene block or a page block).
     * @returns A Promise that resolves once the resources have finished loading.
     */
    forceLoadResources(ids: DesignBlockId[]): Promise<void>;
}

/** @public */
export declare interface BlockEvent {
    block: DesignBlockId;
    type: 'Created' | 'Updated' | 'Destroyed';
}

/** @public Describes the state of the block which affect its rendering. */
export declare type BlockState = BlockStateError | BlockStatePending | BlockStateReady;

/** @public There's an error preventing rendering. */
export declare interface BlockStateError {
    type: 'Error';
    error: 'AudioDecoding' | 'ImageDecoding' | 'FileFetch' | 'Unknown' | 'VideoDecoding';
}

/** @public There is an ongoing operation on the block. Rendering may be affected. */
export declare interface BlockStatePending {
    type: 'Pending';
    /** Expected range is [0, 1] */
    progress: number;
}

/** @public The block is ready to be rendered. */
export declare interface BlockStateReady {
    type: 'Ready';
}

/**
 * Dispatched on the engine canvas when the text input has been blurred.
 * Call `preventDefault()` to disallow this and refocus the engine text input.
 * @public
 */
export declare interface BlurEvent extends CustomEvent<EventTarget | null> {
    readonly type: 'cesdk-blur';
    /** Contains the element that has received focus during the blur, or null */
    readonly detail: EventTarget | null;
    /** Force focus back to the engine input */
    preventDefault(): void;
}

/**
 * The block type IDs for the blur blocks. These are the IDs used to create new blurs
 * using `cesdk.engine.block.createBlur(id)`.
 * @public
 */
export declare type BlurType = BlurTypeShorthand | BlurTypeLonghand;

/**
 * The longhand block type IDs for the blur blocks. These are the IDs used to create new blurs
 * using `cesdk.engine.block.createBlur(id)`.
 * @public
 */
export declare type BlurTypeLonghand = `//ly.img.ubq/blur/${BlurTypeShorthand}`;

/**
 * The shorthand block type IDs for the blur blocks. These are the IDs used to create new blurs
 * using `cesdk.engine.block.createBlur(id)`.
 * @public
 */
export declare type BlurTypeShorthand = 'uniform' | 'linear' | 'mirrored' | 'radial';

/**
 * Names of boolean operations.
 *
 * @public
 */
export declare type BooleanOperation = 'Difference' | 'Intersection' | 'Union' | 'XOR';

/** @public */
export declare interface Buffer {
    handle: string;
    buffer: Uint8Array;
}

/**
 * An HTML Canvas or an Offscreen Canvas
 * @public
 */
export declare type Canvas = HTMLCanvasElement | OffscreenCanvas_2;

/**
 * @public
 */
export declare type CMYK = [c: number, m: number, y: number, k: number];

/**
 * All components between 0 and 1
 * @public
 */
export declare interface CMYKColor {
    /** Cyan */
    c: number;
    /** Magenta */
    m: number;
    /** Yellow */
    y: number;
    /** Black */
    k: number;
    /** The tint factor */
    tint: number;
}

/**
 * A type alias for all color types supported by the engine.
 * @public
 */
export declare type Color = RGBAColor | CMYKColor | SpotColor;

/**
 * @public
 */
export declare type ColorSpace = 'sRGB' | 'CMYK' | 'SpotColor';

/**
 * Asset results that are returned from the engine.
 *
 * They contain additional information about the context of the asset.
 * @public
 */
export declare interface CompleteAssetResult extends AssetResult {
    /**
     * Context how an asset was added or shall be used in the future.
     * This is added to all assets coming from the engine.
     */
    context: {
        sourceId: string;
    };
    /** This is optional in `AssetResult` but always present here */
    active: boolean;
}

/** @public */
export declare interface Configuration {
    baseURL: string;
    license: string;
    userId?: string;
    core: {
        baseURL: string;
    };
    logger: Logger;
    featureFlags?: {
        [flag: string]: boolean | string;
    };
    /**
     * @deprecated This config key is not used anymore and will be removed.
     */
    presets: {
        /**
         * @deprecated The configuration option `presets.typefaces` does not exist anymore.
         * Custom typefaces should be defined as asset sources using
         * the `cesdk.engine.asset.addSource` or `cesdk.engine.asset.addLocalSource` instead.
         */
        typefaces?: {
            [id: string]: TypefaceDefinition;
        };
    };
    /**
     * By default the engine tries to create a webgl2 context. If this fails it
     * falls back to trying to create a webgl1 context. If this configuration
     * option is set to true, it will no longer try to create a webgl2 context
     * and always create a webgl1 context.
     */
    forceWebGL1?: boolean;
    /**
     * Whether the engine should automatically choose an audio output device or
     * should not output audio at all.
     *
     * If not configured the fallback value is 'auto'.
     */
    audioOutput?: 'auto' | 'none';
    role?: RoleString;
}

/**
 * - Crop: Manual crop.
 * - Cover: Automatically cover the entire frame.
 * - Contain: Automatically contain content inside frame.
 *
 * @public
 */
export declare type ContentFillMode = 'Crop' | 'Cover' | 'Contain';

/**
 * A headless implementation that just initializes & exposes the Document API
 *
 * @public
 */
declare class CreativeEngine {
    #private;
    asset: AssetAPI;
    block: BlockAPI;
    editor: EditorAPI;
    event: EventAPI;
    scene: SceneAPI;
    variable: VariableAPI;
    reactor: Reactor;

    /**
     * Adds and initializes a plugin to the engine.
     */
    addPlugin(plugin: EnginePlugin): void;
    /**
     * Some browsers exhibit a bug where support for certain video codecs is
     * offered, but when attempting to decode or encode in these codecs, the
     * request will simply never return.  We detect that situation using a
     * timeout. To prevent this mechanism from triggering in situations where the
     * export simply takes long because of a slow device, you can configure the
     * timeout here.
     *
     * @param timeout - Timeout in milliseconds (default: 10 seconds)
     */
    unstable_setVideoExportInactivityTimeout(timeout: number): void;



    /**
     * Install the mousewheel event handler for the CreativeEngine on a different
     * element than the canvas.
     *
     * This can be useful if you are rendering HTML elements on top of the canvas
     * and want to scroll the canvas when the mouse is over those elements.
     *
     * @returns A function that removes the event handler from the target again
     *          and adds it back to the canvas.
     */
    setWheelEventTarget(target: HTMLElement): () => void;
    get element(): HTMLCreativeEngineCanvasElement | undefined;
    /**
     * Dispose the engine.
     */
    dispose(): void;
    /**
     * Initialize a `CreativeEngine` using the given `canvas` element and an optional config.
     * @param config - An optional configuration object.
     * @returns An engine instance.
     */
    static init<C extends Partial<Configuration>>(config?: C): Promise<CreativeEngine & (C extends {
        readonly canvas: any;
    } ? {
        readonly element: undefined;
    } : {
        readonly element: HTMLCreativeEngineCanvasElement;
    })>;
    /**
     * Convenience function that registers a set of asset sources containing our
     * default assets. These are
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
     */
    addDefaultAssetSources({ baseURL, excludeAssetSourceIds }?: {
        /** The source of the asset definitions, must be absolute. Defaults to `'https://cdn.img.ly/assets/v3'`. */
        baseURL?: string;
        /** A list of IDs, that will be ignored during load. */
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
     */
    addDemoAssetSources({ baseURL, excludeAssetSourceIds, sceneMode, withUploadAssetSources }?: {
        /** The source of the demo asset definitions, must be absolute. Defaults to `'https://cdn.img.ly/assets/demo/v2'`. */
        baseURL?: string;
        /** A list of IDs, that will be ignored during load */
        excludeAssetSourceIds?: DemoAssetSourceId[];
        /** If 'Video' video specific demo asset sources will be loaded as well (default 'Design') */
        sceneMode?: SceneMode;
        /** If 'true' asset sources for uploads are added (default false) */
        withUploadAssetSources?: boolean;
    }): Promise<void>;


}
export default CreativeEngine;

/**
 * Dispatched on the engine canvas when the text input has been blurred.
 * Call `preventDefault()` to disallow this and refocus the engine text input.
 * @public
 */
export declare interface CursorEvent extends CustomEvent<string> {
    readonly type: 'cesdk-cursor';
    /** Contains the cursor style */
    readonly detail: string;
    /** If default is prevented, the Creative Engine won't apply the cursor style to itself. */
    preventDefault(): void;
}

/**
 * @public
 */
export declare type CutoutOperation = 'Difference' | 'Intersection' | 'Union' | 'XOR';

/**
 * @public
 */
export declare type CutoutType = 'Solid' | 'Dashed';

/**
 * @public
 */
export declare type DefaultAssetSourceId = 'ly.img.sticker' | 'ly.img.vectorpath' | 'ly.img.colors.defaultPalette' | 'ly.img.filter.lut' | 'ly.img.filter.duotone' | 'ly.img.effect' | 'ly.img.blur' | 'ly.img.typeface';

/** @public */
export declare function defaultLogger(message: string, level?: LogLevel): void;

/**
 * @public
 */
export declare type DemoAssetSourceId = 'ly.img.template' | 'ly.img.image.upload' | 'ly.img.video.upload' | 'ly.img.audio.upload' | 'ly.img.image' | 'ly.img.video' | 'ly.img.video.template' | 'ly.img.audio';

/**
 * A numerical identifier for a design block
 * @public
 */
export declare type DesignBlockId = number;

/**
 * The block type IDs for the top-level design blocks. These are the IDs used to create new blocks
 * using `cesdk.engine.block.create(id)`.
 * @public
 */
export declare type DesignBlockType = DesignBlockTypeShorthand | DesignBlockTypeLonghand;

/**
 * The longhand block type IDs for the top-level design blocks. These are the IDs used to create new blocks
 * using `cesdk.engine.block.create(id)`.
 * @public
 */
export declare type DesignBlockTypeLonghand = `//ly.img.ubq/${DesignBlockTypeShorthand}`;

/**
 * The shorthand block type IDs for the top-level design blocks. These are the IDs used to create new blocks
 * using `cesdk.engine.block.create(id)`.
 * @public
 */
export declare type DesignBlockTypeShorthand = 'scene' | 'stack' | 'camera' | 'page' | 'graphic' | 'audio' | 'text' | 'group' | 'cutout' | 'track';

/**
 * The unit type in which the page values (size, distances, etc.) are defined.
 * @public
 */
export declare type DesignUnit = 'Pixel' | 'Millimeter' | 'Inch';

/** @public */
export declare type EditMode = 'Transform' | 'Crop' | 'Text' | 'Playback' | 'Trim' | (string & {});

/**
 * @public
 */
export declare class EditorAPI {
    #private;







    /**
     * Subscribe to changes to the editor state.
     * @param callback - This function is called at the end of the engine update, if the editor state has changed.
     * @returns A method to unsubscribe.
     */
    onStateChanged: (callback: () => void) => (() => void);
    /**
     * Set the edit mode of the editor.
     * An edit mode defines what type of content can currently be edited by the user.
     * Hint: the initial edit mode is "Transform".
     * @param mode - "Transform", "Crop", "Text", "Playback", "Trim" or a custom value.
     */
    setEditMode(mode: EditMode): void;
    /**
     * Get the current edit mode of the editor.
     * An edit mode defines what type of content can currently be edited by the user.
     * @returns "Transform", "Crop", "Text", "Playback", "Trim" or a custom value.
     */
    getEditMode(): EditMode;
    /**
     * If an user interaction is happening, e.g., a resize edit with a drag handle or a touch gesture.
     * @returns True if an interaction is happening.
     */
    unstable_isInteractionHappening(): boolean;
    /**
     * Get the type of cursor that should be displayed by the application.
     * @returns The cursor type.
     */
    getCursorType(): 'Arrow' | 'Move' | 'MoveNotPermitted' | 'Resize' | 'Rotate' | 'Text';
    /**
     * Get the rotation with which to render the mouse cursor.
     * @returns The angle in radians.
     */
    getCursorRotation(): number;
    /**
     * Get the current text cursor's x position in screen space.
     * @returns The text cursor's x position in screen space.
     */
    getTextCursorPositionInScreenSpaceX(): number;
    /**
     * Get the current text cursor's y position in screen space.
     * @returns The text cursor's y position in screen space.
     */
    getTextCursorPositionInScreenSpaceY(): number;
    /**
     * Create a history which consists of an undo/redo stack for editing operations.
     * There can be multiple. But only one can be active at a time.
     * @returns The handle of the created history.
     */
    createHistory(): HistoryId;
    /**
     * Destroy the given history, throws an error if the handle doesn't refer to a history.
     * @param history - The history to destroy.
     */
    destroyHistory(history: HistoryId): void;
    /**
     * Mark the given history as active, throws an error if the handle doesn't refer to a history.
     * All other histories get cleared from the active state. Undo/redo operations only apply to the active history.
     * @param history - The history to make active.
     */
    setActiveHistory(history: HistoryId): void;
    /**
     * Get the handle to the currently active history. If there's none it will be created.
     * @returns History - The handle of the active history.
     */
    getActiveHistory(): HistoryId;
    /**
     * Adds a new history state to the stack, if undoable changes were made.
     */
    addUndoStep(): void;
    /**
     * Undo one step in the history if an undo step is available.
     */
    undo(): void;
    /**
     * Redo one step in the history if a redo step is available.
     */
    redo(): void;
    /**
     * If an undo step is available.
     *
     * @returns True if an undo step is available.
     */
    canUndo(): boolean;
    /**
     * If a redo step is available.
     *
     * @returns True if a redo step is available.
     */
    canRedo(): boolean;
    /**
     * Subscribe to changes to the undo/redo history.
     *
     * @param callback - This function is called at the end of the engine update, if the undo/redo history has been changed.
     * @returns A method to unsubscribe
     */
    onHistoryUpdated: (callback: () => void) => (() => void);
    /**
     * Subscribe to changes to the editor settings.
     * @param callback - This function is called at the end of the engine update, if the editor settings have changed.
     * @returns A method to unsubscribe.
     */
    onSettingsChanged: (callback: () => void) => (() => void);
    /**
     * Subscribe to changes to the editor role.
     *
     * This lets you react to changes in the role of the user and update engine
     * and editor settings in response.
     *
     * @param callback - This function will be called immediately after a role has
     * been set and the default settings for that role have been applied. This function
     * will also be called in case the role is set to the same value as before.
     * @returns A function for unsubscribing
     */
    onRoleChanged: (callback: (role: RoleString) => void) => (() => void);
    /**
     * Set a boolean setting.
     * @param keypath - The settings keypath, e.g. `doubleClickToCropEnabled`
     * @param value - The value to set.
     * @throws An error, if the keypath is invalid.
     */
    setSettingBool(keypath: SettingsBool, value: boolean): void;
    /** @deprecated Support for `ubq://` prefixed keypaths will be removed in a future release. */
    setSettingBool(keypath: `ubq://${SettingsBool}`, value: boolean): void;

    /**
     * Get a boolean setting.
     * @param keypath - The settings keypath, e.g. `doubleClickToCropEnabled`
     * @throws An error, if the keypath is invalid.
     */
    getSettingBool(keypath: SettingsBool): boolean;
    /** @deprecated Support for `ubq://` prefixed keypaths will be removed in a future release. */
    getSettingBool(keypath: `ubq://${SettingsBool}`): boolean;

    /**
     * Set an integer setting.
     * @param keypath - The settings keypath.
     * @param value - The value to set.
     * @throws An error, if the keypath is invalid.
     */
    setSettingInt(keypath: string, value: number): void;
    /**
     * Get an integer setting.
     * @param keypath - The settings keypath.
     * @throws An error, if the keypath is invalid.
     */
    getSettingInt(keypath: string): number;
    /**
     * Set a float setting.
     * @param keypath - The settings keypath, e.g. `positionSnappingThreshold`
     * @param value - The value to set.
     * @throws An error, if the keypath is invalid.
     */
    setSettingFloat(keypath: SettingsFloat, value: number): void;
    /** @deprecated Support for `ubq://` prefixed keypaths will be removed in a future release. */
    setSettingFloat(keypath: `ubq://${SettingsFloat}`, value: number): void;
    /**
     * Get a float setting.
     * @param keypath - The settings keypath, e.g. `positionSnappingThreshold`
     * @throws An error, if the keypath is invalid.
     */
    getSettingFloat(keypath: SettingsFloat): number;
    /** @deprecated Support for `ubq://` prefixed keypaths will be removed in a future release. */
    getSettingFloat(keypath: `ubq://${SettingsFloat}`): number;
    /**
     * Set a string setting.
     * @param keypath - The settings keypath, e.g. `license`
     * @param value - The value to set.
     * @throws An error, if the keypath is invalid.
     */
    setSettingString(keypath: SettingsString, value: string): void;
    /** @deprecated Support for `ubq://` prefixed keypaths will be removed in a future release. */
    setSettingString(keypath: `ubq://${SettingsString}`, value: string): void;
    /**
     * Get a string setting.
     * @param keypath - The settings keypath, e.g. `license`
     * @throws An error, if the keypath is invalid.
     */
    getSettingString(keypath: SettingsString): string;
    /** @deprecated Support for `ubq://` prefixed keypaths will be removed in a future release. */
    getSettingString(keypath: `ubq://${SettingsString}`): string;
    /**
     * Set a color setting.
     * @param keypath - The settings keypath, e.g. `highlightColor`.
     * @param value - The The value to set.
     */
    setSettingColor(keypath: SettingsColor, value: Color): void;
    /** @deprecated Support for `ubq://` prefixed keypaths will be removed in a future release. */
    setSettingColor(keypath: `ubq://${SettingsColor}`, value: Color): void;
    /**
     * Get a color setting.
     * @param keypath - The settings keypath, e.g. `highlightColor`.
     * @throws An error, if the keypath is invalid.
     */
    getSettingColor(keypath: SettingsColor): Color;
    /** @deprecated Support for `ubq://` prefixed keypaths will be removed in a future release. */
    getSettingColor(keypath: `ubq://${SettingsColor}`): Color;
    /**
     * Set a color setting.
     * @param keypath - The settings keypath, e.g. `highlightColor`.
     * @param r - The red color component in the range of 0 to 1.
     * @param g - The green color component in the range of 0 to 1.
     * @param b - The blue color component in the range of 0 to 1.
     * @param a - The alpha color component in the range of 0 to 1.
     * @deprecated Use setSettingColor() instead.
     */
    setSettingColorRGBA(keypath: SettingsColorRGBA | `ubq://${SettingsColorRGBA}`, r: number, g: number, b: number, a?: number): void;
    /**
     * Get a color setting.
     * @param keypath - The settings keypath, e.g. `highlightColor`.
     * @returns A tuple of channels red, green, blue and alpha in the range of 0 to 1.
     * @deprecated Use getSettingColor() instead.
     */
    getSettingColorRGBA(keypath: SettingsColorRGBA | `ubq://${SettingsColorRGBA}`): RGBA;
    /**
     * Set an enum setting.
     * @param keypath - The settings keypath, e.g. `doubleClickSelectionMode`.
     * @param value - The enum value as string.
     */
    setSettingEnum<T extends keyof SettingsEnum>(keypath: T, value: SettingsEnum[T]): void;
    /** @deprecated Support for `ubq://` prefixed keypaths will be removed in a future release. */
    setSettingEnum<T extends keyof SettingsEnum>(keypath: `ubq://${T}`, value: SettingsEnum[T]): void;

    /**
     * Get an enum setting.
     * @param keypath - The settings keypath, e.g. `doubleClickSelectionMode`.
     * @returns The value as string.
     */
    getSettingEnum<T extends keyof SettingsEnum>(keypath: T): SettingsEnum[T];
    /** @deprecated Support for `ubq://` prefixed keypaths will be removed in a future release. */
    getSettingEnum<T extends keyof SettingsEnum>(keypath: `ubq://${T}`): SettingsEnum[T];

    /**
     * Get the possible enum options for a given enum setting.
     * @param keypath - The settings keypath, e.g. `doubleClickSelectionMode`.
     * @returns The possible enum options as strings.
     */
    getSettingEnumOptions<T extends keyof SettingsEnum>(keypath: T): string[];
    /** @deprecated Support for `ubq://` prefixed keypaths will be removed in a future release. */
    getSettingEnumOptions<T extends keyof SettingsEnum>(keypath: `ubq://${T}`): string[];
    /**
     * Set the role of the user and apply role-dependent defaults for scopes and settings
     */
    setRole(role: RoleString): void;
    /**
     * Get the current role of the user
     */
    getRole(): RoleString;
    /**
     * Returns a list of all the settings available.
     * @returns A list of settings keypaths.
     */
    findAllSettings(): string[];
    /**
     * Returns the type of a setting.
     * @param keypath - The settings keypath, e.g. `doubleClickSelectionMode`.
     * @returns The setting type.
     */
    getSettingType(keypath: string): SettingType;
    /**
     * Get the currently available memory in bytes.
     * @returns The currently available memory in bytes.
     */
    getAvailableMemory(): number;
    /**
     * Get the current memory usage of the engine in bytes.
     * @returns The current memory usage in bytes.
     */
    getUsedMemory(): number;
    /**
     * Get the export size limit in pixels on the current device. An export is
     * only possible when both the width and height of the output are below or
     * equal this limit. However, this is only an upper limit as the export might
     * also not be possible due to other reasons, e.g., memory constraints.
     * @returns The upper export size limit in pixels or an unlimited size, i.e,
     * the maximum signed 32-bit integer value, if the limit is unknown.
     */
    getMaxExportSize(): number;
    /**
     * Sets a custom URI resolver.
     * This function can be called more than once. Subsequent calls will overwrite previous calls.
     * To remove a previously set resolver, pass the value `null`.
     * The given function must return an absolute path with a scheme.
     * @param resolver - Custom resolution function. The resolution function
     *                   should not reference variables outside of its scope.
     *                   It receives the default URI resolver as its second argument
     */
    setURIResolver(resolver: (URI: string, defaultURIResolver: (URI: string) => string) => string): void;

    /**
     * This is the default implementation for the URI resolver.
     * It resolves the given path relative to the `basePath` setting.
     * @param relativePath - The relative path that should be resolved.
     * @returns The resolved absolute URI.
     */
    defaultURIResolver(relativePath: string): string;
    /**
     * Resolves the given path.
     * If a custom resolver has been set with `setURIResolver`, it invokes it with the given path.
     * Else, it resolves it as relative to the `basePath` setting.
     * This performs NO validation of whether a file exists at the specified location.
     * @param relativePath - A relative path string
     * @returns The resolved absolute uri or an error if an invalid path was given.
     */
    getAbsoluteURI(relativePath: string): string;
    /**
     * Get all available global scopes that can be set.
     * @returns The names of all available global scopes.
     */
    findAllScopes(): Scope[];
    /**
     * Set a scope to be globally allowed, denied, or deferred to the block-level.
     * @param key - The scope to set.
     * @param value - `Allow` will always allow the scope, `Deny` will always deny the scope, and `Defer` will defer to the block-level.
     */
    setGlobalScope(key: Scope, value: 'Allow' | 'Deny' | 'Defer'): void;
    /**
     * Query the state of a global scope.
     * @param key - The scope to query.
     * @returns `Allow` if the scope is allowed, `Deny` if it is disallowed, and `Defer` if it is deferred to the block-level.
     */
    getGlobalScope(key: Scope): 'Allow' | 'Deny' | 'Defer';
    /**
     * Queries the names of currently set spot colors previously set with `setSpotColorRGB`.
     * @returns The names of set spot colors.
     */
    findAllSpotColors(): string[];
    /**
     * Queries the RGB representation set for a spot color.
     * If the value of the queried spot color has not been set yet, returns the default RGB representation (of magenta).
     * The alpha value is always 1.0.
     * @param name - The name of a spot color.
     * @returns A result holding a float array of the four color components.
     */
    getSpotColorRGBA(name: string): RGBA;
    /**
     * Queries the CMYK representation set for a spot color.
     * If the value of the queried spot color has not been set yet, returns the default CMYK representation (of magenta).
     * @param name - The name of a spot color.
     * @returns A result holding a float array of the four color components.
     */
    getSpotColorCMYK(name: string): CMYK;
    /**
     * Sets the RGB representation of a spot color.
     * Use this function to both create a new spot color or update an existing spot color.
     * @param name - The name of a spot color.
     * @param r - The red color component in the range of 0 to 1.
     * @param g - The green color component in the range of 0 to 1.
     * @param b - The blue color component in the range of 0 to 1.
     */
    setSpotColorRGB(name: string, r: number, g: number, b: number): void;
    /**
     * Sets the CMYK representation of a spot color.
     * Use this function to both create a new spot color or update an existing spot color.
     * @param name - The name of a spot color.
     * @param c - The cyan color component in the range of 0 to 1.
     * @param m - The magenta color component in the range of 0 to 1.
     * @param y - The yellow color component in the range of 0 to 1.
     * @param k - The key color component in the range of 0 to 1.
     */
    setSpotColorCMYK(name: string, c: number, m: number, y: number, k: number): void;
    /**
     * Removes a spot color from the list of set spot colors.
     * @param name - The name of a spot color.
     * @returns An empty result on success, an error otherwise.
     */
    removeSpotColor(name: string): void;
    /**
     * Set the spot color assign to a cutout type.
     * All cutout blocks of the given type will be immediately assigned that spot color.
     * @param type - The cutout type.
     * @param name - The spot color name to assign.
     */
    setSpotColorForCutoutType(type: CutoutType, color: string): void;
    /**
     * Get the name of the spot color assigned to a cutout type.
     * @param type - The cutout type.
     * @returns The color spot name.
     */
    getSpotColorForCutoutType(type: CutoutType): string;
    /**
     * Converts a color to the given color space.
     * @param color - The color to convert.
     * @param colorSpace - The color space to convert to.
     * @returns The converted color.
     */
    convertColorToColorSpace(color: Color, colorSpace: 'sRGB'): RGBAColor;
    /** */
    convertColorToColorSpace(color: Color, colorSpace: 'CMYK'): CMYKColor;
    /** */
    convertColorToColorSpace(color: Color, colorSpace: ColorSpace): never;
    /**
     * Create a resizable buffer that can hold arbitrary data.
     * @returns A URI to identify the buffer.
     */
    createBuffer(): string;
    /**
     * Destroy a buffer and free its resources.
     * @param uri - The URI of the buffer to destroy.
     */
    destroyBuffer(uri: string): void;
    /**
     * Set the data of a buffer at a given offset.
     * @param uri - The URI of the buffer to update.
     * @param offset - The offset in bytes at which to start writing.
     * @param data - The data to write.
     */
    setBufferData(uri: string, offset: number, data: Uint8Array): void;
    /**
     * Get the data of a buffer at a given offset.
     * @param uri - The URI of the buffer to query.
     * @param offset - The offset in bytes at which to start reading.
     * @param length - The number of bytes to read.
     * @returns The data at the given offset.
     */
    getBufferData(uri: string, offset: number, length: number): Uint8Array;
    /**
     * Set the length of a buffer.
     * @param uri - The URI of the buffer to update.
     * @param length - The new length of the buffer in bytes.
     */
    setBufferLength(uri: string, length: number): void;
    /**
     * Get the length of a buffer.
     * @param uri - The URI of the buffer to query.
     * @returns The length of the buffer in bytes.
     */
    getBufferLength(uri: string): number;


    /**
     * Returns the mimetype of the resources at the given URI.
     * If the resource is not already downloaded, this function will download it.
     * @param uri - The URI of the resource.
     * @returns The mimetype of the resource.
     * @throws An error if the resource could not be downloaded or the mimetype could not be determined.
     */
    getMimeType(uri: string): Promise<string>;
    /**
     * Returns the URLs and sizes of all resources whose data would be lost if the scene was exported.
     * This function is useful for determining which resources need to be relocated (e.g., to a CDN) before
     * exporting a scene since the resources are not included in the exported scene.
     * @returns The URLs and sizes of transient resources.
     */
    findAllTransientResources(): TransientResource[];
    /**
     * Provides the data of a resource at the given URL.
     * @param url - The URL of the resource.
     * @param chunkSize - The size of the chunks in which the resource data is provided.
     * @param onData - The callback function that is called with the resource data or an error if an error occurred.
     * The callback will be called as long as there is data left to provide and the callback returns `true`.
     */
    getResourceData(uri: string, chunkSize: number, onData: (result: Uint8Array) => boolean): void;
    /**
     * Changes the URL associated with a resource.
     * This function can be used change the URL of a resource that has been relocated (e.g., to a CDN).
     * @param currentURL - The current URL of the resource.
     * @param relocatedURL - The new URL of the resource.
     */
    relocateResource(currentUrl: string, relocatedUrl: string): void;
}

/**
 * The block type IDs for the effect blocks. These are the IDs used to create new effects
 * using `cesdk.engine.block.createEffect(id)`.
 * @public
 */
export declare type EffectType = EffectTypeShorthand | EffectTypeLonghand;

/**
 * The longhand block type IDs for the effect blocks. These are the IDs used to create new effects
 * using `cesdk.engine.block.createEffect(id)`.
 * @public
 */
export declare type EffectTypeLonghand = `//ly.img.ubq/effect/${EffectTypeShorthand}`;

/**
 * The shorthand block type IDs for the effect blocks. These are the IDs used to create new effects
 * using `cesdk.engine.block.createEffect(id)`.
 * @public
 */
export declare type EffectTypeShorthand = 'adjustments' | 'cross_cut' | 'dot_pattern' | 'duotone_filter' | 'extrude_blur' | 'glow' | 'green_screen' | 'half_tone' | 'linocut' | 'liquid' | 'lut_filter' | 'mirror' | 'outliner' | 'pixelize' | 'posterize' | 'radial_pixel' | 'recolor' | 'sharpie' | 'shifter' | 'tilt_shift' | 'tv_glitch' | 'vignette';

/** @public */
export declare interface EnginePlugin {
    name: string;
    version: string;
    initialize: (context: EnginePluginContext) => void;
}

/** @public */
export declare type EnginePluginContext = {
    engine: {
        asset: AssetAPI;
        block: BlockAPI;
        scene: SceneAPI;
        editor: EditorAPI;
        event: EventAPI;
        variable: VariableAPI;
    };
};

/**
 * @public
 */
export declare class EventAPI {
    #private;

    /**
     * Subscribe to block life-cycle events.
     * @param blocks - A list of blocks to filter events by. If the list is empty, events for every block are sent.
     * @param callback - The event callback. Events are bundled and sent at the end of each engine update.
     * @returns A method to unsubscribe.
     */
    subscribe: (blocks: DesignBlockId[], callback: (events: BlockEvent[]) => void) => (() => void);
}

/** @public */
declare interface ExportAudioOptions {
    sampleRate: number;
    numberOfChannels: number;
}

/**
 * @public
 */
export declare type ExportOptions = {
    /**
     * The PNG compression level to use, when exporting to PNG.
     *
     * Valid values are 0 to 9, higher means smaller, but slower.
     * Quality is not affected.
     * Ignored for other encodings.
     * @defaultValue 5.
     */
    pngCompressionLevel?: number;
    /**
     * The JPEG quality to use when encoding to JPEG.
     *
     * Valid values are (0-1], higher means better quality.
     * Ignored for other encodings.
     *
     * @defaultValue 0.9
     */
    jpegQuality?: number;
    /**
     * The WebP quality to use when encoding to WebP. Valid values are (0-1], higher means better quality.
     * WebP uses a special lossless encoding that usually produces smaller file sizes than PNG.
     * Ignored for other encodings. Defaults to 1.0.
     */
    webpQuality?: number;
    /**
     * An optional target width used in conjunction with target height.
     * If used, the block will be rendered large enough, that it fills the target
     * size entirely while maintaining its aspect ratio.
     */
    targetWidth?: number;
    /**
     * An optional target height used in conjunction with target width.
     * If used, the block will be rendered large enough, that it fills the target
     * size entirely while maintaining its aspect ratio.
     */
    targetHeight?: number;
    /**
     * Export the PDF document with a higher compatibility to different PDF viewers.
     * Bitmap images and some effects like gradients will be rasterized with the DPI
     * setting instead of embedding them directly.
     */
    exportPdfWithHighCompatibility?: boolean;
    /**
     * Export the PDF document with an underlayer.
     * An underlayer is generated by adding a graphics block behind the existing elements of the shape of the elements on
     * the page.
     */
    exportPdfWithUnderlayer?: boolean;
    /**
     * The name of the spot color to be used for the underlayer's fill.
     */
    underlayerSpotColorName?: string;
    /**
     * The adjustment in size of the shape of the underlayer.
     */
    underlayerOffset?: number;
};

/** @public */
declare interface ExportOptions_2 {
    jpegQuality: number;
    webpQuality: number;
    pngCompressionLevel: number;
    useTargetSize: boolean;
    targetWidth: number;
    targetHeight: number;
    exportPdfWithHighCompatibility: boolean;
    exportPdfWithUnderlayer: boolean;
    underlayerSpotColorName: string;
    underlayerOffset: number;
}

/** @public */
declare interface ExportVideoOptions {
    h264Profile: number;
    h264Level: number;
    framerate: number;
    videoBitrate: number;
    audioBitrate: number;
    useTargetSize: boolean;
    targetWidth: number;
    targetHeight: number;
}

/**
 * The block type IDs for the fill blocks. These are the IDs used to create new fills
 * using `cesdk.engine.block.createFill(id)`.
 * @public
 */
export declare type FillType = FillTypeShorthand | FillTypeLonghand;

/**
 * The longhand block type IDs for the fill blocks. These are the IDs used to create new fills
 * using `cesdk.engine.block.createFill(id)`.
 * @public
 */
export declare type FillTypeLonghand = `//ly.img.ubq/fill/${FillTypeShorthand}`;

/**
 * The shorthand block type IDs for the fill blocks. These are the IDs used to create new fills
 * using `cesdk.engine.block.createFill(id)`.
 * @public
 */
export declare type FillTypeShorthand = 'color' | 'gradient/linear' | 'gradient/radial' | 'gradient/conical' | 'image' | 'video' | 'pixelStream';

/** @public */
declare interface FindAssetsQuery {
    perPage: number;
    page: number;
    query: string;
    tags: string[];
    groups: string[];
    excludeGroups: string[];
    locale: string;
    sortingOrder: SortingOrder;
    sortKey: string;
    sortActiveFirst: boolean;
}

/** @public */
declare interface Flip {
    horizontal: boolean;
    vertical: boolean;
}

/** @public */
export declare interface Font {
    uri: string;
    subFamily: string;
    weight?: FontWeight;
    style?: FontStyle;
}

/** @public */
export declare type FontStyle = 'normal' | 'italic';

/** @public */
export declare type FontWeight = 'thin' | 'extraLight' | 'light' | 'normal' | 'medium' | 'semiBold' | 'bold' | 'extraBold' | 'heavy';

/** @public */
export declare interface GradientColorStop {
    /** A color value within a gradient. */
    color: Color;
    /** The relative position of the color within the gradient in the range [0, 1]. */
    stop: number;
}

/**
 * @public
 */
export declare type GradientstopRGBA = [
stop: number,
r: number,
g: number,
b: number,
a: number
];

/**
 * A hexadecimal color value (RGB or RGBA) that starts with a '#'
 * @example #6686FF or #6686FFFF
 * @public
 */
export declare type HexColorString = string;

/**
 * A numerical identifier for a history stack
 * @public
 */
export declare type HistoryId = number;

/**
 * - Left: The blocks get left aligned.
 * - Right: The blocks get right aligned.
 * - Center: The blocks get center aligned.
 *
 * @public
 */
export declare type HorizontalBlockAlignment = 'Left' | 'Right' | 'Center';

/**
 * The horizontal text alignment options.
 * @public
 */
export declare type HorizontalTextAlignment = 'Left' | 'Right' | 'Center';

/**
 * A wrapper around a plain canvas
 *
 * The idea is to shield the user from the weird semantics of changing width
 * and height of a canvas by making this a opaque block element instead and
 * managing the internal render resolution of the canvas dynamically
 *
 * @public
 */
export declare interface HTMLCreativeEngineCanvasElement extends HTMLElement {


    /**
     * Clear the canvas
     *
     * This is useful when mounting the canvas into a new position in the DOM.
     * If the canvas is not cleared, it will appear in the new DOM position, with
     * its contents stretched to the new size. It will re-render correctly during
     * the next animation frame, but for a brief moment the canvas contents can
     * flash distorted.
     *
     * Call `clear()` before mounting into the DOM to avoid this. This will cause
     * the canvas to be cleared until rendering the next frame.
     */
    clear(): void;
}

/**
 * Type guard for {@link CMYKColor}
 * @public
 */
export declare function isCMYKColor(color: Color): color is CMYKColor;

/**
 * Type guard for {@link RGBAColor}
 * @public
 */
export declare function isRGBAColor(color: Color): color is RGBAColor;

/**
 * Type guard for {@link SpotColor}
 * @public
 */
export declare function isSpotColor(color: Color): color is SpotColor;

/**
 * e.g. `en`, `de`, etc.
 * @public
 */
declare type Locale = string;

/** @public */
export declare interface Logger {
    (message: string, level?: LogLevel): void;
}

/** @public */
export declare type LogLevel = 'Info' | 'Warning' | 'Error';

/**
 * @public
 * @deprecated Specifying log levels via `LogLevel.Info` has been deprecated.
 * Please use the desired LogLevel string directly.
 */
export declare const LogLevel: {
    readonly Info: "Info";
    readonly Warning: "Warning";
    readonly Error: "Error";
};

/** @public */
declare enum MimeType_2 {
    Png = "image/png",
    Jpeg = "image/jpeg",
    WebP = "image/webp",
    Tga = "image/x-tga",
    Wav = "audio/wav",
    Mp4 = "video/mp4",
    QuickTime = "video/quicktime",
    Binary = "application/octet-stream",
    Pdf = "application/pdf",
    Zip = "application/zip"
}
export { MimeType_2 as MimeType }

/**
 * The block type IDs for all blocks types in the Creative Engine. Those are the types that can be
 * passed to `cesdk.engine.block.findByType(type)` for example.
 * @public
 */
export declare type ObjectType = ObjectTypeShorthand | ObjectTypeLonghand;

/**
 * The longhand block type IDs for all blocks types in the Creative Engine. Those are the Types returned by the
 * engine when calling `cesdk.engine.block.getType(blockId)` for example.
 * @public
 */
export declare type ObjectTypeLonghand = DesignBlockTypeLonghand | ShapeTypeLonghand | FillTypeLonghand | EffectTypeLonghand | BlurTypeLonghand | AnimationTypeLonghand;

/**
 * The shorthand block type IDs for all blocks types in the Creative Engine. Those are the types that can be
 * passed to `cesdk.engine.block.findByType(type)` for example.
 * @public
 */
export declare type ObjectTypeShorthand = DesignBlockTypeShorthand | `shape/${ShapeTypeShorthand}` | `fill/${FillTypeShorthand}` | `effect/${EffectTypeShorthand}` | `blur/${BlurTypeShorthand}` | `animation/${AnimationTypeShorthand}`;

/**
 * A simplified placeholder type for `OffscreenCanvas`, to avoid a dependency on `@types/offscreencanvas`
 * @public
 */
declare type OffscreenCanvas_2 = {
    width: number;
    height: number;
};
export { OffscreenCanvas_2 as OffscreenCanvas }

/** @public */
export declare interface PageDuration {
    pageId: DesignBlockId;
    duration: number;
    start: number;
    end: number;
}

/**
 * A color definition for the custom color palette.
 * The RGB and CMYK components must all be specified in the range [0-1].
 * @public
 */
export declare type PaletteColor = HexColorString | RGBColor | RGBAColor | SpotColor;

/**
 * - Absolute: Position in absolute design units.
 * - Percent: Position in relation to the block's parent's size in percent, where 1.0 means 100%.
 * - Auto: Position is automatically determined
 *
 * @public
 */
export declare type PositionMode = 'Absolute' | 'Percent' | 'Auto';

/** @public */
export declare type PropertyType = 'Bool' | 'Int' | 'Float' | 'String' | 'Color' | 'Enum' | 'Struct' | 'Double' | 'SourceSet';

/**
 * An open range.
 * @public
 * */
declare interface Range_2 {
    /** The starting value of the range */
    from: number;
    /** The non-inclusive ending value of the range */
    to: number;
}
export { Range_2 as Range }

/**
 * Reactions track read calls and provide a way to react if they change.
 *
 * - Read calls are tracked by passing a function to `track`. That function
 *   will be executed, and any read calls made during that execution will be
 *   tracked and associated with this reaction.
 * - Reactions can be subscribed to by passing a callback to `subscribe`. That
 *   callback will be executed whenever any of the read calls associated with
 *   this reaction change.
 *
 * @public
 */
export declare interface Reaction {
    /**
     * Execute the callback and track all engine read calls that happen during
     * the execution. These read calls are associated with this reaction.
     */
    track<T>(cb: () => T): T;
    /**
     * When the Reactor detects that the engine read calls associated with this
     * reaction might have changed, it will invoke the subscription handler.
     * @returns A function that can be called to unsubscribe the handler.
     */
    subscribe(cb: () => void): () => void;
    /**
     * Unsubscribe all handlers, nullify the reference to the Reactor
     * and dispose the reaction.
     */
    dispose(): void;
}

/**
 * The reactor coordinates the update of registered _Reactions_.
 *
 * - Reactions are created with `createReaction()`
 * - `reaction.track(effect)` will run the effect and associate any engine read
 *   calls during the execution with the Reaction.
 * - `reaction.subscribe(handler)` will invoke the handler whenever the engine read calls
 *   in the reaction might have changed after an update.
 *
 * @public
 */
export declare interface Reactor {

    /**
     * Create and return a new Reaction that is associated with this Reactor.
     */
    createReaction(debugName?: string): Reaction;
    /**
     * Dispose the reactor and all reactions.
     * After this call, the reactor is no longer usable.
     */
    dispose(): void;
    /**
     * A promise that will resolve after the next update of the Reactor.
     *
     * This can be used to wait for the next update of the Reactor in an async function.
     *
     * ```ts
     * await reactor.nextReaction;
     * ```
     *
     * This is useful in situations where you want to make sure that the effects of
     * a reactor update have propagated to any dependent code before continuing.
     * Particularly, this can be used to ensure that the UI has updated before
     * continuing with other operations.
     */
    nextReaction: Promise<void>;
}

/**
 * Dispatched on the engine canvas right before the engine will refocus its text
 * input after a blur. Call `preventDefault()` to prevent the refocusing.
 * @public
 */
export declare interface RefocusEvent extends CustomEvent<EventTarget | null> {
    readonly type: 'cesdk-refocus';
    /** Contains the element that has received focus during the blur, or null */
    readonly detail: EventTarget | null;
    /** Prevent refocusing the engine input */
    preventDefault(): void;
}

/**
 * @public
 */
export declare type RGBA = [r: number, g: number, b: number, a: number];

/**
 * All components between 0 and 1
 * @public
 */
export declare interface RGBAColor {
    /** Red */
    r: number;
    /** Green */
    g: number;
    /** Blue */
    b: number;
    /** Alpha */
    a: number;
}

/**
 * All components between 0 and 1
 * @public
 */
export declare interface RGBColor {
    /** Red */
    r: number;
    /** Green */
    g: number;
    /** Blue */
    b: number;
}

/** @public */
export declare type RoleString = 'Creator' | 'Adopter' | 'Viewer' | 'Presenter';

/**
 * @public
 */
export declare class SceneAPI {
    #private;

    /**
     * Load the contents of a scene file.
     * @param sceneContent - The scene file contents, a base64 string.
     * @returns A handle to the loaded scene.
     */
    loadFromString(sceneContent: string): Promise<DesignBlockId>;
    /**
     * Load a scene from the URL to the scene file.
     * The scene file will be fetched asynchronously by the engine. This requires continuous `render`
     * calls on this engines instance.
     * @param url - The URL of the scene file.
     * @returns scene A promise that resolves once the scene was loaded or rejects with an error otherwise.
     */
    loadFromURL(url: string): Promise<DesignBlockId>;
    /**
     * Load a previously archived scene from the URL to the scene file.
     * The scene file will be fetched asynchronously by the engine. This requires continuous `render`
     * calls on this engines instance.
     * @param url - The URL of the scene file.
     * @returns scene A promise that resolves once the scene was loaded or rejects with an error otherwise.
     */
    loadFromArchiveURL(url: string): Promise<DesignBlockId>;
    /**
     * Serializes the current scene into a string. Selection is discarded.
     * @returns A promise that resolves with a string on success or an error on failure.
     */
    saveToString(allowedResourceSchemes?: string[]): Promise<string>;
    /**
     * Saves the current scene and all of its referenced assets into an archive.
     * The archive contains all assets, that were accessible when this function was called.
     * Blocks in the archived scene reference assets relative from to the location of the scene
     * file. These references are resolved when loading such a scene via `loadSceneFromURL`.
     *
     * @returns A promise that resolves with a Blob on success or an error on failure.
     */
    saveToArchive(): Promise<Blob>;
    /**
     * Create a new design scene, along with its own camera.
     * @returns The scene's handle.
     */
    create(sceneLayout?: SceneLayout): DesignBlockId;
    /**
     * Create a new scene in video mode, along with its own camera.
     * @returns The scene's handle.
     */
    createVideo(): DesignBlockId;
    /**
     * Loads the given image and creates a scene with a single page showing the image.
     * Fetching the image may take an arbitrary amount of time, so the scene isn't immediately
     * available.
     * @param url - The image URL.
     * @param dpi - The scene's DPI.
     * @param pixelScaleFactor - The display's pixel scale factor.
     * @returns A promise that resolves with the scene ID on success or rejected with an error otherwise.
     */
    createFromImage(url: string, dpi?: number, pixelScaleFactor?: number, sceneLayout?: SceneLayout, spacing?: number, spacingInScreenSpace?: boolean): Promise<DesignBlockId>;
    /**
     * Loads the given video and creates a scene with a single page showing the video.
     * Fetching the video may take an arbitrary amount of time, so the scene isn't immediately
     * available.
     * @param url - The video URL.
     * @returns A promise that resolves with the scene ID on success or rejected with an error otherwise.
     */
    createFromVideo(url: string): Promise<DesignBlockId>;
    /**
     * Return the currently active scene.
     * @returns The scene or null, if none was created yet.
     */
    get(): DesignBlockId | null;
    /**
     * Applies the contents of the given template scene to the currently loaded scene.
     * This loads the template scene while keeping the design unit and page dimensions
     * of the current scene. The content of the pages is automatically adjusted to fit
     * the new dimensions.
     * @param content - The template scene file contents, a base64 string.
     * @returns A Promise that resolves once the template was applied or rejects if there was an error.
     */
    applyTemplateFromString(content: string): Promise<void>;
    /**
     * Applies the contents of the given template scene to the currently loaded scene.
     * This loads the template scene while keeping the design unit and page dimensions
     * of the current scene. The content of the pages is automatically adjusted to fit
     * the new dimensions.
     * @param url - The url to the template scene file.
     * @returns A Promise that resolves once the template was applied or rejects if there was an error.
     */
    applyTemplateFromURL(url: string): Promise<void>;
    /**
     * Get the current scene mode.
     * @returns The current mode of the scene.
     */
    getMode(): SceneMode;
    /**
     * Converts all values of the current scene into the given design unit.
     * @param designUnit - The new design unit of the scene
     */
    setDesignUnit(designUnit: DesignUnit): void;
    /**
     * Returns the design unit of the current scene.
     * @returns The current design unit.
     */
    getDesignUnit(): DesignUnit;
    /**
     * Get the sorted list of pages in the scene.
     * @returns The sorted list of pages in the scene.
     */
    getPages(): DesignBlockId[];
    /**
     * Get the current page, i.e., the page of the first selected element if this page
     * is at least 25% visible or, otherwise, the page nearest to the viewport center.
     * @returns The current page in the scene or null.
     */
    getCurrentPage(): DesignBlockId | null;
    /**
     * Find all blocks with the given type sorted by the distance to viewport center.
     * @param type - The type to search for.
     * @returns A list of block ids sorted by distance to viewport center.
     */
    findNearestToViewPortCenterByType(type: DesignBlockType): DesignBlockId[];
    /**
     * Find all blocks with the given kind sorted by the distance to viewport center.
     * @param kind - The kind to search for.
     * @returns A list of block ids sorted by distance to viewport center.
     */
    findNearestToViewPortCenterByKind(kind: string): DesignBlockId[];
    /**
     * Set the zoom level of the scene, e.g., for headless versions.
     * This only shows an effect if the zoom level is not handled/overwritten by the UI.
     * Setting a zoom level of 2.0f results in one dot in the design to be two pixels on the screen.
     *
     * @param zoomLevel - The new zoom level.
     */
    setZoomLevel(zoomLevel?: number): void;
    /**
     * Get the zoom level of the scene or for a camera in the scene in unit `dpx/dot`. A zoom level of 2.0 results in one pixel in the design to be two pixels
     * on the screen.
     * @returns The zoom level of the block's camera.
     */
    getZoomLevel(): number;
    /**
     * Sets the zoom and focus to show a block.
     * This only shows an effect if the zoom level is not handled/overwritten by the UI.
     * Without padding, this results in a tight view on the block.
     *
     * @param id - The block that should be focused on.
     * @param paddingLeft - Optional padding in screen pixels to the left of the block.
     * @param paddingTop - Optional padding in screen pixels to the top of the block.
     * @param paddingRight - Optional padding in screen pixels to the right of the block.
     * @param paddingBottom - Optional padding in screen pixels to the bottom of the block.
     * @returns A promise that resolves once the zoom was set or rejects with an error otherwise.
     */
    zoomToBlock(id: DesignBlockId, paddingLeft?: number, paddingTop?: number, paddingRight?: number, paddingBottom?: number): Promise<void>;
    /**
     * Continually adjusts the zoom level to fit the width or height of a block's axis-aligned bounding box.
     * This only shows an effect if the zoom level is not handled/overwritten by the UI.
     * Without padding, this results in a tight view on the block.
     * No more than one block per scene can have zoom auto-fit enabled.
     * Calling `setZoomLevel` or `zoomToBlock` disables the continuous adjustment.
     *
     * @param id - The block for which the zoom is adjusted.
     * @param axis - The block axis for which the zoom is adjusted.
     * @param paddingBefore - Optional padding in screen pixels before the block.
     * @param paddingAfter - Optional padding in screen pixels after the block.
     */
    enableZoomAutoFit(id: DesignBlockId, axis: 'Horizontal' | 'Vertical', paddingBefore?: number, paddingAfter?: number): void;
    /**
     * Continually adjusts the zoom level to fit the width or height of a block's axis-aligned bounding box.
     * This only shows an effect if the zoom level is not handled/overwritten by the UI.
     * Without padding, this results in a tight view on the block.
     * Calling `setZoomLevel` or `zoomToBlock` disables the continuous adjustment.
     *
     * @param id - The block for which the zoom is adjusted.
     * @param axis - The block axis for which the zoom is adjusted.
     * @param paddingLeft - Optional padding in screen pixels to the left of the block.
     * @param paddingTop - Optional padding in screen pixels to the top of the block.
     * @param paddingRight - Optional padding in screen pixels to the right of the block.
     * @param paddingBottom - Optional padding in screen pixels to the bottom of the block.
     */
    enableZoomAutoFit(id: DesignBlockId, axis: 'Both', paddingLeft?: number, paddingTop?: number, paddingRight?: number, paddingBottom?: number): void;
    /**
     *  Disables any previously set zoom auto-fit.
     *
     * @param blockOrScene - The scene or a block in the scene for which to disable zoom auto-fit.
     */
    disableZoomAutoFit(blockOrScene: DesignBlockId): void;
    /**
     *  Queries whether zoom auto-fit is enabled.
     *
     * @param blockOrScene - The scene or a block in the scene for which to query the zoom auto-fit.
     * @returns True if the given block has auto-fit set or the scene contains a block for which auto-fit is set, false
     * otherwise.
     */
    isZoomAutoFitEnabled(blockOrScene: DesignBlockId): boolean;
    /**
     * Continually ensures the camera position to be within the width and height of the blocks axis-aligned bounding box.
     * Without padding, this results in a tight clamp on the block. With padding, the padded part of the
     * blocks is ensured to be visible.
     *
     * @param ids - The blocks to which the camera position is adjusted to, usually, the scene or a page.
     * @param paddingLeft - Optional padding in screen pixels to the left of the block.
     * @param paddingTop - Optional padding in screen pixels to the top of the block.
     * @param paddingRight - Optional padding in screen pixels to the right of the block.
     * @param paddingBottom - Optional padding in screen pixels to the bottom of the block.
     * @param scaledPaddingLeft - Optional padding in screen pixels to the left of the block that scales with the zoom level until five times the initial value.
     * @param scaledPaddingTop - Optional padding in screen pixels to the top of the block that scales with the zoom level until five times the initial value.
     * @param scaledPaddingRight - Optional padding in screen pixels to the right of the block that scales with the zoom level until five times the initial value.
     * @param scaledPaddingBottom - Optional padding in screen pixels to the bottom of the block that scales with the zoom level until five times the initial value.
     */
    unstable_enableCameraPositionClamping(ids: DesignBlockId[], paddingLeft?: number, paddingTop?: number, paddingRight?: number, paddingBottom?: number, scaledPaddingLeft?: number, scaledPaddingTop?: number, scaledPaddingRight?: number, scaledPaddingBottom?: number): void;
    /**
     *  Disables any previously set position clamping for the current scene.
     * @param blockOrScene - Optionally, the scene or a block in the scene for which to query the position clamping.
     */
    unstable_disableCameraPositionClamping(blockOrScene?: number | null): void;
    /**
     *  Queries whether position clamping is enabled.
     *
     * @param blockOrScene - Optionally, the scene or a block in the scene for which to query the position clamping.
     * @returns True if the given block has position clamping set or the scene contains a block for which position clamping is set, false
     * otherwise.
     */
    unstable_isCameraPositionClampingEnabled(blockOrScene?: number | null): boolean;
    /**
     * Continually ensures the zoom level of the camera in the active scene to be in the given range.
     *
     * @param ids - The blocks to which the camera zoom limits are adjusted to, usually, the scene or a page.
     * @param minZoomLimit - The minimum zoom level limit when zooming out, unlimited when negative.
     * @param maxZoomLimit - The maximum zoom level limit when zooming in, unlimited when negative.
     * @param paddingLeft - Optional padding in screen pixels to the left of the block. Only applied when the block is not a camera.
     * @param paddingTop - Optional padding in screen pixels to the top of the block. Only applied when the block is not a camera.
     * @param paddingRight - Optional padding in screen pixels to the right of the block. Only applied when the block is not a camera.
     * @param paddingBottom - Optional padding in screen pixels to the bottom of the block. Only applied when the block is not a camera.
     *
     */
    unstable_enableCameraZoomClamping(ids: DesignBlockId[], minZoomLimit?: number, maxZoomLimit?: number, paddingLeft?: number, paddingTop?: number, paddingRight?: number, paddingBottom?: number): void;
    /**
     * Disables any previously set zoom clamping for the current scene.
     * @param blockOrScene - Optionally, the scene or a block for which to query the zoom clamping.
     */
    unstable_disableCameraZoomClamping(blockOrScene?: number | null): void;
    /**
     * Queries whether zoom clamping is enabled.
     *
     * @param blockOrScene - Optionally, the scene or a block for which to query the zoom clamping.
     * @returns True if the given block has zoom clamping set or the scene contains a block for which zoom clamping is set, false otherwise.
     */
    unstable_isCameraZoomClampingEnabled(blockOrScene?: number | null): boolean;
    /**
     * Subscribe to changes to the zoom level.
     * @param callback - This function is called at the end of the engine update, if the zoom level has changed.
     * @returns A method to unsubscribe.
     * @privateRemarks This will currently fire on _all_ changes to camera properties
     */
    onZoomLevelChanged: (callback: () => void) => (() => void);
    /**
     * Subscribe to changes to the active scene rendered by the engine.
     * @param callback - This function is called at the end of the engine update, if the active scene has changed.
     * @returns A method to unsubscribe.
     */
    onActiveChanged: (callback: () => void) => (() => void);
}

/**
 * The scene layout determines how the layout stack should layout its pages.
 * @public
 */
export declare type SceneLayout = 'Free' | 'VerticalStack' | 'HorizontalStack' | 'DepthStack';

/**
 * The mode of the scene defines how the editor and playback should behave.
 * @public
 */
export declare type SceneMode = 'Design' | 'Video';

/**
 * @public
 */
export declare type Scope = 'text/edit' | 'text/character' | 'fill/change' | 'fill/changeType' | 'stroke/change' | 'shape/change' | 'layer/move' | 'layer/resize' | 'layer/rotate' | 'layer/flip' | 'layer/crop' | 'layer/opacity' | 'layer/blendMode' | 'layer/visibility' | 'layer/clipping' | 'appearance/adjustments' | 'appearance/filter' | 'appearance/effect' | 'appearance/blur' | 'appearance/shadow' | 'appearance/animation' | 'lifecycle/destroy' | 'lifecycle/duplicate' | 'editor/add' | 'editor/select';

/** @public */
export declare type SettingsBool = 'controlGizmo/showCropHandles' | 'controlGizmo/showCropScaleHandles' | 'controlGizmo/showMoveHandles' | 'controlGizmo/showResizeHandles' | 'controlGizmo/showRotateHandles' | 'controlGizmo/showScaleHandles' | 'doubleClickToCropEnabled' | 'features/singlePageModeEnabled' | 'features/pageCarouselEnabled' | 'mouse/enableScroll' | 'mouse/enableZoom' | 'checkScopesInAPIs' | 'page/allowCropInteraction' | 'page/allowMoveInteraction' | 'page/allowResizeInteraction' | 'page/allowRotateInteraction' | 'page/dimOutOfPageAreas' | 'page/restrictResizeInteractionToFixedAspectRatio' | 'page/title/appendPageName' | 'page/title/show' | 'page/title/showOnSinglePage' | 'page/title/showPageTitleTemplate' | 'placeholderControls/showButton' | 'placeholderControls/showOverlay' | 'blockAnimations/enabled' | 'showBuildVersion' | 'touch/dragStartCanSelect' | 'touch/singlePointPanning';

/** @public
 */
export declare type SettingsColor = 'borderOutlineColor' | 'clearColor' | 'colorMaskingSettings/maskColor' | 'cropOverlayColor' | 'errorStateColor' | 'highlightColor' | 'page/innerBorderColor' | 'page/marginFillColor' | 'page/marginFrameColor' | 'page/outerBorderColor' | 'page/title/color' | 'placeholderHighlightColor' | 'progressColor' | 'rotationSnappingGuideColor' | 'ruleOfThirdsLineColor' | 'snappingGuideColor' | 'textVariableHighlightColor';

/** @public
 * @deprecated Use SettingsColor instead.
 */
export declare type SettingsColorRGBA = SettingsColor;

/** @public */
export declare type SettingsEnum = {
    doubleClickSelectionMode: 'Direct' | 'Hierarchical';
    'touch/pinchAction': 'None' | 'Zoom' | 'Scale';
    'touch/rotateAction': 'None' | 'Rotate';
    'camera/clamping/overshootMode': 'Center' | 'Reverse';
};

/** @public */
export declare type SettingsFloat = 'controlGizmo/blockScaleDownLimit' | 'positionSnappingThreshold' | 'rotationSnappingThreshold';

/** @public */
export declare type SettingsString = 'basePath' | 'defaultEmojiFontFileUri' | 'defaultFontFileUri' | 'license' | 'page/title/fontFileUri' | 'page/title/separator';

/** @public */
export declare type SettingType = 'Bool' | 'Int' | 'Float' | 'String' | 'Color' | 'Enum';

/**
 * The block type IDs for the shape blocks. These are the IDs used to create new shapes
 * using `cesdk.engine.block.createShape(id)`.
 * @public
 */
export declare type ShapeType = ShapeTypeShorthand | ShapeTypeLonghand;

/**
 * The longhand block type IDs for the blocks. These are the IDs used to create new shapes
 * using `cesdk.engine.block.createShape(id)`.
 * @public
 */
export declare type ShapeTypeLonghand = `//ly.img.ubq/shape/${ShapeTypeShorthand}`;

/**
 * The shorthand block type IDs for the shape blocks. These are the IDs used to create new shapes
 * using `cesdk.engine.block.createShape(id)`.
 * @public
 */
export declare type ShapeTypeShorthand = 'rect' | 'line' | 'ellipse' | 'polygon' | 'star' | 'vector_path';

/** @public */
export declare interface Size2 {
    width: number;
    height: number;
}

/**
 * - Absolute: Size in absolute design units.
 * - Percent: Size in relation to the block's parent's size in percent, where 1.0 means 100%.
 * - Auto: Size is automatically determined
 *
 * @public
 */
export declare type SizeMode = 'Absolute' | 'Percent' | 'Auto';

/**
 * The order to sort by if the asset source supports sorting.
 * If set to None, the order is the same as the assets were added to the source.
 * @public
 */
export declare type SortingOrder = 'None' | 'Ascending' | 'Descending';

/**
 * A single source width an intrinsic width & height.
 * @public
 */
export declare interface Source {
    uri: string;
    width: number;
    height: number;
}

/** @public */
export declare interface SpotColor {
    name: string;
    tint: number;
    externalReference: string;
}

/** @public */
export declare type StrokeCornerGeometry = 'Bevel' | 'Miter' | 'Round';

/**  @public */
export declare type StrokePosition = 'Center' | 'Inner' | 'Outer';

/**  @public */
export declare type StrokeStyle = 'Dashed' | 'DashedRound' | 'Dotted' | 'LongDashed' | 'LongDashedRound' | 'Solid';

/** @public */
declare type Subscription = number;

/**
 * Checks if the current browser supports necessary technologies to match our supported browsers
 * @public
 */
export declare function supportsBrowser(): boolean;

/**
 * Checks if the current browser supports video editing.
 *
 * @returns false if the browser does not support the required APIs.
 *
 * @public
 */
export declare function supportsVideo(): boolean;

/**
 * Checks if the current browser supports video exporting.
 * @public
 */
export declare function supportsVideoExport(): Promise<boolean>;

/**
 * Checks if the current browser supports web assembly
 * @public
 */
export declare function supportsWasm(): boolean;

/**
 * @public
 */
export declare type TextCase = 'Normal' | 'Uppercase' | 'Lowercase' | 'Titlecase';

/** @public */
export declare interface TransientResource {
    uri: string;
    size: number;
}

/** @public */
export declare interface Typeface {
    /** The unique name of this typeface */
    name: string;
    /** The list of all fonts that are part of this typeface. */
    fonts: Font[];
}

/**
 * @deprecated This type definition is not used anymore and will be removed.
 * @public
 */
export declare type TypefaceDefinition = {
    /** @deprecated The meta field is not used anymore */
    meta?: {
        default?: boolean;
        library?: string;
        categories?: string[];
    };
    family: string;
    fonts: {
        fontURL: string;
        weight: FontWeight;
        style: FontStyle;
    }[];
};

/**
 * @public
 */
export declare class VariableAPI {
    #private;

    /**
     * Get all text variables currently stored in the engine.
     * @returns Return a list of variable names
     */
    findAll(): string[];
    /**
     * Set a text variable.
     * @param key - The variable's key.
     * @param value - The text to replace the variable with.
     */
    setString(key: string, value: string): void;
    /**
     * Set a text variable.
     * @param key - The variable's key.
     * @returns  The text value of the variable.
     */
    getString(key: string): string;
    /**
     * Destroy a text variable.
     * @param key - The variable's key.
     */
    remove(key: string): void;
}

/** @public */
export declare interface Vec2 {
    x: number;
    y: number;
}

/** @public */
export declare interface Vec3 {
    x: number;
    y: number;
    z: number;
}

/**
 * - Top: The blocks get top aligned.
 * - Bottom: The blocks get bottom aligned.
 * - Center: The blocks get center aligned.
 *
 * @public
 */
export declare type VerticalBlockAlignment = 'Top' | 'Bottom' | 'Center';

/**
 * The vertical text alignment options.
 * @public
 */
export declare type VerticalTextAlignment = 'Top' | 'Bottom' | 'Center';

/**
 * @public
 */
export declare type VideoExportOptions = {
    /**
     * Determines the encoder feature set and in turn the quality, size and speed of the encoding process.
     *
     * @defaultValue 77 (Main)
     */
    h264Profile?: number;
    /**
     * Controls the H.264 encoding level. This relates to parameters used by the encoder such as bit rate,
     * timings and motion vectors. Defined by the spec are levels 1.0 up to 6.2. To arrive at an integer value,
     * the level is multiplied by ten. E.g. to get level 5.2, pass a value of 52.
     *
     * @defaultValue 52
     */
    h264Level?: number;
    /**
     * The video bitrate in bits per second. Maximum bitrate is determined by h264Profile and h264Level.
     * If the value is 0, the bitrate is automatically determined by the engine.
     */
    videoBitrate?: number;
    /**
     * The audio bitrate in bits per second.
     * If the value is 0, the bitrate is automatically determined by the engine (128kbps for stereo AAC stream).
     */
    audioBitrate?: number;
    /**
     * The time offset in seconds of the scene's timeline from which the video will start.
     *
     * @defaultValue 0
     */
    timeOffset?: number;
    /**
     * The duration in seconds of the final video.
     *
     * @defaultValue The duration of the scene.
     */
    duration?: number;
    /**
     * The target framerate of the exported video in Hz.
     *
     * @defaultValue 30
     */
    framerate?: number;
    /**
     * An optional target width used in conjunction with target height.
     * If used, the block will be rendered large enough, that it fills the target
     * size entirely while maintaining its aspect ratio.
     */
    targetWidth?: number;
    /**
     * An optional target height used in conjunction with target width.
     * If used, the block will be rendered large enough, that it fills the target
     * size entirely while maintaining its aspect ratio.
     */
    targetHeight?: number;
    /**
     * An abortsignal that can be used to cancel the export.
     */
    abortSignal?: AbortSignal;
};

/**
 * Describes a rectangle on the screen
 * - `x` and `y` indicate the position
 * - `w` and `h` indicate the width and height
 * @public
 */
export declare type XYWH = [x: number, y: number, w: number, h: number];

/**
 * The axis(es) for which to auto-fit.
 * @public
 */
export declare type ZoomAutoFitAxis = 'Horizontal' | 'Vertical' | 'Both';

export { }
