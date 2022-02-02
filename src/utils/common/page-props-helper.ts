import { sourcebitDataClient } from 'sourcebit-target-next';
import { ContentObjectModel } from "./base-model-types";

interface AllContent { 
    pages: ContentObjectModel[], 
    objects: ContentObjectModel[], 
    props: Record<string, any>;
}

export async function getAllContent(): Promise<AllContent> {
    return await sourcebitDataClient.getData();
}

export async function staticPagePaths(options: {routeHandler?: string} = {}) {
    const allContent = await getAllContent();
    return allContent.pages.
        filter(page => 
            (!options.routeHandler || page.__metadata?.routeHandler === options.routeHandler)).
        map((page) => page.__metadata?.urlPath);
}

interface StaticProps {
    props: {
        page: ContentObjectModel,
        [k: string]: any
    };
}

export async function staticPropsFor(url: string|string[]): Promise<StaticProps> {
    let urlPath: string;
    if (!url) {
        urlPath = '/';
    } else if (typeof url === "string") {
        urlPath = url
    } else {
        urlPath = '/' + url.join('/');
    }
    const allContent = await getAllContent();
    const page = allContent.pages.find((page) => page.__metadata.urlPath === urlPath);
    if (!page)
        throw new Error(`Page not found for URL path: ${urlPath}`);

    const staticProps = { props: { page, ...allContent.props } };
    return staticProps;
}

export async function urlPathOfContent(content: string|ContentObjectModel): Promise<string|null> {
    const contentId = 
        typeof content === "string" ? content : content.__metadata.id;
    const allContent = await getAllContent();
    const page = allContent.pages.find((page) => page.__metadata.id === contentId);
    return page ? page.__metadata.urlPath : null;
}

export function isClientSide() {
    return typeof window !== 'undefined';
}