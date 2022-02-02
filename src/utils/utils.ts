import { getAllContent } from "./common/page-props-helper";
import { ContentCommonProps } from "./model-types";

export async function getContentCommonProps(): Promise<ContentCommonProps> {
    const allContent = await getAllContent();
    return allContent.props as ContentCommonProps;
}
