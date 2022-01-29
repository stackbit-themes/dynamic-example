import React from 'react';
import BaseLayout from '../../components/pageLayouts/base';
import { GenericPageComponentProps, GenericPageComponent } from '../../utils/model-types';
import { allPagePaths, staticPropsBySlug } from '../../utils/common/props-helper';
import WizardFlowEditor from '../../components/wizard/editor/editor';
import WizardFlowRunner from '../../components/wizard/runner/runner';

export default function Page(props: GenericPageComponentProps) {
    const urlParts = props.page.__metadata.urlPath.split('/');
    const action = urlParts[urlParts.length - 1];

    let Component: GenericPageComponent;
    if (action == 'edit') {
        Component = WizardFlowEditor;
    } else if (action == 'run') {
        Component = WizardFlowRunner;
    } else {
        throw new Error(`Unknown action for URL ${props.page.__metadata.urlPath}`);
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
