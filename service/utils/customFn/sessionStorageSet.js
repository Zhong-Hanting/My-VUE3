export function sessionStorageSet(str,obj) {
    if(str && obj){
        // 声明cache变量，便于匹配是否有循环引用的情况
        var cache = [];
        var stringify = JSON.stringify(obj, (key, value)=> {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // 移除
                    return;
                }
                // 收集所有的值
                cache.push(value);
            }
            return value;
        });
        cache = null; // 清空变量，便于垃圾回收机制回收
        sessionStorage.setItem(str,stringify)
        return true;
    }
    else{
        console.error('sessionStorageSet：参数错误')
        return false;
    }
};