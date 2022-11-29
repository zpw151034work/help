<template>
    <el-dialog
        :visible.sync="user.dialogVisible"
        :show-close="true"
        width="600px">
        <div class="logo">
            <svg-icon icon-class="logoBlue" class="svg" />
            <h1>智能RPA <span>| 资源市场</span></h1>
        </div>
        <div class="login-main">
            <div class="login-user">
                <img src="../../../assets/register/person.png" alt="">
                <!-- <input
          v-model="form.userName"
          type="text"
          placeholder="请输入邮箱或手机号"
          autocomplete="off"
        > -->
                <el-input
                    v-model="form.userName"
                    type="text"
                    placeholder="请输入用户账号"
                    autocomplete="off"/>
            </div>
            <div class="login-password">
                <img src="../../../assets/register/lock.png" alt="">
                <!-- <input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
          autocomplete="off"
        > -->
                <el-input v-model="form.password" style="border:none" border="none" type="password" placeholder="请输入密码" autocomplete="off" auto-complete="new-password" />
            </div>
        </div>
        <!-- <div class="login-text">
            <span @click="forgetPswEvent">忘记密码</span>
            <p @click="registerEvent">没有账号？<span>立即注册</span></p>
        </div> -->
        <el-button
            type="primary"
            class="login-btn"
            :disabled="!(form.userName && form.password)"
            @click="handleLogin">登录</el-button>
    </el-dialog>
</template>
<script>
    import { mapState } from 'vuex'
    import { loginRPA } from '@/api/user'
    export default {
        data() {
            return {
                // dialogVisible: true,
                form: {
                    userName: '',
                    password: ''
                }
            }
        },
        computed: {
            ...mapState(['user'])
        },
        methods: {
            handleLogin() {
                loginRPA(this.form).then(res => {
                    if (res) {
                        localStorage.setItem('userName', res.realname)
                        localStorage.setItem('userId', res.bid)
                        localStorage.setItem('password', res.password)
                        this.user.dialogVisible = false
                        this.$store.commit('user/SET_NAME', res.realname)
                    }
                })
            },
            forgetPswEvent() {
                this.$router.push('/forgetPsw')
            },
            registerEvent() {
                this.$router.push({
                    path: '/register'
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
.login-logo {
  display: block;
  margin: 0 auto;
}
.login-main {
  width: 370px;
  margin: 0 auto;
  .login-user {
    margin: 53px auto 0;
  }
  .login-password {
    margin: 25px auto 0;
  }
  .login-user,
  .login-password {
    height: 46px;
    width: 370px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    display: flex;
    align-items: center;
    color: #98a3b7;
    border: 1px solid #98a3b7;
    img {
      margin-left: 9px;
      width: 25px;
      height: 24px;
    }
    input {
      margin-left: 6px;
      flex: 1;
      background: none;
      border: none;
      -webkit-text-fill-color: #98a3b7;
      font-size: 14px;
    }
    // input:focus{
    //   &{
    //     border-color:#4C7EE9 !important;
    //     border: 2px solid red;
    //     background: red;
    //   }
    // }
  }
  /deep/ .el-input__inner{
    border: none;
    -webkit-text-fill-color: #98a3b7;
  }
}
.login-text {
  width: 370px;
  margin: 27px auto 0;
  display: flex;
  justify-content: space-between;
  P {
    cursor: pointer;
  }
  span {
    cursor: pointer;
    color: #4c7ee9;
  }
}
.login-btn {
  display: block;
  margin: 53px auto 0;
  width: 370px;
  height: 46px;
  font-size: 16px;
}
.login-user:focus-within,
.login-password:focus-within {
  border-color: #4c7ee9;
}
.logo {
      margin: 0 auto;
      width: 175px;
      // height: 60px;
      // line-height: 60px;
      // display: flex;
      // align-items: center;
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
        // line-height: 50px;
        font-size: 14px;
        font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
        vertical-align: middle;
    }
</style>
