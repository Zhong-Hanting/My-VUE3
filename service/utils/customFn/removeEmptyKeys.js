export function removeEmptyKeys(obj) {
    let data = JSON.parse(JSON.stringify(obj))
    for ( var key in data ){
        if ( data[key] === '' || data[key] === null || data[key] === undefined){
            delete data[key]
        }
    }
    return data;
}