export function localStorageGet(str) {
    if(localStorage.getItem(str) && localStorage.getItem(str) != '' && localStorage.getItem(str) != 'null' && localStorage.getItem(str) != 'undefine'){
        return JSON.parse(localStorage.getItem(str))
    }
    else{
        return null;
    }
};