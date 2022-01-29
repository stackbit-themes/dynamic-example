const path = require('path');
const { flattenMarkdownData, urlPathFromFilePath } = require('./src/utils/common/page-utils');
const { resolveReferenceFields } = require('./src/utils/common/data-utils');
const isDev = process.env.NODE_ENV === 'development';

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
        resolveReferenceFields(),
        {
            module: require('sourcebit-target-next'),
            options: {
                liveUpdate: isDev,
                flattenAssetUrls: true,
                commonProps: (objects) => {
                    const site = objects.find((page) => page.__metadata.modelName === 'SiteConfig');
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
                                paths.push(
                                    { urlPath: urlPath, routeHandler: 'flows' },
                                    { urlPath: urlPath + '/run', routeHandler: 'flows' }
                                );
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
