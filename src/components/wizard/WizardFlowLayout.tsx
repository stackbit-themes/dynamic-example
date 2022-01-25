import * as React from 'react';

import { getComponent } from '../components-registry';
import DefaultBaseLayout from '../keep-and-modify/layouts/DefaultBaseLayout';

export default function WizardFlow(props) {
    const flow = props.page;
    const steps = flow.steps || [];

    return (
        <DefaultBaseLayout page={flow} site={props.site}>
            <main id="main" className="sb-layout sb-page-layout">
                {flow.title && <h1 data-sb-field-path="title">{flow.title}</h1>}
                {steps.length > 0 && (
                    <div data-sb-field-path="steps">
                        {steps.map((step, index) => {
                            const Component = getComponent(step.type);
                            if (!Component) {
                                throw new Error(
                                    `no component matching the step type: ${step.type}`
                                );
                            }
                            return (
                                <Component
                                    key={index}
                                    {...step}
                                    data-sb-field-path={`steps.${index}`}
                                />
                            );
                        })}
                    </div>
                )}
            </main>
        </DefaultBaseLayout>
    );
}
