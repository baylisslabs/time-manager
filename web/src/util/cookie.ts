
export function read(name: string) {
    var result = new RegExp('(?:^|; )' + encodeURIComponent(name) + '=([^;]*)').exec(document.cookie);
    return result ? result[1] : null;
}

export function write(name: string, value: string, seconds?: number) {
    const keyVals = [{name, value}];

    if(seconds) {
        keyVals.push(expiryKeyVal(seconds));
    }

    if(process.env.NODE_ENV!=="development") {
         keyVals.push(keyval("Secure",null));
     }

     keyVals.push(keyval("SameSite","strict"));

    document.cookie = keyVals.map(kv=>`${kv.name}=${kv.value}`).join("; ");
}

export function remove(name: string) {
    write(name, "", -1);
}

function expiryKeyVal(seconds: number) {
    var date = new Date();
    date.setTime(date.getTime() + (seconds * 1000));
    return keyval("expires",date.toUTCString());
}
function keyval(name: string, value: string) {
    return { name, value };
}

