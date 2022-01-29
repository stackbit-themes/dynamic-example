import React, { useEffect } from 'react';
import { getComponent } from '../../../components/components-registry';
import { PageComponentProps, WizardFlowModel } from '../../../utils/model-types';
import { VariableValuesMap, WizardStepComponent } from '../../../components/wizard/types';

interface RunFlowPageProps extends PageComponentProps {
    page: WizardFlowModel;
}

export default function WizardFlowRunner(props: RunFlowPageProps) {
    const [currStep, setCurrStep] = React.useState(0);
    const [currStepIsValid, setCurrStepIsValid] = React.useState(false);
    const variableValues = React.useRef<VariableValuesMap>({});
    const flow = props.page;
    const steps = flow.steps || [];

    function handleVarsChange(stepVariableValues: VariableValuesMap) {
        variableValues.current = { ...variableValues.current, ...stepVariableValues };
        //console.log('Updated vars:', variableValues.current);
    }

    useEffect(() => {
        console.log('Rendered flow'); // TODO remove - just to track un-needed renders
    });

    function handleStepValidityChange(isValid) {
        if (isValid != currStepIsValid) console.log('Step validity changed:', isValid);
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
            console.log('Finished!', variableValues); // TBD redirect to ...
        }
    }

    return (
        <>
            <div className="flex justify-center">
                <ul className="steps steps-horizontal mt-6">
                    {steps.map((step, index) => {
                        return (
                            <li
                                key={index}
                                className={'step ' + (index <= currStep ? 'step-primary' : '')}
                            >
                                {step.title}
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="flex justify-center">
                {steps.map((step, index) => {
                    const stepType = step.type || 'WizardStep';
                    const StepComponent = getComponent(stepType) as WizardStepComponent;
                    if (!StepComponent)
                        throw new Error(`no component matching the step type: ${step.type}`);

                    const isCurrStep = index == currStep;
                    return (
                        <div className={'flex m-6 ' + (isCurrStep ? '' : 'hidden')} key={index}>
                            <StepComponent
                                {...step}
                                data-sb-field-path={`steps.${index}`}
                                onValidityChange={isCurrStep ? handleStepValidityChange : null}
                                onVarsChange={isCurrStep ? handleVarsChange : null}
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
                <button className="btn btn-primary" onClick={nextStep} disabled={!currStepIsValid}>
                    {isLastStep ? 'Finish' : 'Next'}
                </button>
            </div>
        </>
    );
}
