import { WizardFlowModel } from '../../../utils/model-interfaces';

export function validateFlowDefinition(flow: WizardFlowModel): string[] {
    let errors: string[] = [];
    if (!flow.steps) {
        errors.push('Flow should have at least one step');
        return;
    }

    let variableNames: string[] = [];
    flow.steps.forEach((step, index) => {
        if (!step.controls) {
            errors.push(`Step no. ${index + 1} should have at least one control`);
        } else {
            step.controls.forEach((control) => {
                const varName = control.variableName;
                if (variableNames.includes(varName)) {
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
