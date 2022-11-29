<template>
    <div class="box">
        <div class="scroll-content" @scroll="onScroll" :style="
            'overflow-x: hidden; overflow-y: auto;height:' + contentStyleObj.height
        ">
            <div v-for="item in pageData" :key="item.id" :ref="item.id" class="scroll-item">
                <el-timeline>
                    <el-timeline-item placement="top" size="large" color="#4C87FF">
                        <div class="itemBox">
                            <div class="title frist">{{ item.title }}</div>
                        </div>
                    </el-timeline-item>
                    <el-timeline-item placement="top" size="normal " color="#4C87FF" v-for="ite in item.children"
                        :key="ite.id">
                        <div class="itemBox">
                            <div class="title">{{ ite.title }}</div>
                            <div class="item" v-for="it in ite.children" :key="it.id" @click="JumpPage(it)">
                                {{ it.title }}
                            </div>
                        </div>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
    props: {
        menuActive: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            pageData: [
                {
                    title: "播报型数字人",
                    id: "0",
                    children: [
                        {
                            title: "开始了解：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                        {
                            title: "开始使用：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                        {
                            title: "持续关注：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                    ],
                },
                {
                    title: "企业数字专员",
                    id: "1",
                    children: [
                        {
                            title: "开始了解：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                        {
                            title: "开始使用：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                        {
                            title: "持续关注：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                    ],
                },
                {
                    title: "交互数字人",
                    id: "2",
                    children: [
                        {
                            title: "开始了解：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                        {
                            title: "开始使用：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                        {
                            title: "持续关注：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                    ],
                },
                {
                    title: "全自动直播服务数字人",
                    id: "3",
                    children: [
                        {
                            title: "开始了解：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                        {
                            title: "开始使用：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                        {
                            title: "持续关注：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                    ],
                },
                {
                    title: "微信加友",
                    id: "4",
                    children: [
                        {
                            title: "开始了解：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                        {
                            title: "开始使用：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                        {
                            title: "持续关注：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                    ],
                },
                {
                    title: "智能归档",
                    id: "5",
                    children: [
                        {
                            title: "开始了解：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                        {
                            title: "开始使用：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                        {
                            title: "持续关注：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                    ],
                },
                {
                    title: "智能个呼",
                    id: "6",
                    children: [
                        {
                            title: "开始了解：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                        {
                            title: "开始使用：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                        {
                            title: "持续关注：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                    ],
                },
                {
                    title: "私域运营",
                    id: "7",
                    children: [
                        {
                            title: "开始了解：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                        {
                            title: "开始使用：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                        {
                            title: "持续关注：",
                            id: "11",
                            children: [
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                                {
                                    title: "产品介绍",
                                    id: "11",
                                },
                            ],
                        },
                    ],
                },
            ],
            tabIndex: '0',
            contentStyleObj: {
                height: 'calc(100vh - 250px)',
            },
            tabName: 'setOneRef',
        };
    },
    watch: {
        menuActive(newVal, oldVal) {
            //对数据执行操作
            this.menuActive = newVal;
            let tab =  newVal;
            this.jump(tab)
        },


    },
    mounted() { },
    methods: {
        ...mapMutations(['app/MUNE_ACTION']),
        //页面跳转
        JumpPage(item) { 
        //  this.$router.push({path:'/productIntroduction',query: {key: value}})
         this.$router.push({path:'/productIntroduction'})
        },
        //锚点跳转
        jump(ta, event) {
            let tab = parseInt(ta)
            let target = document.querySelector('.scroll-content')
            let scrollItems = document.querySelectorAll('.scroll-item')
            // 判断滚动条是否滚动到底部
            if (target.scrollHeight <= target.scrollTop + target.clientHeight) {
                this.tabIndex = tab.toString()
            }
            let totalY = scrollItems[tab].offsetTop - scrollItems[0].offsetTop
            let distance = document.querySelector('.scroll-content').scrollTop
            let step = totalY / 50
            if (totalY > distance) {
                smoothDown(document.querySelector('.scroll-content'))
            } else {
                let newTotal = distance - totalY
                step = newTotal / 50
                smoothUp(document.querySelector('.scroll-content'))
            }
            // 参数element为滚动区域
            function smoothDown(element) {
                if (distance < totalY) {
                    distance += step
                    element.scrollTop = distance
                    setTimeout(smoothDown.bind(this, element), 20)
                } else {
                    element.scrollTop = totalY
                }
            }

            // 参数element为滚动区域
            function smoothUp(element) {
                if (distance > totalY) {
                    distance -= step
                    element.scrollTop = distance
                    setTimeout(smoothUp.bind(this, element), 10)
                } else {
                    element.scrollTop = totalY
                }
            }
        },
        // 滚动条滚动
        onScroll(e) {
            let scrollItems = document.querySelectorAll('.scroll-item')
            for (let i = scrollItems.length - 1; i >= 0; i--) {
                // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
                let judge =(
                    e.target.scrollTop >=
                    scrollItems[i].offsetTop - scrollItems[0].offsetTop && e.target.scrollTop <
                    scrollItems[i+1].offsetTop - scrollItems[0].offsetTop)
                if (judge) {
                    console.log('iii');
                    console.log(i)
                    console.log('iii');
                    this.tabIndex = i.toString();
                    console.log('tabIndex')
                    console.log(this.tabIndex)
                    console.log('tabIndex')
                    this['app/MUNE_ACTION'](this.tabIndex)
                    break
                }
            }
        },
        getHight() {
            this.contentStyleObj.height = window.innerHeight - 190 + 'px'
        },

    },
};
</script>
<style lang="scss" scoped>
.box{
    padding: 10px 50px;
    height: 400px;
    // height: calc(100vh - 250px);
   
}
.scroll-content {
    width: 100% !important; 
    padding: 0  5px;
}

.itemBox {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-bottom: 27px;
    position: relative;
    margin-top: -18px;

    .frist {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #474747;
        font-weight: bold;
    }

    .title {
        height: 30px;
        line-height: 30px;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #474747;
    }

    .item {
        background: #ffffff;
        border: 1px solid #e7e9ec;
        box-shadow: 0 2px 5px 0 rgba(134, 145, 171, 0.18);
        border-radius: 2px;
        width: 140px;
        height: 30px;
        line-height: 30px;
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        color: #282828;
        text-align: center;
        margin-right: 16px;
        cursor: pointer;

        &:hover {
            background: #409EFF;
            color: #fff;
        }
    }


}

::v-deep .el-timeline-item__node--normal {
    left: 1px;
    width: 8px;
    height: 8px;
}
::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>


