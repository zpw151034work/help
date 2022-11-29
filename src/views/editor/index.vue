<template>
    <div>
      <div class="header">
        <div class="lf">
          <div class="tit">
            文章标题:
          </div>
          <div class="input">
            <el-input placeholder="请输入内容" v-model="textTitle" clearable size="mini">
            </el-input>
          </div>
        </div>
        <div class="rg">
          <el-switch v-model="value" active-color="#409eff" inactive-color="#409eff" active-text="富文本"
            inactive-text="markdown">
          </el-switch>
          <el-button size="mini" @click="publish">发布</el-button>
        </div>
      </div>
      <div id="markdownContent" class="markdownContent" v-show="value == false"></div>
      <QuillEditor class="markdownContent" v-show="value == true">></QuillEditor>
      <el-dialog title="发布" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="选择分类:" prop="name">
              <el-checkbox-group v-model="ruleForm.checkboxGroup" size="mini">
                <el-checkbox-button v-for="city in cities" :label="city" :key="city" >{{city}}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="标签:" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域" style="width: 100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="原创:" prop="delivery">
              <el-switch v-model="ruleForm.delivery" active-text="是"
                 inactive-text="否"></el-switch>
            </el-form-item>
            <el-form-item label="原文标题:" prop="name" v-if="ruleForm.delivery">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="原文作者:" prop="name" v-if="ruleForm.delivery">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="原文地址:" prop="name" v-if="ruleForm.delivery">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item>
              <!-- <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button> -->
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </template>
  <script>
  import QuillEditor from "./QuillEditor.vue";
  import Vditor from "vditor";
  import "vditor/dist/index.css";
  // import  activityInfo from "./index.md"
  export default {
    components: {
      QuillEditor
    },
    data() {
      return {
        contentEditor: "",
        textTitle: "",
        value: true,
        dialogVisible: true,
        ruleForm: {
            name: '',
            region: '',
            delivery:false,
            checkboxGroup:['上海'],
          },
          
          cities:['全部', '前端', '后端', '产品', '测试', '设计','运维'],
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            region: [
              { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
            date1: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date2: [
              { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            type: [
              { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            resource: [
              { required: true, message: '请选择活动资源', trigger: 'change' }
            ],
            desc: [
              { required: true, message: '请填写活动形式', trigger: 'blur' }
            ]
          }
      };
    },
    mounted() {
      this.vditorFun()
      this.renderMarkdown(activityInfo)
    },
    methods: {
      //编辑器
      vditorFun() {
        let self = this
        this.contentEditor = new Vditor("markdownContent", {
          height: 600,
          width: 1200,
          placeholder: '开始编辑...',
          // toolbar: [
          //   "emoji",
          //   "headings",
          //   "bold",
          //   "italic",
          //   "strike",
          //   "link",
          //   "|",
          //   "list",
          //   "ordered-list",
          //    "check",
          //   "outdent",
          //   "indent",
          //   "|",
          //   "quote",
          //   "line",
          //   "code",
          //   "inline-code",
          //   "insert-before",
          //   "insert-after",
          //   "|",
          //    "upload",
          //   { //自定义上传
          //     hotkey: "",
          //     name: "upload",
          //     tipPosition: "s",
          //     tip: "上传图片",
          //     className: "right",
          //   },
          //   "record",
          //   "table",
          //   "|",
          //   "undo",
          //   "redo",
          //   "|",
          //   "fullscreen",
          //   "edit-mode",
          //   {
          //     name: "more",
          //     toolbar: [
          //       "both",
          //        "code-theme",
          //       "content-theme",
          //       "export",
          //       "outline",
          //       "preview",
          //        "devtools",
          //        "info",
          //       "help",
          //     ],
          //   }
          //   ,"|",
          //   {
          //   hotkey: "⌘-S",
          //   name: "save",
          //   tipPosition: "s",
          //   tip: "保存",
          //   className: "right",
          //   icon: `<img style="height: 16px" src='https://img.58cdn.com.cn/escstatic/docs/imgUpload/idocs/save.svg'/>`,
          //   click() {
          //   that.saveDoc();
          //   }
          //   },
          // ],
          toolbarConfig: {
            pin: true
          },
          counter: {
            enable: true,
            type: '字数统计',
          },
          //默认开启了大纲
          outline: {
            enable: false
          },
          cache: {
            enable: true
          },
          //编辑器有焦点和失去焦点可以判断是否有内容，此处自己封装检查校验即可
          blur() {
            self.vaditEditorContent()
          },
          focus() {
            self.vaditEditorContent()
          },
          //因我的需求是不需要表情符号，所以把编辑器中的表情符号都删除
          // input(val) {
          //   let pattern = new RegExp('[^\\u0020-\\u007E\\u00A0-\\u00BE\\u2E80-\\uA4CF\\uF900-\\uFAFF\\uFE30-\\uFE4F\\uFF00-\\uFFEF\\u0080-\\u009F\\u2000-\\u201f\r\n]');
          //   if (val != "" && val != null) {
          //     //去除表情
          //     let rs = "";
          //     if (pattern.test(val)) {
          //       for (let i = 0; i < val.length; i++) {
          //         rs = rs + val.substr(i, 1).replace(pattern, '');
          //       }
          //     } else {
          //       rs = val
          //     }
          //     //替换防盗链图片，有两种方法，第一种是替换页面的图片路径，替换页面的需要在详情回显的时候也需要进行处理，方法和替换页面的方法一样；第二是直接替换md格式数据中的地址
          //     //第一种：
          //     let reg = /(http|https):\/\/([\w.]+\/?)\S*/gi;
          //     let valueMatch = rs.match(reg);
          //     let replaceUrl = self.gb.mdImgPath('')
          //     self.contentEditor.setValue(rs)
          //     setTimeout(() => {
          //       let imgLinkPar = $('.vditor-ir').find('.vditor-reset').children('p')
          //       let childTag = imgLinkPar.find('span.vditor-ir__node')
          //       childTag.each(function () {
          //         let imgLinkTag = $(this).find('img').attr('src') + ')'
          //         for (let k = 0; k < valueMatch.length; k++) {
          //           if (imgLinkTag == valueMatch[k]) {
          //             $(this).find('img').attr('src', replaceUrl)
          //           }
          //         }
          //       })
          //     }, 300);
          //     //第二种：
          //     setTimeout(() => {
          //       //替换防盗链图片
          //       let reg = /(http|https):\/\/([\w.]+\/?)\S*/gi;
          //       if (reg.test(rs)) {
          //         let valueMatch = rs.match(reg);
          //         // console.log(valueMatch)
          //         let replaceUrl = self.gb.mdImgPath('') + ')'
          //         let linkOutUrl = rs
          //         let urlStr
          //         for (let k = 0; k < valueMatch.length; k++) {
          //           let ishttps = 'https:' == valueMatch[k] ? true : false;
          //           if (ishttps) {
          //             urlStr = valueMatch[k].split("https://");
          //           } else {
          //             urlStr = valueMatch[k].split("http://");
          //           }
          //           // console.log(urlStr)
          //           const index = valueMatch[k].indexOf("/") + 2;
          //           let endUrl = valueMatch[k].substring(index)
          //           let threeSplit = endUrl.split('/')
          //           let getThree = threeSplit.slice(0, threeSplit.length - 3).join('/')
          //           // console.log(getThree)
          //           if (getThree == 'mmbiz.qpic.cn') {
          //             linkOutUrl = linkOutUrl.replace(valueMatch[k], replaceUrl)
          //           }
          //         }
          //         self.contentEditor.setValue(linkOutUrl)
          //       }
          //     }, 2000);
          //   }
          // },
          //编辑页面使用，发布页面不需要
          // after: () => {
          //   self.contentEditor.setValue(self.activityForm.activity_content)
          // },
          //这里写上传
          // upload: {
          //   accept: 'image/jpg, image/jpeg, image/png',//规定上传的图片格式
          //   url: this.gb.reqPath('/v1/Activity/upload'),//请求的接口
          //   multiple: false,
          //   fieldName: 'file',
          //   max: 2 * 1024 * 1024,//上传图片的大小
          //   extraData: { 'access_token': this.token }, //为 FormData 添加额外的参数
          //   linkToImgUrl: this.gb.reqPath('/v1/Activity/upload'),
          //   filename(name) {
          //     return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, "")
          //       .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, "")
          //       .replace("/\\s/g", "");
          //   },
          //   validate(msg) {
          //     console.log(msg + "格式")
          //   },
          //   //粘贴图片回显处理，如果有图片加了防盗链，则让后台代理替换成自己的图片
          //   linkToImgFormat(files) {
          //     let code = 0
          //     let msg = ''
          //     let data = JSON.parse(files)
          //     // let linkImgName = data.result.path
          //     // //上传图片请求状态
          //     if (data.ret_code == 200) {
          //       // let lastTipNum = linkImgName.substr(linkImgName.lastIndexOf('/', linkImgName.lastIndexOf('/') - 1) + 1);
          //       // let index = lastTipNum.lastIndexOf("\/");
          //       // let imgUrl = decodeURI(lastTipNum.substring(index + 1, lastTipNum.length));
          //       let responseData = self.gb.imgOutLinkPath(data.result.path)
          //       let succUrl = {}
          //       let originalURL = 'originalURL'
          //       let url = 'url'
          //       succUrl[originalURL] = data.result.originalURL
          //       succUrl[url] = responseData
          //       let end = JSON.stringify({
          //         msg,
          //         code,
          //         data: succUrl
          //       })
          //       return end
          //     } else {
          //       self.$message({
          //         message: '图片上传失败！',
          //         type: 'error'
          //       })
          //     }
          //   },
          //   //上传图片回显处理
          //   format(files, responseText) {
          //     // let imageResult = JSON.parse(responseText)
          //     let code = JSON.parse(responseText)
          //     let msg = JSON.parse(responseText)
          //     let data = JSON.parse(responseText)
          //     let filName = data.result.cover_files
          //     //上传图片请求状态
          //     if (data.ret_code == 200) {
          //       let lastTipNum = filName.substr(filName.lastIndexOf('/', filName.lastIndexOf('/') - 1) + 1);
          //       let index = lastTipNum.lastIndexOf("\/");
          //       self.imgNameStr = decodeURI(lastTipNum.substring(index + 1, lastTipNum.length));
          //       let responseData = self.gb.imgPath(data.result.cover_files)
          //       let succ = {}
          //       succ[self.imgNameStr] = responseData
          //       //图片回显
          //       return JSON.stringify({
          //         msg,
          //         code,
          //         data: {
          //           errFiles: [],
          //           succMap: succ
          //           // succMap: {
          //           // 'default.png': `${responseData}`
          //           // }
          //         }
          //       })
          //     } else {
          //       self.$message({
          //         message: '图片上传失败！',
          //         type: 'error'
          //       })
          //     }
          //   },
          //   error(msg) {
          //     console.log(msg + "上传失败了")
          //   },
          // }
        })
      },
  
      renderMarkdown(md) {
        Vditor.preview(document.getElementById("preview"), md, {
          hljs: { style: "github" },
        });
      },
      publish() {
         this.dialogVisible = true
         var axios = require('axios');
            var config = {
            method: 'get',
            url: 'http://127.0.0.1:4523/m1/2004478-0-default/api/getData',
            headers: { 
                'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
             }
            };
            axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
            console.log(error);
            });
      }
    }
  };
  </script>
  <style lang="scss" scoped>
  .markdownContent {
    margin: 0 auto;
  }
  
  .header {
    margin: 0 auto;
    width:1400px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    height: 50px;
  
    .lf {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
  
      .tit {
        font-weight: bold;
        color: #333;
        margin-right: 10px;
        font-size: 14px;
      }
  
      .input {
        font-size: 14px;
        color: #333;
      }
    }
  }
  
  ::v-deep .el-switch__label * {
    line-height: 1;
    font-size: 12px;
    display: inline-block;
  }
  
  ::v-deep .el-switch__label {
    position: absolute;
    display: none;
    color: #fff !important;
    font-size: 12px !important;
  }
  
  ::v-deep .el-switch__label--right {
    z-index: 1;
    right: 22px;
  }
  
  ::v-deep .el-switch__label--left {
    z-index: 1;
    left: 20px;
  }
  
  ::v-deep .el-switch__label.is-active {
    display: block;
  }
  
  ::v-deep .rg .el-switch .el-switch__core,
  .el-switch .el-switch__label {
    width: 80px !important;
  }
  
  ::v-deep .input .el-input__wrapper {
    border: none !important;
    box-shadow: none !important;
    padding: 0px; //前边边距去掉
  }
  
  ::v-deep .input .el-input {
    border: none !important;
    box-shadow: none !important;
    padding: 0px;
    outline: none;
  }
  
  ::v-deep .input input {
    outline: none;
    border: none !important;
    box-shadow: none !important;
    padding: 0px; //前边边距去掉
  }
  
  ::v-deep .input .el-input__inner {
    outline: none;
    border: none !important;
    box-shadow: none !important;
    padding: 0px; //前边边距去掉
  }
  ::v-deep .el-checkbox-button,::v-deep.el-checkbox-button--small{
    border-radius: 0px !important;
    margin: 0 10px;
    border: 0px  !important;
  }
  ::v-deep .el-checkbox-button__inner{
    border-radius: 4px !important;
    border: 1px solid #eee !important;
  
  }
  </style>
  