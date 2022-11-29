<!--设置机器人-->
<template>
    <div class="releaseRobot public-container">
        <div class="title-box">
            <div class="vertical-bar"></div>
            <h4 class="title-content">机器人详情</h4>
        </div>
        <div class="release-content">
            <el-form
                ref="form"
                :model="form"
                label-width="100px">
                <el-form-item
                    label="机器人名称"
                    prop="name">
                    <el-input v-model.trim="form.name" disabled></el-input>
                </el-form-item>
                <el-form-item
                    label="机器人logo"
                    prop="imageUrl"
                    class="imageUrl">
                    <el-image v-if="form.imageUrl" :src="form.imageUrl">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                    </el-image>
                    <img v-else class="data-logo" src="@/assets/robot/rebot.png" alt="">
                </el-form-item>
                <!--行业-->
                <el-form-item label="行业">
                    <el-select
                        v-model="form.classifyName"
                        disabled
                        placeholder=""
                        style="width: 100%;">
                        <el-option
                            v-for="item in industryOptions"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>

                <!--描述-->
                <el-form-item
                    label="描述"
                    prop="robotDesc">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 5}"
                        v-model="form.robotDesc" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户">
                    <el-input
                        v-model="form.userName"
                        disabled></el-input>
                </el-form-item>
                <!--使用范围-->
                <!--
                    数据权限 dataScope（员工级：0、部门级：1、企业级：2）
                    1、员工级：直接隐藏使用范围
                    2、部门管级理员 使用范围仅有个人和部门
                    3、企业管级理员 个人、部门和公开都展示
                    -->
                <el-form-item label="使用范围">
                    <el-radio-group
                        v-model="form.useScopeType">
                        <el-radio
                            :label="1">个人</el-radio>
                        <el-radio
                            :label="2"
                            disabled>组织</el-radio>
                        <el-radio
                            :label="0"
                            disabled>公开</el-radio>
                        <!-- <el-radio :label="2"
                                    :disabled="!dataScope">组织</el-radio>
                        <el-radio :label="0"
                                    :disabled="dataScope!==2">公开</el-radio> -->
                    </el-radio-group>
                </el-form-item>
                <!-- 个人 -->
                <el-form-item v-if="form.useScopeType === 3" prop="personId" class="elCascader">
                    <!-- 员工账户（dataScope为0）只能展示个人，因此不能修改 -->
                    <el-cascader
                        style="width: 100%;"
                        v-model="form.personId"
                        :props="personOptionProps"
                        filterable
                        :options="personTreeData"
                        disabled>
                        <template slot-scope="{ data }">
                            <svg-icon
                                icon-class="person-icon"
                                v-if="data.realName" />
                            <svg-icon
                                icon-class="depart-icon"
                                v-if="data.disabled" />
                            <span>{{ data.departName }}</span>
                        </template>
                    </el-cascader>
                </el-form-item>
                <el-form-item :label="$route.query.from == 'release' ? '更新时间' : '获取时间'">
                    <el-input
                        v-model="form.updateTime"
                        disabled></el-input>
                </el-form-item>
                <el-form-item label="关联技能" class="skillData">
                    <el-table
                        :data="tableData"
                        border
                        empty-text="暂无数据"
                        tooltip-effect="dark"
                        :header-cell-style="{'text-align':'center'}"
                        :cell-style="{'text-align':'center'}"
                        class="table-list"
                        style="width: 100%;">
                        <el-table-column
                            prop="skillName"
                            label="技能名称">
                        </el-table-column>
                        <el-table-column
                            prop="classifyName"
                            label="技能分类">
                        </el-table-column>
                        <el-table-column
                            prop="version"
                            label="版本">
                        </el-table-column>
                        <el-table-column
                            prop="skillDesc"
                            label="描述">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="技能手册">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    @click="handlSearch(scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="createName"
                            label="创建人">
                        </el-table-column>
                        <el-table-column
                            prop="updateTime"
                            label="更新时间">
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item>
                    <el-button @click="returnEvent()">返 回</el-button>
                </el-form-item>
            </el-form>
        </div>
        <SkillHandbook
            :visible.sync="dialogVisible"
            :id="skillBookId"
            @changeModal="changeModal"></SkillHandbook>
    </div>
