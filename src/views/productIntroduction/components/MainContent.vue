<template>
    <el-row :gutter="10">
        <el-col :xs="24" :sm="20">
            <div class="box">
                <div class="title">
                    <div class="name">企业数字专员产品介绍</div>
                    <div class="time">更新时间：2022-11-09 11：19</div>
                    <div class="introduce">
                        企业数字专员，又名“人力协同机器人”，利用RPA+AI人工智能技术，让数字专员可以像员工一样处理大量简单、重复的工作。全天候7*24小时坚守
                        岗位，解决员工的日常问题，并可以应用到企业内部的多种场景。
                    </div>
                </div>
                <div class="content">
                    <div class="title">功能架构：</div>
                    <div class="card">
                        <img src="../../../assets/new/function.png" alt="" class="bgImg">
                    </div>
                </div>
                <div class="next">
                    <div class="nextTo">下一篇:</div>
                    <div class="function">核心功能</div>
                </div>
            </div>
        </el-col>
        <el-col :xs="0" :sm="4">
            <div class="pageGuide">
                <div class="tit">本页导读</div>
                <div class="item"><i class="el-icon-arrow-left"></i>功能架构</div>
                <div class="item"><i class="el-icon-arrow-left"></i>功能架构</div>
                <div class="item"><i class="el-icon-arrow-left"></i>功能架构</div>
            </div>
        </el-col>
    </el-row>
</template>
<script>
export default {
    data() {
        return {

        };
    },
};
</script>
<style lang="scss" scoped>
.box {
   
    padding: 0 80px;
    height: 100%;

    .next {
        text-align: right;
    }

    .title {
        .name {
            font-size: 24px;
            color: #282828;
            height: 60px;
            // line-height: 60px;
        }

        .time {
            color: #9e9e9e;
            font-size: 12px;
            height: 22px;
            // line-height: 22px;
        }

        .introduce {
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            color: #282828;

            line-height: 20px;
        }
    }

    .content {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .title {
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            color: #282828;
            align-self: flex-start;
        }

        .card {
            height: calc(100vh - 350px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;

            .bgImg {
                width: 780px;
                height: 472px;
            }

            .cardContent {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;
                margin: 16px 0;

                .cardRow {
                    display: flex;
                    width: 100%;

                    .first {
                        flex: 0 0 10%;
                        font-family: PingFang-SC-Medium;
                        font-size: 12px;
                        color: #282828;
                        text-align: center;
                        line-height: 30px;
                    }

                    .rightBox {
                        flex-grow: 1;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;

                        .item {
                            flex-grow: 1;
                            font-family: PingFang-SC-Medium;
                            font-size: 12px;
                            color: #282828;
                            text-align: center;
                            background: #ffffff;
                            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
                            border-radius: 2px;
                            padding: 10px;
                            margin: 0 8px;
                        }

                        .item2 {
                            flex-grow: 1;
                            font-family: PingFang-SC-Medium;
                            font-size: 12px;
                            color: #282828;
                            text-align: center;
                            background: #ffffff;
                            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
                            border-radius: 2px;
                            margin: 0 8px;

                            .itemTitle {
                                background: #ebf4ff;
                                border-radius: 2px;
                                font-family: PingFang-SC-Medium;
                                font-size: 12px;
                                color: #282828;
                                text-align: center;
                                height: 30px;
                                line-height: 30px;
                            }

                            .itemContent {
                                display: flex;
                                flex-wrap: wrap;
                                justify-content: space-between;
                                align-items: center;
                                padding: 10px;

                                & div {}
                            }
                        }
                    }
                }
            }
        }
    }

    .next {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;

        .nextTo {
            font-family: PingFang-SC-Medium;
            font-size: 12px;
            color: #9e9e9e;
            margin-right: 6px;
        }

        .function {
            font-family: PingFang-SC-Medium;
            font-size: 12px;
            color: #282828;
        }
    }
}

.pageGuide {
    padding: 0 16px;

    .tlt {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #282828;
    }

    .item {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #626262;
        padding: 8px 0;
    }
}

@media screen and (max-width: 768px) {
    .box {
        width: 100%;
        height: 100%;
        padding: 0 0;

        .title {
            width: 100%;

            .name {
                font-size: 24px;
                color: #282828;
                height: 60px;
                line-height: 60px;
                width: 100%;
            }

            .time {
                color: #9e9e9e;
                font-size: 12px;
                height: 22px;
                line-height: 22px;
            }

            .introduce {
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                color: #282828;
                line-height: 20px;
            }
        }
    }
}
</style>
