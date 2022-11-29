<!--robotDiaLog对话框-->
<template>
    <div class="robot-dialog-container">
        <el-dialog
            width="30%"
            :title="robotTitle"
            :visible.sync="robotDiaVis"
            :before-close="robotHandleClose">
            <div>
                <div>
                    {{ nameTitle }}：{{ robotName }}
                </div>
                <div>
                    {{ codeTitle }}：<span ref="copy">{{ robotCode }}</span>
                    <textarea class="textarea" ref="textarea">

          </textarea>
                    <el-button class="margin-left10" ref="copy" @click="textCopyEvent(robotCode)">
                        复制
                    </el-button>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeEvent">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
    export default {
        name: 'robotDiaLog',
        props: {
            robotDiaVis: Boolean,
            robotTitle: String,
            robotName: String,
            robotCode: String,
            nameTitle: String,
            codeTitle: String,
        },
        data() {
            return {

            }
        },
        methods: {
            closeEvent() {
                this.$emit('close','robotClose');
            },
            robotHandleClose() {
                this.$emit('robotBeforeClose','rightRobotClose');
            },
            textCopyEvent(robotCode) {
                let copyDOM = robotCode;
                var textarea = this.$refs.textarea;
                textarea.value = copyDOM; // 修改文本框的内容
                textarea.select(); // 选中文本
                document.execCommand('copy');
                this.$message({
                    type: 'success',
                    message: '复制成功'
                })
            },
        }
    }
</script>

<style scoped lang="scss">
  .robot-dialog-container {
    .textarea {position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;}
  }
</style>
