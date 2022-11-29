/*
 * @Author: mingxing.huang
 * @LastEditors: name
 * @LastEditTime: 2021-12-23 15:42:27
 */
import request from '@/utils/request'

// 角色
export function getRoleList (pageNo = 1, pageSize = 10) {
    return request({
        url: '/sys/role/list',
        method: 'post',
        params: {
            pageNo,
            pageSize
        }
    })
}

export function createRole (data) {
    return request({
        url: `/sys/role/add`,
        method: 'post',
        data
    })
}

export function deleteRole (id) {
    return request({
        url: `/sys/role/delete`,
        method: 'post',
        params: {
            roleId: id
        }
    })
}

export function updateRole (data) {
    return request({
        url: `/sys/role/update`,
        method: 'post',
        data
    })
}

export function searchRole (pageNo = 1, pageSize = 10, roleName) {
    return request({
        url: `/sys/role/queryRoleByName`,
        method: 'post',
        params: {
            pageNo,
            pageSize,
            roleName
        }
    })
}

export function userListByRoleId (id, pageNo, pageSize) {
    return request({
        url: `/sys/role/queryUserByRoleId`,
        method: 'post',
        params: {
            roleId: id,
            pageNo,
            pageSize
        }
    })
}

// 用户
export function getUserList (pageIndex = 1, pageSize = 10) {
    let data = {
        pageIndex,
        pageSize
    }
    return request({
        url: '/sys/user/list',
        method: 'post',
        data
    })
}

export function createUser (data) {
    return request({
        url: `/sys/user/add`,
        method: 'post',
        data
    })
}

export function deleteUser (id) {
    return request({
        url: `/sys/user/delete`,
        method: 'post',
        params: {
            roleId: id
        }
    })
}

export function updateUser (data) {
    return request({
        url: `/sys/user/update`,
        method: 'post',
        data
    })
}

export function searchUser (data) {
    return request({
        url: `/sys/user/list`,
        method: 'post',
        data
    })
}

export function operationUser (id) {
    return request({
        url: `/sys/user/startStopUserByUserId`,
        method: 'post',
        params: {
            userId: id
        }
    })
}

// 部门
export function getDepartmentList () {
    return request({
        url: '/sys/depart/list',
        method: 'post'
    })
}
//得到部门树形数据
export function getDepartmentTree () {
    return request({
        url: '/sys/depart/treelist',
        method: 'post'
    })
}

export function createDepartment (data) {
    return request({
        url: `/sys/depart/add`,
        method: 'post',
        data
    })
}

export function deleteDepartment (id) {
    return request({
        url: `/sys/depart/delete`,
        method: 'post',
        params: {
            departId: id
        }
    })
}

export function updateDepartment (data) {
    return request({
        url: `/sys/depart/update`,
        method: 'post',
        data
    })
}

export function changeDepartment (id, action) {
    return request({
        url: `/sys/depart/upDownDepart?departId=${id}&action=${action}`,
        method: 'post'
    })
}

// 企业
export function getEnterpriseList () {
    return request({
        url: '/sys/enterprise/list',
        method: 'post'
    })
}

export function createEnterprise (data) {
    return request({
        url: `/sys/enterprise/add`,
        method: 'post',
        data
    })
}

export function deleteEnterprise (id) {
    return request({
        url: `/sys/enterprise/delete`,
        method: 'post',
        params: {
            enterpriseId: id
        }
    })
}

export function updateEnterprise (data) {
    return request({
        url: `/sys/enterprise/update`,
        method: 'post',
        data
    })
}

// 权限菜单
export function permissionList () {
    return request({
        url: '/sys/permission/list',
        method: 'post'
    })
}

