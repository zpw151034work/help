//是否连续3次出现重复字符
const regRepeat = /([0-9a-zA-Z])\1{2}/
//是否包含大写字母
const regUpperLetter = /(?=.*[A-Z])/
//是否包含小写字母
const regLowerLetter = /(?=.*[a-z])/
//是否包含大小写
const regLetter = /(?=.*[A-Z])(?=.*[a-z])/
//是否包含数字
const regDigit = /(?=.*[0-9])/
//是否包含特殊字符
const regSpChar = /(?=.*[\W_])/
//组合验证，综合上面几种，并且密码长度不小于6位
const regCompose = /((?=.*[A-Z])|(?=.*[a-z]))(?=.*[0-9])(?=.*[\W_]).{6,}/

//是否连续3次出现重复字符
function repeatCheck(str){
    return regRepeat.test(str)
}

//是否包含大写字母
function upperLetterCheck(str){
    return regUpperLetter.test(str)
}

//是否包含小写字母
function lowerLetterCheck(str){
    return regLowerLetter.test(str)
}

//是否包含大小写字母
function letterCheck(str){
    return regLetter.test(str)
}

//是否包含数字
function digitCheck(str){
    return regDigit.test(str)
}

//是否包含特殊字符
function spCharCheck(str){
    return regSpChar.test(str)
}

//组合验证，综合上面三种，并且密码长度不小于6位
function composeCheck(str){
    return regCompose.test(str)
}

module.exports = {
    repeatCheck,
    upperLetterCheck,
    lowerLetterCheck,
    letterCheck,
    digitCheck,
    spCharCheck,
    composeCheck
}
