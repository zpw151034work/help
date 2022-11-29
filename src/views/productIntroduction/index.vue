<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main>
      <div class="main">
        <el-row>
          <el-col :xs="12" :sm="3">
            <div class="aside" v-if="isShow">
              <Menu @updateContent="updateContent" :isShow="isShow"></Menu>
            </div>
            <div class="version" v-if="isShow">V1.0公测版</div>
          </el-col>
          <el-col :xs="24" :sm="21" style="height: 100%">
            <div class="mainContent">
              <component :is="content" :id="id" :ref="content">
              </component>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
    <div class="asidePostion" @click="isMenu = true" v-if="isMenu == false && isShow == false">
      <i class="el-icon-s-grid" size="30"></i>
    </div>
    <el-dialog :visible.sync="isMenu" width="50%" :show-close="false" v-if="isMenu == true && isShow == false">
      <Menu @updateContent="updateContent" :isShow="isShow"></Menu>
    </el-dialog>
  </el-container>
</template>
<script>
import Header from "./components/Header.vue";
import MainContent from "./components/MainContent.vue";
import CoreFunctions from "./components/CoreFunctions.vue";
import BillingMode from "./components/BillingMode.vue";
import MajorFunction from "./components/MajorFunction.vue";
import  WebChannel from "./components/WebChannel.vue";
import  AppChannel from "./components/AppChannel.vue";
import  WeCom from "./components/WeCom.vue";
import  NailingRobot from "./components/NailingRobot.vue";
import ApplicationScenario from "./components/ApplicationScenario.vue";
import Menu from "./components/menu.vue";
export default {
  components: {
    ApplicationScenario,
    Header,
    MainContent,
    CoreFunctions,
    BillingMode,
    MajorFunction,
    WebChannel,
    AppChannel,
    WeCom,
    NailingRobot,
    Menu,
  },
  data() {
    return {
      screenWidth: "",
      isShow: true, //判断不显示的
      isMenu: false, //判断是否显示小屏菜单
      content: 'MainContent',
      id: undefined,
      
    };
  },
  watch: {
    screenWidth: function (n, o) {
      if (n <= 768) {
        this.isShow = false;
      } else {
        this.isShow = true;
        this.isMenu = false;
      }
    },
  },

  mounted() {
    this.screenWidth = document.body.clientWidth;
    window.onresize = () => {
      //屏幕尺寸变化
      return (() => {
        this.screenWidth = document.body.clientWidth;
      })();
    };
  },
  methods: {
    //
    updateContent(val) {
      this.content = val
    },
  },
};
</script>
<style lang="scss" scoped>
.aside {
  width: 100%;
  height: calc(100vh - 150px);
  background: #fff;
  border-right: 2px solid#e6e6e6;
}

.mainContent {
  width: 100%;
  height: calc(100vh - 150px);
  background: #fff;
}
.version {
  font-family: PingFang-SC-Medium;
  font-size: 14px;
  color: #606060;
  width: 100%;
  text-align: center;
}

.el-menu {
  border: 0 !important;
}

@media screen and (max-width: 768px) {
  .main {
    height: 100vh;
  }

  .el-container {
    margin-top: 30px;
  }

  .sidebar-top .el-menu--horizontal>.el-menu-item {
    height: 55px;
    line-height: 55px;
  }

  .sidebar-top .el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 55px;
    line-height: 55px;
  }

  .sidebar-top .el-submenu .el-menu-item {
    min-width: 160px;
  }

  .sidebar-top .el-menu--collapse .el-menu .el-submenu,
  .el-menu--popup {
    min-width: 100px;
  }

  .el-submenu__icon-arrow {
    margin-top: -4px;
  }

  .el-submenu .el-menu-item {
    min-width: 80px;
  }

  .iconfont {
    font-size: 20px;
  }

  .asidePostion {
    position: fixed;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    font-size: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  /deep/.el-dialog {
    margin: 0 !important;
    border: 1px solid #fff;
    overflow: hidden;
  }
}
</style>
