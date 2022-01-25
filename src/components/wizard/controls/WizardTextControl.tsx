import classNames from 'classnames';
import * as React from 'react';
import { WizardControlProps, controlInitializers, controlUpdaters } from './ControlStateTypes';

const MODEL_NAME = 'WizardTextControl';

controlInitializers[MODEL_NAME] = (control) => {
    return '';
};

controlUpdaters[MODEL_NAME] = (control, newValue) => {
    const v = newValue as string;

    if (v) {
        if (v.length >= control.minLength) {
            return { valid: true, value: v };
        } else {
            return {
                valid: false,
                value: null,
                errorMessage: `Enter at least ${control.minLength} characters.`
            };
        }
    } else {
        if (control.required) {
            return { valid: false, value: null, errorMessage: `Enter a value.` };
        } else {
            return { valid: true, value: null };
        }
    }
};

export default function WizardTextInput(props: WizardControlProps) {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{props.label}</span>
            </label>
            <input
                type="text"
                placeholder={props.label}
                className={classNames('input', 'input-bordered', 'w-1/2', {
                    'input-error': !props.controlStatus.valid
                })}
                onChange={(e) => {
                    props.updateControlStatus(props, props.index, e.target.value);
                }}
            />
        </div>
    );
}
