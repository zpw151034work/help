<template>
    <!-- <div> -->
    <el-dialog
        :visible.sync="dialogVisible"
        :show-close="true"
        title="提示"
        width="500px">
        <el-result title="获取成功">
            <template slot="icon">
                <img src="../../../assets/home/Check-Circle-Fill.png" alt="">
                <!-- <el-image src="../../../assets/home/Check-Circle-Fill.png"/> -->
                <!-- <el-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-image> -->
            </template>
            <template slot="subTitle">
                <p>您可在以下位置查看：<br>
                    1.技能管理——已获取技能；<br>
                    2.RPA平台——技能列表。</p>
            </template>
            <template slot="extra">
                <el-button type="" size="medium" @click="dialogVisible=false">返回</el-button>
                <el-button type="primary" size="medium" @click="download">下载到本地</el-button>
            </template>
        </el-result>
    </el-dialog>
</template>
<script>
    import { downloadSkill } from '../../../api/home/index'

    export default {
        props: {
            skillVersionId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                form: {
                    phone: '',
                    password: ''
                },
                dialogVisible: false
            }
        },
        watch: {
            // dialogVisible(){
            //   this.dialogVisible1 = this.dialogVisible
            // },
            // dialogVisible1(val,newVal){
            //   // this.$emit('update:dialogVisible',false)
            // }
        },
        methods: {
            download() {
                const { skillVersionId } = this
                downloadSkill({ skillVersionId }).then(res => {
                    window.open(res)
                    // this.$message({
                    //   showClose: true,
                    //   message: '下载成功',
                    //   type: 'success'
                    // })
                })
            },
            setdialogVisible(t) {
                this.dialogVisible = t
            }
        }
    }
</script>
<style lang="scss" scoped>
.login-logo{
  width: 500px;
  height: 340px;
  display: block;
  margin: 0 auto;
}
/deep/.el-dialog__body{
  // padding-bottom: 0px !important;
  // padding-top: 34px;
}
/deep/ .el-dialog__body>div{
  padding-bottom: 0px;
  padding-top: 0;
  svg{
    width: 70px;
    height: 70px;
  }
}
.login-main{
  width: 370px;
  margin: 0 auto;
  .login-user{
      margin: 53px auto 0;
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
      color: #98A3B7;
      border: 1px solid #98A3B7;
      img{
        margin-left: 9px;
        width: 25px;
        height: 24px;
      }
      input{
        margin-left: 6px;
        flex: 1;
        background: none;
        border: none;
        -webkit-text-fill-color: #98A3B7;
        font-size: 14px;
      }
    }
}
.login-text{
  width: 370px;
  margin: 27px auto 0;
  display: flex;
  justify-content: space-between;
  P{
    cursor: pointer;
  }
  span{
    cursor: pointer;
    color: #4C7EE9;
  }
}
.login-btn{
  display: block;
  margin: 53px auto 0;
  width: 370px;
  height: 46px;
  font-size: 16px;
}
.login-user:focus-within,.login-password:focus-within {
    border-color: #4C7EE9;
  }
</style>
