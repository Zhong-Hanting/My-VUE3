export function getMonthDays(year,month) {
    var date = new Date();
    var y = year || date.getFullYear();
    var m = month || date.getMonth() + 1;
    var d = new Date(y, m, 0);
    let length = d.getDate();
    let arr = Array.from({ length: length }, (v, k) => (m < 10 ? '0' + m : m) + '/' + (k + 1 < 10 ? '0' + (k + 1) : k + 1));
    return arr;
}