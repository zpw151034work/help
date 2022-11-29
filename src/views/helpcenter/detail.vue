<template>
    <div ref="helpcenterbox" class="helpcenter-box">
        <div class="helpcenter-top" v-if="csDiel">
            <h1>帮助中心</h1>
            <div class="inp">
                <!-- <el-input v-model="input2" style="height:20px" placeholder="搜索">
          <el-button slot="append" class="111" icon="el-icon-search" />
        </el-input> -->
            </div>
        </div>
        <div class="helpcenter-main" :class="menuStatus?  'isCollapse':'fillScreen'">
            <div :class="isCollapse?'navcentent-box':'navcentent-box'">
                <div ref="navcentent" class="navcentent" :style="!csDiel? 'height: calc(100vh - 20px);':''">
                    <NavMenu :nav-list="navList" :classId='classId' :is-collapse.sync="isCollapse" @getDetails="getDetails" />
                </div>
            </div>
            <div class="content" id="content" ref="xqBox">
                <div v-if="csDiel" class="content_header">
                    <i class="el-icon-s-fold" style="margin-right:10px" @click="navIsPut" />
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item><a href="#/helpcenter">帮助中心</a></el-breadcrumb-item>
                        <el-breadcrumb-item>在线文档</el-breadcrumb-item>
                        <el-breadcrumb-item>{{ detail.title }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div v-else  class="content_header">
                    <i class="el-icon-s-fold" style="margin-right:10px" @click="navIsPut" />
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>帮助中心</el-breadcrumb-item>
                        <el-breadcrumb-item>在线文档</el-breadcrumb-item>
                        <el-breadcrumb-item>{{ detail.title }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <!-- v-html="detail.content" -->
                <div id="MDcontent" v-html="MDcontentDom" ref="MDcontent" />
                <div class="download" @click="onUpload()">
                    <div>
                        <div ></div>
                    </div>
                </div>
            </div>
            <div
                id="outline"
                class="outline">
                <div ref="outlinebox" class="outline-box" :style="csDiel? 'top: 120px':''">
                    <p style="font-size: 22px;color: #333333;width: 196px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin:20px 0 0 10px">产品介绍</p>
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
                ishow: false,
                detail: {},
                csDiel: true,
                classId: 0,
                menuStatus: false,
                MDcontentDom: ''
            }
        },
        computed: {
            xqBox() {
                return this.$refs.xqBox;
            },
            MDcontent() {
                return this.$refs.MDcontent
            }
        },
        beforeCreate() {
            window.removeEventListener('scroll', this.menu)
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
                _this.init()
            }
            this.$nextTick(() => {
                this.xqBox.addEventListener("scroll", this.handleScroll);
                this.MDcontent.addEventListener("scroll", this.handelScroll);
            });
            if (window.GoogleBrowser) {
                this.csDiel = false
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                let doi = window.devicePixelRatio
                let doWidth = window.screen.width
                let width = doWidth * doi * 0.35
                let widths = doWidth * doi * 0.45
                if (window.innerWidth <= parseInt(width) || window.innerWidth <= parseInt(widths)) {
                    this.isCollapse = false
                    this.menuStatus = false
                    $('.helpcenter-main').css('width','100%')
                    $('.navcentent-box').css('width','0')
                    $('.content').css('width','100%')
                    $('.search-box').hide()
                    $('.nav-box').hide()
                    $('.content_header').css('width','100%')
                } else if (window.innerWidth > parseInt(widths)){
                    $('.helpcenter-main').css('width','80%')
                    $('.content').css('width','70%')
                    $('.navcentent-box').css('width','15%')
                    this.isCollapse = false
                    this.menuStatus = true
                    $('.search-box').show()
                    $('.nav-box').show()
                    $('.content_header').css('width','55%')
                }
            },
            handleScroll() {
                // //获取dom滚动距离
                const scrollTop = this.xqBox.scrollTop;
                // //获取可视区高度
                const offsetHeight = this.xqBox.offsetHeight;
                if (scrollTop >=offsetHeight) {
                    $('.download').show()
                } else {
                    $('.download').hide()
                }

            },
            onUpload() {
                this.xqBox.scrollTo(0,0)
                this.MDcontent.scrollTo(0,0)
            },
            handelScroll() {
                // //获取dom滚动距离
                const scrollTop = this.MDcontent.scrollTop;
                // //获取可视区高度
                const offsetHeight = this.MDcontent.offsetHeight;
                if (scrollTop >=offsetHeight) {
                    $('.download').show()
                } else {
                    $('.download').hide()
                }
            },
            navIsPut() {
                let doi = window.devicePixelRatio
                let doWidth = window.screen.width
                let width = doWidth * doi * 0.35
                let widths = doWidth * doi * 0.45
                if (window.innerWidth > parseInt(width)) {
                    this.isCollapse = !this.isCollapse
                    if (this.isCollapse) {
                        $('.navcentent-box').css('width','0%')
                        $('.content').css('width','85%')
                    } else {
                        $('.navcentent-box').css('width','15%')
                        $('.content').css('width','70%')
                    }
                } else if (window.innerWidth <= parseInt(width) || window.innerWidth <= parseInt(widths)){
                    this.menuStatus = !this.menuStatus
                    this.isCollapse = false
                    if (this.menuStatus) {
                        $('.helpcenter-main').css('width','100%')
                        $('.navcentent-box').css('width','40%')
                        $('.content').css('width','60%')
                    } else {
                        $('.helpcenter-main').css('width','100%')
                        $('.navcentent-box').css('width','0%')
                        $('.content').css('width','100%')
                    }

                }

            },
            setNavBoxH() {
                // const H = document.documentElement.offsetHeight
                // this.$refs.navcentent.style = `height:${H - 111 - 240 - 20}px;overflow: hidden auto`
                // this.$refs.MDcontent.style = `min-height:${H - 111 -240}px`
            },
            getDetails(t) {
                gethelpDocDetail({ bid: t.bid }).then(res => {
                    console.log('zhi xing duo ci ', res)
                    this.detail = res
                    this.active = 0
                    if (!this.csDiel ) {
                        this.MDcontentDom = res.content
                        setTimeout(() => {
                            this.setmulu()
                        }, 500);
                    } else {
                        const _this = this
                        Vditor.preview(this.$refs.MDcontent, this.detail.mainBody, {
                            after: function() {
                                _this.setmulu()
                            }
                        })
                    }


                })
            },
            gethelpDoc() {
                gethelpDocClassList({ bid: this.$route.query.bid }).then(res => {
                    console.log('w zhix ', res)
                    this.navList = res
                    if (this.$route.query.classId != '') {
                        this.getDetails({bid: this.$route.query.classId})
                        this.getClassId(res)
                    } else {
                        this.getLastItem(res)
                    }
                })
            },
            getClassId(res) {
                for (let i = 0; i < res.length; i++) {
                    if (res[i].children.length) {
                        this.getClassId(res[i].children)
                    } else if (res[i].docList && res[i].docList.length) {
                        for (let j = 0; j < res[i].docList.length; j++) {
                            if (res[i].docList[j].bid == this.$route.query.classId) {
                                this.classId = res[i].docList[j].id
                                return
                            }
                        }
                    }
                }
            },
            getLastItem(res) {
                console.log('执行多次',res)
                for (let i = 0; i < res.length; i++) {
                    if (res[i].children.length > 0) {
                        this.getLastItem(res[i].children)
                        break
                    } else if (res[i].docList && res[i].docList.length ) {
                        console.log('跳出')
                        this.getDetails(res[i].docList[0])
                        break
                    }
                }
            },
            tolimk(t) {
                console.log(t)
                console.log( $(t.link)[0].offsetTop - 100)
                $('.content')[0].scrollTop = $(t.link)[0].offsetTop - 100
            },
            menu: debounce(function() {
                const Dtop = document.documentElement.scrollTop + 100
                // console.log(Dtop,'DtopDtop')
                if (Dtop <= 100) {
                    // console.log(this.$refs.navcentent.style.top,'this.$refs.navcentent.style.top')
                    this.active = 0
                    // this.$refs.navcentent.style.top = '120px'
                }
                if (Dtop >= 214) {
                    // console.log(this.$refs.navcentent.style.top,'this.$refs.navcentent.style.top')
                    // this.$refs.navcentent.style.top = '0'
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
  background: #FAFAFB;
  overflow: hidden;
}

.helpcenter-top{
  margin-top: 60px;
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
  min-height: 100%;
  display: flex;
  margin: 0 auto;
  width: 80%;
  height: calc(100vh - 111px);
  overflow: hidden;
  position: relative;
  .content{
    position: relative;
    overflow-y: scroll;
    width: 70%;
    background: #fff;
    i{
      cursor: pointer;
    }
    .content_header{
        display:flex;
        margin-bottom:20px;
        width: 100%;
        height: 50px;
        background: #fff;
        padding: 0 35px;
        padding-top: 20px;
        position: fixed;
    }
  }
  .outline{
    // padding: 0 10px;
    // position: fixed;
    // top: 200px;
    // right: 14.2%;
    // max-height: 70%;
    overflow: hidden;
    width: 15%;
    height: 100%;
    transition: all 1s linear;
    // background: #ddd;
    .outline-box{
      width: 100%;
      height: 100%;
      overflow: auto;
      margin-left: 10px;
      padding-right: 20px;
      overflow: hidden;
      background: #FAFAFB;
    }
    /deep/ .anchor-link{
      font-family: PingFang-SC-Medium;
      font-size: 13px;
      display: block;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 5px 0;
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
      margin-left: 20px;
    }
    /deep/ .newh5{
      width: calc(100% - 40px);
      margin-left: 40px;
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
        height:calc(100vh - 100px);
        overflow: hidden;
        overflow-y: scroll;

      }
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
  padding: 50px 30px 120px 30px;
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
  /deep/ h4 {
    font-size: 1.25em;
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
  }
  /deep/ h6 {
    font-size: 1.25em;
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
  }
  /deep/ h5 {
    font-size: 1.25em;
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
  }
  /deep/ p {
    margin-top: 0;
    margin-bottom: 16px;
  }

}
#vditor{
  height: 400px;
  width: 80%;
  border: 1px solid;
}
.navcentent-box{
  height: 100%;
  width: 15%;
}
.active-navcentent-box{
   width: 0;
}
.navcentent{
  top: 120px;
  height: calc(100% - 90px);
  overflow: hidden;
  overflow-y: scroll;
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
.download{
    margin: 0;
    padding: 0;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: "tnum","tnum";
    position: fixed;
    right: 100px;
    bottom: 50px;
    z-index: 10;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: none;
    &>div{
      width: 40px;
      height: 40px;
      overflow: hidden;
      color: #fff;
      text-align: center;
      background-color: rgba(0,0,0,.45);
      border-radius: 20px;
      transition: all .3s cubic-bezier(.645,.045,.355,1);
      &>div{
        width: 14px;
        height: 16px;
        margin: 12px auto;
        background: url('../../../src/assets/icons/download.png') 100%/100% no-repeat;
      }
    }
}

.isCollapse {
  .navcentent-box{
    width: 15% ;
  }
  .content{
    width: 70%;
  }
  .outline{
    display: black;
  }
}
.fillScreen{
  width: 100%;
  .navcentent-box{
    width: 0;
  }
  .content{
    width: 100%;
  }
  .content::-webkit-scrollbar{
    display: none;
  }
  .outline{
    display: none;
  }
}
</style>
