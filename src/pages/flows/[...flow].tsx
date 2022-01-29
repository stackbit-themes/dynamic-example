import React from 'react';
import BaseLayout from '../../components/pageLayouts/base';
import { GenericPageComponentProps, GenericPageComponent } from '../../utils/model-types';
import { allPagePaths, staticPropsBySlug } from '../../utils/common/props-helper';
import WizardFlowEditor from '../../components/wizard/editor/editor';
import WizardFlowRunner from '../../components/wizard/runner/runner';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';

function Page(props: GenericPageComponentProps) {
    const urlParts = props.page.__metadata.urlPath.split('/');
    const action = urlParts[urlParts.length - 1];

    let Component: GenericPageComponent;
    Component = WizardFlowEditor;
    if (props.page.__metadata.urlPath.match(/^\/flows\/\w+\/run\/?$/)) {
        Component = WizardFlowRunner;
    } else {
        Component = WizardFlowEditor;
    }

    return (
        <BaseLayout page={props.page} site={props.site}>
            <Component {...props} />
        </BaseLayout>
    );
}

export async function getStaticPaths() {
    const paths = await allPagePaths('flows');
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const slug = ['flows', ...params.flow];
    return await staticPropsBySlug(slug);
}

export default withRemoteDataUpdates(Page);
