<template>
    <el-menu :default-active="menuActive" class="el-menu-vertical-demo" @select="updateContent"
        background-color="#F9F9F9" style="border: 1px solid #EDEDED;">
        <div v-for="item in menuData" :key="item.id">
            <el-submenu :index="item.id" v-show="item.children">
                <template slot="title">
                    <span slot="title">{{ item.title
                    }}</span>
                </template>
                <el-menu-item v-for="ite in item.children" :key="ite.id" :index="ite.id">{{ ite.title }}</el-menu-item>
            </el-submenu>
            <el-menu-item :index="item.id" v-show="!item.children">
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
        </div>
    </el-menu>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
    props: {
        isShow: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            menuData: [
                {
                    title: "数字人",
                    id: "11",
                    children: [
                        {
                            title: "播报型数字人",
                            id: "0",
                        },
                        {
                            title: "企业数字专员",
                            id: "1",
                        },
                        {
                            title: "交互数字人",
                            id: "2",
                        },
                        {
                            title: "全自动直播服务数字人",
                            id: "3",
                        },
                    ],
                },
                {
                    title: "自运营",
                    id: "12",
                    children: [
                        {
                            title: "微信加友",
                            id: "4",
                        },
                        {
                            title: "智能归档",
                            id: "5",
                        },
                        {
                            title: "智能个呼",
                            id: "6",
                        },
                        {
                            title: "私域运营",
                            id: "7",
                        },
                    ],
                },
            ],
            menuActive: '0'
        };
    },
    watch: {
        '$store.state.app.menuAction'(newVal, oldVal) {
            console.log('newVal')
            console.log(newVal)
            console.log('newVal')
            this.menuActive = newVal;
        },
       
    },
    mounted: function () {
    },
    methods: {
        ...mapMutations(['app/MUNE_ACTION']),
        updateContent(key, keyPath) {
            console.log('key');
            console.log(key);
            console.log('key');
            this['app/MUNE_ACTION'](key)
            this.$emit("callBackInfo", key)
        },
    },
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 768px) {


    .el-submenu__title {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #474747;
    }
}

::v-deep .el-submenu__title span {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #474747;
    font-weight: bold;
}

::v-deep .el-menu-item span {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #474747;
    font-weight: bold;

}

::v-deep .el-menu-item {
    min-width: 20px;

}
</style>
