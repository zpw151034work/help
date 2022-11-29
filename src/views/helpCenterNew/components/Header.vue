<template>
    <div class="box">
        <div class="bg">
            <div class="help">帮助中心</div>
            <div class="search">
                <el-autocomplete popper-class="my-autocomplete" v-model="state" :fetch-suggestions="querySearch"
                        placeholder="请输入内容" @select="handleSelect">
                        <i class="el-icon-search el-input__icon" slot="suffix" @click="handleIconClick">
                        </i>
                        <template slot-scope="{ item }">
                            <span class="addr">{{ item.value }}</span>
                        </template>
                </el-autocomplete>
            </div>
            <div class="tab">
                <div class="item">操作手册</div>
                <div class="item">渠道接入</div>
                <div class="item">产品简介</div>
                <div class="item">产品简介</div>
                <div class="item">产品简介</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            menuData: [
                {
                    title: "数字人",
                    id: "null",
                    children: [
                        {
                            value: "播报型数字人",
                            id: "1",
                        },
                        {
                            value: "企业数字专员",
                            id: "2",
                        },
                        {
                            value: "交互数字人",
                            id: "3",
                        },
                        {
                            value: "全自动直播服务数字人",
                            id: "4",
                        },
                    ],
                },
                {
                    title: "自运营",
                    id: "null",
                    children: [
                        {
                            value: "微信加友",
                            id: "5",
                        },
                        {
                            value: "智能归档",
                            id: "6",
                        },
                        {
                            value: "智能个呼",
                            id: "7",
                        },
                        {
                            value: "私域运营",
                            id: "8",
                        },
                    ],
                },
            ],
            restaurants: [],
            state: '',
            newArray: [],
        }
    },
    mounted() {
        this.restaurants = this.loadAll();
    },

    methods: {
        ...mapMutations(['app/MUNE_ACTION']),
        //数据展平的方法
        typeJudge(menuData) {
            this.newArray = [];
            for (let i = 0; i < menuData.length; i++) {
                if (menuData[i].children) {
                    this.newArray.push(...menuData[i].children)
                } else {
                    this.newArray.push(menuData[i])
                }
            }
            return this.newArray
        },
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll() {
            return this.typeJudge(this.menuData)
        },
        handleSelect(item) {
            this['app/MUNE_ACTION'](item.id)
            setTimeout(() => {
                this.state = '';
            },1000)
        },
        handleIconClick(ev) {
            let stateOptions = this.typeJudge(this.menuData)
            let item =  stateOptions.filter((item)=>{
               return  this.state == item.value
            })
             this['app/MUNE_ACTION'](item[0].id)
           
         
        },
  
    },
}
</script>
<style lang="scss" scoped>
.box {
    background: #F5F9FF;

    .bg {

        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        height: 197px !important;
        padding-left: 80px;
        background: url(../../../assets/new/banner.jpg) no-repeat center center;
        background-size: contain;
    }



    .help {
        font-family: PingFang-SC-Medium;
        font-size: 24px;
        color: #282828;
        margin-top: 44px;
    }

    .search {
        margin-top: 14px;
        width: 600px;
        background: #FFFFFF;
        border-radius: 20px !important;

        /deep/ .el-input--small .el-input__inner {
            border-radius: 20px !important;
        }

        /*搜索组件最外层div */

    }

    .tab {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;

        .item {
            font-family: PingFang-SC-Medium;
            font-size: 12px;
            color: #8691AB;
            margin-right: 17px;
        }
    }

}
</style>
