<template>
  <v-app dark>
    <navbar-top />
    <v-content>
      <nuxt />
    </v-content>
    <my-footer />
  </v-app>
</template>

<script>
  import NavbarTop from '~/components/layouts/NavbarTop'
  import MyFooter from '~/components/layouts/MyFooter'
  export default {
    components: {
      NavbarTop,
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
  body::-webkit-scrollbar 
    display none
</style>


