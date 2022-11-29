<template>
    <div class="nav-menu">
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
        <!-- <div :class="isCollapse?'lachu  flagOut':'lachu'"  @click="zhanchu">
     <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>
     <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
    </div> -->
        <div style="height:calc(100% - 20px)" class="nav-list">
            <el-menu :default-active="active" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
                <tree-menus :menu-data="navList" @getDetails="getDetails1" />
            </el-menu>
        </div>
    </div>
</template>
<script>
    import treeMenus from './treeMenus.vue'
    export default {
        name: 'NavMenu',
        components: {
            treeMenus
        },
        props: {
            navList: {
                type: Array,
                default: () => {
                    return []
                }
            },
            isCollapse: {
                type: Boolean,
                default: false
            },
            classId: {
                type: Number
            }
        },
        data() {
            return {
                active: ''
                // isCollapse: false
            }
        },
        mounted() {
            this.getLastItem(this.navList)
            const that = this
            window.onresize = function() {
                if (window.innerWidth < 900) {
                    that.isCollapse = true
                } else {
                    that.isCollapse = false
                }
            }
        },
        updated() {
            this.getLastItem(this.navList)
        },
        methods: {
            getLastItem(res) {
                if (this.classId != '') {
                    this.active = this.classId + ''
                } else {
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].children.length > 0) {
                            this.getLastItem(res[i].children)
                            break
                        } else if (res[i].docList && res[i].docList.length) {
                            this.active = res[i].docList[0].bid + ''
                            break
                        }
                    }
                }

            },
            handleOpen() {},
            handleClose() {},
            getDetails1(t) {
                this.$emit('getDetails', t)
            },
            zhanchu() {
                this.$emit('update:isCollapse', !this.isCollapse)
                // this.isCollapse = !this.isCollapse
            }
        }
    }
</script>
<style lang="scss">
.nav-menu {
  .el-menu {
    border: none;
  }
}

</style>
<style lang="scss" scoped>
.nav-menu{
  // position: fixed;
  // top: 180px;
  // left: 365px;
  height: 100%;
  position: relative;
  background: #fff;
  // border-right: 1px solid #e6e6e6;
  /deep/ .el-menu--collapse{
    width: 0px;
  }
}

.lachu{
  position: absolute;
  right: 3px;
  display: none;
  width: 28px;
  line-height: 28px;
  border-radius: 50%;
  border: 1px solid #e8e8e8;
  text-align: center;
  // background: #ddd;
  z-index: 99999;
}
.nav-list{
  padding-top: 20px;
}
.flagOut{
  display: block;
  position: fixed;
  top: 120px;
  left: 0;
}
</style>
