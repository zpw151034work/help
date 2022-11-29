
<template>
    <div class="skill-list-container">
        <div class="content">
            <div class="top-bar">
                <div class="left">
                    <el-input
                        class="input"
                        v-model.trim="name"
                        placeholder="请输入技能名称"></el-input>
                    <!-- <el-select class="input" v-model="state" placeholder="请选择状态">
            <el-option
              v-for="item in statusData"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            >
            </el-option>
          </el-select> -->
                    <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                    <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
                </div>

            </div>
            <el-table
                v-loading="loading"
                ref="multipleTable"
                empty-text="暂无数据"
                :data="tableData"
                tooltip-effect="dark"
                @cell-mouse-enter="focus"
                height="540"
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
                    min-width="240"
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="获取时间"
                    align="center"
                    min-width="140"
                    sortable>
                    <template slot-scope="scope">{{ scope.row.createTime }}</template>
                </el-table-column>
                <el-table-column
                    prop="version"
                    label="版本"
                    width="100"
                    align="center"></el-table-column>

                <el-table-column
                    prop="realName"
                    label="作者"
                    width="150"
                    align="center"
                    :show-overflow-tooltip="true"></el-table-column>

                <el-table-column
                    fixed="right"
                    label="操作"
                    min-width="180"
                    align="left">
                    <template slot-scope="scope">
                        <!-- <el-button
              type="text"
              :disabled="scope.row.type === 1"
              @click="handleModify(scope.$index, scope.row)"
              >编辑</el-button
            > -->
                        <el-button
                            type="text"

                            @click="handleDetail(scope.$index, scope.row,'查看')">查看</el-button>

                        <el-button type="text" @click="handldownload(scope.$index, scope.row)">下载</el-button>
                        <el-button

                            type="text"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination
                :data="tableData"
                :config="pageConfig"
                @pageChanged="pageChanged"/>
        </div>
        <skill-handbook
            :visible.sync="dialogVisible"
            :id="skillBookId"
            @changeModal="changeModal"></skill-handbook>
    </div>
</template>

