<template>
    <div class="resetPwd">
        <div class="main">
            <div class="header__title">重置密码</div>
            <el-form :model="form" status-icon size="medium"  ref="form" label-width="0px" class="main__form">
                <el-form-item label="" prop="originPwd" :class="form.originPwd.showTips?'myformitem':''">
                    <el-input @blur="checkPwd('originPwd')" type="password" v-model="form.originPwd.value" :maxlength="16" placeholder="请输入原始密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-alert
                    v-show="form.originPwd.showTips"
                    :title="form.originPwd.tips"
                    :type="form.originPwd.type"
                    :closable="false"
                    show-icon>
                </el-alert>

                <el-form-item label="" prop="newPwd" :class="form.newPwd.showTips?'myformitem':''">
                    <el-input @blur="checkPwd('newPwd')" type="password" v-model="form.newPwd.value" :maxlength="16" placeholder="请输入8-16位新密码，字母、数字组合区分大小写" autocomplete="off"></el-input>
                </el-form-item>
                <el-alert
                    v-show="form.newPwd.showTips"
                    :title="form.newPwd.tips"
                    :type="form.newPwd.type"
                    :closable="false"
                    show-icon>
                </el-alert>

                <el-form-item label="" prop="againPwd" :class="form.againPwd.showTips?'myformitem':''">
                    <el-input  @blur="checkPwd('againPwd')" type="password" v-model="form.againPwd.value" :maxlength="16" placeholder="请再次输入新密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-alert
                    v-show="form.againPwd.showTips"
                    :title="form.againPwd.tips"
                    :type="form.againPwd.type"
                    :closable="false"
                    show-icon>
                </el-alert>
                <el-form-item>
                    <div class="main__button">
                        <el-button @click="cancel()">取消</el-button>
                        <el-button type="primary" @click="submitForm()">修改</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import {
        upperLetterCheck,
        lowerLetterCheck,
        digitCheck,
    } from "@/utils/regPwd"
    import {
        modifyPassword,
        resetPwdNoLogin
    } from '@/api/login';

    export default {
        name: 'resetPwd',
        data(){
            return {
                form: {
                    originPwd: {
                        value: '',
                        type: 'error',//success/warning/info/error
                        showTips: false,
                        tips: '请输入原密码'
                    },
                    newPwd: {
                        value: '',
                        type: 'error',
                        showTips: false,
                        tips: '请至少输入8个字符。请不要使用容易被猜到的密码'
                    },
                    againPwd: {
                        value: '',
                        type: 'error',
                        showTips: false,
                        tips: '再次输入新密码与新设置密码不一致，请重新输入。'
                    },
                }
            }
        },
        methods: {
            cancel(){
                this.$router.go(-1)
            },
            checkPwd(field = 'all'){
                let submitFlag = true
                // 校验原密码
                if (field == 'originPwd' || field == 'all'){
                    if (!this.form.originPwd.value){
                        this.form.originPwd.showTips = true;
                        this.form.originPwd.tips = '请输入原密码';
                        submitFlag = false;
                    } else {
                        this.form.originPwd.showTips = false;
                    }
                }
                // 校验新密码
                if (field == 'newPwd' || field == 'all'){
                    if (!this.checkNewPwd(this.form.newPwd.value,'newPwd')){
                        submitFlag = false;
                    }
                }
                // 校验再次输入的新密码
                if (field == 'againPwd' || field == 'all'){
                    if (!this.checkNewPwd(this.form.againPwd.value,'againPwd')){
                        submitFlag = false;
                    } else {
                        if (this.form.againPwd.value !== this.form.newPwd.value){
                            this.form.againPwd.type = 'warning';
                            this.form.againPwd.tips = '再次输入新密码与新设置密码不一致，请重新输入。';
                            submitFlag = false;
                        }
                        if (this.form.againPwd.value === this.form.originPwd.value){
                            this.form.againPwd.type = 'warning';
                            this.form.againPwd.tips = '新密码与原始密码一致，请重新输入新密码。';
                            submitFlag = false;
                        }
                    }
                }
                return submitFlag
            },
            submitForm(){
                // submit
                if (this.checkPwd()){
                    this.$nextTick(() => {
                        const data = {
                            oldpassword: this.form.originPwd.value,
                            password: this.form.newPwd.value,
                            password2: this.form.againPwd.value,
                        }
                        const { userName = ''} = this.$route.query || {}
                        if (userName){
                            data.userName = userName
                            resetPwdNoLogin(data).then(res => {
                                this.$message.success(res || '操作成功！')
                                sessionStorage.removeItem('expiredTime')
                                setTimeout(() => {
                                    this.$router.push(`/login`);
                                },200)
                            }).catch(err => {
                                console.log(err);
                            })
                        } else {
                            modifyPassword(data).then(res => {
                                this.$message.success(res || '操作成功！')
                                sessionStorage.removeItem('expiredTime')
                                setTimeout(() => {
                                    this.$router.push(`/login`);
                                },200)
                            }).catch(err => {
                                console.log(err);
                            })
                        }
                    })
                }
            },
            checkNewPwd(value,field){
                this.form[field].showTips = true;
                if (!/.{8,16}/.test(value)){
                    this.form[field].type = 'error'
                    this.form[field].tips = '请至少输入8个字符。请不要使用容易被猜到的密码';
                    return false
                }
                if (!digitCheck(value)){
                    this.form[field].type = 'error'
                    this.form[field].tips = '密码必须包含数字';
                    return false
                }
                if (!upperLetterCheck(value)&&!lowerLetterCheck(value)){
                    this.form[field].type = 'error'
                    this.form[field].tips = '密码必须包含字母';
                    return false
                }
                // if (!repeatCheck(value)){
                //     this.form[field].showTips = true;
                //     this.form[field].tips = '密码过于简单';
                //     return false
                // }
                this.form[field].type = 'success';
                this.form[field].tips = '符合密码安全规则，可以使用该密码。';
                return true
            },

        }
    }
    // // import HeadLogin from '@/views/comment/headlogin'
    // import { modifyPassword } from '@/api/login'
    // export default {
    //     // name: 'modifyPsw',
    //     components: {
    //         // HeadLogin
    //     },
    //     data() {
    //         var validatePass = (rule, value, callback) => {
    //             var pwdRegex = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,16}')
    //             if (value === '') {
    //                 callback(new Error('请输入密码'))
    //             } else if (!pwdRegex.test(value)) {
    //                 callback('密码中必须包含大小写字母、数字,并且8-16个字符')
    //             } else {
    //                 if (this.form.password2 !== '') {
    //                     this.$refs.form.validateField('password2')
    //                 }
    //                 callback()
    //             }
    //         }
    //         var validatePass2 = (rule, value, callback) => {
    //             if (value === '') {
    //                 callback(new Error('请再次输入密码'))
    //             } else if (value !== this.form.password) {
    //                 callback(new Error('两次输入密码不一致!'))
    //             } else {
    //                 callback()
    //             }
    //         }
    //         return {
    //             form: {
    //                 oldpassword: '',
    //                 password: '',
    //                 password2: ''
    //             },
    //             rules: {
    //                 oldpassword: [
    //                     { required: true, message: '请输入旧密码' }
    //                 ],
    //                 password: [
    //                     { validator: validatePass, trigger: 'blur' }
    //                 ],
    //                 password2: [
    //                     { validator: validatePass2, trigger: 'blur' }
    //                 ]
    //             }
    //         }
    //     },
    //     methods: {
    //         // 确认
    //         submitForm(formName) {
    //             this.$refs[formName].validate((valid) => {
    //                 if (valid) {
    //                     this.confirm()
    //                 } else {
    //                     console.log('error submit!!')
    //                     return false
    //                 }
    //             })
    //         },
    //         // 调用接口修改密码的接口
    //         confirm() {
    //             const data = this.form
    //             modifyPassword(data).then(() => {
    //                 // 跳转到登录页面
    //                 this.$router.push('/login')
    //             })
    //         }
    //     }
    // }
</script>
<style lang="scss" scoped>
.resetPwd {
    height: 100%;
    background: url("../../assets/home/resetPwd_bg.png") no-repeat;
    background-size: 100% 100%;
    position: relative;

    .main {
        width: 36.2%;
        max-width: 695px;
        min-width: 300px;
        height: 46.3%;
        max-height: 450px;
        min-height: 400px;
        background: #fff;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;

        .header__title {
            width: 144px;
            height: 50px;
            font-family: PingFangSC-Medium;
            font-size: 36px;
            color: #303133;
            text-align: center;
            font-weight: 500;
            margin: 6% auto;
        }

        .main__form {
            width: 74%;
            margin: 0 auto;

            .main__button {
                text-align: center;
                margin-top: 16px;
            }

            .el-button {
                width: 46%;
                max-width: 190px;
            }

            .myformitem {
                margin-bottom: 0;
            }
        }
    }
}
</style>
    
