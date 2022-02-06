import * as React from 'react';
import { WizardControlProps, controlValueInitializers, controlStateBuilders } from './types';
import { WizardSliderControlModel } from '../../../utils/model-types';

const MODEL_NAME = 'WizardSliderControl';

controlValueInitializers[MODEL_NAME] = (control) => {
    return (control as WizardSliderControlModel).defaultValue;
};

controlStateBuilders[MODEL_NAME] = (control, newValue) => {
    return { valid: true, value: newValue, errorMessage: null };
};

const WizardSliderControl: React.FunctionComponent<WizardControlProps> = (props) => {
    const sliderProps = props as unknown as WizardSliderControlModel;
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{sliderProps.label}</span>
            </label>
            <input
                type="range"
                min={sliderProps.minValue}
                max={sliderProps.maxValue}
                defaultValue={sliderProps.defaultValue}
                className="range w-1/2"
                onChange={(e) => {
                    props.onValueChange(props, props.index, e.target.value);
                }}
            />
        </div>
    );
};

export default WizardSliderControl;