<script>
    import {
        // deleteSkill,
        searchSkill,
        changeSkillState,
        searchSkillState,
        // downloadSkill,
        getMySkillList,
        mySkillDownload,
        deleteMySkiil
    } from "@/api/skill";
    import { getEditorDetail } from "@/api/setting";
    import Pagination from "@/views/comment/Pagination";
    import { formatDateTime } from "@/utils/date";
    import skillHandbook from "./skillhandbook.vue";
    export default {
        name: "SkillList",
        components: {
            Pagination,
            skillHandbook,
        },
        data() {
            return {
                dialogVisible: false,
                skillBookId: null,
                loading: false,
                currentId: "",
                name: "",
                statusData: [
                    {
                        value: "-1",
                        text: "未启用",
                    },
                    {
                        value: "0",
                        text: "启用",
                    },
                    {
                        value: "1",
                        text: "停用",
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
            handleDetail(index,row) {
                // console.log("row---", row.skillVersionId,row);
                // return
                this.$router.push({
                    path: `/platform/skillOrange/modify`,
                    query: {
                        skillId: row.skillId,
                        skillVersionId: row.skillVersionId,
                        rpaSkillId: row.rpaSkillId,
                        rpaSkillVersionId: row.rpaSkillVersionId,
                        rpaVersion: row.rpaVersion,
                        workName: '查看',
                        show: 'true'
                    },
                });
                // sessionStorage.setItem('skillId', row.skillId)
                // sessionStorage.setItem('versionId', row.skillVersionId)
                // window.open(window.CS_EDITER+ '/index.html#/?channel=1')
            },
            handldownload(index,item) {
                mySkillDownload({ recordSkillId: item.obtainSkillId }).then((value) => {
                    if (value && value.substring(value.length-4) === '.zip') {
                        window.open(value)
                    } else {
                        this.$message({
                            type: "error",
                            message: '下载地址错误',
                        });
                    }
                })
            },
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
            changeState(obj, val) {
                console.log(obj.row, val);
                this.cacheData = obj;
                this.curState = val;
                // let _this = this
                if (val == 1) {
                    searchSkillState({
                        skillId: obj.row.bid,
                        skillVersionId: obj.row.versionId,
                    }).then((res) => {
                        if (res) {
                            this.resealSkill(val);
                        } else {
                            this.saveVisible = true;
                        }
                    });
                } else {
                    this.resealSkill(val);
                }
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
                // this.searchSkill();
                this.fetchList()
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
                    this.tableData = res.records
                    this.cloneTableData = JSON.parse(JSON.stringify(res.records));
                    this.tableData.map(
                        (item) => (item["createTime"] = this.$dateFormat(item["createTime"]))
                    );
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
                const data = {
                    skillName: this.name || null,
                    current: this.pageConfig.currentPage,
                    size: this.pageConfig.size
                }
                getMySkillList(data).then(
                    (res) => {
                        console.log(res)
                        this.loading = false;
                        this.tableData = res.records
                        // this.cloneTableData = JSON.parse(JSON.stringify(res.records));

                        // this.tableData.map(
                        //   (item) =>
                        //     (item["createTime"] = this.$dateFormat(item["createTime"]))
                        // );
                        this.pageConfig.totalCount = res.total;
                    }
                );
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
            handleModify(index, row) {
                this.$router.push({
                    path: `/skillOrange/modify/${row.bid}`,
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
                        console.log(row)
                        deleteMySkiil({ recordSkillId: row.obtainSkillId}).then(res => {
                            if (res) {
                                this.$message({
                                    type: "success",
                                    message: "删除成功!",
                                });
                                this.tableData.splice(index,1)
                            }

                            console.log(res)
                        })
                        // deleteSkill(row.bid).then((res) => {
                        //   console.log("删除：", res);
                        //   //this.tableData.splice(index, 1);
                        //   this.fetchList();
                        //   this.$message({
                        //     type: "success",
                        //     message: "删除成功!",
                        //   });
                        // });
                    })
                    .catch(() => {});
            },
            handleEditor(index, row) {
                console.log("编辑器：", index, row);
                this.$router.push({
                    name: "Skill-List-Edit",
                    // params: {
                    //     //skillId: row.id,
                    //     bid: row.bid,
                    //     roughId: row.roughId,
                    //     name: row.name,
                    //     //于2020-02-29添加的标示，在面包屑（Breadcrumb）中会用到。
                    //     tag: "skill-edit"
                    // }
                    query: {
                        bid: row.bid,
                        roughId: row.roughId,
                        name: row.name,
                        //于2020-02-29添加的标示，在面包屑（Breadcrumb）中会用到。
                        tag: "skill-edit",
                    },
                });
            },

            handleCSEditor(index, row) {
                if (!!window.ActiveXObject || "ActiveXObject" in window) {
                    this.$message({
                        message: "IE浏览器不支持图形编辑器，请使用Chrome浏览器",
                        type: "warning",
                    });
                } else {
                    // versionId版本ID    skillId技能id
                    sessionStorage.setItem("versionId", row.versionId || "");
                    sessionStorage.setItem("skillId", row.bid || "");

                    this.$router.push({
                        name: "Skill-List-CSEditer",
                        // params: {
                        //     skillId: row.id,
                        //     bid: row.bid,
                        //     roughId: row.roughId, //roughId不为空继续编辑
                        //     name: row.name,
                        //     //于2020-02-29添加的标示，在面包屑（Breadcrumb）中会用到。
                        //     tag: "skill-edit"
                        // },
                        query: {
                            bid: row.bid,
                            roughId: row.roughId, //roughId不为空继续编辑
                            name: row.name,
                            //于2020-02-29添加的标示，在面包屑（Breadcrumb）中会用到。
                            tag: "skill-edit",
                        },
                    });
                    // window.open(`${window.location.origin}${EDITOTPATH}/`, '_blank');
                }
            },
            newSkill() {
                console.log("新增技能");
                this.$router.push({
                    name: "Skill-List-Modify",
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
