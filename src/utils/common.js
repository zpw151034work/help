/**
 *
 * 从缓存中取
 * @param storage_key
 * @returns {any}
 */
export function fetchStorage(storage_key) {
    return JSON.parse(window.localStorage.getItem(storage_key) || '[]')
}

/**
 * 存到缓存中
 * @param storage_key
 * @param items
 */
export function saveStorage(storage_key, items) {
    window.localStorage.setItem(storage_key, JSON.stringify(items))
}

/**
 *
 * 删除
 * @param storage_key
 * @returns {any}
 */
export function delStorage(storage_key) {
    window.localStorage.removeItem(storage_key);
}
/**
 * author: wangxiao
 * @param num 已使用
 * @param total 总数
 * @returns {any}
 */
export function toPercent(num, total) {
    //分母不能为0，因此如果total为0时，直接赋值为"0%"
    if (total === 0){
        return "0%";
    }
    return (Math.round(num / total * 10000) / 100.00 + "%");// 小数点后两位百分比
}
//判断是不是对象，如果是对象返回true，否则返回false
export function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
export function isArray(arr) {
    return Object.prototype.toString.call(arr).slice(8,-1) === 'Array';
}
