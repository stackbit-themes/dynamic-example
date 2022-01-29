import { ContentObjectModel } from "./common/base-model-types";

export interface WizardControlModel extends ContentObjectModel {
    required: boolean;
    label: string | null;
    variableName: string | null;
}

export interface WizardTextControlModel extends WizardControlModel {
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
    // TODO fill this out
    favicon?: string
}

export interface GeneralPageModel extends ContentObjectModel {
    // TODO fill this out
    sections?: any[]
}

// TODO refactor to move to common

export interface PageComponentProps {
    site: SiteConfigModel;
    [k: string]: any;
}

export interface GenericPageComponentProps extends PageComponentProps { 
    page: ContentObjectModel;
}
export type GenericPageComponent = (props: GenericPageComponentProps) => JSX.Element;
