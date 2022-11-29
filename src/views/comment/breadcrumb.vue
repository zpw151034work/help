<template>
    <!-- <div class="breadcrumb"> -->
    <el-breadcrumb separator="/" class="breadcrumb">
        <img src="@/assets/skills/location.png" alt="">
        <span>当前位置:</span>
        <el-breadcrumb-item v-for="(item) in lists" :key="item.path">
            <!-- <router-link v-if="item.meta.path" :to="item.meta.path">{{ item.meta.title }}</router-link> -->
            <a v-if="item.meta.path" class="el-breadcrumb__inner" :href="'#'+item.meta.path">{{ item.meta.title }}</a>
            <p v-else style="color:#5282ea">{{ item.meta.title }}</p>
        </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- </div> -->

</template>
<script>
    export default {
        name: 'Breadcrumb',
        data() {
            return {
                lists: [] // 定义一个数组 用于接收路由信息
            }
        },
        // 这里必须使用监听，否则无法实时获取路由变动信息。
        // 监听后路由会实时变动，不然需要手动刷新路径才会改变
        watch: {
            $route(to, from) {
                console.log(to, from)
                this.lists = to.matched
            }
        },
        created() {
            this.lists = this.$route.matched // 获取路由内的全部信息
        }
    }
</script>
<style lang="scss" scoped>
.active /deep/ .el-breadcrumb__inner{
  color: rgb(82, 130, 234);
}
 .breadcrumb{
    display: flex;
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
</style>
