// import Layout from '@/layout';
export default [
    // {
    //     path: '/platform/list',
    //     name: 'platform-List',
    //     component: () => import('@/views/platform/list.vue'),
    //     meta: { title: '首页', path: '/platform' },
    //     title: '首页'
    // },
    {
        path: '/platform/usercenter',
        // component: Layout,
        component: () =>
                import('@/views/platform/userCenter/index.vue'),
        redirect: '/platform/usercenter/basic',
        name: 'usercenter',
        meta: {
            title: '用户中心',
            icon: 'set'
        },
        alwaysShow: true,
        children: [{
            path: '/platform/usercenter/basic',
            name: 'basic',
            component: () =>
                import('@/views/platform/userCenter/basic.vue'),
            meta: { title: '基本信息' }
        }]
    },{
        path: '/platform/skillOrange',
        // component: Layout,
        component: resolve => require(['@/views/platform/skillOrange/skillOrange'], resolve),
        redirect: '/platform/skillOrange/orangelist',
        name: 'SkillOrange',
        key: 65,
        meta: {
            title: '技能管理',
            icon: 'nesteds'
        },
        children: [{
            path: '/platform/skillOrange/orangelist',
            name: 'Skill-List',
            key: 66,
            component: resolve => require(['@/views/platform/skillOrange/index'], resolve),
            meta: { title: '已发布技能' }
        },
        {
            path: '/platform/skillOrange/getSkilllist',
            name: 'Skill-List',
            key: 67,
            //component: () => import('@/views/skill/index'),
            component: resolve => require(['@/views/platform/skillOrange/getSkillindex'], resolve),
            meta: { title: '已获取技能' }
        },
        {
            path: '/platform/skillOrange/relation',
            name: 'SkillOrange-List-Relation',
            key: 67,
            component: resolve => require(['@/views/platform/skillOrange/relation'], resolve),
            meta: { title: '已发布的所有版本' },
            hidden: true
        },
    
        {
            path: '/platform/skillOrange/modify',
            name: 'SkillOrange-List-Modify',
            key: 66,
            // component: () => import('@/views/skill/modify'),
            component: resolve => require(['@/views/platform/skillOrange/modify'], resolve),
            meta: { title: '技能新增/编辑' },
            hidden: true
        },
    
        {
            path: '/platform/skillOrange/published/:id?',
            name: 'SkillOrange-List-Published',
            key: 66,
            component: resolve => require(['@/views/platform/skillOrange/published'], resolve),
            meta: { title: '选择技能' },
            hidden: true
        }
        ]
    },{
        path: '/platform/robotManage',
        // component: Layout,
        component: () =>
                import ('@/views/platform/robotManage/robotManage'),
        redirect: '/platform/robotManage/release',
        name: 'robotManage',
        meta: { title: '机器人管理', icon: 'icon_robot' },
        key: 77,
        // alwaysShow: true,
        children: [{
            path: '/platform/robotManage/release',
            name: 'RobotManage-Release',
            key: 78,
            component: () =>
                import ('@/views/platform/robotManage/index'),
            meta: { title: '已发布机器人' }
        },
        {
            path: '/platform/robotManage/obtain',
            name: 'RobotManage-Obtain',
            key: 79,
            component: () =>
                import ('@/views/platform/robotManage/obtain'),
            meta: { title: '已获取机器人' }
        },
        {
            path: '/platform/robotManage/detail/:id',
            name: 'RobotManage-Detail',
            key: 78,
            component: () =>
                import ('@/views/platform/robotManage/detail'),
            meta: { title: '机器人详情' },
            hidden: true
        }]
    },
]