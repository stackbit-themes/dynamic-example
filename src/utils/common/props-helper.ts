import { sourcebitDataClient } from 'sourcebit-target-next';
import { ContentObjectModel } from "./base-model-types";

type AllContent = { pages: ContentObjectModel[], objects: ContentObjectModel[], props: any[]};
export async function allContent(): Promise<AllContent> {
    return await sourcebitDataClient.getData();
}

export async function allPagePaths(routeHandler = 'default') {
    const content = await allContent();
    return content.pages.
        filter(page => { return page.__metadata?.routeHandler === routeHandler}).
        map((page) => { return page.__metadata?.urlPath;
    });
}

export interface GenericPageStaticProps {
    props: {
        page: ContentObjectModel; 
        [k: string]: any;
    } 
}

export async function staticPropsBySlug(slug: string[]): Promise<GenericPageStaticProps> {
    slug = slug || [];
    const urlPath = '/' + slug.join('/');
    const content = await allContent();
    const page = content.pages.find((page) => page.__metadata.urlPath === urlPath);
    if (!page)
        throw new Error(`Page not found for URL path: ${urlPath}`);

    const staticProps = { props: { page, ...content.props } };
    return staticProps;
}  