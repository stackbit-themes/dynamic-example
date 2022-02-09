# Configuring authentication

Here's how to get authentication running with your own instance of the example app.

This part is more involved, mostly since you'll have to correctly setup for each auth provider you want to support.

You'll also need to provide an HTTPS URL in your website that auth providers will redirect users back to.

## Starting an HTTPS web server

Since a local dev server doesn't have certificates (let alone trusted ones), you got two options:

**(1) The DIY method:** generate a cert locally and run `npm run dev-https` to start Next.js as an HTTPS server.

The browser would complain, but let you navigate to your website if you insist on it (or at least, Chrome will; to work with Safari on a Mac you'd need to add the cert to your OS keychain, or better yet - generate it through the Keychain app, from which you can then export it).

**(2) The easier method:** use a tunnel application such as [ngrok](https://ngrok.com/) (requires free registration) to get an HTTPS host:port to proxy your plain HTTP local server.

Tunneling solutions typically won't let you have a fixed address with their free plan, so you'll have to re-configure the auth providers with the new URL each time it changes. Of course, keep in mind that you get a **public address**.

If you're using the tunnel method, you'd need to let NextAuth know the public URL to your website by setting `NEXTAUTH_URL` (see the [docs](https://next-auth.js.org/configuration/options#nextauth_url)).

## Configuring OAuth authentication with GitHub

You need to create a new GitHub App. Of course, GitHub apps can do much more than authentication, but for our needs we only need that part.

1. Go to https://github.com/settings/apps and click _New GitHub App_.
1. Set the **GitHub App Name** to whatever you want. Set the **Homepage URL** to to a _publicly-available_ URL that you own (e.g. the live URL of any website you've created with Stackbit).
1. Set the **Callback URL** to `https://<host:port>/api/auth/callback/github`. If you're running HTTPS locally, that's `https://localhost:3000/api/auth/callback/github`.
1. Enable **Request user authorization (OAuth) during installation**.
1. Disable the **Webhook**.
1. Under **User permissions**, locate **Email addresses** and set the access level to **Read-only** (the default is no access). That's the only permission we need.
1. Decide whether the app should be installable only by users in your organization, or by everyone with a GitHub account.
1. Click _Create GitHub App_.

After the app is created, you'll need to go back to editing it for a few final steps:

1. Generate a client secret, and make sure to copy its value and keep it safely.
1. Copy the Client ID at the top.
1. Set the following env variables, either in your terminal window or in `.env.local`:

```
DEV_GITHUB_CLIENT_ID=<Client ID>
DEV_GITHUB_CLIENT_SECRET=<Client secret>
```

## Configuring OAuth authentication with Google

First, you'd need to configure the [OAuth Consent Screen](https://console.developers.google.com/apis/credentials/consent) for your app. This requires a free user and a project on Google Cloud.

Make sure to:

1. Enter a publicly-available URL under _Authorised domains_.
1. Under _scopes_, select only _.../auth/userinfo.email_ and _.../auth/userinfo.profile_. These are considered non-sensitive scopes, so your OAuth app won't have to go through verification before being published live.
1. You can now _publish_ the app so that anyone (with a Google-managed email) could use it to authenticate themselves.

Once the OAuth Consent Screen is set up, let's get some actual credentials (client ID & client secret) by [going here](https://console.developers.google.com/apis/credentials).

1. Click _Create Credentials_ and select _OAuth Client ID_.
1. As the **Application Type** choose _Web Application_.
1. For **Authorised JavaScript origins**, enter the root URL of your website (whether that's `https://localhost:3000` or through a tunnel).
1. For **Authorised redirect URIs** fill in `https://<host:port>/api/auth/callback/google`. If you're running HTTPS locally, that's `https://localhost:3000/api/auth/callback/google`.
1. Save and download the credentials.

Set the client ID to the `DEV_GOOGLE_CLIENT_ID` environment variable, and the secret to `DEV_GOOGLE_CLIENT_SECERT`.

## Debugging authentication & other API issues

When working locally you will generally see useful error messages in your terminal, coming from the API routes that NextAuth manages. This also applies to the other API routes this example adds, which store and retrieve user profile data.

However, when you deploy your application to production you'll need access to the server-side logs of these API routes.

If you deploy on Netlify, that means activating a Log Drain to Datadog - which works well but is currently an Enterprise plan feature. On Vercel, you can view realtime logs and failed invocations on any plan, and there are currently more logging integrations available.
