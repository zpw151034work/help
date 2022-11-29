import axios from 'axios'
import { MessageBox } from 'element-ui'
import {message as Message} from '@/utils/resetMessage'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import eventBus from '@/utils/eventBus'
import vue from '../main';
// import router from '../router/index'
// create an axios instancex
console.log(process.env.NODE_ENV, window.GLOBALbaseURL,'按下')
const service = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BASE_API : window.GLOBALbaseURL,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 125000 // request timeout
})
// request interceptor
service.interceptors.request.use(
    config => {
    // do something before request is sent
        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
    // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

    /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
    response => {
        const res = response.data
        // 登录成功之后的用户名和路由
        eventBus.$emit('namerouter', {
            username: localStorage.getItem('userName')
        })
        // debugger
        if (res.code === 200) {
            return res.data
        }
        // 这里code不是200的情况下返回整个res。
        if (res.code === 10010) {
            return res
        }
        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 20000) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            if (res.code === '9001') {
                logout()
            }
            if (res.code === 10120) {
                return res
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 3 * 1000
        })
        return Promise.reject(error)
    }
)
// 退出登录
const logout = () => {
    // 超时，重新登录
    removeToken()
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('routes')
    //add 2020-3-24
    localStorage.removeItem('userName')
    localStorage.removeItem('routes')
    vue.$router.push(`/login?redirect=${vue.$route.fullPath}`)
}

export default service
