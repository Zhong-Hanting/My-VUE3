export function makeRandom(s, e, l) {
    function createRandom(ss, ee) {
        return Math.floor(Math.random()*(ee-ss+1))+parseInt(ss)
    }
    function createArr(arr) {
        let arrs = arr || [];
        let random = createRandom(s, e)
        //注，e-s>=l-1用于判断起始数区间是否大于等于数组长度-1（因为包含s本身），如果不大于，则不满足创建不重复数组的条件，则有可能会返回一个包含重复数值的数组
        arrs.includes(random) && e - s >= l-1 ? createArr(arrs) : arrs.push(random)

        if (arrs.length < l) {
            createArr(arrs)
        }
        return arrs;
    }

    return l ? createArr() : createRandom(s, e)
}