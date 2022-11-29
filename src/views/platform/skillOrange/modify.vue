
<template>
    <div class="skill-modify-container">
        <div class="modify-left">
            <div class="title-box">
                <div class="vertical-bar"></div>
                <div class="title-content">技能详情</div>
            </div>
            <div>
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-row>
                        <el-form-item style="float: right;">
                            <el-button
                                type="primary"
                                @click="onSubmit"
                                :loading="addState"
                                v-if=" workName !== '查看'">发布</el-button><el-button @click="backAction">取消</el-button>
                        </el-form-item>
                    </el-row>
                    <el-form-item label="技能名称" prop="skillName" label-width="100px">
                        <el-input
                            v-model.trim="form.skillName"
                            maxlength="20"
                            show-word-limit
                            :disabled="isDisabled"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12"><el-form-item
                            label="技能分类"
                            prop="classifyId"
                            label-width="100px">
                            <el-select
                                v-model="form.classifyId"
                                placeholder="请选择技能分类">
                                <el-option
                                    v-for="(item, index) in classifyData"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.code"></el-option>
                            </el-select> </el-form-item></el-col>
                        <el-col :span="12">
                            <el-form-item label="版本号" prop="version">
                                <el-input
                                    v-model.trim="form.version"
                                    :disabled="isDisabled"></el-input> </el-form-item></el-col>
                    </el-row>
                    <el-form-item label="上传技能包" label-width="100px" prop="fileUrl">
                        <el-upload
                            ref="upload"
                            action="string"
                            :auto-upload="false"
                            :on-change="getFileZip"

                            :show-file-list="false"
                            accept=".zip"
                            v-if="source == '本地'">
                            <el-button slot="trigger" type="primary">技能链接</el-button>
                            <div slot="tip" class="el-upload__tip">
                                只能上传.zip,且不超过20M
                            </div>
                        </el-upload>
                        <a
                            :href="form.fileUrl"
                            v-if="form.fileUrl"
                            target="_blank"
                            style="color: #1890ff;">{{ form.fileName }}</a>
                    </el-form-item>
                    <el-form-item label="添加logo" prop="touxiang" label-width="100px">
                        <img v-if="form.handbookCoverImage" :src="form.handbookCoverImage " width="80" />
                        <svg-icon  v-else icon-class="skil" class="data-logo" />
                    </el-form-item>

                    <!-- <el-form-item label="添加logo" prop="touxiang" label-width="100px">
            <el-upload
              list-type="picture"
              class="avatar-uploader"
              action=""
              accept=".jpg, .png"
              :limit="2"
              :auto-upload="false"
              :on-change="getFile"
              :file-list="dialogImageUrl"
            >
              <div class="avatar">
                <i class="el-icon-plus avatar-uploader-icon"></i>上传
              </div>
            </el-upload>
          </el-form-item> -->

                    <el-form-item label="技能描述" label-width="100px" prop="description">
                        <el-input
                            type="textarea"
                            v-model.trim="form.description"
                            placeholder="内容不得超过200字"
                            rows="5"
                            maxlength="200"
                            show-word-limit
                            :disabled="isDisabled"></el-input>
                    </el-form-item>

                    <el-form-item
                        prop="handbookContent"
                        label="使用手册"
                        label-width="100px">
                        <div v-html="form.handbookContent"></div>
                    </el-form-item>

                    <el-form-item
                        prop="approvalResult"
                        label="审核结果"
                        label-width="100px"
                        v-if="workName == '查看' || !$route.query.show === 'show'">
                        <div v-html="form.statusName"></div>
                        <div v-html="form.approvalResult"></div>
                    </el-form-item>
                    <!--
          <el-form-item
            prop="handbookContent"
            label="使用手册"
            label-width="100px"
          >
            <Rich-text ref="richText" :richText="richTextCopy" />
          </el-form-item> -->
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        saveSkill,
        // skillTypeList,
        skillClassifyList,
        // getVersionList,
        searchSkillState,
        skillDetail,
        sendZipInfo,
    } from "@/api/skillOrange";
    import {
        enableAndDisable,
    } from "@/api/skill";
    import {
        // getDepartmentList,
        getEditorDetail } from "@/api/setting";
    // import RichText from "./richText";
    // import { getPersonList } from "./../../api/robot";

    export default {
        name: "Skill-List-Modify",
        components: {
            // RichText,
        },
        data() {
            return {
                logo: require('@/assets/robot/robot_logo.png'),
                imageUrl: "",
                dialogVisible: false,
                skillBookId: null,
                isEdit: true,
                Eidt: "modify-right",
                Add: "add",
                switchValue: "",
                editType: 0, // 0:编辑；1:新增
                // 技能类型
                typeData: [],
                // 技能分类
                classifyData: [],
                range_personal: "", // 个人select
                range_org: "", // 组织select
                dialogImageUrl: [], // 展示logon
                form: {
                    bid: "",
                    skillName: "",
                    version: "",
                    useScope: "0", // 公共值为：0，这里，如果是个人，存个人id,如果是组织，存组织id
                    useScopeType: "0", // 个人：1、组织：2、公开：0
                    classifyId: "", // 技能分类
                    skillType: "", // 技能类型
                    description: "", // 技能描述
                    modelEditorJson: "", // 技能JONS数据
                    state: "", // 状态：-1：未启用，0：启用，1:停用
                    handbookContent: "",
                    handbookCoverImage: "",
                    approvalResult: "",
                    statusName: "",
                    fileUrl: "",
                    fileName: "",
                },
                richTextCopy: "",
                addState: false,
                rules: {
                    // skillName: [
                    //   { required: true, message: "请输入技能名称", trigger: "blur" },
                    //   { min: 0, max: 20, message: "长度在20字符以内" },
                    // ],
                    classifyId: [
                        { required: true, message: "请选择技能分类", trigger: "change" },
                    ],
                    // skillType: [
                    //   { required: true, message: "请选择技能类型", trigger: "change" },
                    // ],
                    // handbookCoverImage: [
                    //   { required: true, message: "请选择技能类型", trigger: "change" },
                    // ],
                    // description: [
                    //   { required: true, message: "请输入技能描述", trigger: "change" },
                    // ],
                    uploadId: [
                        { required: true, message: "请选择技能类型", trigger: "change" },
                    ],
                    // handbookContent: [
                    //   { required: true, message: "请选择技能类型", trigger: "change" },
                    // ],
                },
                userData: [],
                enterpriseData: [],
                latestVersionList: [],
                historyVersionList: [],
                versionList: [],
                cloneTableData: [],
                saveVisible: false,
                curState: {},
                curName: "",
                isDisabled: true,
                zipFileAll: "",
                source: "",
                workName: "",
            };
        },
        mounted() {
            console.log("this.$route.query---", this.$route.query);
            // let data = this.$route.query;
            this.init();

            skillClassifyList().then((res) => {
                this.classifyData = res;
            });
        },
        methods: {
            init() {
                let datas = this.$route.query;
                console.log("this.$route.query", this.$route.query);
                if (this.$route.query.workName) {
                    this.workName = this.$route.query.workName;
                }

                if (this.$route.query.source) {
                    this.source = this.$route.query.source;
                } else {
                    this.skillDetailFn(datas);
                }
            },
            skillDetailFn(datas) {
                skillDetail(datas).then((res) => {
                    console.log("获取列表数据", res);
                    let data = res;
                    this.form = Object.assign(this.form, data);
                    this.form.skillName = data.skillName;

                    this.form.version = data.version;
                    this.form.handbookContent = data.handbookContent;
                    this.richTextCopy = data.handbookContent;
                    this.form.handbookCoverImage = data.handbookCoverImage;
                    this.form.approvalResult = data.approvalResult;
                    this.form.statusName = data.statusName;
                    this.form.fileUrl = data.fileUrl;
                    this.form.fileName = data.fileName ? data.fileName : "文件下载";
                    this.form.skillType += "";
                    this.form.classifyId += "";
                    this.form.rpaSkillId = data.rpaSkillId;
                    this.form.rpaSkillVersionId = data.rpaSkillVersionId;
                    this.form.rpaVersion = data.rpaVersion;
                    delete this.form.classify;
                    this.source = data.source;
                    this.dialogImageUrl = [
                        {
                            name: "logo",
                            url: data.handbookCoverImage,
                        },
                    ];
                    console.log("this.form", this.form);
                });
            },

            getFileZip(file) {
                console.log("上传", file);
                sendZipInfo(file.raw).then((res) => {
                    this.zipFileAll = file.raw;
                    this.isDisabled = true;
                    console.log("获取列表数据", res);
                    let data = res;
                    this.form = Object.assign(this.form, data);
                    this.form.skillName = data.skillName;
                    this.form.version = data.version;
                    this.form.handbookContent = data.handbookContent;
                    this.richTextCopy = data.handbookContent;
                    this.form.handbookCoverImage = data.handbookCoverImage;
                    this.form.skillType += "";
                    // this.form.classifyId += "";
                    if (data.classifyId) {
                        this.form.classifyId = data.classifyId;
                    } else {
                        this.form.classifyId = "25";
                    }

                    delete this.form.classify;
                    this.dialogImageUrl = [
                        {
                            name: "logo",
                            url: data.handbookCoverImage,
                        },
                    ];
                    console.log("this.form", this.form);
                });
            },
            getFile(file) {
                //通过getFile方法获取文件信息
                console.log(file);
                this.getBase64(file.raw).then((res) => {
                    const params = res.split(",");
                    console.log(params, "params");
                    if (params.length > 0) {
                        this.form.handbookCoverImage = params[0] + "," + params[1];
                        this.dialogImageUrl = [
                            {
                                name: "logo",
                                url: params[0] + "," + params[1],
                            },
                        ];
                        console.log("params[1]", this.form);
                    }
                });
            },
            // 获取图片转base64
            getBase64(file) {
                return new Promise(function (resolve, reject) {
                    const reader = new FileReader();
                    let imgResult = "";
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        imgResult = reader.result;
                    };
                    reader.onerror = function (error) {
                        reject(error);
                    };
                    reader.onloadend = function () {
                        resolve(imgResult);
                    };
                });
            },

            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === "image/jpeg";
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error("上传头像图片只能是 JPG 格式!");
                }
                if (!isLt2M) {
                    this.$message.error("上传头像图片大小不能超过 2MB!");
                }
                return isJPG && isLt2M;
            },
            handleSearch(item) {
                this.skillBookId = String(item.bid);
                getEditorDetail(item.bid).then((res) => {
                    const data = {
                        handbookContent: res.handbookContent,
                        handbookCoverImage: res.handbookCoverImage,
                        handbookSimpleContent: res.handbookSimpleContent,
                        handbookTitle: res.handbookTitle,
                    };
                    localStorage.setItem("skillManualData", JSON.stringify(data));
                    this.dialogVisible = true;
                });
            },
            changeModal() {
                this.dialogVisible = false;
            },
            backAction() {
                this.$router.go(-1);
            },
            onSubmit() {
                this.addState = true;
                console.log("this.$route", this.$route);
                if (this.source == "本地") {
                    this.source = 1; // 本地1   发布0
                }
                if (this.source == null) {
                    this.source = 0; // 本地1   发布0
                }
                this.$refs["form"].validate(() => {
                    console.log("this.zipFileAll", this.zipFileAll);

                    let data = {
                        zipFile: this.zipFileAll,
                        publishType: this.source,
                        handbookCoverImage: this.form.handbookCoverImage,
                        handbookContent: this.form.handbookContent,
                        description: this.form.description,
                        version: this.form.version,
                        rpaSkillId: this.$route.query.rpaSkillId,
                        rpaSkillVersionId: this.$route.query.rpaSkillVersionId,
                        rpaVersion: this.$route.query.rpaVersion,
                        classifyId: this.form.classifyId,
                        skillName: this.form.skillName,
                        skillVersionId: this.$route.query.skillVersionId,
                    };
                    if (this.workName == "编辑") {
                        data.rpaSkillId = this.form.rpaSkillId;
                        data.rpaSkillVersionId = this.form.rpaSkillVersionId;
                        data.rpaVersion = this.form.rpaVersion;
                    }
                    console.log("---saveSkill ", data);
                    // data = new URLSearchParams(data);

                    saveSkill(data)
                        .then((res) => {
                            console.log(this.editType === 0 ? "修改：" : "新增：", res);
                            this.$router.go(-1);
                            this.$message({
                                type: "success",
                                message: "发布成功",
                            });
                            this.addState = false;
                        })
                        .catch(() => {
                            this.addState = false;
                        });
                });
            },
            switchChange(listName, item) {
                if (item.optStatus !== 1 && item.booleanStatus) {
                    this.$message({
                        type: "error",
                        message: "请先发布技能后再启用",
                    });
                    this.versionList.forEach((list, index) => {
                        if (item.bid === list.bid) {
                            this.$set(this[`${listName}`][index], "booleanStatus", !item.state);
                            return;
                        }
                    });
                    return false;
                }
                let state = item.booleanStatus === true ? 0 : 1;
                this.cacheData = item;
                this.curName = listName;
                if (!item.booleanStatus) {
                    searchSkillState({
                        skillId: this.$route.params.id,
                        skillVersionId: item.bid,
                    }).then((res) => {
                        if (res) {
                            this.resealSkill(item, state);
                        } else {
                            this.saveVisible = true;
                        }
                    });
                } else {
                    this.resealSkill(item, state);
                }
                //已启用 0
                //已停用 1
            },
            resealSkill(item, state) {
                enableAndDisable(item.bid, state).then((res) => {
                    this.saveVisible = false;
                    console.log("data", res);
                });
            },
            cancelSkill() {
                //取消技能更改，需要修复数据
                this.saveVisible = false;
                let ind = this.versionList
                    .map((item) => item.bid)
                    .indexOf(this.cacheData.bid);
                let flag = this.cacheData.state == 1 ? false : true;
                if (this.curName === "latestVersionList") {
                    this[`${this.curName}`][0].booleanStatus = flag;
                } else {
                    this[`${this.curName}`][ind].booleanStatus = flag;
                }
                this.versionList[ind].booleanStatus = flag;
                // this.$set(this.tableData[this.cacheData.$index],'state',this.cloneTableData[this.cacheData.$index].state)
            },
            handleModify(index, row) {
                console.log("row---", row);
                this.$router.push({
                    path: `/skillOrange/modify`,
                    query: {
                        id: row.skillId,
                        skillVersionId: row.skillVersionId,
                        rpaSkillId: row.rpaSkillId,
                        rpaSkillVersionId: row.rpaSkillVersionId,
                        rpaVersion: row.rpaVersion,
                    },
                });
            },
            // handlGoOnline(obj) {
            //     getHandlGoOnline({
            //         status: obj.status,
            //         skillId: obj.skillId,
            //         skillVersionId: obj.skillVersionId,
            //     }).then((res) => {
            //         console.log("res", res);
            //         this.fetchList();
            //     });
            // },
            backToPrePage() {
                this.resealSkill(this.cacheData, this.cacheData.booleanStatus ? 0 : 1);
            },
        },
    };
