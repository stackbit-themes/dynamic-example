import { ContentObjectModel } from "./common/base-model-types";
import { getAllContent } from "./common/page-props-helper";
import { ContentCommonProps } from "./model-types";

export async function getContentCommonProps(): Promise<ContentCommonProps> {
    const allContent = await getAllContent();
    return allContent.props as ContentCommonProps;
}

export interface GetPagesOptions {
    metadataFilters?: Array<{key: string, value: any}>
}

export async function getPagesByType(contentType: string, 
    options: GetPagesOptions = {}): Promise<ContentObjectModel[]> {
    
    const allContent = await getAllContent();
    let relevantPages = allContent.pages.filter((page) => page.__metadata.modelName === contentType);
    
    if (options.metadataFilters) {
        options.metadataFilters.forEach(({key, value: desiredValue}) => {
            relevantPages = relevantPages.filter(({ metadata }) => {
                return metadata[key] === desiredValue;
            })
        });
    }
    
    return relevantPages;
}
