import request from '@/utils/request'
//已发布机器人
export function getRobotList (data) {
    // const params = new URLSearchParams(data)
    const params = data
    return request({
        url: '/approval/publishedList',
        method: 'post',
        data: params
    })
}
// 删除已发布机器人列表
export function deleteRobot (id) {
    return request({
        url: `/approval/setDelete/${id}`,
        method: 'post'
    })
}
// 上线下线已发布机器人
export function setRobotOnOff (data) {
    const params = data
    return request({
        url: '/approval/ifShow',
        method: 'post',
        data: params
    })
}
//已获取机器人列表
export function getRecordList (data) {
    // const params = new URLSearchParams(data)
    const params = data
    return request({
        url: '/record/list',
        method: 'post',
        data: params
    })
}
// 删除已获取机器人列表
export function deleterRecord (id) {
    return request({
        url: `/record/delete/${id}`,
        method: 'post'
    })
}
// 已获取机器人详情
export function getRecordDetail(data) {
    return request({
        url: '/record/detail?id='+data,
        method: 'get',
        // params: data
    })
}
