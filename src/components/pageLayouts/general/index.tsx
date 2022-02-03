/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import BaseLayout from '../base';
import { getComponent } from '../../components-registry';
import { GeneralPageModel, SiteConfigModel } from '../../../utils/model-types';
import { isDev } from '../../../utils/common/page-utils';

interface GeneralPageProps {
    page: GeneralPageModel;
    site: SiteConfigModel;
}

// TODO show page title nicely?
const GeneralPage: React.FunctionComponent<GeneralPageProps> = ({ page, site }) => {
    const sections = page.sections || [];
    return (
        <BaseLayout page={page} site={site}>
            <main id="main" className="sb-layout sb-page-layout">
                {page.title && (
                    <h1 className="sr-only" data-sb-field-path="title">
                        {page.title}
                    </h1>
                )}
                <div data-sb-field-path="sections">
                    {sections.length > 0 ? (
                        sections.map((section, index) => {
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
                        <div className="flex flex-col m-24 gap-2">
                            <div className="flex justify-center">
                                <img src="/images/cactus.png" width="80" alt="No sections" />
                            </div>
                            <div className="flex justify-center font-bold text-3xl text-base-300">
                                Add some sections here
                            </div>
                        </div>
                    ) : null}
                </div>
            </main>
        </BaseLayout>
    );
};

export default GeneralPage;
