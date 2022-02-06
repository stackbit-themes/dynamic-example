import classNames from 'classnames';
import * as React from 'react';
import { WizardControlProps, controlValueInitializers, controlStateBuilders } from './types';

const MODEL_NAME = 'WizardTextControl';

controlValueInitializers[MODEL_NAME] = (control) => {
    return '';
};

controlStateBuilders[MODEL_NAME] = (control, newValue) => {
    const v = newValue as string;

    if (v) {
        if (!control.minLength || v.length >= control.minLength) {
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

const WizardTextControl: React.FunctionComponent<WizardControlProps> = (props) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{props.label}</span>
            </label>
            <input
                type="text"
                className={classNames('input', 'input-bordered', 'w-1/2', {
                    'input-error': !props.controlState.valid
                })}
                onChange={(e) => {
                    props.onValueChange(props, props.index, e.target.value);
                }}
            />
        </div>
    );
};

export default WizardTextControl;
