import React from 'react';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';
import { getComponent } from '../components/components-registry';
import { staticPagePaths, staticPropsFor } from '../utils/common/page-props-helper';
import { GenericPageComponentProps, GenericPageComponent } from '../utils/model-types';

function Page({ page, site }: GenericPageComponentProps) {
    const layout = page.layout || page.type;
    if (!layout) throw new Error(`page has no layout: ${page}`);

    const PageComponent = getComponent(layout) as GenericPageComponent;
    return <PageComponent page={page} site={site} />;
}

export async function getStaticPaths() {
    const paths = await staticPagePaths({ routeHandler: 'default' });
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    return await staticPropsFor(params.slug);
}

export default withRemoteDataUpdates(Page);
