/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import BaseLayout from '../base';
import { getComponent } from '../../components-registry';
import {
    BaseSectionModel,
    GeneralPageModel,
    PageComponentCommonProps,
    UserGroup
} from '../../../utils/model-types';
import { isDev } from '../../../utils/common/page-utils';
import { useSession } from 'next-auth/react';
import emptyStateImage from '../../../../public/images/cactus.png';
import Image from 'next/image';
import { BaseSectionComponent } from '../../sections/base-section';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';

interface GeneralPageProps extends PageComponentCommonProps {
    page: GeneralPageModel;
}

const GeneralPage: React.FunctionComponent<GeneralPageProps> = ({ page, site }) => {
    const [showAllGroupsContent, setShowAllGroupsContent] = React.useState(false);
    const sections = page.sections || [];

    // TODO Reproduce with a bare-bones example and investiage/create issue
    // This seems to happen only when navigating back from the signIn() page, which is not wrapped in next/link
    const checkboxRef = React.useRef<HTMLInputElement>();
    React.useEffect(() => {
        const groupsCheckboxValue = checkboxRef.current.checked;
        if (groupsCheckboxValue != showAllGroupsContent) {
            console.log('Checkbox got out of sync, fixing.');
            checkboxRef.current.checked = showAllGroupsContent;
        }
    });

    return (
        <BaseLayout page={page} site={site}>
            <div className="flex flex-row-reverse p-3 w-full items-center gap-3">
                <input
                    type="checkbox"
                    ref={checkboxRef}
                    checked={showAllGroupsContent}
                    onChange={(e) => {
                        setShowAllGroupsContent(e.target.checked);
                    }}
                    className="toggle toggle-primary"
                />
                <div className="label-text">Show editorial content for all user groups</div>
            </div>
            <Sections {...{ sections, showAllGroupsContent }}></Sections>
        </BaseLayout>
    );
};

function Sections(props: { sections: BaseSectionModel[]; showAllGroupsContent: boolean }) {
    const { sections, showAllGroupsContent } = props;
    const { data: session } = useSession();
    const relevantUserGroups: UserGroup[] = ['everyone', session ? 'loggedIn' : 'anonymous'];

    const relevantSections = showAllGroupsContent
        ? sections
        : sections.filter((section) => relevantUserGroups.includes(section.userGroup));
    const showGroupBadge = showAllGroupsContent;

    return (
        <div key="sections" data-sb-field-path="sections" className="flex flex-col gap-4 m-10">
            {sections.length > 0 ? (
                relevantSections.map((section, index) => {
                    const Component = getComponent(section.type) as BaseSectionComponent;
                    return (
                        <Component
                            key={index}
                            {...section}
                            showGroupBadge={showGroupBadge}
                            data-sb-field-path={`sections.${index}`}
                        />
                    );
                })
            ) : isDev ? (
                <EmptyState />
            ) : null}
        </div>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col m-24 gap-2">
            <div className="flex justify-center">
                <div className="w-24">
                    <Image src={emptyStateImage} alt="No sections" />
                </div>
            </div>
            <div className="flex justify-center font-bold text-3xl text-base-300">
                Add some sections here
            </div>
        </div>
    );
}

export default withRemoteDataUpdates(GeneralPage);
