# Stackbit Dynamic Example App

Explore [live demo](https://dynamic-stuff-e7b4f.netlify.app/).

This is a showcase of multiple capabilities your Stackbit-based websites can have, beyond what our starter themes show.

Included are some topics we've been asked about by users, plus some that people may not realize are doable (and we daresay: are even fun to build!) with Stackbit.

![Screenshot of a flow in the app](/docs/demo-flow.png)

<p align="center">
    <i>
        Photos by <a href="https://unsplash.com/@harryswales?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Harry Swales</a>, <a href="https://unsplash.com/@hectorbermudez?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Hector Bermudez</a>, <a href="https://unsplash.com/@larisabirta?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Larisa Birta</a>, <a href="https://unsplash.com/@scottwebb?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Scott Webb</a> and <a href="https://unsplash.com/@marcelalaskoski?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Marcela Laskoski</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
    </i>
</p>

## What's inside

### Built on Next.js and daisyUI

This a Next.js-based website built with [Tailwind CSS](https://tailwindcss.com/) and [daisyUI](https://daisyui.com/).

daisyUI is a fun, meticulously-done library of CSS components built on Tailwind. Its appeal (except for how nice it looks) is in how it thoughtfully [combines multiple Tailwind classes](https://twitter.com/Saadeghi/status/1443869771704029192) into a curated set meta-classes - which are easy to start with, style to your needs and build on. Please forgive any visual atrocities in this app; these are our own fault ;-)

### Authentication

We're using the excellent [NextAuth.js](https://next-auth.js.org/) package to allow easy authentication through Google & GitHub as OAuth providers.

This is used to protect pages and API routes behind authentication, to pull the user's basic details (e-mail, name and image) for display and to be able to store & fetch per-user data to a database, based on a visitor e-mail.

By default, NextAuth is using [JWT](https://jwt.io/) to authenticate user sessions, meaning that the API routes which NextAuth automatically adds to the project can issue token and validate them with no need for an external database.

More details on configuring OAuth providers to run your own server are found below.

### Database access

To store a user's answers to the onboarding wizard, we're using [Upstash Redis](https://upstash.com/). 

Redis (as in the open-source database) is very easy to pickup, robust and surprisingly powerful due to its many data structures. Upstash offer serverless Redis hosting with a free tier, and add their own REST API wrapper on top. That HTTPS API is useful for usage from API routes, which as serverless functions typically can't guarantee a persistent connection to the DB.

### Onboarding experience: wizard flows

Based on all the above, here's the main feature of this app: 

Being able to visually build & edit wizard-like flows that will appear to visitors. 

Flows can have multiple steps, each containing a set of configurable input controls. Each input control is configured to pass the entered data into a variable name in the user profile (think of the user profile as a JSON object - which is exactly how it's stored to the DB).


here the onus is on editability (TBD add pics)

### more...
5. Multiple page type - catch all, optional catch-all and specific routes - some based on model, some not (but pull the content they need), content objects having multiple views (one for the editor, one for the end user)
6. TS almost through and through

## What's coming

## Setting up locally

### basics

clone, nvm, npm i, npm run dev

### running the flow
without auth
modeled - wizard flow, step, controls - all going into the user profile when you're logged-in
(or console.log)
editor

### redis

using rest api for global access (though netlify runs in one region

## NextAuth

### Needing HTTPS
note on custom cert vs. tunnels

### Enabling sign-in with Google

**TBD** Document creating the OAuth Consent Screen + OAuth 2.0 Client ID in Credentials.
Setting Origin URI and Redirect URI.

### Enabling sign-in with GitHub

You need to create a new GitHub App:

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

---
**A note on your privacy:** 

When using the live demo of this app, we _do not collect_ the details of any logins. If you run one of the 'wizard flows' in the app as a logged-in user, the data stored is set to auto-expire in a few days - or simply click the very visible button 'Forget me'.
