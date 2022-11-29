import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index.vue'
import Layout from '@/layout';
import platform from './platform'

Vue.use(Router)

/* Layout */
// import Layout from '@/layout'
export const constantRoutes = [

    {
        path: '/',
        name: 'home',
        component: Index,
        title: '首页',
        redirect: '/home',
        meta: {
            title: '首页',
            path: '/home'
        },
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index'),
                meta: { title: '首页', path: '/home' },
                title: '首页'
            },
            {
                path: '/skills',
                component: () => import('@/views/skills'),
                hidden: true,
                title: '全部技能',
                meta: {
                    activeMenu: '/home',
                    title: '全部技能'
                }
            },
            {
                path: '/skillsDetail',
                component: () => import('@/views/skills/detail'),
                hidden: true,
                title: '技能详情',
                meta: {
                    // activeMenu: '',
                    title: '技能详情'
                }
            },
            {
                path: '/helpcenter',
                component: () => import('@/views/helpcenter'),
                hidden: true,
                title: '帮助中心',
                meta: {
                    // activeMenu: '',
                    title: '帮助中心'
                }
            },
           
            {
                path: '/helpcenterDetail',
                component: () => import('@/views/helpcenter/detail'),
                hidden: true,
                title: '帮助详情',
                meta: {
                    activeMenu: '/helpcenter',
                    title: '帮助中心'
                }
            },
            {
                path: '/helpcenterDetailenclosure',
                component: () => import('@/views/helpcenter/detailEnclosure'),
                hidden: true,
                title: '帮助详情',
                meta: {
                    activeMenu: '/helpcenter',
                    title: '帮助中心',
                    head: true
                }
            },
            {
                path: '/broadcast',
                component: () => import('@/views/broadcast/index.vue'),
                hidden: true,
                title: '数字人',
                meta: {
                    activeMenu: '/broadcast',
                    title: '数字人'
                }
            },
            // {
            //   path: '/helpcenteraaa',
            //   component: () => import('@/views/helpcenter/aaa'),
            //   hidden: true,
            //   title: '帮助详情'
            // },
            {
                path: '/robot',
                component: () => import('@/views/robot'),
                hidden: true,
                redirect: '/robot/list',
                meta: {
                    path: '/robot/list',
                    title: '热门机器人',
                    head: true
                },
                children: [
                    {
                        path: '/robot/list',
                        component: () => import('@/views/robot/list'),
                        hidden: true,
                        meta: {
                            activeMenu: '/home',
                            title: '热门机器人'
                            // head: true,
                        }
                    },
                    {
                        path: '/robot/detail/:id',
                        component: () => import('@/views/robot/robotDetail'),
                        hidden: true,
                        title: '详情',
                        meta: {
                            title: '详情'
                            // head: true,
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/platform',
        name: 'platform',
        component: Layout,
        redirect: '/platform/list',
        title: '平台',
        children: [
            ...platform
        ]
    },
    // {
    //   path: '/loginSuccess',
    //   name: 'loginSuccess',
    //   component: () => import('@/views/loginSuccess/index'),
    //   title: '注册成功'
    // },
    // {
    //     path: '/home',
    //     component: () => import('@/views/home/index'),
    //     title: '首页'
    // },
    // {
    //     path: '/skills',
    //     component: () => import('@/views/skills/index'),
    //     title: '全部技能'
    // },
    {
        path: '/productIntroduction',
        component: () => import('@/views/productIntroduction'),
        hidden: true,
        title: '产品介绍',
        meta: {
            // activeMenu: '',
            title: '产品介绍'
        }
    },
    {
        path: '/editor',
        component: () => import('@/views/editor'),
        hidden: true,
        title: '编辑器',
        meta: {
            // activeMenu: '',
            title: '编辑器'
        }
    },
    {
        path: '/helpCenterNew',
        component: () => import('@/views/helpCenterNew'),
        hidden: true,
        title: '帮助中心新',
        meta: {
            // activeMenu: '',
            title: '帮助中心新'
        }
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/register',
        component: () => import('@/views/login/register')
    },
    {
        path: '/forgetPsw',
        component: () => import('@/views/login/forgetPsw')
    },
    {
        path: '/modifyPsw',
        component: () => import('@/views/login/modifyPsw')
    },
    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