// 行业信息
export function professionList () {
    const data = new URLSearchParams({
        dictCode: 'dict_profession'
    })
    return request({
        url: 'common/dict',
        method: 'post',
        data
    })
}
/*设置模块*/
//得到机器人组
export function getGroups (data) {
    return request({
        url: '/report/group/getGroups',
        method: 'post',
        data
    })
}
//启用和停用组
export function startOrStop (data) {
    return request({
        url: '/report/group/startOrStop',
        method: 'post',
        data
    })
}
//查询机器人组的成员
export function listGroupReport (data) {
    return request({
        url: '/report/group/listGroupReport',
        method: 'post',
        data
    })
}
//添加机器人组
export function groupAdd (data) {
    return request({
        url: '/report/group/add',
        method: 'post',
        data
    })
}
//获取机器人组 技能下拉列表数据
export function getSkillByUserId () {
    return request({
        url: '/report/group/getSkillByUserId',
        method: 'post',
    })
}
//修改机器人组
export function groupEdit (data) {
    return request({
        url: '/report/group/update',
        method: 'post',
        data
    })
}
//删除
export function groupDelete (data) {
    return request({
        url: '/report/group/delete',
        method: 'post',
        data
    })
}
//添加组成员数据
export function listInGroup (skillBid) {
    const data = new URLSearchParams({
        skillBid
    })
    return request({
        url: '/report/group/getUserListAndRobots',
        method: 'post',
        data
    })
}
//添加组成员保存
export function addGroupRelate (data) {
    return request({
        url: '/report/group/addGroupRelate',
        method: 'post',
        data
    })
}
//机器人组成员删除
export function deleteRobot (data) {
    return request({
        url: '/report/group/deleteRobot',
        method: 'post',
        data
    })
}
/*机器人分组模块*/
//新增
export function saveOrUpdate (data) {
    return request({
        url: '/business/saveOrUpdate',
        method: 'post',
        data
    })
}

//查询业务分组列表
export function businessList () {
    //const params = new URLSearchParams({bid});
    return request({
        url: '/business/list',
        method: 'post',
    })
}
//查询二级分组列表
export function selLevelBusinessList (bid) {
    const params = new URLSearchParams({ bid });
    return request({
        url: '/business/list',
        method: 'post',
        data: params,
    })
}
//切换状态
export function businessOperate (data) {
    return request({
        url: '/business/operate',
        method: 'post',
        data,
    })
}
//一级分组列表数据上下移动
export function businessRanking (data) {
    return request({
        url: '/business/ranking',
        method: 'post',
        data,
    })
}
//搜索分组数据
export function listByCon (data) {
    return request({
        url: '/business/listByCon',
        method: 'post',
        data,
    })
}
//得到操作日志列表
export function getLogList (data) {
    return request({
        url: '/operateLog/list',
        method: 'post',
        data,
    })
}
//组件列表
export function listComp (data) {
    return request({
        url: '/sys/MsComp/listComp',
        method: 'post',
        data,
    })
}
//组件查看
export function compAddUpdate (data) {
    return request({
        url: '/sys/MsComp/detailComp',
        method: 'post',
        data,
    })
}

//组件新增
export function updateComp (data) {
    return request({
        url: '/sys/MsComp/updateComp',
        method: 'post',
        data,
    })
}


//组件字典列表
export function listCompPropDictByName (data) {
    return request({
        url: '/sys/MsComp/listCompPropDictByName',
        method: 'post',
        data,
    })
}

//组件字典列表
export function addComp (data) {
    return request({
        url: '/sys/MsComp/addComp',
        method: 'post',
        data,
    })
}
//组件字典删除
export function deleteComp (data) {
    return request({
        url: '/sys/MsComp/deleteComp',
        method: 'post',
        data,
    })
}
//组件字典详情
export function detailCompPropDict (data) {
    return request({
        url: '/sys/MsComp/detailCompPropDict',
        method: 'post',
        data,
    })
}
//组件字典详情
export function updateCompPropDict (data) {
    return request({
        url: '/sys/MsComp/updateCompPropDict',
        method: 'post',
        data,
    })
}
//组件字典添加
export function addCompPropDict (data) {
    return request({
        url: '/sys/MsComp/addCompPropDict',
        method: 'post',
        data,
    })
}
//组件字典添加
export function deleteCompPropDict (data) {
    return request({
        url: '/sys/MsComp/deleteCompPropDict',
        method: 'post',
        data,
    })
}
//删除组件属性
export function deleteCompProp (data) {
    return request({
        url: '/sys/MsComp/deleteCompProp',
        method: 'post',
        data,
    })
}

//组件配置查询
export function listCompProp (data) {
    return request({
        url: '/sys/MsComp/listCompProp',
        method: 'post',
        data,
    })
}

//组件配置查询
export function detailCompProp (data) {
    return request({
        url: '/sys/MsComp/detailCompProp',
        method: 'post',
        data,
    })
}
//组件配置新增
export function addCompProp (data) {
    return request({
        url: '/sys/MsComp/addCompProp',
        method: 'post',
        data,
    })
}

