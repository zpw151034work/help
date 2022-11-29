<template>
    <div class="tab-wrapper">
        <a href="#/skills" :class="{'tab-box': true, active : url === 'skils'}">
            <img src="../../assets/skills/skilsLogo.png" alt="">
            <div>
                <h1>热门技能</h1>
                <p>100+机器人资源  免费下载</p>
            </div>
        </a>
        <a href="#/robot/list" :class="{'tab-box': true, active : url === 'robot'}" style="margin-left:20px">
            <img src="../../assets/robot/rebot.png" alt="">
            <div>
                <h1>热门机器人</h1>
                <p>更多专业技能 在线秒获取</p>
            </div>
        </a>
    </div>
</template>
<script>
    export default {
        props: {
            url: {
                type: String,
                default: ''
            }
        }
    }
</script>
<style lang="scss" scoped>
.tab-wrapper{
    display: flex;
    margin: 36px auto 0;
    width: 1200px;
}
.tab-box{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 271px;
    height: 84px;
    background-image: linear-gradient(-45deg, #F8F9FB 0%, #F4F5F9 100%);
    border: 1px solid #fff;
    h1{
        font-size: 18px;
        color: #293340;
    }
    p{
        font-size: 14px;
        color: #98A3B7;
    }
}
img{
    width: 48px;
    height: 48px;
    margin-right: 16px;
}
.active{
    border: 1px solid rgba(255,255,255,0.45);
    box-shadow: 0px 2px 10px 0px rgba(76,126,233,0.42);
    background: #548AFD;
    h1{
        color: #FFFFFF;
    }
    p{
        color: rgba(255,255,255,0.80);
    }
}
</style>