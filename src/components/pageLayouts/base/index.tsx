import * as React from 'react';
import Head from 'next/head';
import Header from './header';
import Footer from './footer';
import { GenericPageComponentProps } from '../../../utils/model-types';

// TODO make usable without a page model? (e.g. for sign-in page)

export default function BaseLayout(props: GenericPageComponentProps) {
    const { page, site } = props;
    const siteMeta = site.__metadata;
    const pageMeta = page.__metadata;
    return (
        <div className="page" data-sb-object-id={pageMeta.id}>
            <div className="base-layout">
                <Head>
                    <title>{page.title}</title>
                    {site.favicon && <link rel="icon" href={site.favicon} />}
                </Head>
                {site.header && <Header {...site.header} annotationPrefix={siteMeta.id} />}
                {props.children}
            </div>
        </div>
    );
}
