/*
    Custom Document component (see https://nextjs.org/docs/advanced-features/custom-document).
    
    Currently used to set a DaisyUI theme globally, by setting the data-theme attribute on the top-level
    <html> tag (see https://daisyui.com/docs/default-themes). The <html> tag is not accesible elsewhere.
*/
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import ThemeConfig from '../../content/data/theme.json';

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        initialProps['theme'] = ThemeConfig.theme || 'light';
        return initialProps;
    }

    render() {
        return (
            <Html data-theme={this.props['theme']}>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
