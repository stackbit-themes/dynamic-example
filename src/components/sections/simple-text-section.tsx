import Markdown from 'markdown-to-jsx';
import * as React from 'react';
import { ContentObjectModel } from '../../utils/common/base-model-types';
import { SimpleTextSectionModel } from '../../utils/model-types';
import { getComponent } from '../components-registry';
import { BaseSection, BaseSectionProps } from './base-section';

type SimpleTextSectionProps = BaseSectionProps & SimpleTextSectionModel;

const SimpleTextSection: React.FunctionComponent<SimpleTextSectionProps> = (props) => {
    return (
        <BaseSection {...props} classNames="bg-base-100">
            <div className="flex flex-col">
                {props.title && (
                    <div
                        data-sb-field-path=".title"
                        className="flex justify-center text-2xl font-semibold mb-2"
                    >
                        {props.title}
                    </div>
                )}
                {props.subtitle && (
                    <div
                        data-sb-field-path=".subtitle"
                        className="flex justify-center text-xl font-medium mb-2"
                    >
                        {props.subtitle}
                    </div>
                )}
                {props.content && (
                    <div className="flex justify-center">
                        <Markdown
                            options={{ forceBlock: true }}
                            className="markdown max-w-[85%]"
                            data-sb-field-path=".content"
                        >
                            {props.content}
                        </Markdown>
                    </div>
                )}
                {props.ctaButton && <CtaButton {...props.ctaButton} />}
            </div>
        </BaseSection>
    );
};

function CtaButton(props: ContentObjectModel) {
    const Button = getComponent(props.type) as React.FunctionComponent<ContentObjectModel>;
    return (
        <div data-sb-field-path=".ctaButton" className="flex justify-center mt-4">
            <Button {...props} />
        </div>
    );
}

export default SimpleTextSection;
