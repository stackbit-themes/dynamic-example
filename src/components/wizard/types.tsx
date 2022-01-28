import { WizardStepModel } from '../../utils/model-interfaces';
import { WizardControlValue } from './controls/types';

export interface WizardStepProps extends WizardStepModel {
    onVarsChange: (vars: Record<string, WizardControlValue>) => void;
    onValidityChange: (isValid: boolean) => void;
}
