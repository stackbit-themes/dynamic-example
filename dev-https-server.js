/*
    Running a Next.js dev server on HTTPS, with a self-signed SSL certificate.
    Useful for locally testing authentication providers with NextAuth.
    There are a few variants of this code online, I've used 
    https://anmagpie.medium.com/secure-your-local-development-server-with-https-next-js-81ac6b8b3d68
*/
const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
if (!dev) throw new Error('This script is not meant for production');

/* Needed locally */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const port = 3000;
const serverUrl = `https://localhost:${port}`;

if (!process.env.NEXTAUTH_URL) {
    process.env.NEXTAUTH_URL = serverUrl;
    console.log(
        `Note: NEXTAUTH_URL env variable was not set, setting default: ${process.env.NEXTAUTH_URL}`
    );
}

const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
    key: fs.readFileSync('./certificates/key.pem'),
    cert: fs.readFileSync('./certificates/cert.pem')
};

app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port, (err) => {
        if (err) throw err;
        console.log(`🔒 HTTPS server ready on ${serverUrl}`);
    });
});
