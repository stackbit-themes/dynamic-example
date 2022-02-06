const upstashHost = process.env.UPSTASH_REDIS_HOST;
const upstashToken = process.env.UPSTASH_REDIS_TOKEN;

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