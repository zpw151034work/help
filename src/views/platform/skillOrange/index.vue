<!--
 * @Author: mingxing.huang
 * @LastEditors: name
 * @LastEditTime: 2022-02-24 16:42:11
 -->
<template>
    <div class="skill-list-container">
        <div class="content">
            <div class="top-bar">
                <div class="left">
                    <el-input
                        class="input"
                        v-model.trim="name"
                        placeholder="请输入技能名称"></el-input>
                    <el-select class="input" v-model="state" placeholder="请选择状态">
                        <el-option
                            v-for="item in statusData"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                    <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
                </div>
                <el-button type="primary" @click="editionVersionFn">发布技能</el-button>
            </div>
            <el-table
                v-loading="loading"
                ref="multipleTable"
                empty-text="暂无数据"
                :data="tableData"
                tooltip-effect="dark"
                @cell-mouse-enter="focus"
                height="590"
                class="table-list">
                <el-table-column label="序号" prop="index" width="60" align="center">
                    <template slot-scope="scope">
                        <span v-text="getIndex(scope.$index)"> </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="skillName"
                    label="技能名称"
                    align="center"
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    prop="description"
                    label="技能描述"
                    align="center"
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="最近更新时间"
                    align="center"
                    min-width="140"
                    sortable>
                    <template slot-scope="scope">{{ scope.row.updateTime }}</template>
                </el-table-column>
                <el-table-column
                    prop="version"
                    label="最新版本"
                    width="100"
                    align="center"></el-table-column>
                <!-- :filters="statusData" -->
                <!-- :filter-method="filterStatus" -->
                <el-table-column
                    prop="state"
                    label="版本状态"
                    min-width="200"
                    align="center"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status === 1">审批中</span>
                        <span v-if="scope.row.status === 2">已上线</span>
                        <span v-if="scope.row.status === 3">未通过</span>
                        <span v-if="scope.row.status === 4">已下线</span>
                    </template>
                </el-table-column>

                <el-table-column label="版本信息" width="80" align="left">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleRelationAll(scope.row)"><img src="@/assets/icons/all.png" alt="所有版本"/></el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="其他操作"
                    min-width="180"
                    align="left">
                    <template slot-scope="scope">
                        <!-- （审批中1；已上线2；未通过3；已下线4） -->
                        <el-button
                            type="text"
                            @click="handleModify(scope.$index, scope.row,'编辑')"
                            v-if="scope.row.status == 3 || scope.row.status == 4">编辑</el-button>
                        <el-button
                            type="text"
                            @click="handleModify(scope.$index, scope.row, '查看')"
                            v-if="
                                scope.row.status == 1 ||
                                    scope.row.status == 2 ||
                                    scope.row.status == 3
                            ">查看</el-button>
                        <el-button
                            type="text"
                            @click="handlGoOnline(scope.row)"
                            v-if="scope.row.status == 4">上线</el-button>
                        <el-button
                            type="text"
                            @click="handlGoOnline(scope.row)"
                            v-if="scope.row.status == 2">下线</el-button>
                        <el-button
                            type="text"
                            @click="handleDelete(scope.$index, scope.row)"
                            v-if="scope.row.status == 3 || scope.row.status == 4">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination
                :data="tableData"
                :config="pageConfig"
                @pageChanged="pageChanged"/>
        </div>
        <el-dialog title="提示" :visible.sync="saveVisible" width="40%">
            <span>技能停用后，将改变关联调度任务状态为已终止。确定要更改技能状态吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelSkill">取 消</el-button>
                <el-button type="primary" @click="backToPrePage">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="发布技能" :visible.sync="editionVersion" width="40%">
            <el-row><el-col :span="12">
                        <el-button class="editionButton" @click="localNewSkill">发布本地技能</el-button></el-col>
                <el-col :span="12"><el-button
                    type="primary"
                    class="editionButton"
                    @click="localNewSkillPublished">发布平台技能</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getSkillList,
        deleteSkill,
        searchSkill,
        getHandlGoOnline,
        changeSkillState,
        // searchSkillState,
    } from "@/api/skillOrange";
    import { getEditorDetail } from "@/api/setting";
    import Pagination from "@/views/comment/Pagination";
    import { formatDateTime } from "@/utils/date";

    export default {
        name: "SkillList",
        components: {
            Pagination,
        },
        data() {
            return {
                dialogVisible: false,
                editionVersion: false, //是否显示发布版本
                skillBookId: null,
                loading: false,
                currentId: "",
                name: "",
                statusData: [
                    {
                        value: "1",
                        text: "审批中",
                    },
                    {
                        value: "2",
                        text: "已上线",
                    },
                    {
                        value: "3",
                        text: "未通过",
                    },
                    {
                        value: "4",
                        text: "已下线",
                    },
                ],
                state: "",
                tableData: [],
                pageConfig: {
                    totalCount: 0,
                    currentPage: 1,
                    size: 10,
                },
                saveVisible: false,
                cloneTableData: [],
                cacheData: {},
                curState: -2,
            };
        },
        mounted() {
            this.loading = true;
            this.fetchList();
        },
        methods: {
            // 过滤状态
            filterStatus(value, row) {
                console.log("filterStatus:", value, row.state);
                return parseInt(row.state) === parseInt(value);
            },
            // 鼠标移入cell，取出技能id
            focus(row) {
                this.currentId = row.bid;
                // console.log("当前技能id：", this.currentId);
            },

            resealSkill(val) {
                changeSkillState(this.currentId, val).then((res) => {
                    this.saveVisible = false;
                    console.log("修改技能状态：", res);
                    7;
                    this.$message({
                        type: "success",
                        message: res,
                    });
                });
            },
            cancelSkill() {
                //取消技能更改，需要修复数据
                this.saveVisible = false;
                this.tableData[this.cacheData.$index].state =
                    this.cloneTableData[this.cacheData.$index].state;
                // this.$set(this.tableData[this.cacheData.$index],'state',this.cloneTableData[this.cacheData.$index].state)
            },
            backToPrePage() {
                this.resealSkill(this.curState);
            },
            search() {
                this.pageConfig.currentPage = 1;
                this.searchSkill();
            },
            searchSkill() {
                //技能名称和选择状态可以单个筛选
                searchSkill(
                    this.pageConfig.currentPage,
                    this.pageConfig.size,
                    this.name,
                    this.state
                ).then((res) => {
                    this.loading = false;
                    this.tableData = res.records;
                    this.cloneTableData = JSON.parse(JSON.stringify(res.records));

                    this.pageConfig.totalCount = res.total;
                });
            },
            reset() {
                this.loading = true;
                this.name = this.state = "";
                this.pageConfig.currentPage = 1;
                this.fetchList();
            },
            fetchList() {
                console.log("获取数据");
                getSkillList(this.pageConfig.currentPage, this.pageConfig.size).then(
                    (res) => {
                        this.loading = false;
                        this.tableData = res.records;
                        this.cloneTableData = JSON.parse(JSON.stringify(res.records));

                        this.tableData.map(
                            (item) =>
                                (item["createTime"] = this.$dateFormat(item["createTime"]))
                        );
                        this.pageConfig.totalCount = res.total;
                    }
                );
            },
            handlGoOnline(obj) {
                let statusNum;
                let str = ''
                if (obj.status == 2) {
                    str = '确认下线后，该技能在资源市场不可见，是否继续？'
                    statusNum = 4;
                } else {
                    statusNum = 2;
                    str = '确认上线后，该技能将发布到资源市场，是否继续？'
                }
                this.$confirm(str, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    getHandlGoOnline({
                        status: statusNum,
                        skillId: obj.skillId,
                        skillVersionId: obj.skillVersionId,
                    }).then((res) => {
                        console.log("res", res);
                        if (res) {
                            this.$message({
                                type: "success",
                                message: "修改成功",
                            });
                        }
                        this.fetchList();
                    })
                }).catch(() => {
                })
                
            },
            /**
             * @name: mmzuo
             * @method: handlSearch
             * @param {number} index
             * @param {object} row
             * @msg: 技能手册查看
             */
            handlSearch(index, row) {
                console.log(index, row);
                this.skillBookId = row.versionId;
                getEditorDetail(row.versionId).then((res) => {
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
            handleModify(index, row,workName) {
                console.log("row---", row);
                this.$router.push({
                    path: `/platform/skillOrange/modify`,
                    query: {
                        skillId: row.skillId,
                        skillVersionId: row.skillVersionId,
                        rpaSkillId: row.rpaSkillId,
                        rpaSkillVersionId: row.rpaSkillVersionId,
                        rpaVersion: row.rpaVersion,
                        workName: workName,
                    },
                });
            },
            handleRelationAll(row) {
                console.log("row", row);
                let skillId = row.skillId;
                this.$router.push({
                    path: `/platform/skillOrange/relation`,
                    query: { skillId: skillId },
                });
            },

            handlePublished(index, row) {
                this.$router.push({
                    path: `/platform/skillOrange/published/${row.bid}`,
                });
            },
            handleDelete(index, row) {
                console.log("删除：", index, row);
                this.$confirm("是否要删除该技能？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        deleteSkill(row.skillId, row.skillVersionId).then((res) => {
                            console.log("删除：", res);
                            //this.tableData.splice(index, 1);
                            this.fetchList();
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                        });
                    })
                    .catch(() => {});
            },

            editionVersionFn() {
                this.editionVersion = true;
            },
            localNewSkill() {
                console.log("新增技能");
                this.$router.push({
                    name: "SkillOrange-List-Modify",
                    query: { source: "本地" },
                });
            },
            localNewSkillPublished() {
                this.$router.push({
                    name: "SkillOrange-List-Published",
                });
            },
            pageChanged(obj) {
                this.pageConfig = obj;
                this.loading = true;
                if (this.name.length > 0 || this.state != "") {
                    this.searchSkill();
                } else {
                    this.fetchList();
                }
            },
            formatDateRobot(value) {
                return formatDateTime(value);
            },
            //获取表格序号
            getIndex($index) {
                //表格序号
                return (
                    (this.pageConfig.currentPage - 1) * this.pageConfig.size + $index + 1
                );
            },
        },
    };
</script>

<style lang="scss" scoped>
.skill-list-container {
    padding: 5px;
    height: 100%;

    .content {
        height: 100%;
        background: #fff;
    }

    .top-bar {
        padding: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .input {
            width: 200px;
        }
    }

    .page {
        float: right;
        margin: 20px 0;
    }

    .table-list {
        min-height: 384px;
    }
}

.editionButton {
    margin: 0 auto;
    display: block;
    width: 200px;
}
</style>
<style lang="scss">
.skill-list-container {
    .firstRadio {
        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            border-color: lightgray;
            background: lightgray;
        }
    }

    .secondRadio {
        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            border-color: #409eff;
            background: #409eff;
        }
    }

    .thirdRadio {
        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            border-color: rgb(228, 67, 67);
            background: rgb(228, 67, 67);
            box-shadow: none;
        }
    }
}
</style>
