<template>
    <div class="sidebar-logo-container" :class="{'collapse':collapse}">
        <transition name="sidebarLogoFade">
            <div class="logo">
                <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
                    <svg-icon icon-class="logoWhite" class="svg" />
                    <h1 class="sidebar-title">{{ title }} </h1>
                </router-link>
                <router-link v-else key="expand" class="sidebar-logo-link" to="/">
                    <svg-icon icon-class="logoWhite" class="svg" />
                    <h1 class="sidebar-title">{{ title }} </h1>
                </router-link>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'SidebarLogo',
        props: {
            collapse: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                title: '智能RPA',
                // logo: "" //'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
                logo: require('@/assets/home/logo(2).png'),
            }
        }
    }
</script>

<style lang="scss" scoped>
.logo{
  a{
    display: flex !important;
    align-content: center !important;
    align-items: center !important;
    justify-content: center !important;
  }
}
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  // background: #2b2f3a;
  text-align: center;
  overflow: hidden;
  >a{
    color: red;
  }
  & .sidebar-logo-link {
    .svg{
      width: 25px;
      height: 25px;
    }
    h1{
      display: inline-block;
    }
    & .sidebar-logo {
      // width: 32px;
      height: 25px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
