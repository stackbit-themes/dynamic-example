import { isDev } from "../common/page-utils";

const upstashHost = isDev ? process.env.DEV_UPSTASH_REDIS_HOST : process.env.PROD_UPSTASH_REDIS_HOST;
const upstashToken = isDev ? process.env.DEV_UPSTASH_REDIS_TOKEN : process.env.PROD_UPSTASH_REDIS_TOKEN;

if (!upstashHost || !upstashToken)
    console.log(`NOTE: host/token not set for Upstash Redis (is dev: ${isDev})`);

export async function get(k: string): Promise<any | null> {
    const keyName = encodeURIComponent(k);
    const res = await fetch(`https://${upstashHost}/get/${keyName}`, {
        headers: {
            Authorization: "Bearer " + upstashToken
        }
    });
    let json = await res.json();
    if (json.result) {
        return JSON.parse(json.result);
    } else {
        return null;
    }
}

export async function set(k: string, v: any, expirySeconds?: number): Promise<void> {
    let endpoint = `https://${upstashHost}/set/${encodeURIComponent(k)}`;
    if (expirySeconds) endpoint = `${endpoint}?EX=${expirySeconds}`;

    const res = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(v),
        headers: {
            Authorization: "Bearer " + upstashToken
        }
    });
    const json = await res.json();
}

export async function del(k: string): Promise<void> {
    const res = await fetch(`https://${upstashHost}/del/${encodeURIComponent(k)}`, {
        headers: {
            Authorization: "Bearer " + upstashToken
        }
    });
    const json = await res.json();
}