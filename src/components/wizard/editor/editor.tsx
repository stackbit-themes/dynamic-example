import * as React from 'react';
import { getComponent } from '../../components-registry';
import { WizardFlowComponent } from '../types';
import { FlowValidAlert, FlowValidationAlerts } from './alerts';
import { validateFlowDefinition } from './validation';

const WizardFlowEditor: WizardFlowComponent = ({ flow }) => {
    const steps = flow.steps || [];
    const selfUrl = flow.__metadata.urlPath;
    const runFlowUrl = `${selfUrl}/run/?to=${selfUrl}`;

    const flowDefinitionErrors = validateFlowDefinition(flow);
    return (
        <>
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
                            url: runFlowUrl
                        }}
                    />
                ) : (
                    <FlowValidationAlerts errorMessages={flowDefinitionErrors} />
                )}
                <div data-sb-field-path=".steps">
                    {steps.map((step, index) => {
                        const stepType = step.type || 'WizardStep'; // TODO open task - type not stored by studio
                        const Component = getComponent(stepType);
                        return (
                            <div className="flex m-6" key={index}>
                                <div className="text-8xl p-4 w-20">{index + 1}</div>
                                <Component {...step} data-sb-field-path={`.${index}`} />
                            </div>
                        );
                    })}
                </div>
            </main>
        </>
    );
};

export default WizardFlowEditor;
