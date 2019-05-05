<template>
  <v-app dark class="my-app">
    <logo class="logo-my-app" />
    <navbar-top />
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

<style lang="stylus">
  body
    &::-webkit-scrollbar 
      display none
    .my-app.theme--dark.application
      background-image: linear-gradient(to right bottom, #36236f, #4a287f, #602c8f, #772e9d, #8f30ab, #b526a4, #d61b9a, #f2198c, #ff3e65, #ff6941, #fc9220, #e3b712, #e3b712, #e3b712, #e3b712, #e3b712, #e3b712, #e3b712, #e3b712, #e3b712, #e3b712);
      .wrapp-my-app
        background #303030
        margin 28px 0 0 50px
        overflow hidden
        border-radius:  56px 0 0 0 / 100px 0 0 0
        box-shadow: 2px 2px 2px -2px rgba(0,0,0,0.5) inset
        position relative
        left 0
        top 0
        z-index 1
        height 100%
        .main-my-app
          margin-bottom 28px
          height 100%
      .logo-my-app
        position fixed
        top 9px
        left 9px
        z-index 999
        width 53px
        height 53px
        -webkit-app-region: drag 
        .color-fill
          fill white

        
</style>


