

export function bind(ops?: BindOptions) {
    if (!ops) ops = {};
    return function (target: any, propName: string) {
        // console.log("stuff:", { ...ops, target, propName  });
        const metadata = getPropertyMetadata(target);
        metadata[propName] = ops as BindOptions;
    }
}

const propertyMetadataKey = Symbol.for("design:propertyMetadata");

export function fromQuery<T>(spec: Newable<T>, ops?: FromQueryOptions): T {
    return fromRecord(spec, objectKeysToLowerCase( getAllUrlParameters(ops?.query)));
}

/**
 * TODO: so the JSON could actually already have the
 * type info on it, maybe need to consider what to
 * do here.
 * @param obj 
 * @param json 
 */
export function fromJson<T>(spec: Newable<T>, json: string): T {
    return fromRecord(spec, JSON.parse(json));
}

export type Newable<T> = { new (...args: any[]): T; };

export function fromRecord<T>(spec: Newable<T>, record: Record<string, string>): T {
    const obj = new spec() as any;
    const metadata = getPropertyMetadata(obj);
    if (!metadata) return obj;

    for (const key in metadata) {
        if (key in record) {
            const binder = getBinderFunc(metadata[key]?.type);
            obj[key] = binder(record[key], { propName: key });
        }
    }
    return obj;
}

export function getPropertyMetadata(target: any): MetaDataCollection {
    let metadata = target[propertyMetadataKey] as MetaDataCollection;
    if (metadata) return metadata;
    metadata = {};
    target[propertyMetadataKey] = metadata;
    return metadata;
}


export const stringBinderFunc: BinderFunc = (value: string) => value;
export const numberBinderFunc: BinderFunc  = (value: string) => Number(value);
export const booleanBinderFunc: BinderFunc  = (value: string) => value === "true" || value === "1"; // TODO: make better

export function getBinderFunc(type?: BinderType): BinderFunc {
    if (typeof(type) === "function") return type as BinderFunc;
    if (type === "number") return numberBinderFunc;
    if (type === "boolean") return booleanBinderFunc;
    return stringBinderFunc;
}


export type PrimitiveBinderType = "text" | "number" | "boolean" ;
export type BinderType = PrimitiveBinderType | BinderFunc;

export type BindOptions = {
    type?: BinderType;
}

export type BinderFunc = (value: string, params?: BinderFuncParams) => any;

export type BinderFuncParams = string | {
    propName?: string
}

export type FromQueryOptions = {
    query?: string;
}

export type MetaDataCollection = { [key:string]: BindOptions } 

/**
 * TODO: Review old code
 * @param input 
 * @returns 
 */
export function objectKeysToLowerCase(input: {[key: string]: any}) {
    const output: {[key: string]: any} = {};
    for (const prop in input) {
        output[prop.toLowerCase()] = input[prop];
    }

    return output;
}

/**
 * TODO: make good
 * @returns 
 */
export function getAllUrlParameters(query?: string): { [key: string]: string; } {
    try {
        var search = query ?? location.search.substring(1);
        if (!search) return {};
        return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    } catch (e) {
        console.error(e);
    }
    return {};
}
