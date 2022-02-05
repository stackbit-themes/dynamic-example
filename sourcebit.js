const path = require('path');
const {
    flattenMarkdownData,
    urlPathFromFilePath,
    isDev
} = require('./src/utils/common/page-utils');
const { resolveReferenceFields } = require('./src/utils/common/references-resolver');

// TODO separate this to common package and project-specific config
module.exports = {
    plugins: [
        {
            module: require('sourcebit-source-filesystem'),
            options: {
                watch: isDev,
                sources: [
                    { name: 'pages', path: path.join(__dirname, 'content/pages') },
                    { name: 'data', path: path.join(__dirname, 'content/data') }
                ]
            }
        },
        flattenMarkdownData(),
        //resolveReferenceFields(), // TODO remove completely or make optional?
        {
            module: require('sourcebit-target-next'),
            options: {
                liveUpdate: true,
                flattenAssetUrls: true,
                commonProps: (objects) => {
                    const site = objects.find((o) => o.__metadata.modelName === 'SiteConfig');
                    return { site };
                },
                pages: (objects) => {
                    function addMetadata(obj, addedMetadata) {
                        const { __metadata, ...restProps } = obj;
                        return {
                            __metadata: {
                                ...__metadata,
                                ...addedMetadata
                            },
                            ...restProps
                        };
                    }

                    const pages = objects.flatMap((obj) => {
                        const relativePath = obj.__metadata.relSourcePath;
                        if (!relativePath) return []; // Skip

                        const paths = [];
                        const urlPath = urlPathFromFilePath(relativePath);

                        if (obj.__metadata.sourceName === 'pages') {
                            if (obj.__metadata.modelName === 'WizardFlow') {
                                // Don't build the flow editor page on live websites
                                // (even if they are built and visited, editing wouldn't be possible - the content is part of the Git repo)
                                if (isDev) {
                                    paths.push({
                                        urlPath: urlPath,
                                        routeHandler: 'flows',
                                        flowAction: 'edit'
                                    });
                                }
                                paths.push({
                                    urlPath: urlPath + '/run',
                                    routeHandler: 'flows',
                                    flowAction: 'run'
                                });
                            } else {
                                paths.push({ urlPath });
                            }
                        }

                        return paths.map((metadata) => {
                            metadata = { routeHandler: 'default', ...metadata };
                            return addMetadata(obj, metadata);
                        });
                    });
                    //console.log('pages', pages);
                    return pages;
                }
            }
        }
    ]
};
