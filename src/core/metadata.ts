
const propertyMetadataKey = Symbol.for("design:propertyMetadata");

export function getPropertyMetadata(target: any): MetaDataCollection {
    let metadata = target[propertyMetadataKey] as MetaDataCollection;
    if (metadata) return metadata;
    metadata = {};
    target[propertyMetadataKey] = metadata;
    return metadata;
}


export type MetaDataCollection = { [key:string]: {} } 