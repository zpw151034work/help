<template>
    <div class="user-center-box">
        <!-- 基本信心 -->
        <div class="user-center-left">
            <h4>基本信息</h4>
            <ul>
                <li>
                    <span>登录账号</span>
                    <p>{{ info.username }}</p>
                </li>
                <!-- <li>
                    <span>会员身份</span>
                    <p>admin</p>
                </li> -->
                <!-- <li>
                    <span>所属企业</span>
                    <p>{{ info.enterpriseName }}</p>
                </li> -->
                <li>
                    <span>联系方式</span>
                    <p>{{ info. phone}}</p>
                </li>
                <!-- <li>
                    <span>用户类型</span>
                    <p>{{ info.usertype}}</p>
                </li> -->
                <li>
                    <span>邮 箱</span>
                    <p>{{ info.email}}</p>
                </li>
                <li>
                    <span>所属企业</span>
                    <p>{{ info.enterpriseName}}</p>
                </li>
            </ul>
        </div>
        <!-- <div class="user-center-right">
          <h4>公告</h4>
          <ul>
            <li v-for="(item,index) in noticeList" :key="index">
              <span class="user-center-text-left">{{index+1}}</span>
              <span class="user-center-text-right">{{item.title}}</span>
            </li>
          </ul>
        </div> -->
    </div>
</template>
<script>
    import { getUserInfo } from '@/api/user.js'
    export default {
        name: "UserCenter",
        data() {
            return {
                info: {},
                noticeList: [{
                    title: '第一条公告'
                },{
                    title: '第二条公告'
                },{
                    title: '第三条公告'
                }],
            }
        },
        mounted() {
            this.getUserInfo()
        },
        methods: {
            getUserInfo() {
                getUserInfo().then(res => {
                    this.info = res
                    console.log(res)
                })
            }
        },
    }
</script>
<style lang="scss" scoped>
.user-center-box {
    border: 16px solid #f6f7f8;
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;

    .user-center-left {
        width: 826px;
        height: 100%;

        h4 {
            margin-top: 17px;
            border-left: 3px solid  #497bec;
            padding-left: 24px;
            font-size: 14px;
            color: #303133;
            line-height: 14px;
            // font-weight: 500;
        }

        ul {
            list-style-type: none;
            margin: 50px 0 0 24px;
            font-size: 14px;
            padding-left: 5%;
            li {
                margin: 16px 0;
                display: flex;
                align-content: center;

                p {
                    // margin-left: 22px;
                    padding-left: 12px;
                    width: 320px;
                    height: 32px;
                    // background: rgba(235, 237, 240, 0.49);
                    // border: 0.5px solid rgba(198, 202, 209, 0.5);
                    // border-radius: 4px;
                    line-height: 32px;
                }

                span {
                    line-height: 32px;
                    width: 70px;
                }
            }
        }
    }

    .user-center-right {
        width: 208px;
        height: 100%;
        border-left: 16px solid #f6f7f8;

        h4 {
            margin-top: 17px;
            border-left: 3px solid  #497bec;
            padding-left: 24px;
            font-size: 14px;
            color: #303133;
            line-height: 14px;
            // font-weight: 500;
        }

        ul {
            list-style-type: none;
            margin: 22px 0 0 24px;

            li {
                margin-top: 8px;
                width: 168px;
                height: 32px;
                background: rgba(242, 246, 252, 0.49);

                .user-center-text-left {
                    display: inline-block;
                    width: 16px;
                    line-height: 16px;
                    border-radius: 50%;
                    background: #497bec;
                    color: #fff;
                    text-align: center;
                    font-size: 12px;
                }

                .user-center-text-right {
                    font-size: 14px;
                    color: #303133;
                    line-height: 32px;
                    font-weight: 400;
                    padding-left: 10px;
                }
            }
        }
    }
}
</style>
