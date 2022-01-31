import { VariableValuesMap } from "../../components/wizard/types";
import { get, set } from "./upstash";

export const upstashHost = "global-immune-mosquito-31634.upstash.io";
export const upstashToken = "AXuSASQgZDQyYmEzZTYtMGI4Ni00Y2YwLTliOTQtNjg2NzdmNGQ5YmQ3ZGRlOTU3MjhhNDk1NDVjNDg4ZWY5ZDRiMTczYTEwYWU="; 

function userFlowKey(email: string) {
    return `user:${email}:flow-variables`;
}

export async function storeUserFlow(email: string, variablesValues: VariableValuesMap) {
    const v = JSON.stringify(variablesValues);
    await set(userFlowKey(email), variablesValues);
}

export async function fetchUserFlow(email: string): Promise<VariableValuesMap|null> {
    return await get(userFlowKey(email));
}
