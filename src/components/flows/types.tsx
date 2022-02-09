import { WizardFlowModel, WizardStepModel } from '../../utils/model-types';
import { WizardControlValue } from './controls/types';

export type VariableValues = Record<string, WizardControlValue>;

export interface WizardFlowComponentProps {
    flow: WizardFlowModel;
}
export type WizardFlowComponent = React.FunctionComponent<WizardFlowComponentProps>;

export interface WizardStepProps extends WizardStepModel {
    onVarsChange?: (vars: Record<string, WizardControlValue>) => void;
    onValidityChange?: (isValid: boolean) => void;
    annotate: boolean;
}
export type WizardStepComponent = React.FunctionComponent<WizardStepProps>;
