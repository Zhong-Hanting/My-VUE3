export function secondsFormat(s) {
    if (!(/(^[1-9]\d*$)/.test(s))){
        return '参数格式错误'
    }
    else{
        var day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整 
        var hour = Math.floor((s - day * 24 * 3600) / 3600);
        var minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
        var second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
        let str = ''
        if (day) str += day + "天";
        if (hour) str += hour + "小时";
        str += (minute>10?minute:"0"+minute) + "分";
        str += (second>10?second:"0"+second) + "秒";
        return str;
    }
    
}