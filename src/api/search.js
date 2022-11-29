/**
 * Created by mapbar_front on 2020/1/5.
 */
import request from '@/utils/request'

//搜索列表 所有的技能列表
export function searchList(data) {
    return request({
    // url: '/market/skillMarket/getMsRsSkillRobotList',
        url: `/webMarket/selectAll?current=${data.current}&size=${data.size}`,
        method: 'post',
        data,
    })
}
// 搜索
export function searchData(data) {
    return request({
    // url: '/webMarket/getSkillNane',
        url: `/webMarket/getSkillNane?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
        method: 'post',
        data,
    })
}

//得到所有的标签
//form表单的请求方式
export function getTag() {
    return request({
    // url: '/market/robotMarket/getTag',
        url: '/webMarket/selectLabel',
        method: 'post',
    // params,
    })
}
// 搜索
// webMarket\getSkillNane
