import { VariableValuesMap } from "../../components/wizard/types";
import { del, get, set } from "./upstash";

function userFlowKey(email: string) {
    return `user:${email}:flow-variables`;
}

export async function storeUserFlow(email: string, variablesValues: VariableValuesMap) {
    const v = JSON.stringify(variablesValues);
    await set(userFlowKey(email), variablesValues);
}

export async function deleteUserFlow(email: string) {
    await del(userFlowKey(email));
}

export async function fetchUserFlow(email: string): Promise<VariableValuesMap|null> {
    return await get(userFlowKey(email));
}
