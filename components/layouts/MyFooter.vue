<template>
  <footer >
    <p class="ma-0 caption">
      author : emeric lebbrecht
    </p>
    <p class="ma-0 caption">
      version : 0.0.1
    </p>
  </footer>
</template>

<script>
  export default {
    name: 'MyFooter',
  }
</script>

<style lang="stylus" scoped>
  footer
    background #303030
    display flex
    flex-direction row
    justify-content space-between
    height 25px 
    position fixed
    left 0
    bottom 0
    margin-left 50px
    padding 5px 20px 5px 20px
    width 100%

</style>

