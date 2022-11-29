<template>
    <keep-alive>
        <div class="rich-text">
            <div class="editor"></div>
        </div>
    </keep-alive>
</template>
<script>
    import Quill from 'quill'
    import 'quill/dist/quill.snow.css'
    // 工具栏配置
    const editorOption = [
        ["bold", "italic", "underline"], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
        // ["blockquote", "code-block"], // 引用  代码块-----['blockquote', 'code-block']
        [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
        [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
        // [{ script: "sub" }, { script: "super" }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
        [{ indent: "-1" }, { indent: "+1" }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
        // [{ direction: "rtl" }], // 文本方向-----[{'direction': 'rtl'}]
        // [{ size: ["small", false, "large", "huge"] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
        [{ color: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
        // [{ font: [] }], // 字体种类-----[{ font: [] }]
        [{ align: [] }], // 对齐方式-----[{ align: [] }]
        ["clean"], // 清除文本格式-----['clean']
        ["link", "image"], // 链接、图片、视频-----['link', 'image', 'video']
        [
            { table: 'TD' },
            { 'table-insert-row': 'TIR' },
            { 'table-insert-column': 'TIC' },
            { 'table-delete-row': 'TDR' },
            { 'table-delete-column': 'TDC' }
        ],
    ]
    export default {
        name: 'EditorTemp',
        props: {
            richText: {
                type: String,
                default: ''
            }
        },
        watch: {
            richText: {
                handler(val) {
                    this.form.richText = val;
                    this.$nextTick(() => {
                        // console.log('watch',val);
                        this.quill.root.innerHTML = val
                    })
                },
                deep: true,
                immediate: true,
            }
        },
        data() {
            return {
                quill: null,
                form: {
                    richText: ''
                },
                options: { //富文本
                    modules: {
                        toolbar: {
                            container: editorOption,
                            handlers: {
                                table: function () {
                                    this.quill.getModule('table').insertTable(2, 3)
                                },
                                'table-insert-row': function () {
                                    this.quill.getModule('table').insertRowBelow()
                                },
                                'table-insert-column': function () {
                                    this.quill.getModule('table').insertColumnRight()
                                },
                                'table-delete-row': function () {
                                    this.quill.getModule('table').deleteRow()
                                },
                                'table-delete-column': function () {
                                    this.quill.getModule('table').deleteColumn()
                                },
                            }
                        },
                        table: true
                    },
                    theme: "snow",
                    placeholder: "请输入正文"
                }
            };
        },
        mounted () {
            const dom = this.$el.querySelector('.editor')
            this.quill = new Quill(dom, this.options)
            this.quill.on('text-change', () => {
                // console.dir(this.quill.root.textContent)
                let obj = {
                    imgTextDescribe: this.quill.root.textContent.substr(0,30),
                    richText: this.quill.root.innerHTML
                }
                this.$emit('contentData', obj)
            })
            // toolbar 表格
            this.$el.querySelector(
                '.ql-table-insert-row'
            ).innerHTML = `<svg t="1591862376726" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6306" width="18" height="200"><path d="M500.8 604.779L267.307 371.392l-45.227 45.27 278.741 278.613L779.307 416.66l-45.248-45.248z" p-id="6307"></path></svg>`
            this.$el.querySelector(
                '.ql-table-insert-column'
            ).innerHTML = `<svg t="1591862238963" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6509" width="18" height="200"><path d="M593.450667 512.128L360.064 278.613333l45.290667-45.226666 278.613333 278.762666L405.333333 790.613333l-45.226666-45.269333z" p-id="6510"></path></svg>`
            this.$el.querySelector(
                '.ql-table-delete-row'
            ).innerHTML = `<svg t="1591862253524" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6632" width="18" height="200"><path d="M500.8 461.909333L267.306667 695.296l-45.226667-45.269333 278.741333-278.613334L779.306667 650.026667l-45.248 45.226666z" p-id="6633"></path></svg>`
            this.$el.querySelector(
                '.ql-table-delete-column'
            ).innerHTML = `<svg t="1591862261059" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6755" width="18" height="200"><path d="M641.28 278.613333l-45.226667-45.226666-278.634666 278.762666 278.613333 278.485334 45.248-45.269334-233.365333-233.237333z" p-id="6756"></path></svg>`
        },
        activated () {
            this.quill.setContents({})
        },
        methods: {

        },
    }
</script>

<style lang='scss' scoped>
.rich-text {
    /deep/.ql-tooltip.ql-editing {
        z-index: 1;
        left: -1px !important;
    }
}
</style>
