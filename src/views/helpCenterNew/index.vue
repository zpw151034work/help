<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main>
      <div class="main">
        <el-row>
          <el-col :xs="24" :sm="3">
            <div class="aside">
              <Menu @callBackInfo="callBackInfo"  ></Menu>
            </div>
          </el-col>
          <el-col :xs="24" :sm="21" style="height: 100%">
            <div class="mainContent">
              <MainContent :menuActive = menuActive></MainContent>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import Header from "./components/Header.vue";
import MainContent from "./components/MainContent.vue";
import Menu from "./components/menu.vue";
export default {
  components: {
    Header,
    MainContent,
    Menu,
  },
  data() {
    return {
      isCollapse: false,
      screenWidth: "",
      modeType: "vertical",
      isShow: true,
      menuActive:'0'

    };
  },

  mounted() {},
  methods: {
    callBackInfo(val){
      console.log('eee')
      console.log(val)
      console.log('eee')
     this.menuActive = val

    }
  },
};
</script>
<style lang="scss" scoped>
main {
  width: 88%;
  margin: 0 6%;
}

.el-menu {
  overflow: hidden;
}

.aside {
  width: 100%;
  height: calc(100vh - 250px);
  
}

.mainContent {
  width: 100%;
  background: #fff;
}

.el-header {
  height: 197px !important;
}

::v-deep .el-autocomplete {
    width: 100%;
}
</style>
