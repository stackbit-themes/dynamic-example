export interface ContentObjectMetadata {
    id: string;
    source: string;
    sourceName?: string;
    sourcePath?: string;
    relSourcePath?: string;
    relProjectPath?: string;
    modelType: string;
    modelName: string;
    modelLabel: string;
    urlPath?: string;
    routeHandler?: string;
}

export interface ContentObjectModel {
    readonly __metadata: ContentObjectMetadata;
    readonly type?: string;
    readonly layout?: string;
    [k: string]: unknown;
}
