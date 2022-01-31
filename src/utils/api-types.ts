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
