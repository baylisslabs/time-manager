/* immutable dictionary type */

export interface Dict<T> {
    readonly [key: string]: T;
}

class DictClass {
    clone<T>(source:Dict<T> , modifers: Dict<T>) {
        return {...source, ...modifers};
    }

    singleton<T>(key: string, value: T) : Dict<T> {
        const obj = {};
        obj[key] = value;
        return obj;
    }

    create<T>(items: {key: string, value: T}[]) : Dict<T> {
        const obj = {};
        items.forEach(item=>{
            obj[item.key] = item.value;
        });
        return obj;
    }

    values<T>(dict: Dict<T>) : T[] {
        return Object.keys(dict).map(key=>dict[key]);
    }

    keys<T>(dict: Dict<T>) : string[] {
        return Object.keys(dict);
    }

    contains<T>(dict: Dict<T>, key: string): boolean {
        return dict.hasOwnProperty(key);
    }
}

export const Dict = new DictClass();
