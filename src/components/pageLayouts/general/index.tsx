/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import BaseLayout from '../base';
import { getComponent } from '../../components-registry';
import { GeneralPageModel, SiteConfigModel } from '../../../utils/model-types';
import { isDev } from '../../../utils/common/page-utils';

export default function GeneralPageLayout(props: {
    page: GeneralPageModel;
    site: SiteConfigModel;
}) {
    const { page, site } = props;
    const sections = page.sections || [];

    return (
        <BaseLayout page={page} site={site}>
            <main id="main" className="sb-layout sb-page-layout">
                {page.title && (
                    <h1 className="sr-only" data-sb-field-path="title">
                        {page.title}
                    </h1>
                )}
                {sections.length > 0 ? (
                    <div data-sb-field-path="sections">
                        {sections.map((section, index) => {
                            const Component = getComponent(section.type);
                            if (!Component) {
                                throw new Error(
                                    `no component matching the page section's type: ${section.type}`
                                );
                            }
                            return (
                                <Component
                                    key={index}
                                    {...section}
                                    data-sb-field-path={`sections.${index}`}
                                />
                            );
                        })}
                    </div>
                ) : isDev ? (
                    <div className="flex flex-col text-3xl m-8">
                        <div className="flex justify-center mb-8">No sections (yet)</div>
                        <div className="flex justify-center">
                            <img src="/images/empty-battery.svg" width="80" alt="No sections" />
                        </div>
                    </div>
                ) : null}
            </main>
        </BaseLayout>
    );
}
