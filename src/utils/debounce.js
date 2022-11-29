export function debounce(fn, delay) {
    delay = delay || 1000
    var timer
    return function() {
        var th = this
        var args = arguments
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function() {
            timer = null
            fn.apply(th, args)
        }, delay)
    }
}
