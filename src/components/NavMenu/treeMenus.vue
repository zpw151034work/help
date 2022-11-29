<template>
    <div>
        <!-- {{ menuData }} -->
        <template v-for="(menu, index ) in menuData">
            <el-submenu v-if="menu.name" :key="index+''" :index="menu.bid+''">
                <template slot="title">
                    <!-- <span slot="title">{{ menu.name }}</span> -->
                    <el-tooltip slot="title" class="item" effect="dark" :content="menu.name" placement="top-end">
                        <span>{{ menu.name }}</span>
                    </el-tooltip>
                </template>
                <tree-menus :menu-data="hebing(menu)" @getDetails="getDetails" />
                <!-- menu.children.length?menu.children:menu.docList -->
            </el-submenu>
            <el-menu-item v-else :key="index +''" :index="menu.bid+''" @click="getDetails(menu)">
                <el-tooltip class="item" effect="dark" :content="menu.title" placement="top-end">
                    <span>{{ menu.title }}</span>
                </el-tooltip>
                <!-- {{ menu.title }} -->
            </el-menu-item>
        </template>
    </div>
</template>
<script>
    export default {
        name: 'TreeMenus',
        props: {
            menuData: {
                type: Array,
                default: function() {
                    return []
                }
            }
        },
        mounted() {

        },
        methods: {
            hebing(arr) {
                let arr1 = []
                if (arr.docList && arr.children) {
                    arr1 = [...arr.docList, ...arr.children]
                } else if ( arr.children ){
                    arr1 = arr.children
                }
                return arr1
            },
            getDetails(t) {
                this.$emit('getDetails', t)
            }
        }
    }
</script>
<style lang="scss" scoped>
/deep/ .el-menu-item{
  overflow: hidden;
  text-overflow:ellipsis
}
</style>
