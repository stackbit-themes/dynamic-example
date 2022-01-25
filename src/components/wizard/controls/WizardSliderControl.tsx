import * as React from 'react';
import { WizardControlProps, controlInitializers, controlUpdaters } from './ControlStateTypes';
import { WizardSliderControlModel, WizardInputControlModel } from '../../../utils/model-interfaces';

const MODEL_NAME = 'WizardSliderControl';

controlInitializers[MODEL_NAME] = (control) => {
    return (control as WizardSliderControlModel).defaultValue;
};

controlUpdaters[MODEL_NAME] = (control, newValue) => {
    return { valid: true, value: newValue, errorMessage: null };
};

export default function WizardSliderInput(props: WizardControlProps) {
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
                    props.updateControlStatus(props, props.index, e.target.value);
                }}
            />
        </div>
    );
}
