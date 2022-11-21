import { getPropertyMetadata } from "./metadata";

export function bind(ops?: BindOptions) {
    if (!ops) ops = {};
    return function (target: any, propName: string) {
        // console.log("stuff:", { ...ops, target, propName  });
        const metadata = getPropertyMetadata(target);
        metadata[propName] = ops as BindOptions;
    }
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