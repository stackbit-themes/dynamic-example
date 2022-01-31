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
    finishedFlow?: string;
    flowData?: { [k: string]: string | number | boolean | null; };
}
