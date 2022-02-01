/**
 * Resolves reference fields to their data.
 * The references are naively resolved for field with a string value that
 * matches one of the object IDs.
 *
 * For example, if a post page has an author field referencing an author object:
 * {
 *   layout: 'post',
 *   title: '...',
 *   author: 'content/data/authors/john_doe.json'
 * }
 * Then the author's file path will be replaced with the author's data.
 *
 * @param {Object} options
 * @param {Array} options.fieldNames Names of fields to resolve. If left empty or not provided, all reference fields will be resolved.
 * @param {number} options.maxDepth Maximum depth of references to resolve. Default 2.
 */
function resolveReferenceFields({ fieldNames = [], maxDepth = 2 } = {}) {
    return ({ data }) => {
        const objectsByFilePath = data.objects.reduce((map, object) => {
            map[object.__metadata.id] = object;
            return map;
        }, {});

        const objects = data.objects.map((object) => {
            let refKeyPathStack = [];
            return mapDeep(object, (value, keyPath) => {
                if (keyPath.includes('__metadata')) {
                    return value;
                }
                if (fieldNames.length !== 0 && !fieldNames.includes(keyPath[keyPath.length - 1])) {
                    return value;
                }
                if (typeof value !== 'string') {
                    return value;
                }
                if (!/\.(?:md|mdx|json|yml|yaml|toml)$/.test(value)) {
                    return value;
                }
                const keyPathStr = keyPath.join('.');
                while (
                    refKeyPathStack.length &&
                    !keyPathStr.startsWith(refKeyPathStack[refKeyPathStack.length - 1])
                ) {
                    refKeyPathStack.pop();
                }
                if (refKeyPathStack.length > maxDepth) {
                    return value;
                }
                if (value in objectsByFilePath) {
                    refKeyPathStack.push(keyPath.join('.'));
                    return objectsByFilePath[value];
                }
                return value;
            });
        });

        return {
            ...data,
            objects
        };
    };
}

function mapDeep(value, iteratee, _keyPath = [], _objectStack = []) {
    value = iteratee(value, _keyPath, _objectStack);
    if (value && typeof value == 'object' && value.constructor === Object) {
        value = Object.entries(value).reduce((res, [key, val]) => {
            res[key] = mapDeep(val, iteratee, _keyPath.concat(key), _objectStack.concat(value));
            return res;
        }, {});
    } else if (Array.isArray(value)) {
        value = value.map((val, key) =>
            mapDeep(val, iteratee, _keyPath.concat(key), _objectStack.concat(value))
        );
    }
    return value;
}

module.exports = {
    resolveReferenceFields
};
