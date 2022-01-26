interface ContentObjectMetadata {
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
}

interface ContentObjectModel {
    readonly __metadata: ContentObjectMetadata;
    readonly type: string;
    [k: string]: unknown;
}

export interface WizardControlModel extends ContentObjectModel {
    required: boolean;
    label: string | null;
    variableName: string | null;
}

export interface WizardInputControlModel extends WizardControlModel {
    minLength: number;
}

export interface WizardSliderControlModel extends WizardControlModel {
    defaultValue: number;
    minValue: number;
    maxValue: number;
}

export interface WizardStepModel extends ContentObjectModel {
    title: string;
    description?: string;
    controls?: WizardControlModel[];
}

export interface WizardFlowModel extends ContentObjectModel {
    title: string;
    steps?: WizardStepModel[];
}

export interface SiteConfigModel extends ContentObjectModel {
    // TBD fill this out
}