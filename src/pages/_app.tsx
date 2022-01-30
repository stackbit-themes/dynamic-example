/*
    A custom App component (see https://nextjs.org/docs/advanced-features/custom-app).
    Used to load global CSS.
*/
import '../css/main.css';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}
