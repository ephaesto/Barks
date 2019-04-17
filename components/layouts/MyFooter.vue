<template>
  <v-footer app height="25px" class="py-2 px-5 footer-app">
    <p class="ma-0 caption">
      author : emeric lebbrecht
    </p>
    <p class="ma-0 caption">
      version : 0.0.1
    </p>
  </v-footer>
</template>

<script>
  export default {
    name: 'MyFooter',
  }
</script>

<style lang="stylus" scoped>
  .footer-app
    display flex
    flex-direction row
    justify-content space-between
    min-height 10px !important

</style>

