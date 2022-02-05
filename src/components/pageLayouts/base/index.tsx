import * as React from 'react';
import Head from 'next/head';
import Header from './header';
import { SiteConfigModel } from '../../../utils/model-types';
import { ContentObjectModel } from '../../../utils/common/base-model-types';
import { sbObjectIdFor } from '../../../utils/common/utils';

// TODO Move to extending commonProps? - and maybe stuff all the common under props.common...
interface BaseLayoutProps {
    site: SiteConfigModel;
    page?: ContentObjectModel;
}

const BaseLayout: React.FunctionComponent<BaseLayoutProps> = ({ site, page, children }) => {
    return (
        <div className="page base-layout bg-base-200 min-h-screen" {...sbObjectIdFor(page)}>
            <Head>
                {page && <title>{page.title}</title>}
                {site.favicon && <link rel="icon" href={site.favicon} />}
            </Head>
            {site.header && <Header {...site.header} {...sbObjectIdFor(site)} />}
            {children}
        </div>
    );
};

export default BaseLayout;
