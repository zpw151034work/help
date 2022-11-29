<template>
    <div class="pagination-container">
        <el-pagination :background="true"
                       :current-page="config.currentPage"
                       :page-sizes="pageSizeArray"
                       :page-size="config.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="config.totalCount"
                       @current-change="pageChanged"
                       @size-change="sizeChanged">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "PaginationTemp",
        props: {
            pageSizeArray: {
                type: Array,
                default: () => [5, 10, 20, 30, 50]
            },
            // pageSize: {
            //   type: Number,
            //   default: 10
            // },
            data: {
                type: Array,
                default: () => []
            },
            config: {
                type: Object,
                default: () => {}
            }
            // currentPage: {
            //   type: Number,
            //   default: 1
            // },
            // totalCount: {
            //   type: Number,
            //   default: 0
            // }
        },
        created(){
            console.log(this.config);
        },
        methods: {
            pageChanged(page) {
                console.log("当前页：", page);
                let obj = { ...this.config };
                obj.currentPage = page;
                this.$emit("pageChanged", obj);
            },
            sizeChanged(size) {
                let obj = { ...this.config };
                //修改条数的时候，页数置为1
                obj.currentPage = 1;
                obj.size = size;
                console.log("size:", size);
                console.log(obj);
                this.$emit("pageChanged", obj);
            }
        }
    };
</script>

<style lang="scss" scoped>
.pagination-container {
    // background: red;
    padding: 20px 0;
    float: right;
}
</style>
