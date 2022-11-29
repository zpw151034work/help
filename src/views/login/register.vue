<template>
    <div class="register-container">
        <HeadLogin :load="false" />
        <div class="register-main">
            <h1>欢迎注册RPA云账号</h1>
            <p>这里提供大量已经设计好的适应特定场景的流程及流程模板，下载即用</p>
        </div>
        <div class="register-form">
            <div style="width:420px;margin:0 auto;overflow: auto">
                <p @click="goLogin">已有账号？<span style="color:#0A74F2">立即登录</span></p>
                <el-input
                    ref="enterpriseName"
                    key="0"
                    v-model.trim="enterpriseName"
                    placeholder="企业名称"
                    autocomplete="off"
                    name="enterpriseName" />
                <el-input
                    ref="username"
                    key="1"
                    v-model.trim="username"
                    placeholder="邮箱"
                    autocomplete="off"
                    name="username"/>
                <el-input
                    ref="pass1"
                    key="2"
                    placeholder="密码"
                    v-model.trim="password"
                    :show-password="pass1"
                    autocomplete="off"
                    type="text"
                    @input="passInp"
                    @focus="onFocus('pass1')" />
                <!-- <div slot="content">两次输入密码需相同</div> -->
                <el-input
                    ref="pass2"
                    v-model.trim="password2"
                    placeholder="确认密码"
                    :show-password="pass2"
                    autocomplete="off"
                    type="text"
                    @input="pass2Inp"
                    @focus="onFocus('pass2')" />

                <el-input
                    ref="phone"
                    v-model.trim="phone"
                    placeholder="手机号码"
                    maxlength="11"
                    autocomplete="off"
                    @change="phoneChange" />
                <el-row class="verify-box">
                    <el-col :span="13" class="forget">
                        <el-input ref="code" v-model="identifyCode" maxlength="6" placeholder="6位短信验证码" @blur="shortCodeBlur" />
                    </el-col>
                    <el-col :span="8" class="once" :offset="2">
                        <el-button v-if="isSendCode" type="primary" class="Verification" :disabled="sendCodeDisabled" style="margin-left:14px" @click="sendCodeEvent">
                            发送验证码
                        </el-button>
                        <!-- :class="[isActive ? activeClass : disClass]" -->
                        <el-button v-if="!isSendCode" class="Verification" :disabled="repeatDisabled" style="margin-left:14px">
                            重发{{ seconds }}秒
                        </el-button>
                    </el-col>

                    <!-- <div v-show="isPopup" class="popup container">
            <div id="captcha"></div>
            <div id="msg"></div>
          </div> -->
                </el-row>
                <el-button class="register-btn" :class="[isClick ? no : yes]" :disabled="regDisabled" @click="handload">注册</el-button>
            </div>
        </div>
        <p class="footer">copyright@2019 有限元 京ICP备16065273号</p>
    </div>
</template>

