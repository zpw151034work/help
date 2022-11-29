<template>
    <div class="home">
        <Head v-if="!$route.meta.head && csDiel" />
        <router-view />
        <!-- <div style="height:240px;width:100%" /> -->
        <Foot v-if="!$route.meta.head  && csDiel && footStatus" />
        <LoginDialog />
    <!-- <SkilSuccess/> -->
    </div>
</template>

<script>
    import Head from '@/views/comment/head.vue'
    import Foot from '@/views/comment/foot.vue'
    import LoginDialog from '@/views/comment/dialog/loginDialog.vue'

    export default {
        name: 'Index',
        components: {
            Head,
            Foot,
            LoginDialog
        },
        data() {
            return {
                dialogVisible: true,
                num: 0,
                csDiel: true,
                footStatus: true
            }
        },

        watch: {
            $route: {
                handler: function(val){
                    console.log(val);
                    if (val.path == '/helpcenterDetail') {
                        this.footStatus = false
                    } else {
                        this.footStatus = true
                    }
                },
                deep: true
            }
        },
        created(){
            if (this.$route.path == '/helpcenterDetail') {
                this.footStatus = false
            } else {
                this.footStatus = true
            }
        },
        mounted() {
            if (window.GoogleBrowser) {
                this.csDiel = false
            }
        },
        methods: {
        }
    }
</script>
<style scoped lang="scss">

.home {
  position: relative;
  top: 0;
  left: 0;
  min-height: 100%;
  .search-button {
    color: #fff;
  }
}
h2,
h5 {
  margin: 0px;
  padding: 0px;
}

</style>
