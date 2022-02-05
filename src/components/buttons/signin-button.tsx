import * as React from 'react';
import { signIn } from 'next-auth/react';
import { SignInButtonModel } from '../../utils/model-types';

const SignInButton: React.FunctionComponent<SignInButtonModel> = (props) => {
    const classNames = 'btn btn-primary btn-sm';
    return (
        <button className={classNames} onClick={() => signIn()}>
            {props.text}
        </button>
    );
};

export default SignInButton;
