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
                // let str = `??????

                //   # ????????????????????????`
                // this.renderMarkdown(str)
                if (
                    this.contentEditor.getValue().length === 1 ||
                    this.contentEditor.getValue() == null ||
                    this.contentEditor.getValue() === ''
                ) {
                    alert('????????????????????????')
                    return false
                }
                // // 5.??????this.contentEditor.getValue()?????????????????????
                this.ruleForm.content = this.contentEditor.getValue()
                this.markeda(this.ruleForm.content)
                const dm = this.$refs.dukang
                this.renderMarkdown(this.ruleForm.content)
                Vditor.preview({
                    previewElement: dm,   // ???????????????????????????
                    markdown: this.ruleForm.content,  // ??????????????? markdown ??????
                    options: {
                        mode: "dark",
                        anchor: 1,  // ????????????????????? 0???????????????1????????????????????????2?????????????????????????????? 0
                        // customEmoji?: { [key: string]: string },    // ????????? emoji???????????? {}
                        lang: 'zh_CN',    // ?????????????????? 'zh_CN'
                        emojiPath: '',   // ??????????????????
                        // hljs?: IHljs, // ?????? options.preview.hljs
                        // speech?: {  // ?????????????????????????????????
                        //   enable?: boolean,
                        // },
                        math: true, // ????????????????????????
                        // cdn?: string, // ?????? CDN ??????
                        // transform?(html: string): string, // ?????????????????????????????????
                        // after?(), // ????????????????????????
                        // lazyLoadImage?: string, // ????????? Loading ??????????????????????????????????????????
                        // markdown?: options.preview.markdown,
                        // theme?: options.preview.theme,
                        // renderers?: ILuteRender // ??????????????? https://ld246.com/article/1588412297062
                    }
                })
                // }
                // ......// ??????api???this.ruleForm????????????
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
