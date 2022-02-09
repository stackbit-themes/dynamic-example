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

## What's included

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

Flows are based on structured content ([model definitions here](https://github.com/stackbit/dynamic-example-app/tree/main/.stackbit/models/flows)), which makes them fully editable in Stackbit:

![Editing a wizard flow in Stackbit](/docs/edit-flow.png)

Each content object of type `WizardFlow` has two pages generated for it: one dedicated to the editor, and for one running it (to preview the flow, or when a visitor starts the flow). Head to the [list of flows](https://dynamic-stuff-e7b4f.netlify.app/flows) to see all links.

Note that the example app by default shows the edit view in the live website as well - this is easily disabled, and no one can edit the flows in the live website anyway: all pages are statically-generated in the production build.

### And more...

To implement the above functionality, plus a few other smaller features (e.g. having a user profile view; general text sections which can be set to appear for everyone / logged-in users / anonymous users), the codebase includes various ways to code a page route with Next.js & Stackbit:

- Pages handled by the default top-level catch-all route `src/pages/[[...slug]].tsx`.
- Pages handled by a specialized catch-all route: `src/pages/flows/[...slug].tsx`
- Pages that have fixed route and no content model representing them in the CMS: `src/pages/flows/index.tsx` and `src/pages/user/index.tsx`. These pages pull in just the content they need to function.

## What's coming

There are more examples in the pipeline, plus a brand new way to model content that has first-class support for Typescript.

If you'd like to see something added to the example, or have any questions, hit us on [Twitter](https://twitter.com/stackbit) or [Discord](https://discord.gg/HUNhjVkznH).

## Setting up locally

_(expect more here soon...)_

### The basics

Clone the repository & switch to the `preview` branch:

```
git clone git@github.com:stackbit/dynamic-example-app
cd dynamic-example-app
git checkout preview
```

If you have `nvm` installed, run `nvm use` to ensure you're using the recommended version of Node & NPM.

Let's run the website, without configuring any authentication providers yet.

`npm run dev`

Navigate to `localhost:3000` and you should be able to see the list of flows and run through them. When you finish a flow the result user profile data won't be stored anywhere - only logged to the browser's console.

### Configuring Upstash Redis

Head to [Upstash](https://upstash.com/) and create a free Redis database.

Grab the hostname and token for the REST API endpoint of your database, and set them to the environment variables `DEV_UPSTASH_REDIS_HOST` and `DEV_UPSTASH_REDIS_TOKEN` (either in the terminal or in a new `.env.local` file).

### Configuring authentication

This part is more involved, mostly since you'll have to correctly setup any auth provider separately.
You'd also need to provide an HTTPS URL in your website that auth providers will redirect users back to.

#### Starting an HTTPS web server

Since a local dev server doesn't have certificates (let alone trusted ones), you got two options:

**(1) The cumbersome DIY method:** generate a cert locally and run `npm run dev-https` to start Next.js as an HTTPS server.

The browser would complain, but let you navigate to your website if you insist on it (or at least, Chrome will; to work with Safari on a mac you'd need to add the cert to your OS keychain, or better yet - generate it through the Keychain app, from which you can then export it).

**(2) The easier method:** use a tunnel application such as [ngrok](https://ngrok.com/) (requires free registration) to get an HTTPS host:port to proxy your plain HTTP local server.

The free plan with such solutions usually won't let you have a fixed address, so you'll have to re-configure the auth providers with the new URL. For a few bucks a month, however, they'd be glad to let you have a fixed address. Of course, keep in mind that this address is **public**.

If you're using the latter method, you'd need to let NextAuth know the public URL to your website by setting `NEXTAUTH_URL` (see the [docs](https://next-auth.js.org/configuration/options#nextauth_url)).

#### Configuring OAuth authentication with GitHub

You need to create a new GitHub App. Of course, GitHub apps can do much more than authentication, but for our needs we only need that part.

1. Go to https://github.com/settings/apps and click "New GitHub App"
1. Set the **GitHub App Name** to whatever you want, and set the **Homepage URL** to the root of your website. This needs to be some _publicly-available_ URL that you own (e.g. the live URL of any website you've created with Stackbit).
1. Set the **Callback URL**. This should be `https://<host:port>/api/auth/callback/github`. If you're running HTTPS locally, that's `https://localhost:3000/api/auth/callback/github`
1. Check `Request user authorization (OAuth) during installation`
1. De-activate the **Webhook**.
1. Under **User permissions**, locate **Email addresses** and set the access level to **Read-only** (default is no access). That's the only permission we need.
1. Decide whether the app should be installed only for users in your organization, or everyone with a GitHub account.
1. Click "Create GitHub App".

After the app is created, you'll need to go back to editing it for a few final steps:

1. Generate a client secret, and make sure to copy its value and keep it safely.
1. Copy the Client ID at the top.
1. Set the following env variables in your terminal or in .env.local:

```
DEV_GITHUB_CLIENT_ID=<Client ID mentioned of the GitHub app>
DEV_GITHUB_CLIENT_SECRET=<Client secret you've created for the app and kept>
```

#### Configuring OAuth authentication with Google

With Google the process is a bit weird, but we won't leave you completely empty-handed with no guidance.

First, you'd need to configure the [OAuth Consent Screen](https://console.developers.google.com/apis/credentials/consent) for your app. This requires a free user and a project in Google Cloud.

Make sure to:

1. Enter a publicly-available URL set in _Authorised domains
   _.
1. Under _scopes_, select only `.../auth/userinfo.email` and `.../auth/userinfo.profile`. These are considered non-sensitive scopes, so your app won't have to go through verification to go live.
1. You can now _publish_ the app so that anyone (with a Google-managed email) could use it to authenticate themselves.

Once the OAuth Consent Screen is set up, let's get some actual credentials (client ID & client secret) by [going here](https://console.developers.google.com/apis/credentials).

1. Click _Create Credentials_ and select _OAuth Client ID_.
1. As the **Application Type** choose _Web Application_.
1. For **Authorised JavaScript origins**, enter the root URL of your website (whether that's on `https://localhost:3000` or through a tunnel).
1. For **Authorised redirect URIs** fill in `https://<host:port>/api/auth/callback/google`. If you're running HTTPS locally, that's `https://localhost:3000/api/auth/callback/google`.
1. Save and download the credentials.

Set the client ID to the `DEV_GOOGLE_CLIENT_ID` env. variable, and the secret to `DEV_GOOGLE_CLIENT_SECERT`.

#### Debugging authentication & other API issues

When working locally you will generally see useful error messages in your terminal, coming from the API routes that NextAuth manages.

This also applies to the other API routes this example adds, which store and retrieve user profile data.

However, when you deploy your application to production, you'll need access to the server-side logs of these API routes.

If you deploy on Netlify, that means activating a Log Drain to Datadog - which works well but is currently an Enterprise plan feature. On Vercel, you can view realtime logs and failed invocations on any plan, and there are currently more logging integrations available.

---

**A note on your privacy:**

When using the live demo of this app, we _do not collect_ the details of any logins. If you run one of the 'wizard flows' in the app as a logged-in user, the data stored is set to auto-expire in a few days - or simply click the very visible button 'Forget me'.
