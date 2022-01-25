interface ContentObjectModel {
    readonly type: string;
    [k: string]: unknown;
}

export interface WizardControlModel extends ContentObjectModel {
    required: boolean;
    label: string | null;
    varName: string | null;
}

export interface WizardInputControlModel extends WizardControlModel {
    minLength: number;
}

export interface WizardSliderControlModel extends WizardControlModel {
    defaultValue: number;
    minValue: number;
    maxValue: number;
}
