import request from '@/utils/request'
// 获取轮播图下面的技能列表
export function getSkillRobotListForFirst(data) {
    return request({
    // url: '/market/skillMarket/getSkillRobotListForFirst',
        url: '/webMarket/getSkillAll',
        method: 'post',
        data
    })
}

export function getCoopEnterpriseList(data) {
    return request({
        url: '/market/robotMarket/getCoopEnterpriseList',
        method: 'post',
        data
    })
}
//
export function getTag(data) {
    return request({
        url: '/market/robotMarket/getTag',
        method: 'post',
        params: data
    })
}
// 技能下载
export function download(data) {
    return request({
    // url: '/market/zipDownload/skill',
        url: '/file/idDownLoad',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/market/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/market/user/logout',
        method: 'post'
    })
}

// 退出登录
export function loginout() {
    return request({
    // url: 'market/ressvcmkt/sys/loginout',
        url: '/sys/ressvcmkt/loginout',
        // url: 'market/sys/ressvcmkt/loginout',
        // url: '../../admin/plat/sys/ressvcmkt/loginout',
        method: 'post'
    })
}
// 机器人下载 /market/zipDownload/robot
export function robotDownload(data) {
    return request({
        url: 'market/zipDownload/robot',
        method: 'post',
        data
    // params: { data }
    })
}

// 首页轮播
export function carousellist(data) {
    return request({
        url: '/market/carousel/list',
        method: 'post',
        data
    })
}

// 获取所有技能