<script>
    import '../../styles/jigsaw.scss'
    import { loginRPA } from '@/api/user'
    import HeadLogin from '@/views/comment/headlogin'
    import md5 from 'js-md5'
    import jigsaw from '@/utils/jigsaw'
    import { sendShortMsgCode, sendPhoneverification, register } from '@/api/login'
    import ElButton from '../../../node_modules/element-ui/packages/button/src/button'

    export default {
        name: 'Register',
        components: {
            ElButton,
            HeadLogin
        },
        props: {},
        data() {
            return {
                checked: false,
                input: '',
                enterpriseName: '',
                username: '',
                password: '',
                password2: '',
                pass1: false,
                pass2: false,
                phone: '',
                code: '',
                ispassword2: false,
                isenterpriseName: false,
                isphone: false,
                identifyCode: '',
                // imgCode: '../../admin/plat/sys/ressvcmkt/getValidateCode?'
                // imgCode:'../admin/rmarket/market/ressvcmkt/sys/getValidateCode'
                // imgCode:'admin/v1/ressvcmkt/sys/getValidateCode'
                imgCode: 'admin/v1/sys/ressvcmkt/getValidateCode',
                isSendCode: true,
                seconds: 60,
                timers: null,
                repeatDisabled: true,
                sendCodeDisabled: true,
                isPopup: false,
                activeClass: 'active',
                disClass: 'disabled',
                isActive: false,
                // 注册禁止点击
                regDisabled: true,
                isClick: true,
                yes: 'click',
                no: 'noClick',
                pass: '',
                againPass: ''
            }
        },
        watch: {
            identifyCode: function(value) {
                if (value.length === 6) {
                    this.isClick = false
                    this.regDisabled = false
                } else {
                    this.isClick = true
                    this.regDisabled = true
                }
            }
        },
        mounted() {
            const num = Math.ceil(Math.random() * 10000) // 生成一个随机数（防止缓存）
            // this.imgCode = '../../admin/plat/sys/ressvcmkt/getValidateCode?' + num;
            // this.imgCode = '../admin/rmarket/market/ressvcmkt/sys/getValidateCode?' + num;
            // this.imgCode = 'admin/v1/ressvcmkt/sys/getValidateCode?' + num;
            this.imgCode = 'admin/v1/sys/ressvcmkt/getValidateCode?' + num
            // this.initData();
        },
        destroyed() {
            clearInterval(this.timers)
        },
        methods: {
            pass2Inp(val) {
                // var val = this.$refs.pass.value; //取到输入框的值
                if (val.length > this.againPass.length) {
                    //输入值
                    this.againPass += val.charAt(val.length - 1);
                } else {
                    //回删值
                    this.againPass = this.againPass.substr(0, val.length);
                }
                //将输入框除最后一位的字符替换成*
                this.password2 = val.substr(0, val.length - 1).replace(/./g, "*") + val.charAt(val.length - 1);
                /* 取当前输入框长度，用于判断是否正在输入
                停止输入时，一秒后将最后一个字符变成*号 */
                var len = this.password2.length;
                setTimeout(() => {
                    /*这时的this指向在延迟器触发时输入框的状态，
                    而不是延迟器创建时的状态*/
                    if (this.password2.length == len) {
                        //一秒后输入框的值长度不变，将所有字符替换为*
                        this.password2 = this.password2.replace(/./g, "*");
                    }
                }, 10);
                console.log(this.againPass)
            },
            passInp(val) {
                // var val = this.$refs.pass.value; //取到输入框的值
                if (val.length > this.pass.length) {
                    //输入值
                    this.pass += val.charAt(val.length - 1);
                } else {
                    //回删值
                    this.pass = this.pass.substr(0, val.length);
                }
                //将输入框除最后一位的字符替换成*
                this.password = val.substr(0, val.length - 1).replace(/./g, "*") + val.charAt(val.length - 1);
                /* 取当前输入框长度，用于判断是否正在输入
                停止输入时，一秒后将最后一个字符变成*号 */
                var len = this.password.length;
                setTimeout(() => {
                    /*这时的this指向在延迟器触发时输入框的状态，
                    而不是延迟器创建时的状态*/
                    if (this.password.length == len) {
                        //一秒后输入框的值长度不变，将所有字符替换为*
                        this.password = this.password.replace(/./g, "*");
                    }
                }, 10);
            },
            onFocus() {
                // this[name] = true
                // this.$refs[name].showPassword = true
            },
            goLogin() {
                this.$router.push('/login')
            },
            initData() {
                const _this = this
                jigsaw.init({
                    el: document.getElementById('captcha'),
                    onSuccess: function() {
                        // 成功之后就清除定时器
                        // clearInterval(_this.timers);
                        // document.getElementById('msg').innerHTML = '登录成功！'
                        setTimeout(() => {
                            _this.isPopup = false
                        }, 500)
                        // 成功之后
                        setTimeout(() => {
                            var elem = document.getElementById('captcha')
                            // 成功之后让里面的内容为""
                            elem.innerHTML = ''
                        }, 500)

                        // 发送验证码成功之后seconds为60
                        _this.seconds = 60
                        // 隐藏发送验证码
                        _this.isSendCode = false
                        // 1分钟倒计时
                        _this.timers = setInterval(() => {
                            _this.seconds -= 1
                            if (_this.seconds <= 0) {
                                // 每次在定时器结束时清除定时器
                                clearInterval(_this.timers)
                                // 重发
                                _this.repeatDisabled = false
                                _this.seconds = 0
                                // 倒计时结束之后，验证码可以点击
                                _this.sendCodeDisabled = false
                                // 蓝色
                                _this.isActive = true
                                // 显示验证码
                                _this.isSendCode = true
                            }
                        }, 1000)
                        // 成功之后调用短信接口
                        // 发送短信，调用接口
                        const fd = new FormData()
                        fd.append('phone', _this.phone)
                        sendShortMsgCode(fd).then(res => {
                            console.log(res)
                        })
                    },
                    onFail: this.cleanMsg,
                    onRefresh: this.cleanMsg
                }).init()
            },
            // 注册
            handload() {
                const dataCode = {
                    username: this.username,
                    phone: this.phone,
                    password: md5(this.pass),
                    confirmPassword: md5(this.againPass),
                    // code: this.code,
                    identifyCode: this.identifyCode,
                    enterpriseName: this.enterpriseName
                }

                var myreg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                if (!myreg.test(this.username)) {
                    this.$message({
                        showClose: true,
                        message: '请输入正确的邮箱',
                        type: 'warning'
                    })
                    return false
                }

                if (this.$refs.pass1.value) {
                    var pwdRegex = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,16}')
                    if (!pwdRegex.test(this.password)) {
                        // debugger
                        this.$message({
                            showClose: true,
                            message: '密码中必须包含大小写字母、数字,并且8-16个字符',
                            type: 'warning'
                        })
                        return false
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: '设置密码不能为空',
                        type: 'warning'
                    })
                    return false
                }

                if (this.pass !== this.againPass) {
                    this.$message({
                        showClose: true,
                        message: '设置密码不能为空且需要保持一致',
                        type: 'warning'
                    })
                    return false
                }

                const TEL_REGEXP = /^1([39]\d|5[0-35-9]|7[3678])\d{8}$/

                if (this.phone) {
                    if (!TEL_REGEXP.test(this.$refs.phone.value)) {
                        this.$message({
                            showClose: true,
                            message: '手机号不合规',
                            type: 'warning'
                        })
                        return false
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: '手机号不能为空',
                        type: 'warning'
                    })

                    return false
                }
                register(dataCode)
                    .then(() => {
                        this.$message({
                            showClose: true,
                            message: '注册成功',
                            type: 'success'
                        })
                        setTimeout(() => {
                            const loginForm = {
                                userName: this.username,
                                password: this.password
                            }
                            loginRPA(loginForm).then(res => {
                                if (res) {
                                    localStorage.setItem('userName', res.realname)
                                    localStorage.setItem('userId', res.bid)
                                    localStorage.setItem('password', res.password)
                                    this.$router.push('/home')
                                }
                            })
                        }, 3000)
                        // this.$router.push('/loginSuccess');
                        // 从注册的原页面得到路径，然后传参数给注册成功的页面
                        // let flag = this.$route.query && this.$route.query.flag;
                        // this.$router.push({
                        //   name: 'loginSuccess',
                        //   params: {
                        //     username: this.$refs.phone.value,
                        //     password: this.$refs.password2.value
                        //     // flag
                        //   }
                        // })
                    })
                    .catch(() => {
                        const num = Math.ceil(Math.random() * 10000) // 生成一个随机数（防止缓存）
                        // this.imgCode = '../../admin/plat/sys/ressvcmkt/getValidateCode?' + num;
                        // this.imgCode = '../admin/rmarket/market/ressvcmkt/sys/getValidateCode?' + num;
                        // this.imgCode = 'admin/v1/sys/ressvcmkt/getValidateCode?' + num;
                        this.imgCode = 'admin/v1/sys/ressvcmkt/getValidateCode?' + num
                    })
            },
            fasong() {
                // const _this = this
                sendPhoneverification({ phone: this.phone }).then(res => {
                    if (res) {
                        this.isSendCode = false
                        this.seconds = 60
                        this.timers = setInterval(() => {
                            this.seconds = this.seconds - 1
                            if (this.seconds === 0) {
                                clearInterval(this.timers)
                                this.isSendCode = true
                            }
                        }, 1000)
                    }
                })
            },
            changeImgCode() {
                const num = Math.ceil(Math.random() * 10000) // 生成一个随机数（防止缓存）
                this.imgCode = 'admin/v1/sys/ressvcmkt/getValidateCode?' + num
                // this.imgCode = '../admin/rmarket/market/ressvcmkt/sys/getValidateCode?' + num;
            },
            // 发送验证码
            sendCodeEvent() {
                const TEL_REGEXP = /^1[3456789]\d{9}$/
                if (this.phone) {
                    if (!TEL_REGEXP.test(this.$refs.phone.value)) {
                        this.$message({
                            showClose: true,
                            message: '手机号不合规',
                            type: 'warning'
                        })
                        return false
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: '手机号不能为空',
                        type: 'warning'
                    })

                    return false
                }
                // this.initData()
                this.fasong()
                // 验证码置灰
                this.isActive = false
                // 是否弹出框
                this.isPopup = true
            },
            cleanMsg() {
                document.getElementById('msg').innerHTML = ''
            },
            // 暂时注释
            // checkedEvent(value) {
            //   if(value) {
            //     this.isClick = false;
            //     this.regDisabled = false;
            //   }else {
            //     this.isClick = true;
            //     this.regDisabled = true;
            //   }
            // },
            // 输入6位短信验证码之后注册按钮的状态改变
            shortCodeBlur() {
                // if(value.length === 6) {
                //   this.isClick = false;
                //   this.regDisabled = false;
                // }else {
                //   this.isClick = true;
                //   this.regDisabled = true;
                // }
            },
            // 手机号码失去焦点的时候
            phoneChange(val) {
                if (val.length === 11) {
                    if (this.seconds > 0 && this.seconds < 60) {
                        this.isActive = false
                        this.sendCodeDisabled = true
                    } else {
                        this.isActive = true
                        this.sendCodeDisabled = false
                    }
                } else {
                    // 小于11位的时候，禁止点击和置灰
                    this.isActive = false
                    this.sendCodeDisabled = true
                }
            }
        }
    }
  </script>

  <style  lang="scss" >
  .register-container {
    width: 100%;
    // height: 100%;
    background: #eee;
    .el-input__inner {
      height: 40px;
    }
    .register-main{
      // position: absolute;
      top: 0;
      height:340px;
      width:100%;
      background: url('../../assets/register/register-bg.png');
      background-repeat: no-repeat;
      // background-size: 100%,100%;
      background-size: cover;
      text-align: center;
      // overflow: auto;
      // margin-top: -60px;
      h1{
        // margin: 120px 0 10px 0;
        padding: 120px 0 10px 0;
        margin: 0 auto;
        font-size: 36px;
        color: #FFFFFF;
      }
      p{
        font-size: 16px;
        color: #F3F5F7;
      }
    }
    .register-form{
      // position: fixed;
      margin-top:-50px;
      margin: -70px auto 0;
      top: 265px;
      left: 50%;
      // transform: translateX(-50%);
      width: 870px;
      height: 560px;
      background: #fff;
      overflow: hidden;
      box-shadow: 0 3px 10px 1px rgba(152,163,183,0.45);
      p{
        margin: 40px 0 20px 0;
        text-align: right;
        cursor: pointer;
        font-size: 16px;
        color: #293340;
      }
      .register-btn{
        width: 420px;
        height: 42px;
        background: #4C7EE9;
        color: #fff;
      }
      .el-button{
        background: #4C7EE9;
      }
      .el-button:hover{
        background:  #3465CF;
      }
      .is-disabled,.is-disabled:hover{
        background: #98A3B7;
        border-color: #98A3B7;
      }
      .el-input {
        margin-bottom: 29px;
        height: 40px;
        .el-input__inner {
          height: 46px;
        }
      }
      .Verification{
        width: 142px;
        height: 46px;;
      }
    }
    .footer{
      // position: fixed;
      // top: 887px;
      margin: 50px auto 0;
      font-size: 14px;
      color: #293340;
      text-align: center;
    }
    .register {
      //width: 100%;

      //padding-bottom: 100px;

      //background: #eee;
      .register-content {
        width: 1000px;
        //height: 600px;
        background: #fff;
        //margin-top: 20px;
        h3 {
          font-size: 22px;

          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          //margin-top: 37px;
          text-align: center;
          //margin-bottom: 37px;
          margin: 17px 0;
        }
        // .register-form {
        //   width: 350px;
        //   margin: 0px auto;
        //   .el-input {
        //     margin-bottom: 29px;
        //     height: 40px;
        //     .el-input__inner {
        //       height: 40px;
        //     }
        //   }
        //   .verify-box {
        //     .active {
        //       background: rgba(42, 90, 215, 1) !important;
        //     }
        //     .disabled {
        //       background: #ccc !important;
        //     }
        //     position: relative;
        //     .el-button {
        //       width: 120px;
        //       height: 40px;
        //       background: rgba(42, 90, 215, 1);
        //       color: #fff;
        //       text-align: center;
        //       padding: 0px;
        //     }
        //     .popup {
        //       width:100%;
        //       padding: 10px;
        //       box-sizing: border-box;
        //       background: #fff;
        //       border: 1px solid #ccc;
        //       position: absolute;
        //       top: 0;
        //       z-index: 999;
        //       /*display: none;*/
        //     }
        //   }
        //   .agreement {
        //     font-size: 12px;
        //     margin-bottom: 35px;
        //   }
        //   .el-checkbox__label {
        //     color: #737373;
        //   }
        //   .register-button {
        //     .el-button {
        //       width: 100%;
        //       height: 40px;
        //       background: rgba(42, 90, 215, 1);
        //       color: #fff;
        //       text-align: center;
        //       padding: 0px;
        //       border-radius: 4px;
        //     }
        //   }
        //   .click {
        //     background: #2a5ad7 !important;
        //   }
        //   .noClick {
        //     background: #ccc !important;
        //   }
        // }
      }
    }
  }
</style>

