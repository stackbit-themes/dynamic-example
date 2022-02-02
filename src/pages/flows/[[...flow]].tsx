import * as React from 'react';
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
import { getContentCommonProps } from '../../utils/utils';
import { isEmptyObject } from '../../utils/common/utils';
import FlowsList, { FlowsListComponent } from '../../components/wizard/list';

interface FlowPageProps extends PageComponentCommonProps {
    page?: WizardFlowModel;
}

function Hey(props) {
    return <div>Flows main page!</div>;
}

function FlowPage({ page: flow, site }: FlowPageProps) {
    let Component: typeof FlowsList | WizardFlowComponent;
    if (!flow) {
        Component = FlowsList;
    } else {
        const flowAction = (flow.__metadata as WizardFlowMetadataModel).flowAction;
        if (flowAction === 'run') {
            Component = WizardFlowRunner;
        } else if (flowAction === 'edit') {
            Component = WizardFlowEditor;
        } else {
            throw new Error(`flowAction was not set when loading content: ${flow.__metadata.id}`);
        }
    }
    return (
        <BaseLayout page={flow} site={site}>
            <Component flow={flow} />
        </BaseLayout>
    );
}

export async function getStaticPaths() {
    let paths = await staticPagePaths({ routeHandler: 'flows' });
    paths.push('/flows'); // Add the root
    console.log(`[[...flow]] getStaticPaths: ${paths}`);
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    // TODO doc
    if (isEmptyObject(params)) {
        const commonProps = await getContentCommonProps();
        const staticProps = { props: { ...commonProps } };
        console.log('[[...flow]] getStaticProps for root is:', staticProps);
        return staticProps;
    } else {
        const urlParts = ['flows', ...params.flow];
        return await staticPropsFor(urlParts);
    }
}

export default withRemoteDataUpdates(FlowPage);
