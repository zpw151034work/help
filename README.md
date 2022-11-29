
# rpa资源市场

##后台服务

```
http://139.129.164.252:9530/ 开发环境服务
http://139.129.164.252:9531/ 测试环境服务
```

## 项目手动打包：

在vue.config.js文件中把publicPath改为'/rmarket',例如：

```
publicPath: '/rmarket'
```

proxy对象中的target改成后台服务地址，例如：

```
target: 'http://139.129.164.252:9530/’,
```

在head.vue中把window.loacation.href地址修改为后台要跳转的rpa地址，例如：

```
window.location.href = 'http://139.129.164.252:9530/plat/#/login?redirect=%2F'
```

## 开发运行项目：

在vue.config.js文件中把publicPath改为'/',例如：

```
publicPath: '/',
```

proxy对象中的target改成后台服务地址，例如：

```
target: 'http://139.129.164.252:9530/',
```

在head.vue中把window.loacation.href地址修改为后台要跳转的rpa地址，例如：

```
window.location.href = 'http://139.129.164.252:9530/plat/#/login?redirect=%2F'
```

##项目jenkins部署地址：

```
http://2898mw5585.wicp.vip/login?from=%2F
账号：admin
密码：123456
```

```
139.129.164.252-8092-vue rpa开发环境（jenkins名称）
139.129.164.252-8093-vue rpa测试环境（jenkins名称）
```

##开发环境账号（也可以自己注册一个）：

```
账号：13693501281
密码：Msxf1234
```

##项目访问地址：

```
开发环境: http://139.129.164.252:9530/rmarket/#/
```

```
测试环境: http://139.129.164.252:9531/rmarket/#/
```

##历史分支
rsm-web 资源市场
##当前分支 rpa-rmarket （重庆电力江津分公司）
开发内容：
1.技能发布-技能列表
2.技能发布-技能上传
