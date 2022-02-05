import Markdown from 'markdown-to-jsx';
import * as React from 'react';
import { getDataAttrs } from '../utils/common/utils';
import { TextSectionModel } from '../utils/model-types';

// TODO check get-data-attrs
const TextSection: React.FunctionComponent<TextSectionModel> = (props) => {
    return (
        <div {...getDataAttrs(props)} className="card shadow-lg w-full p-5 bg-base-100">
            <div className="flex flex-col">
                {props.title && (
                    <div className="flex justify-center text-2xl font-semibold mb-2">
                        {props.title}
                    </div>
                )}
                {props.subtitle && (
                    <div className="flex justify-center text-xl font-medium mb-2">
                        {props.subtitle}
                    </div>
                )}
                {props.content && (
                    <div className="flex justify-center">
                        <Markdown
                            options={{ forceBlock: true }}
                            className=""
                            data-sb-field-path=".content"
                        >
                            {props.content}
                        </Markdown>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TextSection;
