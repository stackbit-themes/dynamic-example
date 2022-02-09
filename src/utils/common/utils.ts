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

export function sbFieldPath(fieldName: string) {
    return fieldName ? {'data-sb-field-path': fieldName} : {};
}

export function isEmptyObject(o: object) {
    return Object.keys(o).length === 0;
}

