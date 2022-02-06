import NextAuth from 'next-auth';
import { Provider } from 'next-auth/providers';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { isDev } from '../../../utils/common/page-utils';

const providers: Provider[] = [
    GoogleProvider({
        clientId: isDev ? process.env.DEV_GOOGLE_CLIENT_ID : process.env.PROD_GOOGLE_CLIENT_ID,
        clientSecret: isDev
            ? process.env.DEV_GOOGLE_CLIENT_SECRET
            : process.env.PROD_GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
        clientId: isDev ? process.env.DEV_GITHUB_CLIENT_ID : process.env.PROD_GITHUB_CLIENT_ID,
        clientSecret: isDev
            ? process.env.DEV_GITHUB_CLIENT_SECRET
            : process.env.PROD_GITHUB_CLIENT_SECRET
    })
];

providers.forEach((provider) => {
    if (provider.type === "oauth") {
        if (!provider.options.clientId || !provider.options.clientSecret)
            console.log(`NOTE: clientId/clientSecret not set for provider: ${provider.name} (is dev: ${isDev})`, provider);
    }
})

let nextAuthSecret = process.env.NEXTAUTH_SECRET;
/*
if (!nextAuthSecret && !isDev) {
    // TODO get rid of this (and ofc don't use this secret)
    console.log('NOTE: NEXTAUTH_SECRET not set in production! using a default value which is NOT GOOD');
    nextAuthSecret = 'FRZZrUI2BprpVUYnDZNnjffVKEYTxwZ9VPDGQxQWcDw='
}
*/

export default NextAuth({
    providers,
    secret: nextAuthSecret
});
