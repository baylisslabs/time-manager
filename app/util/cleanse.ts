export function cleanseString(value: any) {
    if(value == null) {
        return value;
    }
    if(typeof value !== "string") {
        return undefined;
    }
    return value.trim();
}
