<!--forgetPsw.vue-->
<template>
    <div class="forget-psw-container">
        <HeadLogin :load="false" />
        <div class="register-main">
            <h1>找回密码</h1>
            <p>这里提供大量已经设计好的适应特定场景的流程及流程模板，下载即用</p>
        </div>
        <div class="public-container center">
            <el-form ref="form" style="width:420px" size="medium" class="forget-form" :model="form" :rules="rules" label-width="  ">
                <el-form-item prop="phone">
                    <el-input
                        v-model.number.trim="form.phone"
                        maxlength="11"
                        placeholder="输入注册手机号"
                        @change="phoneChange"/>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input ref="code" v-model.trim="form.code" style="width: 68%" maxlength="6" placeholder="6位短信验证码" />
                    <el-button v-if="isSendCode" style="width: 30%" type="success" class="Verification" :disabled="sendCodeDisabled" @click="sendCodeEvent">
                        发送验证码
                    </el-button>
                    <el-button v-if="!isSendCode" style="width: 30%" :class="[isActive ? activeClass : disClass]" :disabled="repeatDisabled">
                        重发{{ seconds }}秒
                    </el-button>
                    <div v-show="isPopup" class="popup container">
                        <div id="captcha" />
                        <div id="msg" />
                    </div>
                </el-form-item>
                <el-form-item prop="password">
                    <!-- @input="passInp" -->
                    <el-input v-model.trim="form.password" type="text"  show-password autocomplete="off" placeholder="新密码" />
                </el-form-item>
                <el-form-item prop="password2">
                    <el-input v-model.trim="form.password2" type="password" show-password autocomplete="off" placeholder="确认新密码" />
                </el-form-item>

                <el-form-item>
                    <el-button style="width: 100%" class="modify-btn" type="success" :disabled="!(form.password&&form.password2&&form.code&&form.phone)" @click="submitForm('form')">修改</el-button>
                </el-form-item>
            </el-form>
        </div>
        <p class="footer">copyright@2019 有限元 京ICP备16065273号</p>
    </div>
</template>

