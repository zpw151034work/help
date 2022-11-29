<template>
    <div class="banner-container">
        <div class="banner-container-conten">
            <h1>RPA资源服务市场</h1>
            <p>这里将为您提供更多的共享资源，方便让您快速使用，帮您尽快完成所需业务。</p>
            <div class="down-box">
                <a :href="RPA_ROBOT_DOWN_PATH" target="_blank" class="down down-robot">RPA机器人端下载</a>
                <a :href="CS_EDITER_DOWN_PATH" target="_blank" class="down down-cse" style="margin-left:30px">RPA设计器下载</a>
            </div>
            <!-- <el-button class="btn" style="height:44px;width:136px" type="primary" @click="$router.push('/skills')">立即使用</el-button> -->
            <div class="content-list">
                <a href="#/robot/list" class="pointer" @click="$router.push('/robot/list')">
                    <dt>
                        <svg-icon icon-class="share"/>
                    </dt>
                    <dd>
                        <h5>机器人</h5>
                        <span>100+机器人资源  免费下载</span>
                    </dd>
                </a>
                <a href="#/skills" class="pointer"  @click="$router.push('/skills')">
                    <dt>
                        <svg-icon icon-class="share"/>
                    </dt>
                    <dd>
                        <h5>机器人技能</h5>
                        <span>更多专业技能 在线秒获取</span>
                    </dd>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                RPA_ROBOT_DOWN_PATH: window.RPA_ROBOT_DOWN_PATH,
                CS_EDITER_DOWN_PATH: window.CS_EDITER_DOWN_PATH
            }
        }
    }
</script>

<style scoped lang="scss">
.banner-container {
  width:100%;
  height: 451px;
  position: relative;
  background: url('../../assets/home/banner.png');
  // overflow: hidden;
  padding: 1px;
   background-repeat: no-repeat;   //不重复
    background-size: 100% 100%;     // 满屏
  .banner-container-conten{
    margin-left: 18.8%;
    .down-box{
          margin-top: 38px;
        }
    .down{
      display: inline-block;
      width: 180px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      
      
      font-weight: 400;
      border-radius: 60px;
    }
    .down-robot{
      background: #4C7EE9;
      color: #fff;
    }
    .down-cse{
      color: #4C7EE9;
      background: #fff;
      border: 1px solid #4C7EE9;
    }
  }
  .btn{
    height: 136px;
    width: 44px;
    font-size: 16px;
    background: #4C7EE9;
  }
  .content-list{
    margin-top: 55px;
    // width: 760px;
    display: flex;
    // justify-content: space-around;
    
    a{
      padding: 17px 20px;
      margin-right: 20px;
      // width: 240px;
      height: 90px;
      background: #fff;
      background-image: linear-gradient(-45deg, #F8F9FB 0%, #F4F5F9 100%);
      border: 1px solid rgba(255,255,255,1);
      box-shadow: 0px 0px 10px 4px rgba(229,233,242,1);
      display: flex;
      dt{
        svg{
          height: 50px;
          width: 50px;
        }
      }
      dd{
        margin-left: 14px;
        
        span{
          display: block;
          margin-top: 5px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #98A3B7;
          text-align: justify;
          font-weight: 400;
        }
      }
      h5{
        // width: 54px;
        height: 25px;
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #293340;
        text-align: justify;
        // font-weight: 500;
      }
    }
  }
  h1{
    margin-top: 130px;
    width: 360px;
    height: 50px;
    font-family: PingFangSC-Medium;
    font-size: 36px;
    color: #293340;
    text-align: left;
    font-weight: 500;
  }
  p{
    margin-top: 20px;
    // width: 383px;
    // height: 66px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #293340;
    font-weight: 400;
  }
}
.pointer{
  cursor: pointer;
}
</style>