//组件配置修改
export function updateCompProp (data) {
    return request({
        url: '/sys/MsComp/updateCompProp',
        method: 'post',
        data,
    })
}

//组件配置字典信息
export function listCompPropDict (data) {
    return request({
        url: '/sys/MsComp/listCompPropDict',
        method: 'post',
        data,
    })
}

//组件字典信息
export function listDictByName (data) {
    const params = new URLSearchParams(data);
    return request({
        url: '/sys/MsComp/listDictByName',
        method: 'post',
        data: params,
    })
}

/**
 * 表单管理 表单树 查询表单
 * @param {*} data
 */
export function queryFormList (data) {
    return request({
        url: '/yw/form/queryFormClassifTree',
        method: 'post',
        data: data,
    })
}

/**
 * 表单管理 表单树 添加表单分类
 * @param {*} data
 * {bid:业务id,level:层级,name:表单分类名称,parentId:父节点} 一级节点 parentId = 0;
 */
export function saveFormClassif (data) {
    return request({
        url: '/yw/form/saveFormClassif',
        method: 'post',
        data,
    })
}

/**
 * 表单管理 表单树 修改表单分类
 * @param {*} data
 * {bid:业务id,level:层级,name:表单分类名称,parentId:父节点} 一级节点 parentId = 0;
 */
export function updateFormClassif (data) {
    return request({
        url: '/yw/form/updateFormClassif',
        method: 'post',
        data,
    })
}

/**
 * 表单管理 表单树 删除表单分类
 * @param {*} data
 * {bid:业务ID,删除 status = '-1'}
 */
export function deleFormClassif (data) {
    return request({
        url: '/yw/form/deleFormClassif',
        method: 'post',
        params: data,
    })
}

/**
 * 表单管理 添加表单
 * @param {*} data
 * {name:业务表名,tableField:业务表字段,formClassifId:表单分类bi,status:0}
 */
export function saveOrUpdateForm (data) {
    return request({
        url: '/yw/form/saveForm',
        method: 'post',
        data,
    })
}

/**
 * 表单管理 删除单个表单
 * @param {*} data
 *
 */
export function deleForm (data) {
    return request({
        url: '/yw/form/deleForm',
        method: 'post',
        data,
    })
}

/**
 * 表单管理 修改单个表单
 * @param {*} data
 *
 */
export function updateForm (data) {
    return request({
        url: '/yw/form/updateForm',
        method: 'post',
        data,
    })
}

/**
 * 表单管理 删除多个表单
 * @param {*} data
 *
 */
export function deleMoreForm (data) {
    return request({
        url: '/yw/form/deleMoreForm',
        method: 'post',
        data,
    })
}

/**
 * 表单管理 查询表单列表 (分页条件)
 * @param {*} data
 */
export function saveOrUpdateList (data) {
    return request({
        url: '/yw/form/queryFormTableListByFormClassif',
        method: 'post',
        data,
    })
}

/**
 * 表单管理 查询表单列表 搜索
 * @param {*} data
 */
export function findFormTableList (data) {
    return request({
        url: '/yw/form/queryFormTableList',
        method: 'post',
        data,
    })
}
//用户-签退功能
export function signOut (data) {
    return request({
        url: '/sys/user/pickOutByUserId',
        method: 'post',
        params: data,
    })
}
//新增和修改用户-部门：通过departId获得树形部门数据
export function treeBidListByDepartId (data) {
    return request({
        url: '/sys/depart/selectByDeptId',
        method: 'get',
        params: data,
    })
}
export function getEditorDetail (data) {
    return request({
        url: '/skill/version/handbook/' + data,
        method: 'get',
        params: {},
    })
}

//资源管理列表
export function resourceManageList (data) {
    return request({
        url: '/msCsVar/listPage',
        method: 'get',
        params: data,
    })
}
//资源管理 删除列表的每一项数据
export function delResourceManageListItem (data) {
    return request({
        url: '/msCsVar/delete',
        method: 'delete',
        data,
    })
}
//资源管理 保存新增和编辑字段
export function saveAddOrEditField (data) {
    return request({
        url: '/msCsVar/saveOrUpdate',
        method: 'post',
        data,
    })
}
