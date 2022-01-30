# Stackbit Dynamic Example App

**TBD** write-up :-)

## NextAuth

### Creating a trusted localhost certificate

**TBD** Write details of how to generate and make it trusted on the mac (at least by Safari?)
This differs a bit in current OS versions vs. existing articles online.

### Creating a GitHub App for enabling sign-in with GitHub

1. Go to https://github.com/settings/apps and click "New GitHub App"
1. Set the **GitHub App Name** to whatever you want, and set the **Homepage URL** to the root of your live website (even if it's not the final production deployment - it just needs to be a publicly-accessible URL).
1. Set the Callback URL. For testing locally this should be `https://localhost:3000/api/auth/callback/github`, otherwith `<domain>/api/auth/callback/github`.
1. Check `Request user authorization (OAuth) during installation`
1. De-activate the **Webhook**.
1. Under **User permissions**, locate **Email addresses** and set the access level to **Read-only** (default is no access).
1. Decide whether the app should be installed only for users in your organization, or everyone with a GitHub account.
1. Click "Create GitHub App".

**Final setup steps after the app is created:**

1. Generate a client secret and make sure to copy its value and keep it safely.
1. Also take note of the Client ID at the top.
1. Scroll down to "Private keys" and generate a key.

**Setting up the project:**

In `src/pages/api/auth/[...nextauth].js` add the GitHub provider:

```
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export default NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ]
});
```

Set the following env variables in your terminal or in .env.local (or in your deployment provider)

```
GITHUB_CLIENT_ID=<Client ID mentioned of the GitHub app>
GITHUB_CLIENT_SECRET=<Client secret you've created for the app and kept>
```

For local testing, you can now run a local HTTPS server via `npm run dev-https`.
This requires having a trusted self-signed certificate (TBD instructions for Mac + Safari above).
