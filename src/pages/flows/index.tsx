import Link from 'next/link';
import * as React from 'react';
import BaseLayout from '../../components/pageLayouts/base/base';
import {
    PageComponentCommonProps,
    WizardFlowMetadataModel,
    WizardFlowModel
} from '../../utils/model-types';
import { getContentCommonProps, getPagesByType } from '../../utils/utils';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';

interface FlowsListPageProps extends PageComponentCommonProps {
    flows: WizardFlowModel[];
}

const FlowsListPage: React.FunctionComponent<FlowsListPageProps> = (props) => {
    return (
        <BaseLayout page={null} site={props.site}>
            <FlowsList {...props} />
        </BaseLayout>
    );
};

export default withRemoteDataUpdates(FlowsListPage);

const FlowsList: React.FunctionComponent<FlowsListPageProps> = (props) => {
    const flowsInfo = buildFlowInfos(props.flows);
    return (
        <div className="grid grid-col m-20 gap-4 justify-center">
            <div className="flex justify-center font-bold text-xl">All flows</div>
            {Object.entries(flowsInfo).flatMap(([flowId, flowInfo]) => {
                return (
                    <div key={flowId} className="card p-5 shadow-xl bg-base-100">
                        <div className="flex items-center">
                            <div className="font-bold text-md">{flowInfo.flow.title}</div>
                            {flowId === props.site.defaultFlow && (
                                <div className="ml-2 badge text-sm">Default</div>
                            )}
                            <div className="flex-grow" />
                            <Link href={`${flowInfo.actionToUrl['run']}?to=/flows`}>
                                <a>
                                    <button className="ml-12 btn btn-primary btn-sm">Run</button>
                                </a>
                            </Link>
                            {flowInfo.actionToUrl['edit'] && (
                                <Link href={flowInfo.actionToUrl['edit']}>
                                    <a>
                                        <button className="ml-2 btn btn-primary btn-outline btn-sm">
                                            Edit
                                        </button>
                                    </a>
                                </Link>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

interface FlowInfo {
    flow: WizardFlowModel;
    actionToUrl: Record<string, string>;
}

// Organize multiple pages for same flow (but different actions) to flow->actions, for display
function buildFlowInfos(flows: WizardFlowModel[]): Record<string, FlowInfo> {
    const res: Record<string, FlowInfo> = {};
    flows.forEach((flow) => {
        const flowMetadata = flow.__metadata as WizardFlowMetadataModel;
        const flowId = flowMetadata.id;
        let flowInfo: FlowInfo = (res[flowId] = res[flowId] || { flow, actionToUrl: {} });

        flowInfo.actionToUrl[flowMetadata.flowAction] = flowMetadata.urlPath;
    });
    return res;
}

export async function getStaticProps({ params }) {
    const commonProps = await getContentCommonProps();
    const flows = await getPagesByType('WizardFlow');
    return { props: { flows, ...commonProps } };
}
