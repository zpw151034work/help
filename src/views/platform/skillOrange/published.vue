
<template>
    <div class="skill-list-container">
        <div class="content">
            <div class="top-bar">请选择您要发布的技能</div>
            <el-table
                v-loading="loading"
                ref="multipleTable"
                empty-text="暂无数据"
                :data="tableData"
                tooltip-effect="dark"
                @cell-mouse-enter="focus"
                class="table-list"
                border
                height='540'
                :header-cell-style="{ background: '#F2F6FC' }">
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
                    prop="classifyName"
                    label="技能分类"
                    width="100"
                    align="center"></el-table-column>
                <el-table-column
                    prop="description"
                    label="技能描述"
                    align="center"
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="最近更新时间"
                    align="center"
                    min-width="140"
                    sortable>
                    <template slot-scope="scope">{{ scope.row.createTime }}</template>
                </el-table-column>

                <el-table-column
                    fixed="right"
                    label="操作"
                    min-width="180"
                    align="left">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            :disabled="scope.row.type === 1"
                            @click="handleSelectVison(scope.$index, scope.row)">选择版本</el-button>
                        <el-button
                            type="text"
                            :disabled="scope.row.type === 1"
                            @click="handlePublished(scope.$index, scope.row)">已发布版本</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination
                :data="tableData"
                :config="pageConfig"
                @pageChanged="pageChanged"/>
        </div>

        <el-dialog :title="dialogTitle" :visible.sync="editionVersion" width="500">
            <el-table
                v-loading="loading"
                border
                :header-cell-style="{ background: '#F2F6FC' }"
                height="150px"
                ref="multipleTable"
                empty-text="暂无数据"
                :data="tableDataNoRelation"
                tooltip-effect="dark"
                @cell-mouse-enter="focus"
                class="table-list">
                <el-table-column
                    prop="rpaVersion"
                    label="平台版本"
                    align="center"
                    :show-overflow-tooltip="true">
                </el-table-column>

                <el-table-column
                    prop="description"
                    label="更新内容"
                    align="center"
                    :show-overflow-tooltip="true"
                    width="350px">
                </el-table-column>
                <el-table-column
                    prop="version"
                    label="市场版本"
                    align="center"
                    :show-overflow-tooltip="true"
                    v-if="dialogTitle == '已发布版本'">
                </el-table-column>

                <el-table-column
                    fixed="right"
                    label="操作"
                    min-width="80"
                    align="left"
                    v-if="dialogTitle == '选择版本'">
                    <template slot-scope="scope"  v-if="dialogTitle == '选择版本'">
                        <el-radio
                            v-model="radio"
                            :label="getIndex(scope.$index)"
                            @change="getIndexRow(scope.row)"><span></span></el-radio>
                    </template>
                </el-table-column>
            </el-table>
            <span
                slot="footer"
                class="dialog-footer"
                v-if="dialogTitle == '选择版本'">
                <el-button @click="cancelSkill">取 消</el-button>
                <el-button type="primary" @click="handleRelease">确定</el-button>
            </span>
            <span
                slot="footer"
                class="dialog-footer"
                v-if="dialogTitle == '已发布版本'">
                <el-button type="primary" @click="cancelSkill">好的</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getAlreadySkillList,
        getNoRelation,
        getPublished,
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
                radio: "1",
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
                tableDataRaw: "",
                dialogTitle: "",
    
            };
        },
        mounted() {
            this.loading = true;
            this.fetchList();
        },
        methods: {
            // 鼠标移入cell，取出技能id
            focus(row) {
                this.currentId = row.bid;
                // console.log("当前技能id：", this.currentId);
            },

            cancelSkill() {
                this.editionVersion = false;
            },

            search() {
                this.pageConfig.currentPage = 1;
                this.searchSkill();
            },

            reset() {
                this.loading = true;
                this.name = this.state = "";
                this.pageConfig.currentPage = 1;
                this.fetchList();
            },
            fetchList() {
                getAlreadySkillList(
                    this.pageConfig.currentPage,
                    this.pageConfig.size
                ).then((res) => {
                    this.loading = false;
                    this.tableData = res.records;
                    this.cloneTableData = JSON.parse(JSON.stringify(res.records));

                    this.tableData.map(
                        (item) => (item["createTime"] = this.$dateFormat(item["createTime"]))
                    );
                    this.pageConfig.totalCount = res.total;
                });
            },

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
            handleSelectVison(index, row) {
                this.dialogTitle = "选择版本";
                this.tableDataNoRelation = [];
                this.editionVersion = true;
                console.log("row", row.skillId); //技能id
                getNoRelation(row.skillId).then((res) => {
                    this.loading = false;
                    this.tableDataNoRelation = res;
                    this.tableDataRaw = res[0];
                    console.log("this.tableDataNoRelation", this.tableDataNoRelation);
                });
            },
            handlePublished(index, row) {
                this.tableDataNoRelation = [];
                this.editionVersion = true;
                this.dialogTitle = "已发布版本";
                console.log("row", row); //技能id
                getPublished(
                    this.pageConfig.currentPage,
                    this.pageConfig.size,
                    row.skillId
                ).then((res) => {
                    this.loading = false;
                    this.tableDataNoRelation = res;
                    this.tableDataRaw = res[0];
                    console.log("this.tableDataNoRelation", this.tableDataNoRelation);
                });
            },

            getIndexRow(row) {
                this.tableDataRaw = row;
                console.log("row2222", row); //技能id
            },
            handleRelease() {
                let row = this.tableDataRaw;
                this.$router.push({
                    path: `/platform/skillOrange/modify`,
                    query: {
                        rpaSkillId: row.rpaSkillId,
                        rpaSkillVersionId: row.rpaSkillVersionId,
                        rpaVersion: row.rpaVersion,
                    },
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
                console.log(
                    "-----2222",
                    (this.pageConfig.currentPage - 1) * this.pageConfig.size + $index + 1
                );
                //表格序号
                return String(
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

>>> .el-table--small td {
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