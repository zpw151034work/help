<template>
    <el-menu :default-active="menuActive" class="el-menu-vertical-demo" @select="updateContent">
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
                    title: "产品介绍",
                    id: "1",
                    children: [
                        {
                            title: "产品介绍",
                            id: "MainContent",
                        },
                        {
                            title: "核心功能",
                            id: "CoreFunctions",
                        },
                        {
                            title: "应用场景",
                            id: "ApplicationScenario",
                        },
                    ],
                },
                {
                    title: "计费模式",
                    id: "BillingMode",
                },
                {
                    title: "核心功能",
                    id: "MajorFunction",
                },
                {
                    title: "渠道对接",
                    id: "2",
                    children: [
                        {
                            title: "web渠道",
                            id: "WebChannel",
                        },
                        {
                            title: "app渠道",
                            id: "AppChannel",
                        },
                        {
                            title: "企业微信",
                            id: "WeCom",
                        },
                        {
                            title: "钉钉机器人",
                            id: "NailingRobot",
                        },
                    ],
                },
            ],
            menuActive: ''
        };
    },
    watch: {
        '$store.state.app.menuActive'(newVal, oldVal) {
            //对数据执行操作
            this.menuActive = newVal;
            this.$emit("updateContent", this.menuActive)
        },
        isShow: {
            handler(newVal, oldVal) {
                this.menuActive = this.$store.state.app.menuActive;
                this.$emit("updateContent", this.menuActive)
            },
            immediate: true,
            deep: true,
        },

    },
    mounted: function () {
    },
    methods: {
        ...mapMutations(['app/MUNE_CHANGE']),
        updateContent(key, keyPath) {
            this.$emit("updateContent", key)
            this['app/MUNE_CHANGE'](key)

        },
    },
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 768px) {
    .main {
        height: 100vh;
    }

    .el-container {
        margin-top: 30px;
    }

    .aside {
        width: 100%;
        height: 71px;
        overflow-x: scroll;
    }

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
