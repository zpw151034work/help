import request from '@/utils/request'

// 机器人审核列表
export function getApprovalList (data) {
    return request({
        url: '/approval/list',
        method: 'post',
        data,
    })
}

// 机器人审核详情
export function getApprovalDetail(data) {
    return request({
        url: '/approval/detail?id='+data,
        method: 'get',
        // params: data
    })
}

// 提交审核结果
export function setApprovalIfAdopt (data) {
    return request({
        url: '/approval/ifAdopt',
        method: 'post',
        data,
    })
}