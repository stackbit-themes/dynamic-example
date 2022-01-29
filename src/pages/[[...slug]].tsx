import React from 'react';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';
import { getComponent } from '../components/components-registry';
import { allPagePaths, staticPropsBySlug } from '../utils/common/props-helper';
import { GenericPageComponentProps, GenericPageComponent } from '../utils/model-types';

function Page(props: GenericPageComponentProps) {
    const { page, site } = props;
    const { layout } = page;
    if (!layout) throw new Error(`page has no layout: ${page}`);

    const PageComponent = getComponent(layout) as GenericPageComponent;
    if (!PageComponent) throw new Error(`No page component found for layout: ${layout}`);

    return <PageComponent page={page} site={site} />;
}

export async function getStaticPaths() {
    const paths = await allPagePaths('default');
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    return await staticPropsBySlug(params.slug);
}

export default withRemoteDataUpdates(Page);
