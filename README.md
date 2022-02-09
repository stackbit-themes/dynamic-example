# Stackbit Dynamic Example App

This is a showcase of multiple capabilities your Stackbit-based websites can have, beyond what our starter themes show.

Included are some topics we've been asked about by users, plus some that people may not realize are doable (and we daresay: are even fun to build!) with Stackbit.

A [live demo](https://dynamic-stuff-e7b4f.netlify.app/) is available.

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

By default, NextAuth is using [JWT](https://jwt.io/) to authenticate user sessions, meaning that the API routes which NextAuth automatically adds to the project can issue tokens and validate them without needing an external database.

More details on configuring OAuth providers to run your own server are found below.

### Database access

To store a user's answers to the onboarding wizard, we're using [Upstash Redis](https://upstash.com/).

Redis (as in the open-source database) is very easy to pickup, robust and surprisingly powerful due to its many data structures. Upstash offer serverless Redis hosting with a free tier, and add their own REST API wrapper on top. That HTTPS API is useful for usage from API routes, which as serverless functions typically can't guarantee a persistent connection to the DB.

### Onboarding experience: wizard flows

Based on all the above, here's the main feature of this app: <br/>
Being able to visually build & edit wizard-like flows that will appear to visitors.

![Editing a wizard flow in Stackbit](/docs/edit-flow.png)

- Flows can have multiple steps, each containing a set of configurable input controls. Each input control is configured to pass the entered data into a variable name in the user profile (think of the user profile as a JSON object - which is exactly how it's stored to the DB).

- Flows are based on structured content models ([see model definitions here](https://github.com/stackbit/dynamic-example-app/tree/master/.stackbit/models/flows)), making them fully editable in Stackbit.

- Each content object of type `WizardFlow` has two pages generated for it: one to edit it, and the other to run it. The [/flows](https://dynamic-stuff-e7b4f.netlify.app/flows) page links to all existing flows.

- By default, the app shows the flow editor pages in the live website as well. This is easily disabled, and no one can edit the flows in the live website anyway: all pages are statically-generated in the production build!

Effectively, what you get is a _**"meta editor"**_: using Stackbit to construct a domain-specific editor interface for content creators.

### And more...

To implement the above functionality, plus a few other smaller features (e.g. having a user profile view; general text sections which can be set to appear for everyone / logged-in users / anonymous users), the codebase includes various ways to code a page route with Next.js & Stackbit:

- Pages handled by the default top-level catch-all route `src/pages/[[...slug]].tsx`.
- Pages handled by a specialized catch-all route: `src/pages/flows/[...slug].tsx`
- Pages that have a fixed route and no content model representing them in the CMS: `src/pages/flows/index.tsx` and `src/pages/user/index.tsx`. These pages pull in just the content they need to function.

## What's coming

There are more examples in the pipeline, plus a brand new way to model content that has first-class support for Typescript.

If you'd like to see something added to the example, or have any questions, hit us on [Twitter](https://twitter.com/stackbit) or [Discord](https://discord.gg/HUNhjVkznH).

## Setting up locally

### The basics

Clone the repository & switch to the `preview` branch:

```
git clone git@github.com:stackbit/dynamic-example-app
cd dynamic-example-app
git checkout preview
```

If you have `nvm` installed, run `nvm use` to ensure you're using the recommended versions of Node & NPM.

Let's run the website, without configuring any authentication providers yet:

`npm run dev`

Navigate to `localhost:3000` and you should be able to see the list of flows and run through them. When you finish a flow, the result user profile data won't be stored anywhere - only logged to the browser's console.

### Configuring the user profile DB & authentication

First, head to [Upstash](https://upstash.com/) and create a free Redis database.

Grab the hostname and token for the REST API endpoint of your database, and set them to the environment variables `DEV_UPSTASH_REDIS_HOST` and `DEV_UPSTASH_REDIS_TOKEN` (either in the terminal or in a new `.env.local` file).

Then, go through the dedicated guide to [configuring authentication](/docs/auth.md).

---

**A note on your privacy:**

When using the live demo of this app, we _do not collect_ the details of any logins. If you run one of the 'wizard flows' in the app as a logged-in user, the data stored is set to auto-expire in a few days - or simply click the very visible button 'Forget me'.
