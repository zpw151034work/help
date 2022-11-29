/**
 * Created by mapbar_front on 2019/9/15.
 */
import request from '@/utils/request'

//机器人
export function getRobotList (data) {
    const params = new URLSearchParams(data)
    return request({
        url: '/robot/list',
        method: 'post',
        data: params,
    })
}
//得到组织的下拉列表数据
export function getDepartList (data) {
    const params = new URLSearchParams(data);
    return request({
        url: '/sys/depart/list',
        method: 'post',
        data: params,
    })
}
//得到个人的下拉列表数据
export function getPersonList (data) {
    const params = new URLSearchParams(data);
    return request({
        url: 'sys/user/alluserlist',
        method: 'post',
        data: params,
    })
}
//得到行业的下拉列表数据
export function getIndustryList () {
    const params = new URLSearchParams({ dictCode: 'dict_profession' });
    return request({
        url: '/common/dict',
        method: 'post',
        data: params
    })
}
//得到用户类型下拉列表数据
export function getUserTypeList () {
    const params = new URLSearchParams({ dictCode: 'user_type' });
    return request({
        url: '/common/dict',
        method: 'post',
        data: params
    })
}
export function saveSkill (data) {
    // const params = new URLSearchParams({ bid: data.idList });
    return request({
        url: `/robot/update/skill/${data.bid}`,
        method: 'post',
        data: data.idList
    })
}
//新增机器人保存
export function robotSave (data) {
    // const params =new URLSearchParams(data);
    return request({
        url: '/robot/saveOrUpdate',
        method: 'post',
        data,
        // data: params
    })
}
//设置机器人保存
export function robotEditSave (data) {
    // const params = new URLSearchParams(data);
    return request({
        url: '/robot/saveOrUpdate',
        method: 'post',
        data,
        // data: params
    })
}
//设备管理列表数据
export function getDeviceList (data) {
    const params = new URLSearchParams(data);
    return request({
        url: '/robot/device/list',
        method: 'post',
        data: params
    })
}
//机器人详情
export function robotDetail (robotId) {
    const params = new URLSearchParams({ robotId });
    return request({
        url: '/robot/detail',
        method: 'post',
        data: params,
    })
}

//得到部门的下拉树形数据(new)
export function departmentTreeList (data) {
    return request({
        url: '/sys/depart/queryDepartListByLoginUserId',
        method: 'post',
        data,
    })
}

//得到当前登录用户下的部门和人(new)
export function loginPersonTreeList () {
    return request({
        url: 'sys/depart/queryPersonalAndDepartAllList',
        method: 'post',
    })
}
//机器人技能服务列表
// export function skillServer(robotId) {
//   const params = new URLSearchParams({robotId});
//   return request({
//     url: `robot/skill/list`,
//     method: 'post',
//     data: params
//   })
// }
//机器人技能服务列表
export function skillServer (robotId) {
    const params = new URLSearchParams({ robotId });
    return request({
        url: 'skill/queryHistorySkill',
        method: 'post',
        data: params
    })
}
//添加技能列表
export function skillShop (robotId, queryType) {
    let params = new URLSearchParams({ robotId, queryType });
    return request({
        url: `skill/shop`,
        method: 'post',
        data: params
    })
}
//修改机器人状态
export function robotState (state, robotId) {
    const params = new URLSearchParams({ state, robotId });
    return request({
        url: '/robot/update/state',
        method: 'post',
        data: params,
    })
}
//点击添加技能列表中的每一项
export function skillSeleted (data) {
    const params = new URLSearchParams(data);
    return request({
        url: 'robot/add/skill',
        method: 'post',
        data: params,
    })
}
//修改设备状态
export function deviceState (state, bid) {
    const params = new URLSearchParams({ state, bid });
    return request({
        url: '/robot/update/device/state',
        method: 'post',
        data: params,
    })
}
//删除点击技能服务对应的项
export function delSkill (robotId, serviceId) {
    const params = new URLSearchParams({ robotId, serviceId });
    return request({
        url: '/robot/skill/delSkill',
        method: 'post',
        data: params,
    })
}
//通过bid查询设备管理的数据
export function deviceManagerData (data) {
    return request({
        url: '/robot/device/info',
        method: 'post',
        data: data,
    })
}
//设备管理-修改设备名称
export function modifyEquipName (data) {
    return request({
        url: '/robot/device/update',
        method: 'post',
        data: data,
    })
}

// 删除机器人列表
export function deleteRobot (data) {
    return request({
        url: '/robot/delRobot',
        method: 'post',
        data,
    })
}
// 上传图片
export function uploadImage(data,config) {
    return request({
        url: '/file/uploadImage',
        method: 'post',
        data: data,
        ...config,
    })
}
// 机器人发布
export function releaseRobot (data) {
    return request({
        url: '/approval/release?id='+data,
        method: 'get',
        data,
    })
}
// 获取机器人头像地址

export function getFilePath (data) {
    return request({
        url: '/file/getFilePath?id='+data,
        method: 'get'
    })
}
