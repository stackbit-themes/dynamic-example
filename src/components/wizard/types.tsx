import { WizardStepModel } from '../../utils/model-types';
import { WizardControlValue } from './controls/types';

export interface WizardStepProps extends WizardStepModel {
    onVarsChange: (vars: Record<string, WizardControlValue>) => void;
    onValidityChange: (isValid: boolean) => void;
}

export type VariableValuesMap = Record<string, WizardControlValue>;

export type WizardStepComponent = (props: WizardStepProps) => JSX.Element;
