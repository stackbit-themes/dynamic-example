import React from 'react';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { resolveStaticProps } from '../../utils/static-props-resolvers';
import { getComponent } from '../../components/components-registry';
import DefaultBaseLayout from '../../components/keep-and-modify/layouts/DefaultBaseLayout';

export default function RunFlowPage(props) {
    const [currStep, setCurrStep] = React.useState(0);
    const [currStepIsValid, setCurrStepIsValid] = React.useState(false);
    const flow = props.page;
    const steps = flow.steps || [];

    // Optimize? prevent re-render of this flow and all steps on validity change of step,
    // using https://hookstate.js.org/docs/scoped-state
    function handleStepValidityChange(isValid) {
        setCurrStepIsValid(isValid);
    }

    function prevStep() {
        if (currStep < 1) throw new Error(`No stepping back!`);
        setCurrStep(currStep - 1);
    }

    const isLastStep = currStep === steps.length - 1;
    function nextStep() {
        if (!isLastStep) {
            setCurrStep(currStep + 1);
            setCurrStepIsValid(false); // The step component will update this
        } else {
            console.log('Finished!'); // TBD redirect to ...
        }
    }

    return (
        <DefaultBaseLayout page={flow} site={props.site}>
            <div className="flex justify-center">
                {steps.map((step, index) => {
                    const Component = getComponent(step.type);
                    if (!Component) {
                        throw new Error(`no component matching the step type: ${step.type}`);
                    }
                    const isCurrStep = index == currStep;
                    return (
                        <div className={'flex m-6 ' + (isCurrStep ? '' : 'hidden')} key={index}>
                            <Component
                                {...step}
                                onValidityChange={isCurrStep ? handleStepValidityChange : null}
                            />
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-center mb-6">
                {currStep > 0 && (
                    <button className="btn btn-outline mr-6" onClick={prevStep}>
                        Back
                    </button>
                )}
                <button
                    className="btn btn-primary"
                    onClick={nextStep}
                    disabled={currStepIsValid ? '' : 'disabled'}
                >
                    {isLastStep ? 'Finish' : 'Next'}
                </button>
            </div>
        </DefaultBaseLayout>
    );
}

function objectsToUrls(data, modelName, prefix = '') {
    const relevantObjects = data.objects.filter((o) => {
        return o.__metadata.modelName === modelName;
    });
    const paths = relevantObjects.map((o) => {
        return prefix + o.__metadata.urlPath;
    });
    return paths;
}

function slugToUrl(slug) {
    return '/' + slug.join('/');
}

export async function getStaticPaths() {
    const data = await sourcebitDataClient.getData();
    const paths = objectsToUrls(data, 'WizardFlow', '/run');
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const data = await sourcebitDataClient.getData();
    const urlPath = slugToUrl(params.flow);
    const props = await resolveStaticProps(urlPath, data);
    return { props };
}
