import request from '@/utils/request'
import md5 from 'js-md5'

export function login(data) {
    // 解决：形参data改变引起实参改变，导致的bug
    // let dealData = JSON.parse(JSON.stringify(data));
    const dealData = Object.assign({}, data)
    // sessionStorage.setItem('userName', data.userName)
    // sessionStorage.setItem('password', md5(data.password))
    localStorage.setItem('userName', dealData.userName)
    localStorage.setItem('password', md5(dealData.password))
    dealData.password = md5(dealData.password)
    return request({
    // url: '/ressvcmkt/sys/login',
        url: 'admin/v1/sys/ressvcmkt/login',
        // url: '../../admin/plat/sys/ressvcmkt/login',
        method: 'post',
        // params: data,
        data: dealData
    })
}

export function loginRPA(data) {
    const date1 = Object.assign({}, data)
    // data.userName = sessionStorage.getItem('userName')
    // data.password = sessionStorage.getItem('password')
    date1.password = md5(date1.password)
    return request({
    // url: '/ressvcmkt/sys/login',
        url: '/sys/login',
        // url: '../../admin/plat/sys/login',
        method: 'post',
        // params: data,
        data: date1
    })
}

export function getInfo(token) {
    return request({
        url: 'market/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: 'market/user/logout',
        method: 'post'
    })
}

export function register(data) {
    return request({
    // url: '/ressvcmkt/sys/reg',
        url: 'admin/v1/sys/ressvcmkt/reg',
        // url: '../../admin/plat/sys/ressvcmkt/reg',
        method: 'post',
        data
    })
}

// 用户信息
export function getUserInfo() {
    return request({
        url: '/sys/user/resource/get',
        method: 'get'
    })
}

