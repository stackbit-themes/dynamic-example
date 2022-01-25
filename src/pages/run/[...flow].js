import React from 'react';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { resolveStaticProps } from '../../utils/static-props-resolvers';

export default function Page(props) {
    const { page, site } = props;
    return <div>This page is for {JSON.stringify(page)}</div>;
}

function objectsToUrls(data, modelName, prefix = '') {
    const relevantObjects = data.objects.filter((o) => {
        return o.__metadata.modelName === modelName;
    });
    const paths = relevantObjects.map((o) => {
        return prefix + o.__metadata.urlPath;
    });
    return paths;
}

function slugToUrl(slug) {
    return '/' + slug.join('/');
}

export async function getStaticPaths() {
    const data = await sourcebitDataClient.getData();
    const paths = objectsToUrls(data, 'WizardFlowLayout', '/run');
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const data = await sourcebitDataClient.getData();
    const urlPath = slugToUrl(params.flow);
    const props = await resolveStaticProps(urlPath, data);
    return { props };
}
