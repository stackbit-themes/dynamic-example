import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import { getComponent } from '../components-registry';
import {
    WizardControlValue,
    initControlStatus,
    UpdateControlStatus,
    controlUpdaters
} from './controls/ControlStateTypes';
import { WizardControlModel } from '../../utils/model-interfaces';

export default function WizardStep(props) {
    const controls = props.controls || [];
    const [inputStates, setInputStates] = React.useState(
        controls.map((control) => {
            return initControlStatus(control);
        })
    );

    const updateControlStatus: UpdateControlStatus = (control, index, newValue) => {
        let newState = Object.assign({}, inputStates);
        newState[index] = controlUpdaters[control.type](control, newValue);
        setInputStates(newState);
    };

    React.useEffect(() => {
        console.log(inputStates);
    });

    return (
        <div className="card shadow-lg bg-base-300 m-5 max-w-screen-md">
            <div className="card-body">
                <h2 className="card-title">{props.title}</h2>
                <Markdown className="mb-5">{props.description}</Markdown>
                {props.controls.length > 0 && (
                    <div data-sb-field-path="controls">
                        {props.controls.map((control, index) => {
                            const Component = getComponent(control.type);
                            if (!Component) {
                                throw new Error(`no component for control type: ${control.type}`);
                            }
                            return (
                                <Component
                                    key={index}
                                    index={index}
                                    controlStatus={inputStates[index]}
                                    updateControlStatus={updateControlStatus}
                                    {...control}
                                    data-sb-field-path={`controls.${index}`}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