<script>
    import HeadLogin from '@/views/comment/headlogin'
    import '../../styles/jigsaw.scss'
    import jigsaw from '@/utils/jigsaw'
    import { sendShortMsgCode, sendPhoneverification, setPassword } from '@/api/login'

    export default {
        // name: 'forgetPsw',
        components: {
            HeadLogin
        },
        data() {
            var checkPhone = (rule, value, callback) => {
                var reg = /^1[3456789]\d{9}$/
                if (value === '') {
                    this.isActive = false
                    this.sendCodeDisabled = true
                    callback(new Error('请输入手机号码'))
                } else if (!reg.test(value)) {
                    this.isActive = false
                    this.sendCodeDisabled = true
                    return callback(new Error('手机号不合规'))
                } else {
                    // 秒数在0到60这个区间的时候，状态是禁止的状态
                    if (this.seconds > 0 && this.seconds < 60) {
                        this.isActive = false
                        this.sendCodeDisabled = true
                    } else {
                        this.isActive = true
                        this.sendCodeDisabled = false
                    }
                    callback()
                }
            }
            var validatePass = (rule, value, callback) => {
                var pwdRegex = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,16}')
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else if (!pwdRegex.test(value)) {
                    callback('密码中必须包含大小写字母、数字,并且8-16个字符')
                } else {
                    if (this.form.password2 !== '') {
                        this.$refs.form.validateField('password2')
                    }
                    callback()
                }
            }
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            }
            var checkCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'))
                } else {
                    callback()
                }
            }
            return {
                form: {
                    phone: '',
                    password: '',
                    password2: '',
                    code: ''
                },
                pass: '',
                isActive: false,
                activeClass: 'active',
                disClass: 'disabled',
                repeatDisabled: true,
                sendCodeDisabled: true,
                isSendCode: true,
                seconds: 60,
                timers: null,
                // 是否展示短信拖拽的画布
                isPopup: false,
                rules: {
                    phone: [
                        { validator: checkPhone, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    password2: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    code: [
                        { validator: checkCode, trigger: 'blur' }
                    ]
                }
            }
        },
        destroyed() {
            clearInterval(this.timers)
        },
        methods: {
            passInp(val) {
                // var val = this.$refs.pass.value; //取到输入框的值
                if (val.length > this.pass.length) {
                    // 输入值
                    this.pass += val.charAt(val.length - 1);
                } else {
                    // 回删值
                    this.pass = this.pass.substr(0, val.length);
                }
                // 将输入框除最后一位的字符替换成*
                this.form.password = val.substr(0, val.length - 1).replace(/./g, "*") + val.charAt(val.length - 1);
                /* 取当前输入框长度，用于判断是否正在输入
                停止输入时，一秒后将最后一个字符变成*号 */
                var len = this.form.password.length;
                setTimeout(() => {
                    /*这时的this指向在延迟器触发时输入框的状态，
                    而不是延迟器创建时的状态*/
                    if (this.form.password.length == len) {
                        //一秒后输入框的值长度不变，将所有字符替换为*
                        this.form.password = this.form.password.replace(/./g, "*");
                    }
                }, 10);
            },
            // 初始化验证码画布
            initData() {
                const _this = this
                jigsaw.init({
                    el: document.getElementById('captcha'),
                    onSuccess: function() {
                        // document.getElementById('msg').innerHTML = '登录成功！'
                        setTimeout(() => {
                            _this.isPopup = false
                        }, 500)
                        // 成功之后
                        setTimeout(() => {
                            var elem = document.getElementById('captcha')
                            // 成功之后让里面的内容为'
                            elem.innerHTML = ''
                        }, 500)

                        // 发送验证码成功之后seconds为60
                        _this.seconds = 60
                        // 显示和隐藏发送验证码
                        _this.isSendCode = false
                        // 1分钟倒计时
                        _this.timers = setInterval(() => {
                            _this.seconds -= 1
                            if (_this.seconds <= 0) {
                                clearInterval(_this.timers)
                                _this.repeatDisabled = true
                                _this.isActive = true
                                _this.isSendCode = true
                                _this.seconds = 0
                            }
                        }, 1000)
                        // 成功之后调用短信接口
                        // 发送短信，调用接口
                        // let data = {
                        //   phone: _this.form.phone,
                        // }
                        const fd = new FormData()
                        fd.append('phone', _this.form.phone)
                        sendShortMsgCode(fd).then(res => {
                            console.log('在这里调用接口', res)
                        })
                    },
                    onFail: this.cleanMsg,
                    onRefresh: this.cleanMsg
                }).init()
            },
            // 发送验证码
            sendCodeEvent() {
                // this.initData()
                // 验证码为false
                // 验证码置灰
                this.isActive = false
                this.sendCodeDisabled = true
                // 是否弹出框
                // this.isPopup = true
                this.fasong()
            },
            fasong() {
                // const _this = this
                sendPhoneverification({ phone: this.form.phone }).then(res => {
                    if (res) {
                        this.isSendCode = false
                        this.seconds = 60
                        this.timers = setInterval(() => {
                            this.seconds = this.seconds - 1
                            if (this.seconds === 0) {
                                clearInterval(this.timers)
                                this.isSendCode = true
                                this.sendCodeDisabled = false
                            }
                        }, 1000)
                    }
                })
            },
            // 修改
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.modify()
                    } else {
                        return false
                    }
                })
            },
            // 修改密码的事件
            modify() {
                const data = {
                    phone: this.form.phone,
                    password: this.form.password,
                    confirmPassword: this.form.password2,
                    identifyCode: this.form.code
                }
                setPassword(data).then(() => {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                    this.$router.push('/login')
                })
                // forgetPasswordMsodify(data).then(res => {
                //   this.$message({
                //     message: res,
                //     type: 'success'
                //   })
                //   this.$router.push('/login')
                // })
            },
            // 手机号码失去焦点的时候
            phoneChange(val) {
                console.log(val)
                // if(val.length === 11) {
                //   this.isActive = true
                //   this.sendCodeDisabled = false
                // }else {
                //   //小于11位的时候，禁止点击和置灰
                //   this.isActive = false
                //   this.sendCodeDisabled = true
                // }
            }
        }
    }
</script>

<style lang="scss">
.forget-psw-container {
  width: 100%;
  height: 100%;
  position: fixed;
  .register-main{
    position: absolute;
    top: 0;
    height:340px;
    width:100%;
    background: url('../../assets/register/Retrievepassword-bg.png');
    background-repeat: no-repeat;
    // background-size: 100%,100%;
    text-align: center;
    // overflow: auto;
    // margin-top: -60px;
    h1{
      // margin: 120px 0 10px 0;
      padding: 120px 0 15px 0;
      margin: 0 auto;
      font-size: 36px;
      color: #FFFFFF;
    }
    p{
      font-size: 16px;
      color: #F3F5F7;
    }
  }
  .public-container{
    position: fixed;
    top: 255px;
    left: 50%;
    transform: translateX(-50%);
    width: 870px;
    height: 500px;
    background: #fff;
    box-shadow: 0 3px 10px 1px rgba(152,163,183,0.45);
    .el-input {
      margin-bottom: 3px;
      height: 40px;
      .el-input__inner {
        height: 46px;
      }
    }
    .Verification{
      width: 142px;
      height: 46px;
      color: #fff;
      // background: #16C570;
    }
    .is-disabled,.is-disabled:hover{
      background: #98A3B7;
      border-color: #98A3B7;
    }
    .modify-btn{
      width: 420px;
      height: 42px;
    }
  }
  .footer{
    margin-top: 835px;
    text-align: center;
    font-size: 14px;
    color: #293340;;
  }
}
</style>