</template>
<script>
    import SkillHandbook from '../skillOrange/skillhandbook.vue'
    import { mapGetters } from "vuex"
    import {
        loginPersonTreeList,  // 得到部门全部数据
        getIndustryList,
    } from "@/api/robot";
    import {
        getApprovalDetail
    } from "@/api/robotReview"
    import {
        getRecordDetail
    } from "@/api/robotManage"
    import { isObject } from '@/utils/common';
    import { formatDateTime } from '@/utils/date'
    export default {
        name: "robotReviewDetail",
        props: {

        },
        components: {
            SkillHandbook
        },
        data () {
            return {
                treeValue: [],
                industryOptions: [],
                form: {
                    id: '',
                    name: "",
                    prefix: '',
                    imageUrl: '',
                    userName: localStorage.getItem("userName"),
                    classifyName: "",
                    approvalResult: "",
                    useScopeType: 1,
                    personId: localStorage.getItem("userId"),
                    updateTime: '',
                    status: '',
                    robotDesc: ''
                },
                tableData: [],
                skillBookId: null,
                dialogVisible: false,
                personTreeData: [],
                personOptionProps: {
                    value: "bid",
                    label: "departName",
                    children: "childrenList",
                    multiple: true,
                    checkStrictly: true,
                    emitPath: false,
                },
            }
        },
        computed: {
            ...mapGetters(['dataScope']),
        },
        created(){

        },
        mounted () {
            this.getLoginPersonTreeList(); // 得到当前登录用户下的部门和人
            //得到行业列表数据
            this.getIndustryData()
            this.getDetailData()
        },
        methods: {
            // 得到行业下拉数据
            getIndustryData () {
                getIndustryList().then((res) => {
                    this.industryOptions = res
                })
            },
            getDetailData () {
                let bid = this.$route.params.id
                if (this.$route.query.from == "release") {
                    this.getApprovalDetail(bid)
                } else {
                    this.getRecordDetail(bid)
                }
            },
            // 获取已发布机器人详情
            getApprovalDetail(bid) {
                getApprovalDetail(bid).then((res) => {
                    console.log('robotDetail', res)
                    let form = this.form
                    form.name = res.robotName
                    form.classifyName = res.classifyName
                    form.approvalResult = res.approvalResult;
                    form.updateTime = this.formatDateRobot(res.updateTime);
                    this.tableData = res.skillVO
                    form.status = res.status;
                    form.robotDesc = res.robotDesc;
                    if (form.status == "2"){
                        this.isView = true
                    }
                    if (res.fileUrl && res.fileUrl != ''){
                        form.imageUrl = res.fileUrl;
                    } else {
                        form.imageUrl = '';
                    }
                    form.userName = res.userName
                    form.personId = res.createId
                })
            },
            // 获取已获取机器人详情
            getRecordDetail(bid) {
                getRecordDetail(bid).then((res) => {
                    console.log('robotDetail', res)
                    let form = this.form
                    form.name = res.robotName
                    form.classifyName = res.classifyName
                    form.approvalResult = res.approvalResult;
                    form.updateTime = this.formatDateRobot(res.createTime);
                    this.tableData = res.skillVO
                    form.status = res.status;
                    form.robotDesc = res.robotDesc;
                    if (form.status == "2"){
                        this.isView = true
                    }
                    if (res.fileUrl && res.fileUrl != ''){
                        form.imageUrl = res.fileUrl;
                    } else {
                        form.imageUrl = '';
                    }
                })
            },
            //得到当前登录人下的部门和人
            getLoginPersonTreeList () {
                loginPersonTreeList().then(res => {
                    //console.log('当前登录下的人',res);
                    let resData = [];
                    if (isObject(res)) {
                        resData = [res];
                    }
                    let deleteAfterResult = this.deleteNulChildDepartAndPersonList(resData);
                    let addDisabledAfterData = this.dealPersonData(deleteAfterResult);
                    let resultData = this.realNameChangeDepartName(addDisabledAfterData);
                    this.personTreeData = resultData;
                })
            },
            //当childDepartList为null的时候，删除此childDepartList字段
            deleteNulChildDepartAndPersonList (data) {
                data && data.forEach((item) => {
                    if (item.childrenList && item.childrenList.length > 0) {
                        this.deleteNulChildDepartAndPersonList(item.childrenList);
                    } else {
                        delete item.childrenList;
                    }
                })
                return data;
            },
            //递归处理数据
            dealPersonData (data) {
                data && data.forEach((item) => {
                    if (item.childrenList && item.childrenList.length > 0) {
                        this.dealPersonData(item.childrenList);
                    } else {
                        //
                    }
                    //给部门添加disabled
                    if (item.departName) {
                        item.disabled = true;
                        this.$set(item, 'disabled', item.disabled);
                    }
                })
                return data;
            },
            //realName 处理成为departName
            realNameChangeDepartName(data) {
                data && data.forEach((item) => {
                    if (item.childrenList && item.childrenList.length > 0) {
                        this.realNameChangeDepartName(item.childrenList);
                    } else {
                        //如果有item.realName字段时，把item.realName赋值给item.departName
                        if (item.realName) {
                            item.departName = item.realName;
                        }
                    }
                })
                return data;
            },
            
            // 技能手册查看
            handlSearch(row) {
                const data = {
                    handbookContent: row.handbookContent,
                    handbookCoverImage: row.handbookCoverImage,
                    handbookSimpleContent: row.handbookSimpleContent,
                    handbookTitle: row.handbookTitle,
                }
                localStorage.setItem('skillManualData', JSON.stringify(data))
                this.dialogVisible = true
            },
            changeModal () {
                this.dialogVisible = false
            },
            // 取消返回机器人列表
            returnEvent () {
                if (this.$route.query.from == "release") {
                    this.$router.push({ path: "/platform/robotManage/release" })
                } else {
                    this.$router.push({ path: "/platform/robotManage/obtain" })
                }
                // this.$router.push({ path: "/robotManage/release" })
            },
            // 对时间格式进行处理
            formatDateRobot(value) {
                return formatDateTime(value);
            },
        },
    }
</script>
<style lang="scss" scoped>
    .release-content {
        padding: 30px 100px;

        /deep/.el-input.is-disabled .el-input__inner {
            background-color: #fff;
            border: none;
            color: #606266;
            cursor: not-allowed;
        }

        /deep/.el-textarea.is-disabled .el-textarea__inner {
            background-color: #fff;
            border: none;
            color: #606266;
            cursor: not-allowed;
        }

        .elCascader {
            /deep/.el-input.is-disabled .el-input__inner {
                background-color: #f5f7fa;
            }
        }

        img {
            width: 100px;
        }

        /deep/.el-image__inner {
            width: 100px;
        }

        /deep/.el-form-item__content {
            width: 30%;
        }

        .skillData {
            /deep/.el-form-item__content {
                width: 80%;
            }
        }

        .remark {
            /deep/.el-textarea.is-disabled .el-textarea__inner {
                background-color: #f5f7fa;
            }
        }
    }
</style>
