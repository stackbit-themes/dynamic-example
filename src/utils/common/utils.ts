import { ContentObjectModel } from "./base-model-types";

export function getDataAttrs(props: any = {}): any {
    return Object.entries(props).reduce((dataAttrs, [key, value]) => {
        if (key.startsWith('data-')) {
            dataAttrs[key] = value;
        }
        return dataAttrs;
    }, {});
}

export function sbObjectIdFor(o?: ContentObjectModel) {
    return o ? {'data-sb-object-id': o.__metadata.id} : {};
}

