import { WizardControlValue } from "../components/wizard/controls/types";
import { VariableValuesMap } from "../components/wizard/types";

export interface ApiBaseResponse {
    success: boolean;
    errorMessage?: string;
}

export interface ApiUserResponse extends ApiBaseResponse {
    user?: ApiUserData;
}

export interface ApiUserData {
    name?: string;
    email?: string;
    image?: string;
    flowData?: VariableValuesMap;
}

export async function deleteUserFlowData() {
    console.log('deleteUserFlowData');
    await fetch('/api/userFlow', {
        method: 'DELETE'
    });
}

export async function storeUserFlowData(variableValues: VariableValuesMap) {
    console.log('storeUserFlowData', variableValues);
    await fetch('/api/userFlow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(variableValues)
    });
}
