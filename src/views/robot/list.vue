<template>
    <div style="min-height:calc(100vh - 240px)">
        <div class="robot-top">
            <div class="robot-content">
                <h1>热门机器人</h1>
                <p>提供大量已经配置好技能流程的机器人，下载即用</p>
                <div style="margin-top: 24px;width:620px">
                    <el-input v-model="robotName" placeholder="搜索机器人名称" class="input-with-select" @input="handleName">
                        <el-select slot="prepend" v-model="select" placeholder="请选择" @change="getRobotList">
                            <el-option label="全部" value="" />
                            <el-option v-for="(item,index) in skillClassList" :key="index" :label="item.name" :value="item.code" />
                        </el-select>
                    </el-input>
                </div>
            </div>
            <Baenr url='robot'></Baenr>
        </div>
        <div class="robot-main">
            <div class="robot-wrapper">
                <!-- height="355px"
                width="276px" -->
                <IndexBox
                    v-for="(item,index) in robotList"
                    :key="index"
                    :data-type="dataType"
                    :item="item"
                    style="margin-top:22px"
                    href="/robot/detail" />
            </div>
            <el-pagination
                :total="total"
                :current-page="currentPage"
                :page-sizes="[10, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
            <!-- </div> -->
        </div>
    </div>
</template>
<script>
    import IndexBox from '@/views/comment/IndexBox.vue'
    import { debounce } from '@/utils/debounce'
    import { getMsResourceRobotList, getSkillDict } from '@/api/home/index'
    import Baenr from '../comment/baenr.vue'
    export default {
        components: {
            IndexBox,
            Baenr
        },
        data() {
            return {
                dataType: 'robotType',
                robotName: '',
                select: '',
                currentPage: 1,
                pageSize: 10,
                total: 0,
                form: {
                    select: '',
                    input: ''
                },
                robotList: [],
                skillClassList: []
            }
        },
        mounted() {
            this.getList()
            this.getSkillDict()
        },
        methods: {
            // 获取机器人数据
            getList() {
                const data = {
                    size: this.pageSize,
                    current: this.currentPage,
                    robotName: this.robotName,
                    classifyId: this.select
                }
                getMsResourceRobotList(data).then(res => {
                    this.total = res.total
                    this.robotList = res.records
                })
            },
            // 搜索机器人数据
            getRobotList() {
                this.pageSize = 8
                this.currentPage = 1
                this.getList()
            },
            handleName: debounce(function() {
                this.currentPage = 1
                this.getList()
            }),
            handleSizeChange(val) {
                // 每页多少
                this.pageSize = val
                this.currentPage = 1
                this.getList()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getList()
            },
            getSkillDict() {
                getSkillDict().then(res => {
                    this.skillClassList = res
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
.robot-top{
  width: 100%;
  height: 320px;
  background: url('../../assets/skills/bg.png'),100%,100%,no-repeat;
//   overflow: padd;
padding: 1px;
  .robot-content{
    margin: 110px auto 0;
    width: 1200px;
    h1{
    font-weight: 500;
      margin-bottom: 10px;
      font-size: 36px;
      color: #FFFFFF;
    }
    p{
    //   margin-top: 20px;
      font-size: 16px;
      color: #D7E4FF;
    }
    /deep/ .el-input{
      height: 44px;
      input{
        height: 44px;
      }
      input::-webkit-input-placeholder{
        color:#98A3B7;;
      }
    }
  /deep/ .el-select .el-input {
    width: 130px;
    background: #fff;
  }
  /deep/ .el-input__inner:focus{
     border-color: #fff;
  }
  /deep/ .input-with-select .el-input-group__prepend {
    input::-webkit-input-placeholder{
      color:#293340;
    }
  }
  }
}
.robot-main{
    margin-top: 100px;
  }
.robot-wrapper{
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  // justify-content:stretch
}
/deep/ .el-pagination {
  width: 1197px;
  margin: 36px auto 56px;
  // margin-top: 46px;
  // margin-bottom: 50px;
  text-align: right;
}
</style>
