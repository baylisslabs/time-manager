export function cleanseString(value?: string) {
    if(typeof value !== "string") {
        return undefined;
    }

    if(value===null) {
        return null;
    }

    return value.trim();
}
