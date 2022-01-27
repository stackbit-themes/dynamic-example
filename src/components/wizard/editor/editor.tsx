import * as React from 'react';
import { SiteConfigModel, WizardFlowModel } from '../../../utils/model-interfaces';
import { getComponent } from '../../components-registry';
import DefaultBaseLayout from '../../keep-and-modify/layouts/DefaultBaseLayout';
import { FlowValidAlert, FlowValidationAlerts } from './alerts';
import { validateFlowDefinition } from './validation';
import link from 'next/link';

export default function WizardFlowEditor(props: { page: WizardFlowModel; site: SiteConfigModel }) {
    const flow = props.page;
    const steps = flow.steps || [];
    const selfUrl = flow.__metadata.urlPath;

    const flowDefinitionErrors = validateFlowDefinition(flow);
    return (
        <DefaultBaseLayout page={flow} site={props.site}>
            <main id="main" className="sb-layout sb-page-layout">
                {flow.title && (
                    <div data-sb-field-path="title" className="text-6xl p-8">
                        {flow.title}
                    </div>
                )}
                {flowDefinitionErrors.length == 0 ? (
                    <FlowValidAlert
                        action={{
                            label: 'Run',
                            url: `/run/${selfUrl}?to=${selfUrl}?store=false?x=true`
                        }}
                    />
                ) : (
                        <FlowValidationAlerts errorMessages={flowDefinitionErrors} />
                    )}
                {steps.length > 0 && (
                    <div data-sb-field-path=".steps">
                        {steps.map((step, index) => {
                            const Component = getComponent(step.type);
                            if (!Component) {
                                throw new Error(
                                    `no component matching the step type: ${step.type}`
                                );
                            }
                            return (
                                <div className="flex m-6" key={index}>
                                    <div className="text-8xl p-4">{index + 1}</div>
                                    <Component {...step} data-sb-field-path={`steps.${index}`} />
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </DefaultBaseLayout>
    );
}
