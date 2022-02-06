import { WizardControlValue } from "../components/flows/controls/types";
import { VariableValues } from "../components/flows/types";

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
    flowData?: VariableValues;
}

export async function deleteUserFlowData() {
    await fetch('/api/userFlow', {
        method: 'DELETE'
    });
}

export async function storeUserFlowData(variableValues: VariableValues) {
    console.log('storeUserFlowData', variableValues);
    await fetch('/api/userFlow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(variableValues)
    });
}
