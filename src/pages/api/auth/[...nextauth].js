import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
//import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ]
});
