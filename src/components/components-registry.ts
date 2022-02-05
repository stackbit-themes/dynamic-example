import dynamic from 'next/dynamic';
import React from 'react';
import { ContentObjectModel } from '../utils/common/base-model-types';
import SignInButton from './buttons/signin-button';
import SimpleButton from './buttons/simple-button';
import WizardSliderControl from './wizard/controls/slider';
import WizardTextControl from './wizard/controls/text';

export function getComponent(key: string, throwError: boolean = true): React.FunctionComponent<ContentObjectModel>|null {
    const component = components[key];
    if (!component && throwError)
        throw new Error(`No component registered for key: ${key}`)
    return component;
}

const components = {
    'GeneralPage': dynamic(() => import('./pageLayouts/general')),
    'WizardStep': dynamic(() => import('./wizard/step')),
    'SimpleTextSection': dynamic(() => import('./sections/simple-text-section')),
    'WizardTextControl': WizardTextControl,
    'WizardSliderControl': WizardSliderControl,
    'SimpleButton': SimpleButton,
    'SignInButton': SignInButton
};
