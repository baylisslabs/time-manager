export default function has<T>(obj: T, prop: keyof T) {
    return (obj.hasOwnProperty(prop) && (typeof obj[prop] !== "undefined"));
}