</script>






<style lang="scss" scoped>
.data-logo{
    display: inline-block;
    width: 80px;
    height: 80px;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 50%;
}
.avatar-uploader .el-upload {
    border: 1px dashed red;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 64px;
    height: 64px;
    line-height: 64px;
    text-align: center;
}

.avatar {
    width: 64px;
    height: 64px;
    display: block;
}

.skill-modify-container {
    height: calc(100vh - 94px);
    margin: 22px;
    display: flex;

    //padding: 5px;
    //height: 100%;
    //overflow: auto;
    .modify-left {
        flex: 1;
        margin-right: 10px;
        padding: 20px;
        background: #fff;
        overflow: auto;
    }

    .modify-right {
        flex: 1;
        background: #fff;
        padding: 20px;
        overflow: auto;
        //display: none;
    }

    .add {
        display: none;
    }

    .TimeAxis {
        position: relative;
    }

    .switch {
        position: absolute;
        top: 0;
        left: 70px;
    }
}
</style>
<style lang="scss">
/* switch开关的自定义样式 */
.skill-modify-container {
    .switchStyle {
        .el-switch__label {
            position: absolute;
            display: none;
            font-weight: normal;
        }

        .el-switch__label * {
            font-size: 12px;
        }

        .el-switch__label--left {
            z-index: 9;
            left: 10px;
            color: #fff;
        }

        .el-switch__label--right {
            z-index: 9;
            left: -19px;
            color: #fff;
        }

        .el-switch__label.is-active {
            display: block;
            height: 22px;
            line-height: 22px;
        }

        @media screen and(-ms-high-contrast: active), (-ms-high-contrast: none) {
            .el-switch__label.is-active {
                line-height: 0 !important;
            }
        }
    }

    .switchStyle.el-switch .el-switch__core,
    .el-switch .el-switch__label {
        width: 68px !important;
    }

    .switchStyle.el-switch .el-switch__core,
    .el-switch .el-switch__label span {
        height: 22px;
    }

    @media screen and(-ms-high-contrast: active), (-ms-high-contrast: none) {
        // IE浏览器兼容样式
        .switchStyle.el-switch .el-switch__core,
        .el-switch .el-switch__label span {
            line-height: 0 !important;
        }
    }

    .el-switch,
    .el-switch__core {
        height: 22px;
        line-height: 22px;
    }

    .el-switch__core {
        border-radius: 16px;

        &::after {
            width: 16px;
            height: 16px;
            top: 2px;
            left: 3px;
            z-index: 10;
        }
    }

    .el-switch.is-checked .el-switch__core::after {
        margin-left: -23px;
    }
}

// 上传头像
.avatar-uploader .el-upload {
    border: 1px dashed rgba(217, 217, 217, 1);
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 64px;
    height: 64px;
    line-height: 64px;
    text-align: center;
}

.avatar {
    width: 64px;
    height: 64px;
    display: block;
}
</style>
