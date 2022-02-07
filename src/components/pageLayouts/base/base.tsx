import * as React from 'react';
import Head from 'next/head';
import Header from './header';
import { SiteConfigModel } from '../../../utils/model-types';
import { ContentObjectModel } from '../../../utils/common/base-model-types';
import { sbFieldPath, sbObjectIdFor } from '../../../utils/common/utils';

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
        <div className="bg-base-200 min-h-screen">
            <Head>
                {page && <title>{page.title}</title>}
                {site.favicon && <link rel="icon" href={site.favicon} />}
            </Head>
            {site.header && (
                <Header
                    {...site.header}
                    {...sbObjectIdFor(annotate ? site : null)}
                    {...sbFieldPath(annotate ? 'header' : null)}
                />
            )}
            <div {...sbObjectIdFor(annotate ? page : null)}>{children}</div>
        </div>
    );
};

export default BaseLayout;
