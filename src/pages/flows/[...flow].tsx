import * as React from 'react';
import BaseLayout from '../../components/pageLayouts/base/base';
import {
    WizardFlowMetadataModel,
    WizardFlowModel,
    PageComponentCommonProps
} from '../../utils/model-types';
import { staticPagePaths, staticPropsFor } from '../../utils/common/page-props-helper';
import WizardFlowEditor from '../../components/flows/editor/editor';
import WizardFlowRunner from '../../components/flows/runner/runner';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';
import { WizardFlowComponent } from '../../components/flows/types';

interface SingleFlowPageProps extends PageComponentCommonProps {
    page: WizardFlowModel;
}

const FlowPage: React.FunctionComponent<SingleFlowPageProps> = (props) => {
    const { page: flow, site } = props;

    let Component: WizardFlowComponent;
    let annotate: boolean;
    const flowAction = (flow.__metadata as WizardFlowMetadataModel).flowAction;
    if (flowAction === 'run') {
        Component = WizardFlowRunner;
        annotate = false;
    } else if (flowAction === 'edit') {
        Component = WizardFlowEditor;
        annotate = true;
    } else {
        throw new Error(`flowAction was not set when loading content: ${flow.__metadata}`);
    }
    return (
        <BaseLayout page={flow} site={site} annotate={annotate}>
            <Component flow={flow} />
        </BaseLayout>
    );
};

export async function getStaticPaths() {
    let paths = await staticPagePaths({ routeHandler: 'flows' });
    console.log(`[[...flow]] getStaticPaths: ${paths}`);
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const urlParts = ['flows', ...params.flow];
    return await staticPropsFor(urlParts);
}

export default withRemoteDataUpdates(FlowPage);
