import { ContentObjectMetadata, ContentObjectModel } from "./common/base-model-types";

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

export interface WizardFlowMetadataModel extends ContentObjectMetadata {
    flowAction: string;
}

export interface HeaderModel extends ContentObjectModel {
    // TODO fill this out
}

export interface SiteConfigModel extends ContentObjectModel {
    favicon?: string;
    defaultFlow?: WizardFlowModel|string; // TODO doc
    header?: HeaderModel;
}

export interface ContentCommonProps {
    site: SiteConfigModel;
    allFlowIds: string[];
}

export interface GeneralPageModel extends ContentObjectModel {
    title: string;
    sections?: any[]
}

export interface UserProfilePageModel extends ContentObjectModel {
    title: string;
    topSections?: any[]
}
// TODO refactor to move to common



/*
export interface PageComponentProps extends CommonProps {
    [k: string]: any;
}
*/

export interface PageComponentCommonProps {
    site: SiteConfigModel;
    allFlowIds?: string[];
    [k: string]: any;
}

export interface GenericPageComponentProps extends PageComponentCommonProps { 
    page: ContentObjectModel;   
}

export type GenericPageComponent = (props: GenericPageComponentProps) => JSX.Element;

export type WizardFlowComponentProps = {flow: WizardFlowModel};
export type WizardFlowComponent = (props: WizardFlowComponentProps) => JSX.Element;
