import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import WizardSliderControl from './wizard/controls/slider';
import WizardTextControl from './wizard/controls/text';

export function getComponent(key: string): ComponentType {
    return components[key];
}

// TODO if we want wizard controls to be dynamic, need to make sure to init to always init the functions they register
const components = {
    'PageLayout': dynamic(() => import('./keep-and-modify/layouts/PageLayout')),
    'PostLayout': dynamic(() => import('./keep-and-modify/layouts/PostLayout')),
    'WizardFlow': dynamic(() => import('./wizard/editor/editor')),
    'WizardStep': dynamic(() => import('./wizard/step')),
    'WizardTextControl': WizardTextControl,
    'WizardSliderControl': WizardSliderControl,
};
