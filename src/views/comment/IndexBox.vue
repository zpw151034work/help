<template>
    <div class="index-data-box" :style="'width:'+width+';'+'height:'+height">
        <div v-if="dataType == 'skillType'">
            <svg-icon icon-class="hotelectFree" class="free" />
            <img v-if="item.handbookCoverImage" class="data-logo" :src="item.handbookCoverImage" alt="">
            <!-- <img v-else class="data-logo" src="@/assets/robot/robot_logo.png" alt=""> -->
            <svg-icon  v-else icon-class="skil" class="data-logo" />
            <h1>{{ item.skillName }}</h1>
            <p>{{ item.username }}</p>
            <div class="data-footer">
                <div>
                    <svg-icon icon-class="hotelect" class="down" />
                    <span> &nbsp;{{ item.downloadsNum }}</span>
                </div>
                <!-- <div style="cursor: pointer;" @click="fabulous">
          <span v-show="item.fabulous" ref="fabulousTrue" class="fabulousTrue" />
          <span v-show="!item.fabulous" ref="fabulousFalse" class="fabulousFalse" />
          <span>&nbsp;点赞</span>
        </div> -->
            </div>
            <div class="introduce" @click="toDateil(item)">
                <span class="introduce-rpa">技能简介</span>
                <span class="introduce-mian">免费</span>
                <p class="introduce-content">{{ item.handbookSimpleContent }}</p>
                <span class="introduce-dateil">
                    查看详情
                </span>
            </div>
        </div>
        <div v-if="dataType == 'robotType'">
            <img class="free" src="../../assets/home/home-hotelect-free.png" alt="">
            <svg-icon icon-class="hotelectFree" class="free" />
            <img v-if="item.filePath" class="data-logo" :src="item.fileUrl" alt="">
            <img v-else class="data-logo" src="@/assets/robot/rebot.png" alt="">
            <!-- <svg-icon  v-else icon-class="rpaportrait" class="data-logo" /> -->
            <!-- <img v-if="item.filePath != null && item.filePath !=''" class="data-logo" :src="`${prefix}${item.filePath}`" alt="">
            <img v-if="item.filePath == null || item.filePath == ''" class="data-logo" src="@/assets/robot/robot_logo.png" alt=""> -->
            <h1>{{ item.robotName }}</h1>
            <p>{{ item.createName }}</p>
            <div class="data-footer">
                <div>
                    <img class="down" src="../../assets/home/home-hotelect-down-click.png" alt="">
                    <span> &nbsp;{{ item.downloadCount }}</span>
                </div>
            </div>
            <div class="introduce" @click="robotRobotDetail(item)">
                <span class="introduce-rpa">机器人简介</span>
                <span class="introduce-mian">免费</span>
                <p class="introduce-content">{{ item.robotDesc }}</p>
                <span class="introduce-dateil">
                    查看详情
                </span>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            dataType: {
                type: String,
                default: ''
            },
            item: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            width: {
                type: String,
                default: '220px'
            },
            height: {
                type: String,
                default: '244px'
            },
            href: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                // prefix: window.MINIO_URL
            }
        },
        created() {
            // eslint-disable-next-line
            // this.prefix =  window.MINIO_URL //`${process.env.NODE_ENV}` === 'production' ? `${MINIO_URL.MINIO_URL}` : `${process.env.VUE_APP_OBJECT_STORAGE}`;
        },
        mounted() {},
        methods: {
            fabulous() {
                if (!this.item.fabulous) {
                    // 发送点赞接口
                    // const data = {

                    // }
                }
            },
            toDateil(t) {
                const { skillId, skillVersionId } = t
                // this.$router.push({
                //     path: this.href,
                //     query: {
                //         skillId,
                //         skillVersionId
                //     }
                // })
                // console.log( '#'+this.href,'this.href')
                // return
                location.href = '#'+this.href + '?skillId=' + skillId + '&skillVersionId=' + skillVersionId
            },
            robotRobotDetail(item) {
                console.log(item,this.href)
                // this.$router.push(this.href + '/' + item.id)
                location.href = '#' + this.href + '/' + item.id
            }
        }
    }
</script>

<style scoped lang="scss">
.index-data-box:hover{
  .introduce{
    top: 0;
    left: 0;
    transition:all 1s ease;
  }
}
.index-data-box{
  margin-bottom: 8px;
  // flex:1;
  flex-shrink: 0;
  // width: 220px;
  height: 244px;
  position: relative;
  background: url('../../assets/home/home-hotelct-bg.png');
  background-repeat: no-repeat;
  background-size: 100%,100%;
  margin-right: 20px;
  overflow: hidden;
  border-radius: 4px;
  text-align: center;
  padding: 0 5px;
  box-shadow: 0 4px 8px rgba(216,218,226,1);
  .introduce{
    padding: 0 28.5px;
    animation:all 5s infinite;
    position: absolute;
    top: 0;
    top: 100%;
    width: 100%;
    height: 100%;
    background: rgba($color: #4C7EE9 , $alpha: 0.9);
    color: #fff;
    cursor: pointer;
    text-align: left;
    span{
      display: inline-block
    }
    .introduce-rpa{
      margin-top: 23.5px;
      font-size: 16px;
    }
    .introduce-mian{
      margin-top: 23.5px;
      font-size: 12px;
      border: 1px solid #FFFFFF;
      border-radius: 4px;
      padding: 0 11px;
      margin-left: 10px
    }
    .introduce-content{
      margin: 22px auto;
      height: 100px;
      font-size: 14px;
      color: #FFFFFF;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 7;
      overflow: hidden;
      line-height: 20px;
    }
    .introduce-dateil{
      padding: 3px 17px;
      display: inline-block;
      width: 90px;
      height: 24px;
      font-size: 14px;
      color: #4C7EE9;
      background: #FFFFFF;
      box-shadow: 0 0 4px 0 #4C7EE9;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 50%;
      transform: translateX(-50%);
    }
  }
  .free{
    position: absolute;
    top:0;
    right: 0;
    width: 48px;
    height: 48px;
  }
  .data-logo{
    display: inline-block;
    width: 80px;
    height: 80px;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 50%;
  }
  h1{
    font-size: 20px;
    color: #293340;
    margin-top: 10.5px;
    margin-bottom: 4px;
  }
  p{
    font-size: 14px;
    color: #777777;
  }
  .data-footer{
    position: absolute;
    width: 100%;
    bottom: 23px;
    padding: 0 27.8px;
    display: flex;
    justify-content: space-between;
    span{
      font-size: 14px;
      color: #293340;
    }
    >*{
      display: flex;
      height: 18px;
    }
    .fabulousTrue:hover,.fabulousFalse:hover{
      background: url('../../assets/home/home-hotelect-like-suspension.png');
    }
    .fabulousTrue{
      display: inline-block;
      width:18px;
      height:18px;
      background: url('../../assets/home/home-hotelect-like-select.png');
      background-repeat: no-repeat;   //不重复
      background-size: 100% 100%
    }
    // home-hotelect-like-select
    .fabulousFalse{
      display: inline-block;
      width:18px;
      height:18px;
      background: url('../../assets/home/home-hotelect-like-normal.png');
      background-repeat: no-repeat;   //不重复
      background-size: 100% 100%
    }
  }
}
</style>

