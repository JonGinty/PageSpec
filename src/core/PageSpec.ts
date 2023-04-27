import { bind, getBinderFunc, BinderFunc, BinderType, BindOptions } from "./binder";
import { getPropertyMetadata, MetaDataCollection } from "./metadata";
import { getAllUrlParameters, Newable, objectKeysToLowerCase } from "./utils";

export { bind }
export { BinderFunc }

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

export function fromRecord<T>(spec: Newable<T>, record: Record<string, string>): T {
    const obj = new spec() as any;
    const metadata = getPropertyMetadata(obj) ;
    if (!metadata) return obj;

    for (const key in metadata) {
        if (key in record) {
            const binder = getBinderFunc((metadata[key] as BindOptions)?.type);
            obj[key] = binder(record[key], { propName: key });
        }
    }
    return obj;
}





export type FromQueryOptions = {
    query?: string;
}





