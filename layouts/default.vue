<template>
  <v-app dark>
    <navbar-top />
    <v-content>
      <nuxt />
    </v-content>
    <v-footer app>
      This is the footer
    </v-footer>
  </v-app>
</template>

<script>
  import NavbarTop from '~/components/layouts/NavbarTop'
  export default {
    components: {
      NavbarTop
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


