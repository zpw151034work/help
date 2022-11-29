import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/element-variables.scss'
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import locale from 'element-ui/lib/locale/lang/zh-CN'
import '@/styles/index.scss' // global css
import '@/styles/common.scss' // global css
import '@/styles/animate.min.css' // global css
import App from './App'
import store from './store'
import router from './router'
// import './utils/lute.min'
import '@/icons' // icon
//import 'vditor/src/assets/scss/index.scss' // 1.import一下vditor组件样式
import moment from 'moment'
import { message } from './utils/resetMessage';
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
//引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
    mockXHR()
}
Vue.prototype.$dateFormat = function(data, formatStr = 'YYYY-MM-DD HH:mm:ss') {
    return moment(data).format(formatStr)
}

//注册全局
Vue.use(VueQuillEditor);
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.prototype.$message = message
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.config.productionTip = false
let vue = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
sessionStorage.setItem('GLOBALbaseURL', process.env.VUE_APP_BASE_API || window.GLOBALbaseURL)
sessionStorage.setItem('MINIO_URL',window.MINIO_URL)
export default vue
