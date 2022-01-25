import { WizardControlModel } from "../../../utils/model-interfaces";

export type WizardControlValue = string | number | string[] | null;
export interface WizardControlState {
    valid: boolean;
    value: WizardControlValue;
    errorMessage?: string;
}

export type ControlValueInitializer = (control: WizardControlModel) => WizardControlValue;
export let controlInitializers: Record<string, ControlValueInitializer> = {}

export type ControlValueUpdater = (control: WizardControlModel, newValue: WizardControlValue) => WizardControlState;
export let controlUpdaters: Record<string, ControlValueUpdater> = {}

export function initControlStatus(control: WizardControlModel): WizardControlState {
    const initialValue = controlInitializers[control.type](control);
    const initialStatus = controlUpdaters[control.type](control, initialValue);
    return initialStatus;
}

export type UpdateControlStatus = (control: WizardControlModel, index: number, newValue: WizardControlValue) => void;

export interface WizardControlProps extends WizardControlModel {
    index: number;
    controlStatus: WizardControlState;
    updateControlStatus: UpdateControlStatus;
}

