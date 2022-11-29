<template>
    <div class="home">
        <!-- <Head /> -->
        <IndexBanner />
        <CardBox :data-lists="robotList" :data-type="robotType" title="热门机器人" content="海量已经配置好技能流程的机器人" href="/robot/list" path="/robot/detail" />
        <CardBox :data-lists="skillList" :data-type="skillType" title="热门技能" content="海量已经设计好的适应特定场景的技能流程" href="/skills" path="/skillsDetail" class="hotSkill" />
        <div class="foot-top">
            <div class="">
                <div>
                    <h2>RPA业务流程机器人</h2>
                    <p>RPA+AI已广泛应用于金融、制造、能源等各行各业以财税、人事、客服和营销为代表的办公场景中。</p>
                </div>
                <div class="down-box">
                    <a :href="RPA_ROBOT_DOWN_PATH" target="_blank" class="down down-robot">RPA机器人端下载</a>
                    <a :href="CS_EDITER_DOWN_PATH" target="_blank" class="down down-cse" style="margin-left:19px">RPA设计器下载</a>
                </div>
            </div>
            <!-- <span @click="$router.push('/skills')">了解更多</span> -->
        </div>
    </div>
</template>

<script>
    import IndexBanner from '@/views/comment/IndexBanner.vue'
    import CardBox from '@/views/comment/cardBox.vue'
    import {
        getSkillRobotList,
        getMsResourceRobotList
    } from '../../api/home/index'
    export default {
        name: 'Index',
        components: {
            IndexBanner,
            CardBox
        },
        data() {
            return {
                robotType: 'robotType',
                skillType: 'skillType',
                dialogVisible: true,
                num: 0,
                robotList: [],
                skillList: [],
                RPA_ROBOT_DOWN_PATH: window.RPA_ROBOT_DOWN_PATH,
                CS_EDITER_DOWN_PATH: window.CS_EDITER_DOWN_PATH
            }
        },
        mounted() {
            this.getRobotList()
            this.getSkillRobotList()
        },
        methods: {
            // 获取热门机器人
            getRobotList() {
                const data = {
                    classifyId: '',
                    robotName: '',
                    current: 1,
                    size: 10
                }
                getMsResourceRobotList(data).then(res => {
                    if (res && res.records) {
                        this.robotList = res.records
                    } else {
                        this.robotList = []
                    }
                })
            },
            // 获取热门技能
            getSkillRobotList() {
                const data = {
                    showNum: 10,
                    classifyId: ''
                }
                getSkillRobotList(data).then(res => {
                    this.skillList = res
                })
            },
            toleft() {
                this.num++
                if (this.num >= this.skillList.length - 5) {
                    this.num = this.skillList.length - 5
                }
                if (this.num < 0) {
                    this.num = 0
                }
                this.$refs.skillWrapper.style['margin-left'] = -240 * this.num + 'px'
            },
            toright() {
                this.num--
                if (this.num <= 0) {
                    this.num = 0
                }
                this.$refs.skillWrapper.style['margin-left'] = -240 * this.num + 'px'
            }
        }
    }
</script>
<style scoped lang="scss">
.foot-top{
    height:140px;
    width:100%;
    background:url('../../assets/home/home-bottom-bg.png');
    background-repeat: repeat;
    background-size:cover;
    overflow: auto;
    display: flex;
    >div{
      width: 1200px;
      margin: 30.5px auto 0;
      display: flex;
    }
    h2{
      // margin: 30.5px 0 0 20%;
      font-size: 24px;
      color: #FFFFFF;
    }
    p{
      margin: 10px 0 0 0;
      font-size: 16px;
      color: rgba(255,255,255,0.80);
    }
    span{
      cursor: pointer;
      margin: 36px 0 0 20%;
      display: block;
      width: 90px;
      line-height: 24px;
      text-align: center;
      font-size: 14px;
      color: #FFFFFF;
      border: 1px solid #FFFFFF;
      border-radius: 4px;
      border-radius: 4px;
    }
    .down{
      display: inline-block;
      width: 200px;
      height: 68px;
      line-height: 68px;
      text-align: center;
      background: #2564EC;
      // box-shadow: 0px 4px 5px 0px rgba(147,174,238,0.18);
      border-radius: 2px;
      font-size: 18px;
      color: #FFFFFF;
      font-weight: 400;
      border-radius: 68px;
      box-sizing: border-box;
    }
    .down-robot{
      background: #4C7EE9;
      color: #fff;
      border: 1px solid #fff;
    }
    .down-cse{
      color: #4C7EE9;
      background: #fff;
      border: 1px solid #4C7EE9;
    }
    .down-box{
      margin-top: 12.5px;
      margin-left: 64px;
    }
  }
.skill-box{
  width: 1288px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  >img{
    cursor: pointer;
  }
  .left-click{
    width: 48px;
    height: 48px;
    margin-right: 6px;
  }
  .right-click{
    width: 48px;
    height: 48px;
    margin-left: 6px;
  }
  .skill-content{
    margin-top: 50px;
    width: 1180px;
    overflow: hidden;
  }
  .skill-wrapper{
    display: flex;
    transition:all 1s ease;
  }
}
.home {
  position: relative;
  top: 0;
  left: 0;

  ::-webkit-input-placeholder{
    /* WebKit browsers */
    color: #fff;
  }
  :-moz-placeholder{
    /* Mozilla Firefox 4 to 18 */
    color: #fff;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #fff;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #fff;
  }

  .search-button {
    color: #fff;
  }
  .hotSkill{
    background: #E5EBF7;
  }
}
h2,
h5 {
  margin: 0px;
  padding: 0px;
}
</style>
<style >

</style>
