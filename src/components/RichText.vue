<template>
    <div id="vditor" name="description" />
</template>
<script>
    import Vditor from 'vditor'
    //import 'vditor/src/assets/scss/index.scss'
    import marked from 'marked'
    export default {
        data() {
            return {
                contentEditor: "",
            }
        },
        mounted() {},
        methods: {
            vditorInit() {
                this.contentEditor = new Vditor("vditor", {
                    height: "100%",
                    width: "100%",
                    placeholder: "",
                    theme: "classic",
                    counter: {
                        enable: false,
                        type: "markdown",
                    },
                    preview: {
                        delay: 0,
                        hljs: {
                            style: "monokai",
                            lineNumber: true,
                        },
                    },
                    tab: "\t",
                    typewriterMode: true,
                    toolbarConfig: {
                        pin: false,
                    },
                    cache: {
                        enable: false,
                    },
                    outline: {
                        enable: true,
                        position: "left",
                    },
                    hint: {
                        emojiPath:
                            "https://cdn.jsdelivr.net/npm/vditor@1.8.3/dist/images/emoji",
                    },
                    mode: "wysiwyg",
                    toolbar: [
                        "emoji",
                        "headings",
                        "bold",
                        "italic",
                        "strike",
                        "link",
                        "|",
                        "list",
                        "ordered-list",
                        "check",
                        "outdent",
                        "indent",
                        "|",
                        "quote",
                        "line",
                        "code",
                        "inline-code",
                        "insert-before",
                        "insert-after",
                        "|",
                        // 'record',
                        "table",
                        "|",
                        "undo",
                        "redo",
                        "|",
                        "edit-mode",
                        // 'content-theme',
                        "upload",
                        "code-theme",
                        "export",
                        {
                            name: "more",
                            toolbar: ["fullscreen", "both", "preview", "info", "help"],
                        },
                    ],
                    upload: {
                        accept: "image/*,.mp3, .wav, .rar",
                        token: "test",
                        url: "/api/upload/editor",
                        linkToImgUrl: "/api/upload/fetch",
                        filename(name) {
                            return name
                            // .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, "")
                            // .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, "")
                            // .replace("/\\s/g", "");
                        },
                    },
                });
            },
            submitForm() {
                // this.$refs[formName].validate((valid) => {
                // if (valid) {
                // let str = `杜康

                //   # 端盖安徽省的话是`
                // this.renderMarkdown(str)
                if (
                    this.contentEditor.getValue().length === 1 ||
                    this.contentEditor.getValue() == null ||
                    this.contentEditor.getValue() === ''
                ) {
                    alert('话题内容不可为空')
                    return false
                }
                // // 5.通过this.contentEditor.getValue()获取编辑器内容
                this.ruleForm.content = this.contentEditor.getValue()
                this.markeda(this.ruleForm.content)
                const dm = this.$refs.dukang
                this.renderMarkdown(this.ruleForm.content)
                Vditor.preview({
                    previewElement: dm,   // 使用该元素进行渲染
                    markdown: this.ruleForm.content,  // 需要渲染的 markdown 原文
                    options: {
                        mode: "dark",
                        anchor: 1,  // 为标题添加锚点 0：不渲染；1：渲染于标题前；2：渲染于标题后，默认 0
                        // customEmoji?: { [key: string]: string },    // 自定义 emoji，默认为 {}
                        lang: 'zh_CN',    // 语言，默认为 'zh_CN'
                        emojiPath: '',   // 表情图片路径
                        // hljs?: IHljs, // 参见 options.preview.hljs
                        // speech?: {  // 对选中后的内容进行阅读
                        //   enable?: boolean,
                        // },
                        math: true, // 数学公式渲染配置
                        // cdn?: string, // 自建 CDN 地址
                        // transform?(html: string): string, // 在渲染前进行的回调方法
                        // after?(), // 渲染完成后的回调
                        // lazyLoadImage?: string, // 设置为 Loading 图片地址后将启用图片的懒加载
                        // markdown?: options.preview.markdown,
                        // theme?: options.preview.theme,
                        // renderers?: ILuteRender // 自定义渲染 https://ld246.com/article/1588412297062
                    }
                })
                // }
                // ......// 调用api把this.ruleForm传给后端
                // })
            },
            markeda(text) {
                console.log(marked.parse(text))
                console.log(marked.parse('# Marked in the browddfser\n\nRendered by **marked**.  '))
            },
            renderMarkdown(md) {
                const dm = this.$refs.dukang
                // const options = {
                //   mode: 'dark',
                //   anchor: 1
                // }
                Vditor.outlineRender(dm, md)
            }
        }
    }
</script>
