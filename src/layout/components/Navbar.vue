<!--
 * @Author: mingxing.huang
 * @LastEditors: name
 * @LastEditTime: 2022-02-21 10:51:55
 -->
<template>
    <div class="navbar">
        <hamburger :is-active="sidebar.opened"
                   class="hamburger-container"
                   @toggleClick="toggleSideBar" />

        <breadcrumb class="breadcrumb-container" />

        <div class="right-menu">
            <div class="bell toMarket" style="font-size: 12px; padding-right: 0;" @click="toRpa"> 控制台  </div>
            |
            <div class="bell toMarket" style="font-size: 12px; padding-right: 10px;" @click="toRmarket"> 资源市场  </div>
            <div class="bell cursor" @click="bellEvent">
                <!-- <i class="el-icon-bell"></i> -->
            </div>
            <el-dropdown class="avatar-container"
                         trigger="click">
                <div class="avatar-wrapper">
                    <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
                    <div class="user cursor">{{name}}</div>
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown"
                                  class="user-dropdown">
                    <el-dropdown-item>
                        <span style="display: block;"
                              @click="modifyPswEvent">修改密码</span>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <span style="display: block;"
                              @click="logout">退出登录</span>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <span style="display: block;" >版本V{{version}}</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-dialog
            :visible.sync="dialogVisible"
            width="30%">
            <el-form size="medium" class="modify-form" :model="form" :rules="rules" ref="form">
                <h1 class="modify-psw center">修改密码</h1>
                <el-form-item prop="oldpassword">
                    <el-input type="password" show-password v-model="form.oldpassword" autocomplete="off" placeholder="旧密码"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" show-password v-model="form.password" autocomplete="off" placeholder="新密码"></el-input>
                </el-form-item>
                <el-form-item prop="password2">
                    <el-input type="password" show-password v-model="form.password2" autocomplete="off" placeholder="确认新密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100%;" type="primary" @click="submitForm('form')">确认</el-button>
                </el-form-item>
            </el-form>

            <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
            <!--</span>-->

        </el-dialog>
    </div>
</template>
<script>
    import { mapGetters } from "vuex";
    import Breadcrumb from "@/components/Breadcrumb";
    import Hamburger from "@/components/Hamburger";
    import { removeToken } from "@/utils/auth";
    import eventBus from "@/utils/eventBus";
    import { modifyPassword } from '@/api/login';
    import { loginout } from '@/api/index'
    export default {
        name: "NavBar",
        components: {
            Breadcrumb,
            Hamburger
        },
        computed: {
            ...mapGetters(["sidebar", "avatar"]),
        //name() {
        //return sessionStorage.getItem("userName");
        //add 2020-3-24
        //return localStorage.getItem("userName");
        //}
        },
        data() {
            var validatePass = (rule, value, callback) => {
                var pwdRegex = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,16}');
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (!pwdRegex.test(value)) {
                    callback('密码中必须包含大小写字母、数字,并且8-16个字符');
                } else {
                    if (this.form.password2 !== '') {
                        this.$refs.form.validateField('password2');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                version: process.env.VERSION,
                name: localStorage.getItem("userName"),
                dialogVisible: false,
                form: {
                    oldpassword: '',
                    password: '',
                    password2: '',
                },
                rules: {
                    oldpassword: [
                        { required: true, message: '请输入旧密码'},
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    password2: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            toRpa() {
                window.location.href = window.EDITOTPATH
            },
            toRmarket() {
                // console.log(window.RMARKET_URL)
                this.$router.push('/')
                // window.open(, '_blank')
            },
            toggleSideBar() {
                this.$store.dispatch("app/toggleSideBar");
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
                    this.$router.push('/')
                })
            },
            logout() {
                loginout().then(() => {
                    this.$message({
                        type: "success",
                        message: "退出成功"
                    });
                    removeToken();
                    sessionStorage.clear()
                    localStorage.clear()
                    this.$router.push(`/login`);
                })
            },
            //修改密码
            modifyPswEvent() {
                // this.$router.push('/modifyPsw')
                this.dialogVisible = true;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('this.form',this.form);
                        this.confirm();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //调用接口修改密码的接口
            confirm() {
                let data = this.form;
                console.log(data)
                modifyPassword(data).then(() => {
                    //跳转到登录页面
                    this.dialogVisible = false;
                    //退出登录 跳转到登录页面
                    this.logoutEvent();
                    this.logout()
                })
            },
            //警告
            bellEvent() {
                this.$router.push('/warning');
            }
        },
        mounted() {
            //监听登录成功之后的用户名
            eventBus.$on('namerouter',(item) => {
                this.name = item.username;
            })
        }
    };
</script>

<style lang="scss" scoped>
.cursor{
    cursor: pointer;
}
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .modify-form {
        .modify-psw {
            color: #333;
        }
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .bell {
            display: inline-block;
        }
        .toMarket {
            font-size: 12px;
            padding-right: 10px;
            cursor: pointer;
            // color: #4C7EE9;
            font-weight: 600;
        }

        .toMarket:hover {
            color: #1890ff;
        }
        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                //margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 20px;
                    font-size: 12px;
                }
            }
        }

        .version {
            display: inline-block;
            color: #606266;
            font-size: 14px;
            margin-right: 10px;
        }
    }
}
</style>
