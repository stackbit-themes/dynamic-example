import React, { useEffect } from 'react';
import { getComponent } from '../../components-registry';
import { VariableValues, WizardFlowComponent, WizardStepComponent } from '../types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { storeUserFlowData } from '../../../utils/api-types';

const WizardFlowRunner: WizardFlowComponent = ({ flow }) => {
    const { data: session } = useSession();
    const router = useRouter();

    const [currStep, setCurrStep] = React.useState(0);
    const [currStepIsValid, setCurrStepIsValid] = React.useState(false);
    const variableValues = React.useRef<VariableValues>({});
    const steps = flow.steps || [];

    function handleVarsChange(stepVariableValues: VariableValues) {
        variableValues.current = { ...variableValues.current, ...stepVariableValues };
    }

    function handleStepValidityChange(isValid) {
        if (isValid != currStepIsValid) console.log('Step validity changed:', isValid);
        setCurrStepIsValid(isValid);
    }

    function prevStep() {
        if (currStep < 1) throw new Error(`No stepping back!`);
        setCurrStep(currStep - 1);
    }

    const isLastStep = currStep === steps.length - 1;
    async function nextStep() {
        if (!isLastStep) {
            setCurrStep(currStep + 1);
            setCurrStepIsValid(false); // The step component should update this in its next useEffect()
        } else {
            console.log('Finished flow successfully!', variableValues.current);
            if (session) {
                await storeUserFlowData(variableValues.current);
            }
            if (
                router.query.to &&
                typeof router.query.to === 'string' &&
                router.query.to.startsWith('/')
            ) {
                router.push(router.query.to as string);
            }
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
                    const stepType = step.type || 'WizardStep'; // TODO remove when type is stored always
                    const StepComponent = getComponent(stepType) as WizardStepComponent;
                    const isCurrStep = index == currStep;
                    return (
                        <div className={'flex m-6 ' + (isCurrStep ? '' : 'hidden')} key={index}>
                            <StepComponent
                                {...step}
                                annotate={false}
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
                <button
                    className="btn btn-primary"
                    onClick={async () => {
                        await nextStep();
                    }}
                    disabled={!currStepIsValid}
                >
                    {isLastStep ? 'Finish' : 'Next'}
                </button>
            </div>
        </>
    );
};

export default WizardFlowRunner;
