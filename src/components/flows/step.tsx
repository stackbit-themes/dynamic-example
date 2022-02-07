import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import { getComponent } from '../components-registry';
import { getDataAttrs, sbFieldPath } from '../../utils/common/utils';
import {
    buildInitialState,
    OnControlValueChange,
    controlStateBuilders,
    WizardControlState,
    WizardControlValue,
    WizardControlComponent
} from './controls/types';
import { WizardControlModel } from '../../utils/model-types';
import { WizardStepComponent, WizardStepProps } from './types';

const WizardStep: WizardStepComponent = (props) => {
    const controls: WizardControlModel[] = props.controls || [];
    const [controlStates, setControlStates] = React.useState<WizardControlState[]>(
        controls.map((control) => {
            return buildInitialState(control);
        })
    );

    const onControlValueChange: OnControlValueChange = (control, controlIndex, newValue) => {
        let newState: WizardControlState[] = controlStates.map((o, i) => {
            return i === controlIndex
                ? controlStateBuilders[control.type](control, newValue)
                : { ...o };
        });
        setControlStates(newState);
    };

    // Send updated variable values to parent (doesn't cause re-render)
    function sendVariablesToParent() {
        if (props.onVarsChange) {
            let vars: Record<string, WizardControlValue> = {};
            controls.forEach((control, index) => {
                vars[control.variableName] = controlStates[index].value;
            });
            props.onVarsChange(vars);
        }
    }

    function sendValidityToParent() {
        if (props.onValidityChange) {
            const allValuesValid = controlStates.every((o) => o.valid);
            props.onValidityChange(allValuesValid);
        }
    }

    React.useEffect(() => {
        sendVariablesToParent();
        sendValidityToParent();
    });

    return (
        <div className="card shadow-lg bg-base-100 m-5 w-[600px]" {...getDataAttrs(props)}>
            <div className="card-body">
                <StepHeader {...props} />
                {props.controls && (
                    <StepControls
                        step={props}
                        controlStates={controlStates}
                        onValueChange={onControlValueChange}
                    />
                )}
            </div>
        </div>
    );
};

function StepHeader(props: WizardStepProps) {
    return (
        <div>
            <h2 className="card-title" {...sbFieldPath(props.annotate ? '.title' : null)}>
                {props.title}
            </h2>
            <Markdown className="mb-5" {...sbFieldPath(props.annotate ? '.description' : null)}>
                {props.description}
            </Markdown>
        </div>
    );
}

function StepControls(props: {
    step: WizardStepProps;
    controlStates: WizardControlState[];
    onValueChange: OnControlValueChange;
}) {
    const { annotate } = props.step;
    return (
        <div {...sbFieldPath(annotate ? '.controls' : null)}>
            {props.step.controls.map((control, index) => {
                const Control = getComponent(control.type) as WizardControlComponent;
                if (!Control) throw new Error(`no component for control type: ${control.type}`);

                return (
                    <div
                        key={index}
                        className="mt-4"
                        {...sbFieldPath(annotate ? `.${index}` : null)}
                    >
                        <Control
                            index={index}
                            controlState={props.controlStates[index]}
                            onValueChange={props.onValueChange}
                            {...control}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default WizardStep;
