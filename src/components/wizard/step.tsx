import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import { getComponent } from '../components-registry';
import { getDataAttrs } from '../../utils/get-data-attrs';
import {
    buildInitialState,
    OnControlValueChange,
    controlStateBuilders,
    WizardControlState
} from './controls/types';

export default function WizardStep(props) {
    const controls = props.controls || [];
    const [controlStates, setControlStates] = React.useState<WizardControlState[]>(
        controls.map((control) => {
            return buildInitialState(control);
        })
    );

    const handleControlValueChange: OnControlValueChange = (control, index, newValue) => {
        let newState = Object.assign({}, controlStates);
        newState[index] = controlStateBuilders[control.type](control, newValue);
        setControlStates(newState);
    };

    function allValuesValid(): boolean {
        for (const [, controlState] of Object.entries(controlStates)) {
            if (!controlState.valid) {
                return false;
            }
        }
        return true;
    }
    React.useEffect(() => {
        if (props.onValidityChange) {
            props.onValidityChange(allValuesValid());
        }
    });

    return (
        <div className="card shadow-lg bg-base-300 m-5 max-w-screen-md">
            <div className="card-body">
                <h2 className="card-title">{props.title}</h2>
                <Markdown className="mb-5">{props.description}</Markdown>
                {props.controls.length > 0 && (
                    <div data-sb-field-path=".controls">
                        {props.controls.map((control, index) => {
                            const Component = getComponent(control.type);
                            if (!Component) {
                                throw new Error(`no component for control type: ${control.type}`);
                            }
                            return (
                                <div key={index} className="mt-4">
                                    <Component
                                        index={index}
                                        controlState={controlStates[index]}
                                        onValueChange={handleControlValueChange}
                                        data-sb-field-path={`.controls.${index}`}
                                        {...control}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
