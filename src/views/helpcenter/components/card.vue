<template>
    <div class="box">
        <div class="head">
            <h1>{{ title }}</h1>
            <div> <slot name="left" /></div>
        </div>
        <slot />
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
            }
        }
    }
</script>
<style lang="scss" scoped>
.box{
  padding-bottom: 75px;
  .head{
    margin: 0 auto;
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: PingFang-SC-Bold;
    font-size: 16px;
    color: #2F2F2F;
  }
}
</style>
