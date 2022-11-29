import { type } from '../../../../accessibility/dist/custom-elements/index';
<template>
    <el-dialog :visible.sync="dialogVisible"
               title="技能手册"
               :center="false"
               @close="closeDialog">

        <iframe v-if="dialogVisible"
                width="100%"
                height="100%"
                :src="src"
                frameborder="0"></iframe>
    </el-dialog>
</template>
<script>
    // import iframePath from '@/utils/iframepath';

    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'Skillhandbook',
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            id: {
                type: String,
            }
        },

        data () {
            return {
                data: false,
                // src: `${window.location.origin}${window.EDITOTPATH}/wangEditor/wangErrors.html`
                src: window.CS_EDITER + '/wangEditor/wangErrors.html'
                //   src: `https://mrpa-test.ai-rtc.com:8082/plat/3.6.0/csEditer/wangEditor/wangErrors.html`

            }
        },
        computed: {
            dialogVisible: {
                get () {
                    return this.visible
                },
                set () {
                }
            }
        },
        methods: {
            closeDialog () {
                this.$emit('changeModal')

            }
        }
    }
</script>
<style scoped>
::v-deep .el-dialog__body {
    height: 500px;
    overflow-y: scroll;
}
</style>
