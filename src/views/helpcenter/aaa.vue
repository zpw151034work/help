<template>
    <div class="box">
        <div id="vditor" name="description" />
    </div>
</template>
<script>
    import Vditor from 'vditor'
    //import 'vditor/src/assets/scss/index.scss'

    export default {
        data() {
            return {
                contentEditor: {}
            }
        },
        mounted() {
            this.contentEditor = new Vditor('vditor', {
                height: 500,
                placeholder: '<h1>黑恶黑</h1>',
                theme: 'classic',
                counter: {
                    enable: true,
                    type: 'markdown'
                },
                value: '<h1>黑恶黑</h1>',
                preview: {
                    delay: 0,
                    hljs: {
                        style: 'monokai',
                        lineNumber: true
                    }
                },
                tab: '\t',
                typewriterMode: true,
                toolbarConfig: {
                    pin: true
                },
                cache: {
                    enable: false
                },
                mode: 'wysiwyg',
                toolbar: [
                    'emoji',
                    'headings',
                    'bold',
                    'italic',
                    'strike',
                    'link',
                    '|',
                    'list',
                    'ordered-list',
                    'check',
                    'outdent',
                    'indent',
                    '|',
                    'quote',
                    'line',
                    'code',
                    'inline-code',
                    'insert-before',
                    'insert-after',
                    '|',
                    // 'record',
                    'table',
                    '|',
                    'undo',
                    'redo',
                    '|',
                    'edit-mode',
                    // 'content-theme',
                    'code-theme',
                    'export',
                    {
                        name: 'more',
                        toolbar: ['fullscreen', 'both', 'preview', 'info', 'help']
                    }
                ]
            })
        },
        methods: {
            // 我的提交表单代码大致如下,这段代码核心是this.ruleForm.content = this.contentEditor.getValue()
            submitForm(formName) {
                formName = 'formName'
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (
                            this.contentEditor.getValue().length === 1 ||
                            this.contentEditor.getValue() == null ||
                            this.contentEditor.getValue() === ''
                        ) {
                            alert('话题内容不可为空')
                            return false
                        }
                        // 5.通过this.contentEditor.getValue()获取编辑器内容
                        this.ruleForm.content = this.contentEditor.getValue()
                        this.ruleForm.content = this.contentEditor.getHtml()
                    }
                    // ......// 调用api把this.ruleForm传给后端
                })
            }
            // 后续从后端传回来的数据会面临一个##标题仍然显示为##标题的问题，这篇文章后面有使用renderMarkdown()来解决的具体代码
        }
    }
</script>
<style lang="scss" scoped>
.box{
  overflow: hidden;
  >div{
    margin-top: 60px;
  }
}
</style>
