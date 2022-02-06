import React from "react";
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

export interface WizardImageItemlModel extends WizardControlModel {
    image: string;
    label: string;
    value: string;
}

export interface WizardImageSelectControlModel extends WizardControlModel {
    images: WizardImageItemlModel[];
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
    title: string;
}

export interface SimpleButtonModel extends ContentObjectModel {
    primary: boolean;
    text: string;
    link: string;
}

export interface SignInButtonModel extends ContentObjectModel {
    text: string;
}

export type UserGroup = 'everyone'|'loggedIn'|'anonymous';
export interface BaseSectionModel extends ContentObjectModel {
    userGroup: UserGroup;
}

export interface SimpleTextSectionModel extends BaseSectionModel {
    title?: string;
    subtitle?: string;
    content?: string
    ctaButton?: ContentObjectModel;
}

export interface SiteConfigModel extends ContentObjectModel {
    favicon?: string;
    defaultFlow?: WizardFlowModel|string;
    header?: HeaderModel;
}

export interface GeneralPageModel extends ContentObjectModel {
    title: string;
    sections?: BaseSectionModel[];
}

export interface ContentCommonProps {
    site: SiteConfigModel;
}

export interface PageComponentCommonProps {
    site: SiteConfigModel;
    [k: string]: any;
}

export interface GenericPageComponentProps extends PageComponentCommonProps { 
    page: ContentObjectModel;   
}

export type GenericPageComponent = React.FunctionComponent<GenericPageComponentProps>;
