export function resolveStaticPaths({ pages, objects }) {
    return pages.map((page) => {
        return page.__metadata?.urlPath;
    });
}
