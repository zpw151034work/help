import request from '@/utils/request'
// 获取热门技能
export function getSkillRobotList(data) {
    return request({
        url: '/resource/skill/rank',
        method: 'post',
        data
    })
}
// 获取技能列表 分页
export function getSkillListPage(data) {
    return request({
        url: '/resource/skill/page',
        method: 'post',
        data
    })
}
// 获取机器人列表 分页
export function getMsResourceRobotList(data) {
    return request({
        url: '/msResourceRobot/list',
        method: 'post',
        data
    })
}
// 获取技能详情
export function getSkillDetail(data) {
    return request({
    // url: '/api/resource/skill',
        url: '/resource/skill/get',
        method: 'get',
        params: data
    })
}
// 获取技能版本号
export function getSkillVersionList(data) {
    return request({
    // url: `/api/resource/skill/${data.skillId}`,
        url: `/resource/skill/versions`,
        method: 'get',
        params: data
    })
}
// 获取技能
export function obtainSkill(data) {
    return request({
        url: '/resource/skill/obtain',
        method: 'POST',
        data
    })
}
// 下载技能
export function downloadSkill(data) {
    return request({
        url: '/resource/skill/download',
        method: 'post',
        data
    })
}
// 技能分类枚举
export function getSkillDict(data) {
    return request({
        url: '/common/dict?dictCode=skill_classify',
        method: 'post',
        data
    })
}
// 获取帮助文档一级类目
export function getDocMenuList(data) {
    return request({
        url: '/resourceMarket/docMenu/oneLevel',
        method: 'post',
        data
    })
}
// 获取分类集合
export function gethelpDocClassList(data) {
    return request({
        url: '/resourceMarket/docMenu/helpDoc',
        method: 'post',
        data
    })
}
// 获取文档详情
export function gethelpDocDetail(data) {
    return request({
        url: '/resourceMarket/doc/detail',
        method: 'get',
        params: data
    })
}
// 试运行
export function tempSaveDispatchTask(params) {
    return request({
        url: '/task/tempSaveDispatchTask',
        method: 'get',
        params
    })
}
