/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import { WizardImageItemlModel, WizardImageSelectControlModel } from '../../../utils/model-types';
import { WizardControlProps, controlValueInitializers, controlStateBuilders } from './types';

const MODEL_NAME = 'WizardImageSelectControl';

controlValueInitializers[MODEL_NAME] = (control) => {
    return [];
};

controlStateBuilders[MODEL_NAME] = (control, newValue) => {
    const v = newValue as string[];
    if (v) {
        // If you like, add validation for a minimum number of images
        return { valid: true, value: v };
    } else {
        if (control.required) {
            return { valid: false, value: null, errorMessage: `Select at least one image.` };
        } else {
            return { valid: true, value: [] };
        }
    }
};

const WizardImageSelectControl: React.FunctionComponent<WizardControlProps> = (props) => {
    const images = (props as unknown as WizardImageSelectControlModel).images;
    const selectedItems = (props.controlState.value as string[]) || [];

    function toggleItem(itemValue: string) {
        let newSelectedItems: string[];
        if (selectedItems.includes(itemValue)) {
            newSelectedItems = selectedItems.filter((item) => item != itemValue);
        } else {
            newSelectedItems = [...selectedItems, itemValue];
        }
        props.onValueChange(props, props.index, newSelectedItems);
    }

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{props.label}</span>
            </label>
            <div className="flex flex-wrap gap-4 w-full">
                {images.map((item, i) => (
                    <ImageItem
                        key={i}
                        item={item}
                        selectedItems={selectedItems}
                        onClickItem={toggleItem}
                    />
                ))}
            </div>
        </div>
    );
};

function ImageItem(props: {
    item: WizardImageItemlModel;
    onClickItem: (itemValue: string) => void;
    selectedItems: string[];
}) {
    const { item, selectedItems } = props;
    function click() {
        props.onClickItem(item.value);
    }

    return (
        <div key="i" className="w-[240px] flex flex-col">
            <div className="relative">
                <img src={item.image} alt={item.label} className="card" onClick={click} />
                {selectedItems.includes(item.value) && <SelectedItemOverlay onClick={click} />}
            </div>
            <div className="flex justify-center text-sm text-neutral">{item.label}</div>
        </div>
    );
}

function SelectedItemOverlay(props: { onClick: () => void }) {
    return (
        <div className="absolute top-[50px] left-[100px] opacity-75" onClick={props.onClick}>
            <div className="mask mask-heart bg-gray-100 w-[50px] h-[50px]">
                <div className="p-3 text-primary-content"></div>
            </div>
        </div>
    );
}

export default WizardImageSelectControl;
