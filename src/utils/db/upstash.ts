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

export async function set(k: string, v: any): Promise<void> {
    console.log(`SET k: ${k}, v: ${JSON.stringify(v)}`)
    const res = await fetch(`https://${upstashHost}/set/${encodeURIComponent(k)}`, {
        method: 'POST',
        body: JSON.stringify(v),
        headers: {
            Authorization: "Bearer " + upstashToken
        }
    });
    const json = await res.json(); // TODO check response
    console.log("SET result", json)
}