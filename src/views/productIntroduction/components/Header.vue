<template>
    <div class="box">
        <el-row style="width: 100%">
            <el-col :xs="24" :sm="12">
                <div class="lf">
                    <div class="pageTitle">帮助中心</div>
                    <div class="sign">|</div>
                    <div class="pageTitle2">企业数字专员</div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12">
                <div class="rg">
                    <el-autocomplete popper-class="my-autocomplete" v-model="state" :fetch-suggestions="querySearch"
                        placeholder="请输入内容" @select="handleSelect">
                        <i class="el-icon-search el-input__icon" slot="suffix" @click="handleIconClick">
                        </i>
                        <template slot-scope="{ item }">
                            <span class="addr">{{ item.value }}</span>
                            <span class="addr">{{ item.id }}</span>
                        </template>
                    </el-autocomplete>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
    name: "header",
    data() {
        return {
            menuData: [
                {
                    value: "产品介绍",
                    id: "null",
                    children: [
                        {
                            value: "产品介绍",
                            id: "MainContent",
                        },
                        {
                            value: "核心功能",
                            id: "CoreFunctions",
                        },
                        {
                            value: "应用场景",
                            id: "ApplicationScenario",
                        },
                    ],
                },
                {
                    value: "计费模式",
                    id: "BillingMode",
                },
                {
                    value: "核心功能",
                    id: "MajorFunction",
                },
                {
                    value: "渠道对接",
                    id: "null",
                    children: [
                        {
                            value: "web渠道",
                            id: "WebChannel",
                        },
                        {
                            value: "app渠道",
                            id: "AppChannel",
                        },
                        {
                            value: "企业微信",
                            id: "WeCom",
                        },
                        {
                            value: "钉钉机器人",
                            id: "NailingRobot",
                        },
                    ],
                },
            ],
            restaurants: [],
            state: '',
            newArray: [],
        };
    },
    mounted() {
        this.restaurants = this.loadAll();
    },

    methods: {
        ...mapMutations(['app/MUNE_CHANGE']),
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
            console.log(item);
        },
        handleIconClick(ev) {
            console.log(this.state);
            let stateOptions = this.typeJudge(this.menuData)
            let item =  stateOptions.filter((item)=>{
               return  this.state == item.value
            })
            this['app/MUNE_CHANGE'](item[0].id)
         
        },
  
    },

};
</script>
<style lang="scss" scoped>
.box {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 48px;
}

.lf {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 48px;
    padding: 0 18px;

    .pageTitle {
        color: #282828;
        font-size: 18px;
        font-weight: bold;
        margin-right: 15px;
    }

    .sign {
        color: #d8d8d8;
        margin-right: 10px;
    }

    .pageTitle2 {
        color: #282828;
        font-size: 14px;
    }
}

.rg {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 36px);
    height: 48px;
    padding: 0 18px;
}

@media screen and (max-width: 768px) {
    .rg {
        width: 100%;
        padding: 0 !important;
    }
}

::v-deep .el-input__inner {
    background: #f8f8f8 !important;
}

::v-deep .el-autocomplete {
    width: 100%;
}
</style>
