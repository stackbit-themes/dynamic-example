import React from 'react';
import BaseLayout from '../../components/pageLayouts/base';
import {
    WizardFlowMetadataModel,
    WizardFlowModel,
    PageComponentCommonProps,
    WizardFlowComponent
} from '../../utils/model-types';
import { staticPagePaths, staticPropsFor } from '../../utils/common/page-props-helper';
import WizardFlowEditor from '../../components/wizard/editor/editor';
import WizardFlowRunner from '../../components/wizard/runner/runner';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';

interface FlowPageProps extends PageComponentCommonProps {
    page: WizardFlowModel;
}

function Page({ page: flow, site }: FlowPageProps) {
    const flowAction = (flow.__metadata as WizardFlowMetadataModel).flowAction;

    let FlowComponent: WizardFlowComponent;
    if (flowAction === 'run') {
        FlowComponent = WizardFlowRunner;
    } else if (flowAction === 'edit') {
        FlowComponent = WizardFlowEditor;
    } else {
        throw new Error(`flowAction was not set when loading content: ${flow.__metadata.id}`);
    }

    return (
        <BaseLayout page={flow} site={site}>
            <FlowComponent flow={flow} />
        </BaseLayout>
    );
}

export async function getStaticPaths() {
    const paths = await staticPagePaths({ routeHandler: 'flows' });
    console.log('[...flow getStatisPaths] paths:', paths);
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const slug = ['flows', ...params.flow];
    return await staticPropsFor(slug);
}

export default withRemoteDataUpdates(Page);
