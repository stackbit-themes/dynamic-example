import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

export function getComponent(key: string): ComponentType {
    return components[key];
}

const components = {
    'WizardFlowLayout': dynamic(() => import('./wizard/WizardFlowLayout')),
    'WizardStep': dynamic(() => import('./wizard/WizardStep')),
    'WizardTextControl': dynamic(() => import('./wizard/controls/WizardTextControl')),
    'WizardSliderControl': dynamic(() => import('./wizard/controls/WizardSliderControl')),
    'PageLayout': dynamic(() => import('./keep-and-modify/layouts/PageLayout')),
    'PostLayout': dynamic(() => import('./keep-and-modify/layouts/PostLayout'))
};
