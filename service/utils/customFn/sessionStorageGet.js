export function sessionStorageGet(str) {
    if(sessionStorage.getItem(str) && sessionStorage.getItem(str) != '' && sessionStorage.getItem(str) != 'null' && sessionStorage.getItem(str) != 'undefine'){
        return JSON.parse(sessionStorage.getItem(str))
    }
    else{
        return null;
    }
};