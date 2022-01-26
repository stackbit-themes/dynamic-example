import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

export function getComponent(key: string): ComponentType {
    return components[key];
}

const components = {
    'WizardFlow': dynamic(() => import('./wizard/editor/editor')),
    'WizardStep': dynamic(() => import('./wizard/step')),
    'WizardTextControl': dynamic(() => import('./wizard/controls/text')),
    'WizardSliderControl': dynamic(() => import('./wizard/controls/slider')),
    'PageLayout': dynamic(() => import('./keep-and-modify/layouts/PageLayout')),
    'PostLayout': dynamic(() => import('./keep-and-modify/layouts/PostLayout'))
};
