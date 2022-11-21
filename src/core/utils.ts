

export type Newable<T> = { new (...args: any[]): T; };


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
