<template>
    <div class="login-wrapper">
        <img class="login-logo" src="../../assets/home/login-pic.png" alt="">
        <div class="login-form-box">
            <div class="login-user">
                <img src="../../assets/home/login-person-icon-normal.png" alt="">
                <input class="inp" v-model="loginForm.userName" type="text" autocomplete="off" placeholder="请输入用户账号">
                <!-- <el-input id="inp" style="background:#fff" v-model="loginForm.userName" type="text" placeholder="请输入邮箱"></el-input> -->
            </div>
            <div class="login-password">
                <img src="../../assets/home/login-lock-icon-normal.png" alt="">
                <input class="inp" id="mytest" ref="pass" placeholder="请输入密码" type="text" autocomplete="off" @input="passInp" @focus="onFocus">
            </div>
            <div class="login-forget">
                <!-- <p @click="forgetPswEvent">忘记密码</p>
                <p @click="registerEvent">没有账号？立即注册</p> -->
            </div>
            <el-button class="login-btn" :disabled="!(loginForm.userName&&loginForm.password && disabled)" @click="handleLogin">登录</el-button>
        </div>
    </div>
</template>

<script>
  // import { debounce } from '@/utils/debounce'
    import CryptoJS from 'crypto-js'
    import { validUsername } from '@/utils/validate'
    import { loginRPA } from '@/api/user'
    // import { dealUrlFun } from '@/utils/index'
    export default {
        name: 'Login',
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!validUsername(value)) {
                    callback(new Error('用户名不能为空'))
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (!value.length) {
                    callback(new Error('密码不能为空'))
                } else {
                    callback()
                }
            }
            return {
                disabled: true,
                clientHeight: '',
                loginForm: {
                    userName: '',
                    password: ''
                },
                loginRules: {
                    username: [
                        { required: true, trigger: 'blur', validator: validateUsername }
                    ],
                    password: [
                        { required: true, trigger: 'blur', validator: validatePassword }
                    ]
                },
                loading: false,
                passwordType: 'password',
                redirect: undefined
            }
        },

        watch: {
            $route: {
                handler: function(route) {
                    this.redirect = route.query && route.query.redirect
                },
                immediate: true
            },
            clientHeight: function() {
                // this.changeFixed(this.clientHeight)
            }
        },
        mounted() {
            // 获取浏览器可视区域高度
            this.clientHeight = `${document.documentElement.clientHeight}` // document.body.clientWidth;
            window.onresize = function temp() {
                this.clientHeight = `${document.documentElement.clientHeight}`
            }
        },
        destroyed() {

        },
        methods: {
            aesEncrypt(word,keyWord){
                // var keyWord = keyWord || "XwKsGlMcdPMEhR1B"
                console.log(CryptoJS,'CryptoJS')
                var key = CryptoJS.enc.Utf8.parse(keyWord);
                var srcs = CryptoJS.enc.Utf8.parse(word);
                var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
                return encrypted.toString();
            },
            passInp() {
                var val = this.$refs.pass.value; // 取到输入框的值
                console.log(val)
                if (val.length > this.loginForm.password.length) {
                    // 输入值
                    this.loginForm.password += val.charAt(val.length - 1);
                } else {
                    //回删值
                    this.loginForm.password = this.loginForm.password.substr(0, val.length);
                }
                // 将输入框除最后一位的字符替换成*
                this.$refs.pass.value = val.substr(0, val.length - 1).replace(/./g, "*") + val.charAt(val.length - 1)
                /* 取当前输入框长度，用于判断是否正在输入
                停止输入时，一秒后将最后一个字符变成*号 */
                var len = this.$refs.pass.value.length;
                setTimeout(() => {
                    /*这时的this指向在延迟器触发时输入框的状态，
                    而不是延迟器创建时的状态*/
                    if (this.$refs.pass.value.length == len) {
                        //一秒后输入框的值长度不变，将所有字符替换为*
                        this.$refs.pass.value = this.$refs.pass.value.replace(/./g, "*");
                    }
                }, 10);
                // span.innerHTML = str;
            },
            onFocus() {
                // this.$refs.pass.type = 'password'
            },
            changeFixed(clientHeight) {
                console.log(clientHeight)
                // 动态修改样式
                // this.$refs.homePage.style.height = clientHeight + 'px'
            },

            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
                this.$nextTick(() => {
                    this.$refs.password.focus()
                })
            },
            handleLogin() {
                let token = this.aesEncrypt('f3cd5819a43847caa1ce9b289931a178' + '---' + JSON.stringify({ x: 228.625, y: 5.0 }), 'QDTdYvyrrJWvaJDt')
                console.log(token)
                this.disabled = false
                setTimeout(() => {
                    this.disabled = true
                }, 3000)
                loginRPA(this.loginForm).then(res => {
                    if (res.code === 10120) {
                        console.log(222)
                        this.$router.push({
                            path: '/modifyPsw',
                            query: {
                                userName: this.loginForm.userName.trim()
                            }
                        })
                        return
                    }
                    if (res) {
                        localStorage.setItem('userName', res.realname)
                        localStorage.setItem('userId', res.bid)
                        localStorage.setItem('password', res.password)
                        localStorage.setItem('permissionIds', JSON.stringify(res.permissionIds))
                        if (this.$route.query.redirect) {
                            this.$router.push(this.$route.query.redirect)
                            return
                        }
                        this.$router.push('/home')
                    }
                })
            },
            // handleLogin() {
            //   let url = sessionStorage.getItem("url",url);
            //   let dealUrl = dealUrlFun(url);
            //   this.$refs.loginForm.validate(valid => {
            //     if (valid) {
            //       this.loading = true
            //     //  this.$store
            //     //    .dispatch('user/login', this.loginForm)
            //     //    .then((res) => {
            //     //      // this.$router.push({ path: this.redirect || "/" });
            //     //      // this.$router.push("/example")
            //     //      this.$router.push({ path: '/' || '/' })
            //     //      // debugger
            //     //      this.loading = false
            //     //    })
            //     //    .catch(() => {
            //     //      this.loading = false
            //     //    })

            //       //点击登录按钮之后隐藏密码
            //       //this.passwordType = 'password';
            //       login(this.loginForm).then(res=>{
            //         this.loading = false;
            //         //登录有两种情况：
            //         //1.已经有账号，直接登录 （1）admin登录 （2）手机号码登录
            //         //2.注册完之后，自动登录 （手机号码登录）
            //         //sessionStorage.setItem('userName',res.realname);
            //         //修改：localStorage.setItem('userName',res.realname)
            //         localStorage.setItem('userName',res.realname);
            //         //localStorage.setItem('password',res.password);
            //         //admin登录phone为null
            //         //sessionStorage.setItem('phone',res.phone);
            //         //sessionStorage.setItem("enterpriseName",res.enterpriseName);
            //         //修改：sessionStorage为localStorage
            //         localStorage.setItem('phone',res.phone);
            //         localStorage.setItem("enterpriseName",res.enterpriseName);
            //         if(url) {
            //           this.$router.push({
            //             path: dealUrl
            //           });
            //           //离开页面时，清空url
            //           sessionStorage.setItem("url","");
            //         }else {
            //           this.$router.push({ path: '/' || '/' })
            //         }
            //       }).catch(err=>{
            //         this.loading = false;
            //       })
            //     } else {
            //       return false
            //     }
            //   })
            // },
            // 立即注册
            registerEvent() {
                this.$router.push({
                    path: '/register'
                })

                //  let url = window.location.hash;
                //  //如果是url是 #/detail?bid=1006&flag=robot 这种的话需要根据？截取
                //  if(url.indexOf("?") > -1) {
                //    let splitUrl = url.split('?');
                //    let newUrl = splitUrl[0];
                //    let dealNewUrl = url.substring(1);
                //    this.$router.push({
                //      path: '/register',
                //      query: {
                //        flag: dealNewUrl,
                //      }
                //    })
                //  }else {
                //    //如果是 url是 #/或者#/search的话，就直接截取#号后面的
                //    let dealUrl = url.substring(1);
                //    this.$router.push({
                //      path: '/register',
                //      query: {
                //        flag: dealUrl,
                //      }
                //    })
                //  }
            },
            // 忘记密码
            forgetPswEvent() {
                this.$router.push('/forgetPsw')
            }
        }
    }
