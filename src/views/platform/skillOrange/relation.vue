
<template>
    <div class="skill-list-container">
        <div class="content">
            <div class="top-bar">以下为该技能已发布的所有版本状态：</div>
            <el-table
                v-loading="loading"
                ref="multipleTable"
                empty-text="暂无数据"
                :data="tableData"
                tooltip-effect="dark"
  
                class="table-list"
                border
                :header-cell-style="{background:'#F2F6FC'}">
                <el-table-column label="序号" prop="index" width="60" align="center">
                    <template slot-scope="scope">
                        <span v-text="getIndex(scope.$index)"> </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="version"
                    label="已发布版本"
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
                    label="发布时间"
                    align="center"
                    min-width="140"
                    sortable>
                    <template slot-scope="scope">{{ scope.row.updateTime }}</template>
                </el-table-column>
                <el-table-column
                    prop="statusName"
                    label="当前状态"
                    width="100"
                    align="center"></el-table-column>
        
                <el-table-column
                    fixed="right"
                    label="操作"
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

    
    </div>
</template>

<script>
    import {
        getRelationSkillList,
        getHandlGoOnline,
        deleteSkill,
 
    } from "@/api/skillOrange";

    import Pagination from "@/views/comment/Pagination";
    import { formatDateTime } from "@/utils/date";

    export default {
        name: "SkillList",
        components: {
            Pagination,
        },
        data() {
            return {
                radio: '1',
                dialogVisible: false,
                editionVersion: false, //是否显示发布版本
                skillBookId: null,
                loading: false,
                currentId: "",
                name: "",
                state: "",
                tableData: [],
                tableDataNoRelation: [],
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

  
  
    
            fetchList() {
                let skillId = this.$route.query.skillId;
                console.log("skillId",this.$route.query)
                getRelationSkillList(this.pageConfig.currentPage, this.pageConfig.size,skillId).then(
                    (res) => {
                        this.loading = false;
                        this.tableData = res.records;
                        this.cloneTableData = JSON.parse(JSON.stringify(res.records));
                        this.pageConfig.totalCount = res.total;
                    }
                );
  
            },
    
            handleDelete(index, row) {
                console.log("删除：", index, row);
                this.$confirm("是否要删除该技能？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        deleteSkill(row.skillId,row.skillVersionId).then((res) => {
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
            //  handleModify(index, row) {
            //   console.log("row---", row);
            //   this.$router.push({
            //     path: `/skillOrange/modify`,
            //     query: {
            //       skillId: row.skillId,
            //       skillVersionId: row.skillVersionId,
            //     },
            //   });
            // },
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
                    });
                }).catch(() => {
                })
                
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

    .table-list td {
        padding: 10px 0;
    }
}

>>>.el-table--small td {
    padding: 8px 0 !important;
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