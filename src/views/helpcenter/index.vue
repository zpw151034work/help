<template>
    <div style="min-height:calc(100vh - 240px)">
        <div class="skills-top">
            <div class="skills-content">
                <h1>帮助中心</h1>
                <p>提供大量已经设计好的适应特定场景的流程及流程模板，下载即用</p>
                <div style="margin-top: 15px;">
                    <el-input v-model="input3" placeholder="搜索帮助内容" class="input-with-select" @input="handleName" />
                </div>
            </div>
        </div>
        <Card title="帮助文档">
            <!-- <p slot="left">查看更多</p> -->
            <div class="file-list">
                <div v-for="(item, index) in fileList" :key="index" class="file-item" @click="toDetail(item)">
                    <div class="file-title"><img src="../../assets/home/help.png" alt="">
                        <el-tooltip  :content="item.name" placement="top" effect="light">
                            <h5>{{ item.name }}</h5>
                        </el-tooltip>
                    </div>
                    <!-- <span>{{ item.content }}</span> -->
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
    import Card from './components/card.vue'
    import { debounce } from '@/utils/debounce'
    import { getDocMenuList } from '@/api/home/index'
    export default {
        components: {
            Card
        },
        data() {
            return {
                input3: '',
                fileList: []
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            toDetail(t) {
                this.$router.push({ path: '/helpcenterDetail', query: { bid: t.bid, classId: '' }})
            },
            handleName: debounce(function(val) {
                this.getList(val)
            }),
            getList(name = '') {
                getDocMenuList({ name }).then(res => {
                    this.fileList = res
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
.skills-top{
  width: 100%;
  height: 320px;
  background: url('../../assets/skills/bg.png'),100%,100%,no-repeat;
  overflow: auto;
  .skills-content{
    margin: 110px 0 0 18.8%;
    width: 760px;
    h1{
      font-size: 36px;
      color: #FFFFFF;
    }
    p{
      margin-top: 20px;
      font-size: 16px;
      color: #D7E4FF;
    }
    /deep/ .el-input{
      height: 44px;
      input{
        height: 44px;
      }
      input::-webkit-input-placeholder{
        color:#98A3B7;;
      }
    }
  /deep/ .el-select .el-input {
    width: 130px;
    background: #fff;
  }
  /deep/ .el-input__inner:focus{
     border-color: #fff;
  }
  /deep/ .input-with-select .el-input-group__prepend {
    input::-webkit-input-placeholder{
      color:#293340;
    }
  }
  }
}
.file-list{
  margin: 0 auto;
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  overflow: auto;
  .file-item{
    margin-bottom: 20px;
    margin-left: 10px;
    padding: 29px 0 0 30px;
    width: 370px;
    height: 158px;
    background: #FFFFFF;
    box-shadow: 0 4px 12px 0 #F1F1F1;
    cursor: pointer;
    span{
      font-size: 12px;
      color: #7D8498;
    }
    .file-title{
      height: 20px;
      display: flex;
      align-items: center;
      margin-bottom: 19px;
      img{
        margin-right: 10px;
      }
      h5{
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #0A74F2;
      }
    }
  }
}
</style>
