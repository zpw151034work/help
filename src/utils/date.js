//对时间戳进行处理 年-月-日 时：分：秒
export function utilFormatDate(value){
    let date = new Date(value);
    let y = date.getFullYear();// 年
    let MM = date.getMonth() + 1;// 月
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();// 日
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();// 时
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();// 分
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();// 秒
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}
export function formatDateTime(value) {
    if (!value) {
        return '';
    }
    return utilFormatDate(value);
}
//对时间进行分割和处理
export function getYYMMDD(dateTime){
    if (!dateTime){
        return dateTime;
    }
    var date=new Date(dateTime);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var day = date.getDate();
    day = day < 10 ? ('0' + day) : day;
    return {
        year,
        month,
        day,
    }
}

//获取当前日期的年月日 时间格式YY-MMM-DD
export function getYearMonthDay(){
    let date=new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var day = date.getDate();
    day = day < 10 ? ('0' + day) : day;
    return `${year}-${month}-${day}`;
}

//比较两个时间大小
export function compareDate(date) {
    let currentDate = new Date();
    let onceDate = new Date(date);
    //执行一次的时间 < 当前时间
    if (onceDate.getTime() - currentDate.getTime() < 0) {
        return true;
    } else {
        return false;
    }
}