</script>

<style lang="scss" scoped>
.login-wrapper{
  height: 100%;
  width: 100%;
  background-image: linear-gradient(180deg, #79A4FF 0%, #4C7EE9 100%);
  .login-logo{
    margin: 5% 0 0 21.5%;
  }
  .login-form-box{
    position: absolute;
    width: 524px;
    height: 524px;
    top: 15.7%;
    left: 51.3%;
    background: url('../../assets/home/login-pop1.png');
    background-repeat: no-repeat;   //不重复
    background-size: 100% 100%;     // 满屏
    .login-user{
      margin: 144px auto 0;
    }
    .login-password{
      margin: 25px auto 0;
    }
    .login-user,.login-password{
      height: 46px;
      width: 370px;
      background: rgba(255,255,255,0.20);
      border-radius: 4px;
      display: flex;
      align-items: center;
      img{
        margin-left: 9px;
        width: 25px;
        height: 24px;
      }
      input, .inp{
        height: 100%;
        margin-left: 6px;
        flex: 1;
        background: none;
        border: none;
        -webkit-text-fill-color: #D7E4FF;
        font-size: 14px;
      }
    }
    .login-forget{
      width: 366px;
      margin: 27px auto 0;
      display: flex;
      justify-content: space-between;
      p{
        font-size: 14px;
        color: #D7E4FF;
        cursor: pointer;
      }
    }
    .login-btn{
      margin: 53px auto;
      display: block;
      width: 370px;
      height: 46px;
      background: #D7E4FF;
      color: #4C7EE9;
      font-size: 16px;
    }
  }
}
.inp:-internal-autofill-selected {
    appearance: menulist-button;
    background-image: none !important;
    background-color: -internal-light-dark(rgb(232, 240, 254), rgba(70, 90, 126, 0.4)) !important;
    color: -internal-light-dark(black, white) !important;
}
</style>
