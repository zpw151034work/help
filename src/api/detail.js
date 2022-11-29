/**
 * Created by mapbar_front on 2020/1/6.
 */
import request from '@/utils/request'

// 技能详情
export function relationSkill(data) {
    return request({
    // url: `/market/skillMarket/selectSkill?skillId=${id}`,
        url: '/msResourceRobot/relationSkill',
        method: 'get',
        params: data
    })
}

// 技能详情
export function skillDetail(data) {
    return request({
    // url: `/market/skillMarket/selectSkill?skillId=${id}`,
        url: '/skill/editSkill',
        method: 'post',
        data
    })
}
// 机器人详情
export function robotDetail(id) {
    return request({
        url: `/msResourceRobot/detail/${id}`,
        method: 'get'
    })
}
// 技能手册
export function getEditorDetail(data) {
    return request({
        url: '/skill/version/handbook/' + data,
        method: 'get',
        params: {}
    })
}
// 推荐机器人
export function getRecommendRobot(data) {
    return request({
        url: `/msResourceRobot/recommend`,
        method: 'get',
        data
    })
}
// 机器人下载
export function downloadRobot(data) {
    return request({
        url: `/msResourceRobot/downloadRobot`,
        method: 'post',
        data: data
    })
}
