import * as React from 'react';
import BaseLayout from '../../components/pageLayouts/base';
import { PageComponentCommonProps, WizardFlowModel } from '../../utils/model-types';
import { getContentCommonProps, getPagesByType } from '../../utils/utils';

interface FlowsListPageProps extends PageComponentCommonProps {
    flows: WizardFlowModel[];
}

const FlowsListPage: React.FunctionComponent<FlowsListPageProps> = (props) => {
    return (
        <BaseLayout page={null} site={props.site}>
            <FlowsList {...props} />;
        </BaseLayout>
    );
};

export default FlowsListPage;

const FlowsList: React.FunctionComponent<FlowsListPageProps> = (props) => {
    return <div>{JSON.stringify(props, null, 2)}</div>;
};

/*
    flows: Record<string, FlowInfo>;

flowPages.forEach((flow) => {
            const flowContentId = flow.__metadata.id;
            let flowInfo: FlowInfo;
            if (flowContentId in flowsListProps.flows) {
                flowsListProps.flows]
            }
            if (flowsListProps.f)
        });

        const flowsListProps: FlowsListProps = {flows: {}, ...commonProps};

export interface FlowsListComponentProps extends ContentCommonProps {
    flows: WizardFlowModel[];
}

export type FlowsListComponent = React.FunctionComponent<FlowsListComponentProps>;

// TODO needs work :-)
const FlowsList: FlowsListComponent = ({ flows, site }) => {
    return <div>Flows here!</div>;
};

interface FlowInfo {
    flow: WizardFlowModel;
    actions: Array<{
        flowAction: string;
        url: string;
    }>;
}
*/

export async function getStaticProps({ params }) {
    const commonProps = await getContentCommonProps();
    const flows = (await getPagesByType('WizardFlow')) as WizardFlowModel[];
    const staticProps = { props: { flows: flows, ...commonProps } };
    console.log('[[...flow]] getStaticProps for root is:', staticProps, flows);
    return staticProps;
}
