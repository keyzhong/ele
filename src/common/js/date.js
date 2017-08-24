/*
    格式化日期
    stringObject.substr(start,length) 截取字符串 
 */

export function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
        // (y) 匹配y保存y在名为$1...$9的变量中 
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero (str) {  // 补0
    return ('00' + str).substr(str.length);
};
