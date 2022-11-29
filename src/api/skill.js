/*
 * @Author: mingxing.huang
 * @LastEditors: name
 * @LastEditTime: 2022-01-12 10:59:32
 */
import request from '@/utils/request'

// 下载技能
export function downloadSkill(data) {
    return request({
        url: '/resource/skill/download',
        method: 'post',
        data
    })
}

export function getSkillList (current, size = 10) {
    const params = new URLSearchParams({
        current,
        size
    })
    return request({
        url: '/skill/list',
        method: 'post',
        data: params
    })
}

export function searchSkill (current, size = 10, name, state) {
    const params = new URLSearchParams({
        current,
        size,
        name,
        state
    })
    return request({
        url: '/skill/list',
        method: 'post',
        data: params
    })
}

export function deleteSkill (skillId) {
    const data = new URLSearchParams({
        skillId
    })
    return request({
        url: `/skill/del`,
        method: 'post',
        data
    })
}

export function saveSkill (obj) {
    const params = new URLSearchParams(obj)
    return request({
        url: '/skill/saveOrUpdate',
        method: 'post',
        data: params
    })
}

// 技能详情
export function skillDetail (id) {
    const data = new URLSearchParams({
        skillId: id
    })
    return request({
        url: `/skill/detail`,
        method: 'post',
        data
    })
}

// 技能类型
export function skillTypeList () {
    const data = new URLSearchParams({
        dictCode: 'skill_type'
    })
    return request({
        url: 'common/dict',
        method: 'post',
        data
    })
}

// 技能分类
export function skillClassifyList () {
    const data = new URLSearchParams({
        dictCode: 'skill_classify'
    })
    return request({
        url: 'common/dict',
        method: 'post',
        data
    })
}
export function searchSkillState (params) {
    const data = new URLSearchParams({
        skillId: params.skillId,
        skillVersionId: params.skillVersionId
    })
    return request({
        url: `/skill/preOffSkill`,
        method: 'get',
        params: data,
    })
}

// 修改技能状态
export function changeSkillState (skillId, state) {
    const data = new URLSearchParams({
        skillId,
        state
    })
    return request({
        url: `/skill/update/state`,
        method: 'post',
        data
    })
}

//机器人监控修改技能状态
export function changeLocalSkillState (data) {
    return request({
        url: `/skill/local/operate`,
        method: 'post',
        data
    })
}
// 组件列表
export function componentList () {
    return request({
        url: '/sys/comp/compList',
        method: 'post'
    })
}

// 组件属性
export function componentAttrListNew (id) {
    return request({
        url: `/sys/comp/compProperList/${id}/2`,
        method: 'post'
    })
}
export function componentAttrList (id) {
    return request({
        url: `/sys/comp/compProperList/${id}`,
        method: 'post'
    })
}

// 保存流程数据
export function saveAttrList (bid, data, tree, attr, graph, skillFlag) {
    const params = new URLSearchParams({
        bid,
        modelEditorJson: JSON.stringify(data),
        treeData: JSON.stringify(tree),
        attributeData: JSON.stringify(attr),
        graphicalJson: JSON.stringify(graph),
        skillFlag,
    })
    return request({
        url: `skill/model/editor`,
        method: 'post',
        data: params
    })
}

// 编译
export function compileEditor (bid) {
    const params = new URLSearchParams({
        bid
    })
    return request({
        url: `skill/model/editor/compile`,
        method: 'post',
        data: params
    })
}

// 运行
export function runEditor (bid) {
    const params = new URLSearchParams({
        bid
    })
    return request({
        url: `skill/model/editor/run`,
        method: 'post',
        data: params
    })
}

//修改技能历史版本
export function getVersionList (bid) {
    const params = new URLSearchParams({
        bid
    })
    return request({
        url: `/skill/getVersionList`,
        method: 'post',
        data: params
    })
}

//修改技能历史版本开关切换 form表单传值
export function enableAndDisable (bid, state) {
    const params = new URLSearchParams({
        bid,
        state,
    })
    return request({
        url: '/skill/enableAndDisable',
        method: 'post',
        data: params,
    })
}

//提交
/*
export function skillSubmit(bid) {
  const params = new URLSearchParams({
    bid,
  })
  return request({
    url: '/skill/submit',
    method: 'post',
    data:params,
  })
}
*/
//于20191127添加的提交
export function skillSubmit (bid, data, tree, attr, graph, skillFlag) {
    const params = new URLSearchParams({
        bid,
        modelEditorJson: JSON.stringify(data),
        treeData: JSON.stringify(tree),
        attributeData: JSON.stringify(attr),
        graphicalJson: JSON.stringify(graph),
        skillFlag,
    })
    return request({
        url: '/skill/submit',
        method: 'post',
        data: params,
    })
}
//调试
export function debugSkill (bid, data) {
    const params = new URLSearchParams({
        bid,
        modelEditorJson: JSON.stringify(data),
        flag: '1',
    })
    return request({
        url: `/skill/debugSkill`,
        method: 'post',
        data: params
    })
}

//导出 form表单传值
export function exportTxt (bid) {
    const params = new URLSearchParams({
        bid,
    })
    return request({
        url: `/import/exportTxt`,
        method: 'post',
        data: params,
    })
}
//新增全局变量
export function variableAdd (data) {
    return request({
        url: '/skill/variable/add',
        method: 'post',
        data,
    })
}
//修改全局变量
export function variableUpdate (data) {
    return request({
        url: '/skill/variable/update',
        method: 'post',
        data,
    })
}
//删除全局变量
export function variableDelete (data) {
    return request({
        url: '/skill/variable/delete',
        method: 'post',
        data,
    })
}
//调用查询接口
export function variableSelectList (data) {
    return request({
        url: '/skill/variable/selectList',
        method: 'post',
        data,
    })
}
//全局变量和局部变量搜索的接口
export function variableSearch (data) {
    return request({
        url: '/skill/variable/searchVariable',
        method: 'post',
        data,
    })
}

//查看代码
export function codeView (data) {
    const params = new URLSearchParams({
        skillId: data
    })
    return request({
        url: '/skill/findJsonBySkillId',
        method: 'post',
        data: params,
    })
}

//单步调试  默认是全部
export function debuggingCode (data) {
    return request({
        url: '/skill/model/editor/compileByStep',
        method: 'post',
        data,
    })
}

// 我获取的技能列表
export function getMySkillList (data) {
    return request({
        url: '/resource/skill/manage/record/page',
        method: 'post',
        data,
    })
}

// 获取的技能下载
export function mySkillDownload (data) {
    return request({
        url: '/resource/skill/manage/record/download',
        method: 'post',
        data,
    })
}
// 删除我获取的技能
export function deleteMySkiil (data) {
    return request({
        url: '/resource/skill/manage/record',
        method: 'post',
        data,
    })
}
