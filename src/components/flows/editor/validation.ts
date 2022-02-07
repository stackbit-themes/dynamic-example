import { isDev } from '../../../utils/common/page-utils';
import { WizardFlowModel } from '../../../utils/model-types';

export function validateFlowDefinition(flow: WizardFlowModel): string[] {
    let errors: string[] = [];

    if (!isDev) {
        errors.push('Editing flows is not available in production mode. Please edit this page in Stackbit :-)');
        return errors;
    }

    if (!flow.steps?.length) {
        errors.push('Flow should have at least one step');
        return errors;
    }

    let variableNames: string[] = [];
    flow.steps.forEach((step, controlIndex) => {
        if (!step.controls?.length) {
            errors.push(`Step no. ${controlIndex + 1} should have at least one control`);
        } else {
            step.controls.forEach((control) => {
                const varName = control.variableName;
                if (!varName) {
                    errors.push(
                        `Control "${control.label}" in step no. ${controlIndex + 1} has no variable name`
                    );
                } else if (variableNames.includes(varName)) {
                    errors.push(
                        `Variable name ${varName} is used for more than one control in this flow`
                    );
                } else {
                    variableNames.push(varName);
                }
            });
        }
    });
    return errors;
}
