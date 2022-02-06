import * as React from 'react';
import dynamic from 'next/dynamic';
import { ContentObjectModel } from '../utils/common/base-model-types';
import SignInButton from './buttons/signin-button';
import SimpleButton from './buttons/simple-button';
import WizardImageSelectControl from './flows/controls/image-select';
import WizardSliderControl from './flows/controls/slider';
import WizardTextControl from './flows/controls/text';

export function getComponent(key: string, throwError: boolean = true): React.FC|null {
    const component = components[key];
    if (!component && throwError)
        throw new Error(`No component registered for key: ${key}`)
    return component;
}

const components = {
    'GeneralPage': dynamic(() => import('./pageLayouts/general')),
    'WizardStep': dynamic(() => import('./flows/step')),
    'SimpleTextSection': dynamic(() => import('./sections/simple-text-section')),
    'WizardTextControl': WizardTextControl,
    'WizardSliderControl': WizardSliderControl,
    'WizardImageSelectControl': WizardImageSelectControl,
    'SimpleButton': SimpleButton,
    'SignInButton': SignInButton
};
