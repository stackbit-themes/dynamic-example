import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import WizardSliderControl from './wizard/controls/slider';
import WizardTextControl from './wizard/controls/text';

export function getComponent(key: string, throwError: boolean = true): ComponentType {
    const component = components[key];
    if (!component && throwError)
        throw new Error(`No component registered for key: ${key}`)
    return component;
}

// TODO if we want wizard controls to be dynamic, need to make sure to init to always init the functions they register
const components = {
    'GeneralPage': dynamic(() => import('./pageLayouts/general')),
    'WizardStep': dynamic(() => import('./wizard/step')),
    'TextSection': dynamic(() => import('./text-section')),
    'WizardTextControl': WizardTextControl,
    'WizardSliderControl': WizardSliderControl,
};
