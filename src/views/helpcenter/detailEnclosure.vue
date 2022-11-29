<template>
    <div ref="helpcenterbox" class="helpcenter-box">
        <div class="helpcenter-top">
            <h1>帮助中心</h1>
            <div class="inp">
                <!-- <el-input v-model="input2" style="height:20px" placeholder="搜索">
          <el-button slot="append" class="111" icon="el-icon-search" />
        </el-input> -->
            </div>
        </div>
        <div class="helpcenter-main">
            <div :class="isCollapse?'navcentent-box active-navcentent-box':'navcentent-box'">
                <div ref="navcentent" class="navcentent">
                    <NavMenu :nav-list="navList" :is-collapse.sync="isCollapse" @getDetails="getDetails" />
                </div>
            </div>
            <div class="content">
                <div style="display:flex;margin-bottom:20px">
                    <i class="el-icon-s-fold" style="margin-right:10px" @click="navIsPut" />
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item><a href="#/helpcenter">帮助中心</a></el-breadcrumb-item>
                        <el-breadcrumb-item>在线文档</el-breadcrumb-item>
                        <el-breadcrumb-item>{{ detail.title }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <!-- v-html="detail.content" -->
                <div id="MDcontent" ref="MDcontent" />
            </div>
            <div
                id="outline"
                class="outline">
                <div ref="outlinebox" class="outline-box">
                    <p style="font-size: 18px;color: #333333;width: 196px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin:20px 0 0 10px">{{ detail.title }}</p>
                    <li v-for="(item,index) in HtmlDomlist" :key="index" :class="active == index?'active ' + item.classs: item.classs" @click="tolimk(item)">
                        <a class="new'+tag+' anchor-link" onclick="return false;" href="#" :link="item.link">{{ item.text }}</a>
                    </li>
                </div>
                <!-- <li v-for="(item,index) in HtmlDomlist" :key="index" :class="active == index?'active': ''">
          <a :class="item.classs" onclick="return false;"  :href="item.link" :link="item.link">{{item.text}}</a>
        </li> -->
            </div>
        </div>
    </div>
</template>
<script>
    import NavMenu from '../../components/NavMenu/inxex.vue'
    import Vditor from 'vditor'
    import $ from 'jquery'
    import { debounce } from '@/utils/debounce'
    import { gethelpDocClassList, gethelpDocDetail } from '@/api/home/index'

    export default {
        components: {
            NavMenu
        },
        data() {
            return {
                property: 'value',
                input2: '',
                contentEditor: {},
                ruleForm: {},
                isCollapse: false,
                navList: [],
                HtmlDomlist: [],
                itemsToplist: [],
                active: 0,
                ishow: true,
                detail: {}
            }
        },
        mounted() {
            this.$refs.helpcenterbox.style = 'min-height:' + (document.documentElement.offsetHeight - 240) + 'px'
            // this.$refs.navcentent.style='height:'+ (document.documentElement.offsetHeight-240 - 120) + 'px'
            // this.$refs.outlinebox.style='height:'+ (document.documentElement.offsetHeight-240 - 120) + 'px'
            window.addEventListener('scroll', this.menu)
            this.gethelpDoc()
            this.setNavBoxH()
            const _this = this
            window.onresize = function() {
                if (window.innerWidth < 900) {
                    _this.isCollapse = true
                    _this.ishow = false
                } else {
                    _this.isCollapse = false
                }
            }
        },
        methods: {
            navIsPut() {
                this.isCollapse = !this.isCollapse
            },
            setNavBoxH() {
                // const H = document.documentElement.offsetHeight
                // this.$refs.navcentent.style = `height:${H - 111 - 240 - 20}px;overflow: hidden auto`
                // this.$refs.MDcontent.style = `min-height:${H - 111 -240}px`
            },
            getDetails(t) {
                gethelpDocDetail({ bid: t.bid }).then(res => {
                    this.detail = res
                    this.active = 0
                    const _this = this
                    Vditor.preview(this.$refs.MDcontent, this.detail.mainBody, {
                        after: function() {
                            _this.setmulu()
                        }
                    })
                })
            },
            gethelpDoc() {
                gethelpDocClassList({ bid: this.$route.query.bid }).then(res => {
                    this.navList = res
                    this.getLastItem(res)
                })
            },
            getLastItem(res) {
                for (let i = 0; i < res.length; i++) {
                    if (res[i].children.length) {
                        this.getLastItem(res[i].children)
                    } else if (res[i].docList && res[i].docList.length) {
                        this.getDetails(res[i].docList[0])
                        break
                    }
                }
            },
            tolimk(t) {
                document.documentElement.scrollTop = $(t.link)[0].offsetTop - 100
            },
            menu: debounce(function() {
                const Dtop = document.documentElement.scrollTop + 100
                // console.log(Dtop,'DtopDtop')
                if (Dtop <= 100) {
                    // console.log(this.$refs.navcentent.style.top,'this.$refs.navcentent.style.top')
                    this.active = 0
                    this.$refs.navcentent.style.top = '120px'
                }
                if (Dtop >= 214) {
                    // console.log(this.$refs.navcentent.style.top,'this.$refs.navcentent.style.top')
                    this.$refs.navcentent.style.top = '0'
                }
                // const DsH = document.documentElement.scrollHeight
                // const DoH = document.documentElement.offsetHeight
                // if (DsH - 140 - DoH <= Dtop) {
                //   // this.$refs.navcentent.style.height = 'calc(100vh - 240px)'
                //   // this.ishow = false
                // } else {
                //   // this.ishow = true
                //   // this.$refs.navcentent.style.height = 'calc(100vh - 105px)'
                // }
                this.itemsToplist.forEach((value, index) => {
                    if (Dtop >= value && Dtop <= this.itemsToplist[index + 1]) {
                        this.active = index
                    }
                })
            }, 100),
            setmulu() {
                const that = this
                that.HtmlDomlist = []
                this.itemsToplist = []
                $('#MDcontent').find('h2,h3,h4,h5,h6').each(function(i, item) {
                    var tag = $(item).get(0).localName
                    that.itemsToplist.push(item.offsetTop)
                    $(item).attr('id', 'wow' + i)
                    that.HtmlDomlist.push({
                        link: '#wow' + i,
                        classs: 'new' + tag + ' anchor-link',
                        text: $(this).text()
                    })
                })
                $('.anchor-link').click(function() {
                    $('html,body').animate({ scrollTop: $($(this).attr('link')).offset().top }, 1000)
                })
            },
            handleOpen() {
                console.log(1)
            },
            handleClose() {
                console.log(2)
            }
        }
    }
</script>
<style lang="scss" scoped>
.helpcenter-box{
  // overflow: auto;
  display: flex;
  flex-direction: column;
  height: calc(100vh);
  padding: 1PX;
}

.helpcenter-top{
  // margin-top: 60px;
  width: 100%;
  height: 51px;
  background: #474747;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /deep/ .el-input__inner{
    height: 20px;
  }
  /deep/ .el-input-group__append{
    padding: 0 11px;
  }
  .inp {
    display: block;
    height: 20px;
    margin-right: 14.5%;
  }
  h1{
    font-size: 22px;
    color: #F9F9F9;
    margin: 0  0 0 19%;
  }
}
.helpcenter-main{
  // flex:1;
  margin: 18px 0 20px 0;
  // width: 67.1%;
  min-height: 100%;
  display: flex;
  .content{
    // padding-left: 221px;
    padding: 10px 30px  ;
    // width: 782px;
    flex: 1;
  }
  .outline{
    // padding: 0 10px;
    // position: fixed;
    // top: 200px;
    // right: 14.2%;
    // max-height: 70%;
    overflow: auto;
    margin-left: 33px;
    width: 300px;
    height: calc(100vh - 120px - 240px);
    overflow: auto;
    transition: all 1s linear;
    // background: #ddd;
    .outline-box{
      position: fixed;
      top: 120px;
      width: 280px;
      height: calc(100vh - 120px - 240px);
      overflow: auto;
      margin-left: 10px;
      border-left: 1px solid #e6e6e6;
      padding-right: 20px;
      overflow: hidden;
      // border-left: 1px solid #3d3d3d;
    }
    /deep/ .anchor-link{
      font-size: 12px;
      display: block;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /deep/ .newh0{
       width: 100%;
      margin-left: 0px;
    }
    /deep/ .newh1{
      width: calc(100% - 10px);
      margin-left: 10px;
    }
    /deep/ .newh2{
      width: calc(100% - 20px);
      margin-left: 20px;
    }
    /deep/ .newh3{
      width: calc(100% - 30px);
      margin-left: 30px;
    }
    /deep/ .newh4{
      width: calc(100% - 40px);
      margin-left: 40px;
    }
    /deep/ .newh5{
      width: calc(100% - 50px);
      margin-left: 50px;
    }
    /deep/ .newh6{
      width: calc(100% - 60px);
      margin-left: 60px;
    }
    /deep/ .active{
      color: #0A74F2;
    }
  }
  @media screen and (max-width: 900px){
      .outline{
        width: 0px;
        transition: all 1s linear;
      }
      #MDcontent{
        height:calc(100vh - 200px);
        overflow: auto;
        // ::-webkit-scrollbar {
        //   width:12px;
        // }
        // ::-webkit-scrollbar-track {
        //   -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
        //   border-radius:10px;
        // }
        // ::-webkit-scrollbar-track {
        //   -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
        //   border-radius:10px;
        //   }

      }
      // #MDcontent::-webkit-scrollbar{
      //   width:10px;
      //   height:100%
      // }
      .head{
        background: red;
      }

  }
  /deep/ .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    height: 100%;
  }
  li{
    text-overflow:ellipsis
  }
}
#MDcontent{
  // padding-top: 50px;
  width: 100%;
  /deep/ img{
    width: 100%;
  }
  // /deep/ p{
  //   margin: 10px 0;
  //   line-height: 1.4;
  // }
  /deep/ hr{
    margin: 12px 0;
  }
  // /deep/ h1,/deep/ h2,/deep/ h3,/deep/ h4,/deep/ h5,/deep/ h6{
  //   margin: 20px 0;
  // }
  /deep/ a{
    color: blue;
  }
  /deep/ ul{
      list-style-type:disc;
      list-style-position:inside;
      li {
        list-style-type:disc;
      }
  }
  /deep/ ol{
    list-style-type:decimal;
    list-style-position:inside;
    li {
        list-style-type:decimal;
      }
  }
}
#vditor{
  height: 400px;
  width: 80%;
  border: 1px solid;
}
.navcentent-box{
  height: 100%;
  width: 200px;
  border-right: 1px solid #e6e6e6;
}
.active-navcentent-box{
   width: 40px;
}
.navcentent{
  position: fixed;
  top: 120px;
  height: calc(100vh - 120px - 240px);
  overflow: auto;
  // height: 100%;
  // position: fixed;
  // left: 17%;
}
.navcentent:hover /deep/ .lachu{
  display: block;
}
// .navcentent::-webkit-scrollbar{
//   // width: 20px;
// }
// .navcentent::-webkit-scrollbar-thumb{
//   // width: 20px;
//   width:5px;
//   border-radius:10px;
// }
.navcentent::-webkit-scrollbar {
    width: 4px;
}
.navcentent::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.2);
}
.navcentent::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);

}
</style>
