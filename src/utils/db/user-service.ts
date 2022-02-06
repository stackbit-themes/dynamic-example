import { VariableValues } from "../../components/flows/types";
import { del, get, set } from "./upstash";

// By default, auto-expire user flow data after 7 days
const USER_DATA_EXPIRY_SECONDS = parseInt(process.env.USER_DATA_EXPIRY_SECONDS) || 604800;

function userFlowKey(email: string) {
    return `user:${email}:flow-variables`;
}

export async function storeUserFlow(email: string, variablesValues: VariableValues) {
    const v = JSON.stringify(variablesValues);
    await set(userFlowKey(email), variablesValues, USER_DATA_EXPIRY_SECONDS);
}

export async function deleteUserFlow(email: string) {
    await del(userFlowKey(email));
}

export async function fetchUserFlow(email: string): Promise<VariableValues|null> {
    return await get(userFlowKey(email));
}
