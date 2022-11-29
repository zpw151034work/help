/**
 * Created by mapbar_front on 2020/6/5.
 */
import request from '@/utils/request'
import md5 from 'js-md5'
// 新版发送短信验证码
export function sendPhoneverification(data) {
    return request({
        url: '/sys/resource/sendSms',
        method: 'post',
        data
    })
}

// 新版注册
export function register(data) {
    return request({
        url: '/sys/resource/register',
        method: 'post',
        data
    })
}

// 新版修改密码
export function setPassword(data) {
    console.log(222232323,data)
    const dealData = Object.assign({}, data)
    console.log(21)
    dealData.password = md5(dealData.password)
    console.log(33)
    dealData.confirmPassword = md5(dealData.confirmPassword)
    console.log(222222)
    return request({
        url: '/sys/resource/setPassword',
        method: 'post',
        data: dealData
    })
}
// 发送短信验证码
export function sendShortMsgCode(params) {
    // const params = new URLSearchParams({
    //   phone
    // })
    return request({
        url: '/admin/v1/rpa/msg/send',
        method: 'post',
        data: params
    })
}
// 忘记密/码-修改密码
export function forgetPasswordMsodify(data) {
    const dealData = Object.assign({}, data)
    dealData.password = md5(dealData.password)
    dealData.password2 = md5(dealData.password2)

    return request({
        url: '/admin/v1/sys/ressvcmkt/updatePW',
        method: 'post',
        data: dealData
    })
}

// 修改密码-确认
export function modifyPassword(data) {
    const dealData = Object.assign({}, data)
    dealData.oldpassword = md5(dealData.oldpassword)
    dealData.password = md5(dealData.password)
    dealData.password2 = md5(dealData.password2)

    return request({
        url: '/sys/ressvcmkt/updatePassword',
        method: 'post',
        data: dealData
    })
}

//重置密码
export function resetPwdNoLogin (data){
    let dealData = Object.assign({}, data);
    dealData.oldpassword = md5(dealData.oldpassword);
    dealData.password = md5(dealData.password);
    dealData.password2 = md5(dealData.password2);
    return request({
        url: '/sys/ressvcmkt/retrieve-password',
        method: 'post',
        data: dealData,
    })
}
