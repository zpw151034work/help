<template>
    <div class="skills-detail-box">
        <div class="breadcrumb">
            <img src="@/assets/skills/location.png" alt="">
            <span>当前位置:</span>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <!-- <el-breadcrumb-item v-for="(item) in lists" :key="item.path">
                    <a v-if="item.meta.path" class="el-breadcrumb__inner" :href="'#'+item.meta.path">{{ item.meta.title }}</a>
                    <p v-else style="color:#5282ea">{{ item.meta.title }}</p>
                </el-breadcrumb-item> -->
                <el-breadcrumb-item>
                    <a class="el-breadcrumb__inner" :href="'#/'">首页</a>
                </el-breadcrumb-item>
                
                <el-breadcrumb-item >
                    <a class="el-breadcrumb__inner" :href="'#/skills'">全部技能</a>
                </el-breadcrumb-item>
                <el-breadcrumb-item class="active">{{ skilldetail.skillName }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <h1>{{ skilldetail.skillName }}</h1>
        <div style="margin-bottom:51px" class="skills-detail-content">
            <div class="skills-detail-left">
                <div class="content" />
                <div class="skills-detail-introduce">
                    <h2 style="font-size: 24px;color: #293340;">详情</h2>
                    <p class="skills-btn">简介</p>
                    <p>{{ skilldetail.handbookSimpleContent }}</p>
                    <p class="skills-btn">详情说明</p>
                    <div class="details" v-html="skilldetail.handbookContent" />
                </div>
            </div>
            <div class="skills-detail-right">
                <div class="skills-introduce">
                    <table>
                        <tr>
                            <td class="ar">技能描述：</td>
                            <td>
                                <el-tooltip tooltipclass="item" effect="dark" content="" placement="top">
                                    <div slot="content" style="width:360px">{{ skilldetail.description }}</div>
                                    <p style="max-height:250px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 10;line-clamp: 10;-webkit-box-orient: vertical;">
                                        {{ skilldetail.description }}
                                    </p>
                                </el-tooltip>
                            </td>
                            <!-- <td>{{ skilldetail.description }}</td> -->
                        </tr>
                        <tr>
                            <td class="ar">开发者：</td>
                            <td>{{ skilldetail.username }}</td>
                        </tr>
                        <tr>
                            <td class="ar">分类：</td>
                            <td><span class="classtype">{{ skilldetail.classifyName }}</span></td>
                        </tr>
                        <tr>
                            <td class="ar">更新时间：</td>
                            <td>{{ skilldetail.updateTime }}</td>
                        </tr>
                        <tr>
                            <td class="ar">下载数量：</td>
                            <td>{{ skilldetail.downloadsNum }}</td>
                        </tr>
                    </table>
                </div>
                <div class="skills-edition">
                    <el-form label-width="40px">
                        <el-form-item label="版本">
                            <el-select v-model="value" style="width:120px" placeholder="请选择" @change="setVersion">
                                <el-option
                                    v-for="item in options"
                                    :key="item.skillVersionId"
                                    :label="item.version"
                                    :value="item.skillVersionId" />
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div style="margin-top:10px;display:flex;justify-content: flex-start;">
                    <el-button class="shanghcuan-btn" type="primary" @click="getSkills"><span class="shangchuan-icon" />获取技能</el-button>
                    <el-button class="runText-btn" @click="runTest">试运行</el-button>
                    <!-- <el-button style="width:60px;height:56px" @click="giveTheThumbsUp"><img src="../../assets/skills/details-like-normal.png" alt=""><br>点赞</el-button> -->
                </div>
            </div>
        </div>
        <div style="margin-bottom:51px">
            <h1>推荐</h1>
            <div style="display:flex">
                <IndexBox v-for="(item,index) in skillList" :key="index" :data-type="dataType" width="220px" :item="item" href="/skillsDetail" />
            </div>
        </div>
        <SkilSuccess ref="SkilSuccess" :skill-version-id="skilldetail.skillVersionId" :dialog-visible.sync="dialogVisible" />
    </div>
</template>
<script>
    import IndexBox from '@/views/comment/IndexBox.vue'
    import SkilSuccess from '@/views/comment/dialog/skilSuccess.vue'
    import { mapState } from 'vuex'
    import { debounce } from '@/utils/debounce'
    import { getSkillDetail, getSkillRobotList, getSkillVersionList, obtainSkill, tempSaveDispatchTask } from '../../api/home/index'
    export default {
        components: {
            IndexBox,
            SkilSuccess
        },
        data() {
            return {
                value: '',
                dialogVisible: false,
                dataType: 'skillType',
                skilldetail: {
                    skillId: '', // 技能ID
                    skillVersionId: '', // 技能版本ID
                    skillName: '', // 技能名称
                    downloadsNum: '', // 下载数
                    version: '', // 技能版本号
                    description: '', // 技能描述,
                    handbookCoverImage: '', // 技能手册封面图
                    username: '', // 创建人名称,
                    classifyId: '', // 技能分类ID,
                    classifyName: '', // 技能分类名称
                    updateTime: '', // 更新时间
                    handbookSimpleContent: '', // 技能手册简介
                    handbookTitle: '', // 技能手册标题\
                    andbookContent: '' // 技能手册正文
                },
                options: [],
                skillList: [],
                lists: []
            }
        },
        computed: {
            ...mapState(['user'])
        },
        watch: {
            // $route(to, from) {
            //     console.log(to, from)
            //     this.lists = to.matched
            // },
            async $route(to) {
                this.lists = to.matched
                await this.getSkillDetail()
                await this.getSkillRobotList()
                this.getSkillVersionList()
            }
        },
        created() {
            this.lists = this.$route.matched // 获取路由内的全部信息
        },
        async mounted() {
            this.value = this.$route.query.skillVersionId
            await this.getSkillDetail()
            await this.getSkillRobotList()
            this.getSkillVersionList()
        },
        methods: {
            // 试运行
            runTest: debounce(function(){
                const { skillId } = this.$route.query
                const { value } = this
                const data = {
                    skillVersionId: value,
                    skillId
                }
                // 先获取技能
                obtainSkill(data).finally(() => {
                    const {skillName, version: skillVersion} = this.skilldetail
                    const params = {
                        skillName,
                        skillVersion
                    }
                    tempSaveDispatchTask(params).then(() => {
                        this.$message.success('运行成功')
                    })
                })
            },100),
            setVersion() {
                const { skillId } = this.$route.query
                const { value } = this
                const data = {
                    skillId,
                    skillVersionId: value
                }
                getSkillDetail(data).then(res => {
                    this.skilldetail = res
                })
            },
            // 获取详情
            async getSkillDetail() {
                const { skillId, skillVersionId } = this.$route.query
                const data = {
                    skillId,
                    skillVersionId
                }
                getSkillDetail(data).then(res => {
                    this.skilldetail = res
                })
            },
            // 获取推荐技能
            getSkillRobotList() {
                const data = {
                    showNum: 5,
                    classifyId: this.skilldetail.classifyId // 技能分类ID
                }
                getSkillRobotList(data).then(res => {
                    this.skillList = res
                })
            },
            // 获取技能版本列表
            getSkillVersionList() {
                getSkillVersionList({ skillId: this.$route.query.skillId }).then(res => {
                    this.options = res
                    // if (!this.value) {
                    //   this.value = res[0].skillVersionId
                    // }
                })
            },
            // 获取技能接口
            obtainSkill() {
                const { skillId } = this.$route.query
                const { value } = this
                const data = {
                    skillVersionId: value,
                    skillId
                }
                obtainSkill(data).then(() => {
                    this.$refs.SkilSuccess.setdialogVisible(true)
                })
            },
            giveTheThumbsUp() {
                console.log('点赞')
            },
            getSkills() {
                if (localStorage.getItem('userName')) {
                    this.obtainSkill()
                } else {
                    this.$store.commit('user/SET_DIALOGVISIBLE', true)
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
tr{
  line-height: 28px;
}
.ar{
  width: 70px;
  text-align: right;
  color: #98A3B7;
}
.skills-detail-box{
  // margin-top: 60px;
  overflow: hidden;
  margin: 0 auto;
  width: 1200px;
  .breadcrumb{
    display: flex;
    margin-top: 80px;
    align-items: center;
    font-size: 14px;
    img{
      width: 11px;
      height: 11px;
      margin-right: 11.5px;
    }
    span{
      margin-right: 5px;
    }

    .active /deep/ .el-breadcrumb__inner{
      color: rgb(82, 130, 234);
    }
  }
  .skills-detail-content{
    margin-top: 45.5px;
    display: flex;
    .skills-detail-left{
      width: 630px;
      .content{
        width: 630px;
        height: 419px;
        background: url('../../assets/skills/skillDetailLogo.jpg'),100%,100%,no-repeat;
      }
      .skills-detail-introduce{
        margin-top: 40px;
        p{
          line-height: 28px;
          margin: 15px 0 15px 0;
        }
        .skills-btn{
          width: 73px;
          line-height: 24px;
          background: #D7E4FF;
          border: 1px solid #4C7EE9;
          border-radius: 4px;
          border-radius: 4px;
          font-size: 14px;
          color: #4C7EE9;
          text-align: center;
        }
        .details{
          line-height: 28px;
        }
      }
    }
    .skills-detail-right{
      width: 540px;
      margin-left: 30px;
      .skills-introduce{
        padding: 20px 14px;
        width: 540px;
        height: 297px;
        font-size: 14px;
        color:  #293340;
        background: #FAFAFB;
        border: 1px solid #F3F5F7;
        border-radius: 4px;
        border-radius: 4px;
      }
      .skills-edition{
        padding: 13px 38.5px;
        margin-top: 10px;
        width: 380px;
        height: 60px;
        background: url('../../assets/skills/V.png'),100%,100%,repeat;
      }
      /deep/ .shanghcuan-btn{
        width: 300px;
        height: 42px;
        font-size: 16px;
        >span{
          margin: 0 auto;
          width: 100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
      /deep/ .runTest-btn {
        width: 60px;
        height: 42px;
        border: 1px solid rgba(76,126,233,1);
        color: #4C7EE9;
        margin-left: 20px;
        border-radius: 4px;
      }
      .shangchuan-icon{
        display: inline-block;
        width: 25px;
        height: 22px;
        background: url('../../assets/skills/download-icon.png'),100%,100%,no-repeat;
      }
      .dianzan-btn{
        width: 60px;
        height: 56px;
      }
    }
  }
}
/deep/ .el-tooltip__popper{
  width: 360px;
}
.classtype{
  background: #D7E4FF;
  border: 1px solid #4C7EE9;
  border-radius: 4px;
  border-radius: 4px;
  font-size: 14px;
  color: #4C7EE9;
  padding: 2px 4px;
}
</style>
