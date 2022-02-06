import * as React from 'react';
import Link from 'next/link';
import { SimpleButtonModel } from '../../utils/model-types';

const SimpleButton: React.FunctionComponent<SimpleButtonModel> = (props) => {
    const classNames = 'btn btn-sm ' + (props.primary ? 'btn-primary' : 'btn-outline');
    return (
        <Link href={props.link}>
            <a>
                <button className={classNames}>{props.text}</button>
            </a>
        </Link>
    );
};

export default SimpleButton;
