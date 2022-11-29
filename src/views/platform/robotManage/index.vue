<template>
    <div class="robot-container public-container">
        <div class="content">
            <!--表单-->
            <el-form ref="form" :inline="true" :model="form" class="demo-form-inline">
                <el-form-item prop="robotName">
                    <el-input class="robotName" v-model.trim="form.robotName" placeholder="请输入机器人名称"></el-input>
                </el-form-item>
                <el-form-item prop="ifShow">
                    <el-select v-model="form.ifShow" placeholder="所有的状态">
                        <el-option
                            v-for="item in allOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="searchEvent">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-refresh" @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--列表-->
        <div class="table-box">
            <el-table
                height="calc(100vh - 240px)"
                v-loading="loading"
                ref="multipleTable"
                :data="robotListData"
                tooltip-effect="dark"
                style="width: 100%;"
                class="table-content">
                <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    width="50">
                    <template slot-scope="scope">
                        <span v-text="getIndex(scope.$index)"> </span>
                    </template>
                </el-table-column>
                <el-table-column
                    :show-overflow-tooltip="true"
                    prop="robotName"
                    label="机器人名称"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="robotDesc"
                    label="机器人描述"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="最近更新时间"
                    align="center">
                    <template slot-scope="scope">
                        {{ formatDateRobot(scope.row.updateTime) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ifShow"
                    label="状态"
                    align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.ifShow | resetIfShow}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    props="handler"
                    label="操作"
                    align="center"
                    width="180">
                    <template slot-scope="scope">
                        <!--type为0（sass平台） 展示设置、设备管理 type为1（资源服务市场） 不展示设置、设备管理-->
                        <el-button
                            type="text"
                            @click="detailEvent(scope.row)">查看</el-button>
                        <!-- <el-button v-if="scope.row.ifShow=='1'" @click="onlineEvent(scope.row)" type="text">上线</el-button> -->
                        <el-button v-if="scope.row.ifShow=='0'" @click="offlineEvent(scope.row)" type="text">下线</el-button>
                        <el-button
                            type="text"
                            @click="deleteEvent(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <div class="pagination float-right">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.pageNum"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="page.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import { getRobotList, deleteRobot, setRobotOnOff } from '@/api/robotManage';
    import { formatDateTime } from '@/utils/date';
    export default {
        name: 'RobotTemp',
        computed: {
            ...mapGetters(['name'])
        },
        data(){
            return {
                loading: false,
                form: {
                    robotName: '',
                    ifShow: '',
                },
                page: {
                    pageSize: 10,
                    pageNum: 1,
                    total: 0,
                },
                allOptions: [{
                    value: '',
                    label: '所有状态'
                }, {
                    value: 0,
                    label: '已上线'
                },{
                    value: 1,
                    label: '已下线'
                }],
                robotListData: [],
            }
        },
        filters: {
            resetIfShow: function(value){
                let val = String(value)
                if (val){
                    if (val == 0){
                        return "已上线"
                    } else if (val == 1){
                        return "已下线"
                    }
                }
            }
        },
        mounted () {
            this.loading = true;
            this.getRobotData();
        },
        methods: {
            // 初始化得到机器人列表数据
            // 得到机器人列表数据
            getRobotData(){
                let data = {
                    robotName: this.form.robotName,
                    ifShow: this.form.ifShow,
                    current: this.page.pageNum,
                    size: this.page.pageSize,
                };
                getRobotList(data).then(res => {
                    //console.log('getRobotList',res);
                    if (res&&res.records){
                        this.loading = false;
                        this.robotListData = res.records;
                        this.page.total = res.total;
                    } else {
                        this.robotListData = [];
                        this.page.total = 0;
                    }
                })
            },
            // 根据条件查询匹配的机器人列表数据
            searchEvent(){
                //页数置为1
                this.page.pageNum = 1;
                this.getRobotData();
            },
            // 切换条数
            handleSizeChange(size){
                //console.log('10/page');
                this.page.pageSize = size;
                //切换条数的时候，让页数置为1
                this.page.pageNum = 1;
                this.getRobotData();
            },
            // 切换页数
            handleCurrentChange(current){
                //console.log('点击当前页',current);
                this.page.pageNum = current;
                this.getRobotData();
            },
            // 重置
            resetForm(form){
                this.$refs[form].resetFields();
                //页数置为1
                this.page.pageNum = 1;
                this.page.pageSize = 10
                this.getRobotData();
            },
            // 对时间格式进行处理
            formatDateRobot(value) {
                return formatDateTime(value);
            },
            //获取表格序号
            getIndex($index) {
                //表格序号
                return (this.page.pageNum - 1) * this.page.pageSize + $index + 1;
            },
            // 上线
            onlineEvent(row) {
                let params = {
                    id: row.id,
                    ifShow: 0
                }
                setRobotOnOff(params).then(res => {
                    if (res){
                        this.$message({
                            type: "success",
                            message: "设置上线成功！"
                        });
                        this.getRobotData();
                    }
                })
            },
            // 下线
            offlineEvent(row) {
                let params = {
                    id: row.id,
                    ifShow: 1
                }
                this.$confirm('确认下线后，该机器人在资源市场不可见，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    setRobotOnOff(params).then(res => {
                        if (res){
                            this.$message({
                                type: "success",
                                message: "设置下线成功！"
                            });
                            this.getRobotData();
                        }
                    })
                }).catch(() => {
                })
                
            },
            // 查看详情
            detailEvent(row) {
                this.$router.push(
                    {
                        path: `/platform/robotManage/detail/${row.id}`,
                        query: {
                            from: "release"
                        }
                    }
                )
            },
            // 删除机器人列表
            deleteEvent(row) {
                if (row.ifShow == "0"){
                    this.$message({
                        type: "error",
                        message: "只有下线后才能删除"
                    });
                    return
                }
                this.$confirm('是否要删除机器人？', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = row.id;
                    deleteRobot(data).then(res => {
                        if (res){
                            this.$message({
                                type: 'success',
                                message: res
                            });
                            this.getRobotData();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
    }
</script>

<style lang="scss" scoped>

    .content {
        background: #fff;
        //padding: 20px 30px 0 30px;
    }

    .dashboard {
        &-container {
            margin: 30px;
        }

        &-text {
            font-size: 30px;
            line-height: 46px;
        }
    }
</style>
<style lang="scss">
    /* switch开关的自定义样式 */
    .robot-container {
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

        @media screen and(-ms-high-contrast: active), (-ms-high-contrast: none) { // IE浏览器兼容样式
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
        .el-table::before{
            display: none;
        }
        .el-table__fixed::before, .el-table__fixed-right::before{
            display: none;
        }
    }
</style>
