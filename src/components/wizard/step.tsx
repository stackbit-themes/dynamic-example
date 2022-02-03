import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import { getComponent } from '../components-registry';
import { getDataAttrs } from '../../utils/common/utils';
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
        <div
            className="card shadow-lg bg-blue-200 m-5 min-w-[600px] max-w-screen-md"
            {...getDataAttrs(props)}
        >
            <div className="card-body">
                {renderHeader(props)}
                {props.controls && renderControls(props, controlStates, onControlValueChange)}
            </div>
        </div>
    );
};

function renderHeader(props: WizardStepProps) {
    return (
        <div>
            <h2 className="card-title" data-sb-field-path=".title">
                {props.title}
            </h2>
            <Markdown className="mb-5" data-sb-field-path=".description">
                {props.description}
            </Markdown>
        </div>
    );
}

function renderControls(
    props: WizardStepProps,
    controlStates: WizardControlState[],
    onValueChange: OnControlValueChange
) {
    return (
        <div data-sb-field-path=".controls">
            {props.controls.map((control, index) => {
                const Control = getComponent(control.type) as WizardControlComponent;
                if (!Control) throw new Error(`no component for control type: ${control.type}`);

                return (
                    <div key={index} className="mt-4" data-sb-field-path={`.${index}`}>
                        <Control
                            index={index}
                            controlState={controlStates[index]}
                            onValueChange={onValueChange}
                            {...control}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default WizardStep;
