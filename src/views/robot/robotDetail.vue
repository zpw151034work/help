<template>
    <div class="robot-detail-box">
        <!-- <div class="breadcrumb1"> -->
        <Breadcrumb ref="Bread" />
        <!-- </div> -->
        <h1>{{ robotDetail.robotName }}</h1>
        <div style="margin-bottom:51px" class="robot-detail-content">
            <div class="robot-detail-left">
                <div class="content" />
                <div class="robot-detail-introduce">
                    <h2 style="font-size: 24px;color: #293340;">详情</h2>
                    <p class="robot-btn">简介</p>
                    <p>{{ robotDetail.robotDesc }}</p>
                    <!-- <p class="robot-btn">详情说明</p> -->
                    <!-- <div v-html="skilldetail.handbookContent">{{ skilldetail.handbookContent }}</div> -->

                </div>
            </div>
            <div class="robot-detail-right">
                <div class="robot-introduce">
                    <table>
                        <tr>
                            <td class="ar">机器人描述：</td>
                            <td>
                                <el-tooltip tooltipclass="item" effect="dark" content="" placement="top">
                                    <div slot="content" style="width:360px">{{ robotDetail.robotDesc }}</div>
                                    <p class="skillDescription" style="">{{ robotDetail.robotDesc }}</p>
                                </el-tooltip>
                            </td>
                        </tr>
                        <tr>
                            <td class="ar">开发者：</td>
                            <td>{{ robotDetail.createName }}</td>
                        </tr>
                        <tr>
                            <td class="ar">分类：</td>
                            <td><span class="classtype">{{ robotDetail.classifyName }}</span></td>
                        </tr>
                        <tr>
                            <td class="ar">更新时间：</td>
                            <td>{{ robotDetail.updateTime }}</td>
                        </tr>
                        <tr>
                            <td class="ar">下载数量：</td>
                            <td>{{ robotDetail.downloadCount }}</td>
                        </tr>
                    </table>
                </div>
                <div style="margin-top:20px;display:flex;justify-content: space-between;">
                    <el-button class="shanghcuan-btn" type="primary" @click="getRobots(robotDetail)"><span class="shangchuan-icon" /> {{ btnText }}</el-button>
                    <!-- <el-button style="width:60px;height:56px" @click="giveTheThumbsUp"><img src="../../assets/skills/details-like-normal.png" alt=""><br>点赞</el-button> -->
                </div>
                <div class="downTips">
                    <p>下载说明:</p>
                    <p>机器人已关联技能，下载后即可在“机器人管理列表”查看和进行相关设置</p>
                </div>
            </div>
        </div>
        <div style="margin-bottom:51px">
            <h2 style="font-size: 24px;color: #293340;margin-bottom: 15px">关联技能</h2>
            <div style="display:flex" class="associatedSkill">
                <!-- <IndexBox v-for="(item,index) in skillList" :key="index" data-type="skillType" width="220px" style="margin-top:20px" :item="item" href="/skillsDetail" /> -->
                <div v-for="(item,index) in skillList" :key="index" class="index-skill-box" @click="viewSkill(item)">
                    <img class="free" src="../../assets/home/home-hotelect-free.png" alt="">
                    <img class="robot-logo" :src="item.handbookCoverImage || defaImg" alt="">
                    <h1 :title="item.skillName">{{ item.skillName }}</h1>
                    <p style="margin-top:0  px">{{ item.createName }}</p>
                    <!-- <div class="robot-footer">
                        <div>
                            <img class="down" src="../../assets/home/home-hotelect-down-click.png" alt="">
                            <span> &nbsp;{{ item.downloadsNum }}</span>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
        <div style="margin-bottom:51px">
            <h1>推荐</h1>
            <div style="display:flex">
                <IndexBox v-for="(item,index) in recommendRobotList" :key="index" :data-type="dataType" width="220px" :item="item" href="/robot/detail" />
            </div>
        </div>
        <el-dialog class="dialogSkill" title="技能详情" :visible.sync="dialogSkillVisible">
            <div class="dialogSkillContent">
                <div class="skillInfo">
                    <div class="skillLogo">
                        <img :src="dialogData.handbookCoverImage || defaImg" alt="">
                    </div>
                    <div class="skillDetail">
                        <table>
                            <tr>
                                <td class="ar">技能名称：</td>
                                <td>{{ dialogData.skillName }}</td>
                            </tr>
                            <tr>
                                <td class="ar">开发者：</td>
                                <td>{{ dialogData.createName }}</td>
                            </tr>
                            <tr>
                                <td class="ar">分类：</td>
                                <td><span class="classtype">{{ dialogData.classifyName }}</span></td>
                            </tr>
                            <tr>
                                <td class="ar">版本：</td>
                                <td>{{ dialogData.version }}</td>
                            </tr>
                            <tr>
                                <td class="ar">更新时间：</td>
                                <td>{{ dialogData.updateTime }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="description">
                    <el-descriptions :column="1">
                        <el-descriptions-item label="技能描述">{{ dialogData.description }}</el-descriptions-item>
                        <el-descriptions-item label="详情说明">{{ dialogData.handbookSimpleContent }}</el-descriptions-item>
                    </el-descriptions>
                </div>
                <div class="skillImg">
                    <!-- <el-image :src="dialogData.handbookCoverImage">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image> -->
                    <iframe
                        id="skillHandIFrame"
                        width="100%"
                        height="100%"
                        :src="src"
                        frameborder="0" />
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogSkillVisible = false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="机器人下载" :z-index="1000" :visible.sync="dialogDownRobotVisible" class="downRobotDialog">
            <el-form ref="ruleForm" :model="robotForm" :rules="rules" label-width="100px">
                <el-form-item label="机器人名称" prop="name" :error="robotForm.nameError">
                    <el-input v-model="robotForm.name" autocomplete="off" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelDown">取 消</el-button>
                <el-button type="primary" @click="confrimDown">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import IndexBox from '@/views/comment/IndexBox.vue'
    import { mapState } from 'vuex'
    // import { getSkillRobotList } from '@/api/home/index'
    import { robotDetail, getRecommendRobot, downloadRobot, relationSkill } from '@/api/detail'
    import Breadcrumb from '../comment/breadcrumb.vue'
    export default {
        components: {
            IndexBox,
            Breadcrumb
        },
        data() {
            return {
                btnText: '获取机器人',
                robotDetail: {
                    skillId: '', // 技能ID
                    skillVersionId: '', // 技能版本ID
                    skillName: '', // 技能名称
                    downloadsNum: '', // 下载数
                    version: '', // 技能版本号
                    description: '', // 技能描述,
                    handbookCoverImage: '', // 技能手册封面图
                    username: '', // 创建人名称,
                    classifyId: '', // 技能分类ID,
                    classifyName: '', // 技能分类名称
                    updateTime: '', // 更新时间
                    handbookSimpleContent: '', // 技能手册简介
                    handbookTitle: '', // 技能手册标题\
                    andbookContent: '' // 技能手册正文
                },
                skillList: [],
                recommendRobotList: [],
                dataType: 'robotType',
                skillBookId: '',
                dialogSkillVisible: false,
                dialogData: {},
                dialogDownRobotVisible: false,
                robotForm: {
                    name: '',
                    nameError: ''
                },
                // src: `${window.location.origin}/guodian-plat/csEditer/wangEditor/wangErrors.html`,
                // src: `https://mrpa-test.ai-rtc.com:8082/plat/3.6.0/csEditer/wangEditor/wangErrors.html`,
                // src: `https://mrpa-test.ai-rtc.com:8082/guodian-plat/csEditer/wangEditor/wangErrors.html`,
                src: window.CS_EDITER + '/wangEditor/wangError.html',
                rules: {
                    name: [
                        { required: true, message: '请输入机器人名称', trigger: 'blur' },
                        { max: 20, message: '长度在20字符以内', trigger: 'change' }
                    ]
                },
                defaImg: require('../../assets/skills/skilsLogo.png')
            }
        },
        computed: {
            ...mapState(['user'])
        },
        watch: {
            async $route() {
                await this.getRobotDetail()
                await this.getSkillRobotList()
            }
        },

        async mounted() {
            await this.getRobotDetail()
            await this.getSkillRobotList()
            await this.getRecommendRobot()
        },
        methods: {
            // 获取详情
            async getRobotDetail() {
                const bid = this.$route.params.id
                robotDetail(bid).then(res => {
                    this.robotDetail = res
                    if (res.ifGetRobot) {
                        this.btnText = '重新获取机器人'
                    }
                    this.$route.meta.title = res.skillName
                })
            },
            // 获取关联技能
            getSkillRobotList() {
                const data = {
                    robotId: this.$route.params.id // 技能分类ID
                }
                relationSkill(data).then(res => {
                    this.skillList = res
                })
            },
            // 获取推荐机器人
            getRecommendRobot() {
                const data = ''
                getRecommendRobot(data).then(res => {
                    console.log(res,'wewe')
                    this.recommendRobotList = res
                })
            },
            giveTheThumbsUp() {
                console.log('点赞')
            },
            getRobots(robotdetail) {
                if (localStorage.getItem('userName')) {
                    this.downloadRobot(robotdetail)
                } else {
                    this.$store.commit('user/SET_DIALOGVISIBLE', true)
                }
            },
            // 获取机器人接口
            downloadRobot(robotdetail) {
                const robotId = robotdetail.id
                const params = {
                    id: robotId,
                    robotName: robotdetail.robotName
                }
                downloadRobot(params).then(res => {
                    if (res) {
                        this.$message({
                            message: '机器人下载成功',
                            type: 'success'
                        })
                        this.btnText = '重新获取机器人'
                        this.dialogDownRobotVisible = false
                        this.robotForm.name = ''
                    } else {
                        this.dialogDownRobotVisible = true
                        this.robotForm.name = robotdetail.robotName
                        this.robotForm.nameError = '机器人名称已存在，请重新命名'
                    }
                }).catch((e) => {
                    if (e.message === '机器人名称已存在，请重新命名') {
                        this.dialogDownRobotVisible = true
                    }
                })
                // setTimeout(() => {
                //   this.robotForm.nameError = '机器人名称已存在，请重新命名'
                // }, 500)
            },

            // 重名弹框点击确认获取机器人按钮
            confrimDown() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        const robotId = this.$route.params.id
                        const params = {
                            id: Number(robotId),
                            robotName: this.robotForm.name
                        }
                        downloadRobot(params).then(res => {
                            if (res) {
                                this.$message({
                                    message: '机器人下载成功',
                                    type: 'success'
                                })
                                this.btnText = '重新获取机器人'
                                this.dialogDownRobotVisible = false
                                this.robotForm.name = ''
                            } else {
                                this.robotForm.nameError = '机器人名称已存在，请重新命名'
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            // 重名弹框点击取消获取机器人按钮
            cancelDown() {
                this.dialogDownRobotVisible = false
                this.robotForm.name = ''
            },
            // 点击关联技能 卡片
            viewSkill(data) {

                const adata = {
                    handbookContent: data.handbookContent,
                    handbookCoverImage: data.handbookCoverImage,
                    handbookSimpleContent: data.handbookSimpleContent,
                    handbookTitle: data.handbookTitle
                }
                console.log(adata)
                localStorage.setItem('skillManualData', JSON.stringify(adata))
                this.dialogSkillVisible = true
                this.dialogData = data
                this.skillBookId = data.skillVersionId
                // getEditorDetail(data.skillVersionId).then(res => {
                //     const data = {
                //         handbookContent: res.handbookContent,
                //         handbookCoverImage: res.handbookCoverImage,
                //         handbookSimpleContent: res.handbookSimpleContent,
                //         handbookTitle: res.handbookTitle
                //     }
                //     localStorage.setItem('skillManualData', JSON.stringify(data))
                // })
            }
        }
    }
</script>
<style lang="scss" scoped>
tr{
	line-height: 28px;
}
.ar{
	width: 85px;
	text-align: right;
	color: #98A3B7;
    vertical-align: top
}
.robot-detail-box{
	// margin-top: 60px;
	overflow: hidden;
	margin: 0 auto;
	width: 1200px;
	.breadcrumb{
		display: flex;
		margin-top: 80px;
		align-items: center;
		font-size: 14px;
		img{
			width: 11px;
			height: 11px;
			margin-right: 11.5px;
		}
		span{
			margin-right: 5px;
		}
		.active /deep/ .el-breadcrumb__inner{
			color: rgb(82, 130, 234);
		}
	}
	.robot-detail-content{
		margin-top: 45.5px;
		display: flex;
		.robot-detail-left{
			width: 800px;
			.content{
				width: 800px;
				height: 586px;
				background: url('../../assets/skills/skillDetailLogo.jpg'),100%,100%,no-repeat;
			}
			.robot-detail-introduce{
				margin-top: 40px;
				p{
					margin: 15px 0 15px 0;
				}
				.robot-btn{
					width: 73px;
					line-height: 24px;
					background: #D7E4FF;
					border: 1px solid #4C7EE9;
					border-radius: 4px;
					border-radius: 4px;
					font-size: 14px;
					color: #4C7EE9;
					text-align: center;
				}
			}
		}
		.robot-detail-right{
		width: 380px;
		margin-left: 20px;
		.robot-introduce{
			padding: 20px;
			width: 380px;
			height: 430px;
			font-size: 14px;
			color:  #293340;
			background: #FAFAFB;
			border: 1px solid #F3F5F7;
			border-radius: 4px;
			border-radius: 4px;
      .skillDescription{
        max-height:200px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 8;
        line-clamp: 8;
        -webkit-box-orient: vertical;
      }
		}
    .downTips{
      font-size: 14px;
      margin-top: 15px;
      line-height: 20px;
      color: #293340;
      p:nth-child(1){
        color: #98A3B7;
      }
    }
		/deep/ .shanghcuan-btn{
			width: 300px;
			height: 56px;
			font-size: 16px;
			>span{
			margin: 0 auto;
			// width: 115px;
			display: flex;
			align-items: center;
			justify-content: center;
			}
		}
		.shangchuan-icon{
			display: inline-block;
			width: 35px;
			height: 22px;
			background: url('../../assets/skills/download-icon.png') no-repeat left center;
			padding-right: 10px;
		}
		.dianzan-btn{
			width: 60px;
			height: 56px;
		}
		}
	}
}
/deep/ .el-tooltip__popper{
	width: 360px;
}
.classtype{
	background: #D7E4FF;
	border: 1px solid #4C7EE9;
	border-radius: 4px;
	border-radius: 4px;
	font-size: 14px;
	color: #4C7EE9;
	padding: 2px 4px;
}
</style>
<style scoped lang="scss">
.associatedSkill{
//   width: 135%;
  flex-wrap: wrap;
	.index-skill-box{
		width:160px;
		height:200px;
		cursor: pointer;
		margin-bottom: 20px;
		// flex:1;
		flex-shrink: 0;
		// width: 220px;
		// height: 284px;
		position: relative;
		background: url('../../assets/home/home-hotelct-bg.png');
		background-repeat: no-repeat;
		background-size: 100%,100%;
		margin-right: 20px;
		overflow: hidden;
		border-radius: 4px;
		text-align: center;
		padding: 0 5px;
		box-shadow: 0 4px 8px rgba(216,218,226,1);
    display: inline-block;
		.free{
			position: absolute;
			top:0;
			right: 0;
		}
		.robot-logo{
			display: inline-block;
			width: 52px;
			height: 52px;
			margin: 0 auto;
			margin-top: 20px;
		}
		h1{
			font-size: 16px;
			color: #293340;
			margin-top: 10.5px;
			margin-bottom: 4px;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		p{
			font-size: 14px;
			color: #777777;
		}
		.robot-footer{
			position: absolute;
			width: 100%;
			bottom: 23px;
			padding: 0 27.8px;
			display: flex;
			justify-content: space-between;
			span{
				font-size: 14px;
				color: #293340;
			}
			>*{
				display: flex;
				height: 18px;
			}
		}
	}
}
.dialogSkill{
	/deep/.el-dialog{
		border-radius: 6px;
	}
	/deep/.el-dialog__header{
		background: url("../../assets/robot/dialog__header.png") no-repeat;
		background-size: cover;
	}
	/deep/.el-dialog__body{
		color: #000;
	}
	/deep/.el-dialog__title{
		color: #fff;
	}
	/deep/.el-dialog__headerbtn .el-dialog__close{
		color: #fff;
	}
	.description{
		margin-top: 20px;
		/deep/.el-descriptions-item__container .el-descriptions-item__label{
			font-size: 16px;
			font-weight: 600;
		}
    /deep/.el-descriptions-item__container .el-descriptions-item__content{
			font-size: 14px;
		}
		/deep/.el-descriptions__body{
			color: #000;
		}
    /deep/.el-descriptions--small:not(.is-bordered) .el-descriptions-item__cell{
      padding-bottom: 10px;
    }
	}
	.skillImg{
    height: 500px;
		/deep/.el-image__inner{
			width: 315px;
			height: 230px;
		}
		/deep/.el-image{
			margin-left: 75px;
		}
	}
	.skillInfo{
		.skillLogo{
			display: inline-block;
      width: 125px;
      vertical-align: middle;
			img{
				width: 125px;
				height: 125px;
			}
		}
		.skillDetail{
			display: inline-block;
      margin-left: 25px;
      width: 76%;
      vertical-align: middle;
      table>tr>td{
        text-align: left;
      }
		}
	}
	.dialog-footer{
		text-align: center;
	}
}
.downRobotDialog{
  /deep/.el-dialog__title{
    font-size: 16px;
    font-weight: 600;
  }
  /deep/.el-dialog{
    width: 25%;
    border-radius: 4px;
  }
  /deep/.el-dialog__body{
    padding: 0 20px;
  }
}
iframe::-webkit-scrollbar{
  width:8px;
  height: 8px;
}
iframe::-webkit-scrollbar-track{
  background: #ccc;
  border-radius:0px;
}
iframe::-webkit-scrollbar-thumb{
  border-radius:8px;
  background: #999;
}
iframe::-webkit-scrollbar-corner{
  background: #ccc;
}
</style>
