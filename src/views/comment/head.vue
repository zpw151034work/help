<template>
    <div class="head">
        <div class="head-box">
            <div class="logo">
                <a href="#/">
                    <!-- <img src="@/assets/home/logo-black.png"> -->
                    <!-- <img src="@/assets/home/logo(2).png" alt=""> -->
                    <svg-icon icon-class="logoBlue" class="svg" />
                    <h1>智能RPA <span>| 资源市场</span></h1>
                </a>
            </div>
            <div class="nav-box">
                <!-- <el-dropdown v-for="(item,index) in navList" :key="index" trigger="click" class="active">
          <span class="el-dropdown-link load-box">
            {{ item.name }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span style="display:block;" @click="modityPswEvent">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span style="display:block;" @click="logoutEvent">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
                <el-menu
                    :default-active="activeMenu"
                    class="el-menu-demo"
                    mode="horizontal"
                    text-color="#555"
                    @select="handleSelect">
                    <el-menu-item index="/home">
                        <a style="height:100%;display:block" href="#/">资源市场</a>
                    </el-menu-item>
                    
                    <!-- <el-menu-item index="#"><a href="#">社区</a></el-menu-item>
          <el-submenu index="#">
            <template slot="title">解决方案</template>
          </el-submenu>
          <el-submenu index="#">
            <template slot="title">产品</template>
          </el-submenu> -->
                    <el-menu-item index="/helpcenter">
                        <a style="height:100%;display:block" href="#/helpcenter">帮助中心</a>
                        <!-- <router-link style="height:100%;display:block" to="/helpcenter">帮助中心</router-link> -->
                    </el-menu-item>
                    <el-menu-item index="">
                        <a style="height:100%;display:block" :href="assistant" target="_blank">AI智能机器人助手</a>
                    </el-menu-item>
                    <!-- <el-menu-item index="#"><a href="#">关于我们</a></el-menu-item> -->
                </el-menu>
            </div>
            <div class="search-box">
                <!-- <div class="search-input">
          <input v-model.trim="searchName" style="color:#fff" type="text" placeholder="请输入您需要的技能">
          <span class="search-button" @click="searchEvent" />
        </div> -->
                <!-- 登录、注册隐藏 -->
                <div class="search-right">
                    <span class="" style="font-size:14px;color: #293340;margin-right:27.5px;cursor: pointer;" @click="loadRpa()">控制台</span>
                    <span style="color:#98A3B7">|</span>
                    <span class="" style="font-size:14px;color: #293340;margin-left:27.5px;cursor: pointer;" @click="modityPswEvent">用户中心</span>
                    <el-dropdown v-if="loginStatus" style="margin-left:36px" trigger="click">
                        <span class="el-dropdown-link load-box">
                            {{ name }}
                            <i class="el-icon-arrow-down el-icon--right" />
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <!-- <el-dropdown-item>
                                <span style="display: block" @click="modityPswEvent">用户中心</span>
                            </el-dropdown-item> -->
                            <!-- <el-dropdown-item>
                <span style="display: block" @click="modityPswEvent">修改密码</span>
              </el-dropdown-item> -->
                            <el-dropdown-item>
                                <span style="display: block" @click="logoutEvent">退出登录</span>
                            </el-dropdown-item>
                            <!-- <el-dropdown-item>
                                <span style="display: block">版本号:V{{version}}</span>
                            </el-dropdown-item> -->
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span v-else style="margin-left:36px" class="load-box">
                        <a class="load" @click="loginEvent">登录</a>
                        <!-- <a class="load" style="width:80px;height:32px;background:#4C7EE9;padding:6px 26px;border-radius:4px;color:#fff;margin-left:36px" @click="registerEvent">注册</a> -->
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'
    import { loginout } from './../../api/index'
    import eventBus from '@/utils/eventBus'
    // import { getToken } from '@/utils/auth'
    export default {
        name: 'Head',
        props: {
            msg: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                name: localStorage.getItem('userName'),
                searchName: '',
                loginStatus: false,
                active: '/home',
                navList: [],
                version: process.env.VERSION,
                assistant: window.ROBOT_ASSISTANT_PATH
            }
        },
        computed: {
            ...mapGetters(['sidebar', 'avatar']),
            ...mapState(['user']),
            //    name() {
            //      //修改: return sessionStorage.getItem('userName')
            //      return localStorage.getItem('userName')
            //    }
            routes() {
                return this.$router.options.routes
            },
            activeMenu() {
                const route = this.$route
                const { meta, path } = route
                // if set path, the sidebar will highlight the path you set
                if (meta.activeMenu) {
                    return meta.activeMenu
                }
                return path
            }
        },
        watch: {
            'user.name'(val) {
                this.name = val
                this.loginStatus = !!val
            }
        },
        mounted() {
            // this.active = location.hash
            if (
                localStorage.getItem('userName') &&
                localStorage.getItem('userName') !== 'undefined'
            ) {
                this.loginStatus = true
            }
            // 监听登录成功之后的用户名
            eventBus.$on('namerouter', (item) => {
                this.name = item.username
            })
        },
        methods: {
            handleSelect(e) {
                // this.$router.push(e)
                console.log(e)
                // if(!e){
                //   return '/home'
                // }
            },
            searchEvent() {
                const data = {
                    type: 'header',
                    value: this.searchName
                }
                this.$emit('search', data)
                this.$router.push({ path: '/search' })
            },
            logoutEvent() {
                loginout().then((res) => {
                    this.loginStatus = false
                    localStorage.removeItem('userName')
                    localStorage.removeItem('phone')
                    localStorage.removeItem('enterpriseName')
                    localStorage.removeItem('password')
                    localStorage.removeItem('userId')
                    sessionStorage.setItem('palt', '')
                    this.$message({
                        type: 'success',
                        message: res
                    })
                })
            },
            // 点击注册按钮
            registerEvent() {
                const url = window.location.hash
                sessionStorage.setItem('url', url)
                this.$router.push({ path: '/register' })
            },
            // 登录
            loginEvent() {
                const url = window.location.hash
                sessionStorage.setItem('url', url)
                this.$router.push({ path: '/login' })
            },
            loadRpa() {
                // 修改：sessionStorage.getItem('userName') && sessionStorage.getItem('password')
                if (
                    localStorage.getItem('userName')
                ) {
                    window.location.href = window.EDITOTPATH
                    // this.$router.push('/platform/usercenter/basic')
                    sessionStorage.setItem('plat', true)
                } else {
                    this.$message({
                        showClose: true,
                        message: '您未登录，请先去登录',
                        type: 'warning'
                    })
                    this.$router.push('/login')
                    return false
                }
            },
            // 用户中心
            modityPswEvent() {
                if (localStorage.getItem('userName')) {
                    this.$router.push('/platform/usercenter/basic')
                } else {
                    this.$message({
                        showClose: true,
                        message: '您未登录，请先去登录',
                        type: 'warning'
                    })
                    this.$router.push('/login')
                    return false
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/deep/ .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, /deep/  .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, /deep/  .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
  background: rgba($color: #fff, $alpha: 0.5);
}
.head {
  //background: #000000;
  background: rgba(255, 255, 255, 0.5);
  height: 60px;
  width: 100%;
  overflow: hidden;
  display: block;
  position: absolute;
  // position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .head-box {
    height: 100%;
    min-width: 1180px;
    width: 61%;
    margin: 0px auto;
    .logo {
      width: 175px;
      float: left;
      height: 60px;
      line-height: 60px;
      display: flex;
      align-items: center;
      .svg{
        width: 25px;
        height: 25px;
      }
    }
    .logo a{
      display: flex;
      align-content: center;
      align-items: center;
    }
    .logo img {
      height: 28px;
      vertical-align: middle;
      margin-right: 4px;
    }
    .logo h1 {
        display: inline-block;
        margin: 0;
        color: #000;
        font-weight: 600;
        line-height: 50px;
        font-size: 14px;
        font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
        vertical-align: middle;
    }
    span{
      font-weight: 500;
    }
  }
}
/deep/ .el-menu--horizontal>.el-menu-item.is-active{
  color: #3969E7
}
/deep/ .el-menu-item{
  color: #555;
}
 /deep/ .el-submenu *{
   color: #555;
 }
.active {
  color: #0a74f2;
  border-bottom: 1px solid #0a74f2;
  box-sizing: border-box;
}
.nav-box {
  float: left;
  line-height: 60px;
  margin-left: 80px;
  font-family: Helvetica;
  font-size: 15px;
  color: #0a74f2;
  letter-spacing: -0.08px;
  font-weight: 400;
  // background: rgba(255, 255, 255, .5) !important;
  background: none;
}
.nav-box *{
  // background: rgba(255, 255, 255, .5) !important;
  // background: rgba($color: #fff, $alpha:0.5) !important;
  background: none;
  // opacity: 0.5;
}
.search-box {
  height: 60px;
  color: #000;
  line-height: 60px;
  float: right;
  .search-input,
  .search-right {
    display: inline;
  }
  .search-input {
    width: 435px;
    height: 30px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 6px;
    position: relative;
    margin-top: 15px;
    float: left;
    margin-right: 30px;
    input {
      border: 0px;
      width: 400px;
      font-size: 14px;
      position: absolute;
      top: 0px;
      height: 30px;
      padding-left: 24px;
      left: 5px;
      outline: none;
      background: transparent;
    }
    .search-button {
      // background: url(./../../assets/index/icon-2.png) 0px -5px;
      width: 40px;
      height: 30px;
      position: absolute;
      top: 0px;
      right: 0px;
    }
    .search-button:hover {
      // background: url(./../../assets/index/icon-2.png) 0px -47px;
      width: 40px;
      height: 30px;
      position: absolute;
      top: 0px;
      right: 0px;
      cursor: pointer;
    }
  }
  .load-box {
    // opacity: 0.5;
    color: #000;
  }

  .a40 {
    margin-right: 40px;
  }
  a {
    color: #000;
    font-size: 14px;
  }
  .el-dropdown{
    cursor: pointer;
  }
}

</style>
