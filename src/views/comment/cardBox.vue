<template>
    <div class="card-box">
        <h1>{{ title }}</h1>
        <span>{{ content }}</span>
        <span class="see-more" :href="href" @click="toHref">查看更多 ></span>
        <div v-if="dataLists.length != 0" class="data-box">
            <img v-show="num > 0 && dataLists.length > 5" class="left-click" src="@/assets/home/left-click.png" alt="" @click="toright">
            <img v-show="num == 0 || dataLists.length < 5" class="left-click" src="@/assets/home/left-unwork.png" alt="" >
            <div class="data-content">
                <div ref="dataWrapper" class="data-wrapper">
                    <IndexBox v-for="(item,index) in dataLists" :key="index" :data-type="dataType" width="220px" :item="item" :href="path" />
                </div>
            </div>
            <img v-show="num < 5 && dataLists.length > 5" class="right-click" src="@/assets/home/right-click.png" alt="" @click="toleft">
            <img v-show="num == 5 || dataLists.length <= 5" class="right-click" alt="" src="@/assets/home/right-unwork.png">
        </div>
    </div>
</template>

<script>
    import IndexBox from '@/views/comment/IndexBox.vue'
    export default {
        components: {
            IndexBox
        },
        props: {
            dataType: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            },
            href: {
                type: String,
                default: ''
            },
            dataLists: {
                type: Array,
                default: () => []
            },
            path: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                num: '0'
            }
        },
        mounted() {},
        methods: {
            toHref() {
                // console.log(this.href)
                this.$router.push(this.href)
            },
            toleft() {
                this.num++
                // console.log(this.num, this.dataLists.length - 5, this.dataLists.length)
                if (this.num >= this.dataLists.length - 5) {
                    this.num = this.dataLists.length - 5
                } else {
                    // this.num = 0
                }
                if (this.num < 0) {
                    this.num = 0
                }
                this.$refs.dataWrapper.style['margin-left'] = -240 * this.num + 'px'
            },
            toright() {
                this.num--
                if (this.dataLists.length <= 5) {
                    this.num = 0
                }
                if (this.num <= 0) {
                    this.num = 0
                }
                this.$refs.dataWrapper.style['margin-left'] = -240 * this.num + 'px'
            }
        }
    }
</script>

<style scoped lang="scss">
.card-box{
  width: 100%;
  height: 530px;
  overflow: auto;
  text-align: center;
  h1{
    margin-top: 50px;
    margin-bottom: 10px;
    text-align: center;
    font-family: PingFangSC-Medium;
    font-size: 28px;
    color: #293340;
    text-align: center;
    font-weight: 500;
  }
  span{
    width: 168px;
    height: 20px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #293340;
    line-height: 20px;
    font-weight: 400;
  }
  .see-more{
    margin-left: 21px;
    width: 70px;
    height: 20px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4C7EE9;
    line-height: 20px;
    font-weight: 400;
    cursor: pointer;
  }
}
.data-box{
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
  .data-content{
    margin-top: 50px;
    width: 1180px;
    overflow: hidden;
  }
  .data-wrapper{
    display: flex;
    transition:all 1s ease;
  }
}
</style>

