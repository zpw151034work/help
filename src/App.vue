<template>
    <div id="app" :class="footStatus? 'overFlow':''">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'App',
        data(){
            return {
                footStatus: false
            }
        },
        created(){
            console.log(this.$route.path)
            if (this.$route.path == '/helpcenterDetail') {
                this.footStatus = true
            } else {
                this.footStatus = false
            }
        },
        watch: {
            $route: {
                handler: function(val){
                    console.log(val);
                    if (val.path == '/helpcenterDetail') {
                        this.footStatus = true
                    } else {
                        this.footStatus = false
                    }
                },
                deep: true
            }
        },

    }
</script>
<style lang="scss" scoped>
#app{
  background: #fff;
}
.overFlow{
  overflow: hidden;
}
</style>
