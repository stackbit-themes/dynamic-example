import * as React from 'react';
import Head from 'next/head';
import Header from './header';
import Footer from './footer';
import { GenericPageComponentProps } from '../../../utils/model-types';

// TODO cleanup
export default function BaseLayout(props: GenericPageComponentProps) {
    const { page, site } = props;
    const siteMeta = site.__metadata;
    const pageMeta = page.__metadata;
    return (
        <div className="page" data-sb-object-id={pageMeta.id}>
            <div className="sb-base sb-default-base-layout">
                <Head>
                    <title>{page.title}</title>
                    <meta name="description" content="Stackbit Theme" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    {site.favicon && <link rel="icon" href={site.favicon} />}
                </Head>
                {site.header && <Header {...site.header} annotationPrefix={siteMeta.id} />}
                {props.children}
                {site.footer && <Footer {...site.footer} annotationPrefix={siteMeta.id} />}
            </div>
        </div>
    );
}
