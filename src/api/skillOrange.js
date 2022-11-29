/*
 * @Author: mingxing.huang
 * @LastEditors: name
 * @LastEditTime: 2022-01-12 10:59:32
 */
import request from '@/utils/request'


//rpa平台的技能分页（发布已有技能）
export function getAlreadySkillList(current, size = 10) {
    const params = {
        current,
        size
    }
    return request({
        url: '/resource/skill/manage/rpa/page',
        method: 'post',
        data: params
    })
}
//技能版本更新上线下线状态
export function getHandlGoOnline(data) {
    const params = data
    return request({
        url: '/resource/skill/manage/setStatus',
        method: 'post',
        data: params
    })
}

//rpa平台的技能分页（发布已有技能）
export function getRelationSkillList(current, size = 10, skillId) {
    const params = {
        current,
        size, skillId
    }
    return request({
        url: '/resource/skill/manage/version/page',
        method: 'post',
        data: params
    })
}

//当前技能 rpa平台（未）发布到资源市场的版本列表（选择版本）
export function getNoRelation(rpaSkillId) {
    const data = new URLSearchParams({
        rpaSkillId: rpaSkillId
    })
    return request({
        url: '/resource/skill/manage/rpa/noRelation',
        method: 'get',
        params: data
    })
}

//当前技能 rpa平台已发布到资源市场的版本列表（已发布版本）
export function getPublished(current, size = 10, rpaSkillId) {
    const data = new URLSearchParams({
        rpaSkillId: rpaSkillId,
        current: current,
        size: size
    })
    return request({
        url: '/resource/skill/manage/rpa/relation',
        method: 'get',
        params: data
    })
}

//上传获取压缩包内容
export function sendZipInfo(file) {
    var form = new FormData();
    form.append('zipFile', file);
    return request({
        url: '/resource/skill/manage/zipInfo',
        method: 'post',
        data: form
    })
}

export function getSkillList(current, size = 10) {
    const params = {
        current,
        size
    }
    return request({
        url: '/resource/skill/manage/page',
        method: 'post',
        data: params
    })
}

export function searchSkill(current, size = 10, skillName, status) {
    const params = {
        current,
        size,
        skillName,
        status
    }
    return request({
        url: '/resource/skill/manage/page',
        method: 'post',
        data: params
    })
}

export function deleteSkill(skillId,skillVersionId) {

    return request({
        url: `/resource/skill/manage/${skillId}/${skillVersionId}`,
        method: 'post',

    })
}
//技能版本发布
export function saveSkill(obj) {
    console.log("obj-----", obj)

    var form = new FormData();

    if (obj.publishType == 0) {
        form.append('rpaSkillId', obj.rpaSkillId);
        form.append('rpaSkillVersionId', obj.rpaSkillVersionId);
        form.append('rpaVersion', obj.rpaVersion);
        form.append('publishType', obj.publishType);
    } else {
        form.append('zipFile', obj.zipFile);
        form.append('publishType', obj.publishType);
        form.append('handbookCoverImage', obj.handbookCoverImage);
        form.append('handbookContent', obj.handbookContent);
        form.append('description', obj.description);
        form.append('version', obj.version);
        form.append('skillName', obj.skillName);
        if (obj.skillVersionId){
            form.append('skillVersionId', obj.skillVersionId);
        }
    }
    form.append('classifyId', obj.classifyId);




    return request({
        url: '/resource/skill/manage/publish',
        method: 'post',
        data: form
    })
}

// 技能详情
export function skillDetail(objData) {
    if (objData.rpaSkillId) {
        const data = new URLSearchParams({
            rpaSkillId: objData.rpaSkillId,
            rpaSkillVersionId: objData.rpaSkillVersionId
        })
        return request({
            url: `/resource/skill/manage/rpa/skill/version`,
            method: 'get',
            params: data
        })

    } else {
        const data = new URLSearchParams({
            skillId: objData.skillId,
            skillVersionId: objData.skillVersionId
        })
        return request({
            url: `/resource/skill/manage`,
            method: 'get',
            params: data
        })
    }

}

// 技能类型
export function skillTypeList() {
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
export function skillClassifyList() {
    const data = new URLSearchParams({
        dictCode: 'skill_classify'
    })
    return request({
        url: 'common/dict',
        method: 'post',
        data
    })
}
export function searchSkillState(params) {
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
export function changeSkillState(skillId, state) {
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

// 组件列表
export function componentList() {
    return request({
        url: '/sys/comp/compList',
        method: 'post'
    })
}

// 组件属性
export function componentAttrListNew(id) {
    return request({
        url: `/sys/comp/compProperList/${id}/2`,
        method: 'post'
    })
}
export function componentAttrList(id) {
    return request({
        url: `/sys/comp/compProperList/${id}`,
        method: 'post'
    })
}

