import * as React from 'react';
import Head from 'next/head';
import Header from './header';
import { SiteConfigModel } from '../../../utils/model-types';
import { ContentObjectModel } from '../../../utils/common/base-model-types';
import { sbObjectIdFor } from '../../../utils/common/utils';

interface BaseLayoutProps {
    site: SiteConfigModel;
    page?: ContentObjectModel;
    annotate?: boolean;
}

const BaseLayout: React.FunctionComponent<BaseLayoutProps> = ({
    site,
    page,
    annotate = true,
    children
}) => {
    return (
        <div className="bg-base-200 min-h-screen" {...sbObjectIdFor(annotate ? page : null)}>
            <Head>
                {page && <title>{page.title}</title>}
                {site.favicon && <link rel="icon" href={site.favicon} />}
            </Head>
            {site.header && <Header {...site.header} {...sbObjectIdFor(annotate ? site : null)} />}
            {children}
        </div>
    );
};

export default BaseLayout;
