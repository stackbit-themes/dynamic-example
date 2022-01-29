/*
    A custom App component (see https://nextjs.org/docs/advanced-features/custom-app).
    Used to load global CSS.
*/
import '../css/main.css';
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
