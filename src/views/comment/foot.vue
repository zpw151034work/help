<template>
    <div id="rmarket-foot" class="foot">
        <div class="foot-bottom">
            <div class="foot-left">
                <!-- <img src="../../assets/home/logo-white.png" alt=""> -->
                <!-- <div class="foot-logo">
                    <img src="@/assets/home/logo(2).png" alt="">
                    <h1>RPA平台 <span>| 资源市场</span></h1>
                </div> -->
                <p style="width:549px">RPA机器人替代人工完成业务人员作业过程中最繁杂的部分，使作业效率节约80%以上；RPA机器人及时提醒业务人员作出处理，并记录数据异常，人机协同、准确、高效。</p>
                <p style="width:572px">RPA流程已包含文字识别(OCR)、自然语言处理(NLP)，对话机器人(Chatbot)，计算机视觉(CV)等多种AI能力，可实现更高复杂度、更高价值的流程自动化。</p>
            </div>
            <!-- <div class="foot-center">
                <h2>RPA业务流程机器人</h2>
                <p>AI+RPA深度融合、创新应用、数字化赋能政企</p>
            </div> -->
            <div class="foot-right">
                <!-- <h2>联系我们</h2>
                <p>
                    北京有限元科技有限公司 <br>
                    地址：北京市朝阳区宏泰东街绿地中心中国锦3-4层 <br>
                    手机：135-1085-1315<br>
                    邮箱：changan.zhou@zkj.com
                </p> -->
                <!-- <svg-icon icon-class="OCR" class="svg" />
                <svg-icon icon-class="NLP" class="svg" />
                <svg-icon icon-class="CV" class="svg" /> -->
                <img src="@/assets/home/OCR.png" class="svg" alt="">
                <img src="@/assets/home/NLP.png" class="svg" alt="">
                <img src="@/assets/home/CV.png" class="svg" alt="">
                <!-- <svg-icon icon-class="CHATBOT" class="svg" /> -->
                <img src="@/assets/home/CHATBOT.png" class="svg" alt="">
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        mounted() {}
    }
</script>
<style lang="scss" scoped>
.foot {
  // position: absolute;
  bottom: 0;
  width: 100%;
  height: 209px;
  // height: 240px;
  // background: #293340;
  overflow: auto;
  background: #293340;
  display: flex;
  justify-content: center;
  // >div{
  //   display: inline-block;
  // }
  .foot-logo{
    display: flex;
    align-items: center;
    img{
      height: 28px;
      vertical-align: middle;
      margin-right: 4px;
    }
    h1{
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 20px;
      font-size: 14px;
      font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
      vertical-align: middle;
    }
  }
  .foot-top {
    height: 170px;
    width: 100%;
    background: url("../../assets/home/home-bottom-bg.png"), 100%, 100%;
    overflow: auto;
    h2 {
      margin: 27.5px 0 0 20%;
      font-size: 24px;
      color: #ffffff;
    }
    p {
      margin: 2px 0 0 20%;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.8);
    }
    span {
      cursor: pointer;
      margin: 36px 0 0 20%;
      display: block;
      width: 90px;
      line-height: 24px;
      text-align: center;
      font-size: 14px;
      color: #ffffff;
      border: 1px solid #ffffff;
      border-radius: 4px;
      border-radius: 4px;
    }
  }
  .foot-bottom {
    // width: 100%;
    margin: 0 auto;
    width: auto;
    height: 209px;
    // background: #293340;
    // overflow: auto;
    display: flex;
    
    .foot-left {
      // margin-left: 18.8%;
      margin-top: 41px;
      // width: 549px;
      p {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #98a3b7;
        margin-top: 13.5px;
      }
    }
    .foot-center {
      margin-left: 12.2%;
      margin-top: 41px;
      h2 {
        font-size: 18px;
        color: #ffffff;
        margin-bottom: 16.5px;
      }
      p {
        font-size: 14px;
        color: #98a3b7;
      }
    }
    .foot-right {
      margin-top: 41px;
      margin-left: 6.3%;
      display: flex;
      .svg{
        margin-right: 20px;
        width: 110px;
        height: 110px;
      }

      h2 {
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #ffffff;
      }
      p {
        margin-top: 16px;
        line-height: 20px;
        font-size: 14px;
        color: #98a3b7;
      }
    }
  }
}
</style>
