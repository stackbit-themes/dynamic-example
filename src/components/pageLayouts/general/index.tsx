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

interface GeneralPageProps extends PageComponentCommonProps {
    page: GeneralPageModel;
}

// TODO show page title nicely?
const GeneralPage: React.FunctionComponent<GeneralPageProps> = ({ page, site }) => {
    const sections = page.sections || [];
    return (
        <BaseLayout page={page} site={site}>
            {page.title && (
                <h1 className="sr-only" data-sb-field-path="title">
                    {page.title}
                </h1>
            )}
            <Sections sections={sections}></Sections>
        </BaseLayout>
    );
};

function Sections({ sections }: { sections: BaseSectionModel[] }) {
    const { data: session } = useSession();
    // TODO dev mode - show everything with badge
    sections = sections || [];
    const relevantUserGroups: UserGroup[] = ['everyone', session ? 'loggedIn' : 'anonymous'];
    const relevantSections = sections.filter((section) =>
        relevantUserGroups.includes(section.userGroup)
    );

    return (
        <div data-sb-field-path="sections" className="flex flex-col gap-4 m-10">
            {sections.length > 0 ? (
                relevantSections.map((section, index) => {
                    const Component = getComponent(section.type);
                    return (
                        <Component
                            key={index}
                            {...section}
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
                <img src="/images/cactus.png" width="80" alt="No sections" />
            </div>
            <div className="flex justify-center font-bold text-3xl text-base-300">
                Add some sections here
            </div>
        </div>
    );
}

export default GeneralPage;
