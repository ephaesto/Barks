<template>
  <v-app dark class="my-app">
    <logo class="logo-my-app" />
    <navbar-top sub-windows />
    <navbar-side />
    <div class="wrapp-my-app">
      <v-content class="main-my-app">
        <nuxt />
      </v-content>
      <my-footer />
    </div>
  </v-app>
</template>

<script>
  import NavbarTop from '~/components/layouts/NavbarTop'
  import NavbarSide from '~/components/layouts/NavbarSide'
  import MyFooter from '~/components/layouts/MyFooter'
  import Logo from '~/components/icons/Logo'
  export default {
    components: {
      NavbarTop,
      NavbarSide,
      MyFooter,
      Logo
    },
    data() {
      return {
        barksName: 'Barks',
      }
    },
  }
</script>

<style lang="stylus" scoped>
  body
    .my-app.theme--dark.application
      .wrapp-my-app
        background #303030
        margin-top 28px
        overflow hidden
        position relative
        left 0
        top 0
        z-index 1
        height 100%
        .main-my-app
          height 100%
      .logo-my-app
        position fixed
        top 3px
        left 3px
        z-index 999
        width 22px
        height 22px
        -webkit-app-region drag 
        .color-fill
          fill white
   
</style>


