<template>
  <v-app dark class="my-app">
    <navbar-top />
    <navbar-side />
    <v-content class="main-my-app">
      <nuxt />
    </v-content>
    <my-footer />
  </v-app>
</template>

<script>
  import NavbarTop from '~/components/layouts/NavbarTop'
  import NavbarSide from '~/components/layouts/NavbarSide'
  import MyFooter from '~/components/layouts/MyFooter'
  export default {
    components: {
      NavbarTop,
      NavbarSide,
      MyFooter
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
      .main-my-app
        background #303030
        margin 28px 0 28px 50px
        overflow hidden
        border-radius:  56px 0 0 0 / 100px 0 0 0
        box-shadow: 0px 0px 2px 2px rgba(0,0,0,0.5) inset

        
</style>


