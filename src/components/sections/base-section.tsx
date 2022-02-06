import * as React from 'react';
import { getDataAttrs } from '../../utils/common/utils';
import { BaseSectionModel, UserGroup } from '../../utils/model-types';

export interface BaseSectionProps extends BaseSectionModel {
    showGroupBadge: boolean;
    additionalClassNames?: string;
}
export type BaseSectionComponent = React.FunctionComponent<BaseSectionProps>;

const groupBadgeInfo: Record<UserGroup, { label: string; badgeClass: string }> = {
    everyone: { label: 'everyone', badgeClass: 'badge-accent' },
    loggedIn: { label: 'logged-in users', badgeClass: 'badge-primary' },
    anonymous: { label: 'anonymous users', badgeClass: 'badge-secondary' }
};

export const BaseSection: BaseSectionComponent = (props) => {
    const baseClassNames = 'card shadow-lg w-3/4 p-5 bg-base-100';
    const classNames = `${baseClassNames} ${props.additionalClassNames}`;
    const badgeInfo = groupBadgeInfo[props.userGroup];

    return (
        <div className="flex justify-center">
            <div {...getDataAttrs(props)} className={classNames}>
                {props.showGroupBadge && (
                    <div className="flex flex-row-reverse w-full">
                        <div className={`badge badge-lg ${badgeInfo.badgeClass}`}>
                            For {badgeInfo.label}
                        </div>
                    </div>
                )}
                {props.children}
            </div>
        </div>
    );
};
